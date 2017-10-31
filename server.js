var port = process.env.PORT || 8000;
var http = require('http');
var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var config = {
    user: 'AdminConFa',
    password: 'ConFa1234',
    server: 'serverconfa.database.windows.net',
    database: 'ConFa',
    options: {
        encrypt: true
    }
};

var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
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

router.get('/AccionAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaAccionAMFEs';
    executeQuery(res, lsql);
});

router.get('/AccionAMFE/:pAccion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccion_Id = req.params.pAccion_Id;
    lsql = 'EXEC pConFa_MuestraAccionAMFE ' + pAccion_Id;
    executeQuery(res, lsql);
});

router.post('/AccionAMFEs/:pAccion_Id&:pAccion_Nombre&:pAccion_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccion_Id = req.params.pAccion_Id;
    var pAccion_Nombre = (req.params.pAccion_Nombre=='null' ? req.params.pAccion_Nombre : "'" + req.params.pAccion_Nombre + "'");
    var pAccion_Descripcion = (req.params.pAccion_Descripcion=='null' ? req.params.pAccion_Descripcion : "'" + req.params.pAccion_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaAccionAMFE ' + pAccion_Id + ", " + pAccion_Nombre + ", " + pAccion_Descripcion;
    executeQuery(res, lsql);
});

router.post('/AccionAMFEs/:pAccion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccion_Id = req.params.pAccion_Id;
    lsql = 'EXEC pConFa_EliminaAccionAMFE ' + pAccion_Id;
    executeQuery(res, lsql);
});

router.get('/AccionConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaAccionConFas';
    executeQuery(res, lsql);
});

router.get('/AccionConFa/:pAccionConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccionConFa_Id = req.params.pAccionConFa_Id;
    lsql = 'EXEC pConFa_MuestraAccionConFa ' + pAccionConFa_Id;
    executeQuery(res, lsql);
});

router.post('/AccionConFas/:pAccionConFa_Id&:pAccionConFa_Nombre&:pAccionConFa_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccionConFa_Id = req.params.pAccionConFa_Id;
    var pAccionConFa_Nombre = (req.params.pAccionConFa_Nombre=='null' ? req.params.pAccionConFa_Nombre : "'" + req.params.pAccionConFa_Nombre + "'");
    var pAccionConFa_Descripcion = (req.params.pAccionConFa_Descripcion=='null' ? req.params.pAccionConFa_Descripcion : "'" + req.params.pAccionConFa_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaAccionConFa ' + pAccionConFa_Id + ", " + pAccionConFa_Nombre + ", " + pAccionConFa_Descripcion;
    executeQuery(res, lsql);
});

router.post('/AccionConFas/:pAccionConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccionConFa_Id = req.params.pAccionConFa_Id;
    lsql = 'EXEC pConFa_EliminaAccionConFa ' + pAccionConFa_Id;
    executeQuery(res, lsql);
});

router.get('/Causas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaCausas';
    executeQuery(res, lsql);
});

router.get('/Causa/:pCausa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausa_Id = req.params.pCausa_Id;
    lsql = 'EXEC pConFa_MuestraCausa ' + pCausa_Id;
    executeQuery(res, lsql);
});

router.post('/Causas/:pCausa_Id&:pCausa_Nombre&:pCausa_Comentario', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausa_Id = req.params.pCausa_Id;
    var pCausa_Nombre = (req.params.pCausa_Nombre=='null' ? req.params.pCausa_Nombre : "'" + req.params.pCausa_Nombre + "'");
    var pCausa_Comentario = (req.params.pCausa_Comentario=='null' ? req.params.pCausa_Comentario : "'" + req.params.pCausa_Comentario + "'");
    lsql = 'EXEC pConFa_GuardaCausa ' + pCausa_Id + ", " + pCausa_Nombre + ", " + pCausa_Comentario;
    executeQuery(res, lsql);
});

router.post('/Causas/:pCausa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausa_Id = req.params.pCausa_Id;
    lsql = 'EXEC pConFa_EliminaCausa ' + pCausa_Id;
    executeQuery(res, lsql);
});

router.get('/CausaAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaCausaAMFEs';
    executeQuery(res, lsql);
});

router.get('/CausaAMFE/:pCausa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausa_Id = req.params.pCausa_Id;
    lsql = 'EXEC pConFa_MuestraCausaAMFE ' + pCausa_Id;
    executeQuery(res, lsql);
});

router.post('/CausaAMFEs/:pCausa_Id&:pCausa_Nombre&:pCausa_Comentario', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausa_Id = req.params.pCausa_Id;
    var pCausa_Nombre = (req.params.pCausa_Nombre=='null' ? req.params.pCausa_Nombre : "'" + req.params.pCausa_Nombre + "'");
    var pCausa_Comentario = (req.params.pCausa_Comentario=='null' ? req.params.pCausa_Comentario : "'" + req.params.pCausa_Comentario + "'");
    lsql = 'EXEC pConFa_GuardaCausaAMFE ' + pCausa_Id + ", " + pCausa_Nombre + ", " + pCausa_Comentario;
    executeQuery(res, lsql);
});

router.post('/CausaAMFEs/:pCausa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausa_Id = req.params.pCausa_Id;
    lsql = 'EXEC pConFa_EliminaCausaAMFE ' + pCausa_Id;
    executeQuery(res, lsql);
});

router.get('/CausaConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaCausaConFas';
    executeQuery(res, lsql);
});

router.get('/CausaConFa/:pCausaConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausaConFa_Id = req.params.pCausaConFa_Id;
    lsql = 'EXEC pConFa_MuestraCausaConFa ' + pCausaConFa_Id;
    executeQuery(res, lsql);
});

router.post('/CausaConFas/:pCausaConFa_Id&:pCausaConFa_Nombre&:pCausaConFa_Comentario', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausaConFa_Id = req.params.pCausaConFa_Id;
    var pCausaConFa_Nombre = (req.params.pCausaConFa_Nombre=='null' ? req.params.pCausaConFa_Nombre : "'" + req.params.pCausaConFa_Nombre + "'");
    var pCausaConFa_Comentario = (req.params.pCausaConFa_Comentario=='null' ? req.params.pCausaConFa_Comentario : "'" + req.params.pCausaConFa_Comentario + "'");
    lsql = 'EXEC pConFa_GuardaCausaConFa ' + pCausaConFa_Id + ", " + pCausaConFa_Nombre + ", " + pCausaConFa_Comentario;
    executeQuery(res, lsql);
});

router.post('/CausaConFas/:pCausaConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCausaConFa_Id = req.params.pCausaConFa_Id;
    lsql = 'EXEC pConFa_EliminaCausaConFa ' + pCausaConFa_Id;
    executeQuery(res, lsql);
});

router.get('/Certificaciones', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaCertificaciones';
    executeQuery(res, lsql);
});

router.get('/Certificacion/:pCertificacion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCertificacion_Id = req.params.pCertificacion_Id;
    lsql = 'EXEC pConFa_MuestraCertificacion ' + pCertificacion_Id;
    executeQuery(res, lsql);
});

router.post('/Certificaciones/:pCertificacion_Id&:pCertificacion_Nombre&:pCertificacion_Descripcion&:pCertificacion_MesesVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCertificacion_Id = req.params.pCertificacion_Id;
    var pCertificacion_Nombre = (req.params.pCertificacion_Nombre=='null' ? req.params.pCertificacion_Nombre : "'" + req.params.pCertificacion_Nombre + "'");
    var pCertificacion_Descripcion = req.params.pCertificacion_Descripcion;
    var pCertificacion_MesesVigencia = req.params.pCertificacion_MesesVigencia;
    lsql = 'EXEC pConFa_GuardaCertificacion ' + pCertificacion_Id + ", " + pCertificacion_Nombre + ", " + pCertificacion_Descripcion + ", " + pCertificacion_MesesVigencia;
    executeQuery(res, lsql);
});

router.post('/Certificaciones/:pCertificacion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pCertificacion_Id = req.params.pCertificacion_Id;
    lsql = 'EXEC pConFa_EliminaCertificacion ' + pCertificacion_Id;
    executeQuery(res, lsql);
});

router.get('/Componentes', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponentes';
    executeQuery(res, lsql);
});

router.get('/Componente/:pComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponente_Id = req.params.pComponente_Id;
    lsql = 'EXEC pConFa_MuestraComponente ' + pComponente_Id;
    executeQuery(res, lsql);
});

router.post('/Componentes/:pComponente_Id&:pComponente_Nombre&:pComponente_Codigo&:pComponente_Funcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponente_Id = req.params.pComponente_Id;
    var pComponente_Nombre = (req.params.pComponente_Nombre=='null' ? req.params.pComponente_Nombre : "'" + req.params.pComponente_Nombre + "'");
    var pComponente_Codigo = (req.params.pComponente_Codigo=='null' ? req.params.pComponente_Codigo : "'" + req.params.pComponente_Codigo + "'");
    var pComponente_Funcion = (req.params.pComponente_Funcion=='null' ? req.params.pComponente_Funcion : "'" + req.params.pComponente_Funcion + "'");
    lsql = 'EXEC pConFa_GuardaComponente ' + pComponente_Id + ", " + pComponente_Nombre + ", " + pComponente_Codigo + ", " + pComponente_Funcion;
    executeQuery(res, lsql);
});

router.post('/Componentes/:pComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponente_Id = req.params.pComponente_Id;
    lsql = 'EXEC pConFa_EliminaComponente ' + pComponente_Id;
    executeQuery(res, lsql);
});

router.get('/ComponenteAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponenteAMFEs';
    executeQuery(res, lsql);
});

router.get('/ComponenteAMFE/:pComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponente_Id = req.params.pComponente_Id;
    lsql = 'EXEC pConFa_MuestraComponenteAMFE ' + pComponente_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteAMFEs/:pComponente_Id&:pComponente_Nombre&:pComponente_Funcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponente_Id = req.params.pComponente_Id;
    var pComponente_Nombre = (req.params.pComponente_Nombre=='null' ? req.params.pComponente_Nombre : "'" + req.params.pComponente_Nombre + "'");
    var pComponente_Funcion = (req.params.pComponente_Funcion=='null' ? req.params.pComponente_Funcion : "'" + req.params.pComponente_Funcion + "'");
    lsql = 'EXEC pConFa_GuardaComponenteAMFE ' + pComponente_Id + ", " + pComponente_Nombre + ", " + pComponente_Funcion;
    executeQuery(res, lsql);
});

router.post('/ComponenteAMFEs/:pComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponente_Id = req.params.pComponente_Id;
    lsql = 'EXEC pConFa_EliminaComponenteAMFE ' + pComponente_Id;
    executeQuery(res, lsql);
});

router.get('/ComponenteConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponenteConFas';
    executeQuery(res, lsql);
});

router.get('/ComponenteConFa/:pComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteConFa_Id = req.params.pComponenteConFa_Id;
    lsql = 'EXEC pConFa_MuestraComponenteConFa ' + pComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteConFas/:pComponenteConFa_Id&:pComponenteConFa_Nombre&:pComponenteConFa_Funcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteConFa_Id = req.params.pComponenteConFa_Id;
    var pComponenteConFa_Nombre = (req.params.pComponenteConFa_Nombre=='null' ? req.params.pComponenteConFa_Nombre : "'" + req.params.pComponenteConFa_Nombre + "'");
    var pComponenteConFa_Funcion = (req.params.pComponenteConFa_Funcion=='null' ? req.params.pComponenteConFa_Funcion : "'" + req.params.pComponenteConFa_Funcion + "'");
    lsql = 'EXEC pConFa_GuardaComponenteConFa ' + pComponenteConFa_Id + ", " + pComponenteConFa_Nombre + ", " + pComponenteConFa_Funcion;
    executeQuery(res, lsql);
});

router.post('/ComponenteConFas/:pComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteConFa_Id = req.params.pComponenteConFa_Id;
    lsql = 'EXEC pConFa_EliminaComponenteConFa ' + pComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.get('/Acciones', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaAcciones';
    executeQuery(res, lsql);
});

router.get('/Accion/:pAccion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccion_Id = req.params.pAccion_Id;
    lsql = 'EXEC pConFa_MuestraAccion ' + pAccion_Id;
    executeQuery(res, lsql);
});

router.post('/Acciones/:pAccion_Id&:pAccion_Nombre&:pAccion_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccion_Id = req.params.pAccion_Id;
    var pAccion_Nombre = (req.params.pAccion_Nombre=='null' ? req.params.pAccion_Nombre : "'" + req.params.pAccion_Nombre + "'");
    var pAccion_Descripcion = (req.params.pAccion_Descripcion=='null' ? req.params.pAccion_Descripcion : "'" + req.params.pAccion_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaAccion ' + pAccion_Id + ", " + pAccion_Nombre + ", " + pAccion_Descripcion;
    executeQuery(res, lsql);
});

router.post('/Acciones/:pAccion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pAccion_Id = req.params.pAccion_Id;
    lsql = 'EXEC pConFa_EliminaAccion ' + pAccion_Id;
    executeQuery(res, lsql);
});

router.get('/DominioGrupos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaDominioGrupos';
    executeQuery(res, lsql);
});

router.get('/DominioGrupo/:pDominioGrupo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pDominioGrupo_Id = req.params.pDominioGrupo_Id;
    lsql = 'EXEC pConFa_MuestraDominioGrupo ' + pDominioGrupo_Id;
    executeQuery(res, lsql);
});

router.post('/DominioGrupos/:pDominioGrupo_Id&:pDominioGrupo_Nombre&:pDominioGrupo_Ubicacion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pDominioGrupo_Id = req.params.pDominioGrupo_Id;
    var pDominioGrupo_Nombre = (req.params.pDominioGrupo_Nombre=='null' ? req.params.pDominioGrupo_Nombre : "'" + req.params.pDominioGrupo_Nombre + "'");
    var pDominioGrupo_Ubicacion = (req.params.pDominioGrupo_Ubicacion=='null' ? req.params.pDominioGrupo_Ubicacion : "'" + req.params.pDominioGrupo_Ubicacion + "'");
    lsql = 'EXEC pConFa_GuardaDominioGrupo ' + pDominioGrupo_Id + ", " + pDominioGrupo_Nombre + ", " + pDominioGrupo_Ubicacion;
    executeQuery(res, lsql);
});

router.post('/DominioGrupos/:pDominioGrupo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pDominioGrupo_Id = req.params.pDominioGrupo_Id;
    lsql = 'EXEC pConFa_EliminaDominioGrupo ' + pDominioGrupo_Id;
    executeQuery(res, lsql);
});

router.get('/Empresas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresas';
    executeQuery(res, lsql);
});

router.get('/Empresa/:pEmpresa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresa_Id = req.params.pEmpresa_Id;
    lsql = 'EXEC pConFa_MuestraEmpresa ' + pEmpresa_Id;
    executeQuery(res, lsql);
});

router.post('/Empresas/:pEmpresa_Id&:pEmpresa_DNI&:pEmpresa_RazonSocial&:pEmpresa_NombreFantasia&:pEmpresa_FechaInicioVigencia&:pEmpresa_FechaFinVigencia&:pEmpresa_FlagVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresa_Id = req.params.pEmpresa_Id;
    var pEmpresa_DNI = (req.params.pEmpresa_DNI=='null' ? req.params.pEmpresa_DNI : "'" + req.params.pEmpresa_DNI + "'");
    var pEmpresa_RazonSocial = (req.params.pEmpresa_RazonSocial=='null' ? req.params.pEmpresa_RazonSocial : "'" + req.params.pEmpresa_RazonSocial + "'");
    var pEmpresa_NombreFantasia = (req.params.pEmpresa_NombreFantasia=='null' ? req.params.pEmpresa_NombreFantasia : "'" + req.params.pEmpresa_NombreFantasia + "'");
    var pEmpresa_FechaInicioVigencia = req.params.pEmpresa_FechaInicioVigencia;
    var pEmpresa_FechaFinVigencia = req.params.pEmpresa_FechaFinVigencia;
    var pEmpresa_FlagVigencia = req.params.pEmpresa_FlagVigencia;
    lsql = 'EXEC pConFa_GuardaEmpresa ' + pEmpresa_Id + ", " + pEmpresa_DNI + ", " + pEmpresa_RazonSocial + ", " + pEmpresa_NombreFantasia + ", " + pEmpresa_FechaInicioVigencia + ", " + pEmpresa_FechaFinVigencia + ", " + pEmpresa_FlagVigencia;
    executeQuery(res, lsql);
});

router.post('/Empresas/:pEmpresa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresa_Id = req.params.pEmpresa_Id;
    lsql = 'EXEC pConFa_EliminaEmpresa ' + pEmpresa_Id;
    executeQuery(res, lsql);
});

router.get('/EquipoAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipoAMFEs';
    executeQuery(res, lsql);
});

router.get('/EquipoAMFE/:pEquipoConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    lsql = 'EXEC pConFa_MuestraEquipoAMFE ' + pEquipoConFa_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoAMFEs/:pEquipoConFa_Id&:pEquipoAMFE_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    var pEquipoAMFE_Nombre = (req.params.pEquipoAMFE_Nombre=='null' ? req.params.pEquipoAMFE_Nombre : "'" + req.params.pEquipoAMFE_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaEquipoAMFE ' + pEquipoConFa_Id + ", " + pEquipoAMFE_Nombre;
    executeQuery(res, lsql);
});

router.post('/EquipoAMFEs/:pEquipoConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    lsql = 'EXEC pConFa_EliminaEquipoAMFE ' + pEquipoConFa_Id;
    executeQuery(res, lsql);
});

router.get('/EquipoConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipoConFas';
    executeQuery(res, lsql);
});

router.get('/EquipoConFa/:pEquipoConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    lsql = 'EXEC pConFa_MuestraEquipoConFa ' + pEquipoConFa_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoConFas/:pEquipoConFa_Id&:pEquipoConFa_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    var pEquipoConFa_Nombre = (req.params.pEquipoConFa_Nombre=='null' ? req.params.pEquipoConFa_Nombre : "'" + req.params.pEquipoConFa_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaEquipoConFa ' + pEquipoConFa_Id + ", " + pEquipoConFa_Nombre;
    executeQuery(res, lsql);
});

router.post('/EquipoConFas/:pEquipoConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    lsql = 'EXEC pConFa_EliminaEquipoConFa ' + pEquipoConFa_Id;
    executeQuery(res, lsql);
});

router.get('/EstadoEquipos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEstadoEquipos';
    executeQuery(res, lsql);
});

router.get('/EstadoEquipo/:pEstadoEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEstadoEquipo_Id = req.params.pEstadoEquipo_Id;
    lsql = 'EXEC pConFa_MuestraEstadoEquipo ' + pEstadoEquipo_Id;
    executeQuery(res, lsql);
});

router.post('/EstadoEquipos/:pEstadoEquipo_Id&:pEstadoEquipo_Nombre&:pEstadoEquipo_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEstadoEquipo_Id = req.params.pEstadoEquipo_Id;
    var pEstadoEquipo_Nombre = (req.params.pEstadoEquipo_Nombre=='null' ? req.params.pEstadoEquipo_Nombre : "'" + req.params.pEstadoEquipo_Nombre + "'");
    var pEstadoEquipo_Descripcion = (req.params.pEstadoEquipo_Descripcion=='null' ? req.params.pEstadoEquipo_Descripcion : "'" + req.params.pEstadoEquipo_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaEstadoEquipo ' + pEstadoEquipo_Id + ", " + pEstadoEquipo_Nombre + ", " + pEstadoEquipo_Descripcion;
    executeQuery(res, lsql);
});

router.post('/EstadoEquipos/:pEstadoEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEstadoEquipo_Id = req.params.pEstadoEquipo_Id;
    lsql = 'EXEC pConFa_EliminaEstadoEquipo ' + pEstadoEquipo_Id;
    executeQuery(res, lsql);
});

router.get('/Modulos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaModulos';
    executeQuery(res, lsql);
});

router.get('/Modulo/:pModulo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pModulo_Id = req.params.pModulo_Id;
    lsql = 'EXEC pConFa_MuestraModulo ' + pModulo_Id;
    executeQuery(res, lsql);
});

router.post('/Modulos/:pModulo_Id&:pModulo_Nombre&:pModulo_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pModulo_Id = req.params.pModulo_Id;
    var pModulo_Nombre = (req.params.pModulo_Nombre=='null' ? req.params.pModulo_Nombre : "'" + req.params.pModulo_Nombre + "'");
    var pModulo_Descripcion = (req.params.pModulo_Descripcion=='null' ? req.params.pModulo_Descripcion : "'" + req.params.pModulo_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaModulo ' + pModulo_Id + ", " + pModulo_Nombre + ", " + pModulo_Descripcion;
    executeQuery(res, lsql);
});

router.post('/Modulos/:pModulo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pModulo_Id = req.params.pModulo_Id;
    lsql = 'EXEC pConFa_EliminaModulo ' + pModulo_Id;
    executeQuery(res, lsql);
});

router.get('/Niveles', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaNiveles';
    executeQuery(res, lsql);
});

router.get('/Nivel/:pNivel_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivel_Id = req.params.pNivel_Id;
    lsql = 'EXEC pConFa_MuestraNivel ' + pNivel_Id;
    executeQuery(res, lsql);
});

router.post('/Niveles/:pNivel_Id&:pNivel_Numero&:pNivel_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivel_Id = req.params.pNivel_Id;
    var pNivel_Numero = req.params.pNivel_Numero;
    var pNivel_Descripcion = (req.params.pNivel_Descripcion=='null' ? req.params.pNivel_Descripcion : "'" + req.params.pNivel_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaNivel ' + pNivel_Id + ", " + pNivel_Numero + ", " + pNivel_Descripcion;
    executeQuery(res, lsql);
});

router.post('/Niveles/:pNivel_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivel_Id = req.params.pNivel_Id;
    lsql = 'EXEC pConFa_EliminaNivel ' + pNivel_Id;
    executeQuery(res, lsql);
});

router.get('/NivelAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaNivelAMFEs';
    executeQuery(res, lsql);
});

router.get('/NivelAMFE/:pNivel_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivel_Id = req.params.pNivel_Id;
    lsql = 'EXEC pConFa_MuestraNivelAMFE ' + pNivel_Id;
    executeQuery(res, lsql);
});

router.post('/NivelAMFEs/:pNivel_Id&:pNivel_Numero&:pNivel_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivel_Id = req.params.pNivel_Id;
    var pNivel_Numero = req.params.pNivel_Numero;
    var pNivel_Descripcion = (req.params.pNivel_Descripcion=='null' ? req.params.pNivel_Descripcion : "'" + req.params.pNivel_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaNivelAMFE ' + pNivel_Id + ", " + pNivel_Numero + ", " + pNivel_Descripcion;
    executeQuery(res, lsql);
});

router.post('/NivelAMFEs/:pNivel_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivel_Id = req.params.pNivel_Id;
    lsql = 'EXEC pConFa_EliminaNivelAMFE ' + pNivel_Id;
    executeQuery(res, lsql);
});

router.get('/NivelConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaNivelConFas';
    executeQuery(res, lsql);
});

router.get('/NivelConFa/:pNivelConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivelConFa_Id = req.params.pNivelConFa_Id;
    lsql = 'EXEC pConFa_MuestraNivelConFa ' + pNivelConFa_Id;
    executeQuery(res, lsql);
});

router.post('/NivelConFas/:pNivelConFa_Id&:pNivelConFa_Numero&:pNivelConFa_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivelConFa_Id = req.params.pNivelConFa_Id;
    var pNivelConFa_Numero = req.params.pNivelConFa_Numero;
    var pNivelConFa_Descripcion = (req.params.pNivelConFa_Descripcion=='null' ? req.params.pNivelConFa_Descripcion : "'" + req.params.pNivelConFa_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaNivelConFa ' + pNivelConFa_Id + ", " + pNivelConFa_Numero + ", " + pNivelConFa_Descripcion;
    executeQuery(res, lsql);
});

router.post('/NivelConFas/:pNivelConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pNivelConFa_Id = req.params.pNivelConFa_Id;
    lsql = 'EXEC pConFa_EliminaNivelConFa ' + pNivelConFa_Id;
    executeQuery(res, lsql);
});

router.get('/Paises', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaPaises';
    executeQuery(res, lsql);
});

router.get('/Pais/:pPais_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pPais_Id = req.params.pPais_Id;
    lsql = 'EXEC pConFa_MuestraPais ' + pPais_Id;
    executeQuery(res, lsql);
});

router.post('/Paises/:pPais_Id&:pPais_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pPais_Id = req.params.pPais_Id;
    var pPais_Nombre = (req.params.pPais_Nombre=='null' ? req.params.pPais_Nombre : "'" + req.params.pPais_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaPais ' + pPais_Id + ", " + pPais_Nombre;
    executeQuery(res, lsql);
});

router.post('/Paises/:pPais_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pPais_Id = req.params.pPais_Id;
    lsql = 'EXEC pConFa_EliminaPais ' + pPais_Id;
    executeQuery(res, lsql);
});

router.get('/Requisitos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaRequisitos';
    executeQuery(res, lsql);
});

router.get('/Requisito/:pRequisito_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisito_Id = req.params.pRequisito_Id;
    lsql = 'EXEC pConFa_MuestraRequisito ' + pRequisito_Id;
    executeQuery(res, lsql);
});

router.post('/Requisitos/:pRequisito_Id&:pRequisito_Nombre&:pRequisito_Logo', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisito_Id = req.params.pRequisito_Id;
    var pRequisito_Nombre = (req.params.pRequisito_Nombre=='null' ? req.params.pRequisito_Nombre : "'" + req.params.pRequisito_Nombre + "'");
    var pRequisito_Logo = (req.params.pRequisito_Logo=='null' ? req.params.pRequisito_Logo : "'" + req.params.pRequisito_Logo + "'");
    lsql = 'EXEC pConFa_GuardaRequisito ' + pRequisito_Id + ", " + pRequisito_Nombre + ", " + pRequisito_Logo;
    executeQuery(res, lsql);
});

router.post('/Requisitos/:pRequisito_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisito_Id = req.params.pRequisito_Id;
    lsql = 'EXEC pConFa_EliminaRequisito ' + pRequisito_Id;
    executeQuery(res, lsql);
});

router.get('/Riesgos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaRiesgos';
    executeQuery(res, lsql);
});

router.get('/Riesgo/:pRiesgo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRiesgo_Id = req.params.pRiesgo_Id;
    lsql = 'EXEC pConFa_MuestraRiesgo ' + pRiesgo_Id;
    executeQuery(res, lsql);
});

router.post('/Riesgos/:pRiesgo_Id&:pRiesgo_Titulo&:pRiesgo_Descripcion&:pRiesgo_RutaSimbolo', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRiesgo_Id = req.params.pRiesgo_Id;
    var pRiesgo_Titulo = (req.params.pRiesgo_Titulo=='null' ? req.params.pRiesgo_Titulo : "'" + req.params.pRiesgo_Titulo + "'");
    var pRiesgo_Descripcion = (req.params.pRiesgo_Descripcion=='null' ? req.params.pRiesgo_Descripcion : "'" + req.params.pRiesgo_Descripcion + "'");
    var pRiesgo_RutaSimbolo = (req.params.pRiesgo_RutaSimbolo=='null' ? req.params.pRiesgo_RutaSimbolo : "'" + req.params.pRiesgo_RutaSimbolo + "'");
    lsql = 'EXEC pConFa_GuardaRiesgo ' + pRiesgo_Id + ", " + pRiesgo_Titulo + ", " + pRiesgo_Descripcion + ", " + pRiesgo_RutaSimbolo;
    executeQuery(res, lsql);
});

router.post('/Riesgos/:pRiesgo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRiesgo_Id = req.params.pRiesgo_Id;
    lsql = 'EXEC pConFa_EliminaRiesgo ' + pRiesgo_Id;
    executeQuery(res, lsql);
});

router.get('/Roles', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaRoles';
    executeQuery(res, lsql);
});

router.get('/Rol/:pRol_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRol_Id = req.params.pRol_Id;
    lsql = 'EXEC pConFa_MuestraRol ' + pRol_Id;
    executeQuery(res, lsql);
});

router.post('/Roles/:pRol_Id&:pRol_Nombre&:pRol_Descripcion&:pRol_Importancia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRol_Id = req.params.pRol_Id;
    var pRol_Nombre = (req.params.pRol_Nombre=='null' ? req.params.pRol_Nombre : "'" + req.params.pRol_Nombre + "'");
    var pRol_Descripcion = (req.params.pRol_Descripcion=='null' ? req.params.pRol_Descripcion : "'" + req.params.pRol_Descripcion + "'");
    var pRol_Importancia = req.params.pRol_Importancia;
    lsql = 'EXEC pConFa_GuardaRol ' + pRol_Id + ", " + pRol_Nombre + ", " + pRol_Descripcion + ", " + pRol_Importancia;
    executeQuery(res, lsql);
});

router.post('/Roles/:pRol_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRol_Id = req.params.pRol_Id;
    lsql = 'EXEC pConFa_EliminaRol ' + pRol_Id;
    executeQuery(res, lsql);
});

router.get('/TipoEmpresaContratadas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaTipoEmpresaContratadas';
    executeQuery(res, lsql);
});

router.get('/TipoEmpresaContratada/:pTipoEmpresaContratada_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEmpresaContratada_Id = req.params.pTipoEmpresaContratada_Id;
    lsql = 'EXEC pConFa_MuestraTipoEmpresaContratada ' + pTipoEmpresaContratada_Id;
    executeQuery(res, lsql);
});

router.post('/TipoEmpresaContratadas/:pTipoEmpresaContratada_Id&:pTipoEmpresaContratada_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEmpresaContratada_Id = req.params.pTipoEmpresaContratada_Id;
    var pTipoEmpresaContratada_Nombre = (req.params.pTipoEmpresaContratada_Nombre=='null' ? req.params.pTipoEmpresaContratada_Nombre : "'" + req.params.pTipoEmpresaContratada_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaTipoEmpresaContratada ' + pTipoEmpresaContratada_Id + ", " + pTipoEmpresaContratada_Nombre;
    executeQuery(res, lsql);
});

router.post('/TipoEmpresaContratadas/:pTipoEmpresaContratada_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEmpresaContratada_Id = req.params.pTipoEmpresaContratada_Id;
    lsql = 'EXEC pConFa_EliminaTipoEmpresaContratada ' + pTipoEmpresaContratada_Id;
    executeQuery(res, lsql);
});

router.get('/TipoEquipos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaTipoEquipos';
    executeQuery(res, lsql);
});

router.get('/TipoEquipo/:pTipoEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEquipo_Id = req.params.pTipoEquipo_Id;
    lsql = 'EXEC pConFa_MuestraTipoEquipo ' + pTipoEquipo_Id;
    executeQuery(res, lsql);
});

router.post('/TipoEquipos/:pTipoEquipo_Id&:pTipoEquipo_Nombre&:pTipoEquipo_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEquipo_Id = req.params.pTipoEquipo_Id;
    var pTipoEquipo_Nombre = (req.params.pTipoEquipo_Nombre=='null' ? req.params.pTipoEquipo_Nombre : "'" + req.params.pTipoEquipo_Nombre + "'");
    var pTipoEquipo_Descripcion = (req.params.pTipoEquipo_Descripcion=='null' ? req.params.pTipoEquipo_Descripcion : "'" + req.params.pTipoEquipo_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaTipoEquipo ' + pTipoEquipo_Id + ", " + pTipoEquipo_Nombre + ", " + pTipoEquipo_Descripcion;
    executeQuery(res, lsql);
});

router.post('/TipoEquipos/:pTipoEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEquipo_Id = req.params.pTipoEquipo_Id;
    lsql = 'EXEC pConFa_EliminaTipoEquipo ' + pTipoEquipo_Id;
    executeQuery(res, lsql);
});

router.get('/ComponenteFallaAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponenteFallaAMFEs';
    executeQuery(res, lsql);
});

router.get('/ComponenteFallaAMFE/:pComponenteFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFalla_Id = req.params.pComponenteFalla_Id;
    lsql = 'EXEC pConFa_MuestraComponenteFallaAMFE ' + pComponenteFalla_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteFallaAMFEs/:pComponenteFalla_Id&:pFallaConFa_Falla_Id&:pComponenteConFa_Componente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFalla_Id = req.params.pComponenteFalla_Id;
    var pFallaConFa_Falla_Id = req.params.pFallaConFa_Falla_Id;
    var pComponenteConFa_Componente_Id = req.params.pComponenteConFa_Componente_Id;
    lsql = 'EXEC pConFa_GuardaComponenteFallaAMFE ' + pComponenteFalla_Id + ", " + pFallaConFa_Falla_Id + ", " + pComponenteConFa_Componente_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteFallaAMFEs/:pComponenteFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFalla_Id = req.params.pComponenteFalla_Id;
    lsql = 'EXEC pConFa_EliminaComponenteFallaAMFE ' + pComponenteFalla_Id;
    executeQuery(res, lsql);
});

router.get('/ComponenteFallaConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponenteFallaConFas';
    executeQuery(res, lsql);
});

router.get('/ComponenteFallaConFa/:pComponenteFallaConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFallaConFa_Id = req.params.pComponenteFallaConFa_Id;
    lsql = 'EXEC pConFa_MuestraComponenteFallaConFa ' + pComponenteFallaConFa_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteFallaConFas/:pComponenteFallaConFa_Id&:pFallaConFa_Id&:pComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFallaConFa_Id = req.params.pComponenteFallaConFa_Id;
    var pFallaConFa_Id = req.params.pFallaConFa_Id;
    var pComponenteConFa_Id = req.params.pComponenteConFa_Id;
    lsql = 'EXEC pConFa_GuardaComponenteFallaConFa ' + pComponenteFallaConFa_Id + ", " + pFallaConFa_Id + ", " + pComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteFallaConFas/:pComponenteFallaConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFallaConFa_Id = req.params.pComponenteFallaConFa_Id;
    lsql = 'EXEC pConFa_EliminaComponenteFallaConFa ' + pComponenteFallaConFa_Id;
    executeQuery(res, lsql);
});

router.get('/ComponenteTareas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponenteTareas';
    executeQuery(res, lsql);
});

router.get('/ComponenteTarea/:pComponenteTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteTarea_Id = req.params.pComponenteTarea_Id;
    lsql = 'EXEC pConFa_MuestraComponenteTarea ' + pComponenteTarea_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteTareas/:pComponenteTarea_Id&:pComponente_Id&:pTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteTarea_Id = req.params.pComponenteTarea_Id;
    var pComponente_Id = req.params.pComponente_Id;
    var pTarea_Id = req.params.pTarea_Id;
    lsql = 'EXEC pConFa_GuardaComponenteTarea ' + pComponenteTarea_Id + ", " + pComponente_Id + ", " + pTarea_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteTareas/:pComponenteTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteTarea_Id = req.params.pComponenteTarea_Id;
    lsql = 'EXEC pConFa_EliminaComponenteTarea ' + pComponenteTarea_Id;
    executeQuery(res, lsql);
});

router.get('/Comunas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComunas';
    executeQuery(res, lsql);
});

router.get('/Comuna/:pComuna_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComuna_Id = req.params.pComuna_Id;
    lsql = 'EXEC pConFa_MuestraComuna ' + pComuna_Id;
    executeQuery(res, lsql);
});

router.post('/Comunas/:pComuna_Id&:pProvincia_Id&:pComuna_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComuna_Id = req.params.pComuna_Id;
    var pProvincia_Id = req.params.pProvincia_Id;
    var pComuna_Nombre = (req.params.pComuna_Nombre=='null' ? req.params.pComuna_Nombre : "'" + req.params.pComuna_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaComuna ' + pComuna_Id + ", " + pProvincia_Id + ", " + pComuna_Nombre;
    executeQuery(res, lsql);
});

router.post('/Comunas/:pComuna_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComuna_Id = req.params.pComuna_Id;
    lsql = 'EXEC pConFa_EliminaComuna ' + pComuna_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaEmpresas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaEmpresas';
    executeQuery(res, lsql);
});

router.get('/EmpresaEmpresa/:pEmpresaEmpresa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaEmpresa_Id = req.params.pEmpresaEmpresa_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaEmpresa ' + pEmpresaEmpresa_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaEmpresas/:pEmpresaEmpresa_Id&:pTipoEmpresaContratada_Id&:pEmpresa_Id&:pEmpresa_IdExterna', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaEmpresa_Id = req.params.pEmpresaEmpresa_Id;
    var pTipoEmpresaContratada_Id = req.params.pTipoEmpresaContratada_Id;
    var pEmpresa_Id = req.params.pEmpresa_Id;
    var pEmpresa_IdExterna = req.params.pEmpresa_IdExterna;
    lsql = 'EXEC pConFa_GuardaEmpresaEmpresa ' + pEmpresaEmpresa_Id + ", " + pTipoEmpresaContratada_Id + ", " + pEmpresa_Id + ", " + pEmpresa_IdExterna;
    executeQuery(res, lsql);
});

router.post('/EmpresaEmpresas/:pEmpresaEmpresa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaEmpresa_Id = req.params.pEmpresaEmpresa_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaEmpresa ' + pEmpresaEmpresa_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaEquipoAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaEquipoAMFEs';
    executeQuery(res, lsql);
});

router.get('/EmpresaEquipoAMFE/:pEmpresaEquipoAMFE_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaEquipoAMFE_Id = req.params.pEmpresaEquipoAMFE_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaEquipoAMFE ' + pEmpresaEquipoAMFE_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaEquipoAMFEs/:pEmpresaEquipoAMFE_Id&:pEquipoConFa_EquipoConFa_Id&:pEmpresa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaEquipoAMFE_Id = req.params.pEmpresaEquipoAMFE_Id;
    var pEquipoConFa_EquipoConFa_Id = req.params.pEquipoConFa_EquipoConFa_Id;
    var pEmpresa_Id = req.params.pEmpresa_Id;
    lsql = 'EXEC pConFa_GuardaEmpresaEquipoAMFE ' + pEmpresaEquipoAMFE_Id + ", " + pEquipoConFa_EquipoConFa_Id + ", " + pEmpresa_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaEquipoAMFEs/:pEmpresaEquipoAMFE_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaEquipoAMFE_Id = req.params.pEmpresaEquipoAMFE_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaEquipoAMFE ' + pEmpresaEquipoAMFE_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaFiliales', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaFiliales';
    executeQuery(res, lsql);
});

router.get('/EmpresaFilial/:pEmpresaFilial_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaFilial_Id = req.params.pEmpresaFilial_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaFilial ' + pEmpresaFilial_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaFiliales/:pEmpresaFilial_Id&:pEmpresa_Id&:pComuna_Id&:pEmpresaFilial_Direccion&:pEmpresaFilial_Numero&:pEmpresaFilial_Lote', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaFilial_Id = req.params.pEmpresaFilial_Id;
    var pEmpresa_Id = req.params.pEmpresa_Id;
    var pComuna_Id = req.params.pComuna_Id;
    var pEmpresaFilial_Direccion = (req.params.pEmpresaFilial_Direccion=='null' ? req.params.pEmpresaFilial_Direccion : "'" + req.params.pEmpresaFilial_Direccion + "'");
    var pEmpresaFilial_Numero = req.params.pEmpresaFilial_Numero;
    var pEmpresaFilial_Lote = (req.params.pEmpresaFilial_Lote=='null' ? req.params.pEmpresaFilial_Lote : "'" + req.params.pEmpresaFilial_Lote + "'");
    lsql = 'EXEC pConFa_GuardaEmpresaFilial ' + pEmpresaFilial_Id + ", " + pEmpresa_Id + ", " + pComuna_Id + ", " + pEmpresaFilial_Direccion + ", " + pEmpresaFilial_Numero + ", " + pEmpresaFilial_Lote;
    executeQuery(res, lsql);
});

router.post('/EmpresaFiliales/:pEmpresaFilial_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaFilial_Id = req.params.pEmpresaFilial_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaFilial ' + pEmpresaFilial_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuarios', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaUsuarios';
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuario/:pEmpresaUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaUsuario ' + pEmpresaUsuario_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuarios/:pEmpresaUsuario_Id&:pUsuario_Id&:pEmpresa_Id&:pEmpresaUsuario_FlagVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pUsuario_Id = req.params.pUsuario_Id;
    var pEmpresa_Id = req.params.pEmpresa_Id;
    var pEmpresaUsuario_FlagVigencia = req.params.pEmpresaUsuario_FlagVigencia;
    lsql = 'EXEC pConFa_GuardaEmpresaUsuario ' + pEmpresaUsuario_Id + ", " + pUsuario_Id + ", " + pEmpresa_Id + ", " + pEmpresaUsuario_FlagVigencia;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuarios/:pEmpresaUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaUsuario ' + pEmpresaUsuario_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuarioModuloRoles', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaUsuarioModuloRoles';
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuarioModuloRol/:pEmpresaUsuarioModuloRol_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuarioModuloRol_Id = req.params.pEmpresaUsuarioModuloRol_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaUsuarioModuloRol ' + pEmpresaUsuarioModuloRol_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuarioModuloRoles/:pEmpresaUsuarioModuloRol_Id&:pEmpresaUsuario_Id&:pModulo_Id&:pRol_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuarioModuloRol_Id = req.params.pEmpresaUsuarioModuloRol_Id;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pModulo_Id = req.params.pModulo_Id;
    var pRol_Id = req.params.pRol_Id;
    lsql = 'EXEC pConFa_GuardaEmpresaUsuarioModuloRol ' + pEmpresaUsuarioModuloRol_Id + ", " + pEmpresaUsuario_Id + ", " + pModulo_Id + ", " + pRol_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuarioModuloRoles/:pEmpresaUsuarioModuloRol_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuarioModuloRol_Id = req.params.pEmpresaUsuarioModuloRol_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaUsuarioModuloRol ' + pEmpresaUsuarioModuloRol_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuarioSectores', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaUsuarioSectores';
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuarioSector/:pEmpresaUsuarioSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuarioSector_Id = req.params.pEmpresaUsuarioSector_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaUsuarioSector ' + pEmpresaUsuarioSector_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuarioSectores/:pEmpresaUsuarioSector_Id&:pEmpresaUsuario_Id&:pSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuarioSector_Id = req.params.pEmpresaUsuarioSector_Id;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pSector_Id = req.params.pSector_Id;
    lsql = 'EXEC pConFa_GuardaEmpresaUsuarioSector ' + pEmpresaUsuarioSector_Id + ", " + pEmpresaUsuario_Id + ", " + pSector_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuarioSectores/:pEmpresaUsuarioSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuarioSector_Id = req.params.pEmpresaUsuarioSector_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaUsuarioSector ' + pEmpresaUsuarioSector_Id;
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuariosistemas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEmpresaUsuariosistemas';
    executeQuery(res, lsql);
});

router.get('/EmpresaUsuariosistema/:pEmpresaUsuariosistema_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuariosistema_Id = req.params.pEmpresaUsuariosistema_Id;
    lsql = 'EXEC pConFa_MuestraEmpresaUsuariosistema ' + pEmpresaUsuariosistema_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuariosistemas/:pEmpresaUsuariosistema_Id&:pEmpresaUsuario_Id&:pSistema_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuariosistema_Id = req.params.pEmpresaUsuariosistema_Id;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pSistema_Id = req.params.pSistema_Id;
    lsql = 'EXEC pConFa_GuardaEmpresaUsuariosistema ' + pEmpresaUsuariosistema_Id + ", " + pEmpresaUsuario_Id + ", " + pSistema_Id;
    executeQuery(res, lsql);
});

router.post('/EmpresaUsuariosistemas/:pEmpresaUsuariosistema_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEmpresaUsuariosistema_Id = req.params.pEmpresaUsuariosistema_Id;
    lsql = 'EXEC pConFa_EliminaEmpresaUsuariosistema ' + pEmpresaUsuariosistema_Id;
    executeQuery(res, lsql);
});

router.get('/Equipos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipos';
    executeQuery(res, lsql);
});

router.get('/Equipo/:pEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipo_Id = req.params.pEquipo_Id;
    lsql = 'EXEC pConFa_MuestraEquipo ' + pEquipo_Id;
    executeQuery(res, lsql);
});

router.post('/Equipos/:pEquipo_Id&:pTipoEquipo_Id&:pEstadoEquipo_Id&:pEquipo_Nombre&:pEquipo_Codigo&:pEquipo_Comentario&:pEquipo_FlagVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipo_Id = req.params.pEquipo_Id;
    var pTipoEquipo_Id = req.params.pTipoEquipo_Id;
    var pEstadoEquipo_Id = req.params.pEstadoEquipo_Id;
    var pEquipo_Nombre = (req.params.pEquipo_Nombre=='null' ? req.params.pEquipo_Nombre : "'" + req.params.pEquipo_Nombre + "'");
    var pEquipo_Codigo = (req.params.pEquipo_Codigo=='null' ? req.params.pEquipo_Codigo : "'" + req.params.pEquipo_Codigo + "'");
    var pEquipo_Comentario = (req.params.pEquipo_Comentario=='null' ? req.params.pEquipo_Comentario : "'" + req.params.pEquipo_Comentario + "'");
    var pEquipo_FlagVigencia = req.params.pEquipo_FlagVigencia;
    lsql = 'EXEC pConFa_GuardaEquipo ' + pEquipo_Id + ", " + pTipoEquipo_Id + ", " + pEstadoEquipo_Id + ", " + pEquipo_Nombre + ", " + pEquipo_Codigo + ", " + pEquipo_Comentario + ", " + pEquipo_FlagVigencia;
    executeQuery(res, lsql);
});

router.post('/Equipos/:pEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipo_Id = req.params.pEquipo_Id;
    lsql = 'EXEC pConFa_EliminaEquipo ' + pEquipo_Id;
    executeQuery(res, lsql);
});

router.get('/EquipoComponentes', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipoComponentes';
    executeQuery(res, lsql);
});

router.get('/EquipoComponente/:pEquipoComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponente_Id = req.params.pEquipoComponente_Id;
    lsql = 'EXEC pConFa_MuestraEquipoComponente ' + pEquipoComponente_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoComponentes/:pEquipoComponente_Id&:pComponente_Id&:pEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponente_Id = req.params.pEquipoComponente_Id;
    var pComponente_Id = req.params.pComponente_Id;
    var pEquipo_Id = req.params.pEquipo_Id;
    lsql = 'EXEC pConFa_GuardaEquipoComponente ' + pEquipoComponente_Id + ", " + pComponente_Id + ", " + pEquipo_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoComponentes/:pEquipoComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponente_Id = req.params.pEquipoComponente_Id;
    lsql = 'EXEC pConFa_EliminaEquipoComponente ' + pEquipoComponente_Id;
    executeQuery(res, lsql);
});

router.get('/EquipoComponenteAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipoComponenteAMFEs';
    executeQuery(res, lsql);
});

router.get('/EquipoComponenteAMFE/:pEquipoComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponenteConFa_Id = req.params.pEquipoComponenteConFa_Id;
    lsql = 'EXEC pConFa_MuestraEquipoComponenteAMFE ' + pEquipoComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoComponenteAMFEs/:pEquipoComponenteConFa_Id&:pEquipoConFa_EquipoConFa_Id&:pComponenteConFa_Componente_Id&:pEquipoComponenteAMFE_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponenteConFa_Id = req.params.pEquipoComponenteConFa_Id;
    var pEquipoConFa_EquipoConFa_Id = req.params.pEquipoConFa_EquipoConFa_Id;
    var pComponenteConFa_Componente_Id = req.params.pComponenteConFa_Componente_Id;
    var pEquipoComponenteAMFE_Nombre = (req.params.pEquipoComponenteAMFE_Nombre=='null' ? req.params.pEquipoComponenteAMFE_Nombre : "'" + req.params.pEquipoComponenteAMFE_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaEquipoComponenteAMFE ' + pEquipoComponenteConFa_Id + ", " + pEquipoConFa_EquipoConFa_Id + ", " + pComponenteConFa_Componente_Id + ", " + pEquipoComponenteAMFE_Nombre;
    executeQuery(res, lsql);
});

router.post('/EquipoComponenteAMFEs/:pEquipoComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponenteConFa_Id = req.params.pEquipoComponenteConFa_Id;
    lsql = 'EXEC pConFa_EliminaEquipoComponenteAMFE ' + pEquipoComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.get('/EquipoComponenteConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipoComponenteConFas';
    executeQuery(res, lsql);
});

router.get('/EquipoComponenteConFa/:pEquipoComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponenteConFa_Id = req.params.pEquipoComponenteConFa_Id;
    lsql = 'EXEC pConFa_MuestraEquipoComponenteConFa ' + pEquipoComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoComponenteConFas/:pEquipoComponenteConFa_Id&:pComponenteConFa_Id&:pEquipoConFa_Id&:pEquipoComponenteConFa_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponenteConFa_Id = req.params.pEquipoComponenteConFa_Id;
    var pComponenteConFa_Id = req.params.pComponenteConFa_Id;
    var pEquipoConFa_Id = req.params.pEquipoConFa_Id;
    var pEquipoComponenteConFa_Nombre = (req.params.pEquipoComponenteConFa_Nombre=='null' ? req.params.pEquipoComponenteConFa_Nombre : "'" + req.params.pEquipoComponenteConFa_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaEquipoComponenteConFa ' + pEquipoComponenteConFa_Id + ", " + pComponenteConFa_Id + ", " + pEquipoConFa_Id + ", " + pEquipoComponenteConFa_Nombre;
    executeQuery(res, lsql);
});

router.post('/EquipoComponenteConFas/:pEquipoComponenteConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoComponenteConFa_Id = req.params.pEquipoComponenteConFa_Id;
    lsql = 'EXEC pConFa_EliminaEquipoComponenteConFa ' + pEquipoComponenteConFa_Id;
    executeQuery(res, lsql);
});

router.get('/EquipoEventos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEquipoEventos';
    executeQuery(res, lsql);
});

router.get('/EquipoEvento/:pEquipoEvento_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoEvento_Id = req.params.pEquipoEvento_Id;
    lsql = 'EXEC pConFa_MuestraEquipoEvento ' + pEquipoEvento_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoEventos/:pEquipoEvento_Id&:pEquipo_Id&:pEvento_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoEvento_Id = req.params.pEquipoEvento_Id;
    var pEquipo_Id = req.params.pEquipo_Id;
    var pEvento_Id = req.params.pEvento_Id;
    lsql = 'EXEC pConFa_GuardaEquipoEvento ' + pEquipoEvento_Id + ", " + pEquipo_Id + ", " + pEvento_Id;
    executeQuery(res, lsql);
});

router.post('/EquipoEventos/:pEquipoEvento_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEquipoEvento_Id = req.params.pEquipoEvento_Id;
    lsql = 'EXEC pConFa_EliminaEquipoEvento ' + pEquipoEvento_Id;
    executeQuery(res, lsql);
});

router.get('/Eventos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaEventos';
    executeQuery(res, lsql);
});

router.get('/Evento/:pEvento_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEvento_Id = req.params.pEvento_Id;
    lsql = 'EXEC pConFa_MuestraEvento ' + pEvento_Id;
    executeQuery(res, lsql);
});

router.post('/Eventos/:pEvento_Id&:pEmpresaUsuario_Id&:pEvento_Nombre&:pEvento_FechaInicioPactada&:pEvento_FechaFinPactada&:pEvento_FechaInicioReal&:pEvento_FechaFinReal&:pEvento_Codigo&:pEvento_Estado&:pEvento_Descripcion&:pEvento_FlagVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEvento_Id = req.params.pEvento_Id;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pEvento_Nombre = (req.params.pEvento_Nombre=='null' ? req.params.pEvento_Nombre : "'" + req.params.pEvento_Nombre + "'");
    var pEvento_FechaInicioPactada = req.params.pEvento_FechaInicioPactada;
    var pEvento_FechaFinPactada = req.params.pEvento_FechaFinPactada;
    var pEvento_FechaInicioReal = req.params.pEvento_FechaInicioReal;
    var pEvento_FechaFinReal = req.params.pEvento_FechaFinReal;
    var pEvento_Codigo = (req.params.pEvento_Codigo=='null' ? req.params.pEvento_Codigo : "'" + req.params.pEvento_Codigo + "'");
    var pEvento_Estado = req.params.pEvento_Estado;
    var pEvento_Descripcion = (req.params.pEvento_Descripcion=='null' ? req.params.pEvento_Descripcion : "'" + req.params.pEvento_Descripcion + "'");
    var pEvento_FlagVigencia = req.params.pEvento_FlagVigencia;
    lsql = 'EXEC pConFa_GuardaEvento ' + pEvento_Id + ", " + pEmpresaUsuario_Id + ", " + pEvento_Nombre + ", " + pEvento_FechaInicioPactada + ", " + pEvento_FechaFinPactada + ", " + pEvento_FechaInicioReal + ", " + pEvento_FechaFinReal + ", " + pEvento_Codigo + ", " + pEvento_Estado + ", " + pEvento_Descripcion + ", " + pEvento_FlagVigencia;
    executeQuery(res, lsql);
});

router.post('/Eventos/:pEvento_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pEvento_Id = req.params.pEvento_Id;
    lsql = 'EXEC pConFa_EliminaEvento ' + pEvento_Id;
    executeQuery(res, lsql);
});

router.get('/Fallas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaFallas';
    executeQuery(res, lsql);
});

router.get('/Falla/:pFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFalla_Id = req.params.pFalla_Id;
    lsql = 'EXEC pConFa_MuestraFalla ' + pFalla_Id;
    executeQuery(res, lsql);
});

router.post('/Fallas/:pFalla_Id&:pAccion_Id&:pNivel_Id&:pCausa_Id&:pFalla_Nombre&:pFalla_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFalla_Id = req.params.pFalla_Id;
    var pAccion_Id = req.params.pAccion_Id;
    var pNivel_Id = req.params.pNivel_Id;
    var pCausa_Id = req.params.pCausa_Id;
    var pFalla_Nombre = (req.params.pFalla_Nombre=='null' ? req.params.pFalla_Nombre : "'" + req.params.pFalla_Nombre + "'");
    var pFalla_Descripcion = (req.params.pFalla_Descripcion=='null' ? req.params.pFalla_Descripcion : "'" + req.params.pFalla_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaFalla ' + pFalla_Id + ", " + pAccion_Id + ", " + pNivel_Id + ", " + pCausa_Id + ", " + pFalla_Nombre + ", " + pFalla_Descripcion;
    executeQuery(res, lsql);
});

router.post('/Fallas/:pFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFalla_Id = req.params.pFalla_Id;
    lsql = 'EXEC pConFa_EliminaFalla ' + pFalla_Id;
    executeQuery(res, lsql);
});

router.get('/FallaAMFEs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaFallaAMFEs';
    executeQuery(res, lsql);
});

router.get('/FallaAMFE/:pFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFalla_Id = req.params.pFalla_Id;
    lsql = 'EXEC pConFa_MuestraFallaAMFE ' + pFalla_Id;
    executeQuery(res, lsql);
});

router.post('/FallaAMFEs/:pFalla_Id&:pNivelConFa_Nivel_Id&:pCausaConFa_Causa_Id&:pAccionConFa_Accion_Id&:pFalla_Nombre&:pFalla_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFalla_Id = req.params.pFalla_Id;
    var pNivelConFa_Nivel_Id = req.params.pNivelConFa_Nivel_Id;
    var pCausaConFa_Causa_Id = req.params.pCausaConFa_Causa_Id;
    var pAccionConFa_Accion_Id = req.params.pAccionConFa_Accion_Id;
    var pFalla_Nombre = (req.params.pFalla_Nombre=='null' ? req.params.pFalla_Nombre : "'" + req.params.pFalla_Nombre + "'");
    var pFalla_Descripcion = (req.params.pFalla_Descripcion=='null' ? req.params.pFalla_Descripcion : "'" + req.params.pFalla_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaFallaAMFE ' + pFalla_Id + ", " + pNivelConFa_Nivel_Id + ", " + pCausaConFa_Causa_Id + ", " + pAccionConFa_Accion_Id + ", " + pFalla_Nombre + ", " + pFalla_Descripcion;
    executeQuery(res, lsql);
});

router.post('/FallaAMFEs/:pFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFalla_Id = req.params.pFalla_Id;
    lsql = 'EXEC pConFa_EliminaFallaAMFE ' + pFalla_Id;
    executeQuery(res, lsql);
});

router.get('/FallaConFas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaFallaConFas';
    executeQuery(res, lsql);
});

router.get('/FallaConFa/:pFallaConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFallaConFa_Id = req.params.pFallaConFa_Id;
    lsql = 'EXEC pConFa_MuestraFallaConFa ' + pFallaConFa_Id;
    executeQuery(res, lsql);
});

router.post('/FallaConFas/:pFallaConFa_Id&:pNivelConFa_Id&:pCausaConFa_Id&:pAccionConFa_Id&:pFallaConFa_Nombre&:pFallaConFa_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFallaConFa_Id = req.params.pFallaConFa_Id;
    var pNivelConFa_Id = req.params.pNivelConFa_Id;
    var pCausaConFa_Id = req.params.pCausaConFa_Id;
    var pAccionConFa_Id = req.params.pAccionConFa_Id;
    var pFallaConFa_Nombre = (req.params.pFallaConFa_Nombre=='null' ? req.params.pFallaConFa_Nombre : "'" + req.params.pFallaConFa_Nombre + "'");
    var pFallaConFa_Descripcion = (req.params.pFallaConFa_Descripcion=='null' ? req.params.pFallaConFa_Descripcion : "'" + req.params.pFallaConFa_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaFallaConFa ' + pFallaConFa_Id + ", " + pNivelConFa_Id + ", " + pCausaConFa_Id + ", " + pAccionConFa_Id + ", " + pFallaConFa_Nombre + ", " + pFallaConFa_Descripcion;
    executeQuery(res, lsql);
});

router.post('/FallaConFas/:pFallaConFa_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pFallaConFa_Id = req.params.pFallaConFa_Id;
    lsql = 'EXEC pConFa_EliminaFallaConFa ' + pFallaConFa_Id;
    executeQuery(res, lsql);
});

router.get('/GrupoSectores', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaGrupoSectores';
    executeQuery(res, lsql);
});

router.get('/GrupoSector/:pGrupoSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pGrupoSector_Id = req.params.pGrupoSector_Id;
    lsql = 'EXEC pConFa_MuestraGrupoSector ' + pGrupoSector_Id;
    executeQuery(res, lsql);
});

router.post('/GrupoSectores/:pGrupoSector_Id&:pDominioGrupo_Id&:pGrupoSector_Nombre&:pGrupoSector_Ubicacion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pGrupoSector_Id = req.params.pGrupoSector_Id;
    var pDominioGrupo_Id = req.params.pDominioGrupo_Id;
    var pGrupoSector_Nombre = (req.params.pGrupoSector_Nombre=='null' ? req.params.pGrupoSector_Nombre : "'" + req.params.pGrupoSector_Nombre + "'");
    var pGrupoSector_Ubicacion = (req.params.pGrupoSector_Ubicacion=='null' ? req.params.pGrupoSector_Ubicacion : "'" + req.params.pGrupoSector_Ubicacion + "'");
    lsql = 'EXEC pConFa_GuardaGrupoSector ' + pGrupoSector_Id + ", " + pDominioGrupo_Id + ", " + pGrupoSector_Nombre + ", " + pGrupoSector_Ubicacion;
    executeQuery(res, lsql);
});

router.post('/GrupoSectores/:pGrupoSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pGrupoSector_Id = req.params.pGrupoSector_Id;
    lsql = 'EXEC pConFa_EliminaGrupoSector ' + pGrupoSector_Id;
    executeQuery(res, lsql);
});

router.get('/MasterLoges', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaMasterLoges';
    executeQuery(res, lsql);
});

router.get('/MasterLog/:pidMasterLog', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pidMasterLog = req.params.pidMasterLog;
    lsql = 'EXEC pConFa_MuestraMasterLog ' + pidMasterLog;
    executeQuery(res, lsql);
});

router.post('/MasterLoges/:pidMasterLog&:pEmpresaUsuario_Id&:pMasterLogText&:pMasterLogDate&:pMasterLogTable&:pMasterLog_IdInTable', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pidMasterLog = req.params.pidMasterLog;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pMasterLogText = (req.params.pMasterLogText=='null' ? req.params.pMasterLogText : "'" + req.params.pMasterLogText + "'");
    var pMasterLogDate = (req.params.pMasterLogDate=='null' ? req.params.pMasterLogDate : "'" + req.params.pMasterLogDate + "'");
    var pMasterLogTable = (req.params.pMasterLogTable=='null' ? req.params.pMasterLogTable : "'" + req.params.pMasterLogTable + "'");
    var pMasterLog_IdInTable = req.params.pMasterLog_IdInTable;
    lsql = 'EXEC pConFa_GuardaMasterLog ' + pidMasterLog + ", " + pEmpresaUsuario_Id + ", " + pMasterLogText + ", " + pMasterLogDate + ", " + pMasterLogTable + ", " + pMasterLog_IdInTable;
    executeQuery(res, lsql);
});

router.post('/MasterLoges/:pidMasterLog', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pidMasterLog = req.params.pidMasterLog;
    lsql = 'EXEC pConFa_EliminaMasterLog ' + pidMasterLog;
    executeQuery(res, lsql);
});

router.get('/Provincias', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaProvincias';
    executeQuery(res, lsql);
});

router.get('/Provincia/:pProvincia_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pProvincia_Id = req.params.pProvincia_Id;
    lsql = 'EXEC pConFa_MuestraProvincia ' + pProvincia_Id;
    executeQuery(res, lsql);
});

router.post('/Provincias/:pProvincia_Id&:pRegion_Id&:pProvincia_Nombre', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pProvincia_Id = req.params.pProvincia_Id;
    var pRegion_Id = req.params.pRegion_Id;
    var pProvincia_Nombre = (req.params.pProvincia_Nombre=='null' ? req.params.pProvincia_Nombre : "'" + req.params.pProvincia_Nombre + "'");
    lsql = 'EXEC pConFa_GuardaProvincia ' + pProvincia_Id + ", " + pRegion_Id + ", " + pProvincia_Nombre;
    executeQuery(res, lsql);
});

router.post('/Provincias/:pProvincia_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pProvincia_Id = req.params.pProvincia_Id;
    lsql = 'EXEC pConFa_EliminaProvincia ' + pProvincia_Id;
    executeQuery(res, lsql);
});

router.get('/Regiones', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaRegiones';
    executeQuery(res, lsql);
});

router.get('/Region/:pRegion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRegion_Id = req.params.pRegion_Id;
    lsql = 'EXEC pConFa_MuestraRegion ' + pRegion_Id;
    executeQuery(res, lsql);
});

router.post('/Regiones/:pRegion_Id&:pPais_Id&:pRegion_Numero&:pRegion_Nombre&:pRegion_FlagVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRegion_Id = req.params.pRegion_Id;
    var pPais_Id = req.params.pPais_Id;
    var pRegion_Numero = (req.params.pRegion_Numero=='null' ? req.params.pRegion_Numero : "'" + req.params.pRegion_Numero + "'");
    var pRegion_Nombre = (req.params.pRegion_Nombre=='null' ? req.params.pRegion_Nombre : "'" + req.params.pRegion_Nombre + "'");
    var pRegion_FlagVigencia = req.params.pRegion_FlagVigencia;
    lsql = 'EXEC pConFa_GuardaRegion ' + pRegion_Id + ", " + pPais_Id + ", " + pRegion_Numero + ", " + pRegion_Nombre + ", " + pRegion_FlagVigencia;
    executeQuery(res, lsql);
});

router.post('/Regiones/:pRegion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRegion_Id = req.params.pRegion_Id;
    lsql = 'EXEC pConFa_EliminaRegion ' + pRegion_Id;
    executeQuery(res, lsql);
});

router.get('/RequisitoRiesgos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaRequisitoRiesgos';
    executeQuery(res, lsql);
});

router.get('/RequisitoRiesgo/:pRequisitoRiesgo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisitoRiesgo_Id = req.params.pRequisitoRiesgo_Id;
    lsql = 'EXEC pConFa_MuestraRequisitoRiesgo ' + pRequisitoRiesgo_Id;
    executeQuery(res, lsql);
});

router.post('/RequisitoRiesgos/:pRequisitoRiesgo_Id&:pRiesgo_Id&:pRequisito_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisitoRiesgo_Id = req.params.pRequisitoRiesgo_Id;
    var pRiesgo_Id = req.params.pRiesgo_Id;
    var pRequisito_Id = req.params.pRequisito_Id;
    lsql = 'EXEC pConFa_GuardaRequisitoRiesgo ' + pRequisitoRiesgo_Id + ", " + pRiesgo_Id + ", " + pRequisito_Id;
    executeQuery(res, lsql);
});

router.post('/RequisitoRiesgos/:pRequisitoRiesgo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisitoRiesgo_Id = req.params.pRequisitoRiesgo_Id;
    lsql = 'EXEC pConFa_EliminaRequisitoRiesgo ' + pRequisitoRiesgo_Id;
    executeQuery(res, lsql);
});

router.get('/RequisitoTareas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaRequisitoTareas';
    executeQuery(res, lsql);
});

router.get('/RequisitoTarea/:pRequisitoTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisitoTarea_Id = req.params.pRequisitoTarea_Id;
    lsql = 'EXEC pConFa_MuestraRequisitoTarea ' + pRequisitoTarea_Id;
    executeQuery(res, lsql);
});

router.post('/RequisitoTareas/:pRequisitoTarea_Id&:pRequisito_Id&:pTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisitoTarea_Id = req.params.pRequisitoTarea_Id;
    var pRequisito_Id = req.params.pRequisito_Id;
    var pTarea_Id = req.params.pTarea_Id;
    lsql = 'EXEC pConFa_GuardaRequisitoTarea ' + pRequisitoTarea_Id + ", " + pRequisito_Id + ", " + pTarea_Id;
    executeQuery(res, lsql);
});

router.post('/RequisitoTareas/:pRequisitoTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pRequisitoTarea_Id = req.params.pRequisitoTarea_Id;
    lsql = 'EXEC pConFa_EliminaRequisitoTarea ' + pRequisitoTarea_Id;
    executeQuery(res, lsql);
});

router.get('/Sectores', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaSectores';
    executeQuery(res, lsql);
});

router.get('/Sector/:pSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSector_Id = req.params.pSector_Id;
    lsql = 'EXEC pConFa_MuestraSector ' + pSector_Id;
    executeQuery(res, lsql);
});

router.post('/Sectores/:pSector_Id&:pGrupoSector_Id&:pComuna_Id&:pSector_Nombre&:pSector_Ubicacion&:pSector_Comentario', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSector_Id = req.params.pSector_Id;
    var pGrupoSector_Id = req.params.pGrupoSector_Id;
    var pComuna_Id = req.params.pComuna_Id;
    var pSector_Nombre = (req.params.pSector_Nombre=='null' ? req.params.pSector_Nombre : "'" + req.params.pSector_Nombre + "'");
    var pSector_Ubicacion = (req.params.pSector_Ubicacion=='null' ? req.params.pSector_Ubicacion : "'" + req.params.pSector_Ubicacion + "'");
    var pSector_Comentario = (req.params.pSector_Comentario=='null' ? req.params.pSector_Comentario : "'" + req.params.pSector_Comentario + "'");
    lsql = 'EXEC pConFa_GuardaSector ' + pSector_Id + ", " + pGrupoSector_Id + ", " + pComuna_Id + ", " + pSector_Nombre + ", " + pSector_Ubicacion + ", " + pSector_Comentario;
    executeQuery(res, lsql);
});

router.post('/Sectores/:pSector_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSector_Id = req.params.pSector_Id;
    lsql = 'EXEC pConFa_EliminaSector ' + pSector_Id;
    executeQuery(res, lsql);
});

router.get('/SectorTipos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaSectorTipos';
    executeQuery(res, lsql);
});

router.get('/SectorTipo/:pSectorTipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSectorTipo_Id = req.params.pSectorTipo_Id;
    lsql = 'EXEC pConFa_MuestraSectorTipo ' + pSectorTipo_Id;
    executeQuery(res, lsql);
});

router.post('/SectorTipos/:pSectorTipo_Id&:pSector_Id&:pSectorTipo_Nombre&:pSectorTipo_Comentario', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSectorTipo_Id = req.params.pSectorTipo_Id;
    var pSector_Id = req.params.pSector_Id;
    var pSectorTipo_Nombre = (req.params.pSectorTipo_Nombre=='null' ? req.params.pSectorTipo_Nombre : "'" + req.params.pSectorTipo_Nombre + "'");
    var pSectorTipo_Comentario = (req.params.pSectorTipo_Comentario=='null' ? req.params.pSectorTipo_Comentario : "'" + req.params.pSectorTipo_Comentario + "'");
    lsql = 'EXEC pConFa_GuardaSectorTipo ' + pSectorTipo_Id + ", " + pSector_Id + ", " + pSectorTipo_Nombre + ", " + pSectorTipo_Comentario;
    executeQuery(res, lsql);
});

router.post('/SectorTipos/:pSectorTipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSectorTipo_Id = req.params.pSectorTipo_Id;
    lsql = 'EXEC pConFa_EliminaSectorTipo ' + pSectorTipo_Id;
    executeQuery(res, lsql);
});

router.get('/Sistemas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaSistemas';
    executeQuery(res, lsql);
});

router.get('/Sistema/:pSistema_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSistema_Id = req.params.pSistema_Id;
    lsql = 'EXEC pConFa_MuestraSistema ' + pSistema_Id;
    executeQuery(res, lsql);
});

router.post('/Sistemas/:pSistema_Id&:pSector_Id&:pSistema_Nombre&:pSistema_Comentario', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSistema_Id = req.params.pSistema_Id;
    var pSector_Id = req.params.pSector_Id;
    var pSistema_Nombre = (req.params.pSistema_Nombre=='null' ? req.params.pSistema_Nombre : "'" + req.params.pSistema_Nombre + "'");
    var pSistema_Comentario = (req.params.pSistema_Comentario=='null' ? req.params.pSistema_Comentario : "'" + req.params.pSistema_Comentario + "'");
    lsql = 'EXEC pConFa_GuardaSistema ' + pSistema_Id + ", " + pSector_Id + ", " + pSistema_Nombre + ", " + pSistema_Comentario;
    executeQuery(res, lsql);
});

router.post('/Sistemas/:pSistema_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSistema_Id = req.params.pSistema_Id;
    lsql = 'EXEC pConFa_EliminaSistema ' + pSistema_Id;
    executeQuery(res, lsql);
});

router.get('/SistemaEquipos', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaSistemaEquipos';
    executeQuery(res, lsql);
});

router.get('/SistemaEquipo/:pSistemaEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSistemaEquipo_Id = req.params.pSistemaEquipo_Id;
    lsql = 'EXEC pConFa_MuestraSistemaEquipo ' + pSistemaEquipo_Id;
    executeQuery(res, lsql);
});

router.post('/SistemaEquipos/:pSistemaEquipo_Id&:pSistema_Id&:pEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSistemaEquipo_Id = req.params.pSistemaEquipo_Id;
    var pSistema_Id = req.params.pSistema_Id;
    var pEquipo_Id = req.params.pEquipo_Id;
    lsql = 'EXEC pConFa_GuardaSistemaEquipo ' + pSistemaEquipo_Id + ", " + pSistema_Id + ", " + pEquipo_Id;
    executeQuery(res, lsql);
});

router.post('/SistemaEquipos/:pSistemaEquipo_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pSistemaEquipo_Id = req.params.pSistemaEquipo_Id;
    lsql = 'EXEC pConFa_EliminaSistemaEquipo ' + pSistemaEquipo_Id;
    executeQuery(res, lsql);
});

router.get('/Tareas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaTareas';
    executeQuery(res, lsql);
});

router.get('/Tarea/:pTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTarea_Id = req.params.pTarea_Id;
    lsql = 'EXEC pConFa_MuestraTarea ' + pTarea_Id;
    executeQuery(res, lsql);
});

router.post('/Tareas/:pTarea_Id&:pEvento_Id&:pTarea_FechaInicioPactada&:pTarea_FechaFinPactada&:pTarea_FechaInicioReal&:pTarea_FechaFinReal&:pTarea_Estado&:pTarea_FlagVigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTarea_Id = req.params.pTarea_Id;
    var pEvento_Id = req.params.pEvento_Id;
    var pTarea_FechaInicioPactada = (req.params.pTarea_FechaInicioPactada=='null' ? req.params.pTarea_FechaInicioPactada : "'" + req.params.pTarea_FechaInicioPactada + "'");
    var pTarea_FechaFinPactada = (req.params.pTarea_FechaFinPactada=='null' ? req.params.pTarea_FechaFinPactada : "'" + req.params.pTarea_FechaFinPactada + "'");
    var pTarea_FechaInicioReal = (req.params.pTarea_FechaInicioReal=='null' ? req.params.pTarea_FechaInicioReal : "'" + req.params.pTarea_FechaInicioReal + "'");
    var pTarea_FechaFinReal = (req.params.pTarea_FechaFinReal=='null' ? req.params.pTarea_FechaFinReal : "'" + req.params.pTarea_FechaFinReal + "'");
    var pTarea_Estado = req.params.pTarea_Estado;
    var pTarea_FlagVigencia = req.params.pTarea_FlagVigencia;
    lsql = 'EXEC pConFa_GuardaTarea ' + pTarea_Id + ", " + pEvento_Id + ", " + pTarea_FechaInicioPactada + ", " + pTarea_FechaFinPactada + ", " + pTarea_FechaInicioReal + ", " + pTarea_FechaFinReal + ", " + pTarea_Estado + ", " + pTarea_FlagVigencia;
    executeQuery(res, lsql);
});

router.post('/Tareas/:pTarea_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTarea_Id = req.params.pTarea_Id;
    lsql = 'EXEC pConFa_EliminaTarea ' + pTarea_Id;
    executeQuery(res, lsql);
});

router.get('/TareaAlarmas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaTareaAlarmas';
    executeQuery(res, lsql);
});

router.get('/TareaAlarma/:pTareaAlarma_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTareaAlarma_Id = req.params.pTareaAlarma_Id;
    lsql = 'EXEC pConFa_MuestraTareaAlarma ' + pTareaAlarma_Id;
    executeQuery(res, lsql);
});

router.post('/TareaAlarmas/:pTareaAlarma_Id&:pTarea_Id&:pTareaAlarma_FechaRecordatorio', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTareaAlarma_Id = req.params.pTareaAlarma_Id;
    var pTarea_Id = req.params.pTarea_Id;
    var pTareaAlarma_FechaRecordatorio = (req.params.pTareaAlarma_FechaRecordatorio=='null' ? req.params.pTareaAlarma_FechaRecordatorio : "'" + req.params.pTareaAlarma_FechaRecordatorio + "'");
    lsql = 'EXEC pConFa_GuardaTareaAlarma ' + pTareaAlarma_Id + ", " + pTarea_Id + ", " + pTareaAlarma_FechaRecordatorio;
    executeQuery(res, lsql);
});

router.post('/TareaAlarmas/:pTareaAlarma_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTareaAlarma_Id = req.params.pTareaAlarma_Id;
    lsql = 'EXEC pConFa_EliminaTareaAlarma ' + pTareaAlarma_Id;
    executeQuery(res, lsql);
});

router.get('/TareaEmpresaUsuarios', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaTareaEmpresaUsuarios';
    executeQuery(res, lsql);
});

router.get('/TareaEmpresaUsuario/:pTareaEmpresaUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTareaEmpresaUsuario_Id = req.params.pTareaEmpresaUsuario_Id;
    lsql = 'EXEC pConFa_MuestraTareaEmpresaUsuario ' + pTareaEmpresaUsuario_Id;
    executeQuery(res, lsql);
});

router.post('/TareaEmpresaUsuarios/:pTareaEmpresaUsuario_Id&:pEmpresaUsuario_Id&:pTarea_Id&:pTareaEmpresaUsuario_FechaInicioPactada&:pTareaEmpresaUsuario_FechaFinPactada&:pTareaEmpresaUsuario_FechaInicioReal&:pTareaEmpresaUsuario_FechaFinReal&:pTareaEmpresaUsuario_Comentario&:pTareaEmpresaUsuario_FlagEsEncargado', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTareaEmpresaUsuario_Id = req.params.pTareaEmpresaUsuario_Id;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pTarea_Id = req.params.pTarea_Id;
    var pTareaEmpresaUsuario_FechaInicioPactada = (req.params.pTareaEmpresaUsuario_FechaInicioPactada=='null' ? req.params.pTareaEmpresaUsuario_FechaInicioPactada : "'" + req.params.pTareaEmpresaUsuario_FechaInicioPactada + "'");
    var pTareaEmpresaUsuario_FechaFinPactada = (req.params.pTareaEmpresaUsuario_FechaFinPactada=='null' ? req.params.pTareaEmpresaUsuario_FechaFinPactada : "'" + req.params.pTareaEmpresaUsuario_FechaFinPactada + "'");
    var pTareaEmpresaUsuario_FechaInicioReal = (req.params.pTareaEmpresaUsuario_FechaInicioReal=='null' ? req.params.pTareaEmpresaUsuario_FechaInicioReal : "'" + req.params.pTareaEmpresaUsuario_FechaInicioReal + "'");
    var pTareaEmpresaUsuario_FechaFinReal = (req.params.pTareaEmpresaUsuario_FechaFinReal=='null' ? req.params.pTareaEmpresaUsuario_FechaFinReal : "'" + req.params.pTareaEmpresaUsuario_FechaFinReal + "'");
    var pTareaEmpresaUsuario_Comentario = (req.params.pTareaEmpresaUsuario_Comentario=='null' ? req.params.pTareaEmpresaUsuario_Comentario : "'" + req.params.pTareaEmpresaUsuario_Comentario + "'");
    var pTareaEmpresaUsuario_FlagEsEncargado = req.params.pTareaEmpresaUsuario_FlagEsEncargado;
    lsql = 'EXEC pConFa_GuardaTareaEmpresaUsuario ' + pTareaEmpresaUsuario_Id + ", " + pEmpresaUsuario_Id + ", " + pTarea_Id + ", " + pTareaEmpresaUsuario_FechaInicioPactada + ", " + pTareaEmpresaUsuario_FechaFinPactada + ", " + pTareaEmpresaUsuario_FechaInicioReal + ", " + pTareaEmpresaUsuario_FechaFinReal + ", " + pTareaEmpresaUsuario_Comentario + ", " + pTareaEmpresaUsuario_FlagEsEncargado;
    executeQuery(res, lsql);
});

router.post('/TareaEmpresaUsuarios/:pTareaEmpresaUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTareaEmpresaUsuario_Id = req.params.pTareaEmpresaUsuario_Id;
    lsql = 'EXEC pConFa_EliminaTareaEmpresaUsuario ' + pTareaEmpresaUsuario_Id;
    executeQuery(res, lsql);
});

router.get('/TipoEmpresaUsuarios', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaTipoEmpresaUsuarios';
    executeQuery(res, lsql);
});

router.get('/TipoEmpresaUsuario/:pTipoEmpresaUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEmpresaUsuario_Id = req.params.pTipoEmpresaUsuario_Id;
    lsql = 'EXEC pConFa_MuestraTipoEmpresaUsuario ' + pTipoEmpresaUsuario_Id;
    executeQuery(res, lsql);
});

router.post('/TipoEmpresaUsuarios/:pTipoEmpresaUsuario_Id&:pEmpresaUsuario_Id&:pTipoEmpresaUsuario_Nombre&:pTipoEmpresaUsuario_Descripcion', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEmpresaUsuario_Id = req.params.pTipoEmpresaUsuario_Id;
    var pEmpresaUsuario_Id = req.params.pEmpresaUsuario_Id;
    var pTipoEmpresaUsuario_Nombre = (req.params.pTipoEmpresaUsuario_Nombre=='null' ? req.params.pTipoEmpresaUsuario_Nombre : "'" + req.params.pTipoEmpresaUsuario_Nombre + "'");
    var pTipoEmpresaUsuario_Descripcion = (req.params.pTipoEmpresaUsuario_Descripcion=='null' ? req.params.pTipoEmpresaUsuario_Descripcion : "'" + req.params.pTipoEmpresaUsuario_Descripcion + "'");
    lsql = 'EXEC pConFa_GuardaTipoEmpresaUsuario ' + pTipoEmpresaUsuario_Id + ", " + pEmpresaUsuario_Id + ", " + pTipoEmpresaUsuario_Nombre + ", " + pTipoEmpresaUsuario_Descripcion;
    executeQuery(res, lsql);
});

router.post('/TipoEmpresaUsuarios/:pTipoEmpresaUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pTipoEmpresaUsuario_Id = req.params.pTipoEmpresaUsuario_Id;
    lsql = 'EXEC pConFa_EliminaTipoEmpresaUsuario ' + pTipoEmpresaUsuario_Id;
    executeQuery(res, lsql);
});

router.get('/Usuarios', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaUsuarios';
    executeQuery(res, lsql);
});

router.get('/Usuario/:pUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pUsuario_Id = req.params.pUsuario_Id;
    lsql = 'EXEC pConFa_MuestraUsuario ' + pUsuario_Id;
    executeQuery(res, lsql);
});

router.post('/Usuarios/:pUsuario_Id&:pUsuario_Rut&:pUsuario_Codigo&:pComuna_Id&:pUsuario_Nombre&:pUsuario_ApellidoPaterno&:pUsuario_ApellidoMaterno&:pUsuario_CorreoElectronico&:pUsuario_Contrasena&:pUsuario_DireccionDomicilio&:pUsuario_NumeroDomicilio&:pUsuario_NumeroDepto', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pUsuario_Id = req.params.pUsuario_Id;
    var pUsuario_Rut = (req.params.pUsuario_Rut=='null' ? req.params.pUsuario_Rut : "'" + req.params.pUsuario_Rut + "'");
    var pUsuario_Codigo = (req.params.pUsuario_Codigo=='null' ? req.params.pUsuario_Codigo : "'" + req.params.pUsuario_Codigo + "'");
    var pComuna_Id = req.params.pComuna_Id;
    var pUsuario_Nombre = (req.params.pUsuario_Nombre=='null' ? req.params.pUsuario_Nombre : "'" + req.params.pUsuario_Nombre + "'");
    var pUsuario_ApellidoPaterno = (req.params.pUsuario_ApellidoPaterno=='null' ? req.params.pUsuario_ApellidoPaterno : "'" + req.params.pUsuario_ApellidoPaterno + "'");
    var pUsuario_ApellidoMaterno = (req.params.pUsuario_ApellidoMaterno=='null' ? req.params.pUsuario_ApellidoMaterno : "'" + req.params.pUsuario_ApellidoMaterno + "'");
    var pUsuario_CorreoElectronico = (req.params.pUsuario_CorreoElectronico=='null' ? req.params.pUsuario_CorreoElectronico : "'" + req.params.pUsuario_CorreoElectronico + "'");
    var pUsuario_Contrasena = (req.params.pUsuario_Contrasena=='null' ? req.params.pUsuario_Contrasena : "'" + req.params.pUsuario_Contrasena + "'");
    var pUsuario_DireccionDomicilio = (req.params.pUsuario_DireccionDomicilio=='null' ? req.params.pUsuario_DireccionDomicilio : "'" + req.params.pUsuario_DireccionDomicilio + "'");
    var pUsuario_NumeroDomicilio = req.params.pUsuario_NumeroDomicilio;
    var pUsuario_NumeroDepto = req.params.pUsuario_NumeroDepto;
    lsql = 'EXEC pConFa_GuardaUsuario ' + pUsuario_Id + ", " + pUsuario_Rut + ", " + pUsuario_Codigo + ", " + pComuna_Id + ", " + pUsuario_Nombre + ", " + pUsuario_ApellidoPaterno + ", " + pUsuario_ApellidoMaterno + ", " + pUsuario_CorreoElectronico + ", " + pUsuario_Contrasena + ", " + pUsuario_DireccionDomicilio + ", " + pUsuario_NumeroDomicilio + ", " + pUsuario_NumeroDepto;
    executeQuery(res, lsql);
});

router.post('/Usuarios/:pUsuario_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pUsuario_Id = req.params.pUsuario_Id;
    lsql = 'EXEC pConFa_EliminaUsuario ' + pUsuario_Id;
    executeQuery(res, lsql);
});

router.get('/UsuarioCertificaciones', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaUsuarioCertificaciones';
    executeQuery(res, lsql);
});

router.get('/UsuarioCertificacion/:pUsuarioCertificacion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pUsuarioCertificacion_Id = req.params.pUsuarioCertificacion_Id;
    lsql = 'EXEC pConFa_MuestraUsuarioCertificacion ' + pUsuarioCertificacion_Id;
    executeQuery(res, lsql);
});

router.post('/UsuarioCertificaciones/:pUsuarioCertificacion_Id&:pUsuario_Id&:pCertificacion_Id&:pCertificacion_Archivo&:pCertificacion_FechaCertificacion&:pCertificacion_Vigencia', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pUsuarioCertificacion_Id = req.params.pUsuarioCertificacion_Id;
    var pUsuario_Id = req.params.pUsuario_Id;
    var pCertificacion_Id = req.params.pCertificacion_Id;
    var pCertificacion_Archivo = (req.params.pCertificacion_Archivo=='null' ? req.params.pCertificacion_Archivo : "'" + req.params.pCertificacion_Archivo + "'");
    var pCertificacion_FechaCertificacion = req.params.pCertificacion_FechaCertificacion;
    var pCertificacion_Vigencia = req.params.pCertificacion_Vigencia;
    lsql = 'EXEC pConFa_GuardaUsuarioCertificacion ' + pUsuarioCertificacion_Id + ", " + pUsuario_Id + ", " + pCertificacion_Id + ", " + pCertificacion_Archivo + ", " + pCertificacion_FechaCertificacion + ", " + pCertificacion_Vigencia;
    executeQuery(res, lsql);
});

router.post('/UsuarioCertificaciones/:pUsuarioCertificacion_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pUsuarioCertificacion_Id = req.params.pUsuarioCertificacion_Id;
    lsql = 'EXEC pConFa_EliminaUsuarioCertificacion ' + pUsuarioCertificacion_Id;
    executeQuery(res, lsql);
});

router.get('/ComponenteFallas', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    lsql = 'EXEC pConFa_ListaComponenteFallas';
    executeQuery(res, lsql);
});

router.get('/ComponenteFalla/:pComponenteFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFalla_Id = req.params.pComponenteFalla_Id;
    lsql = 'EXEC pConFa_MuestraComponenteFalla ' + pComponenteFalla_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteFallas/:pComponenteFalla_Id&:pFalla_Id&:pComponente_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFalla_Id = req.params.pComponenteFalla_Id;
    var pFalla_Id = req.params.pFalla_Id;
    var pComponente_Id = req.params.pComponente_Id;
    lsql = 'EXEC pConFa_GuardaComponenteFalla ' + pComponenteFalla_Id + ", " + pFalla_Id + ", " + pComponente_Id;
    executeQuery(res, lsql);
});

router.post('/ComponenteFallas/:pComponenteFalla_Id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pComponenteFalla_Id = req.params.pComponenteFalla_Id;
    lsql = 'EXEC pConFa_EliminaComponenteFalla ' + pComponenteFalla_Id;
    executeQuery(res, lsql);
});

app.use(router);


server.listen(port, function () {
});
