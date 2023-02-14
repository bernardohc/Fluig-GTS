$("#criaUsuario").click(function(){
	var c1 = DatasetFactory.createConstraint("colleagueId", $("#login").val(), $("#login").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueName", $("#nome").val(), $("#nome").val(), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("login", $("#login").val(), $("#login").val(), ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("mail", $("#email").val(), $("#email").val(), ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("passwd", $("#senha").val(), $("#senha").val(), ConstraintType.MUST);

	//Array com filtro 
	var constraints = new Array(c1, c2, c3, c4, c5);
	
	//Cria o dataset
	DatasetFactory.getDataset("criaUser", null, constraints, null);
	
	FLUIGC.toast({
        message: 'Login para ' + $("#nome").val()+' criado' ,
        type: 'info'
    });
});

$("#adicionaAComunidade").click(function(){

	//Cria o json esperado pelo serviço
	var dados = { communityAlias : "mais-fluig", userAliases : [$("#login").val()]};
	
	//Requisição ajax que enviara ao servidor
	$.ajax({
		
		//Dados que serão enviados na requisição.
		//Converte em string,
		data: JSON.stringify(dados),
		//O Tipo de retorno
		dataType: 'json',
		//Url endereço de onde será enviada a requisição
		url: 'http://spon010108205:8082/api/public/2.0/communities/addUsers',
		//Tipo da requisição
		type: 'POST',
		//Tipo de dado que está enviando ao servidor
		contentType: 'application/json',
		//Retorno com sucesso
		success: function(result) {
			FLUIGC.toast({
		        message: 'Usuário adicionado na comunidade.' ,
		        type: 'warning'
		    });
		}
		
	});
	
});