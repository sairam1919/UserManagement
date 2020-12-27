CREATE TABLE usermanagement.`employee` (
  `UserName` varchar(255) NOT NULL,
  `MobileNo` varchar(50) NOT NULL,
  `IssuedBy` varchar(255) NOT NULL,
  `IssuedDateTime` varchar(250) NOT NULL,
  `access_locations` text NOT NULL,
  `UserData` text NOT NULL,
  `Role` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  PRIMARY KEY (`UserName`),
  UNIQUE KEY `UserName_UNIQUE` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;