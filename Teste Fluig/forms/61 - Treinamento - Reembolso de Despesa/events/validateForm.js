function validateForm(form){
	
var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	//INICIAL
        case INICIO_0 : 
        case INICIO : 
        case AJUSTA_REEMBOLSO:

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
        		
            	if (isEmpty("solTelefone", form)) {
                    message += getMessage("Número do telefone", 1, form);
                    hasErros = true;
                }   	
            	
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
            	        
            	        if (isEmpty("itSolTipoDespesaItem___" + indexesSolTbDespesas[i], form)) {
            	             message += getMessage("Tipo de despesa", 5, form, "Itens de despesa");
            	                hasErros = true;
            	        }else if( form.getValue("itSolTipoDespesaItem___"+ indexesSolTbDespesas[i]) == "Outro" ){
            	            if (isEmpty("itSolObsDespesaItem___" + indexesSolTbDespesas[i], form)) {
            	                message += getMessage("Despesa do tipo <b>Outro</b> precisa ser preenchida a <b>Observação</b>.", 6, form, "Itens de despesa");
            	                hasErros = true;
            	            }
            	        }

            	        if (isEmpty("itSolValorReembolsoItem___" + indexesSolTbDespesas[i], form)) {
            	            message += getMessage("Valor", 5, form, "Itens de despesa");
            	            hasErros = true;
            	        }
            	        
            	    }
            	}
            	
            	if (isEmpty("solTipoDespesa", form)) {
                    message += getMessage("Selecione uma opção de despesa", 7, form);
                    hasErros = true;
                }else if( form.getValue("solTipoDespesa") == 'Outro' ){
      	       		if (isEmpty("solTipoDespesaOutro", form)) {	
      	       			message += getMessage("Outro despesa", 1, form);
    	       			hasErros = true;
      	       		}
                	
                }
            	
            	
            	if (isEmpty("solNumNotaFiscal", form)) {
                    message += getMessage("Numero da Nota Fiscal", 1, form);
                    hasErros = true;
                }           	
            	if (isEmpty("solDataNotaFiscal", form)) {
                    message += getMessage("Data Nota Fiscal", 1, form);
                    hasErros = true;
                }else{
                	
                	var dataNotaFiscal = form.getValue("solDataNotaFiscal");
            		
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
            	
            	if (isEmpty("solTipoDespesa", form)) {
                    message += getMessage("Tipo de Despesa", 3, form);
                    hasErros = true;
                }
            	
            	if (isEmpty("solValorReembolso", form)) {
                    message += getMessage("Valor da Nota Fiscal", 1, form);
                    hasErros = true;
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