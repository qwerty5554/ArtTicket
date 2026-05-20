package controllers

import (
	"log"

	"artticket-backend/internal/infrastructure"
	"artticket-backend/internal/usecases"

	"github.com/gin-gonic/gin"
)

var chatUsecase =
	usecases.NewChatUsecase()

// ChatWebSocket godoc
// @Summary WebSocket чат поддержки
// @Tags chat
// @Produce json
// @Router /ws/chat [get]
func ChatWebSocket(c *gin.Context) {

	conn, err := infrastructure.Upgrader.Upgrade(
		c.Writer,
		c.Request,
		nil,
	)

	if err != nil {

		log.Println(err)

		return
	}

	client := &infrastructure.Client{
		Conn: conn,
	}

	chatUsecase.AddClient(client)

	defer func() {

		conn.Close()

		chatUsecase.RemoveClient(client)
	}()

	for {

		_, message, err := conn.ReadMessage()

		if err != nil {

			log.Println(err)

			chatUsecase.RemoveClient(client)

			break
		}

		chatUsecase.BroadcastMessage(
			message,
		)
	}
}