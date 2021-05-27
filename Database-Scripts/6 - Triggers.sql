DELIMITER $$
CREATE TRIGGER trg_createRegMed AFTER INSERT ON tbl_clientes FOR EACH ROW
BEGIN
	INSERT INTO tbl_prontuarios(data_abertura, FK_id_cliente)
		VALUES(NOW(), NEW.id_cliente);
END $$