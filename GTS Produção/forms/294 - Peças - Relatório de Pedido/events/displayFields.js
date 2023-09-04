function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	dadosAdicionaisUsuario(form, customHTML);
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
			dataset.getValue(0, "A1_TIPO") != '' && dataset.getValue(0, "A1_TIPO") !== undefined && dataset.getValue(0, "A1_TIPO") != 'undefined' ){ 
			
			
			//Seta o código do usuário, loja e gerente da revenda
			form.setValue("A1_COD", A1_COD);
			form.setValue("A1_LOJA", A1_LOJA);
			form.setValue("A1_TIPO", A1_TIPO);
			form.setValue("gerenteRevenda", A1_GERENTE);
			
			if(A1_TIPO.toUpperCase() != "GERENTE"){
				customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado para visualizar esta página!', type: 'danger'});</script>");
				customHTML.append("<script>$('form').hide()</script>");
			}
			
		}else{
			customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
			customHTML.append("<script>$('form').hide()</script>");
			
		}

	
	}else{
		
		customHTML.append("<script>FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});</script>");
		customHTML.append("<script>$('form').hide()</script>");
	
	}
	
}