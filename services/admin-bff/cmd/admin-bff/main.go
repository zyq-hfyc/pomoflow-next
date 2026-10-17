package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	adminbff "github.com/zyq-hfyc/pomoflow-next/services/admin-bff"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/auth"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/config"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/httpapi"
	"github.com/zyq-hfyc/pomoflow-next/services/admin-bff/internal/store"
)

func main() {
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load admin config: %v", err)
	}

	startupCtx, cancelStartup := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancelStartup()
	st, err := store.ConnectPostgres(startupCtx, cfg.DatabaseURL, adminbff.Schema)
	if err != nil {
		log.Fatalf("initialize admin store: %v", err)
	}
	defer st.Close()
	sso, err := auth.NewOIDCService(startupCtx, cfg.OIDCIssuer, cfg.OIDCClientID,
		cfg.OIDCClientSecret, cfg.OIDCRedirectURL)
	if err != nil {
		log.Fatalf("initialize OIDC: %v", err)
	}
	router, err := httpapi.NewRouter(cfg, st, sso)
	if err != nil {
		log.Fatalf("initialize admin router: %v", err)
	}

	server := &http.Server{
		Addr:              fmt.Sprintf(":%d", cfg.Port),
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	go func() {
		log.Printf("admin-bff listening on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("admin-bff listen: %v", err)
		}
	}()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	<-ctx.Done()
	shutdownCtx, cancelShutdown := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancelShutdown()
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("admin-bff shutdown: %v", err)
	}
}
