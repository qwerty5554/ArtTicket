package usecases

import (
	"artticket-backend/internal/entities"
	"artticket-backend/internal/repositories"
)

type TicketUsecase struct{}

func NewTicketUsecase() *TicketUsecase {
	return &TicketUsecase{}
}

func (u *TicketUsecase) CreateTicket(
	ticket entities.Ticket,
) (int, error) {

	return repositories.CreateTicket(
		ticket,
	)
}

func (u *TicketUsecase) GetMyTickets(
	userID int,
) ([]entities.Ticket, error) {

	return repositories.GetTicketsByUserID(
		userID,
	)
}

func (u *TicketUsecase) GetAdminBookings() (
	[]repositories.AdminTicket,
	error,
) {

	return repositories.GetAllTicketsForAdmin()
}