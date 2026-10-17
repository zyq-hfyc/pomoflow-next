import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Card, Col, Row, Segmented, Space, Spin, Statistic, Typography } from 'antd'
import { Line } from '@ant-design/plots'
import { getDashboard } from '../services/admin'
import type { DashboardData } from '../types'

const ranges = [
  { label: '近 7 天', value: '7' },
  { label: '近 30 天', value: '30' },
  { label: '近 90 天', value: '90' },
]

function percent(value: number | null): string {
  return value === null ? '—' : `${(value * 100).toFixed(1)}%`
}

function countOrDash(value: number | null): string {
  return value === null ? '—' : String(value)
}

export default function DashboardPage() {
  const [days, setDays] = useState('30')
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const to = new Date().toISOString().slice(0, 10)
      const from = new Date(Date.now() - Number(days) * 86_400_000).toISOString().slice(0, 10)
      setData(await getDashboard({ from, to, granularity: 'day' }))
    } catch (err) {
      setError(err instanceof Error ? err.message : '看板加载失败')
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => { void load() }, [load])

  const userTrend = useMemo(() => data?.trends.flatMap((item) => [
    { bucket: item.bucket, metric: '新增用户', value: item.new_users },
    { bucket: item.bucket, metric: '云端活跃用户', value: item.active_users },
  ]) ?? [], [data])
  // Pull 变更口径待 Analytics 上线(null):跳过该点,不能画成 0
  const syncTrend = useMemo(() => data?.trends.flatMap((item) => [
    { bucket: item.bucket, metric: 'Push 变更', value: item.pushed_changes },
    ...(item.pulled_changes === null
      ? []
      : [{ bucket: item.bucket, metric: 'Pull 变更', value: item.pulled_changes }]),
  ]) ?? [], [data])

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <div className="page-heading">
        <div>
          <Typography.Title level={3}>数据看板</Typography.Title>
          <Typography.Text type="secondary">云端账号与同步指标，不含用户任务或复盘正文。</Typography.Text>
        </div>
        <Segmented options={ranges} value={days} onChange={(value) => setDays(String(value))} />
      </div>

      {error && <Alert type="error" showIcon message="看板加载失败" description={error} />}
      {loading && <div className="page-center"><Spin /></div>}
      {!loading && data && (
        <>
          {data.stale && (
            <Alert
              type="warning"
              showIcon
              message="聚合数据未更新"
              description="当前展示的是最近一次成功聚合结果，不将延迟数据当作零值。"
            />
          )}
          {data.metrics.dau === null && (
            <Alert
              type="info"
              showIcon
              message="部分指标口径待 Analytics 服务上线"
              description="DAU/WAU/MAU、留存与 Pull 变更量暂不可见（显示为 —），待 P4 Analytics 服务上线后补齐，不会用估算值填充。"
            />
          )}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} xl={6}><Card><Statistic title="累计注册用户" value={data.metrics.total_users} /></Card></Col>
            <Col xs={24} sm={12} xl={6}><Card><Statistic title="周期新增用户" value={data.metrics.new_users} /></Card></Col>
            <Col xs={24} sm={12} xl={6}><Card><Statistic title="周期云端活跃" value={data.metrics.active_users} /></Card></Col>
            <Col xs={24} sm={12} xl={6}><Card><Statistic title="同步设备数" value={data.metrics.sync_devices} /></Card></Col>
            <Col xs={24} sm={8}><Card><Statistic title="DAU / WAU / MAU" value={`${countOrDash(data.metrics.dau)} / ${countOrDash(data.metrics.wau)} / ${countOrDash(data.metrics.mau)}`} /></Card></Col>
            <Col xs={24} sm={8}><Card><Statistic title="D1 / D7 / D30 留存" value={`${percent(data.metrics.d1_retention)} / ${percent(data.metrics.d7_retention)} / ${percent(data.metrics.d30_retention)}`} /></Card></Col>
            <Col xs={24} sm={8}><Card><Statistic title="Push / Pull 变更" value={`${data.metrics.pushed_changes} / ${countOrDash(data.metrics.pulled_changes)}`} /></Card></Col>
          </Row>
          <Card title="用户趋势" variant="outlined">
            <Line
              data={userTrend}
              xField="bucket"
              yField="value"
              colorField="metric"
              smooth
              height={300}
              axis={{ y: { min: 0 } }}
            />
          </Card>
          <Card title="同步量趋势" variant="outlined">
            <Line
              data={syncTrend}
              xField="bucket"
              yField="value"
              colorField="metric"
              smooth
              height={300}
              axis={{ y: { min: 0 } }}
            />
          </Card>
          <Card size="small" variant="borderless">
            <Typography.Text type="secondary">
              指标口径：云端活跃/留存；时区 {data.range.timezone}。
              聚合时间 {new Date(data.generated_at_ms).toLocaleString()}；
              数据源更新 {data.source_updated_at_ms ? new Date(data.source_updated_at_ms).toLocaleString() : '暂无'}。
            </Typography.Text>
          </Card>
        </>
      )}
    </Space>
  )
}
