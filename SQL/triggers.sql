DELIMITER //

CREATE TRIGGER set_default_turn
BEFORE INSERT ON `battleships`.`game`
FOR EACH ROW
BEGIN
  SET NEW.current_turn = NEW.p1;
END;

//

DELIMITER ;