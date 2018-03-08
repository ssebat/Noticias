var port = process.env.PORT || 8000;
var http = require('http');
var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

var config = {
    user: 'usr_admin',
    password: 'Pass2018',
    server: 'newsmti.database.windows.net',
    database: 'Noticias',
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

router.post('/WriteNews/pTime=:pTime&pTitle=:pTitle&pDescription=:pDescription&pImage=:pImage&pWritten_by=:pWritten_by&pPublisher=:pPublisher', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTime = (req.params.pTime=='null' ? req.params.pTime : "'" + req.params.pTime + "'");
    var pTitle = (req.params.pTitle=='null' ? req.params.pTitle : "'" + req.params.pTitle + "'");
    var pDescription = (req.params.pDescription=='null' ? req.params.pDescription : "'" + req.params.pDescription + "'");
    var pImage =  (req.params.pImage=='null' ? req.params.pImage : "'" + req.params.pImage + "'");
    var pWritten_by = (req.params.pWritten_by=='null' ? req.params.pWritten_by : "'" + req.params.pWritten_by + "'");
    var pPublisher = (req.params.pPublisher=='null' ? req.params.pPublisher : "'" + req.params.pPublisher + "'");
    lsql = "EXEC CreaNews " + pTime + ", " + pTitle + ", " + pDescription + ", "+  pImage + ", " + pWritten_by + ", " + pPublisher + "";
    console.log (lsql);
    executeQuery(res, lsql);
});

router.get('/News', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC ListNews';
    executeQuery(res, lsql);
});

router.get('/News/:pidNoticia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC ListNewsid '+ req.params.pidNoticia ;
    executeQuery(res, lsql);
});

app.use(router);

server.listen(port, function () {
  console.log(port);
});
