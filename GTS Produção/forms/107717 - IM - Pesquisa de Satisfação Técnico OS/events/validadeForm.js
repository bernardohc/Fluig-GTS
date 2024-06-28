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

                if (isEmpty("psoNumSerie", form)) {
                    message += getMessage("Número de Série", 1, form);
                    hasErros = true;
                }                
                if (isEmpty("psoNotaTec", form)) {
                    message += getMessage("Nota", 1, form);
                    hasErros = true;
                }                
                
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