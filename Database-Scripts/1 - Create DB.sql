DROP DATABASE afya_labs;
-- -----------------------------------------------------
-- Database mydb
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS afya_labs DEFAULT CHARACTER SET utf8;
USE afya_labs;

-- -----------------------------------------------------
-- Table tbl_users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_users (
  id_login INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_email VARCHAR(45) UNIQUE NOT NULL,
  user_pass VARCHAR(64) NOT NULL,
  user_name VARCHAR(45) NOT NULL,
  userIsDeleted BOOLEAN DEFAULT FALSE
);

-- -----------------------------------------------------
-- Table tbl_address
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_address (
  id_address INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  zipe_code INT ZEROFILL NOT NULL,
  street VARCHAR(45) NOT NULL,
  number VARCHAR(10) NOT NULL,
  district VARCHAR(45) NOT NULL,
  locale VARCHAR(45) NOT NULL,
  uf VARCHAR(2) NOT NULL
);

-- -----------------------------------------------------
-- Table tbl_clients
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_clients (
  id_client INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  client_name VARCHAR(45) NOT NULL,
  phone VARCHAR(45) NULL,
  cellphone VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  blood_type ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-") NOT NULL,
  FK_id_address INT NOT NULL,
  clientIsDeleted BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_address_client FOREIGN KEY(FK_id_address)
    REFERENCES tbl_address(id_address)
);
CREATE INDEX cpf_unique ON tbl_clients(cpf);
CREATE INDEX email ON tbl_clients(email);

-- -----------------------------------------------------
-- Table tbl_professions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_professions (
  id_profession INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  profession_name VARCHAR(45) NOT NULL,
  professionIsDeleted BOOLEAN DEFAULT FALSE
);

-- -----------------------------------------------------
-- Table tbl_specialists
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_specialists (
  id_specialist INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  register VARCHAR(45) UNIQUE NOT NULL,
  specialist_name VARCHAR(45) NOT NULL,
  phone VARCHAR(45) NULL,
  cellphone VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  FK_id_address INT NOT NULL,
  FK_id_profession INT NOT NULL,
  specialistIsDeleted BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_address_specialist FOREIGN KEY(FK_id_address)
    REFERENCES tbl_address(id_address),
  CONSTRAINT fk_id_profession FOREIGN KEY(FK_id_profession)
    REFERENCES tbl_professions(id_profession)
);
CREATE INDEX register_unique ON tbl_specialists(register);
CREATE INDEX email_especialist ON tbl_specialists(email);

-- -----------------------------------------------------
-- Table tbl_med_regs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_med_regs (
  id_med_reg INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  med_reg_date DATE NOT NULL,
  FK_id_client INT NOT NULL,
  CONSTRAINT FK_id_client FOREIGN KEY(FK_id_client)
    REFERENCES tbl_clients(id_client)
);

-- -----------------------------------------------------
-- Table tbl_attendances
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_attendances (
  id_attendance INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  schedule_date DATETIME NOT NULL,
  attendance_date DATETIME NOT NULL,
  attendance_value DECIMAL(6,2) NOT NULL,
  attendance_status ENUM("Agendado", "Realizado", "Cancelado")DEFAULT "Agendado" NOT NULL,
  FK_id_med_reg INT NOT NULL,
  FK_id_specialist INT NOT NULL,
  CONSTRAINT FK_id_med_reg FOREIGN KEY(FK_id_med_reg)
    REFERENCES tbl_med_regs(id_med_reg),
  CONSTRAINT FK_id_specialist FOREIGN KEY(FK_id_specialist)
    REFERENCES tbl_specialists(id_specialist)
);
CREATE INDEX attendance_date ON tbl_attendances(attendance_date);

-- -----------------------------------------------------
-- Table tbl_history_med_regs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_historic_med_regs (
  id_historic INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  date_med_reg DATE NOT NULL,
  time_med_reg TIME NOT NULL,
  description TEXT NOT NULL,
	FK_id_attendances INT NOT NULL,
  CONSTRAINT FK_id_attendances FOREIGN KEY(FK_id_attendances)
    REFERENCES tbl_attendances(id_attendance)
);