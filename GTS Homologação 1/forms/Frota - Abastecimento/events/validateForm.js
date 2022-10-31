function validateForm(form){
	
	var message = "";
    var hasErros = false;
    
    /*
     * Valida obrigatoriamente os Dados Gerais
     */
    if (isEmpty("geraisNomeMotorista", form)) {
    	message += getMessage("Nome Motorista", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisCarimboDataHora", form)) {
		message += getMessage("Carimbo de Data/Hora", 1, form);
		hasErros = true;
	}else{
		
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm");
		
		var geraisCarimboDataHora = form.getValue("geraisCarimboDataHora");
		var geraisCarimboDataHoraParse = sdf.parse(geraisCarimboDataHora);
		
		var dataHoje = java.util.Calendar.getInstance();
		
		//Aqui primeiro converte a data hoje para dd/MM/yyyy, para posteriormente transformar em um campo date.
	    var dataHojeParse = sdf.parse( sdf.format(dataHoje.getTime() ));
	    
	    
	    //Se a data de hoje antes que a data de Entrega
	    if(dataHojeParse.before(geraisCarimboDataHoraParse)){
	    	if (isMobile(form)) {
	    		message += getMessage("Campo: 'Carimbo de Data/Hora' não pode ser maior que hoje e a hora atual.", 6, form);	
	    	}else{
	    		message += getMessage("Campo: <b>Carimbo de Data/Hora</b> não pode ser maior que hoje e a hora atual.", 6, form);	
	    	}
	    	hasErros = true;
	   	}
	    
	}
    if (isEmpty("geraisPlaca", form)) {
    	message += getMessage("Placa", 1, form);
    	hasErros = true;
    }else if( form.getValue("geraisPlaca").length() != 7 ){
		message += getMessage("Placa", 2, form);
		hasErros = true;
    }
    
    /*
     * Abastecimento
     */
    if (isEmpty("abastCNPJPosto", form)) {
    	message += getMessage("CNPJ do Posto", 1, form);
    	hasErros = true;
    }else if( form.getValue("abastCNPJPosto").length() != 18 ){
		message += getMessage("CNPJ do Posto", 2, form);
		hasErros = true;
    }
    if (isEmpty("abastNomePosto", form)) {
    	message += getMessage("Nome do Posto", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastKmAbastecimento", form)) {
    	message += getMessage("Km Abastecimento", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastCodTipoCombustivel", form)) {
    	message += getMessage("Tipo de Combustível", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastQtdLitros", form)) {
    	message += getMessage("Qtd. Litros", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastValorLitro", form)) {
    	message += getMessage("Valor Litro", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastValorTotal", form)) {
    	message += getMessage("Valor Total", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastFormaPagamento", form)) {
    	message += getMessage("Forma de Pagamento", 1, form);
    	hasErros = true;
    }
    if (isEmpty("abastSetor", form)) {
    	message += getMessage("Setor", 1, form);
    	hasErros = true;
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
            	return "É preciso anexar um documento de "+texto+".";
            case 9:
            	return "Descrição 'Outro' da resposta '" + texto + "' não pode estar vazio.";  
        }
    } else {
        switch (tipoMensagem) {
            case 1:
                return "<li>Campo: <b>" + texto + "</b> não pode estar vazio.</li>";
            case 2:
                return '<li>Campo: <b>' + texto + '</b> está inválido.\n';    
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
            	return "<li>É obrigatório anexar um <b>"+texto+"</b>.</li>";     
            case 9:
            	return "<li>Descrição <b>Outro</b> da resposta <b>" + texto + "</b> não pode estar vazio.</li>";     
        }
    }
}    