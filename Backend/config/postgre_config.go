package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectPostgresDB() {
	connStr := os.Getenv("POSTGRES_URI")
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Failed to connect to PostgreSQL:", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("Failed to ping PostgreSQL:", err)
	}
	DB = db
	fmt.Println("Connected to PostgreSQL!")
}
