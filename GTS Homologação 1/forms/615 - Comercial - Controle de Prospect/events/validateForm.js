function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        	
                
    		if (isEmpty("nomeRevendaCliente", form)) {
                message += getMessage("Nome da Revenda/Cliente", 1, form);
                hasErros = true;
            }
        	if (isEmpty("acao", form)) {
                message += getMessage("Ação", 1, form);
                hasErros = true;
            }
        	if (isEmpty("descricaoInicial", form)) {
                message += getMessage("Descrição", 1, form);
                hasErros = true;
            }
        	
        	if (isEmpty("obsInteracao", form)) {
        		message += getMessage("Observação", 1, form);
        		hasErros = true;
        	}
        	//Se for clicado em Enviar
        	if (getValue("WKCompletTask") == "true" ){
    			if (isEmpty("encaminharAtividade", form)) {		
                    message += getMessage("É preciso selecionar para que irá encaminhar a atividade", 6, form);
                    hasErros = true;
                }
    			if (form.getValue("encaminharAtividade") == 'encaminhaRepresentante' &&
    					isEmpty("WKUserRepresentante", form)){
					message += getMessage("Representante", 1, form);
		           	hasErros = true;
				}else if (form.getValue("encaminharAtividade") == 'encaminhaGestorTerritorial' &&
    					isEmpty("WKUserGestorTerritorial", form)){
					message += getMessage("Gestor Territorial", 1, form);
		           	hasErros = true;
				}else if (form.getValue("encaminharAtividade") == 'encaminhaGestorComercial' &&
    					isEmpty("WKUserGestorComercial", form) ){
					message += getMessage("Gestor Comercial", 1, form);
		           	hasErros = true;
				}else if (form.getValue("encaminharAtividade") == 'encaminhaFinalizar'){
					message += getMessage("Não é possível finalizar a atividade", 6, form);
		           	hasErros = true;
				}
    			
        	}else{
        		
        		if (!isEmpty("encaminharAtividade", form)) {		
        			message += getMessage("Atividade salva não é encaminhada para nenhum usuário.", 6, form);
                    hasErros = true;
                }
        		
        	}
        	
        	 
        	break;
        	
        case REPRESENTANTE : 
        	
        	if (isEmpty("obsInteracao", form)) {
        		message += getMessage("Observação", 1, form);
        		hasErros = true;
        	}
        	//Se for clicado em Enviar
        	if (getValue("WKCompletTask") == "true" ){
    			if (isEmpty("encaminharAtividade", form)) {		
                    message += getMessage("É preciso selecionar para que irá encaminhar a atividade", 6, form);
                    hasErros = true;
                }
    			if (form.getValue("encaminharAtividade") == 'encaminhaGestorTerritorial' &&
    					isEmpty("WKUserGestorTerritorial", form)){
					message += getMessage("Gestor Territorial", 1, form);
		           	hasErros = true;
				}else if (form.getValue("encaminharAtividade") == 'encaminhaGestorComercial' &&
    					isEmpty("WKUserGestorComercial", form) ){
					message += getMessage("Gestor Comercial", 1, form);
		           	hasErros = true;
				}
        	}else{
        		
        		if (!isEmpty("encaminharAtividade", form)) {		
        			message += getMessage("Atividade salva não é encaminhada para nenhum usuário.", 6, form);
                    hasErros = true;
                }
        		
        	}
        	
        	break;
        
        case GESTOR_TERRITORIAL : 
        	
        	if (isEmpty("obsInteracao", form)) {
        		message += getMessage("Observação", 1, form);
        		hasErros = true;
        	}
        	
        	//Se for clicado em Enviar
        	if (getValue("WKCompletTask") == "true" ){
    			if (isEmpty("encaminharAtividade", form)) {		
                    message += getMessage("É preciso selecionar para que irá encaminhar a atividade", 6, form);
                    hasErros = true;
                }
    			if (form.getValue("encaminharAtividade") == 'encaminhaRepresentante' &&
    					isEmpty("WKUserRepresentante", form)){
					message += getMessage("Representante", 1, form);
		           	hasErros = true;
				}else if (form.getValue("encaminharAtividade") == 'encaminhaGestorComercial' &&
    					isEmpty("WKUserGestorComercial", form) ){
					message += getMessage("Gestor Comercial", 1, form);
		           	hasErros = true;
				}
        	}else{
        		
        		if (!isEmpty("encaminharAtividade", form)) {		
        			message += getMessage("Atividade salva não é encaminhada para nenhum usuário.", 6, form);
                    hasErros = true;
                }
        		
        	}
        	
        	break;	
        	
        case GESTOR_COMERCIAL : 
        	
        	if (isEmpty("obsInteracao", form)) {
        		message += getMessage("Observação", 1, form);
        		hasErros = true;
        	}
        	//Se for clicado em Enviar
        	if (getValue("WKCompletTask") == "true" ){
    			if (isEmpty("encaminharAtividade", form)) {		
                    message += getMessage("É preciso selecionar para que irá encaminhar a atividade", 6, form);
                    hasErros = true;
                }
    			
    			if (form.getValue("encaminharAtividade") == 'encaminhaRepresentante' &&
    					isEmpty("WKUserRepresentante", form)){
					message += getMessage("Representante", 1, form);
		           	hasErros = true;
				}else if (form.getValue("encaminharAtividade") == 'encaminhaGestorTerritorial' &&
    					isEmpty("WKUserGestorTerritorial", form)){
					message += getMessage("Gestor Territorial", 1, form);
		           	hasErros = true;
				}
        	}else{
        		
        		if (!isEmpty("encaminharAtividade", form)) {		
                    message += getMessage("Atividade salva não é encaminhada para nenhum usuário.", 6, form);
                    hasErros = true;
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
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>"' + texto + '"</b> está inválido.\n';    
            case 3:
                return "<li>Selecione uma opção em: <b>" + texto + "</b></li>";
            case 4:
                return "<li>Campo: <b>" + texto + "</b> não pode ser zero.</li>";
            case 5:
                return "<li>A tabela de <b>" + tabpaifilho + "</b> possui um ou mais campos de <b>" + texto + "</b> inválido.</li>";  
            case 6:
           	 	return "<li>"+texto+"</li>";     
        }
    }
}    