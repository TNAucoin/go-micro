package main

import (
	"database/sql"
	"fmt"
	"go-micro/authentication-service/data"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

const webPort = "80"

var counts int64

type Config struct {
	DB     *sql.DB
	Models data.Models
}

func main() {
	log.Println("Starting authentication service..")

	//connect to db
	conn := connectToDB()

	if conn == nil {
		log.Panic("Failed to connect to Postgres")
	}

	// set up config
	app := Config{
		DB:     conn,
		Models: data.New(conn),
	}

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", webPort),
		Handler: app.routes(),
	}

	err := srv.ListenAndServe()

	if err != nil {
		log.Panic(err)
	}

}

// openDB opens and returns a postgres db connection
func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}

	err = db.Ping()

	if err != nil {
		return nil, err
	}

	return db, nil
}

// connectToDB attempts to connect to the DB retrying with a simple 2 second wait between attempts for 10 attempts
func connectToDB() *sql.DB {
	dsn := os.Getenv("DSN")
	for {
		connection, err := openDB(dsn)
		if err != nil {
			log.Printf("Postgres not ready..")
			counts++
		} else {
			log.Println("Connected to Postgres..")
			return connection
		}

		if counts > 10 {
			log.Println(err)
			return nil
		}

		log.Println("Backing off for 2 seconds..")
		time.Sleep(2 * time.Second)
		continue
	}
}
