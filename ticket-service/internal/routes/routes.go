package routes

import (
	"artticket-backend/internal/controllers"
	"artticket-backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	authorized := r.Group("/")
	authorized.Use(middleware.AuthMiddleware())

	authorized.POST(
		"/tickets",
		controllers.CreateTicket,
	)

	authorized.GET(
		"/tickets/my",
		controllers.GetMyTickets,
	)
}