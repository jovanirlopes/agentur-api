# Agentur
Agentur é um sistema de agenda de eventos, onde os usuários podem ver a lista de eventos do municipio.
## Instalação
Após clonar o repositório crie um arquivo .env seguindo o padrão do arquivo .env.example

Para instalar use o comando:
```
npm -i
```
Para rodar as migrations e criar as tabelas use o comando:
```
node ace migration:run
```

Para iniciar a aplicação em mode desenvolvimento utilize o comando:
```
node ace serve --watch
```

Para buildar a aplicação para produção utilize o comando:

```
node ace build --production
```

Para iniciar a aplicação em produção utilize o comando:
```
node server.js
```
