import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  App as AntApp,
  Button,
  Descriptions,
  Drawer,
  Input,
  Modal,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd'
import { banUser, getUser, revokeUserSessions, unbanUser } from '../services/admin'
import { useAuth } from '../app/AuthContext'
import type { LoginLog, SyncEntityMetadata, UserDetail, UserSession } from '../types'

function time(value: number | null): string {
  return value ? new Date(value).toLocaleString() : '—'
}

export default function UserDetailDrawer({
  userID,
  onClose,
  onChanged,
}: {
  userID: string | null
  onClose: () => void
  onChanged: () => void
}) {
  const { message, modal } = AntApp.useApp()
  const { hasPermission } = useAuth()
  const [detail, setDetail] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [banAction, setBanAction] = useState<'ban' | 'unban' | null>(null)
  const [reason, setReason] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!userID) return
    setLoading(true)
    setError('')
    try {
      setDetail(await getUser(userID))
    } catch (err) {
      setError(err instanceof Error ? err.message : '用户详情加载失败')
    } finally {
      setLoading(false)
    }
  }, [userID])

  useEffect(() => {
    setDetail(null)
    void load()
  }, [load])

  const submitBan = async () => {
    if (!userID || !banAction || reason.trim().length < 3) return
    setSaving(true)
    try {
      if (banAction === 'ban') await banUser(userID, reason.trim())
      else await unbanUser(userID, reason.trim())
      message.success(banAction === 'ban' ? '账号已封禁，现有会话已失效' : '账号已解封')
      setBanAction(null)
      setReason('')
      await load()
      onChanged()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '操作失败')
    } finally {
      setSaving(false)
    }
  }

  const revoke = (sessionID?: number) => {
    if (!userID) return
    modal.confirm({
      title: sessionID ? '强制该设备下线？' : '强制全部设备下线？',
      content: sessionID
        ? '该设备的 access 与 refresh 会话将立即失效。'
        : '该用户所有设备的 access 与 refresh 会话将立即失效，之后需要重新登录。',
      okButtonProps: { danger: true },
      onOk: async () => {
        const result = await revokeUserSessions(userID, sessionID)
        message.success(`已强制下线 ${result.revoked} 个会话`)
        await load()
        onChanged()
      },
    })
  }

  const sessionColumns = [
    { title: '设备', key: 'device', render: (_: unknown, row: UserSession) => row.device_name || row.device_id },
    { title: '创建时间', key: 'created', render: (_: unknown, row: UserSession) => time(row.created_ms) },
    { title: '过期时间', key: 'expires', render: (_: unknown, row: UserSession) => time(row.expires_ms) },
    {
      title: '状态', key: 'status', render: (_: unknown, row: UserSession) => row.revoked_ms
        ? <Tag>已吊销</Tag>
        : row.expires_ms <= Date.now() ? <Tag>已过期</Tag> : <Tag color="green">有效</Tag>,
    },
    {
      title: '操作', key: 'action', render: (_: unknown, row: UserSession) => (
        <Button
          size="small"
          danger
          disabled={!!row.revoked_ms || !hasPermission('users:revoke_sessions')}
          onClick={() => revoke(row.id)}
        >下线</Button>
      ),
    },
  ]

  const logColumns = [
    { title: '时间', key: 'time', render: (_: unknown, row: LoginLog) => time(row.created_ms) },
    { title: '方式', dataIndex: 'method', key: 'method' },
    { title: '设备', key: 'device', render: (_: unknown, row: LoginLog) => row.device_name || row.device_id || '—' },
    { title: 'IP', dataIndex: 'masked_ip', key: 'ip' },
    { title: '结果', key: 'ok', render: (_: unknown, row: LoginLog) => row.ok ? <Tag color="green">成功</Tag> : <Tag color="red">失败</Tag> },
    { title: '说明', dataIndex: 'detail', key: 'detail' },
  ]

  const syncColumns = [
    { title: '实体类型', dataIndex: 'entity', key: 'entity' },
    { title: '记录数', dataIndex: 'record_count', key: 'count' },
    { title: '最新 revision', dataIndex: 'latest_revision', key: 'revision' },
    { title: '最新更新时间', key: 'updated', render: (_: unknown, row: SyncEntityMetadata) => time(row.latest_updated_ms) },
  ]

  return (
    <Drawer
      title={detail ? `用户：${detail.profile.display_name || detail.profile.username}` : '用户详情'}
      width={920}
      open={!!userID}
      onClose={onClose}
      destroyOnHidden
      extra={detail && (
        <Space>
          {hasPermission('users:revoke_sessions') && <Button danger onClick={() => revoke()}>全部下线</Button>}
          {hasPermission('users:ban') && (detail.profile.status === 'banned'
            ? <Button onClick={() => setBanAction('unban')}>解封</Button>
            : <Button danger onClick={() => setBanAction('ban')}>封禁</Button>)}
        </Space>
      )}
    >
      {error && <Alert type="error" showIcon message={error} />}
      {loading && <Typography.Text type="secondary">正在加载…</Typography.Text>}
      {detail && (
        <Tabs
          items={[
            {
              key: 'overview',
              label: '账号概要',
              children: (
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="用户 ID" span={2}>{detail.profile.id}</Descriptions.Item>
                  <Descriptions.Item label="用户名">{detail.profile.username}</Descriptions.Item>
                  <Descriptions.Item label="显示名">{detail.profile.display_name || '—'}</Descriptions.Item>
                  <Descriptions.Item label="邮箱">{detail.profile.masked_email ?? '—'}</Descriptions.Item>
                  <Descriptions.Item label="账号状态">{detail.profile.status}</Descriptions.Item>
                  <Descriptions.Item label="注册时间">{time(detail.profile.created_ms)}</Descriptions.Item>
                  <Descriptions.Item label="最近登录">{time(detail.profile.last_login_ms)}</Descriptions.Item>
                  <Descriptions.Item label="最近同步">{time(detail.profile.last_sync_ms)}</Descriptions.Item>
                  <Descriptions.Item label="注销申请">{time(detail.profile.deletion_requested_ms)}</Descriptions.Item>
                  <Descriptions.Item label="封禁原因" span={2}>{detail.profile.ban_reason || '—'}</Descriptions.Item>
                </Descriptions>
              ),
            },
            {
              key: 'sessions',
              label: `设备与会话 (${detail.sessions.length})`,
              children: <Table rowKey="id" size="small" columns={sessionColumns} dataSource={detail.sessions} pagination={false} />,
            },
            {
              key: 'logs',
              label: '登录记录',
              children: <Table rowKey="id" size="small" columns={logColumns} dataSource={detail.login_logs} pagination={{ pageSize: 20 }} />,
            },
            {
              key: 'sync',
              label: '同步元数据',
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Typography.Text>
                    设备 {detail.sync.device_count} · 变更 {detail.sync.change_count} · 最新游标 {detail.sync.latest_seq ?? '—'} · 最近同步 {time(detail.sync.last_sync_ms)}
                  </Typography.Text>
                  <Table rowKey="entity" size="small" columns={syncColumns} dataSource={detail.sync.entities} pagination={false} />
                </Space>
              ),
            },
            {
              key: 'operations',
              label: '管理操作记录',
              children: (
                <Table
                  rowKey="id"
                  size="small"
                  dataSource={detail.operations}
                  pagination={{ pageSize: 20 }}
                  columns={[
                    { title: '时间', key: 'time', render: (_: unknown, row) => time(row.created_ms) },
                    { title: '操作人', dataIndex: 'actor_subject', key: 'actor' },
                    { title: '动作', dataIndex: 'action', key: 'action' },
                    { title: '原因', dataIndex: 'reason', key: 'reason' },
                    { title: '结果', dataIndex: 'result', key: 'result' },
                  ]}
                />
              ),
            },
          ]}
        />
      )}

      <Modal
        title={banAction === 'ban' ? '封禁账号' : '解封账号'}
        open={!!banAction}
        onCancel={() => { setBanAction(null); setReason('') }}
        onOk={() => void submitBan()}
        confirmLoading={saving}
        okButtonProps={{ danger: banAction === 'ban', disabled: reason.trim().length < 3 }}
      >
        <Alert
          type={banAction === 'ban' ? 'warning' : 'info'}
          showIcon
          message={banAction === 'ban'
            ? '封禁将禁止登录、刷新和同步，并立即使现有会话失效。'
            : '解封后用户可重新登录；被封禁时吊销的旧会话不会恢复。'}
        />
        <Typography.Paragraph style={{ marginTop: 16 }}>操作原因（必填，写入审计）</Typography.Paragraph>
        <Input.TextArea
          rows={4}
          maxLength={500}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="请填写原因分类与详细说明，可关联事件编号"
        />
      </Modal>
    </Drawer>
  )
}
