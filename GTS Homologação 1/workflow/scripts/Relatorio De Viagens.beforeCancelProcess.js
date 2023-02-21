function beforeCancelProcess(colleagueId,processId){
	
	var message = "";
	var hasErros = false;
//	var sequenceId = hAPI.getCardValue("WKNumState");
	var defineOrcamentoPedido = hAPI.getCardValue("defineOrcamentoPedido");
	var defineExpPedidoSalvarCancel = hAPI.getCardValue("defineExpPedidoSalvarCancel");
	var formalizarPedido = hAPI.getCardValue("formalizarPedido");
	var gerarPedidoGTS = hAPI.getCardValue("gerarPedidoGTS");
	var partesTransformaOrcEmPed = hAPI.getCardValue("partesTransformaOrcEmPed");
	var ehGestorOrcamento = false;
	
	//Se o usuário logado for gestor do processo, no papel gestorOrcamento, vai conseguir cancelar a solicitação
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', "gestorOrcamento", "gestorOrcamento", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constraints, null);
	if(dsTemValor(datasetWorkflowColleagueRole)){
		ehGestorOrcamento = true;
	}
	
	
	if(defineOrcamentoPedido == "Cancelar" || defineExpPedidoSalvarCancel == "cancelar" || formalizarPedido == "Cancelar" || gerarPedidoGTS == "Cancelar" || partesTransformaOrcEmPed == "Cancelar" || ehGestorOrcamento){
		
		if(partesTransformaOrcEmPed == "Cancelar" ){
			
			//Dispara Email
//			var gestorEstado = hAPI.getCardValue("gestorEstado");
			/*
			var destinatarios = new java.util.ArrayList();
	        destinatarios.add( hAPI.getCardValue("gerenteRevenda") );
	        
	        var parametros = new java.util.HashMap();
	        parametros.put("subject", "Cancelamento de Orçamento - Solicitação nº " + getValue("WKNumProces"));
	        parametros.put("SERVER_URL",  SERVER_URL);
	        parametros.put("IdFluigLink", getValue("WKNumProces").toString());
	        parametros.put("IdFluig", getValue("WKNumProces").toString());
//	        parametros.put("nomeRevenda", hAPI.getCardValue("nomeSolicitante").toString() );
	        
			notifier.notify("admin", "TPLCANCELAMENTOORCAMENTO", parametros, destinatarios, "text/html");  
			*/
			
//			try{
		        var clientService = fluigAPI.getAuthorizeClientService();
		     
				var fields = ["mail"];
				var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", hAPI.getCardValue("gerenteRevenda"), hAPI.getCardValue("gerenteRevenda"), ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
				var mailTo = '';
				if(dsTemValor(datasetColleague)){
					mailTo = datasetColleague.getValue(0, "mail");
				}
		        
				var subject = "Cancelamento de Orçamento - Solicitação nº " + getValue("WKNumProces");
				var serverUrl = SERVER_URL;
				var IdFluigLink = getValue("WKNumProces").toString();
				var IdFluig = getValue("WKNumProces").toString();
		        var data = {                                                   
		            companyId : getValue("WKCompany") + '',
		            serviceCode : 'ServidorFluigGTS',                     
		            endpoint : '/api/public/alert/customEmailSender',  
		            method : 'post',                                      
		            timeoutService: '100', // segundos
		            params : {                                             
		            	"from" : "protheus@gtsdobrasil.com.br", 
		            	"to" : mailTo, 
		            	"subject" : subject,
		            	"templateId" : "TPLCANCELAMENTOORCAMENTO",
		            	"dialectId"  : "pt_BR", 
		            	"param" : {
		            			 "SERVER_URL" : serverUrl
		            	        ,"IdFluigLink" : IdFluigLink
		            	        ,"IdFluig" : IdFluig
		            	        } 
		            	                                   
		            }                                                      
		        }                                                          
//		        var vo = clientService.invoke(JSON.stringify(data));
		        var vo = clientService.invoke( JSONUtil.toJSON(data));
		 
//		        if(vo.getResult()== null || vo.getResult().isEmpty()){
//		            throw "Retorno está vazio";
//		        }else{
		            log.info(vo.getResult());
//		        }
//		    } catch(erro) {
//		        throw (erro);
//		    }
		}
		
	}else{
		
		hasErros = true;
		message = i18n.translate("cancelar_solicitacao");
		
	}
	
	if (hasErros) {
        throw  message;
    }
}
