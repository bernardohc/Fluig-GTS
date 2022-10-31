function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CLICOD");
	newDataset.addColumn("CLILOJA");
	newDataset.addColumn("CLINOME");
	newDataset.addColumn("CLICGC");
	newDataset.addColumn("CLIINSCR");
	newDataset.addColumn("CLIDESCONTO");
	newDataset.addColumn("CLICEP");
	newDataset.addColumn("CLIENDE");
	newDataset.addColumn("CLIBAIRRO");
	newDataset.addColumn("CLICOMPL");
	newDataset.addColumn("CLIEST");
	newDataset.addColumn("CLIMUN");
	newDataset.addColumn("CLIEMAIL");
	newDataset.addColumn("CLIDDDTELEFONE");
	newDataset.addColumn("CLITELEFONE");
	
	try{
		
		var CLICGC  = '';
		var CLIINSCR  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'CLICGC' ) {
				CLICGC = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'CLIINSCR' ) {
				CLIINSCR = constraints[i].initialValue;
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
		result = metodosWSORCMAQ.getcliente(CLICGC, CLIINSCR);
		
		var CODRET = result.getWSRETCLI().get(0).getCODRET();
		if(CODRET == '1'){
				
			newDataset.addRow(new Array('1',
									'Sucesso',
									result.getWSRETCLI().get(0).getCOD(),
									result.getWSRETCLI().get(0).getLOJA(),
									result.getWSRETCLI().get(0).getNOME(),
									result.getWSRETCLI().get(0).getCGC(),
									result.getWSRETCLI().get(0).getINSCR(),
									result.getWSRETCLI().get(0).getDESC(),
									result.getWSRETCLI().get(0).getCEP(),
									result.getWSRETCLI().get(0).getENDE(),
									result.getWSRETCLI().get(0).getBAIRRO(),
									result.getWSRETCLI().get(0).getCOMP(),
									result.getWSRETCLI().get(0).getEST(),
									result.getWSRETCLI().get(0).getMUN(),
									result.getWSRETCLI().get(0).getEMAIL(),
									result.getWSRETCLI().get(0).getDDD(),
									result.getWSRETCLI().get(0).getFONE()
									));
			     
			
		}else{
			var MSGRET = result.getWSRETCLI().get(0).getMSGRET();
			newDataset.addRow(new Array('2', MSGRET));
		}
		
    }catch(erro){    
    	log.info("Pedido Máqina: erro na busca de cliente: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}