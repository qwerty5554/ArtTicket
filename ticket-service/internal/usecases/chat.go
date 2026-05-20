package usecases

import (
	"artticket-backend/internal/infrastructure"
)

type ChatUsecase struct{}

func NewChatUsecase() *ChatUsecase {
	return &ChatUsecase{}
}

func (u *ChatUsecase) AddClient(
	client *infrastructure.Client,
) {

	infrastructure.Clients[client] = true
}

func (u *ChatUsecase) RemoveClient(
	client *infrastructure.Client,
) {

	delete(
		infrastructure.Clients,
		client,
	)
}

func (u *ChatUsecase) BroadcastMessage(
	message []byte,
) {

	infrastructure.Broadcast <- message
}