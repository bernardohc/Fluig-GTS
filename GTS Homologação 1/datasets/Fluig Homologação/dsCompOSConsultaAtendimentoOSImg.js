function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("ATDIDFOTO");
	newDataset.addColumn("ATDBASE64");
	
	var numeroOS = '';
	var codigoTecnicoGTS = '';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'numeroOS' ) {
			numeroOS = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'codigoTecnicoGTS' ) {
			codigoTecnicoGTS = constraints[i].initialValue;
		}
	}
	
	var camposValidos = true;
	if(numeroOS == ''){
		camposValidos = false;
		newDataset.addRow(new Array('2', 'Número da OS não preenchido.'));
	}else if(codigoTecnicoGTS == ''){
		camposValidos = false;
		newDataset.addRow(new Array('2', 'Código Técnico GTS não preenchido.'));
	}
	
	if(!camposValidos){
		return newDataset;
	}
	
	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'PROTHEUSGTS_REST',
            endpoint : '/rest/WSORDEMSERV/ImgServico?SERVICO='+numeroOS+'&TECNICO='+codigoTecnicoGTS,
            method : 'get',
            timeoutService: '100', // segundos
        	headers: {
        		"Content-Type": "application/json"
            }
        }
	
	var vo = clientService.invoke(JSON.stringify(data));
	
	if(vo.getHttpStatusResult() != 200 ){
    	newDataset.addRow(new Array('2', vo.getHttpStatusResult() + " - Retorno das informações inválido."));
    }else{	
    	
        var result = JSON.parse(vo.getResult());
        
        var CODRET = result.CODRET.toString();
        if( CODRET == '1'){
        	if(result.Imagem.length > 0){
	        	for(var i=0; i < result.Imagem.length; i++){
	        		newDataset.addRow( new Array(
								        	      CODRET
												,'Sucesso'
								        		,result.Imagem[i].ID_Foto
												,result.Imagem[i].Base64
								        		));
	        	}
        	}else{
        		newDataset.addRow(new Array('2', 'Ordem de Serviço está sem imagens.'));
        	}
        }else{
			var MSGRET = result.MSGRET;
			newDataset.addRow(new Array('2', MSGRET));
        }
       
    }
	return newDataset;
	
}