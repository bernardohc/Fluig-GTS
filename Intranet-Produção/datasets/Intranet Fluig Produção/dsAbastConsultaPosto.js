function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("CODPOSTO");
	newDataset.addColumn("CNPJPOSTO");
	newDataset.addColumn("NOMEPOSTO");
	
	try{
		
		var CNPJPOSTO  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'CNPJPOSTO' ) {
				CNPJPOSTO = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(CNPJPOSTO == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'CNPJ do Posto não preenchido.'));
		}
		
		// Se tiver campos inválidos para busca, vai retornar o dataset, informando qual a inconsistência
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/WSFROTA/Posto?CnpjPosto='+CNPJPOSTO,
	            method : 'get',
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		log.info('---data cnpj');
		log.dir(data);
		
		var vo = clientService.invoke(JSON.stringify(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            newDataset.addRow(new Array('2', "Retorno da API está vazia."));
        }else{
            
            var result = JSON.parse(vo.getResult());
            
            var CODRET = result.CODRET.toString();
            if( CODRET == '1'){
            	newDataset.addRow( new Array( 
        				CODRET, 
						'Sucesso', 
						result.Codigo,
						result.Cnpj,
						result.Nome
						));
            }else{
				var MSGRET = result.MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
        
    }catch(erro){    
    	log.info("Abastecimento: erro na busca do Posto: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}