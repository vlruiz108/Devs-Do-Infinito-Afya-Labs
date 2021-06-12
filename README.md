
![GitHub repo size](https://img.shields.io/github/repo-size/vlruiz108/Devs-Do-Infinito-Afya-Labs?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/vlruiz108/Devs-Do-Infinito-Afya-Labs?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/vlruiz108/Devs-Do-Infinito-Afya-Labs?style=plastic)
![GitHub](https://img.shields.io/github/license/vlruiz108/Devs-Do-Infinito-Afya-Labs?style=plastic)
![NPM](https://img.shields.io/npm/l/express?style=plastic)

# Devs-Do-Infinito-Afya-Labs

## :busts_in_silhouette: Autores
- [Ana Vitória](https://github.com/gleyson-gama)
- [Felipe Spuza](https://github.com/FelipeSSac)
- [João Pedro Fiorelli](https://github.com/JoaoFiorelli)
- [Luis Felipe Santos](https://github.com/LFelipe-sb)
- [Vanessa Ruiz](https://github.com/vlruiz108)



## 🎯 Desafio: Criar um sistema para um consultório controlar o cadastro de seus clientes, atendimentos e prontuário dos pacientes.

### :round_pushpin:🔚 Back-end

🚀 Modelagem de dados para: criação de usuário, cadatro de clientes, cadastro de especialistas, cadastro de profissão, lançamento de dos atendimentos,
registro de protuario e registro de histórico.

:grey_exclamation: Regra de Negócio
1. O campo login pode conter caracteres com até 20 caracteres
2. Não poderá ser duplicado os campos cpf do cliente, registro do especialista e login do usuario.
3. Todo cadastro de cliente e especialista precisará de um endereço.
4. Todo Atendimento Médico com Status = REALIZADO deverá gerar um registro de histórico no prontuário do paciente.
5. Disponibilizar uma consulta dos atendimentos pelos parâmetros: Data Agendamento, Data Atendimento, Cliente, Status e Especialista.


Tabela de conteúdos
=================

<!--ts-->
   * [Backend](#Backend)
   * [Features](#features)
   * [Instalação](#instalacao)
   * [Como rodar a aplicação](#como-rodar-a-aplicacao)
   * [Como executar a suíte de testes](#como-executar-a-suite-de-testes)
   * [Como executar a OpenApi](#como-executar-a-openapi)
   * [Tecnologias](#tecnologias)
   * [Relacionado](#relacionado)
<!--te-->

<h4 align="center"> 
	🚧  Application Select 🚀 Em construção...  🚧
</h4>

### :round_pushpin: Features

- [x] Criação de usuário
- [x] Cadatro de clientes
- [x] Cadastro de especialistas
- [x] Cadastro de profissão
- [x] Lançamento de dos atendimentos
- [x] Registro de protuario
- [x] Registro de históricos

### :round_pushpin: Instalação

Pré requisitos
Git: [Git](https://git-scm.com)

Instalar o Node: [Node](https://nodejs.org)

Instalar Visual Studio Code: [Visual Studio Code](https://code.visualstudio.com/download)

Instalar MySql: [MySql](https://www.mysql.com/downloads/)

Instalar MySql Workbench: [MySql Workbench](https://dev.mysql.com/downloads/workbench/)

### Como rodar a aplicação

Certifique de ter um arquivo .env na pasta raiz com as configurações de banco de dados.

:triangular_flag_on_post: Instale as Dependências
  
  ```bash
  yarn build
  ```
  ```bash
  npm run build
  ```
  
  - Iniciar a aplicação

  ```bash
  yarn start
  ```
   ```bash
  npm start
  ```

### Como executar a suíte de testes

  - [Certifique-se de que executou os comandos anteriores](#como-rodar-a-aplicação)
  
  - Agora execute
  
  ```bash
  yarn test
  ```
  ```bash
  npm test
  ```

### Como executar a OpenApi
[![dependencies Status](https://status.david-dm.org/gh/swagger-api/swagger-editor.svg)](https://david-dm.org/swagger-api/swagger-editor)


Instalação
```bash
npm install -g swagger
```
Uso
```
swagger-markdown [-h] [-v] -i [-o] [--skip-info]

Options:
  -h, --help      Show this help message and exit.
  -v, --version   Show program's version number and exit.
  -i , --input    Path to the swagger yaml file
  -o , --output   Path to the resulting md file
  --skip-info     Skip the title, description, version etc, whatever is in the info block.

```

Npx (não requer instalação)

```bash
npx swagger-markdown -i ./basic-auth.yaml
```

Exemplo


```bash
swagger-markdown -i path/to/swagger/file.yaml
```

Por padrão, ele criará o novo arquivo no mesmo diretório com o mesmo nome do arquivo swagger, mas com a extensão .md. 

Portanto, se o arquivo swagger for colocado no project/api-doc/swagger.yamlnovo arquivo será criado comoproject/api-doc/swagger

Você também pode usá-lo como um script npm em seu package.json:

```bash
npm i --save-dev swagger-markdown
```

```json
{
    "scripts": {
        "md-docs": "swagger-markdown -i path/to/swagger.yaml",
        //...
    }
}
```

```bash
npm run md-docs
```
### Relacionado


* [https://devs-agmed-afya.herokuapp.com](https://devs-agmed-afya.herokuapp.com)

![logo AGMed](https://github.com/vlruiz108/Devs-Do-Infinito-Afya-Labs/blob/main/Logo.PNG)












