/*
 * Dataset para disparo de e-mail com anexo
 * Utilizado como base o seguinte modelo: https://fluiggers.com.br/t/envio-de-e-mail-com-anexos/545
 */
function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODRET");
	newDataset.addColumn("MSGRET");
	
	try{
	
		var assunto = "";
		var conteudo = "";
		var to = "";
		var cc = "";
		var cco = "";
		var anexos = "";
		
		for (var i in constraints){
			if ( constraints[i].getFieldName().toString() == 'assunto' ) {
				assunto = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'body' ) {
				conteudo = constraints[i].initialValue;
			}
			if ( constraints[i].getFieldName().toString() == 'to' ) {
				if(temValor( constraints[i].initialValue )){
					to = constraints[i].initialValue.split(',');
				}
			}
			if ( constraints[i].getFieldName().toString() == 'cc' ) {
				if(temValor( constraints[i].initialValue )){
					cc = constraints[i].initialValue.split(',');
				}
			}
			if ( constraints[i].getFieldName().toString() == 'cco' ) {
				if(temValor( constraints[i].initialValue )){
					cco = constraints[i].initialValue.split(',');
				}
			}
			if ( constraints[i].getFieldName().toString() == 'anexos' ) {
				if(temValor( constraints[i].initialValue )){
					anexos = constraints[i].initialValue.split(',');
				}
			}
		}
		
		//Dados de conexão do e-mail
//	    var username = "naoresponda@gtsdobrasil.com.br";
//	    var nameuser = 'GTS do Brasil';
//	    var password = "irDFfjh9pg";
//	    var host = "mail.atpmail.com.br";
//	    var port = "587";
		
	    var username = "homologacaodesistemas@gmail.com";
	    var nameuser = 'GTS do Brasil';
	    var password = "twmuunigbtwimgkx";
	    var host = "smtp.gmail.com";
	    var port = "587";
	    
	    //Define propriedades
	    var props = new java.util.Properties();
//	    props.put("mail.transport.protocol", "smtp");
//	    props.put("mail.smtp.auth", "true");
//	    props.put("mail.smtp.starttls.enable", "false");
//	    props.put("mail.smtp.ssl.trust", "mail.atpmail.com.br");
//	    props.put("mail.smtp.host", host);
//	    props.put("mail.smtp.port", port);
	    
   
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.starttls.enable", "true");
        
//	    props.put("mail.transport.protocol", "smtp");
//	    props.put("mail.smtp.auth", "true");
//	    props.put("mail.smtp.starttls.enable", "true");
//	    props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
//	    props.put("mail.smtp.host", host);
//	    props.put("mail.smtp.port", port);
	
	    var session = javax.mail.Session.getDefaultInstance(props);
	    var message = new javax.mail.internet.MimeMessage(session);
	    var messageBodyPart = new javax.mail.internet.MimeBodyPart();
	    var multipart = new javax.mail.internet.MimeMultipart("mixed");
	    
	    var transport = session.getTransport("smtp");
	    //Set usuário From
//	    message.setFrom(new javax.mail.internet.InternetAddress(username, nameuser));
	    message.setFrom(new javax.mail.internet.InternetAddress("naoresponda@gtsdobrasil.com.br", nameuser));
	    //Set Assunto
	    message.setSubject(assunto);
	    //Adiciona os usuários 'para'
	    if (to != "" ) {
		    for (var i in to) {
		    	if(to[i] != ""){
			    	message.addRecipient(
			    	        javax.mail.Message.RecipientType.TO,
			    	        new javax.mail.internet.InternetAddress(to[i])
			    	    );
		    	}
		    }
	    }
	    //Adiciona os usuários 'cópia'
	    if (cc && cc.length) {
	        for (var i in cc) {
	            message.addRecipient(
	                javax.mail.Message.RecipientType.CC,
	                new javax.mail.internet.InternetAddress(cc[i])
	            );
	        }
	    }
	    //Adiciona os usuários 'cópia oculta'
	    if (cco && cco.length) {
	        for (var j in cco) {
	            message.addRecipient(
	                javax.mail.Message.RecipientType.BCC,
	                new javax.mail.internet.InternetAddress(cco[j])
	            );
	        }
	    }
	    
	    //Adiciona os anexos
		if (anexos != "") {
			var docService = fluigAPI.getDocumentService();
			for (var m in anexos) {
				var anexo = parseInt(anexos[m]);
				var publicUrl = docService.getDownloadURL(anexo);
		      
				var companyId = getValue("WKCompany");
				var c1 = DatasetFactory.createConstraint( "documentPK.documentId", anexo, anexo, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint( "documentPK.companyId", companyId, companyId, ConstraintType.MUST);
				var constraints = new Array(c1, c2);
				var ds = DatasetFactory.getDataset("document", null, constraints, null);
				var nomeDocumento = "";
				var phisicalFile = "";
				if (ds != null && ds.rowsCount > 0) {
					nomeDocumento = ds.getValue(0, "documentDescription");
					var indexNomeDocumento = nomeDocumento.lastIndexOf('.');
					//Se não tiver ponto no documento, quer dizer que não tem extensão, então vai buscar a extensão no phisicalFile
					if(indexNomeDocumento < 0){
						phisicalFile = ds.getValue(0, "phisicalFile");
						var indexPhisicalFile = phisicalFile.lastIndexOf('.');
						var extension = '';
					    if(indexPhisicalFile > 0) {
					      extension = phisicalFile.substring(indexPhisicalFile + 1);
					    }
						nomeDocumento = nomeDocumento + "." + extension;
					}
					
				}
		      
				var attachment = new javax.mail.internet.MimeBodyPart();
				attachment.setDataHandler(new javax.activation.DataHandler(new java.net.URL(publicUrl)));
				attachment.setDisposition(javax.mail.internet.MimeBodyPart.ATTACHMENT);
				attachment.setFileName(nomeDocumento);
		      
				multipart.addBodyPart(attachment);
		      
			}
		}
	    //Set body, conteúdo do email
		var tmpHtml = org.jsoup.Jsoup.parse(conteudo);
	    messageBodyPart.setContent(tmpHtml.toString(), "text/html; charset=utf-8");
	    multipart.addBodyPart(messageBodyPart);
	
	    message.setContent(multipart);
	    
	    //Realiza conexão e envia mensagem
//	    transport.connect(host, port, username, password);
	    transport.connect(host, username, password);
	    transport.sendMessage(message, message.getAllRecipients());

	    
	    //Se não deu erro até aqui, retorna como sucesso.
	    newDataset.addRow(new Array('1', 'Sucesso ao disparar o e-mail: ' + dataAtual('dd/mm/yyyy hh:mm:ss')));  
	
	}catch(erro){    
    	log.info("dsSendEmail: " + erro);
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