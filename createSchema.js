const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"password"
})

connection.connect((err)=>{
    if(err) return;
    console.log("Database connected");

    connection.query('CREATE DATABASE IF NOT EXISTS message_broadcast', (err)=>{
        if(err) return;
        console.log("Connect exists database");

        connection.changeUser({database: "message_broadcast"},(err)=>{

            if(err) return;

            const createCommenttable = 
            `CREATE TABLE IF NOT EXISTS comment(
                id INT AUTO_INCREMENT PRIMARY KEY,
                postId INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(50) NOT NULL,
                body TEXT NOT NULL
            )`
            connection.query(createCommenttable, (err)=>{
                if(err) return;
                console.log("create table")
                // console.log(result);
                // connection.end(err=> {if(err) return;})
            })

        })
    })
});
module.exports = connection;