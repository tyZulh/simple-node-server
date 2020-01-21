DROP TABLE IF EXISTS `person`;

CREATE TABLE `person` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
	`password` varchar(250) NOT NULL
);

