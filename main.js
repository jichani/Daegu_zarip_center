const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, './')));
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  let id = req.query.id;

  if (id) {
    let sql = "SELECT * FROM Counseling WHERE id = ?";
    let values = [id];

    con.query(sql, values, function (err, result) {
      if (err) {
        console.log(err);
        // 데이터베이스 조회 중 오류가 발생한 경우
        res.status(500).send('데이터베이스 조회 중 오류가 발생했습니다.');
      } else {
        if (result.length > 0) {
          let data = result[0];

          // HTML 파일 전송 및 데이터 전달
          try {
            // EJS 렌더링 중 오류가 발생할 수 있는 부분을 try-catch 문으로 감싼다.
            res.render('index', { data: data });
          } catch (e) {
            console.log(e);
            res.status(500).send('EJS 렌더링 중 오류가 발생했습니다.');
          }

        } else {
          // 해당 ID에 대한 데이터를 찾을 수 없는 경우
          res.status(404).send('해당 ID에 대한 데이터를 찾을 수 없습니다.');
        }
      }
    });
  } else {
    try {
      // EJS 렌더링 중 오류가 발생할 수 있는 부분을 try-catch 문으로 감싼다.
      res.render('index');
    } catch (e) {
      console.log(e);
      res.status(500).send('EJS 렌더링 중 오류가 발생했습니다.');
    }

  }
});

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
});

app.post('/submit', function (req, res) {
  let sql = "INSERT INTO Counseling (Inquirer_name, Inquirer_phone_number, Inquirer_email, Inquiry_type, inquiry_details) VALUES (?, ?, ?, ?, ?)";
  let values = [req.body.name, req.body.tel, req.body.email, req.body.inquiryType, req.body.text];

  con.query(sql, values, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send(err, '쿼리 값을 집어넣는 부분에서 에러가 났어요');
    } else {
      res.send('성공적으로 데이터를 집어넣었습니다.');
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running on port:3000");
});