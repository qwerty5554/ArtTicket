package repositories

import (
	"testing"
	"time"

	"artticket-backend/internal/entities"
	"artticket-backend/internal/infrastructure"

	loggerservice "github.com/qwerty5554/shared/logger"

	"github.com/stretchr/testify/assert"
)

var testEmail =
	"test_" +
	time.Now().Format("150405") +
	"@example.com"

func init() {

	loggerservice.InitLogger()

	infrastructure.ConnectDB()
}

func TestCreateUser(t *testing.T) {

	user := entities.User{
		FirstName: "Test",
		LastName:  "User",
		Email:     testEmail,
		Password:  "123456",
		Role:      "user",
	}

	err := CreateUser(user)

	assert.NoError(t, err)
}

func TestGetUserByEmail(t *testing.T) {

	user, err := GetUserByEmail(
		testEmail,
	)

	assert.NoError(t, err)

	assert.Equal(
		t,
		testEmail,
		user.Email,
	)
}