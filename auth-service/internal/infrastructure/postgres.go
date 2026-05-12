package infrastructure

import (
	"database/sql"
	"fmt"

	loggerservice "github.com/qwerty5554/ArtTicket/shared/logger"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {

	connStr := "host=localhost port=5432 user=postgres password=1234 dbname=artticket sslmode=disable"

	db, err := sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
	}

	err = db.Ping()

	if err != nil {
		panic(err)
	}

	DB = db

	fmt.Println("PostgreSQL connected")

	loggerservice.Logger.Info("PostgreSQL connected")
}