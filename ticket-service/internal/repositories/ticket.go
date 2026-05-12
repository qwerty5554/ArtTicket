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

		ticket.Title = ticket.Exhibition
		ticket.Place = ticket.Museum

		tickets = append(
			tickets,
			ticket,
		)
	}

	return tickets, nil
}

type AdminTicket struct {
	ID          int    `json:"id"`
	Client      string `json:"client"`
	Email       string `json:"email"`
	Exhibition  string `json:"exhibition"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	Count       int    `json:"count"`
	Price       int    `json:"price"`
	Status      string `json:"status"`
}

func GetAllTicketsForAdmin() ([]AdminTicket, error) {

	rows, err := infrastructure.DB.Query(`
		SELECT
			t.id,
			u.first_name,
			u.last_name,
			u.email,
			t.exhibition,
			t.date,
			t.time,
			t.count,
			t.price,
			t.status
		FROM tickets t
		JOIN users u
		ON t.user_id = u.id
		ORDER BY t.id DESC
	`)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tickets []AdminTicket

	for rows.Next() {

		var ticket AdminTicket

		var firstName string
		var lastName string

		err := rows.Scan(
			&ticket.ID,
			&firstName,
			&lastName,
			&ticket.Email,
			&ticket.Exhibition,
			&ticket.Date,
			&ticket.Time,
			&ticket.Count,
			&ticket.Price,
			&ticket.Status,
		)

		if err != nil {
			return nil, err
		}

		ticket.Client =
			firstName + " " + lastName

		tickets = append(tickets, ticket)
	}

	return tickets, nil
}