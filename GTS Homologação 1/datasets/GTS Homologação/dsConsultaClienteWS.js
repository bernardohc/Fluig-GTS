function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSG");
	newDataset.addColumn("A1_COD");
	newDataset.addColumn("A1_LOJA");
	newDataset.addColumn("A1_NOME");
	newDataset.addColumn("A1_CGC");
	newDataset.addColumn("A1_MUN");
	newDataset.addColumn("A1_EST");
	newDataset.addColumn("A1_END");
	newDataset.addColumn("A1_BAIRRO");
	newDataset.addColumn("A1_CEP");
	newDataset.addColumn("A1_DESC");
	newDataset.addColumn("A1_RISCO");
	

    var a1Cod = '';
	var a1Loja = '';
    var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
    if(dsTemValor(dsClienteViaDadosAdicionais)){
    	a1Cod = dsClienteViaDadosAdicionais.getValue(0, "A1_COD");
    	a1Loja = dsClienteViaDadosAdicionais.getValue(0, "A1_LOJA");
    }
	
	try{
		// Conexao com webservice
		log.info(" ********* CONSULTA CLIENTE VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* CONSULTA CLIENTE VIA WS INICIO - passsouuu1 ************ " )

		var result = new Array();
		result = service.consultacliente(a1Cod, a1Loja);
		var result2 = new Array();
		result2 = result.getWSRETCONSULTACLIENTE();	
		
		
		for(var i=0; i < result2.size(); i++){
			
			newDataset.addRow(new Array(
							'1',
							'Sucesso',
							result2.get(i).getCOD(),
							result2.get(i).getLOJA(),
							result2.get(i).getNOME(),
							result2.get(i).getCGC(),
							result2.get(i).getMUN(),
							result2.get(i).getEST(),
							result2.get(i).getENDE(),
							result2.get(i).getBAIRRO(),
							result2.get(i).getCEP(),
							result2.get(i).getDESC(),
							result2.get(i).getRISCO(),
							"SUCCESS"
							
							));
		}
		
		log.info(" ********* CONSULTA CLIENTE VIA WS INICIO - passsouuu1 ************ " );
		
		
	} catch(erro) {		
		var error = "ERROR Consulta Cliente :  " + erro.message;
		log.info("ERROR Consulta Cliente : " + error);
//		newDataset.addRow(new Array("","","","","","", error ));
		newDataset.addRow(new Array("2", error));
		
//		return getDatasetError(erro, a1Cod, a1Loja);
		

	}
	return newDataset;
	
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}
function getDatasetError(exception, a1Cod, a1Loja) {
	
	var msgErro = "Erro ao consultar cliente: Cod. " +a1Cod+ " - Loja: "+a1Loja;
	var dtsError = DatasetBuilder.newDataset();
	 	dtsError.addColumn("ERROR");
	    dtsError.addRow([ msgErro ]);
	    
	return dtsError;
}
