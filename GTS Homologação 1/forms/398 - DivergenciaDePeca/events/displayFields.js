function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	if(atv_atual == INICIO_0){
		inicializaCampos(form, customHTML);
		escondeBotoesAdm(form, customHTML);
	}else if( atv_atual == INICIO ){
		escondeBotoesAdm(form, customHTML);
		
	}else if(atv_atual == ADM_ANALISA){
		escondeBotoesTabela(form, customHTML);
		iniciaCamposAdm(form, customHTML)
	}else if(atv_atual == REP_VERIFICA_RET){
		escondeBotoesTabela(form, customHTML);
		dasabilitaSwitcher(form, customHTML);
	}else{
//		escondeBotoesTabela(form, customHTML);
		customHTML.append("<script>$('#botaoAddItem').hide()</script>");
		dasabilitaSwitcher(form, customHTML);
	}
}

function inicializaCampos(form,customHTML){
	log.info("#### INICIO inicializaCampos...");
	
	var matrUser = getValue("WKUser");
	var nomeUser = "";
	var emailUser = "";
	
	var fields = ["colleagueName", "mail"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matrUser, matrUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	if(dsTemValor(dataset)){
		nomeUser = dataset.getValue(0, "colleagueName");
		emailUser = dataset.getValue(0, "mail");
		
		if(temValor(nomeUser) && temValor(emailUser)){
			form.setValue("repTelProtheus", matrUser);
			form.setValue("repNome", nomeUser);
//			form.setValue("email_solicitante", emailUser);
		}
	}
	
	
	var dataset2 = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", fields, [ c1, c2 ], null);
	if(dsTemValor(dataset2)){
//		nomeUser = dataset.getValue(0, "colleagueName");
//		emailUser = dataset.getValue(0, "mail");
		
		 log.info('tessssssss');
		 form.setValue("repTel", dataset2.getValue(0, "A1_COD"));
//		if(temValor(nomeUser) && temValor(emailUser)){
//			form.setValue("repTelProtheus", matrUser);
//			form.setValue("repNome", nomeUser);
//			form.setValue("email_solicitante", emailUser);
//		}
	}
	
	
	log.info("#### FIM inicializaCampos...");
}

function iniciaCamposAdm(form, customHTML) {
	
	var indexes = form.getChildrenIndexes("tbItensDivergPecas");
	if(indexes.length > 0){
	    for (var i = 0; i < indexes.length; i++) {
//	    	customHTML.append("<script>FLUIGC.switcher.init('#divergPecaAvaliacaoItem___1" + indexes.toString() + "')</script>");
	    	customHTML.append("<script>FLUIGC.switcher.init('#divergPecaAvaliacaoItem___1')</script>");
	    }
	}
	
}



function escondeBotoesAdm(form, customHTML){
	
	customHTML.append("<script>$('#tbItensDivergPecas > thead> tr > th:nth-child(2)').hide()</script>");
	customHTML.append("<script>$('#tbItensDivergPecas > tbody> tr > td:nth-child(2)').hide()</script>");
	customHTML.append("<script>$('#divAdmDivergencia').hide()</script>");
}

function escondeBotoesTabela(form, customHTML){
	
	//Esconde botão de inserir novo item e lixeira
	customHTML.append("<script>$('#botaoAddItem').hide()</script>");
	customHTML.append("<script>$('#tbItensDivergPecas > thead> tr > th:nth-child(1)').hide()</script>");
	customHTML.append("<script>$('#tbItensDivergPecas > tbody> tr > td:nth-child(1)').hide()</script>");
	

}

function dasabilitaSwitcher(form, customHTML){
	var indexes = form.getChildrenIndexes("tbItensDivergPecas");
	if(indexes.length > 0){
	    for (var i = 0; i < indexes.length; i++) {
//	    	customHTML.append("<script>FLUIGC.switcher.init('#divergPecaAvaliacaoItem___1" + indexes.toString() + "')</script>");
	    	
	    	customHTML.append("<script>FLUIGC.switcher.init('#divergPecaAvaliacaoItem___1')</script>");
			customHTML.append("<script>FLUIGC.switcher.isReadOnly('#divergPecaAvaliacaoItem___1', true)</script>");
	    }
	}
}