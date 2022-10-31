function displayFields(form, customHTML) {

	var atv_atual = getValue("WKNumState");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);

	var usuarioCorrente = fluigAPI.getUserService().getCurrent();

	/*
	 * Globais
	 */

	outraDespesa(form, customHTML);

	if (atv_atual == INICIO_0) {

		form.setValue("solMatSolicitante", usuarioCorrente.getCode());
		form.setValue("solNomeSolicitante", usuarioCorrente.getFullName());
		form.setValue("solEmailSolicitante", usuarioCorrente.getEmail());

		// Consultar dados do solicitante via Dataset
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",
				getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleaguePK.companyId",
				getValue("WKCompany"), getValue("WKCompany"),
				ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", null, [
				c1, c2 ], null);
		if (dsTemValor(datasetColleague)) {
			nomeUser = datasetColleague.getValue(0, "colleagueName");
			mailUser = datasetColleague.getValue(0, "mail");

			if (temValor(nomeUser)) {
				form.setValue("solEmailSolicitanteDataset", mailUser);
			}
		}

		// Consulta dataset vendedor via api ws
		log.info('Log Teste')

		var cVend1 = DatasetFactory.createConstraint("MATFLUIG", getValue(
				"WKUser").toUpperCase(), getValue("WKUser").toUpperCase(),
				ConstraintType.MUST);
		var dataSetVendedor = DatasetFactory.getDataset(
				"dsReDespConsultaVendedor", null, [ cVend1 ], null);
		if (dsTemValor(dataSetVendedor)) {
			var codVend = dataSetVendedor.getValue(0, "CODVEND");
			var nomeVend = dataSetVendedor.getValue(0, "NOME");
			var emailVend = dataSetVendedor.getValue(0, "EMAIL");

			form.setValue("solMatVendedor", codVend);
			form.setValue("solNomeVendedor", nomeVend);
			form.setValue("solEmailVendedor", emailVend);
		}

		form.setVisibleById("divNovaMaquina", true);

	} else if (atv_atual == INICIO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divNovaMaquina", true);
		}

	} else if (atv_atual == ANALISA_REEMBOLSO) {
		if (form.getFormMode() == 'MOD') {
			// Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divAprovacao", true);

		}

	} else if (atv_atual == AJUSTA_REEMBOLSO) {
		if (form.getFormMode() == 'MOD') {
			form.setVisibleById("divNovaMaquina", true);
		}
		form.setVisibleById("divAprovacao", true);

	} else if (atv_atual == PAGAMENTO_REEMBOLSO) {
		// Oculta botão excluir de tabela paiXfilho
		form.setHideDeleteButton(true);
		form.setVisibleById("divAprovacao", true);

		if (form.getFormMode() == 'MOD') {
			// Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divPagementoReembolso", true);
		}
	} else if (atv_atual == CONFIRMA_REEMBOLSO) {
		// Oculta botão excluir de tabela paiXfilho
		form.setHideDeleteButton(true);
		form.setVisibleById("divAprovacao", true);
		form.setVisibleById("divPagementoReembolso", true);

		if (form.getFormMode() == 'MOD') {
			// Oculta botão excluir de tabela paiXfilho
			form.setHideDeleteButton(true);
			form.setVisibleById("divConfirmaPagto", true);
		}
	} else if (atv_atual == AN_PGTO_REEMBOLSO) {
		// Oculta botão excluir de tabela paiXfilho
		form.setHideDeleteButton(true);
		form.setVisibleById("divAprovacao", true);
		form.setVisibleById("divPagementoReembolso", true);
		form.setVisibleById("divConfirmaPagto", true);

	} else if (atv_atual == FIM) {
		form.setVisibleById("divAprovacao", true);
		form.setVisibleById("divPagementoReembolso", true);
		form.setVisibleById("divConfirmaPagto", true);
	}
}

function outraDespesa(form, customHTML) {

	var solTipoDespesa = form.getValue("solTipoDespesa");

	if (solTipoDespesa == "Outro") {
		form.setVisibleById("divOutraDespesa", true);
	}

}
