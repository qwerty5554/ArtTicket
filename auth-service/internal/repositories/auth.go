package repositories

import (
	"artticket-backend/internal/entities"
	"artticket-backend/internal/infrastructure"
)

func CreateUser(user entities.User) error {

	query := `
	INSERT INTO users(first_name, last_name, email, password, role)
	VALUES($1,$2,$3,$4,$5)
	`

	_, err := infrastructure.DB.Exec(
		query,
		user.FirstName,
		user.LastName,
		user.Email,
		user.Password,
		user.Role,
	)

	return err
}

func GetUserByEmail(email string) (*entities.User, error) {

	query := `
	SELECT id, first_name, last_name, email, password, role
	FROM users
	WHERE email=$1
	`

	row := infrastructure.DB.QueryRow(query, email)

	var user entities.User

	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Role,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}