function displayFields(form,customHTML){
	
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	dadosAdicionaisUsuario(form, customHTML);
	
	mostraEscondeCampos(form, customHTML);
	
	if (!isMobile(form)){
		 customHTML.append("<script>$('#divOrcamentoProduto').css('top', '-130px')</script>");
	}
}

function dadosAdicionaisUsuario(form,customHTML){
	
	var A1_COD = "";
	var A1_LOJA = "";
	var A1_GERENTE = "";
	var A1_TIPO = "";
	var cadCorreto = true;	
	var textoCadErrado = "";
	
	var dataset = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
	if(dsTemValor(dataset)){
		
		A1_COD = dataset.getValue(0, "A1_COD");
		A1_LOJA = dataset.getValue(0, "A1_LOJA");
		A1_GERENTE = dataset.getValue(0, "A1_GERENTE");
		A1_TIPO = dataset.getValue(0, "A1_TIPO");
		
		
		if( dataset.getValue(0, "A1_COD") != '' && dataset.getValue(0, "A1_COD") !== undefined && dataset.getValue(0, "A1_COD") != 'undefined' &&
			dataset.getValue(0, "A1_LOJA") != '' && dataset.getValue(0, "A1_LOJA") !== undefined && dataset.getValue(0, "A1_LOJA") != 'undefined' &&
			dataset.getValue(0, "A1_GERENTE") != '' && dataset.getValue(0, "A1_GERENTE") !== undefined && dataset.getValue(0, "A1_GERENTE") != 'undefined' &&
			dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' 		){ 
			
			
			//Seta o código do usuário, loja e gerente da revenda
			form.setValue("A1_COD", A1_COD);
			form.setValue("A1_LOJA", A1_LOJA);
			form.setValue("gerenteRevenda", A1_GERENTE);
			form.setValue("A1_TIPO", A1_TIPO);
			
			
		}else{
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			customHTML.append("<script>$('form').hide()</script>");
			
		}

	
	}else{
		
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		customHTML.append("<script>$('form').hide()</script>");
	
	}
	
}

function mostraEscondeCampos(form,customHTML){
	
	var pais = retornaPais();
	form.setValue("A1_PAIS", pais);

	var A1_TIPO = form.getValue("A1_TIPO")
	
	if(pais == "USA"){
		if( A1_TIPO.toUpperCase() == 'GERENTE'){
			//se for gerente vai esconder o campo de quantidade de estoque
			customHTML.append("<script>$('.class-not-eua-gerente').hide();</script>");
			customHTML.append("<script>$('#divUnidEmb').addClass('col-md-offset-1');</script>");
		}else if( A1_TIPO.toUpperCase() == 'MASTER'){
			customHTML.append("<script>$('#divEstDisp').addClass('col-md-offset-1');</script>");
		}
		 customHTML.append("<script>$('#divEstoqueRevenda').hide();</script>");
		 customHTML.append("<script>$('.cifrao-dolar').show();</script>");
		 customHTML.append("<script>$('.class-not-eua').hide();</script>");
		 customHTML.append("<script>$('#divUnMed').removeClass('col-md-1');</script>");
		 customHTML.append("<script>$('#divUnMed').addClass('col-md-2');</script>");
		 customHTML.append("<script>$('#divPesoUnit').removeClass('col-md-1');</script>");
		 customHTML.append("<script>$('#divPesoUnit').addClass('col-md-2');</script>");
		 customHTML.append("<script>$('#divOrcProdCustoTotal').addClass('col-md-offset-1');</script>");
		 customHTML.append("<script>$('#divCodCritico').addClass('col-md-offset-1');</script>");
	}else{
		customHTML.append("<script>$('#popoverEnUs').hide();</script>");
		
		if( A1_TIPO.toUpperCase() == 'GERENTE'){
			form.setVisibleById("divOrcProdCustoTotal", true); 
		}else{
			form.setVisibleById("divOrcProdAlqIPI", false); 
			form.setVisibleById("orcProdAlqIPI", false); 
			
			form.setVisibleById("divOrcProdAlqICMS", false); 
			form.setVisibleById("orcProdAlqICMS", false); 
			
			form.setVisibleById("divOrcProdICMSRET", false); 
			form.setVisibleById("orcProdICMSRET", false); 
			
			form.setVisibleById("divOrcProdCustoTotal", false); 
			form.setVisibleById("orcProdCustoTotal", false); 
			
			form.setVisibleById("divOrcNCM", false); 
			form.setVisibleById("orcProdNCM", false); 
			
			form.setVisibleById("divOrcProdCustoTotalItemMP", false); 
			form.setVisibleById("orcProdCustoTotalItemMP", false); 
		}
	}
}

function retornaPais(){
	var WKUser = getValue("WKUser");
	
	var siglaUFUser = WKUser.substring(0, 2);
	var paisUser = "";
	
	if(siglaUFUser == "EX"){
		paisUser = WKUser.substring(2, 5);
	}else{
		paisUser = "BRA";
	}
	return paisUser;
}
