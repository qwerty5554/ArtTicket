package repositories

import (
	"testing"

	"artticket-backend/internal/entities"
	"artticket-backend/internal/infrastructure"

	loggerservice "github.com/qwerty5554/shared/logger"

	"github.com/stretchr/testify/assert"
)

func init() {

	loggerservice.InitLogger()

	infrastructure.ConnectDB()
}

func TestCreateTicket(t *testing.T) {

	ticket := entities.Ticket{
		UserID:     1,
		Exhibition: "Test Exhibition",
		Museum:     "Test Museum",
		Date:       "10 May 2026",
		Time:       "15:00",
		Count:      2,
		Price:      1200,
		Status:     "Оплачен",
	}

	id, err := CreateTicket(ticket)

	assert.NoError(t, err)

	assert.True(t, id > 0)
}

func TestGetTicketsByUserID(t *testing.T) {

	tickets, err := GetTicketsByUserID(1)

	assert.NoError(t, err)

	assert.NotNil(t, tickets)
}