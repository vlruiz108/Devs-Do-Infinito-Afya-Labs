#PROCEDURES DE UPDATE
DELIMITER $$
CREATE PROCEDURE sp_updateUsers(p_login VARCHAR(20), p_senha VARCHAR(65), p_nome VARCHAR(45), 
p_email VARCHAR(45), p_id_usuario INT)
BEGIN
	UPDATE tbl_usuarios SET login = p_login, senha = SHA2(p_senha, 256), nome = p_nome, 
    email = p_email WHERE id_usuario = p_id_usuario; 
END $$


DELIMITER $$
CREATE PROCEDURE sp_updateClient(p_cep int, p_logradouro VARCHAR(45), p_numero VARCHAR(10), 
	p_bairro VARCHAR(45), p_localidade VARCHAR(45), p_uf VARCHAR(2), p_id_enderecos INT, 
    p_cpf VARCHAR(11), p_nome VARCHAR(45), p_telefone VARCHAR(45), p_celular VARCHAR(45), 
    p_email VARCHAR(45), p_tipo_sanguineo ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
    p_id_cliente INT) 
BEGIN
	UPDATE tbl_enderecos SET cep = p_cep, logradouro = p_logradouro, numero = p_numero, 
    bairro = p_bairro, localidade = p_localidade, uf = p_uf WHERE id_enderecos = p_id_enderecos;
	UPDATE tbl_clientes SET cpf = p_cpf, nome = p_nome, telefone = p_telefone, celular = p_celular,
    email = p_email, tipo_sanguineo = p_tipo_sanguineo, FK_id_endereco = p_id_enderecos 
    WHERE id_cliente = p_id_cliente;
END $$


DELIMITER $$
CREATE PROCEDURE sp_updateSpecialist(p_cep int, p_logradouro VARCHAR(45), p_numero VARCHAR(10), 
	p_bairro VARCHAR(45), p_localidade VARCHAR(45), p_uf VARCHAR(2), p_id_enderecos INT, 
    p_registro VARCHAR(11), p_nome VARCHAR(45), p_telefone VARCHAR(45), p_celular VARCHAR(45), 
    p_email VARCHAR(45), p_FK_id_profissao INT, p_id_especialista INT) 
BEGIN
	UPDATE tbl_enderecos SET cep = p_cep, logradouro = p_logradouro, numero = p_numero, 
    bairro = p_bairro, localidade = p_localidade, uf = p_uf WHERE id_enderecos = p_id_enderecos;
	UPDATE tbl_especialistas SET registro = p_registro, nome = p_nome, telefone = p_telefone, 
    celular = p_celular, email = p_email, FK_id_endereco = p_id_enderecos, FK_id_profissao = p_FK_id_profissao 
		WHERE id_especialista = p_id_especialista;
END $$


DELIMITER $$
CREATE PROCEDURE sp_updateProfission(p_nome VARCHAR(45), p_id_profissao INT)
BEGIN
	UPDATE tbl_profissoes SET nome = p_nome WHERE id_profissao = p_id_profissao;
END $$


DELIMITER $$
CREATE PROCEDURE sp_updateAttendance(p_data_agendamento DATE, p_data_atendimento DATE, 
p_valor DECIMAL(6,2), p_atendimento_status ENUM("Agendado", "Realizado", "Cancelado"),
p_FK_id_prontuario INT, p_FK_id_especialista INT, p_id_atendimento INT)
BEGIN
	UPDATE tbl_profissoes SET data_agendamento = p_data_agendamento, data_atendimento = p_data_atendimento,
    valor = p_valor, atendimento_status = p_atendimento_status, 
    FK_id_prontuario = p_FK_id_prontuario, FK_id_especialista = p_FK_id_especialista
		WHERE id_atendimento = p_id_atendimento;
END $$


DELIMITER $$
CREATE PROCEDURE sp_updateMedReg(p_FK_id_cliente INT, P_id_historico INT)
BEGIN
	UPDATE tbl_prontuarios SET FK_id_cliente = p_FK_id_cliente 
    WHERE id_historico = P_id_historico;
END $$


DELIMITER $$
CREATE PROCEDURE sp_updateHistoryMedRegs(p_descricao TEXT, p_FK_atendimento_historico INT, p_id_historico INT)
BEGIN
	UPDATE tbl_prontuarios SET descricao = p_descricao, FK_atendimento_historico = p_FK_atendimento_historico
		WHERE id_historico = p_id_historico;
END $$
