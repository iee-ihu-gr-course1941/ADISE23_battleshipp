-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for battleships
DROP DATABASE IF EXISTS `battleships`;
CREATE DATABASE IF NOT EXISTS `battleships` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `battleships`;

-- Dumping structure for procedure battleships.AssignPlayer
DROP PROCEDURE IF EXISTS `AssignPlayer`;
DELIMITER //
CREATE PROCEDURE `AssignPlayer`(
	IN `gameId` INT
)
BEGIN
	 DECLARE gameId INT;

    -- Check for an existing game with an empty slot for a new player
    SELECT id INTO gameId
    FROM `game`
    WHERE `blue` IS NULL OR `red` IS NULL
    LIMIT 1;

    -- If no existing game has an empty slot, create a new game
    IF gameId IS NULL THEN
        INSERT INTO `game` (`blue`, `state`)
        VALUES (playerId, 'not_active');  -- Assign player ID to the blue column
    ELSE
        -- Update the existing game with the first available slot
        UPDATE `game`
        SET
            `blue` = IF(`blue` IS NULL, playerId, `blue`),
            `red` = IF(`red` IS NULL, playerId, `red`)
        WHERE id = gameId;
    END IF;
END//
DELIMITER ;

-- Dumping structure for table battleships.game
DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blue` int(11) DEFAULT NULL,
  `red` int(11) DEFAULT NULL,
  `last_change` timestamp NOT NULL DEFAULT current_timestamp(),
  `blue_score` int(11) DEFAULT NULL,
  `red_score` int(11) DEFAULT NULL,
  `blue_board` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`blue_board`)),
  `red_board` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`red_board`)),
  `result` enum('Β','R') DEFAULT NULL,
  `state` enum('not_active','initiazized','started','ended','aborted') DEFAULT 'not_active',
  `p_turn` enum('B','R') DEFAULT 'B',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_game_user` (`blue`),
  KEY `FK_game_user_2` (`red`),
  CONSTRAINT `FK_game_user` FOREIGN KEY (`blue`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_game_user_2` FOREIGN KEY (`red`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table battleships.game: ~0 rows (approximately)
DELETE FROM `game`;

-- Dumping structure for table battleships.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table battleships.user: ~0 rows (approximately)
DELETE FROM `user`;

-- Dumping structure for trigger battleships.game_before_update
DROP TRIGGER IF EXISTS `game_before_update`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `game_before_update` BEFORE UPDATE ON `game` FOR EACH ROW BEGIN
	-- Update games where both blue and red are occupied to 'started'
    IF NEW.`blue` IS NOT NULL AND NEW.`red` IS NOT NULL AND NEW.`state` NOT IN ('aborted', 'started') THEN
        SET NEW.`state` = 'started';
    END IF;

    -- Update games where only blue is occupied to 'initialized'
    IF NEW.`blue` IS NOT NULL AND NEW.`red` IS NULL AND NEW.`state` NOT IN ('aborted', 'started') THEN
        SET NEW.`state` = 'initialized';
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger battleships.update_last_change
DROP TRIGGER IF EXISTS `update_last_change`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_last_change` BEFORE UPDATE ON `game` FOR EACH ROW BEGIN
	SET NEW.last_change= CURRENT_TIMESTAMP;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
