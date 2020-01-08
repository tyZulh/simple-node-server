DROP TABLE IF EXISTS `person`;
DROP TABLE IF EXISTS `speciality`;

CREATE TABLE `speciality` (
	`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` varchar(45) NOT NULL
);

CREATE TABLE `person` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `prefix` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `speciality_id` int(11),
	`password` varchar(250) NOT NULL,
  FOREIGN KEY (`speciality_id`) REFERENCES `speciality`(`id`)
);

INSERT INTO `speciality` VALUES 
	(1, 'Right'),
	(2, 'Economy'),
	(3, 'Social'),
	(4, 'Numeric'),
	(5, 'Health');
