function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("REVCOD");
	newDataset.addColumn("REVLOJA");
	newDataset.addColumn("REVNOME");
	newDataset.addColumn("REPCOD");
	newDataset.addColumn("REPMATRICULA");
	newDataset.addColumn("REPNOME");
	newDataset.addColumn("REPEMAIL");
	
	
	try{
		
		var REVCOD  = '';
		var REVLOJA  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'REVCOD' ) {
				REVCOD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'REVLOJA' ) {
				REVLOJA = constraints[i].initialValue;
			}
		}
		
		var properties = {};
//		properties["basic.authorization"] = "true";
//		properties["basic.authorization.username"] = "admin";
//		properties["basic.authorization.password"] = "pass123root!@#";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; //milissegundos 300000 igual a 5 minutos
		
//		log.info('properties');
//		log.dir(properties);
		
		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service, "br.com.protheus.WSORCMAQSOAP", properties);

		var result = new Array();
		result = metodosWSORCMAQ.getresprev(REVCOD, REVLOJA);
		
		var CODRET = result.getWSRETRESP().get(0).getCODRET();
		if(CODRET == '1'){
				
			newDataset.addRow(new Array('1',
									'Sucesso',
									result.getWSRETRESP().get(0).getCODCLI(),
									result.getWSRETRESP().get(0).getLOJACLI(),
									result.getWSRETRESP().get(0).getNOMEREV(),
									result.getWSRETRESP().get(0).getVENDCOD(),
									result.getWSRETRESP().get(0).getVENDMAT(),
									result.getWSRETRESP().get(0).getVENDNOME(),
									result.getWSRETRESP().get(0).getVENDMAIL()
									
									));

		}else{
			var MSGRET = result.getWSRETRESP().get(0).getMSGRET();
			newDataset.addRow(new Array('2', MSGRET));
		}
		
    }catch(erro){    
    	log.info("Pedido Máqina: erro na busca de Representante da Revenda: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}