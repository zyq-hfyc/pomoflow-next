package auth

import "testing"

func TestSessionValid(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name    string
		session Session
		now     int64
		want    bool
	}{
		{"active", Session{ExpiresMS: 2000}, 1000, true},
		{"expires at boundary", Session{ExpiresMS: 2000}, 2000, false},
		{"already expired", Session{ExpiresMS: 2000}, 2001, false},
		{"revoked", Session{ExpiresMS: 2000, RevokedMS: 1500}, 1000, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.session.Valid(tt.now); got != tt.want {
				t.Fatalf("Valid(%d) = %v, want %v", tt.now, got, tt.want)
			}
		})
	}
}

func TestSessionCSRFValid(t *testing.T) {
	t.Parallel()
	session := Session{CSRFHash: HashToken("expected-csrf")}
	if !session.CSRFValid("expected-csrf") {
		t.Fatal("correct CSRF token rejected")
	}
	for _, token := range []string{"", "wrong", "expected-csrf-suffix"} {
		if session.CSRFValid(token) {
			t.Fatalf("invalid CSRF token %q accepted", token)
		}
	}
	if (Session{CSRFHash: ""}).CSRFValid("") {
		t.Fatal("empty stored CSRF hash must fail closed")
	}
}
