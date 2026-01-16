# SimpleBiz Manager

Sistema de gestão para pequenas empresas, com backend robusto em Java/Spring Boot e frontend moderno em React.

[![Java](https://img.shields.io/badge/Java-17-blue)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.9-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📌 Tabela de Conteúdos

- [Sobre o Projeto](#sobre-o-projeto)  
- [Tecnologias](#tecnologias)  
- [Funcionalidades](#funcionalidades)  
- [Instalação](#instalação)  
- [API / Swagger](#api--swagger)  
- [Autenticação](#autenticação)  
- [Exemplos de Requisições](#exemplos-de-requisições)  
- [Contribuindo](#contribuindo)  
- [Licença](#licença)  

---

## Sobre o Projeto

O **SimpleBiz Manager** é um sistema completo para gerenciar clientes e produtos de pequenas empresas.  
Ele possui autenticação segura com JWT, controle de roles (ADMIN / USER), validação de dados, paginação e ordenação, além de documentação completa da API via Swagger.

> Este projeto é ideal para portfólio e demonstração de habilidades em backend e frontend fullstack.

---

## Tecnologias

**Backend:**
- Java 17
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Swagger / OpenAPI

**Frontend:**
- React
- Axios
- React Router
- Dashboard simples e responsivo

---

## Funcionalidades

- Cadastro e login de usuários com JWT  
- Controle de acesso por roles (ADMIN / USER)  
- CRUD de clientes e produtos  
- Validação de dados e email único  
- Paginação e ordenação de resultados  
- Documentação da API via Swagger

---

## Instalação

### Backend

1. Clone o repositório:

```bash
git clone https://github.com/Adriel-Rocha/simplebiz-manager.git
cd simplebiz-manager
```
2. Configure o application.properties com seu banco MySQL:

```bash
Properties
spring.datasource.url=jdbc:mysql://localhost:3306/simplebiz?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
```
3. Rode a aplicação:

```bash
./mvnw spring-boot:run
```
### Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```
2. Instale dependências e rode:

```bash
npm install
npm start
```

---

## API / Swagger
A **documentação completa da API** pode ser acessada via Swagger:

```bash
http://localhost:8080/swagger-ui/index.html
```
---

## Autenticação
- Endpoint de login:
```bash
/auth/login
```
- Retorna um JWT que deve ser enviado no header de todas as requisições protegidas:
  
```bash
Authorization: Bearer <TOKEN>
```
- Roles disponíveis:
  - ADMIN → acesso completo
  - USER → acesso limitado (leitura)

---

## Exemplos de Requisições

**Login**

```bash
Http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@simplebiz.com",
  "password": "123456"
}
```
**Criar Cliente (ADMIN)**

```bash
Copiar código
Http
POST /clients
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "123456789"
}
```
**Listar Clientes com Paginação**

```bash
Http
GET /clients?page=0&size=10&sort=name,asc
Authorization: Bearer <TOKEN>
```

---

## Contribuindo
**Pull requests são bem-vindos!**
- Para alterações significativas, abra uma issue antes de enviar PR.

---

## Licença
**MIT © Adriel Rocha**


---
