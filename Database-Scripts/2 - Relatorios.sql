############# RELATÓRIOS OBRIGATÓRIOS #################
#Consulta dos atendimentos por: Data Agendamento, Data Atendimento, Cliente, Status, Especialista
CREATE VIEW vw_generalReports AS
SELECT a.id_attendance, a.schedule_date, a.attendance_date, a.attendance_value, 
	a.attendance_status, b.specialist_name, d.client_name 
    FROM tbl_attendances a
		JOIN tbl_specialists b ON a.FK_id_specialist = b.id_specialist 
        JOIN tbl_med_regs c ON a.FK_id_med_reg = c.id_med_reg
        JOIN tbl_clients d ON c.FK_id_client = d.id_client;
	
############# BUSCAS IMPORTANTES #################
#Históricos por cliente, por especialista e por prontuario
CREATE VIEW vw_historics AS
SELECT a.id_historic, a.date_med_reg, a.time_med_reg, a.description, b.attendance_date, 
	c.specialist_name, d.id_med_reg, e.client_name, e.email as email_client, 
    e.cpf as cpf_client FROM tbl_historic_med_regs a
		JOIN tbl_attendances b ON a.FK_id_attendances = b.id_attendance
        JOIN tbl_specialists c ON b.FK_id_specialist = c.id_specialist
        JOIN tbl_med_regs d ON b.FK_id_med_reg = d.id_med_reg
        JOIN tbl_clients e ON d.FK_id_client = e.id_client;
        
#Especialistas por profissão
CREATE VIEW vw_specialist_profession AS
SELECT a.id_specialist, a.register, a.specialist_name, a.phone,
	a.cellphone, a.email, b.profession_name FROM tbl_specialists a
		JOIN tbl_professions b ON a.FK_id_profession = id_profession;
		
#Atendimentos por profissão
CREATE VIEW vw_attendances_profession AS
SELECT a.id_attendance, a.schedule_date, a.attendance_date, a.attendance_value, 
	a.attendance_status, c.profession_name FROM tbl_attendances a
		JOIN tbl_specialists b ON a.FK_id_specialist = b.id_specialist 
        JOIN tbl_professions c ON b.FK_id_profession = c.id_profession;
        
CREATE VIEW vw_list_clients AS 
SELECT * FROM tbl_clients
	JOIN tbl_address ON tbl_clients.FK_id_address = tbl_address.id_address; 

CREATE VIEW vw_list_specialists AS
SELECT * FROM tbl_specialists
	JOIN tbl_address ON tbl_specialists.FK_id_address = tbl_address.id_address
    JOIN tbl_professions ON tbl_specialists.FK_id_profession = tbl_professions.id_profession;
    
CREATE VIEW vw_list_attendances AS
SELECT * FROM tbl_attendances
	JOIN tbl_med_regs ON tbl_attendances.FK_id_med_reg = tbl_med_regs.id_med_reg
    JOIN tbl_specialists ON tbl_attendances.FK_id_specialist = tbl_specialists.id_specialist;

#Procedures dos relatorios
DELIMITER $$
CREATE PROCEDURE sp_attendanceForSchedule(p_date_schedule DATE)
BEGIN
	SELECT * FROM vw_generalReports
		WHERE date(schedule_date) = p_date_schedule;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceDate(p_date_attendance DATE)
BEGIN
	SELECT * FROM vw_generalReports
		WHERE date(attendance_date) = p_date_attendance;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForClient(p_client_name VARCHAR(45))
BEGIN
	SELECT * FROM vw_generalReports
		WHERE client_name LIKE CONCAT("%", p_client_name, "%");
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForStatus(p_status VARCHAR(45))
BEGIN
	SELECT * FROM vw_generalReports
		WHERE attendance_status = p_status;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForSpecificSpecialist(p_specialist_name VARCHAR(45))
BEGIN
	SELECT * FROM vw_generalReports
		WHERE specialist_name LIKE CONCAT("%", p_specialist_name, "%");
END $$

#Outras buscas importantes
DELIMITER $$
CREATE PROCEDURE sp_historyForClient(p_info_client VARCHAR(45))
BEGIN 
	SELECT * FROM vw_historics 
		WHERE client_name LIKE CONCAT("%", p_info_client, "%")
        OR cpf_client = p_info_client;
END $$

DELIMITER $$
CREATE PROCEDURE sp_historyForSpecialist(p_specialist_name VARCHAR(45))
BEGIN 
	SELECT * FROM vw_historics 
		WHERE specialist_name LIKE CONCAT("%", p_specialist_name, "%");
END $$

DELIMITER $$
CREATE PROCEDURE sp_historyForRegMed(p_id_med_reg INT)
BEGIN 
	SELECT * FROM vw_historics WHERE id_med_reg = p_id_med_reg;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForPeriod(p_initial_date DATE, p_final_date DATE)
BEGIN 
	SELECT * FROM vw_historics 
		WHERE date(attendance_date) BETWEEN p_initial_date AND p_final_date;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countSpecialistInPeriod(p_initial_date DATE, p_final_date DATE)
BEGIN 
	SELECT specialist_name, count(*) as total_attendances FROM vw_historics 
    WHERE attendance_date BETWEEN p_initial_date AND p_final_date
    GROUP BY specialist_name ORDER BY total_attendances DESC;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countProfessionInPeriod(p_initial_date DATE, p_final_date DATE)
BEGIN 
	SELECT profession_name, count(*) as total_attendances FROM vw_attendances_profession 
    WHERE attendance_date BETWEEN p_initial_date AND p_final_date
	GROUP BY profession_name ORDER BY total_attendances DESC;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForSpecialist()
BEGIN
	SELECT * FROM vw_attendances_profession;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countAttendanceForSpecialist()
BEGIN
	SELECT specialist_name, count(*) as total_specialist FROM vw_specialist_profession GROUP BY profession_name ORDER BY total_specialist DESC;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForProfission()
BEGIN
	SELECT * FROM vw_attendances_profession;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countAttendanceForProfission()
BEGIN
	SELECT profession_name, count(*) total_attendance FROM vw_attendances_profession GROUP BY profession_name ORDER BY total_attendance DESC;
END $$	

DELIMITER $$
CREATE PROCEDURE sp_specialistForProfission()
BEGIN
	SELECT * FROM vw_specialist_profession;
END $$