############# RELATÓRIOS OBRIGATÓRIOS #################
#Consulta dos atendimentos por: Data Agendamento
CREATE VIEW vw_attendanceForSchedule AS
SELECT a.id_atendimento, a.data_agendamento, a.data_atendimento, a.valor, 
	a.atendimento_status, b.nome as nome_especialista, d.nome as nome_cliente 
    FROM tbl_atendimentos a
		JOIN tbl_especialistas b ON a.FK_id_especialista = b.id_especialista 
        JOIN tbl_prontuarios c ON a.FK_id_prontuario = c.id_prontuario
        JOIN tbl_clientes d ON c.FK_id_cliente = d.id_cliente;
	
#Consulta dos atendimentos por: Data Atendimento
CREATE VIEW vw_attendanceDate AS        
SELECT a.id_atendimento, a.data_agendamento, a.data_atendimento, a.valor, 
	a.atendimento_status, b.nome as nome_especialista, d.nome as nome_cliente 
    FROM tbl_atendimentos a
		JOIN tbl_especialistas b ON a.FK_id_especialista = b.id_especialista 
        JOIN tbl_prontuarios c ON a.FK_id_prontuario = c.id_prontuario
        JOIN tbl_clientes d ON c.FK_id_cliente = d.id_cliente;
      
#Consulta dos atendimentos por: Cliente
CREATE VIEW vw_attendanceForClient AS        
SELECT a.id_atendimento, a.data_agendamento, a.data_atendimento, a.valor, 
	a.atendimento_status, b.nome as nome_especialista, d.nome as nome_cliente 
    FROM tbl_atendimentos a
		JOIN tbl_especialistas b ON a.FK_id_especialista = b.id_especialista 
        JOIN tbl_prontuarios c ON a.FK_id_prontuario = c.id_prontuario
        JOIN tbl_clientes d ON c.FK_id_cliente = d.id_cliente;
    
#Consulta dos atendimentos por: Status
CREATE VIEW vw_attendanceForStatus AS       
SELECT a.id_atendimento, a.data_agendamento, a.data_atendimento, a.valor, 
	a.atendimento_status, b.nome as nome_especialista, d.nome as nome_cliente 
    FROM tbl_atendimentos a
		JOIN tbl_especialistas b ON a.FK_id_especialista = b.id_especialista 
        JOIN tbl_prontuarios c ON a.FK_id_prontuario = c.id_prontuario
        JOIN tbl_clientes d ON c.FK_id_cliente = d.id_cliente;
        
#Consulta dos atendimentos por: Especialista
CREATE VIEW vw_attendanceForSpecialist AS        
SELECT a.id_atendimento, a.data_agendamento, a.data_atendimento, a.valor, 
	a.atendimento_status, b.nome as nome_especialista, d.nome as nome_cliente 
    FROM tbl_atendimentos a
		JOIN tbl_especialistas b ON a.FK_id_especialista = b.id_especialista 
        JOIN tbl_prontuarios c ON a.FK_id_prontuario = c.id_prontuario
        JOIN tbl_clientes d ON c.FK_id_cliente = d.id_cliente;
        

############# BUSCAS IMPORTANTES #################
#Históricos por cliente, por especialista e por prontuario
CREATE VIEW vw_historicos AS
SELECT a.id_historico, a.data_historico, a.hora_historico, a.descricao, b.data_atendimento, 
	c.nome as nome_especialista, d.id_prontuario, e.nome as nome_cliente, e.email as email_cliente, 
    e.cpf as cpf_cliente FROM tbl_prontuario_historicos a
		JOIN tbl_atendimentos b ON a.FK_atendimento_historico = b.id_atendimento
        JOIN tbl_especialistas c ON b.FK_id_especialista = c.id_especialista
        JOIN tbl_prontuarios d ON b.FK_id_prontuario = d.id_prontuario
        JOIN tbl_clientes e ON d.FK_id_cliente = e.id_cliente;
        
#Especialistas por profissão
CREATE VIEW vw_especialista_profissao AS
SELECT a.id_especialista, a.registro, a.nome as nome_especialista, a.telefone,
	a.celular, a.email, b.nome as nome_profissao FROM tbl_especialistas a
		JOIN tbl_profissoes b ON a.FK_id_profissao = id_profissao;
		
#Atendimentos por profissão
CREATE VIEW vw_atendimentos_profissao AS
SELECT a.id_atendimento, a.data_agendamento, a.data_atendimento, a.valor, 
	a.atendimento_status, c.nome as nome_profissao FROM tbl_atendimentos a
		JOIN tbl_especialistas b ON a.FK_id_especialista = b.id_especialista 
        JOIN tbl_profissoes c ON b.FK_id_profissao = c.id_profissao;
