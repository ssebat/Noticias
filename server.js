var port = process.env.PORT || 8000;
var http = require('http');
var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var config = {
    user: '',
    password: '',
    server: 'servebdbeac.database.windows.net',
    database: 'bd_beac',
    options: {
        encrypt: true
    }
};

var server = http.createServer(app);

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
var router = express.Router();

var lsql = '';

var  executeQuery = function(res2, query){
    sql.connect(config, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            console.log(query);
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res2.send(err);
                }
                else {
                    res2.send(res.recordset);
                }
                sql.close();
            });
        }
    });
};

router.post('/WriteData/pData=:pTime, function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pData = (req.params.pData=='null' ? req.params.pData : "'" + req.params.pData + "'");
    lsql = "EXEC CargaData " + pData + "";
    console.log (lsql);
    executeQuery(res, lsql);
});

router.get('/Lista', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC ListaData';
    executeQuery(res, lsql);
});

app.use(router);

server.listen(port, function () {});
