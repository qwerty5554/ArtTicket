package controllers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"artticket-backend/internal/infrastructure"
	loggerservice "github.com/qwerty5554/ArtTicket/shared/logger"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

var testEmail =
	"controller_" +
	time.Now().Format("150405") +
	"@example.com"

func init() {

	loggerservice.InitLogger()

	infrastructure.ConnectDB()
}

func TestRegister(t *testing.T) {

	gin.SetMode(gin.TestMode)

	router := gin.Default()

	router.POST("/register", Register)

	json := `{
		"first_name":"Test",
		"last_name":"User",
		"email":"` + testEmail + `",
		"password":"123456"
	}`

	req, _ := http.NewRequest(
		"POST",
		"/register",
		bytes.NewBuffer([]byte(json)),
	)

	req.Header.Set(
		"Content-Type",
		"application/json",
	)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(
		t,
		http.StatusOK,
		w.Code,
	)
}

func TestLogin(t *testing.T) {

	gin.SetMode(gin.TestMode)

	router := gin.Default()

	router.POST("/login", Login)

	json := `{
		"email":"` + testEmail + `",
		"password":"123456"
	}`

	req, _ := http.NewRequest(
		"POST",
		"/login",
		bytes.NewBuffer([]byte(json)),
	)

	req.Header.Set(
		"Content-Type",
		"application/json",
	)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(
		t,
		http.StatusOK,
		w.Code,
	)
}