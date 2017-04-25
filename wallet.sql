-- CREATE DATABASE ewallet;

\c ewallet

CREATE TABLE IF NOT EXISTS users (
	u_id int NOT NULL AUTO_INCREMENT,
	fullname varchar(100) NOT NULL,
	dob Date,
	phno varchar(12) NOT NULL,
	email varchar(50) NOT NULL,
	address varchar(100),
	password varchar(150) NOT NULL,
	joined Date,
	PRIMARY KEY(u_id)
);

CREATE TABLE IF NOT EXISTS business (
	b_id int NOT NULL AUTO_INCREMENT,
	fullname varchar(100) NOT NULL,
	email varchar(50) NOT NULL,
	phno varchar(12) NOT NULL,
	address varchar(100),
	password varchar(150) NOT NULL,
	joined DATE ,
	PRIMARY KEY(b_id)
);

CREATE TABLE IF NOT EXISTS wallet_transaction (
	trans_id int NOT NULL AUTO_INCREMENT,
	trans_time timestamp NOT NULL,
	status varchar(25) NOT NULL,
	debited numeric(15,2) NOT NULL,
	credited numeric(15,2) NOT NULL,
	sender int NOT NULL,
	reciever int NOT NULL,
	foreign key (sender) references users(u_id),
	foreign key (reciever) references users(u_id),
	foreign key (reciever) references business(b_id),
	PRIMARY KEY(trans_id)
);

CREATE TABLE IF NOT EXISTS bank (
	bank_id int not null,
	bank_name varchar(100),
	PRIMARY KEY (bank_id)
);

CREATE TABLE IF NOT EXISTS bank_transaction (
 	b_trans_id int  not null AUTO_INCREMENT,
 	b_acc_no varchar(25) not null,
 	amt numeric (15,2) not null,
 	card varchar(25),
 	trans_type varchar(25),
 	bank_id int not null,
 	foreign key(bank_id) references bank(bank_id),
 	PRIMARY key (b_trans_id)
 	);

CREATE TABLE IF NOT EXISTS coupons(
	coupon_id int NOT NULL AUTO_INCREMENT,
	validity DATE,
	amt numeric(15,2),
	PRIMARY KEY(coupon_id)
);

CREATE TABLE IF NOT EXISTS user_coupons (
	trans_id int NOT NULL,
	b_id int NOT NULL,
	reciever int NOT NULL,
	sender int NOT NULL,
	coupon_code int NOT NULL,
	foreign key(trans_id) references wallet_transaction(trans_id),
	foreign key(b_id) references business(b_id),
	foreign key(reciever) references users(u_id),
	foreign key(sender) references business(b_id),
	foreign key(coupon_code) references coupons(coupon_id),
	PRIMARY KEY(trans_id, coupon_code)
);

