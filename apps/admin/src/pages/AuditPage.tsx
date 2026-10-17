import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Card, Input, Select, Space, Table, Tag, Typography } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { listAudit } from '../services/admin'
import type { AuditRecord } from '../types'

function time(value: number): string {
  return new Date(value).toLocaleString()
}

export default function AuditPage() {
  const [items, setItems] = useState<AuditRecord[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [actor, setActor] = useState('')
  const [module, setModule] = useState('')
  const [result, setResult] = useState('')
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await listAudit({ actor, module, result, target_id: target, page, page_size: pageSize })
      setItems(response.items)
      setTotal(response.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : '审计日志加载失败')
    } finally {
      setLoading(false)
    }
  }, [actor, module, result, target, page, pageSize])

  useEffect(() => { void load() }, [load])

  return (
    <Card>
      <div className="page-heading">
        <div>
          <Typography.Title level={3}>审计中心</Typography.Title>
          <Typography.Text type="secondary">只追加、不可修改；敏感值保持脱敏，可按请求关联 ID 追责。</Typography.Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={() => void load()}>刷新</Button>
      </div>
      <Space wrap style={{ marginBottom: 16 }}>
        <Input allowClear placeholder="操作人 subject" value={actor} onChange={(e) => { setActor(e.target.value); setPage(1) }} />
        <Select
          allowClear
          placeholder="模块"
          style={{ width: 150 }}
          value={module || undefined}
          onChange={(value) => { setModule(value ?? ''); setPage(1) }}
          options={['auth', 'authz', 'users', 'membership', 'authorization', 'dashboard'].map((value) => ({ value, label: value }))}
        />
        <Select
          allowClear
          placeholder="结果"
          style={{ width: 120 }}
          value={result || undefined}
          onChange={(value) => { setResult(value ?? ''); setPage(1) }}
          options={[{ value: 'ok', label: '成功' }, { value: 'denied', label: '拒绝' }, { value: 'error', label: '失败' }]}
        />
        <Input allowClear placeholder="目标用户 ID" value={target} onChange={(e) => { setTarget(e.target.value); setPage(1) }} />
      </Space>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Table<AuditRecord>
        rowKey="id"
        loading={loading}
        dataSource={items}
        expandable={{
          expandedRowRender: (row) => (
            <Space direction="vertical">
              <Typography.Text>请求关联 ID：{row.request_id}</Typography.Text>
              <Typography.Text>来源 IP：{row.ip || '—'}</Typography.Text>
              <pre className="audit-detail">{JSON.stringify(row.detail, null, 2)}</pre>
            </Space>
          ),
        }}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (value) => `共 ${value} 条审计记录`,
          onChange: (next, size) => { setPage(next); setPageSize(size) },
        }}
        columns={[
          { title: '时间', key: 'time', render: (_, row) => time(row.created_ms) },
          { title: '操作人', key: 'actor', render: (_, row) => row.actor_subject || '匿名/系统' },
          { title: '角色', dataIndex: 'actor_role', key: 'role' },
          { title: '模块', dataIndex: 'module', key: 'module' },
          { title: '动作', dataIndex: 'action', key: 'action' },
          { title: '目标', key: 'target', render: (_, row) => row.target_id ? `${row.target_type}:${row.target_id}` : '—' },
          {
            title: '结果',
            dataIndex: 'result',
            key: 'result',
            render: (value) => <Tag color={value === 'ok' ? 'green' : value === 'denied' ? 'orange' : 'red'}>{value}</Tag>,
          },
          { title: '原因', dataIndex: 'reason', key: 'reason', ellipsis: true },
        ]}
      />
    </Card>
  )
}
