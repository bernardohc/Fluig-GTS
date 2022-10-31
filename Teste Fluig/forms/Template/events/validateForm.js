function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 

    		if (isEmpty("campoTexto", form)) {
                message += getMessage("Campo Texto", 1, form);
                hasErros = true;
            }
			       	
			if( form.getValue("campoCombobox") == 'CB1' ){
			        		
				message += getMessage("Não pode marcar a opção 1 do combobox", 6, form);
                hasErros = true;
			}
			        		
    		//Se for clicado em Enviar valida se o valor mínimo foi atingido
            if (getValue("WKCompletTask") == "true" ){
        		
            	if( isEmpty("campoNumDecimal", form) ){
            		 message += getMessage("Campo Num Decimal", 1, form);
                    hasErros = true;
    			}else{
    				var campoNumDecimal = parseInt(form.getValue("campoNumDecimal").replace('.','').replace(',','.') );
            		if(campoNumDecimal < 1500){
            			if (isMobile(form)) {
    	            		message += getMessage("O valor mínimo da campoNumDecimal é de R$ 1.500,00", 6, form);
    	            	}else{
    	            		message += getMessage("O valor mínimo da campoNumDecimal é de <b>R$ 1.500,00</b>", 6, form);
    	            	}
            			
                        hasErros = true;
            		}
    			}
            	
            	
    		}
			        		
			        	
//        	var indexes = form.getChildrenIndexes("tbItensOrcamento");
//            var itemOrcamentoExisteQtdCP3Ret = false;
//			            
//            if(indexes.length == 0){
//            	if (isMobile(form)) {
//            		message += getMessage("Tabela de itens não possui nenhum item.", 6, form);
//            	}else{
//            		message += getMessage("Tabela <b>itens</b> não possui nenhum item.", 6, form);
//            	}
//            	hasErros = true;
//            }else{
//				for (var i = 0; i < indexes.length; i++) {
//					var orcQtdItem = '';
//					var orcEmbalagemItem = '';
//					var orcCodProdutoItem = form.getValue("orcCodProdutoItem___"+ indexes[i]);
//    				var orcDescProdutoItem = form.getValue("orcDescProdutoItem___"+ indexes[i]);
//					
//					if (!itemOrcamentoCodProdItem && isEmpty("orcCodProdutoItem___" + indexes[i], form)) {
//						 message += getMessage("Cod. Produto", 5, form, "Itens do orçamento");
//			           	 hasErros = true;
//			           	itemDivergPecaCodProdItem=  true;
//					}
//								
//				}
//            }
    	break;
    	
        case ATIVIDADE_CENTRAL : 
        	
        	if (isEmpty("campoTextoLGPD", form)) {
                message += getMessage("Campo Texto LGPD", 1, form);
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
function dataAtual(formato){
    var retornoData = "";
	var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    
    if(formato == "dd/mm/yyyy"){
    	retornoData = dia + "/" + mes + "/" + ano;
    }else if(formato == "yyyymmdd"){
    	retornoData = ano + "" + mes + "" + dia;
    }
    
    return retornoData;
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