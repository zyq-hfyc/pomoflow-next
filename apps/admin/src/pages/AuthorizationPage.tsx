import { useCallback, useEffect, useState } from 'react'
import { Alert, App as AntApp, Button, Card, Form, Input, Modal, Select, Space, Table, Tag, Typography } from 'antd'
import { grantAdminRole, listAdminUsers, setAdminStatus } from '../services/admin'
import { useAuth } from '../app/AuthContext'
import type { AdminUser, Role } from '../types'

const roleLabels: Record<Role, string> = {
  analyst: '分析只读员',
  user_operator: '用户运营专员',
  membership_operator: '会员运营专员',
  auditor: '审计员',
  security_admin: '安全与权限管理员',
  emergency_admin: '应急超级管理员',
}

function time(value: number | null): string {
  return value ? new Date(value).toLocaleString() : '—'
}

export default function AuthorizationPage() {
  const { message } = AntApp.useApp()
  const { state } = useAuth()
  const current = state.status === 'authenticated' ? state.session.user : null
  const [items, setItems] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [creating, setCreating] = useState(false)
  const [form] = Form.useForm()

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setItems(await listAdminUsers())
    } catch (err) {
      setError(err instanceof Error ? err.message : '授权列表加载失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load() }, [load])

  const openEdit = (row: AdminUser | null) => {
    form.resetFields()
    if (row) {
      setEditing(row)
      setCreating(false)
      form.setFieldsValue({ ...row, reason: '' })
    } else {
      setEditing(null)
      setCreating(true)
      form.setFieldsValue({ issuer: current?.issuer, role: 'analyst', reason: '' })
    }
  }

  const submitRole = async () => {
    const values = await form.validateFields()
    try {
      await grantAdminRole({
        issuer: values.issuer,
        subject: values.subject,
        display_name: values.display_name ?? '',
        role: values.role,
        reason: values.reason,
      })
      message.success('后台角色已保存并写入审计')
      setCreating(false)
      setEditing(null)
      await load()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '保存失败')
    }
  }

  const toggleStatus = async (row: AdminUser) => {
    let reason = ''
    Modal.confirm({
      title: row.status === 'active' ? '收回后台授权？' : '恢复后台授权？',
      content: (
        <Input.TextArea
          rows={3}
          placeholder="操作原因（必填）"
          onChange={(event) => { reason = event.target.value }}
        />
      ),
      onOk: async () => {
        if (reason.trim().length < 3) throw new Error('请填写至少 3 个字符的原因')
        await setAdminStatus(row.issuer, row.subject, row.status === 'active' ? 'disabled' : 'active', reason.trim())
        message.success('授权状态已更新')
        await load()
      },
    })
  }

  return (
    <Card>
      <div className="page-heading">
        <div>
          <Typography.Title level={3}>后台授权</Typography.Title>
          <Typography.Text type="secondary">仅分配预定义角色；禁止自我提权和移除最后一个应急管理员。</Typography.Text>
        </div>
        <Button type="primary" onClick={() => openEdit(null)}>预授权 SSO 身份</Button>
      </div>
      <Alert
        type="info"
        showIcon
        message="角色权限由服务端固定矩阵决定；菜单隐藏不等于授权。应急超管仅用于初始化与应急，不用于日常运营。"
        style={{ marginBottom: 16 }}
      />
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Table<AdminUser>
        rowKey={(row) => `${row.issuer}:${row.subject}`}
        loading={loading}
        dataSource={items}
        pagination={false}
        columns={[
          { title: '姓名', key: 'name', render: (_, row) => row.display_name || '—' },
          { title: 'SSO subject', dataIndex: 'subject', key: 'subject' },
          { title: '角色', dataIndex: 'role', key: 'role', render: (value: Role) => roleLabels[value] },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value) => <Tag color={value === 'active' ? 'green' : 'red'}>{value === 'active' ? '已授权' : '已收回'}</Tag>,
          },
          { title: '最近登录', key: 'login', render: (_, row) => time(row.last_login_ms) },
          { title: '更新时间', key: 'updated', render: (_, row) => time(row.updated_ms) },
          {
            title: '操作',
            key: 'action',
            render: (_, row) => {
              const self = current?.issuer === row.issuer && current.subject === row.subject
              return (
                <Space>
                  <Button size="small" disabled={self} onClick={() => openEdit(row)}>调整角色</Button>
                  <Button size="small" danger={row.status === 'active'} disabled={self} onClick={() => void toggleStatus(row)}>
                    {row.status === 'active' ? '收回授权' : '恢复授权'}
                  </Button>
                </Space>
              )
            },
          },
        ]}
      />

      <Modal
        title={creating ? '预授权 SSO 身份' : '调整后台角色'}
        open={creating || !!editing}
        onCancel={() => { setCreating(false); setEditing(null) }}
        onOk={() => void submitRole()}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="issuer" label="OIDC issuer" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="subject" label="SSO subject" rules={[{ required: true, min: 1, max: 255 }]}>
            <Input disabled={!!editing} placeholder="IdP 中该用户的稳定 sub" />
          </Form.Item>
          <Form.Item name="display_name" label="姓名">
            <Input maxLength={100} />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select
              options={Object.entries(roleLabels)
                .filter(([role]) => current?.role === 'emergency_admin' || role !== 'emergency_admin')
                .map(([value, label]) => ({ value, label }))}
            />
          </Form.Item>
          <Form.Item name="reason" label="操作原因（写入审计）" rules={[{ required: true, min: 3, max: 500 }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
