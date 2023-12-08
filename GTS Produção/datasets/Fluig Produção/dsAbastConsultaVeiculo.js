function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("PLACA");
	newDataset.addColumn("NOMEVEICULO");
	newDataset.addColumn("MODELO");
	newDataset.addColumn("COMBUSTIVEL");
	
	try{
		
		var PLACA  = '';
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'PLACA' ) {
				PLACA = constraints[i].initialValue;
			}
		}
		
		var camposValidos = true;
		if(PLACA == ''){
			camposValidos = false;
			newDataset.addRow(new Array('2', 'Placa do Veículo não preenchido.'));
		}
		
		// Se tiver campos inválidos para busca, vai retornar o dataset, informando qual a inconsistência
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/WSFROTA/Veiculo?Placa='+PLACA,
	            method : 'get',
	            timeoutService: '100', // segundos
            	headers: {
            		"Content-Type": "application/json"
                }
	        }
		
		var vo = clientService.invoke(JSON.stringify(data));
		
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            newDataset.addRow(new Array('2', "Retorno da API está vazia."));
        }else{
            
            var result = JSON.parse(vo.getResult());
            
            if(result.code != undefined){
            	//Só consegui assim, se colocar  result[0].CODRET != undefined, da erro, e não retorna a msg.
            	var message = result.code + " - " +result.message;
				newDataset.addRow(new Array('2', message));
            }else{
            	var CODRET = result.CODRET.toString();
	            if( CODRET == '1'){
	            	newDataset.addRow( new Array( 
	            				CODRET, 
								'Sucesso', 
								result.Placa,
								result.Nome,
								result.Modelo,
								JSON.stringify(result.Tanque)
								));
	            }else{
					var MSGRET = result.MSGRET;
					newDataset.addRow(new Array('2', MSGRET));
	            }
            }
            
        }
        
    }catch(erro){    
    	log.info("Abastecimento: erro na busca do Veículo: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}