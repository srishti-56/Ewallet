-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 17, 2017 at 08:43 PM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ewallet2`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE IF NOT EXISTS `bank` (
  `bank_id` int(11) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`bank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`bank_id`, `bank_name`) VALUES
(1000, 'ICICI Bank'),
(1001, 'IDFC bank'),
(1002, 'Catholic Syrian Bank'),
(1003, 'City Union Bank'),
(1004, 'Dhanlaxmi Bank'),
(1005, 'DCB Bank'),
(1006, 'Yes Bank'),
(1007, 'Federal Bank'),
(1008, 'HDFC Bank'),
(1009, 'Tamilnad Mercantile Bank Limited'),
(1010, 'Karnataka Bank'),
(1011, 'IndusInd Bank'),
(1012, 'Jammu and Kashmir Bank'),
(1013, 'Karur Vysya Bank'),
(1014, 'Kotak Mahindra'),
(1015, 'Lakshmi Vilas Bank'),
(1016, 'Nainital Bank'),
(1017, 'RBL Bank'),
(1018, 'South Indian Bank'),
(1019, 'Axis Bank');

-- --------------------------------------------------------

--
-- Table structure for table `bank_transaction`
--

CREATE TABLE IF NOT EXISTS `bank_transaction` (
  `b_trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_acc_no` varchar(25) NOT NULL,
  `amt` decimal(15,2) NOT NULL,
  `trans_type` varchar(25) DEFAULT NULL,
  `bank_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`b_trans_id`),
  KEY `bank_id` (`bank_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3021 ;

--
-- Dumping data for table `bank_transaction`
--

INSERT INTO `bank_transaction` (`b_trans_id`, `b_acc_no`, `amt`, `trans_type`, `bank_id`, `u_id`) VALUES
(3001, 'AB101E#', 45.00, 'deposited', 1011, 3),
(3002, 'AB102E#', 67.00, 'deposited', 1019, 5),
(3003, 'AB103E#', 3.00, 'deposited', 1000, 11),
(3004, 'AB104E#', 27.00, 'recharged', 1008, 5),
(3005, 'AB105E#', 79.00, 'deposited', 1002, 12),
(3006, 'AB106E#', 30.00, 'recharged', 1003, 8),
(3007, 'AB107E#', 23.00, 'recharged', 1000, 17),
(3008, 'AB108E#', 45.00, 'deposited', 1001, 3),
(3009, 'AB109E#', 34.00, 'rechagred', 1017, 17),
(3010, 'AB100E#', 45.00, 'recharged', 1013, 4),
(3011, 'AB101F#', 34.00, 'deposited', 1015, 5),
(3012, 'AB102F#', 57.00, 'deposited', 1007, 3),
(3013, 'AB103F#', 32.00, 'deposited', 1012, 11),
(3014, 'AB104F#', 69.00, 'deposited', 1010, 12),
(3015, 'AB105F#', 0.00, 'recharged', 1000, 9),
(3016, 'AB106F#', 56.00, 'deposited', 1001, 13),
(3017, 'AB107F#', 33.00, 'deposited', 1005, 4),
(3018, 'AB108F#', 1.00, 'deposited', 1004, 5),
(3019, 'AB109F#', 2300.00, 'deposited', 1019, 6),
(3020, 'AB100F#', 0.00, 'recharged', 1002, 3);

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE IF NOT EXISTS `business` (
  `b_id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phno` varchar(12) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `joined` date DEFAULT NULL,
  PRIMARY KEY (`b_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`b_id`, `fullname`, `email`, `phno`, `address`, `password`, `joined`) VALUES
(100, 'Satnam-It Solution', 'satnamofficial@gmail.com', '11-45672323', '711-2880 Nulla St.,Mankato Mississippi 96522', 'abc123', '2016-12-07'),
(101, 'Netability', 'net@gmail.com', '222-23456789', 'P.O. Box 283 8562 Fusce Rd.,Frederick Nebraska ', 'abc124', '2016-11-08'),
(102, 'Information + Innovation Policy Research Center', 'iipc@gmail.com', '080-20089789', '606-3727 Ullamcorper. Street,Roseville NH 11523', 'abc125', '2016-10-09'),
(103, 'Advanced Technology Enterprise', 'techenterprise@gmail.com', '080-20089788', 'Ap #867-859 Sit Rd.,Azusa New York 39531', 'abc126', '2012-06-06'),
(104, 'Heidelberg Asia Pte Ltd', 'heidelberg@yahoo.com', '361-40092319', '7788 Dictum Av.,San Antonio MI 47096', 'abc127', '2012-07-07'),
(105, 'Arcomet Asia Pte Ltd', 'acromet@yahoo.com', '361-40092318', 'Ap #651-8679 Sodales Av.,Tamuning PA 10855', 'abc128', '2012-08-08'),
(106, 'VeriSign', 'tsmith@gmail.com', '361-42322317', '191-103 Integer Rd.,Corona New Mexico 08219', 'abc129', '2012-10-09'),
(107, 'BE International', 'beint@gmail.com', '364-25672316', 'P.O. Box 887 2508 Dolor. Av.,Muskegon KY 12482', 'abc130', '2013-07-01'),
(108, 'Parkway Novena Hospital (PNH)', 'parkway@hotmail.com', '364-25672315', '511-5762 At Rd.,Chelsea MI 67708', 'abc131', '2013-04-02'),
(109, 'TCI Global  Pte Ltd', 'tciglobal@gmail.com', '427-20672314', '935-9940 Tortor. Street,Santa Rosa MN 98804', 'abc132', '2013-01-03'),
(110, 'Jafra Cosmetics', 'jafracosmetics@gmail.com', '427-20672313', 'P.O. Box 929 4189 Nunc Road,Lebanon KY 69409', 'abc133', '2013-02-04'),
(111, 'Connor Manufacturing Services', 'coonor@gmail.com', '33-25672300', '5587 Nunc. Avenue,Erie Rhode Island 24975', 'abc134', '2011-01-04'),
(112, 'Dover Park Hospice', 'doverpark@gmail.com', '33-25672299', 'Ap #696-3279 Viverra. Avenue,Latrobe DE 38100', 'abc135', '2011-02-05'),
(113, 'Philips Dynalite', 'philips@gmail.com', '33-33672310', 'P.O. Box 132 1599 Curabitur Rd.,Bandera South Dakota 45149', 'abc136', '2011-03-06'),
(114, 'Corning  Systems', 'corning@gmail.com', '33-33672309', '347-7666 Iaculis St.,Woodruff SC 49854', 'abc137', '2015-07-09'),
(115, 'GoldenSource', 'goldensource@gmail.com', '44-45872300', '666-4366 Lacinia Avenue,Idaho Falls Ohio 19253', 'abc138', '2015-01-10'),
(116, 'BSI S.A.', 'bsi@gmail.com', '44-45672307', 'P.O. Box 147 2546 Sociosqu Rd.,Bethlehem Utah 02913', 'abc139', '2015-05-11'),
(117, 'Experimental Therapeutics', 'hpaulas@gmail.com', '44-45972309', 'P.O. Box 597 4156 Tincidunt Ave,Green Bay Indiana 19759', 'abc140', '2015-08-12'),
(118, 'Narada Pacific Pte Ltd', 'narada@gmail', '44-22672305', 'P.O. Box 508 3919 Gravida St.,Tamuning Washington 55797', 'abc141', '2014-12-09'),
(119, 'ImaginAsia Pte Ltd', 'thurman.manno@yahoo.com', '20-20072304', '928-3313 Vel Av.,Idaho Falls Rhode Island 37232', 'abc142', '2014-10-10'),
(120, 'HPL Hotel & Resorts', 'hplhotels@yahoo.com', '20-20172303', 'P.O. Box 262 4978 Sit St.,Yigo Massachusetts 50654', 'abc143', '2014-08-11'),
(135, 'Redist pvt ltd', 'redist@ltd.com', '90032348442', 'mysore road, bangalore- 560078', 'qwertyqwerty', '0000-00-00'),
(136, 'xenon pvt', 'xenon@hi.com', '90384903284', 'noida', 'tyyt', '0000-00-00'),
(141, 'Hotstar', 'hotstar@movies.com', '987742523', 'Cochin, Kerala, India', 'hotstar', '2017-04-13'),
(143, 'Sristi', 'srishti@gmail.com', '987742523', 'Cochin, Kerala, India', '4321', '2017-04-13');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE IF NOT EXISTS `coupons` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `validity` date DEFAULT NULL,
  `amt` decimal(15,2) DEFAULT NULL,
  `b_id` int(10) NOT NULL,
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10020 ;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `validity`, `amt`, `b_id`) VALUES
(10000, '2017-01-01', 500.50, 102),
(10001, '2017-02-02', 200.00, 103),
(10002, '2017-03-03', 250.00, 106),
(10003, '2017-04-04', 650.00, 105),
(10004, '2017-05-05', 300.60, 106),
(10005, '2017-06-06', 250.00, 0),
(10006, '2017-07-07', 451.00, 0),
(10007, '2017-08-08', 400.00, 0),
(10008, '2017-09-09', 600.00, 0),
(10009, '2017-10-10', 601.00, 0),
(10010, '2017-11-11', 602.00, 0),
(10011, '2017-12-12', 540.00, 106),
(10012, '2017-01-13', 557.50, 106),
(10013, '2017-02-14', 258.00, 0),
(10014, '2017-03-15', 100.00, 0),
(10015, '2017-04-16', 160.00, 0),
(10016, '2017-05-17', 170.00, 0),
(10017, '2017-06-18', 260.00, 0),
(10018, '2017-07-19', 240.00, 0),
(10019, '2017-08-20', 500.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `phno` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `joined` date DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `fullname`, `dob`, `phno`, `email`, `address`, `password`, `joined`) VALUES
(2, 'Josephine Darakjy', '0000-00-00', '919698144888', 'josephine_darakjy@darakjy.org', '4 B Blue Ridge Blvd, Brighton, Livingston, MI, 48116', 'testest', '0000-00-00'),
(3, 'Art Venere', '1947-04-04', '918826672401', 'art@venere.org', '8 W Cerritos Ave #54, Bridgeport, Gloucester, NJ, 8014', 'hello', '0000-00-00'),
(4, 'Lenna Paprocki', '1939-05-01', '918871381965', 'lpaprocki@hotmail.com', '639 Main St, Anchorage, Anchorage, AK, 99501', '1234', '0000-00-00'),
(5, 'Donette Foller', '1939-09-02', '919869260532', 'donette.foller@cox.net', '34 Center St, Hamilton, Butler, OH, 45011', '4321', '0000-00-00'),
(6, 'Simona Morasca', '0000-00-00', '919133044374', 'simona@morasca.com', '3 Mcauley Dr, Ashland, Ashland, OH, 44805', 'okayokay', '0000-00-00'),
(7, 'Mitsue Tollner', '0000-00-00', '917799333231', 'mitsue_tollner@yahoo.com', '7 Eads St, Chicago, Cook, IL, 60632', 'yes', '0000-00-00'),
(8, 'Leota Dilliard', '0000-00-00', '919810749786', 'leota@hotmail.com', '7 W Jackson Blvd, San Jose, Santa Clara, CA, 95111', 'yuyuyu', '0000-00-00'),
(9, 'Sage Wieser', '0000-00-00', '919443077948', 'sage_wieser@cox.net', '5 Boston Ave #88, Sioux Falls, Minnehaha, SD, 57105', 'popopo', '0000-00-00'),
(10, 'Kris Marrier', '0000-00-00', '918056811118', 'kris@gmail.com', '228 Runamuck Pl #2808, Baltimore, Baltimore City, MD, 21224', 'testest', '0000-00-00'),
(11, 'Minna Amigon', '0000-00-00', '918080560100', 'minna_amigon@yahoo.com', '2371 Jerrold Ave, Kulpsville, Montgomery, PA, 19443', 'ggg', '0000-00-00'),
(12, 'Abel Maclead', '0000-00-00', '918447215404', 'amaclead@gmail.com', '37275 St  Rt 17m M, Middle Island, Suffolk, NY, 11953', 'jjjj', '0000-00-00'),
(13, 'Kiley Caldarera', '0000-00-00', '918446408777', 'kiley.caldarera@aol.com', '25 E 75th St #69, Los Angeles, Los Angeles, CA, 90034', 'oooo', '0000-00-00'),
(14, 'Graciela Ruta', '0000-00-00', '919322244265', 'gruta@cox.net', '98 Connecticut Ave Nw, Chagrin Falls, Geauga, OH, 44023', 'abcdefghi', '0000-00-00'),
(15, 'Cammy Albares', '0000-00-00', '919741496273', 'calbares@gmail.com', '56 E Morehead St, Laredo, Webb, TX, 78045', 'testest', '0000-00-00'),
(16, 'Mattie Poquette', '0000-00-00', '919898119178', 'mattie@aol.com', '73 State Road 434 E, Phoenix, Maricopa, AZ, 85013', 'hello', '0000-00-00'),
(17, 'Meaghan Garufi', '1941-09-17', '919200020777', 'meaghan@hotmail.com', '69734 E Carrillo St, Mc Minnville, Warren, TN, 37110', '1234', '0000-00-00'),
(18, 'Gladys Rim', '0000-00-00', '917731834304', 'gladys.rim@rim.org', '322 New Horizon Blvd, Milwaukee, Milwaukee, WI, 53207', '4321', '0000-00-00'),
(19, 'Yuki Whobrey', '0000-00-00', '919911602258', 'yuki_whobrey@aol.com', '1 State Route 27, Taylor, Wayne, MI, 48180', 'okayokay', '0000-00-00'),
(128, 'Roke', '1996-05-31', '42536737', 'anotherone@testing.com', ' Whitefield', 'rt', '0000-00-00'),
(139, 'Varu', '2018-02-02', '21376182370', 'var@gmail.com', 'S', 'varu', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `user_coupons`
--

CREATE TABLE IF NOT EXISTS `user_coupons` (
  `trans_id` int(11) NOT NULL,
  `b_id` int(11) NOT NULL,
  `reciever` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `coupon_code` int(11) NOT NULL,
  PRIMARY KEY (`trans_id`,`coupon_code`),
  KEY `b_id` (`b_id`),
  KEY `reciever` (`reciever`),
  KEY `sender` (`sender`),
  KEY `coupon_code` (`coupon_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_coupons`
--

INSERT INTO `user_coupons` (`trans_id`, `b_id`, `reciever`, `sender`, `coupon_code`) VALUES
(206, 118, 13, 118, 10006),
(220, 112, 12, 112, 10004),
(223, 106, 2, 106, 10004);

-- --------------------------------------------------------

--
-- Table structure for table `wallet_account`
--

CREATE TABLE IF NOT EXISTS `wallet_account` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(5) NOT NULL,
  `acc_no` varchar(10) DEFAULT NULL,
  `activated` int(1) NOT NULL,
  `balance` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`i_id`),
  UNIQUE KEY `acc_no` (`acc_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=144 ;

--
-- Dumping data for table `wallet_account`
--

INSERT INTO `wallet_account` (`i_id`, `user_type`, `acc_no`, `activated`, `balance`) VALUES
(2, 'U', 'UX01', 1, 10000.00),
(3, 'U', 'UX02', 1, 10050.00),
(4, 'U', 'UX03', 1, 10050.00),
(5, 'U', 'UX04', 1, 10050.00),
(6, 'U', 'UX05', 1, 10000.00),
(7, 'U', 'UX06', 1, 50000.00),
(8, 'U', 'UX07', 1, 60000.00),
(9, 'U', 'UX08', 1, 70000.00),
(10, 'U', 'UX09', 1, 190000.00),
(11, 'U', 'UX10', 1, 5000.00),
(12, 'U', 'UX11', 1, 10000.00),
(13, 'U', 'UX12', 1, 10000.00),
(14, 'U', 'UX13', 1, 10000.00),
(15, 'U', 'UX14', 1, 10000.00),
(16, 'U', 'UX15', 1, 10000.00),
(17, 'U', 'UX16', 1, 10050.00),
(18, 'U', 'UX17', 1, 10000.00),
(19, 'U', 'UX18', 1, 10000.00),
(100, 'B', 'BX19', 1, 10000.00),
(101, 'B', 'BX20', 1, 10000.00),
(102, 'B', 'BX21', 1, 10000.00),
(103, 'B', 'BX22', 1, 810000.00),
(104, 'B', 'BX23', 1, 10000.00),
(105, 'B', 'BX24', 1, 190000.00),
(106, 'B', 'BX25', 1, 210000.00),
(107, 'B', 'BX26', 1, 410000.00),
(108, 'B', 'BX27', 1, 10000.00),
(109, 'B', 'BX28', 1, 10000.00),
(110, 'B', 'BX29', 1, 10000.00),
(111, 'B', 'BX30', 1, 10000.00),
(112, 'B', 'BX31', 1, 10000.00),
(113, 'B', 'BX32', 1, 10000.00),
(114, 'B', 'BX33', 1, 10000.00),
(115, 'B', 'BX34', 1, 10000.00),
(116, 'B', 'BX35', 1, 10000.00),
(117, 'B', 'BX36', 1, 10000.00),
(118, 'B', 'BX37', 1, 10000.00),
(119, 'B', 'BX38', 1, 10000.00),
(120, 'B', 'BX39', 1, 10000.00),
(128, 'U', NULL, 0, NULL),
(134, 'U', NULL, 0, NULL),
(135, 'B', NULL, 0, NULL),
(136, 'B', NULL, 0, NULL),
(137, 'B', NULL, 0, NULL),
(138, 'B', NULL, 0, NULL),
(139, 'U', NULL, 0, NULL),
(141, 'B', NULL, 0, NULL),
(143, 'B', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transaction`
--

CREATE TABLE IF NOT EXISTS `wallet_transaction` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `trans_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(25) NOT NULL,
  `debited` decimal(15,2) NOT NULL,
  `credited` decimal(15,2) NOT NULL,
  `sender` int(11) NOT NULL,
  `reciever` int(11) NOT NULL,
  PRIMARY KEY (`trans_id`),
  KEY `sender` (`sender`),
  KEY `reciever` (`reciever`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=230 ;

--
-- Dumping data for table `wallet_transaction`
--

INSERT INTO `wallet_transaction` (`trans_id`, `trans_time`, `status`, `debited`, `credited`, `sender`, `reciever`) VALUES
(201, '2017-04-11 23:47:21', 'completed', 30.00, 115.00, 2, 12),
(202, '2017-04-13 08:54:28', 'completed', 10.00, 0.00, 18, 103),
(203, '2017-04-13 08:54:28', 'completed', 0.00, 0.00, 2, 7),
(204, '2017-04-13 08:54:28', 'completed', 0.00, 0.00, 3, 2),
(205, '2010-10-09 22:00:00', 'completed', 0.00, 1.00, 17, 110),
(206, '2001-01-09 14:38:00', 'completed', 10.00, 200.00, 13, 118),
(207, '2017-04-11 23:48:06', 'completed', 70.00, 80.00, 6, 14),
(208, '2017-04-13 08:54:28', 'completed', 12.00, 0.00, 13, 18),
(209, '2017-04-13 08:54:28', 'completed', 84.00, 84.00, 16, 111),
(210, '2017-04-13 08:54:28', 'completed', 33.00, 0.00, 9, 114),
(211, '2017-04-11 23:48:26', 'completed', 67.00, 67.00, 4, 5),
(212, '2017-04-13 08:54:28', 'completed', 0.00, 0.00, 15, 107),
(213, '2017-04-13 08:54:28', 'completed', 56.00, 0.00, 14, 11),
(214, '2023-08-14 03:15:00', 'completed', 20.00, 100.00, 19, 104),
(215, '2017-04-11 23:48:40', 'completed', 40.00, 100.00, 2, 3),
(216, '2017-04-13 08:54:28', 'completed', 0.00, 0.00, 3, 102),
(217, '2002-02-11 16:52:00', 'completed', 22.00, 600.00, 7, 11),
(218, '2017-04-11 23:48:54', 'completed', 56.00, 56.00, 18, 8),
(219, '2009-09-03 03:39:00', 'completed', 0.00, 34.00, 9, 10),
(220, '2017-04-13 08:54:28', 'completed', 20.00, 0.00, 12, 112),
(222, '2017-04-13 08:54:28', 'completed', 300.00, 0.00, 5, 3),
(223, '2017-04-13 07:07:59', 'completed', 300.00, 900.00, 2, 106),
(228, '2017-04-13 08:54:28', 'completed', 200.00, 200.00, 5, 3),
(229, '2017-04-13 09:17:24', 'completed', 300.00, 300.00, 5, 3);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank_transaction`
--
ALTER TABLE `bank_transaction`
  ADD CONSTRAINT `bank_transaction_ibfk_1` FOREIGN KEY (`bank_id`) REFERENCES `bank` (`bank_id`);

--
-- Constraints for table `business`
--
ALTER TABLE `business`
  ADD CONSTRAINT `business_ibfk_1` FOREIGN KEY (`b_id`) REFERENCES `wallet_account` (`i_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `wallet_account` (`i_id`);

--
-- Constraints for table `user_coupons`
--
ALTER TABLE `user_coupons`
  ADD CONSTRAINT `user_coupons_ibfk_1` FOREIGN KEY (`trans_id`) REFERENCES `wallet_transaction` (`trans_id`),
  ADD CONSTRAINT `user_coupons_ibfk_2` FOREIGN KEY (`b_id`) REFERENCES `business` (`b_id`),
  ADD CONSTRAINT `user_coupons_ibfk_3` FOREIGN KEY (`reciever`) REFERENCES `users` (`u_id`),
  ADD CONSTRAINT `user_coupons_ibfk_4` FOREIGN KEY (`sender`) REFERENCES `business` (`b_id`),
  ADD CONSTRAINT `user_coupons_ibfk_5` FOREIGN KEY (`coupon_code`) REFERENCES `coupons` (`coupon_id`);

--
-- Constraints for table `wallet_transaction`
--
ALTER TABLE `wallet_transaction`
  ADD CONSTRAINT `wallet_transaction_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`u_id`),
  ADD CONSTRAINT `wallet_transaction_ibfk_2` FOREIGN KEY (`reciever`) REFERENCES `wallet_account` (`i_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
