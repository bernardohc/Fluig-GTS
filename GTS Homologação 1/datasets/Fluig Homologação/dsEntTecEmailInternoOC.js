function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	try{
		var SERVER_URL = fluigAPI.getPageService().getServerURL();
		var destinatarios = "";
		var cstAnexos = "";
		var idAnexoNotaFiscal = "";
		var DownloadURLNotaFiscal = "";
		var idAnexoBoleto = "";
		var DownloadURLBoleto = "";
		var numOC = "";
		var numFluig = "";
		var formaPagto = "";
		var formaPagtoTransfBanco = "";
		var formaPagtoTransfAgencia = "";
		var formaPagtoTransfConta = "";
		var formaPagtoTransfCodIdentificador = "";
		var formaPagtoTransfNome = "";
		var formaPagtoTransfCpfCnpj = "";
		var dataPrevPagto = "";

		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'destinatarios' ) {
				destinatarios = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'idAnexoNotaFiscal' ) {
				idAnexoNotaFiscal = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'idAnexoBoleto' ) {
				idAnexoBoleto = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'numOC' ) {
				numOC = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'numFluig' ) {
				numFluig = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagto' ) {
				formaPagto = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagtoTransfBanco' ) {
				formaPagtoTransfBanco = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagtoTransfAgencia' ) {
				formaPagtoTransfAgencia = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagtoTransfConta' ) {
				formaPagtoTransfConta = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagtoTransfCodIdentificador' ) {
				formaPagtoTransfCodIdentificador = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagtoTransfNome' ) {
				formaPagtoTransfNome = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'formaPagtoTransfCpfCnpj' ) {
				formaPagtoTransfCpfCnpj = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'dataPrevPagto' ) {
				dataPrevPagto = constraints[i].initialValue;
			}
		}
		
		var documentService = fluigAPI.getDocumentService();
		DownloadURLNotaFiscal = documentService.getDownloadURL( parseInt(idAnexoNotaFiscal) );
		
		var formaPagtoHtml = '';
		if( formaPagto == "boleto" ){
			formaPagtoHtml = "Forma de pagamento: Boleto";
			
			DownloadURLBoleto = documentService.getDownloadURL( parseInt(idAnexoBoleto) );
			
		}else if(formaPagto == "transferencia"){
			formaPagtoTransfCodIdentificador = ( formaPagtoTransfCodIdentificador != "" ) ? " - Cod. Identificador: " + formaPagtoTransfCodIdentificador : '';
			formaPagtoTransfNome = ( formaPagtoTransfNome != "" ) ? " - Nome: " + formaPagtoTransfNome : '';
			formaPagtoTransfCpfCnpj = ( formaPagtoTransfCpfCnpj != "" ) ? " - CPF/CNPJ: " + formaPagtoTransfCpfCnpj : '';
			
			formaPagtoHtml =  "Forma de pagamento: Transferência Bancária <br>";
			formaPagtoHtml += "Banco: " + formaPagtoTransfBanco + " - Agência: " + formaPagtoTransfAgencia + " - Conta: " + formaPagtoTransfConta + "" + formaPagtoTransfCodIdentificador + "" + formaPagtoTransfNome + "" + formaPagtoTransfCpfCnpj;
			
		}
		
		
		
		var SERVER_URL = fluigAPI.getPageService().getServerURL();
		var clientService = fluigAPI.getAuthorizeClientService();
		 
		var assunto = "Ordem de Compra nº "+numOC;

	    var data = {                                                   
	        companyId : getValue("WKCompany") + '',
	        serviceCode : 'ServidorFluigGTS',                     
	        endpoint : '/api/public/alert/customEmailSender',  
	        method : 'post',                                      
	        timeoutService: '100', // segundos
	        params : {                                             
	        	"from" : "fluig@gtsdobrasil.com.br", 
	        	"to" : destinatarios, 
	        	"subject" : assunto,
	        	"templateId" : "TPLENTTECEMAILINTERNOOC",
	        	"dialectId"  : "pt_BR", 
	        	"param" : {
	        			 "SERVER_URL" : SERVER_URL
	        			,"numFluig" : numFluig
	        	        ,"numOC" : numOC
	        	        ,"formaPagtoHtml" : formaPagtoHtml
	        	        ,"DownloadURLNotaFiscal" : DownloadURLNotaFiscal
	        	        ,"DownloadURLBoleto" : DownloadURLBoleto
	        	        ,"dataPrevPagto" : dataPrevPagto
	        	        } 
	        	                                   
	        }                                                      
	    }                                                          
	    var vo = clientService.invoke( JSONUtil.toJSON(data));
	    
	    if (vo.getResult().search("HttpHostConnectException") != -1) {
	        log.info("################# Não foi possível estabelecer conexao com o servidor rest #################");
	        dataset.addRow("0", "Não foi possível estabelecer conexao com o servidor.", "");
	    }
	    else {
	        if (vo.getResult() == null || vo.getResult().isEmpty()) {
	        	dataset.addRow(new Array('2', 'Disparo de e-mail não retornou nenhum registro'));
	        }
	        else {
	            txt = new Array(vo.getResult());
	            var objdata = JSON.parse(txt);
	            
	            try{        
	            	if(objdata.content == "OK"){
	            		newDataset.addRow(new Array('1', 'Sucesso ao disparar o e-mail: ' + dataAtual('dd/mm/yyyy hh:mm:ss') ) );
	            	}
	            } catch (e) {
	            	newDataset.addRow(new Array('2', e.toString()) );
	            }
	        }
	    }
		
		
		/*
		var formaPagtoHtml = '';
		if( formaPagto == "boleto" ){
			formaPagtoHtml = "<p>Forma de pagamento: Boleto</p>";
		}else if(formaPagto == "transferencia"){
			formaPagtoTransfCodIdentificador = ( formaPagtoTransfCodIdentificador != "" ) ? " - Cod. Identificador: " + formaPagtoTransfCodIdentificador : '';
			formaPagtoTransfNome = ( formaPagtoTransfNome != "" ) ? " - Nome: " + formaPagtoTransfNome : '';
			formaPagtoTransfCpfCnpj = ( formaPagtoTransfCpfCnpj != "" ) ? " - CPF/CNPJ: " + formaPagtoTransfCpfCnpj : '';
			
			formaPagtoHtml =  "<p>Forma de pagamento: Transferência Bancária <br>";
			formaPagtoHtml += "Banco: " + formaPagtoTransfBanco + " - Agência: " + formaPagtoTransfAgencia + " - Conta: " + formaPagtoTransfConta + "" + formaPagtoTransfCodIdentificador + "" + formaPagtoTransfNome + "" + formaPagtoTransfCpfCnpj;
			formaPagtoHtml += "</p>";
		}
		
		var body = "<html>"+
						"<head><title></title>"+
						"<style>"+
					    "html, body, table, tr, td {"+
					    "    font-family: verdana;"+
					    "    font-size: 12px;"+
					    "}"+
					    ".border {"+
					    "    border-left: 0;"+
					    "}"+
						"</style>"+
					"</head>"+
					"<body leftmargin='0' topmargin='0' marginwidth='0' marginheight='0'>"+
						"<div align='left'>"+
							"<div align='left'>"+
								"<p>Prezados,</p>"+ 
								"<p></p>"+
								"<p>Foi gerado a ordem de compra nº "+numOC+" para pagamento, referente a solicitação de Entrega Técnica nº Fluig <a href='"+SERVER_URL+"/portal/p/GTS/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numFluig+"' target='_blank'>"+numFluig+"</a>.</p>"+
								formaPagtoHtml +
								"</p>"+
								"<br />"+
					            "<br />"+
					        "</div>"+
					      	"<br />"+
					        "<br />"+
							"<br />"+
						"</div>"+
				
						"<p>Este é um e-mail que foi enviado automaticamente. Favor não responder.</p>"+	
						"<br>"+
						"<table width='556' border='0' cellspacing='0' cellpadding='0'>"+
							"<tr>"+
								"<td height='28' align='center' bgcolor='#444351' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #FFF;'>“Antes de imprimir, pense em sua responsabilidade com o meio ambiente.”</td>"+
							"</tr>"+
							"<tr>"+
								"<td height='149'>"+
									"<span style='font-size: 10px; font-family: Arial, Helvetica, sans-serif;'><p>IMPORTANTE:<br />"+
									"Este e-mail é confidencial, foi enviado somente ao(s) destinatário(s) acima e pode conter informações privilegiadas e/ou confidenciais. Caso tenha recebido esta mensagem por engano, por favor notifique o remetente e em seguida apague este e-mail. Obrigado.</p>"+
									"<p>IMPORTANT:<br />"+
									"This e-mail is confidential and may contain information that is privileged, attorney work product or exempt from disclosure under applicable law. It is intended only for the addressee(s) above. If you’re not an intended recipient, please promptly notify the sender and delete this e-mail.<br />"+
									"Thank you.<br />"+
									"</p>"+
									"</span>"+
								"</td>"+
							"</tr>"+
						"</table>"+
					"</body>"+
					"</html>";
		
		var assunto = "Ordem de Compra nº "+numOC;
		//split com o ; e depois join com , para transformar em um 'string array' pois só dessa forma que funciona
		var to = cstTO.split(';').join(",");
		var anexos = cstAnexos.split(';').join(',');		
		
		
		var c1 = DatasetFactory.createConstraint("assunto", assunto, "", ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("body", body, "", ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("to", to, "", ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("anexos", anexos, "", ConstraintType.MUST);
	    var constSendMail = new Array(c1, c2, c3, c4);   
	    var dsSendEmail = DatasetFactory.getDataset("dsSendEmail", null, constSendMail, null);
	    
	    if(dsTemValor(dsSendEmail)){
    		var CODRET = dsSendEmail.getValue(0, "CODRET");
    		var MSGRET = dsSendEmail.getValue(0, "MSGRET");

    		newDataset.addRow(new Array(CODRET, MSGRET));

	    }else{
	    	newDataset.addRow(new Array('2', 'Erro ao enviar e-mail da ordem de compra'));
	    }
	    */
	}catch(erro){    
		log.info("dsEntTecEmailInternoOC: " + erro);
		newDataset.addRow(new Array('2', erro));
	}
	return newDataset;
	
}


function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function dataAtual(formato){
    var retornoData = "";
	var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    var segundo = addZero(data.getSeconds());
    
    if(formato == "dd/mm/yyyy"){
    	retornoData = dia + "/" + mes + "/" + ano;
    }else if(formato == "yyyymmdd"){
    	retornoData = ano + "" + mes + "" + dia;
    }else if(formato == "yyyy-mm-dd"){
    	retornoData = ano + "-" + mes + "-" + dia;
    }else if(formato == "dd/mm/yyyy hh:mm"){
    	retornoData = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto ;
	}else if(formato == "dd/mm/yyyy hh:mm:ss"){
		retornoData = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
	}
    
    return retornoData;
}