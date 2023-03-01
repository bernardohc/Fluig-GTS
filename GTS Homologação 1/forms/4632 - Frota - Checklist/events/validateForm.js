function validateForm(form){
	
	var message = "";
    var hasErros = false;
    
    /*
     * Valida obrigatoriamente os Dados Gerais
     */
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
    if (isEmpty("geraisNumFrota", form)) {
    	message += getMessage("Nº Frota", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisCondutor", form)) {
    	message += getMessage("Condutor", 1, form);
    	hasErros = true;
    }
    if (isEmpty("geraisDocumentacaoGeralOk", form)) {
    	message += getMessage("Documentação em Geral ok?", 1, form);
    	hasErros = true;
    }else if(form.getValue("geraisDocumentacaoGeralOk") == 'Não' && isEmpty("geraisDocumentacaoGeralOkObs", form)  ){
		message += getMessage("Documentação em Geral ok?", 9, form);
		hasErros = true;
	}
    
    
    
    //Se for clicado em Enviar
	if (getValue("WKCompletTask") == "true" ){
		/*
		 * VEÍCULO
		 */
		if (isEmpty("veiKmAtual", form)) {
			message += getMessage("Km Atual", 1, form);
			hasErros = true;
		}
		if (isEmpty("veiOleoHidraulico", form)) {
			message += getMessage("Óleo Hidráulico ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiOleoHidraulico") == 'Não' && isEmpty("veiOleoHidraulicoObs", form)  ){
			message += getMessage("Óleo Hidráulico ok?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiRadiadorArrefNivel", form)) {
			message += getMessage("Água do Radiador ou Líquido de Arrefecimento no nível?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiRadiadorArrefNivel") == 'Não' && isEmpty("veiRadiadorArrefNivelObs", form)  ){
			message += getMessage("Água do Radiador ou Líquido de Arrefecimento no nível?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiVistoriaExterna", form)) {
			message += getMessage("Vistoria Externa ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiVistoriaExterna") == 'Não' && isEmpty("veiVistoriaExternaObs", form)  ){
			message += getMessage("Vistoria Externa ok?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiVistoriaInterna", form)) {
			message += getMessage("Vistoria Interna ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiVistoriaInterna") == 'Não' && isEmpty("veiVistoriaInternaObs", form)  ){
			message += getMessage("Vistoria Interna ok?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiVistoriaEletrica", form)) {
			message += getMessage("Vistoria Elétrica ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiVistoriaEletrica") == 'Não' && isEmpty("veiVistoriaEletricaObs", form)  ){
			message += getMessage("Vistoria Elétrica ok?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiFreios", form)) {
			message += getMessage("Freios ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiFreios") == 'Não' && isEmpty("veiFreiosObs", form)  ){
			message += getMessage("Freios ok?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiDirecao", form)) {
			message += getMessage("Direção em bom estado e sem folgas?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiDirecao") == 'Não' && isEmpty("veiDirecaoObs", form)  ){
			message += getMessage("Direção em bom estado e sem folgas?", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiNivelRuido", form)) {
			message += getMessage("Nível de Ruído ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiNivelRuido") == 'Não' && isEmpty("veiNivelRuidoObs", form)  ){
			message += getMessage("Nível de Ruído ok? ", 9, form);
			hasErros = true;
		}
		if (isEmpty("veiEtqRevOleoFiltro", form)) {
			message += getMessage("O Veículo possui Manual e Etiqueta Indicando a Próxima Revisão de Troca de Óleo e Filtros?", 1, form);
			hasErros = true;
		}else if(form.getValue("veiEtqRevOleoFiltro") == 'Não' && isEmpty("veiEtqRevOleoFiltroObs", form)  ){
			message += getMessage("O Veículo possui Manual e Etiqueta Indicando a Próxima Revisão de Troca de Óleo e Filtros? ", 9, form);
			hasErros = true;
		}
		/*
		 * PNEUS
		 */
		if (isEmpty("pneuPneu", form)) {
			message += getMessage("Pneus ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("pneuPneu") == 'Não' && isEmpty("pneuPneuObs", form)  ){
			message += getMessage("Pneus ok?", 9, form);
			hasErros = true;
		}
		/*
		 * SEGURANÇA
		 */
		if (isEmpty("segTriMacacoChaveGeral", form)) {
			message += getMessage("Triângulo de Sinalização, Macaco e Chave Geral ok?", 1, form);
			hasErros = true;
		}else if(form.getValue("segTriMacacoChaveGeral") == 'Não' && isEmpty("segTriMacacoChaveGeralObs", form)  ){
			message += getMessage("Triângulo de Sinalização, Macaco e Chave Geral ok?", 9, form);
			hasErros = true;
		}
		if (isEmpty("segTravaSeg", form)) {
			message += getMessage("Trava de Segurança, Quinta Roda e Pino está funcionando corretamente?", 1, form);
			hasErros = true;
		}else if(form.getValue("segTravaSeg") == 'Não' && isEmpty("segTravaSegObs", form)  ){
			message += getMessage("Trava de Segurança, Quinta Roda e Pino está funcionando corretamente?", 9, form);
			hasErros = true;
		}
		if (isEmpty("segExtintorDentroVal", form)) {
			message += getMessage("Possui Extintor dentro da Validade?", 1, form);
			hasErros = true;
		}else if(form.getValue("segExtintorDentroVal") == 'Não' && isEmpty("segExtintorDentroValObs", form)  ){
			message += getMessage("Possui Extintor dentro da Validade?", 9, form);
			hasErros = true;
		}
		if (isEmpty("segSinalizandoExcesso", form)) {
			message += getMessage("O Veículo está com a Tampa Traseira Sinalizando Excesso corretamente e legível?", 1, form);
			hasErros = true;
		}else if(form.getValue("segSinalizandoExcesso") == 'Não' && isEmpty("segSinalizandoExcessoObs", form)  ){
			message += getMessage("O Veículo está com a Tampa Traseira Sinalizando Excesso corretamente e legível?", 9, form);
			hasErros = true;
		}
		
		
		
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
            	return "Campo: 'Observação' da resposta '" + texto + "' não pode estar vazio.";  
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
            	return "<li>Campo: <b>Observação</b> da resposta <b>" + texto + "</b> não pode estar vazio.</li>";     
        }
    }
}    