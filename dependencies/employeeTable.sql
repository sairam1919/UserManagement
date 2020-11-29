CREATE DATABASE `usermanagement` /*!40CREATE TABLE `employee` (
  `Id` bigint NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `MobileNo` varchar(50) NOT NULL,
  `IssuedBy` varchar(255) NOT NULL,
  `IssuedDateTime` varchar(50) NOT NULL,
  `Zone` varchar(50) NOT NULL,
  `Tower` varchar(255) NOT NULL,
  `InTime` varchar(50) DEFAULT NULL,
  `OutTime` varchar(50) DEFAULT NULL,
  `UserData` text NOT NULL,
  `Role` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `Current_Location` varchar(50) DEFAULT NULL,
  `UserID` varchar(50) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
