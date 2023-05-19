function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        	
        	//Revenda
        	if (isEmpty("revCpfCnpj", form)) {
    			message += getMessage("CPF/CNPJ", 1, form);
    			hasErros = true;
    		}
        	if (isEmpty("revRazaoSocialRevenda", form)) {
        		message += getMessage("Razão Social", 1, form);
        		hasErros = true;
        	}
        	if (isEmpty("revNomeFantasiaRevenda", form)) {
        		message += getMessage("Nome Fantasia", 1, form);
        		hasErros = true;
        	}
        	
        	//Equipamento
    		if (isEmpty("equipNumSerie", form)) {
    			message += getMessage("Número de Série", 1, form);
    			hasErros = true;
    		}
    		
    		//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){
    			
    			if (isEmpty("equipCodProduto", form)) {
	    			message += getMessage("Código do Produto do Equipamento", 1, form);
	    			hasErros = true;
	    		}
	    		if (isEmpty("equipDescricao", form)) {
	    			message += getMessage("Descrição do Equipamento", 1, form);
	    			hasErros = true;
	    		}
    		}
    		
    		break;
    		
        case GTS_ANALISA_DEMANDA : 
    			
        	//Análise e Aprovação da Transferência
        	//Se for clicado em Enviar
    		if (getValue("WKCompletTask") == "true" ){
    			
        		if (isEmpty("transEqptAprovacao", form)) {	
	       			message += getMessage("Análise e Aprovação da Transferência", 3, form);
	       			hasErros = true;
        		}else if( form.getValue("transEqptAprovacao") == 'reprovado' ){
        			if (isEmpty("transEqptAprovacaoObservacao", form)) {	
	   	       			message += getMessage("Observação", 1, form);
	   	       			hasErros = true;
   	       			}
        		}
    		}
        	break;
        case REVENDA_VERIFICA_RETORNO : 
        	
        	if ( form.getValue("revCienteRetornoGTS") != 'ciente' ) {
    			message += getMessage("Estou ciente do retorno da GTS sobre a Transferência de Equipamento.", 7, form);
                hasErros = true;
            }
        	break;
        
    }
        	
	if (hasErros) {
        if (isMobile(form)) throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
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
            case 8:
            	return "É preciso anexar um documento de "+texto+".";   
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
            case 8:
            	return "<li>É obrigatório anexar um <b>"+texto+"</b>.</li>";     
        }
    }
}    