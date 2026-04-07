import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import { createConnection } from "mysql2";
import { hash as _hash, compare } from "bcrypt";

// Possible rewrite for login script - LJ.

const saltRounds = 10;

const app = express();

app.use(cors());
app.use(json());

//DB-connection
const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error: ", err);
    return;
  }
  console.log("Connected to MySQL");
  //create database if not exits
  db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    //if something went wrong -> crash the program
    if(err) throw err;
    //else it writes this
    console.log("Database is ready");

  //switch to that database
  db.changeUser({database: process.env.DB_NAME}, (err) => {
    if(err) throw err;

    //create users table
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
    )`;
    db.query(sql, (err) => {
      if (err) throw err;
      console.log("Users table ready");
    });
  });
  });
});

//for registering endpoint, check for blanks, minimum password length, no duplicates
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).json({ error: "Fields cannot be empty" });
  }

  if (password.length <= 3) {
    return res.status(400).json({ error: "Password must be at least 3 characters" });
  }

  const trimmedUsername = username.trim(); //removes spaces, both at the begining and at the end

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [trimmedUsername],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error (check yo username bruv)" });
      }


      if (result.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      _hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error Hashing password" });
        }

        db.query(
          "INSERT INTO users (username, password) VALUES (?,?)",
          [trimmedUsername, hash],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Database error (user prolly exists bruv)"
              });
            }
            res.status(201).json({
              message: "User created successfully",
              userId: result.insertId
            });
          }
        );
      })
    }
  );
});
app.post("/login", (req, res) => {
  //gets input from the frontend
  const {username, password} = req.body;
  const trimmedUsername = username.trim();
  //looks if the user exist in the database
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [trimmedUsername],
    async (err, result) => {
      if(err) {
        //something went wrong internally
        return res.status(500).json({error: "Database error"});
      }
      if(result.length === 0)
      {
        return res.status(400).json({error: "User not found"});
      }
      //get the user
      const user = result[0];
      //compare the hashed password with the other one given by user
      const match = await compare(password, user.password);
      if(!match)
      {
        return res.status(400).json({error: "Wrong password"});
      }
      res.json({
        message: "Login Successful",
        userID: user.id
      });
    }
  );
});
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});