const util = require("./questions");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  // username
  user: "root",
  // password
  password: "root",
  database: "employee_db",
});

connection.connect();

// setting up connection.query to use promises instead of callbacks

connection.query = util.promisify(connection.query);

module.exports = connection;