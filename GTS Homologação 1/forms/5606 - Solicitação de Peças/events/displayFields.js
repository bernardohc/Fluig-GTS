function displayFields(form,customHTML){
	
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	/*
	 * Globais
	 */
	
	if (atv_atual == INICIO_0){
		
		form.setValue("solNomeSolicitante",  usuarioCorrente.getFullName() );
		form.setValue('processoId', getValue('WKNumProces'));
		
		form.setVisibleById("divNovaMaquina", true);
		
	}else if(atv_atual == INICIO){
		if(form.getFormMode() == 'MOD'){
			form.setVisibleById("divNovaMaquina", true);
		}
		
	}else if(atv_atual == SALVAR){
		if(form.getFormMode() == 'MOD'){
			form.setVisibleById("divNovaMaquina", true);
		}
		
	}else if(atv_atual == ANALISA_SOLICITACAO){
		
		form.setVisibleById("divSalvarEnviar", false);
		if(form.getFormMode() == 'MOD'){
			//Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divImprimirPcp", true);			
		}
	}else if(atv_atual == SEPARACAO_ALMOX){
		form.setVisibleById("divSalvarEnviar", false);
		if(form.getFormMode() == 'MOD'){
			//Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divSeparacaoAlmox", true);
			form.setVisibleById("divImprimirAlmox", true);
			form.setVisibleById("divImprimirPcp", false);
		}
	}else if(atv_atual == FIM){
		form.setVisibleById("divSalvarEnviar", false);
		if(getValue('solAprovacao') == 'reprovado'){
			form.setVisibleById("divAprovacao", true);	
		}else{
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divSeparacaoAlmox", true);
			form.setVisibleById("divImprimirPcp", false);
			form.setVisibleById("divImprimirAlmox", true);
		}	
	}
}

	