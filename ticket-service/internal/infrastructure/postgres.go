package infrastructure

import (
	"database/sql"

	loggerservice "github.com/qwerty5554/shared/logger"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {

	connStr := "host=localhost port=5432 user=postgres password=1234 dbname=artticket sslmode=disable"

	db, err := sql.Open("postgres", connStr)

	if err != nil {
		loggerservice.Logger.Fatal(err.Error())
	}

	err = db.Ping()

	if err != nil {
		loggerservice.Logger.Fatal(err.Error())
	}

	DB = db

	loggerservice.Logger.Info("PostgreSQL connected")
}