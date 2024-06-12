function validateForm(form){
	
    var WKNumState = getValue('WKNumState');
    var WKNextState = getValue('WKNextState');

    var message = "";
    var hasErros = false;

    switch (parseInt(WKNumState)) {
        //INICIAL
        case INICIO_0 : 
        case INICIO :  

            //Se for clicado em Enviar 
            if (getValue("WKCompletTask") == "true" ){

                if (isEmpty("tpAtendimentoMaq", form)) {
                    message += getMessage("Tipo de Atendimento", 1, form);
                    hasErros = true;
                }
                if( form.getValue("tpAtendimentoMaq") == 'Revenda' ){
                    if (isEmpty("anexoFotoPlaqueta", form)) {
                        message += getMessage("Plaqueta de Número de Série", 10, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolNumeroSerie", form)) {
                        message += getMessage("Número de Série", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolMarca", form)) {
                        message += getMessage("Marca", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolAno", form)) {
                        message += getMessage("Ano", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolModeloTrator", form)) {
                        message += getMessage("Modelo", 1, form);
                        hasErros = true;
                    }
                } 
                if( form.getValue("tpAtendimentoMaq") == 'Cliente' ){
                    if (isEmpty("anexoFotoPlaqueta", form)) {
                        message += getMessage("Plaqueta de Número de Série", 10, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolNumeroSerie", form)) {
                        message += getMessage("Número de Série", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolMarca", form)) {
                        message += getMessage("Marca", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolAno", form)) {
                        message += getMessage("Ano", 1, form);
                        hasErros = true;
                    }
                    if (isEmpty("sgSolModeloTrator", form)) {
                        message += getMessage("Modelo", 1, form);
                        hasErros = true;
                    }
                }                          
                if (isEmpty("anexoFotoDescricaoPro1", form)) {
                    message += getMessage("Primeira foto da falha", 10, form);
                    hasErros = true;
                }
                if (isEmpty("anexoFotoDescricaoPro2", form)) {
                    message += getMessage("Segunda foto da falha", 10, form);
                    hasErros = true;
                }
                if (isEmpty("anexoFotoDescricaoPro3", form)) {
                    message += getMessage("Terceira foto da falha", 10, form);
                    hasErros = true;
                }
                if (isEmpty("sgSolNomeRev", form)) {
                    message += getMessage("Nome da Revenda", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgSolCnpjRev", form)) {
                    message += getMessage("CNPJ", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgSolTelRev", form)) {
                    message += getMessage("Telefone Revenda", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgSolEmailRev", form)) {
                    message += getMessage("E-mail Revenda", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgSolMuncipioRev", form)) {
                    message += getMessage("Munícipio", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgSolEstRev", form)) {
                    message += getMessage("Estado", 1, form);
                    hasErros = true;
                }
                if (isEmpty("tpAtendimentoMp", form)) {
                    message += getMessage("Máquina Parada", 1, form);
                    hasErros = true;
                }
                if( form.getValue("tpAtendimentoMp") == 'nao' ){
                    if (isEmpty("tpAtendimento", form)) {
                        message += getMessage("Tipo de Atendimento", 1, form);
                        hasErros = true;
                    }
                }
                if (isEmpty("sgSolDescProble", form)) {
                    message += getMessage("Descrição do Problema", 1, form);
                    hasErros = true;
                }                
                var tbServico = form.getChildrenIndexes("tbServico");
                if(tbServico.length == 0){
                    if (isMobile(form)) {
                        message += getMessage("Tabela de Atendimento não possui nenhum lançamento.\n", 6, form);
                    }else{
                        message += getMessage("Tabela de <b>Atendimento</b> não possui nenhum lançamento.", 6, form);
                    }
                    hasErros = true;
                }
                if (isEmpty("sgSolParecerTec", form)) {
                    message += getMessage("Parecer Técnico", 1, form);
                    hasErros = true;
                } 
                if (isEmpty("sgSolNomeTecnico", form)) {
                    message += getMessage("Nome do Técnico", 1, form);
                    hasErros = true;
                } 
                if( form.getValue("tecnicoGTS") == '' ){
                    message += getMessage("Técnico GTS?", 1, form);
                    hasErros = true;
                }
                var tbItens = form.getChildrenIndexes("tbItens");
                if(tbItens.length == 0){
                    if (isMobile(form)) {
                        message += getMessage("Tabela de Itens não possui nenhum lançamento.\n", 6, form);
                    }else{
                        message += getMessage("Tabela de <b>Itens</b> não possui nenhum lançamento.", 6, form);
                    }
                    hasErros = true;
                }
                

                // if (isEmpty("anexoFotoParecer1", form)) {
                //     message += getMessage("Primeira Foto do Parecer Técnico", 10, form);
                //     hasErros = true;
                // }
                // if (isEmpty("anexoFotoParecer2", form)) {
                //     message += getMessage("Segunda Foto do Parecer Técnico", 10, form);
                //     hasErros = true;
                // }
                
                
                // if (isEmpty("salvarEnviar", form)) {
                //     if (isMobile(form)){
                //         message += getMessage("É preciso selecionar a ação ('Salvar' ou 'Enviar')", 6, form);
                //     }else{
                //         message += getMessage("É preciso selecionar a ação (<b>Salvar</b> ou <b>Enviar</b>)", 6, form);
                //     }
                //         hasErros = true;
                // }else{
                //     if( form.getValue("salvarEnviar") == 'Enviar' ){
                //         if( WKNumState == WKNextState ){
                //             if (isMobile(form)){
                //             message += getMessage("Você selecionou a opção 'Enviar' e está salvando a solicitação.", 6, form);
                //         }else{
                //             message += getMessage("Você selecionou a opção <b>Enviar</b> e está salvando a solicitação.", 6, form);
                //         }
                //             hasErros = true;
                //         }
                //     }
                // }
                
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
            case 10:
                return "Atenção! Não existe a foto: " +texto;    
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
            case 10:
                return "<li>Atenção! Não existe a foto: <b>"+texto+"</b></li>";  
        }
    }
} 