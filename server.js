/// SERVER STUFF

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

module.exports = (cb) => {

	app.use(express.static('public'))

	app.use(function (req, res, next) {
		console.log('middleware');
		req.testing = 'testing';
		return next();
	  });
	  
	  app.get('/', function(req, res, next){
		console.log('get route', req.testing);
		res.end();
	  });
	  
	  app.ws('/', function(ws, req) {
		ws.on('message', function(msg) {
		  console.log(msg);
		});
		console.log('socket', req.testing);
	  });
	  
	  app.listen(3000,'localhost',()=>{
		  if(typeof cb === 'function'){
			  cb()
		  }
	  });
}