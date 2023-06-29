# GuiaPress

Esta aplicação é um blog construído usando o framework Express.js e é responsável por fornecer funcionalidades relacionadas a categorias, artigos e usuários.

## Funcionalidades

A aplicação oferece as seguintes funcionalidades:

### Categorias

- Listar todas as categorias: A rota `/categories` retorna todas as categorias cadastradas no banco de dados.
- Visualizar artigos por categoria: A rota `/categories/:slug` exibe todos os artigos pertencentes a uma determinada categoria com base em seu slug.

### Artigos

- Visualizar um artigo: A rota `/:slug` permite visualizar um artigo específico com base em seu slug.

### Usuários

- Registro de usuário: A aplicação possui rotas para o registro de usuários, embora os detalhes exatos não estejam especificados no código fornecido.

## Configuração

Antes de executar a aplicação, é necessário configurar o ambiente:

1. Banco de dados: A aplicação requer uma conexão com o banco de dados. Verifique se as credenciais e detalhes de conexão estão corretamente configurados no arquivo `./database/database.js`.

2. Dependências: Certifique-se de ter todas as dependências necessárias instaladas. Você pode usar o npm (Node Package Manager) para instalar as dependências listadas no arquivo `package.json`. Execute o seguinte comando para instalar as dependências:
   ```
   npm install
   ```

3. Servidor: A aplicação é executada no servidor Express.js na porta `8080`. Certifique-se de que a porta `8080` esteja disponível em seu ambiente antes de iniciar o servidor.

## Executando a aplicação

Após configurar o ambiente, você pode iniciar a aplicação executando o seguinte comando:

```
node app.js
```

Após iniciar o servidor, você poderá acessar a aplicação em `http://localhost:8080/` em seu navegador.

## Observações

- A aplicação usa o template engine EJS para renderizar as visualizações. Os arquivos de visualização estão localizados na pasta `views/`.
- O código fornecido é apenas uma parte da aplicação completa. Provavelmente existem outros arquivos e funcionalidades relacionadas não incluídas aqui.
- Esta documentação foi gerada com base no código fornecido e pode não abranger todas as funcionalidades e detalhes da aplicação. Certifique-se de consultar a documentação completa ou o código-fonte fornecido para obter mais informações.
