var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'timetable',
    user: 'root',
    password: 'root'
});

module.exports = connection;