# Validar senha do usuário expirada antes de permitir o login

## Caso de uso
Quero ter minha própria política de expiração de senha após um determinado número de dias e quero poder forçar o usuário a trocar de senha após o periodo determinado.
Sempre que o usuário for atualizado, um novo prazo de validade da senha é gerado no formulário de controle.

Neste exemplo, porque questões de segurança, as senhas históricas não são armazenadas e não é feito comparativo se a senha foi realmente alterada no evento de atualização do usuário.

## Técnicas abordadas
- Interceptação do login de um usuário
- Interceptação da alteração do cadastro de um usuário
- Uso de eventos globais
- Compartilhamento de função no contexto
- Criação e atualização de ficha via webservice SOAP

## Componentes utilizados
- afterUpdateUser
- beforeLogin
- Datasets (fluig_create_card e fluig_update_card)
- Serviço SOAP Fluig - ECMCardService (createCard e updateCardData)
- Formulário (politica_senha e controle_senha)

## Como instalar
- Publique o formulário "politica_senha" com o datasetname: fluig_politica_senha
- Publique o formulário "controle_senha" com o datasetname: fluig_controle_senha. Dica: Use como campo descritor o campo login, assim ficará mais organizado e fácil de encontrar pela navegação de documentos
- Crie uma ficha no formulário "politica_senha", informe a quantidade de dias e o número de documento do formulário "controle_senha"
- Altere no dataset "fluig_create_card" nas linhas 70 à 72 informando os valores adequados para cada parâmetro
- Altere no dataset "fluig_update_card" nas linhas 66 e 67 informando os valores adequados para cada parâmetro
- No painel de controle, cadastre um novo serviço SOAP com o nome ECMCardService usando o serviço do fluig <url fluig>/webdesk/ECMCardService?wsdl
- Publique os datasets (fluig_create_card e fluig_update_card).
- Você pode alterar quais usuários que deseja controlar o login atráves do método "usuarioComControleSenha" na linha 45 do evento beforeLogin.

## Como testar
-Altere algum usuário que se encaixe na regra definida na função "usuarioComControleSenha" do evento "beforeLogin", isso fará com que uma ficha seja criada para o usuário em questão no formulário "controle_senha".
-No formulário "controle_senha", no registro recém-criado, altere a validade da senha e salve a ficha.
-Tente efetuar login com o usuário definido.
-Caso a data tenha expirado, na tela de login será exibido: "Sua senha expirou! Utilize a função 'Esqueci minha senha' para redefini-la".
-Quando o usuário redefinir a senha, o evento "afterUpdateUser" é disparado e atualizada a data de validade da senha.

## Em caso de problema/Troubleshooting e observações
- ATENÇÃO: Caso você libere um código quebrado no evento "beforeLogin" não será possível autenticar no TOTVS Fluig Plataforma, revise bem o seu código e trabalhe de forma adequeada a captura de erros.
- Esse exemplo não funciona em conjunto com TOTVS Identity
- Esse exemplo é limitado aos usuários que são editados após a criação do evento afterUpdateUser e não funcionará automaticamente para todos os usuários. No arquivo beforeLogin você pode habilitar para todos os usuários (mas ainda validará o que foi definido no método "usuarioComControleSenha" - e poderá impedir temporariamente futuros logins mesmo para exportar os eventos, já que vai bloquear o login do administrador também)