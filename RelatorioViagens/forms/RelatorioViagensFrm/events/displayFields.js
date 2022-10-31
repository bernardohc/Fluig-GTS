function displayFields(form,customHTML){
	
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	/*
	 * Globais
	 */
	
	outraDespesa(form,customHTML);
	
	if (atv_atual == INICIO_0){
		
		form.setValue("solMatSolicitante",  usuarioCorrente.getCode() );
		form.setValue("solNomeSolicitante",  usuarioCorrente.getFullName() );
		
		//Consultar dados do solicitante via Dataset
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", null, [ c1, c2 ], null);
		if(dsTemValor(datasetColleague)){
			nomeUser = datasetColleague.getValue(0, "colleagueName");
			mailUser = datasetColleague.getValue(0, "mail");
			
			if(temValor(nomeUser)){
				form.setValue("solEmailSolicitanteDataset", mailUser);
			}
		}
		
		form.setVisibleById("divNovaDespesa", true);
		
	}else if(atv_atual == INICIO){
		if(form.getFormMode() == 'MOD'){
			form.setVisibleById("divNovaDespesa", true);
		}
		
	}else if(atv_atual == ANALISA_RELATORIO){
		if(form.getFormMode() == 'MOD'){
			//Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divAprovacao", true);
			
		}
	}else if(atv_atual == AJUSTA_RELATORIO){
		if(form.getFormMode() == 'MOD'){
			//Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divAprovacao", true);
			
		}
	}else if(atv_atual == FIM){
		form.setVisibleById("divAprovacao", true);
		form.setVisibleById("divPagementoReembolso", true);
		form.setVisibleById("divConfirmaPagto", true);
	}
}

function outraDespesa(form,customHTML){
	
	var solTipoDespesa = form.getValue("solTipoDespesa");
	
	if(solTipoDespesa == "Outro"){
		form.setVisibleById("divOutraDespesa", true);
	}
	
}
	