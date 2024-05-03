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
	customHTML.append("<script>$('#gerStatus').text('"+form.getValue("solStatus")+"');</script>");

	form.setValue("revEquipEstado", form.getValue("revEquipEstadoHidden"));
	form.setValue("revEstado", form.getValue("revEstadoHidden"));
	form.setValue("solEstado", form.getValue("solEstadoHidden"));
	
	if(form.getValue("solTipoSolicitacao") == "IN"){
		form.setVisibleById("divTipoInformacao", true);
	}
	
	//Revenda
	if(form.getValue("revSolicicaoVinculada") == "nao"){
		form.setVisibleById("divRevendaVinculada", true);
	}
	//Solicitação
	if(form.getValue("solTipoSolicitacaoHidden") == "IN"){
		form.setVisibleById("divTipoInformacao", true);
	}else if(form.getValue("solTipoSolicitacaoHidden") == "MP" || form.getValue("solTipoSolicitacaoHidden") == "PS" ){
		form.setVisibleById("divFalha", true);
	}
	if(form.getValue("gerOrigemSolicitacao") == "Site"){
		form.setVisibleById("divDeAcordoLGPD", true);
	}
	/*
	 * FIM PARA TODAS AS ATIVIDADES
	 */
	
	if(atv_atual == INICIO_0){

		//Status
		customHTML.append("<script>$('#getStatus').text('Em Preenchimento');</script>");
	
		var definiuTipoSolicitante = false;
		var cstGrpRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var cstGrpRev2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "000009", "000009", ConstraintType.MUST);
		var cstGrpRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuarioCorrente.getCode(), usuarioCorrente.getCode(), ConstraintType.MUST);
		var cstGrpRev = new Array(cstGrpRev1, cstGrpRev2, cstGrpRev3);
		var dsColleagueGroupRevenda = DatasetFactory.getDataset("colleagueGroup", null, cstGrpRev, null);
		if(dsTemValor(dsColleagueGroupRevenda)){
			//Se o usuário estiver no grupo 000009, o tipo de solicitante é Revenda
			form.setValue("gerTipoSolicitante",  "Revenda");
			definiuTipoSolicitante = true;
		}else{

			var cstGrpFunc1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
			var cstGrpFunc2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "000045", "000045", ConstraintType.MUST);
			var cstGrpFunc3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuarioCorrente.getCode(), usuarioCorrente.getCode(), ConstraintType.MUST);
			var cstGrpFunc = new Array(cstGrpFunc1, cstGrpFunc2, cstGrpFunc3);
			var dsColleagueGroupFuncionario = DatasetFactory.getDataset("colleagueGroup", null, cstGrpFunc, null);
			if(dsTemValor(dsColleagueGroupFuncionario)){
				//Se o usuário estiver no grupo 000045, o tipo de solicitante é Pós-Venda - Chamado de Atendimento - Colaborador GTS
				form.setValue("gerTipoSolicitante",  "Colaborador GTS");
				definiuTipoSolicitante = true;
			}
		}

		if(!definiuTipoSolicitante){
			//Se não encontrou a matricula do Representante vinculado a Revenda
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			ocultaCabecalhosForm(form, customHTML);
		}

		controleAbas(form, customHTML, 'indisponivel');

		form.setValue("gerOrigemSolicitacao",  "Fluig");
		form.setValue("solStatus",  "Em Preenchimento");
		
		//Solicitação
		form.setVisibleById("divInserirImagens", true);
		
		//Falha
		customHTML.append("<script>$('.tdDeleteRowFalha').show();</script>");
		form.setVisibleById("divBtnAddFalha", true);

		form.setValue("solWKUserSolicitante",  usuarioCorrente.getCode() );
		form.setValue("solNome",  usuarioCorrente.getFullName() );
	}else if( atv_atual == INICIO ){
		
		controleAbas(form, customHTML, 'indisponivel');
		
		if(form.getFormMode() == 'VIEW'){
			form.setVisibleById("divSolCidadeText", true);
			form.setVisibleById("divSolCidadeSelect", false);
		}else if(form.getFormMode() == 'MOD'){
			//Solicitação
			form.setVisibleById("divInserirImagens", true);
			//Falha
			customHTML.append("<script>$('.tdDeleteRowFalha').show();</script>");
			form.setVisibleById("divBtnAddFalha", true);
		}
		
	}else if( atv_atual == PROCESSO_INFORMACOES ){

		form.setVisibleById("divSolCidadeText", true);
		form.setVisibleById("divSolCidadeSelect", false);

	}else if( atv_atual == SUPORTE_GTS ){
		
		form.setVisibleById("divSolCidadeText", true);
		form.setVisibleById("divSolCidadeSelect", false);

		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		
		form.setValue("solEncaminharSolicitacao", "");

		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}else if ( atv_atual == REVENDA){
		
		form.setVisibleById("divSolCidadeText", true);
		form.setVisibleById("divSolCidadeSelect", false);

		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}else if ( atv_atual == SETOR_GTS){
		
		form.setVisibleById("divSolCidadeText", true);
		form.setVisibleById("divSolCidadeSelect", false);

		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}else if ( atv_atual == FIM){
		
		form.setVisibleById("divSolCidadeText", true);
		form.setVisibleById("divSolCidadeSelect", false);

		controleAbas(form, customHTML, 'disponivel');
		form.setVisibleById("divAddAtendimento", false);
		
		//Comunicação
		displayDefinicaoSuporteGTS(form, customHTML);
		displayComunicacao(form, customHTML);
		
	}
	

}
/**
 * Função para quando da erro de carregamento das informações e é necessário não apresentar nada do formulário
 * @param form
 * @param customHTML
 */
 function ocultaCabecalhosForm(form, customHTML){
	
	customHTML.append("<script>$('form').hide();</script>");
	customHTML.append("<script>window.parent.$('#breadcrumb').remove();</script>");
	customHTML.append("<script>window.parent.$('#textActivity').remove();</script>");
	// customHTML.append("<script>window.parent.$('#processTabs').remove();</script>");
	customHTML.append("<script>window.parent.$('#formTab').parent().parent().parent().remove()</script>");
	customHTML.append("<script>window.parent.$('#workflowActions').remove();</script>");
	
}


/**
 * Controle de Abas (disponível/indisponível)
 */
function controleAbas(form, customHTML, AbaComunicacao){
	
	if(AbaComunicacao == 'disponivel'){
		customHTML.append("<script>$('#tabComunicacao').show();</script>");
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
		form.setVisibleById("divSolEncEmailRevendaFinalizado", true);
	}
	if(form.getValue("solEncaminharSolicitacao") != ""){
		form.setVisibleById("divSolEncaminharSolicitacao", true);
	}
	
}
/**
 * Técnico da GTS não pode visualizar a coluna 'Comunicação Interna' da tabela de comunicação
 */
function displayComunicacao(form, customHTML){
	
	var ocultaComunicacaoInterna = false;
	var cstGrpTec1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	//000009 - Pós-Vendas - Entrega Técnica - Revenda
	var cstGrpTec2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", '000009', '000009', ConstraintType.MUST);
	var cstGrpTec3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var cstGrpTec = new Array(cstGrpTec1, cstGrpTec2, cstGrpTec3);
	var dsGrupoTecnicoGTS = DatasetFactory.getDataset("colleagueGroup", null, cstGrpTec, ["colleagueGroupPK.colleagueId"]);
	if(dsTemValor(dsGrupoTecnicoGTS)){
		//Se o usuário estiver no grupo de Revenda, oculta a Comunicação Interna
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
		
		//Se a msg para a Revenda estiver vazia, oculta a linha
		customHTML.append("<script>");
		customHTML.append("	$('input[name*=comUsuarioItem___]').each(function(){");
		customHTML.append(" 	var indexComunicacao = validafunctions.getPosicaoFilho($(this).attr('id')); ");
		customHTML.append(" 	var comComExternaItem = $('#comComExternaItem___'+indexComunicacao).val(); ");
		customHTML.append(" 	var comComRevendaItem = $('#comComRevendaItem___'+indexComunicacao).val(); ");
		customHTML.append(" 	if (comComExternaItem == '' && comComRevendaItem == '') { ");
		customHTML.append(" 		$(this).parents('tr').remove(); ");
		customHTML.append(" 	} ");
		customHTML.append(" });");
		customHTML.append("</script>");
		
		
	}else{
		//Este else, quer dizer que o usuário ou é o Suporte GTS ou faz parte do grupo interno da GTS
		customHTML.append("<script>$('.lblComComInterna').show();</script>");
		customHTML.append("<script>$('.lblComComInterna').text('Comunicação Interna');</script>");
    	customHTML.append("<script>$('.tdComComInterna').show();</script>");
		
    	//Mostra o campo Comunicação Interna
		var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
		if(indexTbComunicacao.length > 0){
		    for (var i = 0; i < indexTbComunicacao.length; i++) { 
		    	customHTML.append("<script>$('textarea[name*=comComInternaItem___"+indexTbComunicacao[i]+"]').show();</script>");
		    }
		}
	}

	//Não mostra os campos de comunicação quando não estão preenchidos, para facilitar a visualização.
	var indexTbComunicacao = form.getChildrenIndexes("comTbComunicacao");
	if(indexTbComunicacao.length > 0){
		for (var i = 0; i < indexTbComunicacao.length; i++) { 
			if(isEmpty("comComInternaItem___"+indexTbComunicacao[i],form)){
				form.setVisibleById("comComInternaItem___"+indexTbComunicacao[i], false);
				customHTML.append("<script>$('textarea[name*=comComInternaItem___"+indexTbComunicacao[i]+"]').prev().hide();</script>");
				customHTML.append("<script>$('textarea[name*=comComInternaItem___"+indexTbComunicacao[i]+"]').hide();</script>");
			}
			if(isEmpty("comComExternaItem___"+indexTbComunicacao[i],form)){
				form.setVisibleById("comComExternaItem___"+indexTbComunicacao[i], false);
				customHTML.append("<script>$('textarea[name*=comComExternaItem___"+indexTbComunicacao[i]+"]').prev().hide();</script>");
				customHTML.append("<script>$('textarea[name*=comComExternaItem___"+indexTbComunicacao[i]+"]').hide();</script>");
			}
			if(isEmpty("comComRevendaItem___"+indexTbComunicacao[i],form)){
				form.setVisibleById("comComRevendaItem___"+indexTbComunicacao[i], false);
				customHTML.append("<script>$('textarea[name*=comComRevendaItem___"+indexTbComunicacao[i]+"]').prev().hide();</script>");
				customHTML.append("<script>$('textarea[name*=comComRevendaItem___"+indexTbComunicacao[i]+"]').hide();</script>");
			}
		}
	}

}