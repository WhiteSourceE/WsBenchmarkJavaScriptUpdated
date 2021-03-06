var mysql = require('mysql');
var express = require('express');
var router = express.Router();

function DbExecutor(db) {
  this.db = db;
  this.q = '';
  this.arr = [];
}

DbExecutor.prototype.prep = function (u, p) {
  this.q = 'SELECT * FROM users WHERE name = $1 AND password = $2;';
  this.arr = [u, p];
};

DbExecutor.prototype.run = function (u, p) {
  this.prep(u, p);
  return this.db.query(this.q, this.arr);
};

function UnsafeDbExec(db) {
  this.db = db;
  this.q = '';
  this.arr = [];
}

UnsafeDbExec.prototype = new DbExecutor();

UnsafeDbExec.prototype.prep = function (u, p) {
  this.q =
    "SELECT * FROM users WHERE name = '" + u + "' AND password ='" + p + "';";
};

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

  //package should be p?
  // return new UnsafeDbExec(db).run(u, package);
  return new UnsafeDbExec(db).run(u, p);
});
