# DROP DATABASE afya_labs;
-- -----------------------------------------------------
-- Database mydb
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS afya_labs DEFAULT CHARACTER SET utf8;
USE afya_labs;

-- -----------------------------------------------------
-- Table tbl_usuarios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_usuarios (
  id_login INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  login VARCHAR(20) UNIQUE NOT NULL,
  senha VARCHAR(64) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table tbl_enderecos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_enderecos (
  id_endereco INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cep INT ZEROFILL NOT NULL,
  logradouro VARCHAR(45) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  bairro VARCHAR(45) NOT NULL,
  localidade VARCHAR(45) NOT NULL,
  uf VARCHAR(2) NOT NULL
);

-- -----------------------------------------------------
-- Table tbl_clientes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_clientes (
  id_cliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  nome VARCHAR(45) NOT NULL,
  telefone VARCHAR(45) NULL,
  celular VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  tipo_sanguineo ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-") NOT NULL,
  FK_id_endereco INT NOT NULL,
  CONSTRAINT fk_endereco_cliente FOREIGN KEY(FK_id_endereco)
    REFERENCES tbl_enderecos(id_endereco)
);
CREATE INDEX cpf_unico ON tbl_clientes(cpf);
CREATE INDEX email_usuario ON tbl_clientes(email);

-- -----------------------------------------------------
-- Table tbl_profissoes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_profissoes (
  id_profissao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table tbl_especialistas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_especialistas (
  id_especialista INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  registro VARCHAR(45) UNIQUE NOT NULL,
  nome VARCHAR(45) NOT NULL,
  telefone VARCHAR(45) NULL,
  celular VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  FK_id_endereco INT NOT NULL,
  FK_id_profissao INT NOT NULL,
  CONSTRAINT fk_endereco_especialista FOREIGN KEY(FK_id_endereco)
    REFERENCES tbl_enderecos(id_endereco),
  CONSTRAINT fk_id_profissao FOREIGN KEY(FK_id_profissao)
    REFERENCES tbl_profissoes(id_profissao)
);
CREATE INDEX registro_unico ON tbl_especialistas(registro);
CREATE INDEX email_usuario ON tbl_especialistas(email);

-- -----------------------------------------------------
-- Table tbl_prontuarios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_prontuarios (
  id_prontuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_abertura DATE NOT NULL DEFAULT NOW(),
  FK_id_cliente INT NOT NULL,
  CONSTRAINT FK_id_cliente FOREIGN KEY(FK_id_cliente)
    REFERENCES tbl_clientes(id_cliente)
);

-- -----------------------------------------------------
-- Table tbl_atendimentos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_atendimentos (
  id_atendimento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_agendamento DATETIME NOT NULL,
  data_atendimento DATETIME NOT NULL,
  valor DECIMAL(6,2) NOT NULL,
  atendimento_status ENUM("Agendado", "Realizado", "Cancelado")DEFAULT "Agendado" NOT NULL,
  FK_id_prontuario INT NOT NULL,
  FK_id_especialista INT NOT NULL,
  CONSTRAINT FK_id_prontuario FOREIGN KEY(FK_id_prontuario)
    REFERENCES tbl_prontuarios(id_prontuario),
  CONSTRAINT FK_id_especialista FOREIGN KEY(FK_id_especialista)
    REFERENCES tbl_especialistas(id_especialista)
);
CREATE INDEX data_atendimento ON tbl_atendimentos(data_atendimento);

-- -----------------------------------------------------
-- Table tbl_prontuarioHistoricos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_prontuario_historicos (
  id_historico INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_historico DATE NOT NULL DEFAULT NOW(),
  hora_historico TIME NOT NULL  DEFAULT NOW(),
  descricao TEXT NOT NULL,
  FK_atendimento_historico INT NOT NULL,
  CONSTRAINT FK_prontuario_historico FOREIGN KEY(FK_atendimento_historico)
    REFERENCES tbl_atendimentos(id_atendimento)
);