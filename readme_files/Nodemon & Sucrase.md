# 2. Nodemon & Sucrase

O objetivo do Sucrase é fazer com que as sintaxes de importação e exportação das
novas versões do JS sejam aplicáveis na aplicação.

E o objetivo do Nodemon é fazer com que o servidor reinicie automaticamente
quando for feita uma alteração no código.

Para instalar o Nodemon e o Sucrase, basta colocar no terminal o código:

```
yarn add sucrase nodemon -D
```

O -'D'faz com que as dependências sejam adicionadas na parte de desenvolvimento.

Agora, para a importação, fazer as seguintes alterações:

```
const <Nome> = require(<Módulo>);
```

para

```
import <Nome> from <Módulo>;
```

E para a exportação:

```
moudule.exports = <Nome>;
```

para

```
export default <Nome>;
```

Se você quiser ver se está funcionando direitinho, basta parar a aplicação e
digitar no terminal o comando

```
yarn sucrase-node src/server.js
```

Para que o Nodemon funcione junto com o Sucrase, é necessário alterar o arquivo
package.json.
No arquivo package.json, adicionar uma chave chamada "scripts" e o seu valor será
outro objeto contendo uma chave "dev" e valor "nodemon src/serverjs".
Porém, ao tentar executar a aplicação através do comando

```
yarn dev
```

Dará um erro devido à sintaxe de importação/exportação, pois o Sucrase não foi
"ativado". Para fazer com que ele funcione, é necessário criar um arquivo chamado
nodemon.json e, dentro dele, colocar o seguinte JSON:
{
"execMap": {
"js": "sucrase-node",
},
}

Ou seja, para os arquivos .js, a parte nodemon será substituída por sucrase-node.

Agora, ao rodar o comando

```
yarn dev
```

a aplicação funcionará corretamente.
