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
                if (isEmpty("solSolicitante", form)) {
                    message += getMessage("Solicitante", 1, form);
                    hasErros = true;
                }                    
                if (isEmpty("solSetor", form)) {
                    message += getMessage("Setor", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solObjetivo", form)) {
                    message += getMessage("Objetivo", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solMotivo", form)) {
                    message += getMessage("Motivo", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solTipo", form)) {
                    message += getMessage("Tipo de Veículo", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solMotorista", form)) {
                    message += getMessage("Motorista", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solDestino", form)) {
                    message += getMessage("Destino", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solDataSaida", form)) {
                    message += getMessage("Data de Saída", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solHoraSaida", form)) {
                    message += getMessage("Hora de Saída", 1, form);
                    hasErros = true;
                }
                if (isEmpty("solPrevRetorno", form)) {
                    message += getMessage("Previsão de Retorno", 1, form);
                    hasErros = true;
                }  
                if (isEmpty("solQuantPessoas", form)) {
                    message += getMessage("Quantidade de Pessoas", 1, form);
                    hasErros = true;
                }else if( form.getValue("solQuantPessoas") >1){
                    if (isEmpty("solOutMotorista", form)) {	
                        message += getMessage("Outros Motoristas", 1, form);
                        hasErros = true;
                    }  
                }
            }

        break;	

        case APROVA_SOLICITACAO:
            //Se for clicado em Enviar 
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("aprovaSolicitacao", form)) {
                    message += getMessage("Aprovação", 1, form);
                    hasErros = true;
                }else if( form.getValue("aprovaSolicitacao")== 'reprovado'){
                    if (isEmpty("libObservacao", form)) {	
                        message += getMessage("Observação", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("libVeiculoLiberado", form)) {
                    message += getMessage("Veículo Liberado", 1, form);
                    hasErros = true;
                }
            }
        break;

        case ENTREGA:
            //Se for clicado em Enviar
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("entDataEntrega", form)) {
                    message += getMessage("Data da Entrega", 1, form);
                    hasErros = true;
                } 
                if (isEmpty("entHoraEntrega", form)) {
                    message += getMessage("Hora da Entrega", 1, form);
                    hasErros = true;
                } 
                if (isEmpty("entColaboradorReti", form)) {
                    message += getMessage("Colaborador que Retirou", 1, form);
                    hasErros = true;
                } 
                if (isEmpty("entVigilante", form)) {
                    message += getMessage("Vigilante da entrega", 1, form);
                    hasErros = true;
                }
                if (isEmpty("entVistExt", form)) {
                    message += getMessage("Vistoria externa", 1, form);
                    hasErros = true;
                }else if( form.getValue("entVistExt")== 'Não'){
                    if (isEmpty("entVistExtObs", form)) {	
                        message += getMessage("Vistoria Externa", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("entVistInt", form)) {
                    message += getMessage("Vistoria interna", 1, form);
                    hasErros = true;
                }else if( form.getValue("entVistInt")== 'Não'){
                    if (isEmpty("entVistIntObs", form)) {	
                        message += getMessage("Vistoria interna", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("entPneus", form)) {
                    message += getMessage("Pneus", 1, form);
                    hasErros = true;
                }else if( form.getValue("entPneus")== 'Não'){
                    if (isEmpty("entPneusObs", form)) {	
                        message += getMessage("Pneus", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("entLantFarois", form)) {
                    message += getMessage("Lanternas e faróis", 1, form);
                    hasErros = true;
                }else if( form.getValue("entLantFarois")== 'Não'){
                    if (isEmpty("entLantFaroisObs", form)) {	
                        message += getMessage("Lanternas e faróis", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("entLonaMar", form)) {
                    message += getMessage("Lona maritíma", 1, form);
                    hasErros = true;
                }else if( form.getValue("entLonaMar")== 'Não'){
                    if (isEmpty("entLonaMarObs", form)) {	
                        message += getMessage("Lona maritíma", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("entOrgLimpe", form)) {
                    message += getMessage("Organização e limpeza", 1, form);
                    hasErros = true;
                }else if( form.getValue("entOrgLimpe")== 'Não'){
                    if (isEmpty("entOrgLimpeObs", form)) {	
                        message += getMessage("Organização e limpeza", 1, form);
                        hasErros = true;
                    }  
                }
                if (isEmpty("entObjVeiculos", form)) {
                    message += getMessage("Existe objetos esquecidos no veículo", 1, form);
                    hasErros = true;
                }else if( form.getValue("entObjVeiculos")== 'Não'){
                    if (isEmpty("entObjVeiculosObs", form)) {	
                        message += getMessage("Existe objetos esquecidos no veículo", 1, form);
                        hasErros = true;
                    }  
                }
            }
        break;

        case RECEBE:
            //Se for clicado em Enviar
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("devDataDevolucao", form)) {
                    message += getMessage("Data da Devolução", 1, form);
                    hasErros = true;
                } 
                if (isEmpty("devHorarioDevolucao", form)) {
                    message += getMessage("Hoarário da Devolução", 1, form);
                    hasErros = true;
                }
                if (isEmpty("devKM", form)) {
                    message += getMessage("KM", 1, form);
                    hasErros = true;
                }
                if (isEmpty("devColabEntrega", form)) {
                    message += getMessage("Colaborador que entregou", 1, form);
                    hasErros = true;
                }
                if (isEmpty("devVigilante", form)) {
                    message += getMessage("Vigilante da Devolução", 1, form);
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