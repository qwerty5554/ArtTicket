package routes

import (
	"artticket-backend/internal/controllers"
	"artticket-backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	authorized := r.Group("/")
	authorized.Use(middleware.AuthMiddleware())
}