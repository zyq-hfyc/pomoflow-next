import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  App as AntApp,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd'
import {
  adjustEntitlement,
  changeMembershipLevel,
  listMembershipChanges,
  listMemberships,
  renewMembership,
} from '../services/admin'
import { useAuth } from '../app/AuthContext'
import type { Membership, MembershipChange } from '../types'

function time(value: number | null): string {
  return value ? new Date(value).toLocaleString() : '—'
}

type Action = 'level' | 'entitlement' | 'renew'

export default function MembershipsPage() {
  const { message } = AntApp.useApp()
  const { hasPermission } = useAuth()
  const [items, setItems] = useState<Membership[]>([])
  const [changes, setChanges] = useState<MembershipChange[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Membership | null>(null)
  const [action, setAction] = useState<Action | null>(null)
  const [form] = Form.useForm()
  const expires = Form.useWatch('expires', form)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [members, history] = await Promise.all([
        listMemberships({ query, status, page, page_size: pageSize }),
        listMembershipChanges({ query, page: 1, page_size: 50 }),
      ])
      setItems(members.items)
      setTotal(members.total)
      setChanges(history.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : '会员数据加载失败')
    } finally {
      setLoading(false)
    }
  }, [query, status, page, pageSize])

  useEffect(() => { void load() }, [load])

  const openAction = (kind: Action, row: Membership) => {
    form.resetFields()
    setSelected(row)
    setAction(kind)
    if (kind === 'level') form.setFieldsValue({ level: row.level, days: 30 })
    if (kind === 'entitlement') form.setFieldsValue({ key: '', value: '' })
    if (kind === 'renew') form.setFieldsValue({ days: 30 })
  }

  const submit = async () => {
    if (!selected || !action) return
    const values = await form.validateFields()
    try {
      if (action === 'level') {
        const endsMS = values.expires === 'never' ? null : Date.now() + Number(values.days) * 86_400_000
        await changeMembershipLevel(selected.user_id, values.level, endsMS, values.reason)
      } else if (action === 'entitlement') {
        const raw = String(values.value).trim()
        const value = raw === 'true' ? true : raw === 'false' ? false : /^-?\d+(\.\d+)?$/.test(raw) ? Number(raw) : raw
        await adjustEntitlement(selected.user_id, values.key, value, values.reason)
      } else {
        await renewMembership(selected.user_id, Number(values.days), values.reason)
      }
      message.success('会员变更已生效并写入审计')
      setAction(null)
      setSelected(null)
      await load()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '变更失败')
    }
  }

  return (
    <Card>
      <div className="page-heading">
        <div>
          <Typography.Title level={3}>会员管理</Typography.Title>
          <Typography.Text type="secondary">人工授予、权益调整与续期；不含订单、支付、价格或自动扣款。</Typography.Text>
        </div>
      </div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input.Search
          allowClear
          placeholder="用户 ID / 用户名 / 完整邮箱"
          style={{ width: 340 }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onSearch={() => setPage(1)}
        />
        <Select
          allowClear
          placeholder="会员状态"
          style={{ width: 150 }}
          value={status || undefined}
          onChange={(value) => { setStatus(value ?? ''); setPage(1) }}
          options={[
            { value: 'active', label: '有效' },
            { value: 'expired', label: '已过期' },
            { value: 'none', label: '无会员' },
          ]}
        />
      </Space>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Tabs
        items={[
          {
            key: 'members',
            label: '会员列表',
            children: (
              <Table<Membership>
                rowKey="user_id"
                loading={loading}
                dataSource={items}
                pagination={{
                  current: page,
                  pageSize,
                  total,
                  showSizeChanger: true,
                  onChange: (next, size) => { setPage(next); setPageSize(size) },
                }}
                columns={[
                  { title: '用户', key: 'user', render: (_, row) => `${row.username} · ${row.user_id.slice(0, 8)}…` },
                  { title: '等级', dataIndex: 'level', key: 'level' },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (value) => <Tag color={value === 'active' ? 'green' : value === 'expired' ? 'orange' : 'default'}>{value}</Tag>,
                  },
                  { title: '生效时间', key: 'starts', render: (_, row) => time(row.starts_ms) },
                  { title: '到期时间', key: 'ends', render: (_, row) => time(row.ends_ms) },
                  { title: '来源', dataIndex: 'source', key: 'source' },
                  { title: '最近操作人', dataIndex: 'updated_by', key: 'updated_by' },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, row) => (
                      <Space>
                        <Button size="small" disabled={!hasPermission('membership:write')} onClick={() => openAction('level', row)}>等级</Button>
                        <Button size="small" disabled={!hasPermission('membership:write')} onClick={() => openAction('entitlement', row)}>权益</Button>
                        <Button size="small" disabled={!hasPermission('membership:write')} onClick={() => openAction('renew', row)}>续期</Button>
                      </Space>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            key: 'changes',
            label: '变更记录',
            children: (
              <Table<MembershipChange>
                rowKey="id"
                loading={loading}
                dataSource={changes}
                columns={[
                  { title: '时间', key: 'time', render: (_, row) => time(row.created_ms) },
                  { title: '用户', dataIndex: 'user_id', key: 'user' },
                  { title: '类型', dataIndex: 'change_type', key: 'type' },
                  { title: '原因', dataIndex: 'reason', key: 'reason' },
                  { title: '操作人', dataIndex: 'actor', key: 'actor' },
                  { title: '结果', dataIndex: 'result', key: 'result' },
                ]}
              />
            ),
          },
        ]}
      />

      <Modal
        title={action === 'level' ? '等级授予/变更' : action === 'entitlement' ? '单项权益调整' : '人工续期'}
        open={!!action}
        onCancel={() => { setAction(null); setSelected(null) }}
        onOk={() => void submit()}
      >
        <Form form={form} layout="vertical">
          {action === 'level' && (
            <>
              <Form.Item name="level" label="目标等级" rules={[{ required: true }]}>
                <Select options={[
                  { value: 'free', label: 'free' },
                  { value: 'pro', label: 'pro' },
                  { value: 'team', label: 'team' },
                ]} />
              </Form.Item>
              <Form.Item name="expires" label="有效期" initialValue="days" rules={[{ required: true }]}>
                <Select options={[{ value: 'days', label: '按天数' }, { value: 'never', label: '永久有效' }]} />
              </Form.Item>
              {expires === 'days' && (
                <Form.Item name="days" label="有效天数" rules={[{ required: true }]}>
                  <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                </Form.Item>
              )}
            </>
          )}
          {action === 'entitlement' && (
            <>
              <Form.Item name="key" label="权益键" rules={[{ required: true, pattern: /^[a-z][a-z0-9_.-]{1,63}$/ }]}>
                <Input placeholder="例如 sync.daily_limit" />
              </Form.Item>
              <Form.Item name="value" label="调整后值" rules={[{ required: true }]}>
                <Input placeholder="布尔 / 数字 / 字符串；由 Membership 服务校验" />
              </Form.Item>
            </>
          )}
          {action === 'renew' && (
            <Form.Item name="days" label="续期天数（从原到期日与当前时间的较晚者起算）" rules={[{ required: true }]}>
              <InputNumber min={1} max={3650} style={{ width: '100%' }} />
            </Form.Item>
          )}
          <Form.Item name="reason" label="操作原因（写入审计）" rules={[{ required: true, min: 3, max: 500 }]}>
            <Input.TextArea rows={4} placeholder="变更原因与关联事件编号" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
