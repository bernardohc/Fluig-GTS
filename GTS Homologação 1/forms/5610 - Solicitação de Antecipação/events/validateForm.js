function validateForm(form){
	
var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
      		
    		//Se for clicado em Enviar 
            if (getValue("WKCompletTask") == "true" ){   	
            	
				//Itens Despesa
				var indexessolTbMaquinas = form.getChildrenIndexes("solTbMaquinas");
				if(indexessolTbMaquinas.length == 0){
					if (isMobile(form)) {
						message += getMessage("Tabela de itens de despesas não possui nenhum item.", 6, form);
					}else{
						message += getMessage("Tabela <b>itens de despesas</b> não possui nenhum item.", 6, form);
					}
					hasErros = true;
				}else{
					for (var i = 0; i < indexessolTbMaquinas.length; i++) {

						if (isEmpty("solPedido___" + indexessolTbMaquinas[i], form)) {
						message += getMessage("Pedido", 1, form, "Maquinas");
						hasErros = true;
						} 	

						if (isEmpty("solProduto___" + indexessolTbMaquinas[i], form)) {
							message += getMessage("Produto", 1, form, "Maquinas");
							hasErros = true;
						}

						if (isEmpty("solPrazo___" + indexessolTbMaquinas[i], form)) {
							message += getMessage("Prazo", 1, form, "Maquinas");
							hasErros = true;
						}
		
					}
            	            	          	
				}            	
            	
    		}

    	break;
        case ANALISA_ANTECIPACAO:

            if (isEmpty("solPrazoAprov", form)) {
                message += getMessage("Prazo", 1, form);
                hasErros = true;
            }

            if (isEmpty("obsAntecipacao", form)) {
                message += getMessage("Observação", 1, form);
                hasErros = true;
            }

            if (isEmpty("solAntecipacao", form)) {
                message += getMessage("Aprovacao", 1, form);
                hasErros = true;
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
        }
    }
} 