function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	
	var atv_atual = getValue("WKNumState");
	var WKCompletTask = getValue("WKCompletTask");
	
	
	if(atv_atual == INICIO_0 || atv_atual == INICIO || atv_atual == FORMALIZA || atv_atual == ANALISA_RETORNO_GTS){
	
		//Somente valida se clicar em 'Enviar', se clicar em 'Salvar' não valida as infos abaixo.
		if (WKCompletTask.equals("true")){
		
			var message = ".\n";
			var hasErros = false;
			var attachments = hAPI.listAttachments();
			
			if(attachments.size()  == 0){
				hasErros = true;
				message += "\n-O anexo do 'Relatório de Atendimento' não foi localizado, favor anexar.";
				message += "\n-O anexo do 'Checklist' não foi localizado, favor anexar.";
				
			}else{
				
				//Vai verificar se tem o anexo de Possui Avarias
				if(hAPI.getCardValue("protoRecPossuiAvarias") == "sim"){
					var indexesProtoRecTbAvarias = hAPI.getChildrenIndexes("protoRecTbAvarias");
					
					var hasAttachAvaria = false;
					for (var i = 0; i < indexesProtoRecTbAvarias.length; i++) {
						
						hasAttachAvaria = false;
						for(var j = 0; j < attachments.size(); j++ ){
							var docDtoAvaria = attachments.get(j);
							
							if(docDtoAvaria.getDocumentDescription() == hAPI.getCardValue("protoRecAvariasImagemDescItem___"+indexesProtoRecTbAvarias[i]) ){
								hasAttachAvaria = true;
							}
						}
						
						if(!hasAttachAvaria){
							hasErros = true;
							message +=  "\n-O anexo da '" + hAPI.getCardValue("protoRecAvariasImagemDescItem___"+indexesProtoRecTbAvarias[i]) + "' não foi localizado, favor anexar.";
						}
					}
					
				}
				
				//Vai verificar se tem o anexo de Relatório de Atendimento e Checklist
				var hasAttachRelAtendimento = false;
				var hasAttachRelChecklist = false;
				for(var i = 0; i < attachments.size(); i++ ){
					
					var docDto = attachments.get(i);
				
					if(docDto.getDocumentDescription() == 'Relatório de Atendimento'){
						hasAttachRelAtendimento = true;
					}else if(docDto.getDocumentDescription() == 'Checklist'){
						hasAttachRelChecklist = true;
					}
				}
				
				if(!hasAttachRelAtendimento){
					hasErros = true;
					message +=  "\n-O anexo do 'Relatório de Atendimento' não foi localizado, favor anexar.";
				}
				if(!hasAttachRelChecklist){
					hasErros = true;
					message +=  "\n-O anexo do 'Checklist' não foi localizado, favor anexar.";
				}
				
			}
			
			if(hasErros){
				throw message;
			}
		
		}
	}else if( atv_atual == REVENDA_NF_PGTO ){
		
		//Somente valida se clicar em 'Enviar', se clicar em 'Salvar' não valida as infos abaixo.
		if (WKCompletTask.equals("true")){
			var message = ".\n";
			var hasErros = false;
			var attachments = hAPI.listAttachments();
				
			//Vai verificar se tem o anexo de Nota Fiscal e Boleto (Se necessário o Boleto)
			var hasAttachNotaFiscal = false;
			var hasAttachBoleto = false;
			for(var i = 0; i < attachments.size(); i++ ){
				
				var docDto = attachments.get(i);
				
				if(docDto.getDocumentDescription() == 'Nota Fiscal'){
					hasAttachNotaFiscal = true;
				}
				if(hAPI.getCardValue("NFPagtoFormaPagamento") == "boleto"){
					if(docDto.getDocumentDescription() == 'Boleto'){
						hasAttachBoleto = true;
					}
				}
			}
			
			
			if(!hasAttachNotaFiscal){
				hasErros = true;
				message +=  "\n-O anexo da Nota Fiscal não foi localizado, favor anexar.";
			}
			if(hAPI.getCardValue("NFPagtoFormaPagamento") == "boleto"){
				if(!hasAttachBoleto){
					hasErros = true;
					message +=  "\n-O anexo do Boleto não foi localizado, favor anexar.";
				}
			}
				
			
			if(hasErros){
				throw message;
			}
		}
		
	}
}