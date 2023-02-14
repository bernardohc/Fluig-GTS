function displayFields(form,customHTML){

    //caputra o usuário ativo
    var usuario = getValue("WKUser");

    //captura os dados dos campos
    var nome = form.getValue("nome");
    var email = form.getValue("email");
    var telefone = form.getValue("telefone");
    var dataNascimento = form.getValue("dataNascimento");
    var documentoIdentidade = form.getValue("documentoIdentidade");


    var interacao = '<h1>Olá <b>'+usuario+'</b>. O <b>'+nome+'</b>, deseja compartilha conosco seus dados.</h1><br>' 
    '<h3>Seu e-mail é <b>'+email+'</b> e seu telefone <b>'+telefone+'</b>, sua data de nascimento é <b>'+dataNascimento+'</b> e sua identidade '+documentoIdentidade+'.</h3>'

    //Custom html faze um apenda no html, mostrando a mensagem de interecao
    customHTML.append('<script>$("#mensagemInteracao").append("'+interacao+'")</script>');
    //Esconde a div
    customHTML.append('<script>$("#mensagemInteracao").show();$("'+dadosPessoais+'").hide();</script>');

 }