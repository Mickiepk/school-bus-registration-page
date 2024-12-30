package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

// UserAccount represents the user account structure
type UserAccount struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

var db *sql.DB

func main() {
	var err error
	// Replace with your MySQL connection details
	dsn := "username:password@tcp(127.0.0.1:3306)/dbname"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create table if not exists
	createTable := `
    CREATE TABLE IF NOT EXISTS useraccounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );`
	_, err = db.Exec(createTable)
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/signup", signupHandler)
	http.HandleFunc("/update", updateHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user UserAccount
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Insert user into the database
	stmt, err := db.Prepare("INSERT INTO useraccounts(username, password, email) VALUES(?, ?, ?)")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Username, user.Password, user.Email)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "User created successfully")
}

func updateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user UserAccount
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Update user in the database
	stmt, err := db.Prepare("UPDATE useraccounts SET password = ?, email = ? WHERE username = ?")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Password, user.Email, user.Username)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User updated successfully")
}
