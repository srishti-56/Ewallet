-- CREATE DATABASE ewallet;

\c ewallet

CREATE TABLE IF NOT EXISTS users (
	u_id varchar(10) NOT NULL,
	fullname varchar(100) NOT NULL,
	dob Date,
	phno varchar(12) NOT NULL,
	email varchar(50) NOT NULL,
	address varchar(100),
	password varchar(25) NOT NULL,
	joined Date,
	PRIMARY KEY(u_id)
);

CREATE TABLE IF NOT EXISTS business (
	b_id varchar(10) NOT NULL,
	fullname varchar(100) NOT NULL,
	email varchar(50) NOT NULL,
	phno varchar(12) NOT NULL,
	address varchar(100) NOT NULL,
	password varchar(25) NOT NULL,
	joined DATE NOT NULL,
	PRIMARY KEY(b_id)
);