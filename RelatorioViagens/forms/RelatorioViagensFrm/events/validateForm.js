function validateForm(form){
	
var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        case ANALISA_RELATORIO:

    		if (isEmpty("solMatSolicitante", form)) {
                message += getMessage("Matricula do Solicitante", 1, form);
                hasErros = true;
            }
    		
    		if (isEmpty("solNomeSolicitante", form)) {
                message += getMessage("Nome do Solicitante", 1, form);
                hasErros = true;
            }
			        		
    		//Se for clicado em Enviar 
            if (getValue("WKCompletTask") == "true" ){
        		
				if (isEmpty("solValorAdiantamento", form)) {
                    message += getMessage("Valor do Adiantamento", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solNumColaboradores", form)) {
                    message += getMessage("Número de Colaboradores", 1, form);
                    hasErros = true;
                }
				if (isEmpty("solDataSaida", form)) {
                    message += getMessage("Data de Saída", 1, form);
                    hasErros = true;
                }
				if (isEmpty("solDataRetorno", form)) {
                    message += getMessage("Data de Retorno", 1, form);
                    hasErros = true;
                }/*                
                if ("solDataSaida" > "solDataRetorno", form) {
                    message += getMessage("Data de Retorno", 8, form);
                    hasErros = true;

                    Number($("#solQuantidade2").val());	
                }*/
              
            	//Itens Despesa
            	var indexesSolTbDespesas = form.getChildrenIndexes("solTbDespesas");
            	if(indexesSolTbDespesas.length == 0){
            	    if (isMobile(form)) {
            	        message += getMessage("Tabela de itens de despesas não possui nenhum item.", 6, form);
            	    }else{
            	        message += getMessage("Tabela <b>itens de despesas</b> não possui nenhum item.", 6, form);
            	    }
            	    hasErros = true;
            	}else{
            	    for (var i = 0; i < indexesSolTbDespesas.length; i++) {

						if (isEmpty("solEstabelecimento___" + indexesSolTbDespesas[i], form)) {
						message += getMessage("Estabelecimento", 1, form, "Itens de despesa");
						hasErros = true;
						} 
                        if (isEmpty("solDocumento___" + indexesSolTbDespesas[i], form)) {
                        message += getMessage("Número do Documento", 1, form, "Itens de despesa");
                        hasErros = true;
                        }
                         if (isEmpty("solDataDocumento___" + indexesSolTbDespesas[i], form)) {
						message += getMessage("Data do Documento", 1, form, "Itens de despesa");
						hasErros = true;
						}                   
            	        if (isEmpty("itSolTipoPagamento___" + indexesSolTbDespesas[i], form)) {
            	        message += getMessage("Tipo de Pagamento", 1, form, "Itens de despesa");
                        hasErros = true;
						}
						if (isEmpty("itSolTipoDespesaItem___" + indexesSolTbDespesas[i], form)) {
						message += getMessage("Classificação de Despesa", 1, form, "Itens de despesa");
						hasErros = true;
					   	}
					  	if (isEmpty("itSolValorDespesa___" + indexesSolTbDespesas[i], form)) {
						message += getMessage("Valor da Despesa", 1, form, "Itens de despesa");
						   hasErros = true;
				   		}
						if (isEmpty("itSolCentroCusto___" + indexesSolTbDespesas[i], form)) {
						message += getMessage("Centro de Custo", 1, form, "Itens de despesa");
						hasErros = true;
						}
                        
            	        
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
            case 8:
                return "Campo: "+texto+" não pode ser menor que a data de saída";  	 	
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
            case 7:
           	 	return "<li>Campo: <b>"+texto+"</b> precisa estar marcado.</li>";
            case 8:
                return "<li>Campo: <b>"+texto+"</b> não pode ser menor que a data de saída </li>";     
        }
    }
} 