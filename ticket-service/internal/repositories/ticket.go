package repositories

import (
	"artticket-backend/internal/entities"
	"artticket-backend/internal/infrastructure"
)

func CreateTicket(ticket entities.Ticket) (int, error) {

	query := `
	INSERT INTO tickets
	(user_id, exhibition, museum, date, time, count, price, status)
	VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
	`

	var ticketID int

	err := infrastructure.DB.QueryRow(
		query + " RETURNING id",
		ticket.UserID,
		ticket.Exhibition,
		ticket.Museum,
		ticket.Date,
		ticket.Time,
		ticket.Count,
		ticket.Price,
		ticket.Status,
	).Scan(&ticketID)

	if err != nil {
		return 0, err
	}

	return ticketID, nil
}

func GetTicketsByUserID(userID int) ([]entities.Ticket, error) {

	query := `
	SELECT
		id,
		user_id,
		exhibition,
		museum,
		date,
		time,
		count,
		price,
		status
	FROM tickets
	WHERE user_id=$1
	ORDER BY id DESC
	`

	rows, err := infrastructure.DB.Query(
		query,
		userID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tickets []entities.Ticket

	for rows.Next() {

		var ticket entities.Ticket

		err := rows.Scan(
			&ticket.ID,
			&ticket.UserID,
			&ticket.Exhibition,
			&ticket.Museum,
			&ticket.Date,
			&ticket.Time,
			&ticket.Count,
			&ticket.Price,
			&ticket.Status,
		)

		if err != nil {
			return nil, err
		}

		// 🔥 ДЛЯ PROFILE
		ticket.Title = ticket.Exhibition
		ticket.Place = ticket.Museum

		tickets = append(
			tickets,
			ticket,
		)
	}

	return tickets, nil
}