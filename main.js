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
      res.render('index', { data: {} }); // 여기에서 기본값으로 빈 객체를 전달합니다.
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
  let sql = "UPDATE Counseling SET Counseling_type = ?, Counseling_details = ?, Counselor_name = ?, Counseling_in_progress = ?, Counseling_date = NOW() WHERE id = ?";

  // 요청 본문(body)에서 값을 가져옵니다.
  let counselingType = req.body.Counseling_type;
  let counselingDetails = req.body.Counseling_details;
  let counselorName = req.body.Counselor_name;
  let counselingInProgress = true;

  // 요청 본문(body)에서 ID 값을 가져옵니다.
  // 클라이언트에서 해당 ID 값을 보내줘야 합니다.
  let idToUpdate = req.body.id;

  let values = [counselingType, counselingDetails, counselorName, counselingInProgress, idToUpdate];

  con.query(sql, values, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send('데이터베이스 업데이트 중 오류가 발생했습니다.');
    } else {
      // result.affectedRows 값으로 업데이트가 실제로 발생했는지 확인합니다.
      if (result.affectedRows > 0) {
        res.send('성공적으로 데이터를 업데이트하였습니다.');
      } else {
        res.status(404).send('업데이트할 데이터를 찾을 수 없습니다.');
      }
    }
  });
});


app.listen(3000, function () {
  console.log("Server is running on port:3000");
});