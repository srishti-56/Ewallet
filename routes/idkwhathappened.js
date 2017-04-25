router.post("/payments", function(req, res){
	//var rec_i_id;
	connection_pool.getConnection(function(err, connection) {

		console.log(req.logSesh);
		console.log(req.logSesh.name);
		console.log(req.logSesh.email);
		console.log(JSON.stringify(req.body));


	if(req.logSesh && req.logSesh.email == req.body.send_email){
		var c_amt = req.body.amt;
		connection.beginTransaction(function(err) {
			console.log("started a transfer transaction");
			if(err){ throw err; }

			//FIND SENDER'S ACCOUNT
			connection.query('SELECT u_id FROM users WHERE email=?', [req.body.send_email], function(err, rows, fields){
				if(err){
					connection.rollback(function(){
						throw err;
					});
				}

				if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
					console.log(Object.keys(rows).length);
				//CHECK IF BUSINESS IS TRYING TO TRANSFER MONEY
				connection.query('SELECT b_id FROM business WHERE email = ?', [req.body.send_email], function (err, rows, fields) {
  					if(err){
					connection.rollback(function(){
						throw err;
					});
					}
  					if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
					console.log(Object.keys(rows).length);
  					res.json({status: 'fail', message: 'User doesn\'t exist'});
  					}
  					else {
  						console.log('Business not authorized to send money, transaction cancelled. ');
						res.json({status: 'fail', message: "Busiesses do not have privileges to transfer money."});
					}
				
  				});
				}
				else{
					var sender_i_id = rows[0].u_id;
					//CHECK IF SENDER ACCOUNT IS ACTIVATED AND HAS REQ. BALANCE
					connection.query('SELECT activated, user_type, acc_no, balance FROM wallet_account where i_id=?', sender_i_id, function(err,rows, fields){
					if(err){
						connection.rollback(function(){
							throw err;
						});
					}
					if(rows[0].activated == 0){
						res.json({status:'fail', message:'Account is not valid, create a wallet account or activate your account!'})
					}
					else if(rows[0].balance <= req.body.amt){
						res.json({status:'fail', message:'Not enough money in account! Please recharge before transferring!'})
					}
					//SENDER ACCOUNT HAS BEEN VALIDATED
					else {
						console.log('Sender validated. Active and has req. amount  ' + req.body.recieve_email);
						//CHECK RECIVER'S ACCOUNT
						connection.query('SELECT u_id FROM users WHERE email=?', req.body.recieve_email, function(err, rows, fields){

						console.log('printing result reciever search here ' + rows[0]);
						if(err){
							connection.rollback(function(){
								res.json({status:'fail', message: err});
								throw err;
							});
						}

						if (err || Object.keys(rows).length == 0 ) {
							console.log('error found' + Object.keys(rows).length);
							connection.query('SELECT b_id FROM business WHERE email = ?', [req.body.rec_email], function (err, rows, fields) {
			  					if(err){
								connection.rollback(function(){
									console.log('error found');
									throw err;
								});
								}
			  					if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
								console.log('error found'+ Object.keys(rows).length);
			  					res.json({status: 'fail', message: 'User doesn\'t exist'});
			  					}
									
								else {
									//console.log('no user found ,cehcingbusiness');
									rec_i_id = rows[0].b_id;
									console.log(rec_i_id);
									if(req.body.c_code){
										connection.query('SELECT amt,b_id, coupon_id, validity from coupons where coupon_id = ?', req.body.c_code, function(err, rows, fields){
										if(err){
											connection.rollback(function(){
											throw err;
											});
										}
										if (error || Object.keys(rows).length == 0 ) {
											console.log(Object.keys(rows).length);
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


							});
							}	
						}
					});
						}

						else {
							rec_i_id = rows[0].u_id;
							console.log('User and reciever are valid' + rec_i_id);

						}
					});

						err_msg='Transaction was discarded';
						/*connection.query('SELECT u_id from users where email = ?', req.body.recieve_email, function(err, rows, fields){
							if(err){
								throw err;
							}
							if (err || Object.keys(rows).length > 1 || Object.keys(rows).length == 0 ) {
								console.log('error' + Object.keys(rows).length);



							}
							else {
								reciever_id = rows[0].u_id;
								console.log(reciever_id);
							}
						});*/
						t_inserts = {status:'processing', debited: c_amt, credited: 0, sender: sender_i_id, reciever: rec_i_id};
						connection.query('INSERT into wallet_transaction SET ?', t_inserts, function(err, rows, fields){
						if (err) { 
							throw err;
							t_inserts = {status:'discarded', debited: c_amt, credited: 0, sender: sender_i_id, reciever: rec_i_id};
			        		connection.query('INSERT into wallet_transaction SET ?', t_inserts, function(err, rows, fields) {
			        			if(err){
			        				res.json({status:'fail' , message:'Invalid information'});
			        				connection.rollback(function(){
			        					throw err;
			        				});
			        			}
			        		});
			        		console.log(err_msg);
			      		} 
			      		console.log(rows);

						connection.commit(function(err) {
						        if (err) { 
						          connection.rollback(function() {
						            throw err;
						          });
						        }
						        console.log('Transaction Complete.');
						        flag = 1;
						       // req.logSesh.name = req.body.uname;
						      	res.json({status:'success', message: 'Transaction complete!'});
						});




						});

						//RECIEVER ACCOUNT IS VALIDATED.
						//CREATE A WALLET TRANSACTION NEXT......
//						connection.query('INSERT into wallet_transaction ')*/
					}
					});
				}




			});

			

		});

	}

	else{
		res.json({status:'fail', message: 'Log in or sign up with us!'});
	}


			connection.release();

	});
});