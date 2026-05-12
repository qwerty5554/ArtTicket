package controllers

import (
	"artticket-backend/internal/infrastructure"
	"log"

	"github.com/gin-gonic/gin"
)

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

	infrastructure.Clients[client] = true

	defer func() {

		conn.Close()

		delete(
			infrastructure.Clients,
			client,
		)
	}()

	for {

		_, message, err := conn.ReadMessage()

		if err != nil {

			log.Println(err)

			delete(
				infrastructure.Clients,
				client,
			)

			break
		}

		infrastructure.Broadcast <- message
	}
}