#Funcionalidades Base
DELIMITER $$
CREATE PROCEDURE sp_changePassword(p_user_pass VARCHAR(64), p_email varchar(45))
BEGIN
	UPDATE tbl_users SET user_pass=SHA2(p_user_pass, 256) WHERE user_email=p_email;
END $$

DELIMITER $$
CREATE PROCEDURE sp_login(p_user_email VARCHAR(64), p_user_pass varchar(45))
BEGIN
	SELECT * FROM tbl_users WHERE user_email=p_user_email AND user_pass=SHA2(p_user_pass, 256);
END $$

DELIMITER $$
CREATE PROCEDURE sp_checkEmail(p_user_email VARCHAR(45))
BEGIN
	SELECT * FROM tbl_users WHERE user_email=p_user_email;
END $$

#PROCEDURES DE INSERTS
DELIMITER $$
CREATE PROCEDURE sp_registerUsers(p_email VARCHAR(45), p_user_pass VARCHAR(65), p_nome VARCHAR(45))
BEGIN
	INSERT INTO tbl_users(user_email, user_pass, user_name) 
		VALUES(p_email, SHA2(p_user_pass, 256), p_nome);
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertClient(p_zipe_code int, p_street VARCHAR(45), p_number VARCHAR(10), 
	p_district VARCHAR(45), p_locale VARCHAR(45), p_uf VARCHAR(2), 
    p_cpf VARCHAR(11), p_nome VARCHAR(45), p_phone VARCHAR(45), p_cellphone VARCHAR(45), 
    p_email VARCHAR(45), p_blood_type ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"))
BEGIN
	INSERT INTO tbl_address(zipe_code, street, number, district, locale, uf)
		VALUES(p_zipe_code, p_street, p_number, p_district, p_locale, p_uf);
	INSERT INTO tbl_clients(cpf, client_name, phone, cellphone, email, blood_type, FK_id_address)
		VALUES(p_cpf, p_nome, p_phone, p_cellphone, p_email, p_blood_type, 
        (SELECT max(id_address) FROM  tbl_address));
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertSpecialist(p_zipe_code int, p_street VARCHAR(45), p_number VARCHAR(10), 
	p_district VARCHAR(45), p_locale VARCHAR(45), p_uf VARCHAR(2),
    p_register VARCHAR(11), p_specialist_name VARCHAR(45), p_phone VARCHAR(45), 
	p_cellphone VARCHAR(45), p_email VARCHAR(45), p_FK_id_profession INT)    
BEGIN
	INSERT INTO tbl_address(zipe_code, street, number, district, locale, uf)
		VALUES(p_zipe_code, p_street, p_number, p_district, p_locale, p_uf);
	INSERT INTO tbl_specialists(register, specialist_name, phone, cellphone, email, FK_id_address, FK_id_profession)
		VALUES(p_register, p_specialist_name, p_phone, p_cellphone, p_email, 
        (SELECT max(id_address) FROM tbl_address), p_FK_id_profession);
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertProfission(p_nome VARCHAR(45))
BEGIN
	INSERT INTO tbl_professions(profession_name) 
		VALUES(p_nome);
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertAttendance(p_schedule_date DATETIME, p_attendance_date DATETIME, 
p_attendance_value DECIMAL(6,2), p_FK_id_med_reg INT, p_FK_id_specialist INT)
BEGIN
	INSERT INTO tbl_attendances(schedule_date, attendance_date, attendance_value, 
    FK_id_med_reg, FK_id_specialist) 
		VALUES(p_schedule_date, p_attendance_date, p_attendance_value, 
        p_FK_id_med_reg, p_FK_id_specialist);
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertMedReg(p_FK_id_client INT)
BEGIN
	INSERT INTO tbl_med_regs(med_reg_date, FK_id_client) 
		VALUES(NOW(), p_FK_id_client);
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertHistoricMedRegs(p_description TEXT, p_FK_id_attendances INT)
BEGIN
    INSERT INTO tbl_historic_med_regs(date_med_reg, time_med_reg, description, FK_id_attendances) 
		VALUES( (SELECT date(attendance_date) FROM tbl_attendances WHERE id_attendance = p_FK_id_attendances), 
				(SELECT time(attendance_date) FROM tbl_attendances WHERE id_attendance = p_FK_id_attendances), 
                p_description, p_FK_id_attendances
		);
END $$

#PROCEDURES DE UPDATE
DELIMITER $$
CREATE PROCEDURE sp_updateUsers(p_user_email VARCHAR(45), p_user_pass VARCHAR(65), p_user_name VARCHAR(45), p_id_login INT)
BEGIN
	UPDATE tbl_users SET user_email = p_user_email, user_pass = SHA2(p_user_pass, 256), user_name = p_user_name
		WHERE id_login = p_id_login; 
END $$

DELIMITER $$
CREATE PROCEDURE sp_updateClient(p_zipe_code int, p_street VARCHAR(45), p_number VARCHAR(10), 
	p_district VARCHAR(45), p_locale VARCHAR(45), p_uf VARCHAR(2), p_id_address INT, 
    p_cpf VARCHAR(11), p_client_name VARCHAR(45), p_phone VARCHAR(45), p_cellphone VARCHAR(45), 
    p_email VARCHAR(45), p_blood_type ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
    p_id_client INT) 
BEGIN
	UPDATE tbl_address SET zipe_code = p_zipe_code, street = p_street, number = p_number, 
    district = p_district, locale = p_locale, uf = p_uf WHERE id_address = p_id_address;
	UPDATE tbl_clients SET cpf = p_cpf, client_name = p_client_name, phone = p_phone, cellphone = p_cellphone,
    email = p_email, blood_type = p_blood_type, FK_id_address = p_id_address 
    WHERE id_client = p_id_client;
END $$

DELIMITER $$
CREATE PROCEDURE sp_updateSpecialist(p_zipe_code int, p_street VARCHAR(45), p_number VARCHAR(10), 
	p_district VARCHAR(45), p_locale VARCHAR(45), p_uf VARCHAR(2), p_id_address INT, 
    p_register VARCHAR(11), p_nome VARCHAR(45), p_phone VARCHAR(45), p_cellphone VARCHAR(45), 
    p_email VARCHAR(45), p_FK_id_profession INT, p_id_specialist INT) 
BEGIN
	UPDATE tbl_address SET zipe_code = p_zipe_code, street = p_street, number = p_number, 
    district = p_district, locale = p_locale, uf = p_uf WHERE id_address = p_id_address;
	UPDATE tbl_specialists SET register = p_register, nome = p_nome, phone = p_phone, 
    cellphone = p_cellphone, email = p_email, FK_id_address = p_id_address, FK_id_profession = p_FK_id_profession 
		WHERE id_specialist = p_id_specialist;
END $$

DELIMITER $$
CREATE PROCEDURE sp_updateProfission(p_profession_name VARCHAR(45), p_id_profession INT)
BEGIN
	UPDATE tbl_professions SET profession_name = p_profession_name WHERE id_profession = p_id_profession;
END $$

DELIMITER $$
CREATE PROCEDURE sp_updateAttendance(p_schedule_date DATE, p_attendance_date DATE, 
p_attendance_value DECIMAL(6,2), p_attendance_status ENUM("Agendado", "Realizado", "Cancelado"),
p_FK_id_med_reg INT, p_FK_id_specialist INT, p_id_attendance INT)
BEGIN
	UPDATE tbl_attendances SET schedule_date = p_schedule_date, attendance_date = p_attendance_date,
    attendance_value = p_attendance_value, attendance_status = p_attendance_status, 
    FK_id_med_reg = p_FK_id_med_reg, FK_id_specialist = p_FK_id_specialist
		WHERE id_attendance = p_id_attendance;
END $$

DELIMITER $$
CREATE PROCEDURE sp_updateMedReg(p_med_reg_date DATE, p_FK_id_client INT, p_id_med_reg INT)
BEGIN
	UPDATE tbl_med_regs SET med_reg_date = p_med_reg_date, FK_id_client = p_FK_id_client 
    WHERE id_med_reg = p_id_med_reg;
END $$

DELIMITER $$
CREATE PROCEDURE sp_updateHistoryMedRegs(p_description TEXT, p_id_historic INT)
BEGIN
	UPDATE tbl_historic_med_regs SET description = p_description WHERE id_historic = p_id_historic;
END $$

DELIMITER $$
CREATE TRIGGER trg_createRegMed AFTER INSERT ON tbl_clients FOR EACH ROW
BEGIN
	INSERT INTO tbl_med_regs(med_reg_date, FK_id_client)
		VALUES(NOW(), NEW.id_client);
END $$
