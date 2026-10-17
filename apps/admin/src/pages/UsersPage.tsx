import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Card, Input, Select, Space, Table, Tag, Typography } from 'antd'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { listUsers } from '../services/admin'
import type { UserListItem } from '../types'
import UserDetailDrawer from './UserDetailDrawer'

function time(value: number | null): string {
  return value ? new Date(value).toLocaleString() : '—'
}

const statusText: Record<UserListItem['status'], { text: string; color: string }> = {
  active: { text: '正常', color: 'green' },
  banned: { text: '已封禁', color: 'red' },
  deletion_pending: { text: '注销冷静期', color: 'orange' },
}

export default function UsersPage() {
  const [items, setItems] = useState<UserListItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await listUsers({ query, status, page, page_size: pageSize })
      setItems(result.items)
      setTotal(result.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : '用户列表加载失败')
    } finally {
      setLoading(false)
    }
  }, [query, status, page, pageSize])

  useEffect(() => { void load() }, [load])

  return (
    <Card>
      <div className="page-heading">
        <div>
          <Typography.Title level={3}>用户运营</Typography.Title>
          <Typography.Text type="secondary">仅展示账号、会话和同步元数据；邮箱默认脱敏，正文不对管理员开放。</Typography.Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={() => void load()}>刷新</Button>
      </div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="用户 ID / 用户名 / 显示名 / 完整邮箱"
          style={{ width: 360 }}
          value={query}
          onChange={(event) => { setQuery(event.target.value); setPage(1) }}
        />
        <Select
          allowClear
          placeholder="账号状态"
          style={{ width: 160 }}
          value={status || undefined}
          onChange={(value) => { setStatus(value ?? ''); setPage(1) }}
          options={[
            { value: 'active', label: '正常' },
            { value: 'banned', label: '已封禁' },
            { value: 'deletion_pending', label: '注销冷静期' },
          ]}
        />
      </Space>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Table<UserListItem>
        rowKey="id"
        loading={loading}
        dataSource={items}
        onRow={(record) => ({ onClick: () => setSelected(record.id), style: { cursor: 'pointer' } })}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (value) => `共 ${value} 个用户`,
          onChange: (nextPage, nextSize) => { setPage(nextPage); setPageSize(nextSize) },
        }}
        columns={[
          {
            title: '用户',
            key: 'user',
            render: (_, row) => (
              <Space direction="vertical" size={0}>
                <Typography.Text strong>{row.display_name || row.username}</Typography.Text>
                <Typography.Text type="secondary">{row.username} · {row.id.slice(0, 8)}…</Typography.Text>
              </Space>
            ),
          },
          { title: '邮箱', dataIndex: 'masked_email', key: 'email', render: (value) => value ?? '—' },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value: UserListItem['status']) => <Tag color={statusText[value].color}>{statusText[value].text}</Tag>,
          },
          { title: '注册时间', key: 'created', render: (_, row) => time(row.created_ms) },
          { title: '最近登录', key: 'login', render: (_, row) => time(row.last_login_ms) },
          { title: '最近同步', key: 'sync', render: (_, row) => time(row.last_sync_ms) },
          {
            title: '会员',
            key: 'membership',
            render: (_, row) => row.membership ? `${row.membership.level} / ${row.membership.status}` : '—',
          },
          { title: '操作', key: 'action', render: (_, row) => <Button size="small" onClick={(event) => { event.stopPropagation(); setSelected(row.id) }}>详情</Button> },
        ]}
      />
      <UserDetailDrawer userID={selected} onClose={() => setSelected(null)} onChanged={() => void load()} />
    </Card>
  )
}
