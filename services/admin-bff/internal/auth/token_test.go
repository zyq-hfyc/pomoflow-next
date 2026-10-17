package auth

import (
	"encoding/base64"
	"strings"
	"testing"
)

func TestNewRandomToken(t *testing.T) {
	t.Parallel()
	a, err := NewRandomToken()
	if err != nil {
		t.Fatal(err)
	}
	b, err := NewRandomToken()
	if err != nil {
		t.Fatal(err)
	}
	if a == b {
		t.Fatal("two random tokens must not match")
	}
	decoded, err := base64.RawURLEncoding.DecodeString(a)
	if err != nil {
		t.Fatalf("token is not raw-base64url: %v", err)
	}
	if len(decoded) != SessionTokenBytes {
		t.Fatalf("decoded token has %d bytes, want %d", len(decoded), SessionTokenBytes)
	}
	if strings.ContainsAny(a, "+/=") {
		t.Fatalf("token is not URL safe: %q", a)
	}
}

func TestHashTokenKnownVectorAndDomainSeparation(t *testing.T) {
	t.Parallel()
	if got := HashToken("abc"); got != "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad" {
		t.Fatalf("unexpected SHA-256 vector: %s", got)
	}
	if HashToken("same") == HashSessionID("same") {
		t.Fatal("token and session-id hashes must use domain separation")
	}
}

func TestHashDoesNotContainPlaintext(t *testing.T) {
	t.Parallel()
	const plain = "super-secret-session-token"
	if strings.Contains(HashToken(plain), plain) {
		t.Fatal("hash leaks plaintext token")
	}
}
