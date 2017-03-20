var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var session = require('client-sessions');
var api = require('./routes/api');

//var bodyParser = require('body-parser');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/index.html');

});
app.get('/login.html', function(req, res){
	res.sendFile(__dirname + '/public/html/login.html');

});


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
	cookieName: 'logSesh',
	secret: 'ewallet',
	duration: 1 * 2 * 60 * 1000, 
	activeDuration: 5 * 1 * 60 * 1000
}));

app.use(api)

app.listen(3000, function(req,res){
	console.log("listening on 3000");
});