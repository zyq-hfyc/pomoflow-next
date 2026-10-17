package httpapi

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type errorBody struct {
	Code      string `json:"code"`
	Message   string `json:"message"`
	RequestID string `json:"request_id"`
}

func writeError(c *gin.Context, status int, code, message string) {
	c.AbortWithStatusJSON(status, gin.H{
		"error": errorBody{Code: code, Message: message, RequestID: currentRequestID(c)},
	})
}

func internalError(c *gin.Context, err error) {
	log.Printf("admin request failed request_id=%s path=%s err=%v", currentRequestID(c), c.Request.URL.Path, err)
	writeError(c, http.StatusInternalServerError, "INTERNAL", "internal server error")
}
