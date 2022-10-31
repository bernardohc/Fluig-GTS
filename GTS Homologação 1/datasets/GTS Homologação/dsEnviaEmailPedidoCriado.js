function defineStructure() {
	addColumn("COK");
}
function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	var paraTo  = "";
	var numPedido = "";
	var idFluig = "";
	var gestorEstado = "";

	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'paraTo' ) {
			paraTo = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'numPedido' ) {
			numPedido = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'idFluig' ) {
			idFluig = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'gestorEstado' ) {
			gestorEstado = constraints[i].initialValue;
		}
	}
	
	newDataset.addColumn("COK");
	
	try{
		// Conexao com webservice
		log.info(" ********* ENVIA EMAIL PEDIDO CRIADO VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* ENVIA EMAIL PEDIDO CRIADO VIA WS INICIO - passsouuu1 ************ " )

		var result = new Array();
		result = service.enviaemailpedidocriado( paraTo, numPedido, idFluig, gestorEstado);
		var result2 = new Array();
		result2 = result.getWSRETENVIAEMAILPEDIDOCRIADO();	

		for(var i=0; i < result2.size(); i++){
			newDataset.addRow(new Array(
							result2.get(i).getCOK(),
							"SUCCESS"
							));
		}

	} catch(erro) {		
		var error = "ERROR ENVIA EMAIL PEDIDO CRIADO :  " + erro.message;
		log.info("ERROR ENVIA EMAIL PEDIDO CRIADO : " + error);
		newDataset.addRow(new Array("", error ));
		
	}
	
	return newDataset;
}