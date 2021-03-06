CREATE TABLE usermanagement.`userpassinfo` (
  `UserPass` varchar(50) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `UserImage` longtext,
  `UserIDProof` longtext,
  `UserIDProofNumber` varchar(100) DEFAULT NULL,
  `PassImage` longtext,
  `ExpairyDate` varchar(250) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `id_code` varchar(250) NOT NULL,
  `pass_status` varchar(45) NOT NULL,
  `zones` text NOT NULL,
  `Current_Location` text,
  `InTime` varchar(250) DEFAULT NULL,
  `OutTime` varchar(250) DEFAULT NULL,
  `fromTime` varchar(100) DEFAULT NULL,
  `toTime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserPass`),
  UNIQUE KEY `UserPass_UNIQUE` (`UserPass`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
