function createDataset(fields, constraints, sortFields) {
	
	var dataset  = DatasetBuilder.newDataset();
	dataset.addColumn("CODRET");
	dataset.addColumn("MSG");
	
	var numProtocoloFluig = '';
	var dataAbertura = '';
	var dataEncerramento = '';
    
	var emailRequisitante = '';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'numProtocoloFluig' ) {
			numProtocoloFluig = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'dataAbertura' ) {
			dataAbertura = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'dataEncerramento' ) {
			dataEncerramento = constraints[i].initialValue;
		}
		//Requisitante
		if ( constraints[i].getFieldName().toString() == 'emailRequisitante' ) {
			emailRequisitante = constraints[i].initialValue;
		}
	}
	var SERVER_URL = fluigAPI.getPageService().getServerURL();
	
	var clientService = fluigAPI.getAuthorizeClientService();
	 
	var subject = "Encerramento de Atendimento do SAC nº " + numProtocoloFluig;

    var data = {                                                   
        companyId : getValue("WKCompany") + '',
        serviceCode : 'ServidorFluigGTS',                     
        endpoint : '/api/public/alert/customEmailSender',  
        method : 'post',                                      
        timeoutService: '100', // segundos
        params : {                                             
//        	"from" : "protheus@gtsdobrasil.com.br", 
        	"from" : "naoresponda@gtsdobrasil.com.br", 
        	"to" : emailRequisitante, 
        	"subject" : subject,
        	"templateId" : "TPLSACEMAILREQUISITANTEFINALIZ",
        	"dialectId"  : "pt_BR", 
        	"param" : {
        			 "SERVER_URL" : SERVER_URL
        			,"numProtocoloFluig" : numProtocoloFluig
        	        ,"dataAbertura" : dataAbertura
        	        ,"dataEncerramento" : dataEncerramento
        	        
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