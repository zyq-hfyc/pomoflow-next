import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  App,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd'
import {
  CloudUploadOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import {
  createRelease,
  deleteRelease,
  deleteReleaseAsset,
  listReleases,
  publishRelease,
  unpublishRelease,
  uploadReleaseAsset,
} from '../services/admin'
import type { Release, ReleaseAsset, ReleasePlatform, ReleaseStatus } from '../types'

const PLATFORMS: Array<{ value: ReleasePlatform; label: string }> = [
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
  { value: 'mac', label: 'macOS' },
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'harmony', label: '鸿蒙' },
]

const statusBadge: Record<ReleaseStatus, { text: string; color: string }> = {
  draft: { text: '草稿', color: 'default' },
  published: { text: '已发布', color: 'green' },
  unpublished: { text: '已下架', color: 'orange' },
}

// 与 sync-server EXT_WHITELIST 对齐(单段扩展,.tar.gz 这类 v1 不支持)
const UPLOAD_ACCEPT = '.exe,.msi,.zip,.appimage,.deb,.rpm,.dmg,.pkg,.ipa,.apk,.hap,.app'

function formatSize(bytes: number): string {
  if (bytes >= 1 << 30) return `${(bytes / (1 << 30)).toFixed(2)} GiB`
  if (bytes >= 1 << 20) return `${(bytes / (1 << 20)).toFixed(1)} MiB`
  if (bytes >= 1 << 10) return `${(bytes / (1 << 10)).toFixed(0)} KiB`
  return `${bytes} B`
}

function time(value: number | null): string {
  return value ? new Date(value).toLocaleString() : '—'
}

export default function ReleasesPage() {
  const { message } = App.useApp()
  const [releases, setReleases] = useState<Release[]>([])
  const [downloadBase, setDownloadBase] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [form] = Form.useForm()

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await listReleases()
      setReleases(result.items)
      setDownloadBase(result.download_base_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : '版本列表加载失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load() }, [load])

  const onCreate = async () => {
    try {
      const values = await form.validateFields()
      await createRelease(values.version, values.notes ?? '')
      message.success(`版本 ${values.version} 已创建(草稿)`)
      setCreating(false)
      form.resetFields()
      await load()
    } catch (err) {
      if (err instanceof Error) message.error(err.message)
    }
  }

  const onTogglePublish = async (release: Release, publish: boolean) => {
    try {
      if (publish) {
        await publishRelease(release.id)
        message.success(`版本 ${release.version} 已发布,官网立即可见`)
      } else {
        await unpublishRelease(release.id)
        message.success(`版本 ${release.version} 已下架`)
      }
      await load()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '操作失败')
    }
  }

  const onDeleteRelease = async (release: Release) => {
    try {
      await deleteRelease(release.id)
      message.success(`版本 ${release.version} 已删除`)
      await load()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '删除失败')
    }
  }

  const onUpload = async (release: Release, platform: ReleasePlatform, file: File) => {
    try {
      await uploadReleaseAsset(release.id, platform, file)
      message.success(`${file.name} 上传成功(${PLATFORMS.find((p) => p.value === platform)?.label})`)
      await load()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '上传失败')
    }
  }

  const onDeleteAsset = async (release: Release, asset: ReleaseAsset) => {
    try {
      await deleteReleaseAsset(release.id, asset.id)
      message.success(`已移除 ${asset.filename}`)
      await load()
    } catch (err) {
      message.error(err instanceof Error ? err.message : '移除失败')
    }
  }

  const onCopyLink = async (asset: ReleaseAsset) => {
    try {
      await navigator.clipboard.writeText(`${downloadBase}${asset.download_path}`)
      message.success('下载链接已复制')
    } catch {
      message.error('复制失败,请手动拼接:' + downloadBase + asset.download_path)
    }
  }

  const uploadSlot = (release: Release, platform: { value: ReleasePlatform; label: string }) => {
    const existing = release.assets.find((asset) => asset.platform === platform.value)
    return (
      <Space key={platform.value} size={4}>
        <Upload
          showUploadList={false}
          accept={UPLOAD_ACCEPT}
          customRequest={({ file, onSuccess, onError }) => {
            void onUpload(release, platform.value, file as File)
              .then(() => onSuccess?.({}))
              .catch((err) => onError?.(err))
          }}
        >
          <Button size="small" icon={<CloudUploadOutlined />}>
            {existing ? '替换' : '上传'}
          </Button>
        </Upload>
        {existing && (
          <>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {existing.filename} · {formatSize(existing.size_bytes)} ·
              {' '}{existing.sha256.slice(0, 8)} · {existing.download_count} 次下载
            </Typography.Text>
            <Button size="small" type="text" icon={<CopyOutlined />}
              onClick={() => void onCopyLink(existing)}>
              复制链接
            </Button>
          </>
        )}
        {existing && release.status !== 'published' && (
          <Popconfirm title="确认移除该平台安装包?" onConfirm={() => void onDeleteAsset(release, existing)}>
            <Button size="small" type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        )}
      </Space>
    )
  }

  return (
    <Card>
      <div className="page-heading">
        <div>
          <Typography.Title level={3}>发布分发</Typography.Title>
          <Typography.Text type="secondary">
            建版本 → 上传各平台安装包(默认草稿)→ 发布后官网立即可见可下载;下架即回收。
          </Typography.Text>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => void load()}>刷新</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreating(true)}>新建版本</Button>
        </Space>
      </div>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Table<Release>
        rowKey="id"
        loading={loading}
        dataSource={releases}
        pagination={false}
        expandable={{
          expandedRowRender: (release) => (
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {PLATFORMS.map((platform) => uploadSlot(release, platform))}
            </Space>
          ),
        }}
        columns={[
          {
            title: '版本',
            dataIndex: 'version',
            key: 'version',
            render: (value: string) => <Typography.Text strong>v{value}</Typography.Text>,
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value: ReleaseStatus) => (
              <Tag color={statusBadge[value].color}>{statusBadge[value].text}</Tag>
            ),
          },
          {
            title: '资产',
            key: 'assets',
            render: (_, row) => `${row.assets.length} / ${PLATFORMS.length} 平台`,
          },
          { title: '创建时间', key: 'created', render: (_, row) => time(row.created_ms) },
          { title: '发布时间', key: 'published', render: (_, row) => time(row.published_ms) },
          {
            title: '操作',
            key: 'action',
            render: (_, row) => (
              <Space size={4}>
                {row.status !== 'published' && (
                  <Button size="small" type="primary" ghost onClick={() => void onTogglePublish(row, true)}>
                    发布
                  </Button>
                )}
                {row.status === 'published' && (
                  <Button size="small" onClick={() => void onTogglePublish(row, false)}>下架</Button>
                )}
                {row.status !== 'published' && (
                  <Popconfirm
                    title="删除后不可恢复,确认?"
                    onConfirm={() => void onDeleteRelease(row)}
                  >
                    <Button size="small" danger>删除</Button>
                  </Popconfirm>
                )}
              </Space>
            ),
          },
        ]}
      />
      <Modal
        title="新建版本"
        open={creating}
        onOk={() => void onCreate()}
        onCancel={() => setCreating(false)}
        okText="创建"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="version"
            label="版本号"
            rules={[{ required: true, message: '版本号必填,如 0.2.1' }]}
          >
            <Input placeholder="0.2.1" />
          </Form.Item>
          <Form.Item name="notes" label="更新说明">
            <Input.TextArea rows={4} placeholder="面向官网展示的更新说明(支持换行)" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
