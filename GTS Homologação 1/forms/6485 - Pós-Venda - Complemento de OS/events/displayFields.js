function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	injetarFuncoesUteisJS(form, customHTML);
	
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	
	/*
	 * INÍCIO PARA TODAS AS ATIVIDADES
	 */
	//Status
	customHTML.append("<script>$('#getStatus').text('"+form.getValue("solStatus")+"');</script>");
	
	//Dados Gerais
	displayCustomizacaoMaquina(form, customHTML);
	//Cliente
	form.setValue("cliEstado", form.getValue("cliEstadoHidden"));
	//Revenda
	form.setValue("revEstado", form.getValue("revEstadoHidden"));
	displayTecRevAtendimento(form, customHTML)
	//Descrição da Falha
	displayDescricaoFalha(form, customHTML);
	/*
	 * FIM PARA TODAS AS ATIVIDADES
	 */
	
	
	if(atv_atual == INICIO_0){
		
		form.setVisibleById("divDesejaRealizar", true);
		
		controleAbas(form, customHTML, 'indisponivel');
		
		dadosAdicionaisTecnicoGTS(form, customHTML);
		
		form.setValue("gerWKUserTecnicoGTS",  usuarioCorrente.getCode() );
		form.setValue("gerTecnicoGTS",  usuarioCorrente.getFullName() );
		
		customHTML.append("<script>$('.tdDeleteRow').show();</script>");
		//Falha
		customHTML.append("<script>$('.tdDeleteRowFalha').show();</script>");
		form.setVisibleById("divBtnAddFalha", true);

		//Atendimento
		form.setVisibleById("divTabelaAtendimentos", false);
		form.setVisibleById("divTotalAtendimentos", false);
		
		
	}else if( atv_atual == INICIO || atv_atual == TECNICO_COMPLEMENTA){
		
		controleAbas(form, customHTML, 'indisponivel');
		
		//Atendimento
		var indexAtdTbAtendimentos = form.getChildrenIndexes("atdTbAtendimentos");
		if(indexAtdTbAtendimentos.length == 0){
			form.setVisibleById("divTabelaAtendimentos", false);
			form.setVisibleById("divTotalAtendimentos", false);
		}
		
		if(form.getFormMode() == 'VIEW'){
			form.setVisibleById("divAddAtendimento", false);
			
		}else if(form.getFormMode() == 'MOD'){
			form.setValue("solDesejaRealizar", "");
			form.setVisibleById("divDesejaRealizar", true);
			customHTML.append("<script>$('.tdDeleteRow').show();</script>");
			customHTML.append("<script>$('.tdDeleteRowFalha').show();</script>");
			form.setVisibleById("divBtnAddFalha", true);
		}
		
		
	}else if( atv_atual == SUPORTE_GTS ){
		
		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}else if ( atv_atual == TECNICO_GTS){
		
		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}else if ( atv_atual == SETOR_GTS){
		
		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}else if ( atv_atual == FIM){
		
		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
	}
	

}
/**
 * Função para buscar o dado adiciona do Técnico GTS que possui o COD_TECNICO do Protheus da tabela AA1_COD
 */
function dadosAdicionaisTecnicoGTS(form,customHTML){
	
	var dataset = DatasetFactory.getDataset("dsCompOSConsultaTecnicoGTS", null, null, null);
	if(dsTemValor(dataset)){
		var CODRET = dataset.getValue(0, "CODRET");
		var MSGRET = dataset.getValue(0, "MSGRET");
		
		if( CODRET == '1' ){ 
			var COD_TECNICO = dataset.getValue(0, "COD_TECNICO");
			form.setValue("codigoTecnicoGTS", COD_TECNICO);
		}else{
			customHTML.append("<script>FLUIGC.toast({message: '"+MSGRET+"', type: 'danger'});</script>");
			customHTML.append("<script>$('form').hide()</script>");
		}
	
	}else{
		
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		customHTML.append("<script>$('form').hide()</script>");
	
	}
	
}

/**
 * Controle de Abas (disponível/indisponível)
 */
function controleAbas(form, customHTML, AbaComunicacao){
	
	
	if(AbaComunicacao == 'disponivel'){
		customHTML.append("<script>$('#tabComunicacao').removeClass('disabled');</script>");
		customHTML.append("<script>$('#tabComunicacao a').prop('href', '#divTabComunicacao');</script>");
	}

}

/**
* Display dos campos de definição de status
*/
function displayDefinicaoSuporteGTS(form, customHTML){
	if(form.getValue("solStatus") == "Recebido" || form.getValue("solStatus") == "Em Análise" ){
		form.setVisibleById("divSolEncaminharSolicitacao", true);
	}else if(form.getValue("solStatus") == "Finalizado"){
		form.setVisibleById("divSolFinalizarSolicitacao", true);
	}
	if(form.getValue("solEncaminharSolicitacao") != ""){
		form.setVisibleById("divSolEncaminharSolicitacao", true);
	}
	
}
/**
 * Display Técnico Revenda Acompanhou Atendimento
 */
function displayTecRevAtendimento(form, customHTML){
	if(form.getValue("revTecAcompAtendimento") == "sim" ){
		form.setVisibleById("divTecAcompanhouAtendimento", true);
	}
	
}
/**
 * Display de campos de customização de máquina
 */
function displayCustomizacaoMaquina(form, customHTML){
	var familiaCod = form.getValue("maqCodFamilia");
	
	if(familiaCod == 'FPM' || familiaCod == 'FSM'){
		//FPM- Plataforma de Milho
		//FSM - Semeadora Exattus 
		form.setVisibleById("divMaqNumLinha", true);
		form.setVisibleById("divMaqEspacamento", true);
		
	}else if(familiaCod == 'FPC'){
		//FPC - Plataformas de Cereais Flexer 
		form.setVisibleById("divMaqPes", true);
		
	}else if(familiaCod == 'FDC' || familiaCod == 'FCS' ){
		//FDC - TERRUS
		//FCS - TERRUS FERTTI
		form.setVisibleById("divMaqHastes", true);
	}
	
}
/**
 * Display para mostrar a Descrição da Falha
 */
function displayDescricaoFalha(form, customHTML){
	
	if(form.getValue("atdAtendimentoFinalizado") == "nao"){
		form.setVisibleById("divFalha", true);
	}
	
}
/**
 * Técnico da GTS não pode visualizar a coluna 'Comunicação Interna' da tabela de comunicação
 */
function displayComunicacao(form, customHTML){
	
	var ocultaComunicacaoInterna = false;
	var cstGrpTec1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	//000017 - Pós-Vendas - Complemento de OS - Técnico GTS
	var cstGrpTec2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", '000017', '000017', ConstraintType.MUST);
	var cstGrpTec3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var cstGrpTec = new Array(cstGrpTec1, cstGrpTec2, cstGrpTec3);
	var dsGrupoTecnicoGTS = DatasetFactory.getDataset("colleagueGroup", null, cstGrpTec, ["colleagueGroupPK.colleagueId"]);
	if(dsTemValor(dsGrupoTecnicoGTS)){
		//Se o usuário estiver no grupo de Técnico da GTS, não pode ver a coluna 'Comunicação Interna'
		ocultaComunicacaoInterna = true;
		
	}
	if( form.getValue("gerWKUserTecnicoGTS") == getValue("WKUser")){
		//Se o usuário que estiver visualizando, for o WKUser de Técnico da GTS, não pode ver a coluna 'Comunicação Interna'
		//É feito essa verificação, pois o técnico pode sair algum dia do grupo, então ficaria aberto para ele visualizar o campo
		ocultaComunicacaoInterna = true;
	}
	if(ocultaComunicacaoInterna){
		
		var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
		if(indexTbComunicacao.length > 0){
		    for (var i = 0; i < indexTbComunicacao.length; i++) { 
		    	form.setVisibleById("comComInternaItem___"+indexTbComunicacao[i], false);
		    	customHTML.append("<script>$('textarea[name*=comComInternaItem___"+indexTbComunicacao[i]+"]').hide();</script>");
		    }
		}
		
		//Se a msg para o técnico estiver vazia, oculta a linha
		customHTML.append("<script>");
		customHTML.append("	$('input[name*=comUsuarioItem___]').each(function(){");
		customHTML.append(" 	var indexComunicacao = validafunctions.getPosicaoFilho($(this).attr('id')); ");
		customHTML.append(" 	var comComTecnicoItem = $('#comComTecnicoItem___'+indexComunicacao).val(); ");
		customHTML.append(" 	if (comComTecnicoItem == '') { ");
		customHTML.append(" 		$(this).parents('tr').remove(); ");
		customHTML.append(" 	} ");
		customHTML.append(" });");
		customHTML.append("</script>");
		
		
	}else{
		//Este else, quer dizer que o usuário ou é o Suporte GTS ou faz parte do grupo interno da GTS
		customHTML.append("<script>$('#thComComInterna').show();</script>");
		customHTML.append("<script>$('#thComComInterna').text('Comunicação Interna');</script>");
    	customHTML.append("<script>$('.tdComComInterna').show();</script>");
		
    	//Mostra o campo Comunicação Interna
		var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
		if(indexTbComunicacao.length > 0){
		    for (var i = 0; i < indexTbComunicacao.length; i++) { 
		    	customHTML.append("<script>$('textarea[name*=comComInternaItem___"+indexTbComunicacao[i]+"]').show();</script>");
		    }
		}
	}
}