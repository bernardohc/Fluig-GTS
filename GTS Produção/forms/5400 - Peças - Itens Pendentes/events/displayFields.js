function displayFields(form,customHTML){
	var atv_atual = getValue("WKNumState");
	form.setValue("WKNumState", getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	if(atv_atual == INICIO_0){
		
		
		
		
	}else if( atv_atual == INICIO ){
		
		
		
		
	}else if( atv_atual == ADM_GTS_DEFINE_DATA ){
		
		form.setValue("condPagamento", "");
		form.setValue("tipoFrete", "");
		
		var A1_PAIS = "";
		A1_PAIS = retornaPais(form, customHTML);
		if(A1_PAIS == 'USA'){
			customHTML.append("<script>$('.prc-dolar-total-pendente').show();</script>");
			customHTML.append("<script>$('.prc-total-pendente').removeClass('col-md-2');</script>");
			customHTML.append("<script>$('.prc-total-pendente').addClass('col-md-1');</script>");
		}
		
		var indexes = form.getChildrenIndexes("tbItensPendente");
		
		if(indexes.length > 0){
		    for (var i = 0; i < indexes.length; i++) { 
		    	form.setVisibleById('itmEliminarItem___'+ indexes[i], false);
		    }
	    }
		
	}else if( atv_atual == GER_REVENDA_DEFINE ){
		
		var A1_PAIS = "";
		A1_PAIS = retornaPais(form, customHTML);
		if(A1_PAIS == 'USA'){
			customHTML.append("<script>$('.prc-dolar-total-pendente').show();</script>");
			customHTML.append("<script>$('.prc-total-pendente').removeClass('col-md-2');</script>");
			customHTML.append("<script>$('.prc-total-pendente').addClass('col-md-1');</script>");
		}
		
		form.setVisibleById('msgPrazoResposta', true);
		if(form.getFormMode() == 'VIEW'){
			var indexes = form.getChildrenIndexes("tbItensPendente");
			
			if(indexes.length > 0){
			    for (var i = 0; i < indexes.length; i++) { 
			    	form.setVisibleById('itmEliminarItem___'+ indexes[i], false);
			    }
		    }
		}else{
			var indexes = form.getChildrenIndexes("tbItensPendente");
			
			if(indexes.length > 0){
			    for (var i = 0; i < indexes.length; i++) { 
			    	customHTML.append("<script>FLUIGC.switcher.init('#itmEliminarItem___"+ indexes[i] +"')</script>");
			    }
		    }
		}
		
	}else if( atv_atual == ADM_GTS_RETORNO ){
		
		if(form.getFormMode() == 'VIEW'){
			customHTML.append("<script>$('#divCienteGTS').hide();</script>");
		}
		
		var A1_PAIS = "";
		A1_PAIS = retornaPais(form, customHTML);
		if(A1_PAIS == 'USA'){
			customHTML.append("<script>$('.prc-dolar-total-pendente').show();</script>");
			customHTML.append("<script>$('.prc-total-pendente').removeClass('col-md-2');</script>");
			customHTML.append("<script>$('.prc-total-pendente').addClass('col-md-1');</script>");
		}
		
		/*processHistoryPK.movementSequence 4 é quando a revenda movimentou na resposta ou se foi movimentada automaticamente */
		var c1  = DatasetFactory.createConstraint("processHistoryPK.companyId", getValue('WKCompany'), getValue('WKCompany'), ConstraintType.MUST); 
		var c2  = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", getValue('WKNumProces'), getValue('WKNumProces'), ConstraintType.MUST); 
		var c3  = DatasetFactory.createConstraint("processHistoryPK.movementSequence", '4', '4', ConstraintType.MUST); 
		var constraints = new Array(c1, c2, c3);
		var dataset = DatasetFactory.getDataset("processHistory", null, constraints, null);

		if(dataset.getValue(0, "automaticLink") == true){
			form.setVisibleById('divRetornoRevenda', true);
			customHTML.append("<script>$('#dataHoraMovimentadoAutomaticamente').text( $('#dataHoraRespostaRevenda').val() );</script>");
			form.setVisibleById('divMovimentacaoAutomatica', true);
			
			var indexes = form.getChildrenIndexes("tbItensPendente");
			if(indexes.length > 0){
			    for (var i = 0; i < indexes.length; i++) { 
			    	form.setVisibleById('itmEliminarItem___'+ indexes[i], false);
			    }
		    }
		}else{
			form.setVisibleById('divRetornoRevenda', true);
			form.setVisibleById('divDataRespostaRevenda', true);
			
			var indexes = form.getChildrenIndexes("tbItensPendente");
			if(indexes.length > 0){
			    for (var i = 0; i < indexes.length; i++) { 
			    	customHTML.append("<script>FLUIGC.switcher.isReadOnly('#itmEliminarItem___"+ indexes[i] +"', true)</script>");
			    }
		    }
		}
		
	}else if( atv_atual == FIM ){
		
		if(form.getFormMode() == 'VIEW'){
			customHTML.append("<script>$('#divCienteGTS').hide();</script>");
		}
		
		var A1_PAIS = "";
		A1_PAIS = retornaPais(form, customHTML);
		if(A1_PAIS == 'USA'){
			customHTML.append("<script>$('.prc-dolar-total-pendente').show();</script>");
			customHTML.append("<script>$('.prc-total-pendente').removeClass('col-md-2');</script>");
			customHTML.append("<script>$('.prc-total-pendente').addClass('col-md-1');</script>");
		}
		
		var c1  = DatasetFactory.createConstraint("processHistoryPK.companyId", getValue('WKCompany'), getValue('WKCompany'), ConstraintType.MUST); 
		var c2  = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", getValue('WKNumProces'), getValue('WKNumProces'), ConstraintType.MUST); 
		var c3  = DatasetFactory.createConstraint("processHistoryPK.movementSequence", '4', '4', ConstraintType.MUST); 
		var constraints = new Array(c1, c2, c3);
		 
		var dataset = DatasetFactory.getDataset("processHistory", null, constraints, null);

		if(dataset.getValue(0, "automaticLink") == true){
			form.setVisibleById('divRetornoRevenda', true);
			customHTML.append("<script>$('#dataHoraMovimentadoAutomaticamente').text( $('#dataHoraRespostaRevenda').val() );</script>");
			form.setVisibleById('divMovimentacaoAutomatica', true);
			
			var indexes = form.getChildrenIndexes("tbItensPendente");
			if(indexes.length > 0){
			    for (var i = 0; i < indexes.length; i++) { 
			    	form.setVisibleById('itmEliminarItem___'+ indexes[i], false);
			    }
		    }
		}else{
			form.setVisibleById('divRetornoRevenda', true);
			form.setVisibleById('divDataRespostaRevenda', true);
			
			var indexes = form.getChildrenIndexes("tbItensPendente");
			if(indexes.length > 0){
			    for (var i = 0; i < indexes.length; i++) { 
			    	customHTML.append("<script>FLUIGC.switcher.isReadOnly('#itmEliminarItem___"+ indexes[i] +"', true)</script>");
			    }
		    }
		}
		
		
		form.setVisibleById('dataHoraRespostaRevenda', true);
	}
}

function retornaPais(form, customHTML){
	var WKUserGerRevenda = form.getValue("WKUserGerRevenda");
	
	var siglaUFUser = WKUserGerRevenda.substring(0, 2);
	var paisUser = "";
	
	if(siglaUFUser == "EX"){
		paisUser = WKUserGerRevenda.substring(2, 5);
	}else{
		paisUser = "BRA";
	}
	return paisUser;
}