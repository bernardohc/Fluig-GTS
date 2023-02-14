function displayFields(form,customHTML){
	
	var usuario    =  getValue('WKUser');
	
	var nome = form.getValue("nome");
	var email = form.getValue("email");
	var perfil = form.getValue("perfil");
	var linkedin = form.getValue("linkedin");
	
	
	var interacao = '<h1>Oi, <b>'+usuario+'</b>, o <b>'+nome+'</b> deseja trabalhar conosco!</h1><br>'+
					'<h3>O seu perfil é <b>'+perfil+'.</b> E você pode conferir seu curriculum completo no <b>Linkedin</b>.<br>'+
					'Você também pode entrar em contato pelo e-mail: <b>'+email+'</b>.<br><br>'+
					'Obrigado!</h3>'

	customHTML.append('<script>$("#mensagemInteracao").append("'+interacao+'")</script>');
	customHTML.append('<script>$("#mensagemInteracao").show(); $("#formPrincipal").hide();</script>');
}