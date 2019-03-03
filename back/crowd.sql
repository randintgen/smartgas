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


-- input form ->

INSERT INTO shops

    (name,address,lat,lng,withdrawn,tags,imgpath)

VALUES
    ('Shell','Νέο Ηράκλειο,Λεωφόρος Ηρακλείου 409,14122','38.05369','23.76812',0,'Shell','/home/fnp'),
    ('Shell','Νέο Ηράκλειο, Λεωφόρος Ηρακλείου 442,14122','38.055173','23.769653',0,'Shell','/home/fnp'),
    ('Shell','Μεταμόρφωση, Τατοΐου 2 ,14451','38.050819','23.750162',0,'Shell','/home/fnp'),
    ('Shell','Νέα Ιωνία, Αλέκου Παναγούλη 33,14231','38.047901','23.755439',0,'Shell','/home/fnp'),
    ('BP','Νέο Ηράκλειο, Ιφιγενείας 50,14122','38.050059', '23.752407',0,'BP','/home/fnp'),
    ('Aegean','Αθήνα,Λεωφόρος Ηρακλείου 129,14232','38.031392','23.743526',0,'Aegean','/home/fnp'),
    ('Revoil','Νέα Ιωνία,Αβέρωφ 2,14232','38.031810','23.744332',0,'Revoil','/home/fnp'),
    ('Ελιν','Νέο Ηράκλειο,Μαρίνου Αντύπα 31,14121','38.042762','23.773425',0,'Ελιν','/home/fnp'),
    ('BP','Νέο Ηράκλειο,Μαρίνου Αντύπα 55,14121','38.041381','23.775852',0,'BP','/home/fnp'),
    ('EKO','Νέο Ηράκλειο,Λεωφόρος Ηρακλείου 463,14122','38.059341','23.772352',0,'EKO','/home/fnp'),
    ('EKO','Νέο Ηράκλειο,Λεωφόρος Ηρακλείου 335,14122','38.049115','23.762283',0,'EKO','/home/fnp'),
    ('EKO','Νέο Ηράκλειο,Κασταμονής 47,14121','38.039312','23.768819',0,'EKO','/home/fnp'),
    ('EKO','Νέα Ιωνία,Αναγεννήσεως 1,14133','38.031303','23.761500',0,'EKO','/home/fnp'),
    ('EKO','Νέα Φιλαδέλφεια,Πατριάρχου Κωνσταντίνου 12,14342','38.038721', '23.744967',0,'EKO','/home/fnp'),
    ('EKO','Άγιοι Ανάργυροι,Λεωφόρος Δημοκρατείας 240,13562','38.041230','23.726364',0,'EKO','/home/fnp'),
    ('Shell','Άγιοι Ανάργυροι,Αγίων Αναργύρων 40,13561','38.027650','23.723374',0,'Shell','/home/fnp'),
    ('Shell','Περιστέρι,Λεωφόρος Κωνσταντινουπόλεως 14,12133','38.010273','23.712587',0,'Shell','/home/fnp'),
    ('Shell','Αθήνα,Αχαρνών 397,11143','38.020956','23.729316',0,'Shell','/home/fnp'),
    ('Shell','Γαλάτσι,Πρωτοπαπαδάκη 1,11147','38.012173','23.755334',0,'Shell','/home/fnp'),
    ('BP','Αθήνα,Λεωφόρος Γαλατσίου 98,11146','38.013958', '23.749294',0,'BP','/home/fnp'),
    ('Aegean','Καλλιθέα,Δημοσθένους 272,17674','37.945657', '23.695136',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('Aegean','Καλλιθέα,Δοϊράνης 205,17674','37.944262', '23.698731',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('BP','Παλαιό Φάληρο,Λεωφόρος Αμφιθέας 32,17564','37.938101', '23.700678',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('Aegean','Καλλιθέα,Ταγματάρχου Πλέσσα 38-46,17574','37.945680', '23.695167',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('BP','Καλλιθέα,Θησέως 274-278,17675','37.948749','23.689659',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('EKO','Αγιος Δημήτριος ,ΑΓ. ΔΗΜΗΤΡΙΟΥ 243,17342','37.928687', '23.726457',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('BP','Παλαιό Φάληρο,Λεωφόρος Αμφιθέας 32,17564','37.938101', '23.700678',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('Shell','Παλαιό Φάληρο,Λεωφόρος Αμφιθέας 43,17564','37.938699', '23.701066',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('BP','Παλαιό Φάληρο,Συνταγματάρχου Ζησιμόπουλου 104-108,17561','37.932622', '23.697844',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('ΕΤΕΚΑ','Παλαιό Φάληρο,Λεωφόρος Αμφιθέας 134,17562','37.927051', '23.703792',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('Shell','Βύρωνας,Χειμάρας 61,16232','37.956093', '23.751223',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('Revoil','Βύρωνας,Λεωφόρος Χρυσοστόμου Σμύρνης,16232','37.957218', '23.756769',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('BP','Ζωγράφου,Γρ. Κουσίδη 45, 15772','37.974647', '23.777901',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp'),
    ('EKO','Αθήνα,Μιχαλακοπούλου 162,11527','37.983645', '23.763317',0,'απλή αμόλυβδη,απλή,fuelsave','/home/fnp');



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
