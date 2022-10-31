function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	if(atv_atual == INICIO_0){
		inicializaCampos(form, customHTML);
		escondeBotoesAdm(form, customHTML);
	}else if(atv_atual == INICIO ){
		escondeBotoesAdm(form, customHTML);
		
	}else if(atv_atual == ADM_ANALISA){
		inicializaCamposAdm(form, customHTML);
		customHTML.append("<script>FLUIGC.switcher.init('#reaPrecoPedAtacado')</script>");
		
	}else if(atv_atual == REP_VERIFICA_RET){
		customHTML.append("<script>FLUIGC.switcher.init('#reaPrecoPedAtacado')</script>");
		customHTML.append("<script>FLUIGC.switcher.isReadOnly('#reaPrecoPedAtacado', true)</script>");
	}else{
		customHTML.append("<script>FLUIGC.switcher.init('#reaPrecoPedAtacado')</script>");
		customHTML.append("<script>FLUIGC.switcher.isReadOnly('#reaPrecoPedAtacado', true)</script>");
	}
}

function inicializaCampos(form,customHTML){
	log.info("#### INICIO inicializaCampos...");
	
	var matrUser = getValue("WKUser");
	var nomeUser = "";
	
	var fields = ["colleagueName", "mail"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matrUser, matrUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	if(dsTemValor(datasetColleague)){
		nomeUser = datasetColleague.getValue(0, "colleagueName");
		
		if(temValor(nomeUser)){
			form.setValue("repNome", nomeUser);
		}
	}
	
	var a1Cod = "";
	var a1Loja = "";
	var datasetDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", fields, [ c1, c2 ], null);
	if(dsTemValor(datasetDadosAdicionais)){
		a1Cod = datasetDadosAdicionais.getValue(0, "A1_COD");
		a1Loja = datasetDadosAdicionais.getValue(0, "A1_LOJA");
		
		var c1 = DatasetFactory.createConstraint("a1Cod", a1Cod, a1Cod, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("a1Loja", a1Loja, a1Loja, ConstraintType.MUST);
		
		var datasetConsultCliente = DatasetFactory.getDataset("DSConsultCliente", fields, [ c1, c2 ], null);
		if(dsTemValor(datasetConsultCliente)){
			var a1DDD = datasetConsultCliente.getValue(0, "A1_DDD");
			var a1Tel = datasetConsultCliente.getValue(0, "A1_TEL");
			
			if(temValor(a1DDD)){
				a1Tel = '('+a1DDD+') ' + a1Tel
			}
			form.setValue("repTelProtheus", a1Tel);
		}
	}
	
	//Inicia campos zerados de valores
	customHTML.append("<script>$('#reaPrecoPrecoBalcao').val('0')</script>");
	customHTML.append("<script>validafunctions.setMoeda('reaPrecoPrecoBalcao',2, false , '')</script>");
	
	customHTML.append("<script>$('#reaPrecoPrecoConcorrente').val('0')</script>");
	customHTML.append("<script>validafunctions.setMoeda('reaPrecoPrecoConcorrente',2, false , '')</script>");
	

	log.info("#### FIM inicializaCampos...");
}

function inicializaCamposAdm(form,customHTML){
	log.info("#### INICIO inicializaCamposAdm...");
	
	var matrUser = getValue("WKUser");
	var nomeUser = "";
	
	var fields = ["colleagueName"];
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matrUser, matrUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
	if(dsTemValor(dataset)){
		nomeUser = dataset.getValue(0, "colleagueName");
		
		if(temValor(nomeUser) ){
			form.setValue("reaPrecoUsuarioAdm", nomeUser);
		}
	}
	
	log.info("#### FIM inicializaCamposAdm...");
}


function escondeBotoesAdm(form, customHTML){
	customHTML.append("<script>$('#divAdmReanalise').hide()</script>");
}
