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

                if (isEmpty("sgqSolNome", form)) {
                    message += getMessage("Nome:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqEmail", form)) {
                    message += getMessage("E-mail GTS:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqTpDocumento", form)) {
                    message += getMessage("Tipo de Documento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqSetor", form)) {
                    message += getMessage("Setor:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqTpSolicitacao", form)) {
                    message += getMessage("Tipo de Solicitação:", 1, form);
                    hasErros = true;
                }                
            }         
        break;

        case SECAO2  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("sgqCaDLinkDoc", form)) {
                    message += getMessage("Link do Documento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqCadObjDoc", form)) {
                    message += getMessage("Objetivo do Documento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqCadPalChave", form)) {
                    message += getMessage("Palavras-Chave:", 1, form);
                    hasErros = true;
                }
            }        
        break;

        case SECAO3  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("sgqValLinkDoc", form)) {
                    message += getMessage("Link do Documento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqValObjDoc", form)) {
                    message += getMessage("Objetivo do Documento:", 1, form);
                    hasErros = true;
                }
            }        
        break;

        case SECAO4  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("sgqRevCodDoc", form)) {
                    message += getMessage("Nome e Código do Documento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqRevMotivoDoc", form)) {
                    message += getMessage("Motivo da Revisão do Documento:", 1, form);
                    hasErros = true;
                }
            }        
        break;

        case SECAO5  :
            if (getValue("WKCompletTask") == "true" ){
                if (isEmpty("sgqDescCodDoc", form)) {
                    message += getMessage("Nome e Código do Documento:", 1, form);
                    hasErros = true;
                }
                if (isEmpty("sgqDescMotivoDoc", form)) {
                    message += getMessage("Motivo do Cancelamento do Documento:", 1, form);
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