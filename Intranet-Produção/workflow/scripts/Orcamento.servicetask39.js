function servicetask39(attempt, message) {
	
	/*
	 * Pega o email que esta no Fluig do gerente da revenda pelo campo gerenteRevenda
	 * 
	 */
	var WKCompany = getValue("WKCompany")
	var WKUserGerente =  hAPI.getCardValue('gerenteRevenda');
	var c1 = DatasetFactory.createConstraint("colleaguePK.companyId", WKCompany, WKCompany, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", WKUserGerente, WKUserGerente, ConstraintType.MUST);

	var colunasColleague = new Array('mail','colleagueName');
	var datasetColleague = DatasetFactory.getDataset('colleague', colunasColleague, new Array(c1, c2), null);
	
	/*
	 * Passa as constraints para o dataset, para que seja possível
	 */
	var paraTo = datasetColleague.getValue(0, "mail");
	var numPedido = hAPI.getCardValue('numPedido');
	var idFluig = getValue('WKNumProces');
	var gestorEstado = hAPI.getCardValue('gestorEstado');
	
	
	if(paraTo != ""){
		var c1 = DatasetFactory.createConstraint("paraTo", paraTo, paraTo, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("numPedido", numPedido, numPedido, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("idFluig", idFluig, idFluig, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("gestorEstado", gestorEstado, gestorEstado, ConstraintType.MUST);
		
		
		var constraints = new Array(c1, c2, c3, c4);
		var dataset = DatasetFactory.getDataset("dsEnviaEmailPedidoCriado", [], constraints, []);
		var envioOK = '';
		for (var i = 0; i < dataset.rowsCount; i++) {
			envioOK = dataset.getValue(i, "COK");
		}

		if(envioOK == ''){
			throw 'Não enviou o email do pedido de venda';
		}
	}else{
		throw 'Não encontrou o email do gerente da revenda';
	}
	
}