const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "employee_db",
});

connection.connect();

// setting up connection.query to use promises instead of callbacks

connection.query = util.promisify(connection.query);

module.exports = connection;