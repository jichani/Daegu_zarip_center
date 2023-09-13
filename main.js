const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
var request = require('request'); // You need to install this package if you haven't already

var CryptoJS = require("crypto-js");
const app = express();

app.use(express.static(path.join(__dirname, './')));
app.use(cors());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON in the body of POST requests


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

// 추가 코드

function getAuthorization() {
  let salt = getSalt();
  let date = getDate();
  let value = date + salt;
  let signature = getSignature(value, process.env.API_SECRET);
  let authoriztion =
    'HMAC-SHA256 apiKey=' +
    process.env.API_KEY +
    ', date=' +
    date +
    ', salt=' +
    salt +
    ', signature=' +
    signature;
  return authoriztion;
}

function getSalt() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getDate() {
  let today = new Date();
  return today.toISOString();
}

function getSignature(value, key) {
  let signature = CryptoJS.HmacSHA256(value, key);
  return signature.toString(CryptoJS.enc.Hex);
}

// Add these two endpoints:

app.post('/send-message-counselor', function (req, res) {

  let url = "https://api.solapi.com/messages/v4/send-many/detail";
  let authoriztion = getAuthorization();

  var data = {
    "messages": [
      {
        "to": req.body.tel,
        "kakaoOptions": {
          "pfId": req.body.pfid,
          "templateId": req.body.templateId,
          "variables": {
            "#{상담사이름}": req.body.counselor_name,
            "#{신청시간}": req.body.nowDate + " ",
            "#{문의자이름}": req.body.inquirer_name,
            "#{문의유형}": req.body.selectedValue,
            "#{문의내용}": req.body.text,
            "#{링크}": req.body.link,

          }
        }
      }
    ]
  };

  request({
    url: url,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authoriztion
    },
    body: data,

    json: true

  }, (err, response, body) => {
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });

});

app.post('/send-message-customer', function (req, res) {

  let url = "https://api.solapi.com/messages/v4/send-many/detail";
  let authoriztion = getAuthorization();

  var data = {
    "messages": [
      {
        "to": req.body.tel,
        "kakaoOptions": {
          "pfId": req.body.pfid,
          "templateId": req.body.templateId,
          "variables": {
            "#{이름}": req.body.name,
            "#{신청버튼}": req.body.selectedValue,
            "#{링크}": req.body.link,

          }
        }
      }
    ]
  };

  request({
    url: url,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authoriztion
    },
    body: data,

    json: true

  }, (err, response, body) => {
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });

});


// ... (The rest of your code)