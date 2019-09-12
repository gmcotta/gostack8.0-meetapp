# 11. Funcionalidade de inscrição nos meetups

Para fazermos a funcionalidade de fazer a inscrição para o meetup, primeiramente,
precisamos criar a tabela de inscrições. Vamos criar a migration para ela usando
o comando abaixo:

```
yarn sequelize migration:create --name=create-subscribers
```

Com o arquivo criado, vamos criar as tabelas id (igual às outras tabelas), users_id
(que referencia a tabela users), meetup_id (que referencia a tabela meetups),
created_at e updated_at (iguais às outras tabelas).

Feito isso, vamos rodar a migration com o comando

```
yarn sequelize db:migrate
```

Agora vamos criar o model de inscrição, criando um arquivo chamado Subscriber.js.
Vamos fazer uma classe Subscriber que herda a classe Model do sequelize, e dentro
dele, vamos fazer os métodos estáticos init e o associate. Repare que o primeiro
argumento é um objeto vazio, já que o id é preenchido automaticamente, e user_id
e meetup_id são preenchidos por causa da associação. Já o método associate faz
com que o modelo pertença ao model do usuário e do meetup. Por fim, vamos exportar
o model. Agora, vamos ao arquivo index.js e vamos adicionar o model no array de
models.

Com o model criado, vamos fazer o controller da inscrição. Criaremos o arquivo
SubscriberController.js, criaremos a classe SubscriberController e iremos adicionar
os métodos index e store apenas, adicionando uma resposta de ok neles. Em seguida,
vamos ao arquivo routes.js e vamos adicionar as seguintes rotas

```
routes.get('/subscription', SubscriberController.index);
routes.post('/subscription/:meetupId', SubscriberController.store);
```

Criadas as rotas, vamos ao Insomnia para adicioná-las. Vamos criar a pasta de
subscription e criar as rotas List com o método GET, e a Create com o método POST.
Vamos colocar o Bearer Token de um dos usuários, os endereços apropriados para
as rotas e vamos testá-las. Se der certo, as mensagem de ok aparecerão.

De volta ao controller, vamos fazer primeiro o método store. Vamos encontrar o
meetup referente ao id colocado no endereço e iremos fazer as seguintes validações:

- Se o usuário logado é o organizador do meetup. Iremos verificar se o id do usuário
  logado é o mesmo que o usuário que criou o meetup;
- Se o meetup já aconteceu. Iremos ver se a data do meetup é anterior à data atual;
- Se o usuário já se inscreveu no meetup. Iremos encontrar uma inscrição onde o
  id do meetup é o mesmo que o colocado no endereço, e o inscrito é o usuário logado;
- Se o usuário tenta se inscrever em dois meetups que ocorrem no mesmo tempo.
  Iremos encontrar uma incrição cujo usuário é o logado, e incluiremos o meetup
  cuja data seja igual à data do meetup que o usuário logado queira se inscrever.
  Se tudo passar na validação, finalmente, o usuário poderá se inscrever no meetup.

Por fim, vamos fazer o método index. Para isso, vamos encontrar todos os inscritos
cujo id seja igual ao usuário logado e incluiremos o meetup cuja data seja maior
e igual à data atual, e ordenaremos a partir da data, do mais próximo ao mais
distante (ascendente).
