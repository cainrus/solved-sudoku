
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , getSudoku = require('./lib/generator.js');

var app = express();

app.configure(function(){
  app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', { sudoku: [getSudoku()] });
});

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
