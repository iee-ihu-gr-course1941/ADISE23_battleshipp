DELIMITER //

-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS InsertUser;

CREATE PROCEDURE InsertUser(
    IN username_param VARCHAR(16)
)
BEGIN
    INSERT INTO `battleships`.`user` (`username`)
    VALUES (username_param);
END //

-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS InsertGame;

CREATE PROCEDURE InsertGame(
    IN timestamp_param TIMESTAMP,
    IN p1_param INT,
    IN p2_param INT,
    IN p1_score_param INT,
    IN p2_score_param INT
)
BEGIN
    INSERT INTO `battleships`.`game` (`timestamp`, `p1`, `p2`, `p1_score`, `p2_score`)
    VALUES (timestamp_param, p1_param, p2_param, p1_score_param, p2_score_param);
END //

-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS InsertBoard1;

CREATE PROCEDURE InsertBoard1(
    IN x_param INT,
    IN y_param INT,
    IN is_ship_param TINYINT,
    IN ship_type_param ENUM('A', 'B', 'C', 'S', 'D')
)
BEGIN
    INSERT INTO `battleships`.`board1` (`x`, `y`, `is_ship`, `ship_type`)
    VALUES (x_param, y_param, is_ship_param, ship_type_param);
END //

-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS InsertBoard2;

CREATE PROCEDURE InsertBoard2(
    IN x_param INT,
    IN y_param INT,
    IN is_ship_param TINYINT,
    IN ship_type_param ENUM('A', 'B', 'C', 'S', 'D')
)
BEGIN
    INSERT INTO `battleships`.`board2` (`x`, `y`, `is_ship`, `ship_type`)
    VALUES (x_param, y_param, is_ship_param, ship_type_param);
END //

DELIMITER ;

