function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("REVCGC");
	newDataset.addColumn("RECRAZAOSOCIAL");
	newDataset.addColumn("REVNOMEFANTASIA");
	newDataset.addColumn("REVCOD");
	newDataset.addColumn("REVLOJA");
	newDataset.addColumn("REVCIDADE");
	newDataset.addColumn("REVESTADO");
	newDataset.addColumn("REVCLPECA");
	newDataset.addColumn("REVCLSER");
	newDataset.addColumn("REVEMAIL");
	newDataset.addColumn("REVTELEFONE");
	
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
		
		if(!camposValidos){
			return newDataset;
		}
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'PROTHEUSGTS_REST',
	            endpoint : '/rest/wsentretec/getRevenda?cCodCli='+A1_COD+'&cLojaCli='+A1_LOJA,
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
            
            var CODRET = result.CODRET.toString();
            if( CODRET == '1'){
            	newDataset.addRow( new Array( 
            				CODRET, 
							'Sucesso', 
							result.CCGC,
							result.CNOME,
							result.CNREDUZ,
							A1_COD,
							A1_LOJA,
							result.CMUN,
							result.CEST,
							result.CCLPECA,
							result.CCLSER,
							result.CEMAIL,
							result.CTEL
							));
            }else{
				var MSGRET = result[0].MSGRET;
				newDataset.addRow(new Array('2', MSGRET));
            }
           
        }
        
    }catch(erro){    
    	log.info("Entrega Técnica: erro na busca da Revenda: " + erro);
    	newDataset.addRow(new Array('2', erro));
    }
    
	
    return newDataset;
	
}