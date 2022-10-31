function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("REVENDA");
	newDataset.addColumn("CIDADE");
	newDataset.addColumn("UF");
	newDataset.addColumn("TELEFONE");
	newDataset.addColumn("DATAVENDA");
	
	try{
		
		var PROCOD  = '';
		var UFREV  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'PROCOD' ) {
				PROCOD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'UF' ) {
				UFREV = constraints[i].initialValue;
			}
		}
		
		// Conexao com webservice
		log.info(" ********* CONSULTA ESTOQUE REVENDA VIA WS INICIO ************ " )
		var periodicService = ServiceManager.getService('WSORCFLUIG');
		var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate('br.com.protheus.WSORCFLUIG');
		var service = serviceLocator.getWSORCFLUIGSOAP();
		log.info(" ********* CONSULTA ESTOQUE REVENDA VIA WS INICIO - passsouuu1 ************ " )
		var result = new Array();
		result = service.histproduto(PROCOD, UFREV);
		
		for(var i=0; i < result.getWSRETHISTPRODUTO().size(); i++){
			var CODRET = result.getWSRETHISTPRODUTO().get(i).getCODRET();
			if(CODRET == '1'){
				newDataset.addRow(new Array('1',
										'Sucesso',
										result.getWSRETHISTPRODUTO().get(i).getNOMEREV(),
										result.getWSRETHISTPRODUTO().get(i).getCIDADE(),
										result.getWSRETHISTPRODUTO().get(i).getESTADO(),
										result.getWSRETHISTPRODUTO().get(i).getTELEFONE(),
										result.getWSRETHISTPRODUTO().get(i).getEMISSAO()
										
										));
				
			}else{
				var MSGRET = result.getWSRETPRD().get(0).getMSGRET();
				newDataset.addRow(new Array('2', MSGRET));
			}
		}
		
    }catch(erro){    
    	log.info("Estoque Revenda - erro : " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}