var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var session = require('client-sessions');




var connection_pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : ' ',
  database : ''		//ewallet2
});


router.get('/', function(req, res){
	res.sendFile( path.join(__dirname , '../public/html/index.html'));

});
router.get('/login', function(req, res){
	res.sendFile( path.join(__dirname , '../public/html/login.html'));

});
router.get('/transact', function(req, res){
	res.sendFile( path.join(__dirname , '../public/html/transact.html'));

});

router.get('/users', function(req,res) {
	res.sendFile( path.join(__dirname, '../public/html/users.html'))
});

router.get('/business', function(req,res) {
	res.sendFile( path.join(__dirname, '../public/html/business.html'))
});

router.get('/banks', function(req,res) {
	res.sendFile( path.join(__dirname, '../public/html/banks.html'))
});

router.post('/login', function(req, res) {
	var flag =0;
	console.log("starting log in check");
	connection_pool.getConnection(function(err, connection) {
		console.log(req.body.email);

		connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (error, results, fields) {
			if (error || Object.keys(results).length > 1 || Object.keys(results).length == 0 ) {

				console.log(Object.keys(results).length);
  				//res.json({status: 'fail', message: 'User doesn\'t exist'});

  				connection.query('SELECT * FROM business WHERE email = ?', [req.body.email], function (error, results, fields) {
  					if (error || Object.keys(results).length > 1 || Object.keys(results).length == 0 ) {
					console.log(Object.keys(results).length);
  					res.json({status: 'fail', message: 'User doesn\'t exist'});
  					}
  					else {
					var match = (req.body.pwd === results[0].password);
					if(error) {
						res.json({status: 'fail', message: 'Error'});
					}
					else if(!match) {
						res.json({status: 'fail', message: "Please check your details"});
					}
					else if (match) {
					//req.logSesh.name = req.body.uname;
					req.logSesh.email = results[0].email;
					res.json({status: 'success', message: "Logging in!"});
					flag =1;
					}			
					} 
  			});
  			}
			else {
				var match = (req.body.pwd === results[0].password);
				if(error) {
					res.json({status: 'fail', message: 'Error'});
					throw err;
				}
				else if(!match) {
					res.json({status: 'fail', message: "Please check your details"});
				}
				else if (match) {
					//req.logSesh.name = req.body.uname;
					req.logSesh.email = results[0].email;
					res.json({status: 'success', message: "Logging in!"});
					flag =1 ;
				}			
			} 
		});
		connection.release();

	});	
});


router.post('/usignup', function(req, res) {

	var flag = 1;
	connection_pool.getConnection(function(err, connection) {
		console.log("im signing a user up");
		var td = new Date();
		var dd = td.getDate();
		var mm = td.getMonth()+1;
		var yy = td.getFullYear();
		var today = mm + '-' + dd + '-' + yy;

		connection.beginTransaction(function(err) {
			console.log("started a user transaction")
			if(err){ throw err; }
			connection.query('INSERT INTO wallet_account SET ?', {user_type: 'U', activated: 0}, function(err, result,fields){
				if(err){
					connection.rollback(function(){
						throw err;
					});
				}


		console.log(result);
		var user_id = result.insertId;
		var inserts = { u_id: user_id , fullname: req.body.uname , dob: req.body.udob , phno: req.body.ucontact , email: req.body.uemail , address: req.body.uaddress , password: req.body.upwd , joined: today};

		err_msg = "Email is already registered, please log in";


		connection.query('INSERT INTO users SET ?', inserts, function(err, result,fields) {
      		if (err) { 

        		connection.rollback(function() {
        			res.json({status: 'fail', message: err_msg});
          			throw err;
        		});

      		} 
      	console.log(result);

			connection.commit(function(err) {
			        if (err) { 
			          connection.rollback(function() {
			            throw err;
			          });
			        }
			        console.log('Transaction Complete.');
			        success_msg = "Welcome"+req.body.uname+ "! Make your first transaction today! :) ";
			        flag = 1;
			       // req.logSesh.name = req.body.uname;
					req.logSesh.email = result[0].email;
			      	res.json({status:'success', message: success_msg});
			});
		});
		});
			connection.release();

		});
		/*
		var inserts = {fullname: req.body.uname, dob: req.body.udob, phno: req.body.ucontact, email: req.body.uemail, address: req.body.uaddress, password: req.body.upwd, joined: today};
		var query = connection.query('INSERT INTO users SET ?', inserts, function (error, results, fields) {
  			if (error) res.json({status: 'fail', message: error});
			else{
				//req.logSession.uname = req.body.uname;
				//req.logSession.email = req.body.email;
				res.json({status: 'success', message: 'You have successfully signed up. Login!'});
			} 
			
			connection.release();

		});
		*/
	});
});

router.post('/bsignup', function(req, res) {
	var flag = 0;
	var td = new Date();
	var dd = td.getDate();
	var mm = td.getMonth()+1;
	var yy = td.getFullYear();
	var today = yy + '-' + mm + '-' + dd;


	connection_pool.getConnection(function(err, connection) {

		connection.beginTransaction(function(err) {
			console.log("started a bueiness transaction")
			if(err){ throw err; }
			connection.query('INSERT INTO wallet_account SET ?', {user_type: 'B', activated: 0}, function(err, result,fields){
				if(err){
					connection.rollback(function(){
						throw err;
					});
				}


		console.log(result);
		var bus_id = result.insertId;
		var inserts = {b_id: bus_id, fullname: req.body.bname, phno: req.body.bcontact, email: req.body.bemail, address: req.body.baddress, password: req.body.bpwd, joined: today};

		err_msg = "Email is already registered, please log in";


		connection.query('INSERT INTO business SET ?', inserts, function(err, result,fields) {
      		if (err) { 

        		connection.rollback(function() {
        			res.json({status: 'fail', message: err_msg});
          			throw err;
        		});

      		} 
      	console.log(result);

			connection.commit(function(err) {
			        if (err) { 
			          connection.rollback(function() {
			            throw err;
			          });
			        }
			        console.log('Transaction Complete.');
			        success_msg = "Welcome"+ req.body.bname+ "! Share your email-id with your customers and start making money today! :) ";
			        flag = 1;
			       // req.logSesh.name = req.body.uname;
					req.logSesh.email = result[0].email;
			      	res.json({status:'success', message: success_msg});
			});
		});
		});

		});
			
			connection.release();

	});
});

router.post('/bqueries', function(req, res){
	console.log('recieved log');
	console.log(JSON.stringify(req.body));
	//var data  = JSON.stringify(req.body);
	console.log(req.body.bus);

	connection_pool.getConnection( function(err, connection) {
		
		if(req.body.bus){
			query1 = 'select bank_name from bank,bank_transaction where bank.bank_id=bank_transaction.bank_id and trans_type="recharged"';
			//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
			connection.query(query1,function(err, rows, fields){
				
				if( err){
					throw err;
				}
				else{
				console.log(rows[0].bank_name);
				console.log('im looking');
				console.log(JSON.stringify(rows));
				res.json(rows);
				}
			});
		}
		if(req.body.bus1){
			query1 = 'select b_acc_no from bank_transaction where bank_id=1000';
			//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
			connection.query(query1,function(err, rows, fields){
				
				if( err){
					throw err;
				}
				else{
				console.log(rows[0].b_acc_no);
				console.log('im looking');
				console.log(JSON.stringify(rows));
				res.json(rows);
				}
			});
		}
     if(req.body.bus2){
			query1 = 'select bank_transaction.u_id,fullname, avg(amt)AS avg from bank_transaction, users where users.u_id = bank_transaction.u_id group by u_id';
			//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
			connection.query(query1,function(err, rows, fields){
				
				if( err){
					throw err;
				}
				else{
				console.log(rows[0].u_id);
				console.log('im looking');
				console.log(JSON.stringify(rows));
				res.json(rows);
				}
			});
		}
		if(req.body.bus3){
			query1 = 'update wallet_account set balance = balance + 50  where user_type like "U" and i_id in (select u_id from users where floor(datediff( curdate(), dob )/365 >=50) ) ';
			query2 = 'select * from wallet_account where user_type="U"';
	connection.query(query1,function(err, rows, fields){
				
				if( err){
					throw err;
				}
	});
			connection.query(query2,function(err, rows, fields){
				
				if( err){
					throw err;
				}
				else{
				console.log(rows[0].i_id);
				console.log('im looking');
				console.log(JSON.stringify(rows));
				res.json(rows);
				}
			});
		}
		


		connection.release();
	});


});

router.post('/bsqueries', function(req, res){
	console.log('recieved log');

	//console.log(JSON.stringify(req.body));
	//var data  = JSON.stringify(req.body);
	//console.log(req.body.bus);

	connection_pool.getConnection( function(err, connection) {
		if(err){
			throw err;
		}
		else {
			console.log("connected now");
			var data=JSON.stringify(req.body.bus);
			console.log(data);
			if(req.body.bus=="1"){
				console.log("first query");
				query1='select b.fullname, w.reciever from business b , wallet_transaction w,wallet_account where reciever=wallet_account.i_id and b.b_id=w.reciever group by reciever order by count(*) desc ;';
				//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
				connection.query(query1,function(err, rows, fields){
					if(err){
						console.log('error');
						throw err;

					}
					else{
						//console.log(rows);
						res.send(rows);
					}
				});
			}
			if(req.body.bus=="2"){
				console.log("second query");
				query1='select b.fullname, w.reciever from business b , wallet_transaction w,wallet_account where reciever=wallet_account.i_id and b.b_id=w.reciever group by reciever order by count(sender) desc ;';
				//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
				connection.query(query1,function(err, rows, fields){
					if(err){
						console.log('error');
						throw err;

					}
					else{
						//console.log(rows);
						res.send(rows);
					}
				});
			}
	
			if(req.body.bus=="3"){
				console.log("third query");
				query1='select b.fullname, w.reciever from business b , wallet_transaction w,wallet_account where reciever=wallet_account.i_id and b.b_id=w.reciever group by reciever order by avg(credited) desc ;';
				//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
				connection.query(query1,function(err, rows, fields){
					if(err){
						console.log('error');
						throw err;

					}
					else{
						//console.log(rows);
						res.send(rows);
					}
				});
			}
			if(req.body.bus=="5"){
				console.log("third query");
				query1='select b.fullname,c.coupon_id from business b,coupons c where b.b_id=c.b_id ;';
				//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
				connection.query(query1,function(err, rows, fields){
					if(err){
						console.log('error');
						throw err;

					}
					else{
						//console.log(rows);
						res.send(rows);
					}
				});
			}
			if(req.body.bus=="4"){
				console.log("third query");
				query1='select b.fullname from business b;';
				//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
				connection.query(query1,function(err, rows, fields){
					if(err){
						console.log('error');
						throw err;

					}
					else{
						//console.log(rows);
						res.send(rows);
					}
				});
			}
			if(req.body.bus=="6"){
				console.log("sixth query");
				var t=req.body.t;
				query1='select fullname from business where b_id in( select reciever from wallet_transaction group by reciever having sum(credited) >=?);';
				//query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= 100);';	//+ req.body.bus +');';
				connection.query(query1, t, function(err, rows, fields){
					if(err){
						console.log('error');
						throw err;

					}
					else{
						//console.log(rows);
						res.send(rows);
					}
				});
			}
	
	}

		//res.send("1");
		connection.release();
	});


});




router.post('/uqueries', function(req, res){
	console.log('recieved log');
	console.log(JSON.stringify(req.body));
	//var data  = JSON.stringify(req.body);
	console.log(req.body.q);

	connection_pool.getConnection( function(err, connection) {
		if(err){throw err;}

		if(req.body.q){
			/*query1 = 'SELECT u_id FROM users WHERE u_id = 5';
			query2 = 'select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= ?);', [req.body.bus];	//+ req.body.bus +');';*/
			/*connection.query('select fullname from business where b_id in (select reciever from wallet_transaction group by reciever having sum(credited) >= ?);', [req.body.bus], function(err, rows, fields){
				if(err){
					throw err;
				}
				else{
				console.log(rows[0].u_id);
				console.log('im looking');
				var x = JSON.stringify(rows);
				res.send(x);
				}
			});
			*/
			if(req.body.q == 1){
			query1 = 'SELECT users.fullname from users,wallet_transaction where users.u_id = wallet_transaction.sender group by fullname order by count(fullname) desc;';
			connection.query(query1, function(err, results, fields) {
				if(err){
					throw err;
				}
				else{
					console.log(results);
					res.json(results);
				}
				/*for(var i = 0; i < Object.keys(results).length; i++){
					obj.push({result})
				}*/
			});
			}

			else if(req.body.q == 2){
				query2 = 'select users.fullname from users,user_coupons,coupons where users.u_id=user_coupons.reciever and user_coupons.coupon_code = coupons.coupon_id and coupons.amt>?';
				if(req.body.c_amt){
				connection.query(query2, req.body.c_amt, function(err, results, fields) {
					if(err){
						throw err;
					}
					else{
						console.log(results);
						res.json(results);
					}
					/*for(var i = 0; i < Object.keys(results).length; i++){
						obj.push({result})
					}*/
				});
				}
			}

			else if(req.body.q == 3){
				query3 = 'select fullname from users where u_id in( select sender from wallet_transaction group by sender having count(sender) >=?);'
				if(req.body.t_no){
				connection.query(query3, req.body.t_no, function(err, results, fields) {
					if(err){
						throw err;
					}
					else{
						console.log(results);
						res.json(results);
					}
					/*for(var i = 0; i < Object.keys(results).length; i++){
						obj.push({result})
					}*/
				});
				}
			}

			if(req.body.q == 4	){
			query4 = 'SELECT users.fullname, SUM( wallet_transaction.debited ) AS Amt_Total FROM users, wallet_transaction WHERE users.u_id = wallet_transaction.sender GROUP BY wallet_transaction.sender ORDER BY Amt_Total DESC LIMIT 1 ;';
			connection.query(query4, function(err, results, fields) {
				if(err){
					throw err;
				}
				else{
					console.log(results);
					res.json(results);
				}
				/*for(var i = 0; i < Object.keys(results).length; i++){
					obj.push({result})
				}*/
			});
			}
			if(req.body.q == 5){
			query5 = 'SELECT users.fullname, SUM( wallet_transaction.debited ) AS Amt_Total FROM users, wallet_transaction WHERE users.u_id = wallet_transaction.sender and wallet_transaction.status LIKE \'completed\' GROUP BY wallet_transaction.sender ORDER BY Amt_Total LIMIT 1 ;';
			connection.query(query5, function(err, results, fields) {
				if(err){
					throw err;
				}
				else{
					console.log(results);
					res.json(results);
				}
				/*for(var i = 0; i < Object.keys(results).length; i++){
					obj.push({result})
				}*/
			});
			}

			if(req.body.q == 6){
			var b_name = req.body.b_name;
			query6 = 'select fullname from users where u_id in( select user_coupons.reciever from user_coupons , business where  user_coupons.b_id = business.b_id and  business.fullname like ?);';
			connection.query(query6, b_name, function(err, results, fields) {
				if(err){
					throw err;
				}
				else{
					console.log(results);
					res.json(results);
				}
				/*for(var i = 0; i < Object.keys(results).length; i++){
					obj.push({result})
				}*/
			});
			}
		}



		connection.release();
	});


});




router.post('/payments', function(req, res){
	connection_pool.getConnection( function(err, connection) {

	console.log(req.logSesh);
	console.log(req.logSesh.email);
	console.log(JSON.stringify(req.body));

	var sender_id;
	var rec_id;
	var c_amt = req.body.amt;

	//Check sender validity
	if(req.logSesh.email == req.body.send_email){
		connection.query('SELECT u_id FROM users WHERE email=?', [req.body.send_email], function(err, rows, fields){
			if(err){
				throw err;
			}
		//	console.log("ARE YOU HERE?");
			console.log(JSON.stringify(rows));
			console.log('object keys length of sender query' + Object.keys(rows).length);


			if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
				console.log('object keys length of sender query' + Object.keys(rows).length);
				//CHECK IF BUSINESS IS TRYING TO TRANSFER MONEY
				connection.query('SELECT b_id FROM business WHERE email = ?', [req.body.send_email], function (err, rows, fields) {
	  				if(err){
						throw err;
					}
	  				if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
					console.log('object keys length of sender query ' + Object.keys(rows).length);
	  				res.json({status: 'fail', message: 'User doesn\'t exist'});
	  				}
	  				else {
	  					console.log('Business not authorized to send money, transaction cancelled. ');
						res.json({status: 'fail', message: "Businesses do not have privileges to transfer money."});
					}			
	  			});
			}

			else{
				sender_id = rows[0].u_id;

				connection.query('SELECT activated, user_type, acc_no, balance FROM wallet_account where i_id=?', sender_id, function(err,rows, fields){
					if(err){
							throw err;
					}
					if(rows[0].activated == 0){
						res.json({status:'fail', message:'Account is not valid, create a wallet account or activate your account!'});
					}
					else if(rows[0].balance <= req.body.amt){
						console.log('Sender invalid')
						res.json({status:'fail', message:'Not enough money in account! Please recharge before transferring!'});
					}
					else {
						t_amt = req.body.amt;
						s_bal = rows[0].balance;
						console.log('Sender is valid. Sender id is : ' + sender_id);

					//INSERT reciver QUERY
					connection.query('SELECT u_id FROM users WHERE email=?', [req.body.rec_email], function(err, rows, fields){
						if(err){
							throw err;
						}

						if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
							console.log('object keys length of reciever query BEFORE IN USER' + Object.keys(rows).length);
							//CHECK IF BUSINESS IS TRYING TO TRANSFER MONEY
							connection.query('SELECT b_id FROM business WHERE email=?', [req.body.rec_email], function (err, rows, fields) {
					  			if(err){
									throw err;
								}
					  			if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
									console.log('object keys length of reciever query BEFORE IN BUS ' + Object.keys(rows).length);
					  				res.json({status: 'fail', message: 'User doesn\'t exist'});
					  			}
					  			else{
					  				rec_id = rows[0].b_id;
					  				console.log('Transfer to business with id: ' + rec_id);
					  				console.log(rec_id);
					  			}
							});
						}
						else{
							rec_id = rows[0].u_id;
							console.log('Transfer to user with id: ' + rec_id);
							console.log('rec id is VALIDATED' + rec_id);

							//INSERT COUPON
							if(req.body.c_code){
								connection.query('SELECT amt,b_id, coupon_id, validity from coupons where coupon_id = ?', req.body.c_code, function(err, rows, fields){
									if(err){
									throw err;
									}
									if (error || Object.keys(rows).length == 0 || Object.keys(rows).length > 1 ) {
									res.json({status: 'fail', message: 'Coupon doesn\'t exist'});
									}
									else {
										var td = new Date();
										if(rows[0].validity < td){
										res.json({status:'fail',message:'Coupon has expired.'});
										}
										else if(rows[0].b_id != req.body.recieve_email){
										res.json({status:'fail',message:'Coupon not valid with this user.'});
										}
									}

									console.log('Coupon is valid!');
									c_amt = req.body.amt - rows[0].amt;

									connection.beginTransaction( function(err) {
											console.log("started a transfer transaction");
											if(err){ throw err; }

											var wt_inserts = {status:'processing', debited: c_amt, credited: c_amt, sender: sender_id, reciever: rec_id }; 
											connection.query('INSERT INTO wallet_transaction SET ?', wt_inserts, function(err, rows, fields){
												if(err) { 
													connection.rollback(function() {
								        			res.json({status: 'fail', message: 'Transaction discarded'});
								          			throw err;
								        		});
								      			} 
												else {
													wt_up = {status:'completed'};
													connection.query('UPDATE wallet_transaction SET ?', wt_up, function(err,rows, fields){
														if (err) { 
															connection.rollback(function() {
										        			res.json({status: 'fail', message: err_msg});
										          			throw err;
										        		});
														}

														else{	
															connection.query('SELECT balance FROM wallet_account where i_id=?', rec_id, function(err,rows, fields){
																if(err){
																	connection.rollback(function(){
																		res.json({status: 'fail', message: 'Transaction discarded'});
								          								throw err;
																	});
																}
																else {
																	sender_bal = s_bal - c_amt;
																	reciever_bal = rows[0].balance + c_amt;
																	bal_up = {balance: sender_bal};
																	connection.query('UPDATE wallet_account SET balance = ? where i_id = ?', [sender_bal, sender_id], function(err,rows,fields){
																		if(err){
																			connection.rollback(function(){
																				res.json({status: 'fail', message: 'Transaction discarded'});
										          								throw err;
																			});
																		}
																		else{
																			connection.query('UPDATE wallet_account SET balance = ? where i_id = ?', [reciever_bal, rec_id], function(err,rows,fields){
																				if(err){
																					connection.rollback(function(){
																						res.json({status: 'fail', message: 'Transaction discarded'});
												          								throw err;
																					});
																				}
																				else{
																					connection.commit(function(err){
																						if(err){
																							connection.rollback(function(){
																								res.json({status: 'fail', message: 'Transaction discarded'});
														          								throw err;
																							});
																						}
																						else {
																							console.log('Transaction complete!');
																							res.json({status:'success', message: 'Transaction successful'});
																						}
																					});
																				}

																			});

																		}
																});
 
																}


															});


														}


													});
												}
								
											});

									});

								});
								}
							
							else {
							connection.beginTransaction( function(err) {
											console.log("started a transfer transaction");
											if(err){ throw err; }

											var wt_inserts = {status:'processing', debited: c_amt, credited: c_amt, sender: sender_id, reciever: rec_id }; 
											connection.query('INSERT INTO wallet_transaction SET ?', wt_inserts, function(err, rows, fields){
												if(err) { 
													connection.rollback(function() {
								        			res.json({status: 'fail', message: 'Transaction discarded'});
								          			throw err;
								        		});
								      			} 
												else {
													console.log('Wallet transaction update' + rows[0]);
													wt_up = {status:'complete'};
													connection.query('UPDATE wallet_transaction SET ?', wt_up, function(err,rows, fields){
														console.log('Started an update');
														if (err) { 
															connection.rollback(function() {
										        			res.json({status: 'fail', message: err_msg});
										          			throw err;
										        		});
														}

														else{
															console.log('Upated wallet transaction');
															connection.query('SELECT balance FROM wallet_account where i_id=?', rec_id, function(err,rows, fields){
																console.log("loooking for balance of reciever");
																if(err){
																	connection.rollback(function(){
																		res.json({status: 'fail', message: 'Transaction discarded'});
								          								throw err;
																	});
																}
																else {
																	
																	connection.query('SELECT activated, user_type, acc_no, balance FROM wallet_account where i_id=?', sender_id, function(err,rows, fields){
																		if(err){
																				throw err;
																		}
																		if(rows[0].activated == 0){
																			res.json({status:'fail', message:'Account is not valid, create a wallet account or activate your account!'});
																		}
																		else if(rows[0].balance <= req.body.amt){
																			res.json({status:'fail', message:'Not enough money in account! Please recharge before transferring!'});
																		}
																		else {
																			t_amt = req.body.amt;
																			s_bal = rows[0].balance;
																			console.log('Sender is valid. Sender id is : ' + sender_id);

																	sender_bal = s_bal - t_amt;
																	reciever_bal = parseInt(rows[0].balance) + t_amt ;
																	console.log('balance and sender id' + sender_bal + '  ' + sender_id);
																	console.log('reciver has' + reciever_bal);

																	connection.query('UPDATE wallet_account SET balance = ? where i_id = ?', [sender_bal, sender_id], function(err, rows, fields){
																		console.log('Update + where function');
																		if(err){
																			connection.rollback(function(){
																				console.log('update failed');
																				res.json({status: 'fail', message: 'Transaction discarded'});
										          								throw err;
																			});
																		}
																		else{
																			console.log('update+where function and reciever');
																			connection.query('UPDATE wallet_account SET balance = ? where i_id = ?', [reciever_bal, rec_id], function(err,rows,fields){
																				if(err){
																					connection.rollback(function(){
																						res.json({status: 'fail', message: 'Transaction discarded'});
												          								throw err;
																					});
																				}
																				else{
																					console.log(rows);
																					connection.commit(function(err){
																						if(err){
																							connection.rollback(function(){
																								res.json({status: 'fail', message: 'Transaction discarded'});
														          								throw err;
																							});
																						}
																						else {
																							console.log('Transaction complete!');
																							res.json({status:'success', message: 'Transaction successful'});
																						}
																					});
																				}

																			});

																		}
																});

															 	}
															 });

																}


															});
														}


													});
												}
												console.log(rows);



											});


									});

							}



						}
					});
				}


				});
			}
		});	


	//Check reciever validity
	
	//Sender, reciever are both valid

	//Check for coupon validity
	

	/*Start a transaction to 
		a) Update wallet_transaction table 
		b) Update user_coupon table if c_code
		c) Update account balance of sender and reciever from amount credited and debited

	*/

	



} //IMPORTANT IF CLOSE BRACKET DONT GET CORRUPTED


else{
	res.json({status:'fail', message: 'Log in or sign up with us first!'});

}

	connection.release();
});

});

module.exports = router;