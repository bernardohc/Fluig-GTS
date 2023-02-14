function validateForm(form){
	
    var WKNumState = getValue('WKNumState');
        
        var message = "";
        var hasErros = false;
        
        switch (parseInt(WKNumState)) {
            //INICIAL
            case INICIO_0 : 
            case INICIO :   

                if (isEmpty("Unidade", form)) {
                    message += getMessage("Unidade", 1, form);
                    hasErros = true;
                }
                 
                //Se for clicado em Enviar 
                if (getValue("WKCompletTask") == "true" ){
                  
                    //Pças
                    var indexesSolTbDespesas = form.getChildrenIndexes("solTbMaquinas");
                    if(indexesSolTbDespesas.length == 0){
                        if (isMobile(form)) {
                            message += getMessage("Não possuí nenhuma solicitação cadastrada!.", 6, form);
                        }else{
                            message += getMessage("Não possuí nenhuma solicitação cadastrada!.", 6, form);
                        }
                        hasErros = true;
                    }else{
                        for (var i = 0; i < indexesSolTbDespesas.length; i++) {
    
                            if (isEmpty("solProduto___" + indexesSolTbDespesas[i], form)) {
                                message += getMessage("Produto", 1, form, "Solicitação");
                                hasErros = true;
                            }if (isEmpty("solQuantidade___" + indexesSolTbDespesas[i], form)) {
                                message += getMessage("Quantidade", 1, form, "Solicitação");
                                hasErros = true;
                            }if (isEmpty("solTipo___" + indexesSolTbDespesas[i], form)) {
                                message += getMessage("Tipo", 1, form, "Solicitação");
                                hasErros = true;      
                            }if (isEmpty("solObs___" + indexesSolTbDespesas[i], form)) {
                                message += getMessage("Observação", 1, form, "Solicitação");
                                hasErros = true;
                            }if (isEmpty("solVendedor___" + indexesSolTbDespesas[i], form)) {
                                message += getMessage("Vendedor", 1, form, "Solicitação");
                                hasErros = true;
                            }                                        
                        }
                    }
                }
    
            break;	
            
            case ANALISA_SOLICITACAO:  
               
            if (isEmpty("solAprovacao", form)) {
                message += getMessage("Aprovação", 1, form);
                hasErros = true;
            }
    
                //Se for clicado em Enviar 
                if (getValue("WKCompletTask") == "true" ){

                    if (isEmpty("Unidade", form)) {
                        message += getMessage("Unidade", 1, form);
                        hasErros = true;
                    }if(form.getValue("solAprovacao") == 'reprovado' ){
                        if (isEmpty("obsAlteracao", form)) {	
                            message += getMessage("Obsevação", 1, form);
                            hasErros = true;
                        }
                    }        
                  
                    //Peças
                    var indexesSolTbDespesas = form.getChildrenIndexes("solTbMaquinas");
                    if(indexesSolTbDespesas.length == 0){
                        if (isMobile(form)) {
                            message += getMessage("Não possuí nenhuma solicitação cadastrada!.", 6, form);
                        }else{
                            message += getMessage("Não possuí nenhuma solicitação cadastrada!.", 6, form);
                        }
                        hasErros = true;
                    }else{
                        for (var i = 0; i < indexesSolTbDespesas.length; i++) {
                            
                            
                            if (isEmpty("solLiberacao___" + indexesSolTbDespesas[i], form)) {
                                 message += getMessage("Liberação PCP", 1, form, "Produtos");
                                    hasErros = true;
                            }else if( form.getValue("solLiberacao___"+ indexesSolTbDespesas[i]) == "Parcial" ){
                                if (isEmpty("solQtdeLiberada___" + indexesSolTbDespesas[i], form)) {
                                    message += getMessage("Quantidade Liberado.", 9, form, "Itens de despesa");
                                    hasErros = true;
                                }
                            }                                      
                        }
                    }
                }
            break;
    
            case SEPARACAO_ALMOX:
                
                if (isEmpty("aprovContagem", form)) {
                    message += getMessage("Separação", 1, form);
                    hasErros = true;
                }if(form.getValue("aprovContagem") == 'contagemNãoFinalizada' ){
                    if (isEmpty("obslmox", form)) {	
                        message += getMessage("Obsevação", 1, form);
                        hasErros = true;
                    }
                }
    
                //Se for clicado em Enviar 
                if (getValue("WKCompletTask") == "true" ){
                    
                    var indexesSolTbDespesas = form.getChildrenIndexes("solTbMaquinas");
                    if(indexesSolTbDespesas.length == 0){
                        if (isMobile(form)) {
                            message += getMessage("Não possuí nenhuma solicitação cadastrada!.", 6, form);
                        }else{
                            message += getMessage("Não possuí nenhuma solicitação cadastrada!.", 6, form);
                        }
                        hasErros = true;
                    }else{
                        for (var i = 0; i < indexesSolTbDespesas.length; i++) {
                            
                         if( form.getValue("aprovContagem___"+ indexesSolTbDespesas[i]) == "contagemFinalizada" ){
                                                           
                            if (isEmpty("solQtdeAlmox___" + indexesSolTbDespesas[i], form)) {
                                    message += getMessage(" Quantidade Almox precisa ser preenchida.", 1, form, "Itens de despesa");
                                    hasErros = true;
                                }
                            }                                      
                        }
                    }
                }
    
            break;
            
        }if (hasErros) {
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
                case 9:
                return "Campo: "+texto+" não pode estar vazio caso seja liberado parcialmente.";  	 	
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
                    return "<li>Campo: <b>"+texto+"</b> não pode ser menor que a data de saída. </li>";     
                case 9:
                return "<li>Campo: <b>"+texto+"</b> não pode estar vazio caso liberação seja Parcial. </li>"; 
            }
        }
    } 