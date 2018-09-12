const express = require('express')
const app     = express()
var mysql     = require('mysql')

const DB_HOST     = process.env.DB_HOST;
const DB_PORT     = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME     = process.env.DB_NAME;


var con = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
});






app.get('/', function (req, res) {

    con.connect(function(err) {
        con.query("SELECT productLine FROM productlines", function (err, result) {

            let txt = '';

            for(let row in result) {
                txt += result[row].productLine + '<br /><br /> ';
            }


            res.send(txt);
        });
    });

});

app.listen(8080, () => console.log('Example app listening on port 8080!'))
