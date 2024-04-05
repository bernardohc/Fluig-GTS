function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	showHideCampoObservacao(form, customHTML)

	/*
	 * Globais
	 */

	if(atv_atual == INICIO_0) {

		form.setValue("solUsuarioFluig",  usuarioCorrente.getCode() );

		form.setVisibleById("divSolicitacao", true);
		form.setVisibleById("divAprovacao", false);
		form.setVisibleById("divEntregaGuarita", false);
		form.setVisibleById("divDevolucaoGuarita", false);
		form.setVisibleById("divOutrosMotoristas", false);

	}else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", false);
			form.setVisibleById("divEntregaGuarita", false);
			form.setVisibleById("divDevolucaoGuarita", false);
			form.setVisibleById("divOutrosMotoristas", false);
		}

	}else if (atv_atual == APROVA_SOLICITACAO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", false);
			form.setVisibleById("divDevolucaoGuarita", false);
		}

	}	else if (atv_atual == ENTREGA) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", true);
			form.setVisibleById("divDevolucaoGuarita", false);
			form.setVisibleById("divEntInserirImagens", true);
		}

	}else if (atv_atual == RECEBE) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", true);
			form.setVisibleById("divDevolucaoGuarita", true);
			form.setVisibleById("divEntInserirImagens", false);
		}

	}	else if (atv_atual == FIM) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divSolicitacao", true);
			form.setVisibleById("divAprovacao", true);
			form.setVisibleById("divEntregaGuarita", true);
			form.setVisibleById("divDevolucaoGuarita", true);
		}
		form.setVisibleById("divDevInserirImagens", false);
		form.setVisibleById("divEntInserirImagens", false);
	}


}

function showHideCampoObservacao(form, customHTML){

	if(form.getValue("entVistExt") == "Não" ){
		form.setVisibleById("entVistExtObs", true);
		customHTML.append("<script>$('.entVistExtObs').prop('readonly', true);</script>");
	}
	if(form.getValue("entVistInt") == "Não" ){
		form.setVisibleById("entVistIntObs", true);
		customHTML.append("<script>$('.entVistIntObs').prop('readonly', true);</script>");
	}
	if(form.getValue("entPneus") == "Não" ){
		form.setVisibleById("entPneusObs", true);
		customHTML.append("<script>$('.entPneusObs').prop('readonly', true);</script>");
	}
	if(form.getValue("entLantFarois") == "Não" ){
		form.setVisibleById("entLantFaroisObs", true);
		customHTML.append("<script>$('.entLantFaroisObs').prop('readonly', true);</script>");
	}
	if(form.getValue("entLonaMar") == "Não" ){
		form.setVisibleById("entLonaMarObs", true);
		customHTML.append("<script>$('.entLonaMarObs').prop('readonly', true);</script>");
	}
	if(form.getValue("entOrgLimpe") == "Não" ){
		form.setVisibleById("entOrgLimpeObs", true);
		customHTML.append("<script>$('.entOrgLimpeObs').prop('readonly', true);</script>");
	}
	if(form.getValue("entObjVeiculos") == "Não" ){
		form.setVisibleById("entObjVeiculosObs", true);
		customHTML.append("<script>$('.entObjVeiculosObs').prop('readonly', true);</script>");
	}
	//aqui
	if(form.getValue("devVistExt") == "Não" ){
		form.setVisibleById("devVistExtObs", true);
		customHTML.append("<script>$('.devVistExtObs').prop('readonly', true);</script>");
	}
	if(form.getValue("devVistInt") == "Não" ){
		form.setVisibleById("devVistIntObs", true);
		customHTML.append("<script>$('.devVistIntObs').prop('readonly', true);</script>");
	}
	if(form.getValue("devPneus") == "Não" ){
		form.setVisibleById("devPneusObs", true);
		customHTML.append("<script>$('.devPneusObs').prop('readonly', true);</script>");
	}
	if(form.getValue("devLantFarois") == "Não" ){
		form.setVisibleById("devLantFaroisObs", true);
		customHTML.append("<script>$('.devVdevLantFaroisObsistExtObs').prop('readonly', true);</script>");
	}
	if(form.getValue("devLonaMar") == "Não" ){
		form.setVisibleById("devLonaMarObs", true);
		customHTML.append("<script>$('.devLonaMarObs').prop('readonly', true);</script>");
	}
	if(form.getValue("devOrgLimpe") == "Não" ){
		form.setVisibleById("devOrgLimpeObs", true);
		customHTML.append("<script>$('.devOrgLimpeObs').prop('readonly', true);</script>");
	}
	if(form.getValue("devObjVeiculos") == "Não" ){
		form.setVisibleById("devObjVeiculosObs", true);
		customHTML.append("<script>$('.devObjVeiculosObs').prop('readonly', true);</script>");
	}
	
}
