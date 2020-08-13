# RECUPERAÇÃO DE SENHA
**RF**
- O usuário deve poder recuperar a sua senha informando o seu e-mails;
- O usuário deve receber um e-mails com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;    
**RNF**
- Utilizar Mailtrap para testar envio de e-mails em ambiente de desenvolvimento;
- Utilizar Amazon SES para envio em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**RN**
-
- O link enviado por e-mails para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# ATUALIZAÇÃO DO PERFIL
**RF**
- O Usuario deve poder atualizar seu perfil(nome, email, senha)
**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usário precisa confirmar a nova senha;

# PAINEL DO PRESTADOR

**RF**
- O usuário deve poder listar seus agendamentos de um dia especifico;
- O Prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Soket.io;

**RN**

- A natificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# AGENDAMENTO DE SERVIÇOS
**RF**
- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo um horário disponivel de um prestador;
- O usuário deve poder listar horários disponíveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;


**RNF**
- A listagem de prestadores deve ser armazenada em cache;



**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O Usuário não pode agendar em um horario já ocupado;
- O usuário não pode agendar em um horario que já passou;
- O usuário não pode agendar serviços consigo mesmo;

