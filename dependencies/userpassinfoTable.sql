CREATE TABLE usermanagement.`userpassinfo` (
  `UserPass` varchar(50) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `UserImage` binary(50) DEFAULT NULL,
  `UserIDProof` binary(50) DEFAULT NULL,
  `UserIDProofNumber` varchar(50) DEFAULT NULL,
  `PassImage` binary(50) DEFAULT NULL,
  `ExpairyDate` varchar(50) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `id_code` varchar(50) NOT NULL,
  `pass_status` varchar(45) NOT NULL,
  PRIMARY KEY (`UserPass`),
  UNIQUE KEY `UserPass_UNIQUE` (`UserPass`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
