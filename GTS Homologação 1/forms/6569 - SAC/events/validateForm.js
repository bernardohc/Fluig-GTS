function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case CADASTRA_SAC : 
    		if (isEmpty("numProtocoloTelefonico", form)) {
                message += getMessage("Nº Protocolo Telefônico", 1, form);
                hasErros = true;
            }
    		
    		//Requisitante
    		if (isEmpty("nomeRequisitante", form)) {
    			message += getMessage("Nome Requisitante", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("tipoPessoaRequisitante", form)) {
                message += getMessage("Tipo de pessoa Requisitante", 3, form);
                hasErros = true;
            }
    		
    		if (isEmpty("cpfCnpjRequisitante", form)) {
    			message += getMessage("CPF/CNPJ Requisitante", 1, form);
    			hasErros = true;
    		}else if (form.getValue("tipoPessoaRequisitante") == 'PF' && form.getValue("cpfCnpjRequisitante").length() != 14 ){
            	message += getMessage("CPF do Requisitante", 2, form);
             	hasErros = true;
        	}else if (form.getValue("tipoPessoaRequisitante") == 'PJ' && form.getValue("cpfCnpjRequisitante").length() != 18 ) {	
        		message += getMessage("CNPJ do Requisitante", 2, form);
        		hasErros = true;
        	}
    		
    		if (isEmpty("telRequisitante", form)) {
    			message += getMessage("Telefone", 1, form);
    			hasErros = true;
    		}else if( form.getValue("telRequisitante").length() < 14 ){
    			message += getMessage("Telefone do Requisitante", 2, form);
        		hasErros = true;
    		}
    		
    		if (isEmpty("emailRequisitante", form)) {
    			message += getMessage("E-mail", 1, form);
    			hasErros = true;
    		}else if( !validaEmail(form.getValue("emailRequisitante")) ){	
    			message += getMessage("E-mail do requisitante está inválido.", 6, form);
    			hasErros = true;
    		}
    		if (isEmpty("estadoRequisitante", form)) {
    			message += getMessage("Estado", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("cidadeRequisitante", form)) {
    			message += getMessage("Cidade", 1, form);
    			hasErros = true;
    		}
    		//Solicitação
    		if (isEmpty("tipoSolicitacao", form)) {
    			message += getMessage("Tipo de Solicitação", 1, form);
    			hasErros = true;
    		}
    		if(form.getValue("tipoSolicitacao") != 'Outros'){
    			if (isEmpty("estadoRevenda", form)) {
        			message += getMessage("Estado Revenda", 1, form);
        			hasErros = true;
        		}
    			if (isEmpty("cidadeRevenda", form)) {
    				message += getMessage("Cidade Revenda", 1, form);
    				hasErros = true;
    			}
//    			if (isEmpty("revenda", form)) {
//        			message += getMessage("Revenda", 1, form);
//        			hasErros = true;
//        		}
    		}
    		if (isEmpty("setor", form)) {
    			message += getMessage("Setor", 1, form);
    			hasErros = true;
    		}
    		
    		if (isEmpty("assuntoSolicitacao", form)) {
    			message += getMessage("Assunto da Solicitação", 1, form);
    			hasErros = true;
    		}
    		if (isEmpty("descricaoSolicitacao", form)) {
    			message += getMessage("Descrição da Solicitação", 1, form);
    			hasErros = true;
    		}
    		
    		break;	
        case ATENDIMENTO_SETOR : 
        	
        	if(form.getValue("statusAtendimento") == 'Abertura'){
        		 message += getMessage("Status não pode ser <b>Abertura</b>.", 6, form);
                 hasErros = true;
        	}
        	
        	if (getValue("WKCompletTask") == "true" ){
        		
        		var indexes = form.getChildrenIndexes("tbAtendimento");
        		
        		for (var i = 0; i < indexes.length; i++) {
        			if (isEmpty("atendData___" + indexes[i], form) && isEmpty("atendComInterna___" + indexes[i], form)   && isEmpty("atendComExterna___" + indexes[i], form) ) {
						 message += getMessage("É preciso preencher uma <b>Comunicação Interna</b> ou <b>Comunicação Externa</b>.", 6, form);
			           	 hasErros = true;
					}
        		}
        		
	        	
	        	if(form.getValue("statusAtendimento") == 'Finalizado'){
		        	if ( form.getValue("chkStatusFinalizadoCiente") != 'ciente' ) {
		    			message += getMessage("Ciencia do Status Finalizado", 7, form);
		                hasErros = true;
		            }
	        	}
        	}
        	break;	
    }
        	
	if (hasErros) {
        if (isMobile(form)) throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}
    
function getMessage(texto, tipoMensagem, form, tabpaifilho) {
    if (isMobile(form)) {
        switch (tipoMensagem) {
            case 1:
                return 'Campo "' + texto + '" não pode estar vazio.\n';
            case 2:
                return 'Campo "' + texto + '" está inválido.\n';    
            case 3:
                return 'Selecione uma opção em "' + texto + '".\n';
            case 4:
                return 'Campo "' + texto + '" não pode ser zero.\n'; 
            case 5:
            	 return 'A tabela de  "' + tabpaifilho + '" possui um ou mais campos de "' + texto + '" inválido.\n'; 
            case 6:
           	 	return texto; 
            case 7:
           	 	return "Campo: "+texto+" precisa estar marcado.";   	 	
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>' + texto + '</b> está inválido.\n';    
            case 3:
                return "<li>Selecione uma opção em: <b>" + texto + "</b></li>";
            case 4:
                return "<li>Campo: <b>" + texto + "</b> não pode ser zero.</li>";
            case 5:
                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
            case 6:
           	 	return "<li>"+texto+"</li>";     
            case 7:
           	 	return "<li>Campo: <b>"+texto+"</b> precisa estar marcado.</li>";     
        }
    }
}    