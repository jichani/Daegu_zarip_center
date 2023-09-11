var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7640',
  database: 'consultation'
});

connection.connect();

connection.query('select * from consultation', function (error, results, fields) {
  if (error) console.log(error);
  console.log(results);
});

connection.end();