var mysql = require('mysql');
var express = require('express');
var router = express.Router();

function prep(u, p) {
  var q =
    "SELECT * FROM users WHERE name = '" + u + "' AND password ='" + p + "';";
  var arr = [];
  return [q, arr];
}

function run(db, prep, u, p) {
  qAndArr = prep(u, p);
  return db.query(qAnaArr[0], qAnaArr[1]);
}

router.post('/login/auth', function (req, res) {
  var u = req.body.username;
  var p = req.body.password;

  logger.error('Tried to login attempt from user = ' + u);

  //auth.js#do_auth
  var db = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db',
  });

  db.connect();
  var prepMethod = prep;
  return run(db, prepMethod, u, p);
});
