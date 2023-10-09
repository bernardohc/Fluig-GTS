function validateForm(form){
	
    var WKNumState = getValue('WKNumState');
    var WKNextState = getValue('WKNextState');

    var message = "";
    var hasErros = false;

    switch (parseInt(WKNumState)) {
        //INICIAL
        case INICIO_0 : 
        case INICIO :  
        case SALVAR_RELATORIO :

            //Se for clicado em Enviar 
            if (getValue("WKCompletTask") == "true" ){

                if (getValue("solSetor") == "") {
                    message += getMessage("Setor", 1, form);
                    hasErros = true;
                }
                if (!isEmpty("solAdianta", form) && isEmpty("solMoeda", form)) {
                    message += getMessage("Tipo de Moeda", 1, form);
                    hasErros = true;
                }
                if (getValue("solDataSaida") == "") {
                    message += getMessage("Data de Saída", 1, form);
                    hasErros = true;
                }
                if (getValue("solDataRet") == "") {
                    message += getMessage("Data de Retorno", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solNumColab", form)) {
                    message += getMessage("Número de colaboradores", 1, form);
                    hasErros = true;
                }
                if (!isEmpty("solAdianta", form)) {
                    if (isEmpty("solMoeda", form)) {
                        message += getMessage("Moeda", 1, form);
                        hasErros = true;
                    } 
                }
                
                if (isEmpty("salvarEnviar", form)) {
                    if (isMobile(form)){
                        message += getMessage("É preciso selecionar a ação ('Salvar' ou 'Enviar')", 6, form);
                    }else{
                        message += getMessage("É preciso selecionar a ação (<b>Salvar</b> ou <b>Enviar</b>)", 6, form);
                    }
                        hasErros = true;
                }else{
                    if( form.getValue("salvarEnviar") == 'Enviar' ){
                        if( WKNumState == WKNextState ){
                            if (isMobile(form)){
                            message += getMessage("Você selecionou a opção 'Enviar' e está salvando a solicitação.", 6, form);
                        }else{
                            message += getMessage("Você selecionou a opção <b>Enviar</b> e está salvando a solicitação.", 6, form);
                        }
                            hasErros = true;
                        }
                    }
                }
                //Despesas da Viagem
                if (!isEmpty("addRvDespEstabelecimento", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Estabelecimento" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Estabelecimento</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespDocumento", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Documento" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Documento</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespData", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Data" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Data</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespTpPag", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Tp. Pagamento" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Tp. Pagamento</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespClassi", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Classificação" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Classificação</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespValor", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Valor" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Valor</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespCCusto", form) ){
                    if (isMobile(form)) {
                        message += getMessage('Campo "Centro de Custo" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('Campo <b>Centro de Custo</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }
                if (!isEmpty("addRvDespAnexo", form) ){
                    if (isMobile(form)) {
                        message += getMessage('"Anexo" precisa estar inserido na Tabela de Despesa\n' , 6, form);
                    }else{
                        message += getMessage('<b>Anexo</b> precisa estar inserido na <b>Tabela de Despesa</b>' , 6, form);
                    }
                    hasErros = true;
                }

                
                var indexesRelTbDespesas = form.getChildrenIndexes("tbRelDespesas");
                if(indexesRelTbDespesas.length == 0){
                    if (isMobile(form)) {
                        message += getMessage("Tabela de itens de despesas não possui nenhum item.", 6, form);
                    }else{
                        message += getMessage("Tabela <b>itens de despesas</b> não possui nenhum item.", 6, form);
                    }
                    hasErros = true;
                }/*else{
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

                        if (isEmpty("nomeAnexo___" + indexesSolTbDespesas[i], form)) {
                            message += getMessage("Anexo", 1, form, "Itens de despesa");
                            hasErros = true;
                        }
                        
                        
                    }
                }*/
            }         
        break;

        case ANALISA_RELATORIO  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("aprovRelatorio", form)) {
                    message += getMessage("Aprovação:", 1, form);
                    hasErros = true;
                }else{
                    if(form.getValue("aprovRelatorio") == 'aprovado'){

                        var indexTbRelDespesas = form.getChildrenIndexes("tbRelDespesas");
                        var rvDespCnpj = false;
                        var rvDespNomePosto = false;
                        var rvDespKmAbast = false;
                        var rvDespTpComb = false;
                        var rvDespQtdL = false;
                        var rvDespValorL = false;
                        var rvDespValor = false;
                        var rvDespTpPag = false;
                        for (var i = 0; i < indexTbRelDespesas.length; i++) {
                            if(form.getValue("rvDespClassi___"+indexTbRelDespesas[i]) == 'Combustível'){
                                
                                if ( !rvDespCnpj && isEmpty("rvDespCnpj___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("CNPJ do Posto", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespCnpj = true;
                                }else if(!rvDespCnpj && form.getValue("rvDespCnpj___"+ indexTbRelDespesas[i]).length() != 18 ){
                                    message += getMessage("CNPJ do Posto", 5, form,  "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespCnpj = true;
                                }
                                if ( !rvDespNomePosto && isEmpty("rvDespNomePosto___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Nome do Posto", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespNomePosto = true;
                                }
                                if ( !rvDespKmAbast && isEmpty("rvDespKmAbast___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Km Abastecimento", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespKmAbast = true;
                                }
                                if ( !rvDespTpComb && isEmpty("rvDespTpComb___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Tipo de Combustível", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespTpComb = true;
                                }
                                if ( !rvDespQtdL && isEmpty("rvDespQtdL___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Qtd. Litros", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespQtdL = true;
                                }
                                if ( !rvDespValorL && isEmpty("rvDespValorL___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Valor Litro", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespValorL = true;
                                }
                                if ( !rvDespValor && isEmpty("rvDespValor___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Valor Total", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespValor = true;
                                }
                                if ( !rvDespTpPag && isEmpty("rvDespTpPag___" + indexTbRelDespesas[i], form)) {
                                    message += getMessage("Forma de Pagamento", 5, form, "Despesa de Viagens");
                                    hasErros = true;
                                    rvDespTpPag = true;
                                }
                            }
                        }

                    }else if (form.getValue("aprovRelatorio") == 'reprovado') {
                        if (isEmpty("rvAproObs", form)) {
                            message += getMessage("Observação:", 1, form);
                            hasErros = true;
                        }                    
                    }
                }
                
            }
        
        break;

        case AJUSTA_RELATORIO  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("salvarEnviar", form)) {
                    message += getMessage("Deseja salvar ou enviar?", 1, form);
                    hasErros = true;
                }
            }
        
        break;

        case REVISA_RELATORIO  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("revisaoRelatorio", form)) {
                    message += getMessage("Revisão:", 1, form);
                    hasErros = true;
                }
                if (form.getValue("revisaoRelatorio") == 'revisaoReprovado') {
                    if (isEmpty("rvRevisaoObs", form)) {
                        message += getMessage("Observação:", 1, form);
                        hasErros = true;
                    }                    
                }
                
            }
        
        break;
        case ANALISA_ERRO_INTEGRACAO_ABASTECIMENTO :
            
            if (isEmpty("geraisCodMotorista", form)) {
                message += getMessage("Cod. Motorista", 1, form);
                hasErros = true;
            }
            if (isEmpty("geraisCPFMotorista", form)) {
                message += getMessage("CPF Motorista", 1, form);
                hasErros = true;
            }
            if (isEmpty("solNomeSol", form)) {
                message += getMessage("Nome Solicitante", 1, form);
                hasErros = true;
            }
            
            /*
            * Abastecimento
            */
            var indexTbRelDespesas = form.getChildrenIndexes("tbRelDespesas");
            var rvDespCnpj = false;
            var rvDespNomePosto = false;
            var rvDespKmAbast = false;
            var rvDespTpComb = false;
            var rvDespQtdL = false;
            var rvDespValorL = false;
            var rvDespValor = false;
            var rvDespTpPag = false;
            for (var i = 0; i < indexTbRelDespesas.length; i++) {
                if(form.getValue("rvDespClassi___"+indexTbRelDespesas[i]) == 'Combustível'){
                    
                    if ( !rvDespCnpj && isEmpty("rvDespCnpj___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("CNPJ do Posto", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespCnpj = true;
                    }else if(!rvDespCnpj && form.getValue("rvDespCnpj___"+ indexTbRelDespesas[i]).length() != 18 ){
                        message += getMessage("CNPJ do Posto", 5, form,  "Despesa de Viagens");
                        hasErros = true;
                        rvDespCnpj = true;
                    }
                    if ( !rvDespNomePosto && isEmpty("rvDespNomePosto___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Nome do Posto", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespNomePosto = true;
                    }
                    if ( !rvDespKmAbast && isEmpty("rvDespKmAbast___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Km Abastecimento", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespKmAbast = true;
                    }
                    if ( !rvDespTpComb && isEmpty("rvDespTpComb___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Tipo de Combustível", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespTpComb = true;
                    }
                    if ( !rvDespQtdL && isEmpty("rvDespQtdL___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Qtd. Litros", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespQtdL = true;
                    }
                    if ( !rvDespValorL && isEmpty("rvDespValorL___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Valor Litro", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespValorL = true;
                    }
                    if ( !rvDespValor && isEmpty("rvDespValor___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Valor Total", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespValor = true;
                    }
                    if ( !rvDespTpPag && isEmpty("rvDespTpPag___" + indexTbRelDespesas[i], form)) {
                        message += getMessage("Forma de Pagamento", 5, form, "Despesa de Viagens");
                        hasErros = true;
                        rvDespTpPag = true;
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
            case 9:
                return "Atenção! Selcione a opção: " +texto;    
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
            case 9:
                return "<li>Atenção! Selcione a opção: <b>"+texto+"</b></li>";  
        }
    }
} 