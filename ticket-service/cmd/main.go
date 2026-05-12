package main

// @title ArtTicket API
// @version 1.0
// @description Backend for ArtTicket
// @host localhost:8082
// @BasePath /

import (
	_ "artticket-backend/docs"

	"artticket-backend/internal/controllers"
	"artticket-backend/internal/infrastructure"
	"artticket-backend/internal/routes"

	loggerservice "github.com/qwerty5554/shared/logger"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {

	loggerservice.InitLogger()

	infrastructure.ConnectDB()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},

		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},

		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},

		ExposeHeaders: []string{
			"Content-Length",
		},

		AllowCredentials: true,
	}))

	router.GET("/ws/chat", controllers.ChatWebSocket)

	routes.SetupRoutes(router)

	router.GET(
		"/swagger/*any",
		ginSwagger.WrapHandler(swaggerFiles.Handler),
	)

	go infrastructure.HandleMessages()

	router.Run(":8082")
}