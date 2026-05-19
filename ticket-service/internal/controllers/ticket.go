package controllers

import (
	"go.uber.org/zap"
	"net/http"

	"artticket-backend/internal/entities"
	"artticket-backend/internal/repositories"
	loggerservice "github.com/qwerty5554/ArtTicket/shared/logger"

	"fmt"
	"github.com/gin-gonic/gin"
)

// CreateTicket godoc
// @Summary Создать билет
// @Description Создание нового билета
// @Tags tickets
// @Accept json
// @Produce json
// @Param ticket body entities.Ticket true "Ticket"
// @Success 200 {object} map[string]interface{}
// @Router /tickets [post]
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

// GetMyTickets godoc
// @Summary Получить мои билеты
// @Tags tickets
// @Produce json
// @Success 200 {array} entities.Ticket
// @Router /tickets/my [get]
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

// GetAdminBookings godoc
// @Summary Получить все бронирования
// @Description Список всех билетов для администратора
// @Tags admin
// @Produce json
// @Success 200 {array} repositories.AdminTicket
// @Router /admin/bookings [get]
func GetAdminBookings(c *gin.Context) {

	tickets, err :=
		repositories.GetAllTicketsForAdmin()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, tickets)
}