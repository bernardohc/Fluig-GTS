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
                if (isEmpty("pesqEfetivoCont", form)) {
                    message += getMessage("Pesquisa de Satisfação - Efetivou contato:", 1, form);
                    hasErros = true;
                }
                if(form.getValue("pesqEfetivoCont") == 'sim'){ 
                    if (isEmpty("pesqEntregaPor", form)) {
                        message += getMessage("Pesquisa de Satisfação - Etrega realizada por:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("solDataPesq", form)) {
                        message += getMessage("Pesquisa de Satisfação - Data da pesquisa:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("pesqNumSerie", form)) {
                        message += getMessage("Pesquisa de Satisfação - Número de série:", 1, form);
                        hasErros = true;
                    }
                    // if (isEmpty("pesqModelo", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Modelo:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqRevenda", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Revenda:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqCidadeRevenda", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Cidade da revenda:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqRepresentante", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Representante:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqCliente", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Cliente:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqCidadeCliente", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Cidade do cliente:", 1, form);
                    //     hasErros = true;
                    // }
                    if (isEmpty("pesqAcompanhouEntrega", form)) {
                        message += getMessage("Pesquisa de Satisfação - Quem acompanhou a entrega:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("pesqTelefone", form)) {
                        message += getMessage("Pesquisa de Satisfação - Telefone:", 1, form);
                        hasErros = true;
                    }                         
                    if (form.getValue("pesqNotaAtendimento") === '') {
                        message += getMessage("Pesquisa de Satisfação - Como foi o Atendimento:", 1, form);
                        hasErros = true;
                    }
                    // if (isEmpty("pesqNotaAtendimento", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Como foi o Atendimento:", 1, form);
                    //     hasErros = true;
                    // }
                    if (isEmpty("pesqFeedbackAtendimento", form)) {
                        message += getMessage("Pesquisa de Satisfação - Feedback do atendimento:", 1, form);
                        hasErros = true;
                    }
                    if (form.getValue("pesqNotaDesempenho") === '') {
                        message += getMessage("Pesquisa de Satisfação - Desempenho do equipamento:", 1, form);
                        hasErros = true;
                    }
                    // if (isEmpty("pesqNotaDesempenho", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Desempenho do equipamento:", 1, form);
                    //     hasErros = true;
                    // }
                    if (isEmpty("pesqFeedbackEquipamento", form)) {
                        message += getMessage("Pesquisa de Satisfação - Feedback do equipamento:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("pesqTermColheita", form)) {
                        message += getMessage("Pesquisa de Satisfação - Colheita Finalizada:", 1, form);
                        hasErros = true;
                    }
                    if  (form.getValue("pesqTermColheita") == 'nao'){
                        if (isEmpty("pesqPrevColheita", form)) {
                            message += getMessage("Pesquisa de Satisfação - Previsão de término da colheita:", 1, form);
                            hasErros = true;
                        }
                    }
                    if(isEmpty("pesqOcorrencia", form)){
                        message += getMessage("Pesquisa de Satisfação - Teve ocorrência:", 1, form);
                        hasErros = true;
                    }   
                    if (form.getValue("pesqOcorrencia") == 'sim') {
                        var indexTbPesqOcorrencia = form.getChildrenIndexes("tbPesqOcorrencias");
                        if(indexTbPesqOcorrencia.length == 0){
                            if (isMobile(form)) {
                                message += getMessage("Registro de ocorrências não possui nenhum item.", 6, form);
                            }else{
                                message += getMessage("Registro <b>Ocorrencias</b> não possui nenhum item.", 6, form);
                            }
                            hasErros = true;
                        }if (isEmpty("pesqFimOcorrencia", form)) {
                            message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                            hasErros = true;
                        }
                    } 
                }if(form.getValue("pesqEfetivoCont") == 'nao'){
                    
                    if (isEmpty("pesqEntregaPor", form)) {
                        message += getMessage("Pesquisa de Satisfação - Etrega realizada por:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("solDataPesq", form)) {
                        message += getMessage("Pesquisa de Satisfação - Data da pesquisa:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("pesqNumSerie", form)) {
                        message += getMessage("Pesquisa de Satisfação - Número de série:", 1, form);
                        hasErros = true;
                    }
                    // if (isEmpty("pesqModelo", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Modelo:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqRevenda", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Revenda:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqCidadeRevenda", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Cidade da revenda:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqRepresentante", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Representante:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqCliente", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Cliente:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("pesqCidadeCliente", form)) {
                    //     message += getMessage("Pesquisa de Satisfação - Cidade do cliente:", 1, form);
                    //     hasErros = true;
                    // } 
                    // if(isEmpty("pesqOcorrencia", form)){
                    //     message += getMessage("Pesquisa de Satisfação - Teve ocorrência:", 1, form);
                    //     hasErros = true;
                    // } 
                    if(isEmpty("pesqFimSemRet", form)){
                        message += getMessage("Pesquisa de Satisfação - Finalizar sem retorno:", 1, form);
                        hasErros = true;
                    }
                    if(form.getValue("pesqFimSemRet") == 'sim'){
                        if(isEmpty("pesqSatisfacaoOBS", form)){
                            message += getMessage("Pesquisa de Satisfação - Observações:", 1, form);
                            hasErros = true;
                        } 
                    } 
                    // if (form.getValue("pesqOcorrencia") == 'sim') {
                    //     var indexTbPesqOcorrencia = form.getChildrenIndexes("tbPesqOcorrencias");
                    //     if(indexTbPesqOcorrencia.length == 0){
                    //         if (isMobile(form)) {
                    //             message += getMessage("Registro de ocorrências não possui nenhum item.", 6, form);
                    //         }else{
                    //             message += getMessage("Registro <b>Ocorrencias</b> não possui nenhum item.", 6, form);
                    //         }
                    //         hasErros = true;
                    //     }if (isEmpty("pesqFimOcorrencia", form)) {
                    //         message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                    //         hasErros = true;
                    //     }
                    // } 
                }                
            }         
        break;

        case Aguardando_Colheita :
            if (isEmpty("pesqTermColheita", form)) {
                message += getMessage("Pesquisa de Satisfação - Colheita Finalizada:", 1, form);
                hasErros = true;
            }
            // if (isEmpty("pesqPrevColheita", form)) {
            //     message += getMessage("Pesquisa de Satisfação - Previsão de término da colheita:", 1, form);
            //     hasErros = true;
            // }
        break;

        case Registro_Ocorrências :
            if (isEmpty("pesqFimOcorrencia", form)) {
                message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                hasErros = true;
            }
        break;

        case Pesquisa_Pos_Safra  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("psPesqEfetivoCont", form)) {
                    message += getMessage("Pesquisa de Satisfação Pós Safra - Efetivou contato:", 1, form);
                    hasErros = true;
                }
                if(form.getValue("psPesqEfetivoCont") == 'sim'){ 
                    if (isEmpty("psSolDataPesq", form)) {
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Data da pesquisa:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqAcompanhouEntrega", form)) {
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Quem acompanhou a entrega:", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("psPesqTelefone", form)) {
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Telefone:", 1, form);
                        hasErros = true;
                    }
                    // if (isEmpty("psPesqNotaAtendimento", form)) {
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Como foi o Atendimento:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("psPesqFeedbackAtendimento", form)) {
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback do atendimento:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("psPesqNotaDesempenho", form)) {
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Desempenho do equipamento:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("psPesqFeedbackEquipamento", form)) {
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback do equipamento:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("psPesqDispRevenda", form)) {
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Disponibilidade da revenda:", 1, form);
                    //     hasErros = true;
                    // }
                    // if (isEmpty("psPesqFeedbackPecas", form)) {
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback Disponibilidade da revenda:", 1, form);
                    //     hasErros = true;
                    // }
                    if(isEmpty("psPesqOcorrencia", form)){
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Teve ocorrência:", 1, form);
                        hasErros = true;
                    }  
                    if(isEmpty("pesqPsMelhoria", form)){
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Sugestão de melhoria:", 1, form);
                        hasErros = true;
                    }
                    if(form.getValue("pesqPsMelhoria") == 'sim'){
                        if(isEmpty("pesqPsSatisfacaoSGM", form)){
                            message += getMessage("Pesquisa de Satisfação Pós Safra - Sugestão de melhoria:", 1, form);
                        hasErros = true;
                        }
                    }
                    if (form.getValue("psPesqOcorrencia") == 'sim') {
                        var tbPSPesqOcorrencias = form.getChildrenIndexes("tbPSPesqOcorrencias");
                        if(tbPSPesqOcorrencias.length == 0){
                            if (isMobile(form)) {
                                message += getMessage("Registro de ocorrências Pós Safra não possui nenhum item.", 6, form);
                            }else{
                                message += getMessage("Registro <b>Ocorrencias</b> Pós Safra não possui nenhum item.", 6, form);
                            }
                            hasErros = true;
                        }if (isEmpty("pesqPsFimOcorrencia", form)) {
                            message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                            hasErros = true;
                        }
                    } if(form.getValue("pesqPsFimOcorrencia") == 'sim'){
                        var notaAtendimento = form.getValue("psPesqNotaAtendimento");
                        // Verifica se o campo está vazio (string vazia)
                        if (notaAtendimento === '') {
                            message += getMessage("Pesquisa de Satisfação Pós Safra - Como foi o Atendimento:", 1, form);
                            hasErros = true;
                        }
                        // if (form.getValue("psPesqNotaAtendimento") === '') {
                        //     message += getMessage("Pesquisa de Satisfação Pós Safra - Como foi o Atendimento:", 1, form);
                        //     hasErros = true;
                        // }
                        if (isEmpty("psPesqFeedbackAtendimento", form)) {
                            message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback do atendimento:", 1, form);
                            hasErros = true;
                        }
                        if (form.getValue("psPesqNotaDesempenho") === '') {
                            message += getMessage("Pesquisa de Satisfação Pós Safra - Desempenho do equipamento:", 1, form);
                            hasErros = true;
                        }
                        if (isEmpty("psPesqFeedbackEquipamento", form)) {
                            message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback do equipamento:", 1, form);
                            hasErros = true;
                        }
                    }
                }if(form.getValue("psPesqEfetivoCont") == 'nao'){
                    if (isEmpty("psSolDataPesq", form)) {
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Data da pesquisa:", 1, form);
                        hasErros = true;
                    }
                    if(isEmpty("pesqPsFimSemRet", form)){
                        message += getMessage("Pesquisa de Satisfação Pós Safra - Finalizar sem retorno:", 1, form);
                        hasErros = true;
                    }
                    if(form.getValue("pesqPsFimSemRet") == 'sim'){
                        if(isEmpty("pesqPsSatisfacaoOBS", form)){
                            message += getMessage("Pesquisa de Satisfação - Observações:", 1, form);
                            hasErros = true;
                        }
                    }
                    // if(isEmpty("psPesqOcorrencia", form)){
                    //     message += getMessage("Pesquisa de Satisfação Pós Safra - Teve ocorrência:", 1, form);
                    //     hasErros = true;
                    // } 
                    // if (form.getValue("psPesqOcorrencia") == 'sim') {
                    //     var tbPSPesqOcorrencias = form.getChildrenIndexes("tbPSPesqOcorrencias");
                    //     if(tbPSPesqOcorrencias.length == 0){
                    //         if (isMobile(form)) {
                    //             message += getMessage("Registro de ocorrências Pós Safra não possui nenhum item.", 6, form);
                    //         }else{
                    //             message += getMessage("Registro <b>Ocorrencias</b> Pós Safra não possui nenhum item.", 6, form);
                    //         }
                    //         hasErros = true;
                    //     }if (isEmpty("pesqPsFimOcorrencia", form)) {
                    //         message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                    //         hasErros = true;
                    //     }
                    // }
                }                
            }         
        break;
            
        case Ocorrência_Pos_Safra  :
            if (isEmpty("pesqPsFimOcorrencia", form)) {
                message += getMessage("Pesquisa de Satisfação - Finalizou ocorrência:", 1, form);
                hasErros = true;
            }if(form.getValue("pesqPsFimOcorrencia") == 'sim'){
                if (isEmpty("psPesqNotaAtendimento", form)) {
                    message += getMessage("Pesquisa de Satisfação Pós Safra - Como foi o Atendimento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("psPesqFeedbackAtendimento", form)) {
                    message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback do atendimento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("psPesqNotaDesempenho", form)) {
                    message += getMessage("Pesquisa de Satisfação Pós Safra - Desempenho do equipamento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("psPesqFeedbackEquipamento", form)) {
                    message += getMessage("Pesquisa de Satisfação Pós Safra - Feedback do equipamento:", 1, form);
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