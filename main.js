const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

var CryptoJS = require("crypto-js");

app.use(express.static(path.join(__dirname, './')));
app.use(cors());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(bodyParser.urlencoded({ extended: true }));


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect(function (err) {
  if (err) {
    console.log(err, "🥲");
    return;
  }

  var sql = `
  CREATE TABLE IF NOT EXISTS Counseling (
    Id int(11) AUTO_INCREMENT PRIMARY KEY,
    Inquiry_time timestamp DEFAULT CURRENT_TIMESTAMP,
    Inquirer_name varchar(255),
    Inquirer_phone_number varchar(20),
    Inquirer_email varchar(255),
    Inquiry_type varchar(20),
    inquiry_details text,
    Counseling_in_progress tinyint(1) DEFAULT 0,
    Counselor_name varchar(255),
    Counseling_date timestamp NULL DEFAULT NULL,
    Counseling_type varchar(20),
    Counseling_details text
  )
`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("테이블이 이미 존재하고 있으니 연결은 성공~! 😊");
  });
});

app.post('/submit', function (req, res) {
  let sql = "INSERT INTO Counseling (Inquirer_name, Inquirer_phone_number, Inquirer_email, Inquiry_type, inquiry_details) VALUES (?, ?, ?, ?, ?)";
  let values = [req.body.name, req.body.tel, req.body.email, req.body.inquiryType, req.body.text];

  con.query(sql, values, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ success: false });
    } else {
      res.send({ success: true, id: result.insertId });
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running on port:3000");
});