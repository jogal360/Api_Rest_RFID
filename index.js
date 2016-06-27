/*
 * Initialize required modules
 */
var express = require('express');
var fs = require('fs');
var app = express();

//Archivo de configuración
var conf = require('./conf.json');

//Base de datos
var database = require('./db/index.js');
app.locals.db = database(conf.db, conf[conf.db]);

//START: ------------Variables de configuración------------
var http_port = conf.server.http_port;
var https_port = conf.server.https_port;
var cer = conf.server.cer;
var key = conf.server.key;
//END: ------------Variables de configuración------------

var http = require('http');
var https = require('https');

//Rutas del servidor
require('./routes/index')(app);

/*
 * No se encuentra en un entorno de desarrollo, inicia el servidor
 */
if (!module.parent) {

	//Poniendo en marcha al servidor
	http.createServer(app).listen(http_port, function(){
			console.log('HTTP server listening on port %s in %s mode', http_port, app.get('env'));
		});
		if ( !(cer == '') && !(key == ''))
		{
			console.log('Creating HTTPS server on port %s', https_port);
			https.createServer({
				key : fs.readFileSync(key),
				cert : fs.readFileSync(cer)

			}, app).listen(https_port, function(){
				console.log('HTTPS server listening on port %s in %s mode', https_port, app.get('env'));
			}); 
		}
} else {
	/*
     * Se encuentra en un entorno de desarrollo, se exporta la app
     */
    module.exports = app;
}