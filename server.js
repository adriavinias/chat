const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');

container.resolve(function(users){
	const app = setupExpress();

	function setupExpress(){
		const app = express();
		const server = http.createServer(app);
		server.listen(3000, function(){
			console.log('Listening on port 3000');
		});
		//Configuration of express
		configExpress(app);
		
		//Setup router
		const router = require('express-promise-router')();
		users.setRouting(router);

		app.use(router); 
	}

	function configExpress(app){
		app.use(express.static('public'));
		app.set('view engine', 'ejs');
		app.use(bodyParser.json());
		app.use(bodyParser.urlencode({
			extended: true
		}));
	}
});