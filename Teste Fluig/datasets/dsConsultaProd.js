function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("PROCOD");
	newDataset.addColumn("PRODESC");

	
	try{
		var PROCOD  = 'IDC002000247';
		var PROQTD  = 1;
		var PROPORCDESC  = 0;
		var PROPRCUNIT  = '';
		var TABPRECO = '011';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'PROCOD' ) {
				PROCOD = constraints[i].initialValue;
			}
		}
		
		var properties = {};
//		properties["basic.authorization"] = "true";
//		properties["basic.authorization.username"] = "admin";
//		properties["basic.authorization.password"] = "pass123root!@#";
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";
		properties["receive.timeout"] = "300000"; //milissegundos 300000 igual a 5 minutos
		
		
		var supplierService = ServiceManager.getService('WSORCMAQ');
		var serviceHelper = supplierService.getBean();
		var serviceLocatorWSORCMAQ = serviceHelper.instantiate('br.com.protheus.WSORCMAQ');
		var service = serviceLocatorWSORCMAQ.getWSORCMAQSOAP();
		var metodosWSORCMAQ = supplierService.getCustomClient(service, "br.com.protheus.WSORCMAQSOAP", properties);

		
		var result = new Array();
		result = metodosWSORCMAQ.getproduto(PROCOD, PROQTD, PROPORCDESC, TABPRECO, PROPRCUNIT);
		
		
//		for(var i=0; i < result.getWSRETPRD().size(); i++){
//			var CODRET = result.getWSRETPRD().get(i).getCODRET();
			var CODRET = result.getWSRETPRD().get(0).getCODRET();
			if(CODRET == '1'){
				newDataset.addRow(new Array('1',
										'Sucesso',
//										result.getWSRETPRD().get(i).getPRDCOD().trim(),
										result.getWSRETPRD().get(0).getPRDCOD().trim(),
//										result.getWSRETPRD().get(i).getPRDDESC()
										result.getWSRETPRD().get(0).getPRDDESC()
										));
				
			}else{
				var MSGRET = result.getWSRETPRD().get(0).getMSGRET();
				newDataset.addRow(new Array('2', MSGRET));
			}
//		}
		
	}catch(erro){    
    	log.info("Erro no dataset dsConsultaProd: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
}