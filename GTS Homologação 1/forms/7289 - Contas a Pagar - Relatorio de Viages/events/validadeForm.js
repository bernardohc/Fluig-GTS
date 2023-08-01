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

                if (isEmpty("solSetor", form)) {
                    message += getMessage("Setor", 1, form);
                    hasErros = true;
                }
                if (!isEmpty("solAdianta", form) & isEmpty("solMoeda", form)) {
                    message += getMessage("Tipo de Moeda", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solDataSaida", form)) {
                    message += getMessage("Data de Saída", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solDataRet", form)) {
                    message += getMessage("Data de Retorno", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solNumColab", form)) {
                    message += getMessage("Número de colaboradores", 1, form);
                    hasErros = true;
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

                /*
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

                        if (isEmpty("nomeAnexo___" + indexesSolTbDespesas[i], form)) {
                            message += getMessage("Anexo", 1, form, "Itens de despesa");
                            hasErros = true;
                        }
                        
                        
                    }
                }*/
            }         
        break;

       /* case Registro_Ocorrências :
        
        break;

        case Pesquisa_Pos_Safra  :
            if (getValue("WKCompletTask") == "true" ){
                if(form.getValue("psPesqEfetivoCont") == 'sim'){
                    if (isEmpty("psPesqEntregaPor", form)) {
                        message += getMessage("Pesquisa de Satisfação - Entrega relizada por:", 1, form);
                        hasErros = true;
                    } 
                    if (isEmpty("psSolDataPesq", form)) {
                        message += getMessage("Pesquisa de Satisfação - Data da pesquisa:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqNumSerie", form)) {
                        message += getMessage("Pesquisa de Satisfação - Númerio de Série:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqModelo", form)) {
                        message += getMessage("Pesquisa de Satisfação - Modelo:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqRevenda", form)) {
                        message += getMessage("Pesquisa de Satisfação - Revenda:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqCidadeRevenda", form)) {
                        message += getMessage("Pesquisa de Satisfação - Cidade da revenda:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqCliente", form)) {
                        message += getMessage("Pesquisa de Satisfação - Cliente:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqCidadeCliente", form)) {
                        message += getMessage("Pesquisa de Satisfação - Cidade do cliente:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqAcompanhouEntrega", form)) {
                        message += getMessage("Pesquisa de Satisfação - Quem acompanhou a entrega:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqTelefone", form)) {
                        message += getMessage("Pesquisa de Satisfação - Telefone:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqNotaAtendimento", form)) {
                        message += getMessage("Pesquisa de Satisfação - Como foi o Atendimento:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqFeedbackAtendimento", form)) {
                        message += getMessage("Pesquisa de Satisfação - Feedback do atendimento:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqNotaDesempenho", form)) {
                        message += getMessage("Pesquisa de Satisfação - Desempenho do equipamento:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqFeedbackEquipamento", form)) {
                        message += getMessage("Pesquisa de Satisfação - Feedback do equipamento:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqDispRevenda", form)) {
                        message += getMessage("Pesquisa de Satisfação - Disponibilidade peças:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqFeedbackPecas", form)) {
                        message += getMessage("Pesquisa de Satisfação - Disponibilidade peças:", 1, form);
                        hasErros = true;
                    }
                    if (form.getValue("psPesqOcorrencia") == 'sim') {
                        var tbPSPesqOcorrencias = form.getChildrenIndexes("tbPSPesqOcorrencias");
                        if(tbPSPesqOcorrencias.length == 0){
                            if (isMobile(form)) {
                                message += getMessage("Ocorrências não possuem nenhum item.", 6, form);
                            }else{
                                message += getMessage("<b>Ocorrencias</b> não possuem nenhum item.", 6, form);
                            }
                            hasErros = true;
                        }
                    }else if(isEmpty("psPesqOcorrencia", form)){
                        message += getMessage("Teve ocorrência:", 1, form);
                        hasErros = true;
                    }if (isEmpty("pesqPsFimOcorrencia", form)) {
                        message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                        hasErros = true;
                    }   
                }
            }
        
        break;
            
        case Ocorrência_Pos_Safra  :
            if (getValue("WKCompletTask") == "true" ){
                if (form.getValue("psPesqOcorrencia") == 'sim') {
                    var tbPSPesqOcorrencias = form.getChildrenIndexes("tbPSPesqOcorrencias");
                    if(tbPSPesqOcorrencias.length == 0){
                        if (isMobile(form)) {
                            message += getMessage("Ocorrências não possuem nenhum item.", 6, form);
                        }else{
                            message += getMessage("<b>Ocorrencias</b> não possuem nenhum item.", 6, form);
                        }
                        hasErros = true;
                    }
                }else if(isEmpty("psPesqOcorrencia", form)){
                    message += getMessage("Teve ocorrência:", 1, form);
                    hasErros = true;
                }if (isEmpty("pesqPsFimOcorrencia", form)) {
                    message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                    hasErros = true;
                }
            }
        break;*/
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