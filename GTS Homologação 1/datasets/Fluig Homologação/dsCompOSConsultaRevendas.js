function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	newDataset.addColumn("REVCODIGO");
	newDataset.addColumn("REVLOJA");
	newDataset.addColumn("REVCGC");
	newDataset.addColumn("REVINSCEST");
	newDataset.addColumn("REVNOME");
	newDataset.addColumn("REVCEP");
	newDataset.addColumn("REVEND");
	newDataset.addColumn("REVBAIRRO");
	newDataset.addColumn("REVCOMPLEMENTO");
	newDataset.addColumn("REVCIDADE");
	newDataset.addColumn("REVESTADO");
	newDataset.addColumn("REVCIDADEUF");
	newDataset.addColumn("REVTELEFONE");
	newDataset.addColumn("REVEMAIL");
	
	var tipoFiltro = '';
	var codigoTecnicoGTS = '';
	var numeroOS = '';
//	var numeroOS = '025137';
//	var codigoTecnicoGTS = '48';
//	var numeroOS = '021200';
//	var codigoTecnicoGTS = '29';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'tipoFiltro' ) {
			tipoFiltro = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'codigoTecnicoGTS' ) {
			codigoTecnicoGTS = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'numeroOS' ) {
			numeroOS = constraints[i].initialValue;
		}
	}
	
	if(tipoFiltro == "limpar"){
		return newDataset;
	}
	
	var camposValidos = true;
	if(codigoTecnicoGTS == ''){
		camposValidos = false;
		newDataset.addRow(new Array('2', 'Código Técnico GTS não preenchido.'));
	}else if(numeroOS == ''){
		camposValidos = false;
		newDataset.addRow(new Array('2', 'Número da OS não preenchido.'));
	}
	
	if(!camposValidos){
		return newDataset;
	}
	
	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'PROTHEUSGTS_REST',
            endpoint : '/rest/WSORDEMSERV/InfoRevenda?SERVICO='+numeroOS+'&TECNICO='+codigoTecnicoGTS,
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
        	
        	for(var i=0; i < result.Revenda.length; i++){
        		newDataset.addRow( new Array( 
        				CODRET, 
						'Sucesso', 
						result.Revenda[i].Codigo,
						result.Revenda[i].Loja,
						result.Revenda[i].CPF_CNPJ,
						result.Revenda[i].InscricaoEstadual,
						result.Revenda[i].Nome,
						result.Revenda[i].Cep,
						result.Revenda[i].Endereco,
						result.Revenda[i].Bairro,
						result.Revenda[i].Complemento,
						result.Revenda[i].Cidade,
						result.Revenda[i].Estado,
						result.Revenda[i].Cidade+' / '+result.Revenda[i].Estado,
						result.Revenda[i].Telefone,
						result.Revenda[i].Email
						));
        	}
        	
        }else{
			var MSGRET = result.MSGRET;
			newDataset.addRow(new Array('2', MSGRET, '', '', '', '', MSGRET));
        }
       
    }
	
	return newDataset;
	
}