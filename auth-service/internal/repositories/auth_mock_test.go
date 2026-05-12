package repositories

import (
	"artticket-backend/internal/entities"
	"artticket-backend/internal/infrastructure"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestCreateUserMock(t *testing.T) {

	realDB := infrastructure.DB

	db, mock, err := sqlmock.New()

	assert.NoError(t, err)

	infrastructure.DB = db

	defer func() {
		infrastructure.DB = realDB
		db.Close()
	}()

	user := entities.User{
		FirstName: "Test",
		LastName:  "User",
		Email:     "mock@example.com",
		Password:  "123456",
		Role:      "user",
	}

	mock.ExpectExec(
		regexp.QuoteMeta(
			"INSERT INTO users(first_name, last_name, email, password, role) VALUES($1,$2,$3,$4,$5)",
		),
	).
		WithArgs(
			user.FirstName,
			user.LastName,
			user.Email,
			user.Password,
			user.Role,
		).
		WillReturnResult(
			sqlmock.NewResult(1, 1),
		)

	err = CreateUser(user)

	assert.NoError(t, err)

	assert.NoError(
		t,
		mock.ExpectationsWereMet(),
	)
}