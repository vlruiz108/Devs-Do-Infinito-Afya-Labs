#CHAMADA DAS PROCEDURES DE UPDATE
CALL sp_updateUsers("teste", "teste", "teste", "teste", 1);

CALL sp_updateClient(0000000, "logradouro", "numero", "bairro", "localidade", "uf", 1, 40000000, "nome", "telefone", "celular", "email", "A-", 1); 

CALL sp_updateSpecialist(1111111, "logradouro1", "numero1", "bairro1", "localidade1", "uf", 2, 44444444, "nome1", "telefone1", "celular1", "email1", 2, 1); 

CALL sp_updateProfission("teste", 1);

CALL sp_updateAttendance("2000/01/01", "2000/01/01", 10, "Cancelado", 1, 1, 1);

CALL sp_updateMedReg("2000/01/01", 1, 1);

CALL sp_updateHistoryMedRegs("teste", 2, 1);