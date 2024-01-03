-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Drop tables if they exist in the battleships schema
DROP TABLE IF EXISTS `battleships`.`board2`;
DROP TABLE IF EXISTS `battleships`.`board1`;
DROP TABLE IF EXISTS `battleships`.`game`;
DROP TABLE IF EXISTS `battleships`.`user`;

-- -----------------------------------------------------
-- Schema battleships
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `battleships` DEFAULT CHARACTER SET utf8 ;
USE `battleships` ;

-- -----------------------------------------------------
-- Table `battleships`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `battleships`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `battleships`.`game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `battleships`.`game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIME,
  `p1` INT NOT NULL,
  `p2` INT NOT NULL,
  `p1_score` INT NULL,
  `p2_score` INT NULL,
  PRIMARY KEY (`id`, `p1`, `p2`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_game_user_idx` (`p1` ASC) VISIBLE,
  INDEX `fk_game_user1_idx` (`p2` ASC) VISIBLE,
  CONSTRAINT `fk_game_user`
    FOREIGN KEY (`p1`)
    REFERENCES `battleships`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_user1`
    FOREIGN KEY (`p2`)
    REFERENCES `battleships`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `battleships`.`board1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `battleships`.`board1` (
  `x` INT(10) NOT NULL,
  `y` INT(10) NOT NULL,
  `is_ship` TINYINT(1) NOT NULL DEFAULT 0,
  `ship_type` ENUM('A', 'B', 'C', 'S', 'D') NULL,
  PRIMARY KEY (`x`, `y`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `battleships`.`board2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `battleships`.`board2` (
  `x` INT(10) NOT NULL,
  `y` INT(10) NOT NULL,
  `is_ship` TINYINT(1) NOT NULL DEFAULT 0,
  `ship_type` ENUM('A', 'B', 'C', 'S', 'D') NULL,
  PRIMARY KEY (`x`, `y`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
