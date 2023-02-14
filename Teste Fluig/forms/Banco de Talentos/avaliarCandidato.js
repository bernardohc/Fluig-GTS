//Variavel oara salvar o xml
var _xml;

//Executa ao clicar no botão do formulário
$("#avaliarCandidato").click(function() {
	//Requisição ajax
	$.ajax({
		//Tipo de sincronização sincrona
		async: false,
		//Tipo 
		type: "GET",
		//Tipo de dado do retorno
		dataType: "xml",
		//Url para requisição
		url: "xml/ECMWorkflowEngineService.xml",
		//Se der certo, pegamos o retorno da requisição
		success: function(ret) {
			//Printa no log o xml
			console.log(ret);
			//Atribui o xml a variavel
			_xml = $(ret);
		}
	});

	//Precisamos acessar as tags através do paramentro .find e seta o valor obtido na tag input
	_xml.find("[name=nome]").text($("#nome").val());
	_xml.find("[name=linkedin]").text($("#linkedin").val());
	_xml.find("[name=perfil]").text($("#perfil").val());
	_xml.find("[name=email]").text($("#email").val());

	//Utilizando a WCMAPI e criando a requisição atarvés do parent
	parent.WCMAPI.Create({
		//Url da requisição, 
		url: "/webdesk/ECMWorkflowEngineService?wsdl",
		//tipo do conteudo
		contentType: "text/xml",
		//tipo do dado
		dataType: "xml",
		//arquivo xml manipulado com indice [0]
		data: _xml[0],
		//Se der tudo certo mostra no log e tela o processo inicado através da função toast
		success: function(data) {
			FLUIGC.toast({
		        title: 'Processo Iniciado! ',
		        message: 'Continue a Avaliação de ' + $("#nome").val()+'.' ,
		        type: 'info'
		    });
		}
	});
});