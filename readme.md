# Projeto Meetapp - GoStack Bootcamp da Rocketseat

A aplicação desse Bootcamp é um app agragador de eventos para desenvolvedores
chamado Meetapp (um acrônimo à Meetup + App)

## Desafio 2 do Bootcamp

### Iniciando aplicação

- [x] Sucrase + Nodemon
- [x] ESLint + Prettier + EditorConfig
- [x] Sequelize (PostgresSQL)

### Funcionalidades

#### Cadastro e atualização de usuários

- [x] Permita que novos usuários se cadastrem em sua aplicação usando nome,
      email e senha.
- [x] Criptografe a senha do usuário para segurança
- [x] Para atualizar a senha, o usuário deve também enviar um campo de
      confirmação com a mesma senha
- [x] Realize a validação dos dados de entrada

#### Autenticação

- [x] A autenticação deve ser feita usando JWT

### Passos

- [x] Configurando estrutura
- [x] Nodemon & Sucrase
- [x] Configurando Docker
- [x] ESLint, Prettier & EditorConfig
- [x] Configurando Sequelize
- [x] Migration do usuário
- [x] Model de usuário
- [x] Loader de models
- [x] Cadastro de usuários
- [x] Gerando hash da senha
- [x] Autenticação JWT
- [x] Middleware da autenticação
- [x] Update do usuário
- [x] Validando dados de entrada

## Desafio 3 do Bootcamp

### Funcionalidades

#### Gerenciamento de arquivos

- [x] Crie uma rota para upload de arquivos que cadastra em uma tabela o caminho
      e nome do arquivo e retorna todos dados do arquivo cadastrado.

#### Gerenciamento de meetups

- [x] O usuário pode cadastrar meetups na plataforma com título do meetup,
      descrição, localização, data e hora e imagem (banner). Todos campos são
      obrigatórios. Adicione também um campo user_id que armazena o ID do usuário
      que organiza o evento.
- [ ] Não deve ser possível cadastrar meetups com datas que já passaram.
- [ ] O usuário também deve poder editar todos dados de meetups que ainda não
      aconteceram e que ele é organizador.
- [x] Crie uma rota para listar os meetups que são organizados pelo usuário
      logado.
- [ ] O usuário deve poder cancelar meetups organizados por ele e que ainda não
      aconteceram. O cancelamento deve deletar o meetup da base de dados.

#### Inscrição no meetup

- [ ] O usuário deve poder se inscrever em meetups que não organiza.
- [ ] O usuário não pode se inscrever em meetups que já aconteceram.
- [ ] O usuário não pode se inscrever no mesmo meetup duas vezes.
- [ ] O usuário não pode se inscrever em dois meetups que acontecem no mesmo
      horário.
- [ ] Sempre que um usuário se inscrever no meetup, envie um e-mail ao
      organizador contendo os dados relacionados ao usuário inscrito. O template do
      e-mail fica por sua conta :)

#### Listagem de meetups

- [ ] Crie uma rota para listar os meetups com filtro por data (não por hora),
      os resultados dessa listagem devem vir paginados em 10 itens por página.
      Abaixo tem um exemplo de chamada para a rota de listagem dos meetups:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

Nesse exemplo, listaremos a página 2 dos meetups que acontecerão no dia 01 de
Julho.

Nessa listagem retorne também os dados do organizador.

#### Listagem de inscrições

- [ ] Crie uma rota para listar os meetups em que o usuário logado está inscrito.
- [ ] Liste apenas meetups que ainda não passaram e ordene meetups mais próximos
      como primeiros da lista.

### Passos

- [x] Cofigurando Multer
- [x] Banner do meetup
- [x] Migration e model de meetup
- [x] Cadastro do meetup
- [x] Listando meetups do organizador
- [ ] Validações de cadastro do meetup
- [ ] Listando agendamentos do usuário
- [ ] Aplicando paginação
- [ ] Listando agenda do prestador
- [ ] Configurando MongoDB
- [ ] Notificando novos agendamentos
- [ ] Listando notificações do usuário
- [ ] Marcar notificações como lidas
- [ ] Cancelamento de agendamento
- [ ] Configurando Nodemailer
- [ ] Configurando templates de e-mail
- [ ] Configurando fila com Redis
- [ ] Monitorando falhas na fila
- [ ] Listando horários disponíveis
- [ ] Campos virtuais no agendamento
- [ ] Tratamento de exceções
- [ ] Variáveis ambiente
