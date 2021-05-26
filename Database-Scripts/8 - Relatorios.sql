############# RELATÓRIOS OBRIGATÓRIOS #################
#Consulta dos atendimentos por: Data Agendamento
CALL sp_attendanceForSchedule('2020/02/15');

#Consulta dos atendimentos por: Data Atendimento
CALL sp_attendanceDate('2020/02/07');

#Consulta dos atendimentos por: Cliente
CALL sp_attendanceForClient('Dyanna Ledbury');

#Consulta dos atendimentos por: Status
CALL sp_attendanceForStatus('Agendado');

#Consulta dos atendimentos por: Especialista
CALL sp_attendanceForSpecialist('Clevie Danihelka');

############# BUSCAS IMPORTANTES #################
#Históricos por cliente 
CALL sp_historyForClient('Cyndi Meak');

#Histórico por especialista
CALL sp_attendanceForSpecificSpecialist('Lishe Stener');

#Histórico por prontuario
CALL sp_historyForRegMed(28);
        
#Especialistas por profissão
SELECT * FROM vw_especialista_profissao;

#Especialistas por profissão
CALL sp_attendanceForSpecialist;

#Contagem de Atendimentos por Especialista
CALL sp_countAttendanceForSpecialist;
		
#Atendimentos por profissão
CALL sp_attendanceForProfission;

#Contagem de atendimentos por profissao
CALL sp_countAttendanceForProfission;

#Atendimentos por intervalo de tempo
CALL sp_attendanceForPeriod('2020/10/01', '2020/10/31');

#Contagem de atendimentos por especialista
CALL sp_countSpecialistInPeriod('2020/10/01', '2020/10/31');

#Contagem de atendimentos por especialista em intervalo de tempo
CALL sp_countProfessionInPeriod('2020/01/01', '2020/10/31');