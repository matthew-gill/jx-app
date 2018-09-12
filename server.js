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


app.get('/update', function (req, res) {

    let valfromurl = req.query.val;

    con.connect(function (err) {
        if (err) {
            console.log(err);
        }

        con.query('UPDATE productlines set textDescription=\''+ valfromurl +'\' WHERE productLine = \'Classic Cars\'', function (err, result) {
            res.send('Updated');
        });
    });

});

app.get('/', function (req, res) {

    con.connect(function (err) {
        if (err) {
            console.log(err);
        }

        con.query('SELECT productLine, textDescription FROM productlines', function (err, result) {

            if (err) {
                console.log(err);
            }

            let txt = '<meta http-equiv="refresh" content="5">';
            txt += '<form action="/update" method="GET" target="fakeajax"><input type="text" name="val"/><input type="submit"></form>';

            for (let row in result) {
                txt += '<b style="color: orange">' + result[row].productLine + '</b><br /><br /> ';
                txt += result[row].textDescription + '<br /><hr />';
            }

            txt += '<iframe name="fakeajax" id="fakeajax" style="display:none;"></iframe>';



            res.send(txt);
        });
    });

});

app.listen(8080, () => console.log('Example app listening on port 8080!'))
