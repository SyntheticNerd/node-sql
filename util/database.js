const mysql = require("mysql2");

//Create a connection pool which will allow us to reach out to it when we have a
//query to run and make multiple connections all at the same time.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "**Pa$$w0rd",
});

//this will allow us to use promises when working with these requests instead of call backs
module.exports = pool.promise();
