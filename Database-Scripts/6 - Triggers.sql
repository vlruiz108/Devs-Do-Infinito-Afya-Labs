DELIMITER $$
CREATE TRIGGER trg_createRegMed AFTER INSERT ON tbl_clientes FOR EACH ROW
BEGIN
	INSERT INTO tbl_prontuarios(FK_id_cliente)
		VALUES(NEW.id_cliente);
END $$