DELIMITER $$
CREATE PROCEDURE sp_attendanceForSchedule(p_date_schedule DATE)
BEGIN
	SELECT * FROM vw_attendanceForSchedule
		WHERE date(data_agendamento) = p_date_schedule;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceDate(p_date_attendance DATE)
BEGIN
	SELECT * FROM vw_attendanceDate
		WHERE date(data_atendimento) = p_date_attendance;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForClient(p_client_name VARCHAR(45))
BEGIN
	SELECT * FROM vw_attendanceForClient
		WHERE nome_cliente LIKE CONCAT("%", p_client_name, "%");
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForStatus(p_status VARCHAR(45))
BEGIN
	SELECT * FROM vw_attendanceForStatus
		WHERE atendimento_status = p_status;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForSpecificSpecialist(p_specialist_name VARCHAR(45))
BEGIN
	SELECT * FROM vw_attendanceForSpecialist
		WHERE nome_especialista LIKE CONCAT("%", p_specialist_name, "%");
END $$

DELIMITER $$
CREATE PROCEDURE sp_historyForClient(p_client_name VARCHAR(45))
BEGIN 
	SELECT * FROM vw_historicos WHERE nome_cliente = p_client_name;
END $$

DELIMITER $$
CREATE PROCEDURE sp_historyForSpecialist(p_client_specialist VARCHAR(45))
BEGIN 
	SELECT * FROM vw_historicos WHERE nome_especialista = p_client_specialist;
END $$

DELIMITER $$
CREATE PROCEDURE sp_historyForRegMed(p_id_prontuario INT)
BEGIN 
	SELECT * FROM vw_historicos WHERE id_prontuario = p_id_prontuario;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForPeriod(p_initial_date DATE, p_final_date DATE)
BEGIN 
	SELECT * FROM vw_historicos WHERE date(data_atendimento) BETWEEN p_initial_date AND p_final_date;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countSpecialistInPeriod(p_initial_date DATE, p_final_date DATE)
BEGIN 
	SELECT nome_especialista, count(*) as total_atendimentos FROM vw_historicos 
    WHERE data_atendimento BETWEEN p_initial_date AND p_final_date
    GROUP BY nome_especialista ORDER BY total_atendimentos DESC;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countProfessionInPeriod(p_initial_date DATE, p_final_date DATE)
BEGIN 
	SELECT nome_profissao, count(*) as total_atendimentos FROM vw_atendimentos_profissao 
    WHERE data_atendimento BETWEEN p_initial_date AND p_final_date
	GROUP BY nome_profissao ORDER BY total_atendimentos DESC;
END $$

DELIMITER $$
CREATE PROCEDURE sp_changePassword(p_senha VARCHAR(64), p_email varchar(45))
BEGIN
	UPDATE tbl_usuarios SET senha=SHA2(p_senha, 256) WHERE email=p_email;
END $$

DELIMITER $$
CREATE PROCEDURE sp_login(p_login VARCHAR(64), p_senha varchar(45))
BEGIN
	SELECT * FROM tbl_usuarios WHERE login=p_login AND senha=SHA2(p_senha, 256);
END $$

DELIMITER $$
CREATE PROCEDURE sp_checkEmail(p_email VARCHAR(45))
BEGIN
	SELECT * FROM tbl_usuarios WHERE email=p_email;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForSpecialist()
BEGIN
	SELECT * FROM vw_especialista_profissao;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countAttendanceForSpecialist()
BEGIN
	SELECT nome_profissao, count(*) as total_especialistas FROM vw_especialista_profissao GROUP BY nome_profissao ORDER BY total_especialistas DESC;
END $$

DELIMITER $$
CREATE PROCEDURE sp_attendanceForProfission()
BEGIN
	SELECT * FROM vw_atendimentos_profissao;
END $$

DELIMITER $$
CREATE PROCEDURE sp_countAttendanceForProfission()
BEGIN
	SELECT nome_profissao, count(*) total_atendimentos FROM vw_atendimentos_profissao GROUP BY nome_profissao ORDER BY total_atendimentos DESC;
END $$