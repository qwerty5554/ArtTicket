package controllers

import (
	"go.uber.org/zap"
	"net/http"

	"artticket-backend/internal/entities"
	"artticket-backend/internal/repositories"
	loggerservice "github.com/qwerty5554/shared/logger"

	"fmt"
	"github.com/gin-gonic/gin"
)

func CreateTicket(c *gin.Context) {

	var ticket entities.Ticket

	if err := c.BindJSON(&ticket); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid json",
		})

		return
	}

	userID := c.GetInt("user_id")
	fmt.Println("USER ID:", userID)
	fmt.Println("TICKET:", ticket)

	ticket.UserID = userID

	ticketID, err := repositories.CreateTicket(ticket)

	if err != nil {
		loggerservice.Logger.Error(
			"create ticket error",
			zap.Error(err),
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "ticket created",
		"id":      ticketID,
	})
}

func GetMyTickets(c *gin.Context) {

	userID := c.GetInt("user_id")

	tickets, err := repositories.GetTicketsByUserID(
		userID,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, tickets)
}
