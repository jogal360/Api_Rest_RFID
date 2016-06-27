module.exports = function (app){
	var bodyParser = require( 'body-parser' );
	app.use(bodyParser.json()); // for parsing application/json
	//require('./file')(app);
	require('./cruds')(app);
}