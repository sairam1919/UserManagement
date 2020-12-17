CREATE TABLE usermanagement.`userpassinfo` (
  `UserPass` varchar(50) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `UserImage` text,
  `UserIDProof` text,
  `UserIDProofNumber` varchar(100) DEFAULT NULL,
  `PassImage` text,
  `ExpairyDate` varchar(250) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `id_code` varchar(250) NOT NULL,
  `pass_status` varchar(45) NOT NULL,
  `zones` text NOT NULL,
  PRIMARY KEY (`UserPass`),
  UNIQUE KEY `UserPass_UNIQUE` (`UserPass`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
