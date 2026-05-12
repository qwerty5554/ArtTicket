package repositories

import (
	"artticket-backend/internal/entities"
	"artticket-backend/internal/infrastructure"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestCreateTicketMock(t *testing.T) {

	realDB := infrastructure.DB

	db, mock, err := sqlmock.New()

	assert.NoError(t, err)

	infrastructure.DB = db

	defer func() {
		infrastructure.DB = realDB
		db.Close()
	}()

	ticket := entities.Ticket{
		UserID:     1,
		Exhibition: "Mock Exhibition",
		Museum:     "Mock Museum",
		Date:       "10 May 2026",
		Time:       "18:00",
		Count:      2,
		Price:      1000,
		Status:     "Оплачен",
	}

	mock.ExpectQuery(
		regexp.QuoteMeta(
			"INSERT INTO tickets (user_id, exhibition, museum, date, time, count, price, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
		),
	).
		WithArgs(
			ticket.UserID,
			ticket.Exhibition,
			ticket.Museum,
			ticket.Date,
			ticket.Time,
			ticket.Count,
			ticket.Price,
			ticket.Status,
		).
		WillReturnRows(
			sqlmock.NewRows([]string{"id"}).AddRow(1),
		)

	id, err := CreateTicket(ticket)

	assert.NoError(t, err)

	assert.Equal(t, 1, id)

	assert.NoError(
		t,
		mock.ExpectationsWereMet(),
	)
}