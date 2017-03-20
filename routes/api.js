var express = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');


var salt = '$2a$10$sS6f6lrriaJB0LlQRRUoL.'; //TO ENCRYPT PWDS

var connection_pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'tanu1997',
  database : 'ewallet'
});



router.post('/login', function(req, res) {
	connection_pool.getConnection(function(err, connection) {
		var hashed_pwd = bcrypt.hashSync(req.body.pwd, salt);
		console.log(hashed_pwd);
		console.log(req.body.email);

		var query = connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (error, results, fields) {
			if (error || Object.keys(results).length > 1 || Object.keys(results).length == 0 ) {

				console.log(Object.keys(results).length);
  				res.json({status: 'fail', message: 'User doesn\'t exist'});
			}
			else {
				var match = bcrypt.compareSync(req.body.pwd, results[0].password);
				if(error) {
					res.json({status: 'fail', message: 'Error'});
				}
				else if(!match) {
					res.json({status: 'fail', message: "Please check your details"});
				}
				else if (match) {
					//req.logSesh.uname = req.body.uname;
					req.logSesh.email = results[0].email;
					res.json({status: 'success', message: "Logging in!"});
				}			
			} 
			connection.release();
		});
	});	
});


router.post('/signup', function(req, res) {

	connection_pool.getConnection(function(err, connection) {
		var hashed_pwd = bcrypt.hashSync(req.body.upwd, salt);
				console.log(hashed_pwd);

		var inserts = {fullname: req.body.uname, dob: null, phno: req.body.ucontact, email: req.body.uemail, address: null, password: hashed_pwd, joined: null};
		var query = connection.query('INSERT INTO users SET ?', inserts, function (error, results, fields) {
  			if (error) res.json({status: 'fail', message: 'Error. Email already registered.'});
			else{
				//req.logSession.uname = req.body.uname;
				//req.logSession.email = req.body.email;
				res.json({status: 'success', message: 'You have successfully signed up. Login!'});
			} 
			
			connection.release();

		});
	});
});

router.get('*', function(req, res) {
	res.send('404');
});

router.post('*', function(req, res) {
	res.send('404');
})


module.exports = router;