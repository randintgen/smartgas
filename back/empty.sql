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
    mail nvarchar(320) NOT NULL UNIQUE,     -- 320 = 64+@+255
    username nvarchar(50) NOT NULL UNIQUE,
    psswd varchar(255) NOT NULL,
    nposts int(11) NOT NULL DEFAULT '0' ,
    reputation int(11)  NOT NULL DEFAULT '0',
    admin int(11) NOT NULL DEFAULT '0',     -- when a new user is signed there is no need for value , admin==1!
    ipath varchar(255) NOT NULL DEFAULT 'somepath',     -- path for storing profile photos
    flag int(11) NOT NULL DEFAULT '0',
    hashid int(11) NOT NULL,

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
    imgpath varchar(255) NOT NULL,
    withdrawn tinyint(1) NOT NULL,
    tags varchar(5000),
    lng double NOT NULL,
    lat double NOT NULL,
    address varchar(255) NOT NULL,
    PRIMARY KEY(shopid)

) ENGINE = INNODB;


-- let's create the fuels table

DROP TABLE IF EXISTS fuel;

CREATE TABLE fuel (

    fuelid int(11) NOT NULL AUTO_INCREMENT,
    type varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    imgpath varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    withdrawn tinyint(1) NOT NULL,
    tags varchar(5000),

    PRIMARY KEY(fuelid)

) ENGINE = INNODB;

-- let's create table post

DROP TABLE IF EXISTS post;

CREATE TABLE post (

    postid int(11) NOT NULL AUTO_INCREMENT,
    shopid int(11) NOT NULL ,
    userid int(11) NOT NULL ,
    fuelid int(11) NOT NULL,
    price float NOT NULL,
    my_date date NOT NULL,

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
