package auth

import "testing"

func TestRolePermissions(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		role Role
		want Permission
	}{
		{"analyst reads dashboard", RoleAnalyst, PermissionDashboardRead},
		{"user operator reads users", RoleUserOperator, PermissionUsersRead},
		{"user operator bans users", RoleUserOperator, PermissionUsersBan},
		{"user operator revokes sessions", RoleUserOperator, PermissionUsersRevokeSessions},
		{"membership operator reads membership", RoleMembershipOperator, PermissionMembershipRead},
		{"membership operator writes membership", RoleMembershipOperator, PermissionMembershipWrite},
		{"auditor reads audit", RoleAuditor, PermissionAuditRead},
		{"security admin grants roles", RoleSecurityAdmin, PermissionAdminGrant},
		{"emergency admin reads dashboard", RoleEmergencyAdmin, PermissionDashboardRead},
		{"emergency admin grants roles", RoleEmergencyAdmin, PermissionAdminGrant},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if !HasPermission(tt.role, tt.want) {
				t.Fatalf("HasPermission(%q, %q) = false, want true", tt.role, tt.want)
			}
		})
	}
}

func TestRoleDeniesOutOfScopePermissions(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		role Role
		perm Permission
	}{
		{"analyst cannot read user details", RoleAnalyst, PermissionUsersRead},
		{"analyst cannot ban", RoleAnalyst, PermissionUsersBan},
		{"user operator cannot adjust membership", RoleUserOperator, PermissionMembershipWrite},
		{"user operator cannot grant roles", RoleUserOperator, PermissionAdminGrant},
		{"membership operator cannot ban", RoleMembershipOperator, PermissionUsersBan},
		{"membership operator cannot revoke sessions", RoleMembershipOperator, PermissionUsersRevokeSessions},
		{"auditor cannot write membership", RoleAuditor, PermissionMembershipWrite},
		{"auditor cannot export by default", RoleAuditor, PermissionAuditExport},
		{"security admin cannot adjust membership", RoleSecurityAdmin, PermissionMembershipWrite},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if HasPermission(tt.role, tt.perm) {
				t.Fatalf("HasPermission(%q, %q) = true, want false", tt.role, tt.perm)
			}
		})
	}
}

func TestUnknownRoleHasNoPermissions(t *testing.T) {
	t.Parallel()
	if HasPermission(Role("not-a-role"), PermissionDashboardRead) {
		t.Fatal("unknown role must be denied by default")
	}
}

func TestEveryValidRoleIsKnown(t *testing.T) {
	t.Parallel()
	for _, role := range ValidRoles() {
		if !role.Valid() {
			t.Fatalf("ValidRoles contains invalid role %q", role)
		}
		if len(role.Permissions()) == 0 {
			t.Fatalf("valid role %q has no permissions", role)
		}
	}
}

func TestCanGrantRole(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name   string
		actor  Role
		target Role
		want   bool
	}{
		{"security grants analyst", RoleSecurityAdmin, RoleAnalyst, true},
		{"security grants user operator", RoleSecurityAdmin, RoleUserOperator, true},
		{"security cannot grant emergency", RoleSecurityAdmin, RoleEmergencyAdmin, false},
		{"security cannot grant unknown", RoleSecurityAdmin, Role("bad"), false},
		{"emergency grants emergency", RoleEmergencyAdmin, RoleEmergencyAdmin, true},
		{"user operator cannot grant", RoleUserOperator, RoleAnalyst, false},
		{"auditor cannot grant", RoleAuditor, RoleAnalyst, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CanGrantRole(tt.actor, tt.target); got != tt.want {
				t.Fatalf("CanGrantRole(%q, %q) = %v, want %v", tt.actor, tt.target, got, tt.want)
			}
		})
	}
}
