function createDataset(fields, constraints, sortFields) {
	
	var dataset  = DatasetBuilder.newDataset();
	dataset.addColumn("CODRET");
	dataset.addColumn("MSG");
	
	var numProtocoloFluig = '';
	var dataAbertura = '';
	
	var nomeRequisitante = '';
	var cpfCnpjRequisitante = '';
	var emailRequisitante = '';
	var telRequisitante = '';
	var estadoRequisitante = '';
	var cidadeRequisitante = '';
	
	var tipoSolicitacao = '';
	var tipoSolicitacaoDesc = '';
	var estadoRevenda = '';
	var cidadeRevenda = '';
	var revenda = '';
	var cpfCnpjRevenda = '';
	var setor = '';
	var numSerie = '';
	var modeloEquipamento = '';
	var assuntoSolicitacao = '';
	var descricaoSolicitacao = '';
	
    
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'numProtocoloFluig' ) {
			numProtocoloFluig = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'dataAbertura' ) {
			dataAbertura = constraints[i].initialValue;
		}
		//Requisitante
		if ( constraints[i].getFieldName().toString() == 'nomeRequisitante' ) {
			nomeRequisitante = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'cpfCnpjRequisitante' ) {
			cpfCnpjRequisitante = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'emailRequisitante' ) {
			emailRequisitante = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'telRequisitante' ) {
			telRequisitante = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'estadoRequisitante' ) {
			estadoRequisitante = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'cidadeRequisitante' ) {
			cidadeRequisitante = constraints[i].initialValue;
		}
		//Solicitação
		if ( constraints[i].getFieldName().toString() == 'tipoSolicitacao' ) {
			tipoSolicitacaoDesc = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'estadoRevenda' ) {
			if(constraints[i].initialValue != ''){
				estadoRevenda = '<b>Estado: </b>' + constraints[i].initialValue;
			}
		}
		if ( constraints[i].getFieldName().toString() == 'cidadeRevenda' ) {
			if(constraints[i].initialValue != ''){
				cidadeRevenda = '<b>Cidade: </b>' + constraints[i].initialValue;
			}
		}
		if ( constraints[i].getFieldName().toString() == 'revenda' ) {
			if(constraints[i].initialValue != ''){
				revenda = '<b>Revenda: </b>' + constraints[i].initialValue;
			}
		}
		if ( constraints[i].getFieldName().toString() == 'cpfCnpjRevenda' ) {
			if(constraints[i].initialValue != ''){
				cpfCnpjRevenda = '<b>CPF/CNPJ: </b>' + constraints[i].initialValue;
			}
		}
		if ( constraints[i].getFieldName().toString() == 'setor' ) {
			setor = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'numSerie' ) {
			if(constraints[i].initialValue != ''){
				numSerie = '<b>Nº Série: </b>' + constraints[i].initialValue;
			}
		}
		if ( constraints[i].getFieldName().toString() == 'modeloEquipamento' ) {
			if(constraints[i].initialValue != ''){
				modeloEquipamento = '<b>Modelo Equipamento: </b>' + constraints[i].initialValue;
			}
		}
		if ( constraints[i].getFieldName().toString() == 'assuntoSolicitacao' ) {
			assuntoSolicitacao = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'descricaoSolicitacao' ) {
			descricaoSolicitacao = constraints[i].initialValue;
		}
	}
	
	var SERVER_URL = fluigAPI.getPageService().getServerURL();
	
	var clientService = fluigAPI.getAuthorizeClientService();
	 
	var subject = "Solicitação de SAC nº " + numProtocoloFluig;

    var data = {                                                   
        companyId : getValue("WKCompany") + '',
        serviceCode : 'ServidorFluigGTS',                     
        endpoint : '/api/public/alert/customEmailSender',  
        method : 'post',                                      
        timeoutService: '100', // segundos
        params : {                                             
        	"from" : "naoresponda@gtsdobrasil.com.br", 
        	"to" : emailRequisitante, 
        	"subject" : subject,
        	"templateId" : "TPLSACEMAILREQUISITANTEABERT",
        	"dialectId"  : "pt_BR", 
        	"param" : {
        			 "SERVER_URL" : SERVER_URL
        			,"numProtocoloFluig" : numProtocoloFluig
        	        ,"dataAbertura" : dataAbertura
        	        
        	        ,"nomeRequisitante" : nomeRequisitante
        	        ,"cpfCnpjRequisitante" : cpfCnpjRequisitante
        	        ,"emailRequisitante" : emailRequisitante
        	        ,"telRequisitante" : telRequisitante
        	        ,"estadoRequisitante" : estadoRequisitante
        	        ,"cidadeRequisitante" : cidadeRequisitante
        	        
        	        ,"tipoSolicitacao" : tipoSolicitacaoDesc
        	        ,"estadoRevenda" : estadoRevenda
        	        ,"cidadeRevenda" : cidadeRevenda
        	        ,"revenda" : revenda
        	        ,"cpfCnpjRevenda" : cpfCnpjRevenda
        	        ,"setor" : setor
        	        ,"numSerie" : numSerie
        	        ,"modeloEquipamento" : modeloEquipamento
        	        ,"assuntoSolicitacao" : assuntoSolicitacao
        	        ,"descricaoSolicitacao" : descricaoSolicitacao
        	        
        	        } 
        	                                   
        }                                                      
    }                                                          
//    var vo = clientService.invoke(JSON.stringify(data));
    var vo = clientService.invoke( JSONUtil.toJSON(data));
    
    if (vo.getResult().search("HttpHostConnectException") != -1) {
        log.info("################# Não foi possível estabelecer conexao com o servidor rest #################");
        dataset.addRow("0", "Não foi possível estabelecer conexao com o servidor.", "");
    }
    else {
        if (vo.getResult() == null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array('0', 'Servidor não retornou nenhum registro'));
        }
        else {
            txt = new Array(vo.getResult());
            var objdata = JSON.parse(txt);
            try{        
            	 dataset.addRow(new Array('1', objdata.content) );
            } catch (e) {
                 dataset.addRow(new Array('0', e.toString()) );
            }
        }
    }
    return dataset;   
}