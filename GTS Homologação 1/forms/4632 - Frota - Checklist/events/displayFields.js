function displayFields(form,customHTML){
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	showHideCampoObservacao(form, customHTML)
	
	if(atv_atual == INICIO_0){
		form.setValue("solicitante",  usuarioCorrente.getCode() );
		form.setValue("nomeSolicitante",  usuarioCorrente.getFullName() );

		//Preenche nome do condutor com o nome de quem está abrindo a solicitação
		form.setValue("geraisCondutor",  usuarioCorrente.getFullName() );
	}else if(atv_atual == INICIO){
		
	}else if(atv_atual == FIM){
		form.setVisibleById("divDataAbertura", true);
		customHTML.append("<script>$('#divCarimboDataHora').removeClass('col-md-offset-1');</script>");
	}
	
}

function showHideCampoObservacao(form, customHTML){
	
	/*
	 * Gerais
	 */
	if(form.getValue("geraisDocumentacaoGeralOk") == "Não" ){
		form.setVisibleById("geraisDocumentacaoGeralOkObs", true);
	}
	/*
	 * Veículo
	 */
	if(form.getValue("veiOleoHidraulico") == "Não" ){
		form.setVisibleById("veiOleoHidraulicoObs", true);
	}
	if(form.getValue("veiRadiadorArrefNivel") == "Não" ){
		form.setVisibleById("veiRadiadorArrefNivelObs", true);
	}
	if(form.getValue("veiVistoriaExterna") == "Não" ){
		form.setVisibleById("veiVistoriaExternaObs", true);
	}
	if(form.getValue("veiVistoriaInterna") == "Não" ){
		form.setVisibleById("veiVistoriaInternaObs", true);
	}
	if(form.getValue("veiVistoriaEletrica") == "Não" ){
		form.setVisibleById("veiVistoriaEletricaObs", true);
	}
	if(form.getValue("veiFreios") == "Não" ){
		form.setVisibleById("veiFreiosObs", true);
	}
	if(form.getValue("veiDirecao") == "Não" ){
		form.setVisibleById("veiDirecaoObs", true);
	}
	if(form.getValue("veiTanquesTampas") == "Não" ){
		form.setVisibleById("veiTanquesTampasObs", true);
	}
	if(form.getValue("veiNivelRuido") == "Não" ){
		form.setVisibleById("veiNivelRuidoObs", true);
	}
	if(form.getValue("veiEtqRevOleoFiltro") == "Não" ){
		form.setVisibleById("veiEtqRevOleoFiltroObs", true);
	}
	
	/*
	 * PNEUS
	 */
	if(form.getValue("pneuPneu") == "Não" ){
		form.setVisibleById("pneuPneuObs", true);
	}
	
	/*
	 * SEGURANÇA
	 */
	if(form.getValue("segTriMacacoChaveGeral") == "Não" ){
		form.setVisibleById("segTriMacacoChaveGeralObs", true);
	}
	if(form.getValue("segTravaSeg") == "Não" ){
		form.setVisibleById("segTravaSegObs", true);
	}
	if(form.getValue("segExtintorDentroVal") == "Não" ){
		form.setVisibleById("segExtintorDentroValObs", true);
	}
	if(form.getValue("segSinalizandoExcesso") == "Não" ){
		form.setVisibleById("segSinalizandoExcessoObs", true);
	}
}