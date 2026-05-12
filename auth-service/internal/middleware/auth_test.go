package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	jwtservice "github.com/qwerty5554/ArtTicket/shared/jwt"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestAuthMiddleware_NoToken(t *testing.T) {

	gin.SetMode(gin.TestMode)

	router := gin.Default()

	router.Use(AuthMiddleware())

	router.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})

	req, _ := http.NewRequest(
		"GET",
		"/test",
		nil,
	)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(
		t,
		http.StatusUnauthorized,
		w.Code,
	)
}

func TestAuthMiddleware_InvalidToken(t *testing.T) {

	gin.SetMode(gin.TestMode)

	router := gin.Default()

	router.Use(AuthMiddleware())

	router.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})

	req, _ := http.NewRequest(
		"GET",
		"/test",
		nil,
	)

	req.Header.Set(
		"Authorization",
		"Bearer invalidtoken",
	)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(
		t,
		http.StatusUnauthorized,
		w.Code,
	)
}

func TestAuthMiddleware_ValidToken(t *testing.T) {

	gin.SetMode(gin.TestMode)

	router := gin.Default()

	router.Use(AuthMiddleware())

	router.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})

	token, _ := jwtservice.GenerateToken(
		1,
		"user",
	)

	req, _ := http.NewRequest(
		"GET",
		"/test",
		nil,
	)

	req.Header.Set(
		"Authorization",
		"Bearer "+token,
	)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(
		t,
		http.StatusOK,
		w.Code,
	)
}