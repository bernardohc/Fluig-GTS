function validateForm(form){
	
var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        case AJUSTA_REEMBOLSO:

    		if (isEmpty("solPedido", form)) {
                message += getMessage("Pedido", 1, form);
                hasErros = true;
            }
      		
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

						if (isEmpty("solProdutoAtual___" + indexessolTbMaquinas[i], form)) {
						message += getMessage("Produto Atual", 1, form, "Maquinas");
						hasErros = true;
						} 	

						if (isEmpty("solProdutoDestino___" + indexessolTbMaquinas[i], form)) {
							message += getMessage("Produto Destino", 1, form, "Maquinas");
							hasErros = true;
						}

						if (isEmpty("solPrazo___" + indexessolTbMaquinas[i], form)) {
							message += getMessage("Prazo", 1, form, "Maquinas");
							hasErros = true;
						}else{
							
							var dataNotaFiscal = form.getValue("solPrazo");
							
							var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
							var dataNotaFiscalParse = sdf.parse(dataNotaFiscal);
							
								var dataHoje = java.util.Calendar.getInstance();
								//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
								var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
								
								log.info('Data Nota Fiscal: ' + dataNotaFiscal);
								log.info('Data Nota Fiscal Parse: ' + dataNotaFiscalParse);
								log.info('Data Hoje: ' + dataHoje);
								log.info('Data Hoje Parse: ' + dataHojeParse);
								
								//Se a data de hoje for menor que a data inserida de nota fiscal
								if(dataHojeParse.before(dataNotaFiscalParse)){
									if(isMobile(form)){
										message += getMessage("A data da 'Nota Fiscal' não pode ser maior que hoje.", 6, form);	
									}else{
										message += getMessage("A data da <b>Nota Fiscal</b> não pode ser maior que hoje.", 6, form);	
									}
									hasErros = true;
								}
								
							
					}
				}
            	            	          	
}            	
            	
    		}

    	break;
        case ANALISA_REEMBOLSO: 
        	if (isEmpty("aprovReembolso", form)) {	
     			 message += getMessage("Aprovação Gerente", 3, form);
     			 hasErros = true;
        	}else if( form.getValue("aprovReembolso") == 'reprovado' ){
  	       		if (isEmpty("aprovReembolsoObs", form)) {	
  	       			message += getMessage("Observação", 1, form);
	       			hasErros = true;
  	       		}
  	       	}
        break;
        
        case PAGAMENTO_REEMBOLSO:
        	
        	if (isEmpty("pagtoReembolso", form)) {	
    			 message += getMessage("Pagamento do Reembolso Realizado", 7, form);
    			 hasErros = true;
        	}
        	
        	if (isEmpty("dataPgtoReembolso", form)) {
                message += getMessage("Data Pagamento", 1, form);
                hasErros = true;
            }else{
            	
            	var dataPgtoReembolso = form.getValue("dataPgtoReembolso");
        		
        		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
        		var dataPgtoReembolsoParse = sdf.parse(dataPgtoReembolso);
        		
     		    var dataHoje = java.util.Calendar.getInstance();
     			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
     		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
     		    
     		    //Se a data de hoje for menor que a data inserida de nota fiscal
     		    if(dataHojeParse.before(dataPgtoReembolsoParse)){
     		    	if(isMobile(form)){
     		    		message += getMessage("A data do pagamento não pode ser maior que hoje.", 6, form);	
     		    	}else{
     		    		message += getMessage("A data do <b>Pagamento</b> não pode ser maior que hoje.", 6, form);	
     		    	}
     		    	hasErros = true;
     		   	}
            	
            }
        break;
        
        case CONFIRMA_REEMBOLSO:
        	if (isEmpty("confRecebimento", form)) {	
    			 message += getMessage("Confirma recebimento", 3, form);
    			 hasErros = true;
        	}else if( form.getValue("confRecebimento") == 'nao_confirmado' ){
 	       		if (isEmpty("confObs", form)) {	
 	       			message += getMessage("Observação", 1, form);
	       			hasErros = true;
 	       		}
 	       	}
        break;
        case AN_PGTO_REEMBOLSO:
        	if (isEmpty("pagtoReembolso", form)) {	
   			 message += getMessage("Pagamento do Reembolso Realizado", 7, form);
   			 hasErros = true;
       	}
       	
        	if (isEmpty("solPrazo", form)) {
               message += getMessage("Data Pagamento", 1, form);
               hasErros = true;
           }else{
           	
           	var dataPgtoReembolso = form.getValue("solPrazo");
       		
       		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
       		var dataPgtoReembolsoParse = sdf.parse(dataPgtoReembolso);
       		
		    var dataHoje = java.util.Calendar.getInstance();
			//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
		    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
    		    
		    //Se a data de hoje for menor que a data inserida de nota fiscal
		    if(dataHojeParse.before(dataPgtoReembolsoParse)){
		    	if(isMobile(form)){
		    		message += getMessage("A data do pagamento não pode ser maior que hoje.", 6, form);	
		    	}else{
		    		message += getMessage("A data do <b>Pagamento</b> não pode ser maior que hoje.", 6, form);	
		    	}
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