var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var session = require('client-sessions');
var api = require('./routes/api');

//var bodyParser = require('body-parser');



app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
	cookieName: 'logSesh',
	secret: 'ewallet',
	duration: 1 * 2 * 60 * 1000, 
	activeDuration: 8 * 1 * 60 * 1000
}));

app.use(api);



app.get('*', function(req, res) {
	res.send('404');
});

app.post('*', function(req, res) {
	res.send('404');
});

app.listen(3000, function(req,res){
	console.log("listening on 3000");
});