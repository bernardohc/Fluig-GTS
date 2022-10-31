function validateForm(form){
	
	var WKNumState = getValue('WKNumState');
	
	var message = "";
    var hasErros = false;
    
    switch (parseInt(WKNumState)) {
    	
        case ADM_GTS_DEFINE_DATA:  
        	var indexes = form.getChildrenIndexes("tbItensPendente");
        	var itmDataPrevistaChegada = false;
        	 
            if(indexes.length == 0){
            	if (isMobile(form)) {
            		message += getMessage("Tabela de itens não possui nenhum item.", 6, form);
            	}else{
            		message += getMessage("Tabela <b>itens</b> não possui nenhum item.", 6, form);
            	}
            	hasErros = true;
            }else{
				for (var i = 0; i < indexes.length; i++) {					
					if (!itmDataPrevistaChegada && isEmpty("itmDataPrevistaChegadaItem___" + indexes[i], form)) {
						 message += getMessage("Previsão de Chegada", 5, form, "Itens Pendentes");
			           	 hasErros = true;
			           	 itmDataPrevistaChegada = true;
					}
					
				}
            }
        	
        	break;
        	
        case ADM_GTS_RETORNO:
        	
        	if ( form.getValue("chkGTSCienteRetornoRevenda") != 'ciente' ) {
    			message += getMessage("Ciencia do Retorno da Revenda", 7, form);
                hasErros = true;
            }	
    }
        	
	if (hasErros) {
        if (isMobile(form)) throw message;
        throw "<ul style='list-style-type: disc; padding-left:90px' class='alert alert-danger'>" + message + "</ul>";
    }
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function dataAtual(formato){
    var retornoData = "";
	var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    
    if(formato == "dd/mm/yyyy"){
    	retornoData = dia + "/" + mes + "/" + ano;
    }else if(formato == "yyyymmdd"){
    	retornoData = ano + "" + mes + "" + dia;
    }
    
    return retornoData;
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