function displayFields(form,customHTML){
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	form.setValue("solicitante",  usuarioCorrente.getCode() );
	form.setValue("nomeSolicitante",  usuarioCorrente.getFullName() );

	//Preenche nome do condutor com o nome de quem está abrindo a solicitação
	form.setValue("geraisCondutor",  usuarioCorrente.getFullName() );
	
	if(!isMobile(form)){
		if(form.getFormMode() != 'VIEW'){
			customHTML.append("<script>$('body').addClass('class-body-inicio');</script>");
		}
	}
	
	
	showHideCampoOutros(form, customHTML)
	
}

function showHideCampoOutros(form, customHTML){
	/*
	 * PNEU
	 */
	//11. Pneus Dianteira Cavalo em Bom Estado?
	if(form.getValue("pneuPneuDiantCavBomEstado") == "Outro" ){
		form.setVisibleById("pneuPneuDiantCavBomEstadoOut", true);
	}
	//12. Pneus Tração Cavalo em Bom Estado?
	if(form.getValue("pneuPneuTracaoCavBomEstado") == "Outro" ){
		form.setVisibleById("pneuPneuTracaoCavBomEstadoOut", true);
	}
	//13. Pneus Truck Cavalo em Bom Estado?
	if(form.getValue("pneuPneuTruckCavBomEstado") == "Outro" ){
		form.setVisibleById("pneuPneuTruckCavBomEstadoOut", true);
	}
	//14. Pneus Semi Reboque - 1º Eixo?
	if(form.getValue("pneuPneuSemiReb1Eixo") == "Outro" ){
		form.setVisibleById("pneuPneuSemiReb1EixoOut", true);
	}
	//15. Pneus Semi Reboque - 2º Eixo?
	if(form.getValue("pneuPneuSemiReb2Eixo") == "Outro" ){
		form.setVisibleById("pneuPneuSemiReb2EixoOut", true);
	}
	//16. Pneus Semi Reboque - 3º Eixo?
	if(form.getValue("pneuPneuSemiReb3Eixo") == "Outro" ){
		form.setVisibleById("pneuPneuSemiReb3EixoOut", true);
	}
	//17. Pneus Sterp em Bom Estado?
	if(form.getValue("pneuPneuSterpBomEstado") == "Outro" ){
		form.setVisibleById("pneuPneuSterpBomEstadoOut", true);
	}
	//18. Rodas do Cavalo e Semi Reboque em Bom Estado?
	if(form.getValue("pneuRodaCavSemiRebBomEstado") == "Outro" ){
		form.setVisibleById("pneuRodaCavSemiRebBomEstadoOut", true);
	}
	
	
}