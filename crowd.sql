DROP DATABASE IF EXISTS crowd;
CREATE DATABASE crowd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE crowd ;

SET NAMES 'utf8';

-- INNODB locking locks only the affected row and not the whole table

-- let's create the users table

DROP TABLE IF EXISTS users; 

-- nvarchar is used for unicode support
CREATE TABLE users (

	userid int(11) NOT NULL AUTO_INCREMENT,
	mail nvarchar(320) NOT NULL UNIQUE, 	-- 320 = 64+@+255
	username nvarchar(50) NOT NULL UNIQUE,
	psswd varchar(255) NOT NULL,
	nposts int(11) NOT NULL DEFAULT '0' ,
	reputation int(11)  NOT NULL DEFAULT '0',
	admin int(11) NOT NULL DEFAULT '0', 	-- when a new user is signed there is no need for value , admin==1!
	ipath varchar(255) NOT NULL DEFAULT 'somepath',		-- path for storing profile photos

	PRIMARY KEY(userid),
	INDEX(mail),
	INDEX(username) 



) ENGINE = INNODB;	


-- input form ->
-- in order to take advantage of auto-increment we mustn't provide an input


-- let's create the shops table

DROP TABLE IF EXISTS shops;

CREATE TABLE shops (

	shopid int(11) NOT NULL AUTO_INCREMENT,
	name nvarchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	zipcode int(10) NOT NULL,
	longtitude double NOT NULL,
	latitude double NOT NULL,

	PRIMARY KEY(shopid)

) ENGINE = INNODB;


-- xreiazetai na kanoume store address se style city address number ?

-- input form ->

INSERT INTO shops 

	(name , city , address , zipcode,longtitude,latitude)

VALUES 
	('Shell','Νέο Ηράκλειο','Λεωφόρος Ηρακλείου 409','14122','38.05369','23.76812'),
	('Shell','Νέο Ηράκλειο','Λεωφόρος Ηρακλείου 442','14122','38.055173','23.769653'),
	('Shell','Μεταμόρφωση','Τατοΐου 2','14451','38.050819','23.750162'),
	('Shell','Νέα Ιωνία','Αλέκου Παναγούλη 33','14231','38.047901', '23.755439'),
	('BP','Νέο Ηράκλειο','Ιφιγενείας 50','14122','38.050059', '23.752407'),
	('Aegean','Αθήνα','Λεωφόρος Ηρακλείου 129','14232','38.031392', '23.743526'),
	('Revoil','Νέα Ιωνία','Αβέρωφ 2','14232','38.031810','23.744332'),
	('Ελιν','Νέο Ηράκλειο','Μαρίνου Αντύπα 31','14121','38.042762','23.773425'),
	('BP','Νέο Ηράκλειο','Μαρίνου Αντύπα 55','14121','38.041381','23.775852'),
	('EKO','Νέο Ηράκλειο','Λεωφόρος Ηρακλείου 463','14122','38.059341','23.772352'),
	('EKO','Νέο Ηράκλειο','Λεωφόρος Ηρακλείου 335','14122','38.049115','23.762283'),
	('EKO','Νέο Ηράκλειο','Κασταμονής 47','14121','38.039312','23.768819'),
	('EKO','Νέα Ιωνία','Αναγεννήσεως 1','14133','38.031303','23.761500'),
	('EKO','Νέα Φιλαδέλφεια','Πατριάρχου Κωνσταντίνου 12','14342','38.038721', '23.744967'),
	('EKO','Άγιοι Ανάργυροι','Λεωφόρος Δημοκρατείας 240','13562','38.041230','23.726364'),
	('Shell','Άγιοι Ανάργυροι','Αγίων Αναργύρων 40','13561','38.027650','23.723374'),
	('Shell','Περιστέρι','Λεωφόρος Κωνσταντινουπόλεως 14','12133','38.010273','23.712587'),
	('Shell','Αθήνα','Αχαρνών 397','11143','38.020956','23.729316'),
	('Shell','Γαλάτσι','Πρωτοπαπαδάκη 1','11147','38.012173','23.755334'),
	('BP','Αθήνα','Λεωφόρος Γαλατσίου 98','11146',38.013958, 23.749294);



-- let's create the fuels table

DROP TABLE IF EXISTS fuel;

CREATE TABLE fuel (

	fuelid int(11) NOT NULL AUTO_INCREMENT,
	type varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	imgpath varchar(255) NOT NULL,
	category varchar(255) NOT NULL,
	withdrawn tinyint(1) NOT NULL,
	tags varchar(255),
	
	PRIMARY KEY(fuelid)

) ENGINE = INNODB;

-- now let's populate our fuel's table
-- we have three types of fuels Βενζίνη,Πετρέλαιο και Αέριο

INSERT INTO fuel 

	(type , description , imgpath , category , withdrawn , tags)
VALUES 
	('Βενζίνη','95 οκτανίων','/home/fnp','Καύσιμο κίνησης',0,'απλή αμόλυβδη,απλή,fuelsave'),
	('Βενζίνη','97 οκτανίων','/home/fnp','Καύσιμο κίνησης',0,'Vpower'),
	('Βενζίνη','100 οκτανίων','/home/fnp','Καύσιμο κίνησης',0,'Racing,Κατοστάρα'),
	('Πετρέλαιο','95 οκτανίων','/home/fnp','Καύσιμο κίνησης',0,'απλό,fuelsave'),
	('Πετρέλαιο','100 οκτανίων','/home/fnp','Καύσιμο κίνησης',0,'Vpower'),
	('Αέριο','LPG','/home/fnp','Καύσιμο κίνησης',0,'απλό'),
	('Αέριο','CNG','/home/fnp','Καύσιμο κίνησης',0,'απλό');

-- let's create table post

DROP TABLE IF EXISTS post;

CREATE TABLE post (

	postid int(11) NOT NULL AUTO_INCREMENT,
	shopid int(11) NOT NULL ,
	userid int(11) NOT NULL ,
	fuelid int(11) NOT NULL,
	price float NOT NULL,
	datetimestamp datetime NOT NULL,
	
	PRIMARY KEY(postid , shopid , userid , fuelid ),

	FOREIGN KEY (shopid) REFERENCES shops(shopid)
		ON DELETE CASCADE ON UPDATE RESTRICT,  -- restrict won't accept any changes on shopid or userid
	FOREIGN KEY (userid) REFERENCES users(userid)
		ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (fuelid) REFERENCES fuel(fuelid)
		ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE = INNODB ;


-- input form ->



-- we should use locking when a user adds a new shop and when an admin updates or adds or deletes a fuel
-- usage :
-- LOCK TABLES tablename WRITE;
-- # Do other queries here
-- UNLOCK TABLES;
-- for fast searching we should use indexes ;)

DELIMITER $$
CREATE TRIGGER after_newpost
AFTER INSERT ON post
FOR EACH ROW
BEGIN
	UPDATE users
	SET nposts = nposts+1
	WHERE userid=NEW.userid;

END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER after_oldpost
AFTER DELETE ON post
FOR EACH ROW
BEGIN
	UPDATE users
	SET nposts = nposts-1
	WHERE userid=OLD.userid;

END$$
DELIMITER ;






	
	
	
