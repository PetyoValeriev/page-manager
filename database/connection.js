let mysql = require('mysql2');

let connection = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : 'Tatatayanasd1@',
    database : 'page_manager'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = connection;