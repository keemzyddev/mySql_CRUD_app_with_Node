import express from "express";
import mysql from "mysql";
import colors from "colors";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test1",
});

conn.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + conn.threadId);
});

const app = express();
const PORT = 5000;

//create database
app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE test1";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created");
  });
});

//create table
app.get("/createtable", (req, res) => {
  const sql =
    "CREATE TABLE Todo ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), reminder TINYINT)";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("table created");
  });
});

//insert into table
app.get("/insertinto", (req, res) => {
  const sql = "INSERT INTO Todo (title, reminder) VALUES ('singing', '')";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("data inserted");
  });
});

//get all from table
app.get("/selectall", (req, res) => {
  const sql = "SELECT * FROM Todo";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//get one from table using ID
app.get("/selectone/:id", (req, res) => {
  const sql = `SELECT * FROM Todo WHERE id = "${req.params.id}"`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//update one from table using ID
app.get("/update/:id", (req, res) => {
  const sql = `UPDATE Todo SET reminder = ''  WHERE id = "${req.params.id}"`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//delete one from table using ID
app.get("/delete/:id", (req, res) => {
  const sql = `DELETE FROM Todo WHERE id = "${req.params.id}"`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("todo deleted");
  });
});

app.listen(PORT, () => console.log(`Server listening on Port: ${PORT}`));
