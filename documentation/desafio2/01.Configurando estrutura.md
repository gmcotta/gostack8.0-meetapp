# 1. Configurando estrutura

Primeiramente, no terminal, inicie o projeto usando o comando

```
yarn init -y
```

Depois, instalar o Express:

```
yarn add express
```

Criar, na raiz do projeto, uma pasta chamada src. Nela vai ficar todo o código
da aplicação.

Dentro da pasta src, criar três arquivos:

- app.js
- server.js
- routes.js

O arquivo app.js será responsável por criar o servidor da aplicação.
O arquivo server.js será responsável por definir a porta do servidor.
O arquivo routes.js será responsável por guardar as rotas da aplicação.

Teremos o seguinte fluxo no arquivo app.js:

- Importar o express e o arquivo de rotas (routes.js);
- Criar uma classe principal;
- Inicializar o servidor;
- Criar um método para os middlewares da aplicação e fazer com que a aplicação
  receba as requisições no formato JSON;
- Criar um método para as rotas e fazer com que a aplicação acesse as rotas
  pelo arquivo routes.js;
- Exportar o servidor.

E no arquivo server.js, teremos apenas que importar o arquivo app.js e definir
a porta do servidor, que será a 3333

É bom fazer a separação entre os arquivos app.js e server.js pois, quando for a
hora de realizar os testes da aplicação, não será necessário rodá-la através da
porta definida pelo desenvolvedor, os testes poderão ser feitos apenas na classe
principal do arquivo app.js.

Finalmente, o arquivo routes.js terá o seguinte fluxo:

- Importar o Router do Express;
- Instanciar o Router;
- Criar uma rota (método GET) para testar a aplicação;
- Exportar a rota.

Para verificar se a aplicação está funcionando, basta escrever o comando no
terminal:

```
node src/server.js
```

E, no browser, acessar:
http://localhost:3333
