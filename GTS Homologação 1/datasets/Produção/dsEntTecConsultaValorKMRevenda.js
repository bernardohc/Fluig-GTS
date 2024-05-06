function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CODCLI");
	newDataset.addColumn("LOJACLI");
	newDataset.addColumn("REVVALORKM");
	
	try{
		
		var A1_COD  = '';
		var A1_LOJA  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'A1_COD' ) {
				A1_COD = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'A1_LOJA' ) {
				A1_LOJA = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(A1_COD == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Código da Revenda não preenchido.'));
		}else if(A1_LOJA == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Loja da Revenda não preenchido.'));
		}
		
		// Se tiver campos inválidos para busca, vai retornar o dataset, informando qual a inconsistência
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/wsentretec/getKm?ccod='+A1_COD+'&cloja='+A1_LOJA,
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
							result[0].CCOD, 
							result[0].CLOJA, 
							result[0].CVALKM));
            }else{
				var MSGRET = result[0].MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
        
    }catch(erro){    
    	log.info("Entrega Técnica: erro na busca do valor KM da Revenda: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}