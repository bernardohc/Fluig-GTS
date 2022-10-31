function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("OCSTATUSOC");
	
	try{
		
		var NUMOC  = '';
//		var NUMOC  = '258895';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'NUMOC' ) {
				NUMOC = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(NUMOC == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Número da Ordem de Compra não preenchido.'));
		}
		
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'WSENTRETEC',
	            endpoint : '/rest/wsentretec/getOrdCompra?cFilial=010001&cNumPed='+ NUMOC,
	            method : 'get',
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		var vo = clientService.invoke(JSON.stringify(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
        	newDataset.addRow(new Array('2', "Retorno está vazio"));
        }else{
            
            var result = JSON.parse(vo.getResult());
            
            var CODRET = result[0].CODRET.toString();
            if( CODRET == '1'){
            	newDataset.addRow( new Array( 
            				CODRET, 
							'Sucesso', 
							result[0].CSTATUS
							
							));
            }else{
				var MSGRET = result[0].MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
        
		
    }catch(erro){    
    	log.info("Entrega Técnica: erro na busca do status da OC: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}