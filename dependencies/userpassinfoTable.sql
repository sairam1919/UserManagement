CREATE TABLE `userpassinfo` (
  `UserPass` varchar(50) NOT NULL,
  `UserID` varchar(50) NOT NULL,
  `UserImage` binary(50) DEFAULT NULL,
  `UserIDProof` binary(50) DEFAULT NULL,
  `UserIDProofNumber` varchar(50) DEFAULT NULL,
  `PassImage` binary(50) DEFAULT NULL,
  `ExpairyDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
