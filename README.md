# 🚀 Plataforma Microservice — Grupag

Este repositório contém uma base sólida para desenvolvimento de APIs seguras, escaláveis e performáticas com **Node.js**, **Express**, **TypeScript** e arquitetura **Clean Architecture** orientada a domínio.

> Desenvolvido e mantido por [AviaIT](https://aviait.com.br)

## 📌 Visão Geral

Este boilerplate foi desenhado para acelerar o desenvolvimento de APIs robustas com:

- Segurança por padrão (JWT, CORS, Rate Limit, Helmet)
- Cache e Decorators com Redis
- Logger com Tracer automáticos
- Upload com compressão e envio para S3
- Mensageria com RabbitMQ
- Repositórios genéricos com TypeORM e suporte a MongoDB
- Documentação Swagger gerada automaticamente com decorators
- Workers dedicados e desacoplados
- Testes automatizados

## 🗂️ Estrutura de Pastas

```
.
├── @types                    # Tipagens globais e customizações do Express
├── shared                    # Provedores, logger, tracer, cache, storage, etc.
│   ├── core                  # Logger e tracer
│   ├── dtos/errors           # DTOs de erros
│   ├── providers             # Redis, Mail, OpenSearch, Storage, TypeORM
│   ├── container             # Inversão de dependência (tsyringe)
│   ├── http/docs             # Geração de Swagger via decorators
│   ├── generic/repositories  # GenericRepository, helpers e auditLogger
│   ├── messaging             # RabbitMQ: producer, consumer e handlers
├── main
│   ├── app.ts                # Criação da aplicação Express
│   ├── bootstrap.ts          # Inicialização da aplicação
│   ├── bootstrapWorker.ts    # Inicialização dos workers
│   ├── server.ts             # Entrada principal
│   ├── http/middlewares      # Middlewares globais
│   ├── http/routes           # Rotas agrupadas por domínio
│   ├── workers               # Worker genérico
├── modules                   # Domínios da aplicação (auth, users, mail)
│   ├── example
```

## 🛠️ Requisitos

- Node.js v18+
- Yarn
- Docker
- PostgreSQL, MongoDB, Redis, RabbitMQ (ou use as imagens Docker)

## ⚙️ Instalação

```bash
git clone https://github.com/aviait/
cd plataforma-microservice
yarn install
cp .env.example .env
```

Configure suas variáveis de ambiente no `.env`.

## ▶️ Executando o Projeto

### Desenvolvimento

```bash
yarn dev
```

### Produção

```bash
yarn build
yarn start
```

### Worker (RabbitMQ)

```bash
yarn start:worker
```

## 🧪 Testes

```bash
yarn test
```

## 📄 Documentação Swagger

Este projeto possui decorators para geração de documentação Swagger em tempo de desenvolvimento.

```bash
yarn generate:swagger
```

Acesse:

```
http://localhost:3333/docs
```

## Health Check

O endpoint `GET /health` retorna `{ "status": "ok" }` e pode ser usado para verificacao de disponibilidade.

## 📥 Uploads

- Uploads são tratados com `multer` + `sharp`, enviados para o S3 e comprimidos em `.webp`
- Os arquivos podem ser acessados publicamente via `https://{BUCKET}.s3.amazonaws.com/{path}`

## 🗃️ Cache com Redis

Você pode usar decorators:

```ts
@Cacheable({ key: 'users:list', ttl: 60 })
async findUsers() { ... }

@InvalidateCacheOnSuccess(['users:list'])
async createUser() { ... }
```

## 📊 Tracer e Logs

Todos os logs possuem os seguintes headers rastreados automaticamente:

- `x-igua-transaction-id`
- `x-plataform`
- `x-app-version`
- `x-igua-user-ip`

## 🧵 RabbitMQ (Mensageria)

- `MailConsumer.ts`: escuta filas de envio de e-mails
- `userCreated.handler.ts`: handler para eventos internos
- `RabbitMQProducer.ts`: envio de mensagens para filas

## 📚 Arquitetura Clean

- `modules`: separação por domínio (ex: `users`, `auth`)
- `application/useCases`: casos de uso isolados
- `domain/entities` e `domain/dtos`: regras de negócio
- `infra/repositories`: integração com banco

## 📬 Contato

Desenvolvido com ❤️ pela equipe da **AviaIT**

- 🌐 [aviait.com.br](https://aviait.com.br)
- 📧 contato@aviait.com.br

## 🪪 Licença

Distribuído sob a Licença MIT. Veja [LICENSE](./LICENSE) para mais informações.
