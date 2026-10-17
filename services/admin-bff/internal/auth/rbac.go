// Package auth 提供管理后台的固定角色与权限点。
//
// MVP 不提供可视化自定义角色：权限矩阵只在这里定义，Admin BFF 每个
// 受保护接口都必须做服务端检查，前端菜单隐藏不构成授权边界。
package auth

// Role 是后台管理员的预定义角色。
type Role string

const (
	RoleAnalyst            Role = "analyst"
	RoleUserOperator       Role = "user_operator"
	RoleMembershipOperator Role = "membership_operator"
	RoleAuditor            Role = "auditor"
	RoleSecurityAdmin      Role = "security_admin"
	RoleEmergencyAdmin     Role = "emergency_admin"
)

// Permission 是 Admin BFF 服务端鉴权的最小权限点。
type Permission string

const (
	PermissionDashboardRead       Permission = "dashboard:read"
	PermissionUsersRead           Permission = "users:read"
	PermissionUsersBan            Permission = "users:ban"
	PermissionUsersRevokeSessions Permission = "users:revoke_sessions"
	PermissionMembershipRead      Permission = "membership:read"
	PermissionMembershipWrite     Permission = "membership:write"
	PermissionAuditRead           Permission = "audit:read"
	PermissionAuditExport         Permission = "audit:export"
	PermissionAdminGrant          Permission = "admin:grant"
)

var rolePermissions = map[Role][]Permission{
	RoleAnalyst: {
		PermissionDashboardRead,
	},
	RoleUserOperator: {
		PermissionUsersRead,
		PermissionUsersBan,
		PermissionUsersRevokeSessions,
	},
	RoleMembershipOperator: {
		PermissionUsersRead, // 选择会员目标所需的最小账号元数据
		PermissionMembershipRead,
		PermissionMembershipWrite,
	},
	RoleAuditor: {
		PermissionAuditRead,
	},
	RoleSecurityAdmin: {
		PermissionAuditRead,
		PermissionAdminGrant,
	},
	RoleEmergencyAdmin: {
		PermissionDashboardRead,
		PermissionUsersRead,
		PermissionUsersBan,
		PermissionUsersRevokeSessions,
		PermissionMembershipRead,
		PermissionMembershipWrite,
		PermissionAuditRead,
		PermissionAuditExport,
		PermissionAdminGrant,
	},
}

// ValidRoles 返回稳定顺序的全部合法角色，供配置校验与管理界面使用。
func ValidRoles() []Role {
	return []Role{
		RoleAnalyst,
		RoleUserOperator,
		RoleMembershipOperator,
		RoleAuditor,
		RoleSecurityAdmin,
		RoleEmergencyAdmin,
	}
}

// Valid 报告角色是否在固定矩阵中；未知角色一律无权。
func (r Role) Valid() bool {
	_, ok := rolePermissions[r]
	return ok
}

// Permissions 返回角色权限的副本，调用方不能修改全局矩阵。
func (r Role) Permissions() []Permission {
	perms := rolePermissions[r]
	return append([]Permission(nil), perms...)
}

// HasPermission 采用默认拒绝：未知角色或未知权限都返回 false。
func HasPermission(role Role, permission Permission) bool {
	for _, candidate := range rolePermissions[role] {
		if candidate == permission {
			return true
		}
	}
	return false
}

// CanGrantRole 限定可授权范围。安全管理员不能授予应急超管；
// 应急超管可授予所有合法角色。禁止自我提权和保护最后一个应急
// 管理员还必须在授权用例中按 sso_subject 与全量角色计数检查。
func CanGrantRole(actor, target Role) bool {
	if !target.Valid() {
		return false
	}
	switch actor {
	case RoleEmergencyAdmin:
		return true
	case RoleSecurityAdmin:
		return target != RoleEmergencyAdmin
	default:
		return false
	}
}
