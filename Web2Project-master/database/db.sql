CREATE DATABASE IF NOT EXISTS `scrum`;
USE `scrum`;

CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `project` (
  `projectID` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(40) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`projectID`),
  KEY `FK_project_user` (`userID`),
  CONSTRAINT `FK_project_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `list` (
  `listID` int(11) NOT NULL AUTO_INCREMENT,
  `list_name` varchar(40) DEFAULT NULL,
  `projectID` int(11) DEFAULT NULL,
  PRIMARY KEY (`listID`),
  KEY `projectID` (`projectID`),
  CONSTRAINT `list_ibfk_1` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `card` (
  `cardID` int(11) NOT NULL AUTO_INCREMENT,
  `card_name` varchar(40) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `listID` int(11) DEFAULT NULL,
  PRIMARY KEY (`cardID`),
  KEY `listID` (`listID`),
  CONSTRAINT `card_ibfk_1` FOREIGN KEY (`listID`) REFERENCES `list` (`listID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `user` (`userID`, `username`, `password`) VALUES
	(1, 'admin', 'admin');

INSERT INTO `project` (`projectID`, `project_name`, `userID`) VALUES
	(1, 'test project', 1);

INSERT INTO `list` (`listID`, `list_name`, `projectID`) VALUES
	(1, 'TODO', 1);

INSERT INTO `card` (`cardID`, `card_name`, `description`, `listID`) VALUES
	(1, 'Complete web2 project', NULL, 1);