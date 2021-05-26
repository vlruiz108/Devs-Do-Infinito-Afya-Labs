#PROCEDURES DE INSERTS
DELIMITER $$
CREATE PROCEDURE sp_registerUsers(p_login VARCHAR(20), p_senha VARCHAR(65), p_nome VARCHAR(45), p_email VARCHAR(45))
BEGIN
	INSERT INTO tbl_usuarios(login, senha, nome, email) 
		VALUES(p_login, SHA2(p_senha, 256), p_nome, p_email);
END $$


DELIMITER $$
CREATE PROCEDURE sp_insertClient(p_cep int, p_logradouro VARCHAR(45), p_numero VARCHAR(10), 
	p_bairro VARCHAR(45), p_localidade VARCHAR(45), p_uf VARCHAR(2), 
    p_cpf VARCHAR(11), p_nome VARCHAR(45), p_telefone VARCHAR(45), p_celular VARCHAR(45), 
    p_email VARCHAR(45), p_tipo_sanguineo ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"))
BEGIN
	INSERT INTO tbl_enderecos(cep, logradouro, numero, bairro, localidade, uf)
		VALUES(p_cep, p_logradouro, p_numero, p_bairro, p_localidade, p_uf);
	INSERT INTO tbl_clientes(cpf, nome, telefone, celular, email, tipo_sanguineo, FK_id_endereco)
		VALUES(p_cpf, p_nome, p_telefone, p_celular, p_email, p_tipo_sanguineo, 
        (SELECT max(id_endereco) FROM  tbl_enderecos));
END $$


DELIMITER $$
CREATE PROCEDURE sp_insertSpecialist(p_cep int, p_logradouro VARCHAR(45), p_numero VARCHAR(10), 
	p_bairro VARCHAR(45), p_localidade VARCHAR(45), p_uf VARCHAR(2),
    p_registro VARCHAR(11), p_nome VARCHAR(45), p_telefone VARCHAR(45), 
	p_celular VARCHAR(45), p_email VARCHAR(45), p_FK_id_profissao INT)    
BEGIN
	INSERT INTO tbl_enderecos(cep, logradouro, numero, bairro, localidade, uf)
		VALUES(p_cep, p_logradouro, p_numero, p_bairro, p_localidade, p_uf);
	INSERT INTO tbl_especialistas(registro, nome, telefone, celular, email, FK_id_endereco, FK_id_profissao)
		VALUES(p_registro, p_nome, p_telefone, p_celular, p_email, 
        (SELECT max(id_endereco) FROM tbl_enderecos), p_FK_id_profissao);
END $$


DELIMITER $$
CREATE PROCEDURE sp_insertProfission(p_nome VARCHAR(45))
BEGIN
	INSERT INTO tbl_profissoes(nome) 
		VALUES(p_nome);
END $$


DELIMITER $$
CREATE PROCEDURE sp_insertAttendance(p_data_agendamento DATETIME, p_data_atendimento DATETIME, 
p_valor DECIMAL(6,2), p_FK_id_prontuario INT, p_FK_id_especialista INT)
BEGIN
	INSERT INTO tbl_atendimentos(data_agendamento, data_atendimento, valor, 
    FK_id_prontuario, FK_id_especialista) 
		VALUES(p_data_agendamento, p_data_atendimento, p_valor, 
        p_FK_id_prontuario, p_FK_id_especialista);
END $$


DELIMITER $$
CREATE PROCEDURE sp_insertMedReg(p_FK_id_cliente INT)
BEGIN
	INSERT INTO tbl_prontuarios(FK_id_cliente) 
		VALUES(p_FK_id_cliente);
END $$


DELIMITER $$
CREATE PROCEDURE sp_insertHistoryMedRegs(p_descricao TEXT, p_FK_atendimento_historico INT)
BEGIN
	INSERT INTO tbl_prontuario_historicos(descricao, FK_atendimento_historico) 
		VALUES(p_descricao, p_FK_atendimento_historico);
END $$
