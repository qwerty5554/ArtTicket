package infrastructure

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn *websocket.Conn
}

var Clients = make(map[*Client]bool)

var Broadcast = make(chan []byte)

var Upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func HandleMessages() {

	for {

		message := <-Broadcast

		for client := range Clients {

			err := client.Conn.WriteMessage(
				websocket.TextMessage,
				message,
			)

			if err != nil {

				log.Println(err)

				client.Conn.Close()

				delete(Clients, client)
			}
		}
	}
}