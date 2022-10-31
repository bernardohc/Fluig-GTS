function displayFields(form,customHTML){ 
	var atv_atual = getValue("WKNumState");
	form.setValue("WKNumState", getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	injetarFuncoesUteisJS(form, customHTML);
	
	if(atv_atual == INICIO_0){
		form.setValue("solicitante", getValue("WKUser"));
		
		var nomeUser = "";
		var fields = ["colleagueName"];
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", fields, [ c1, c2 ], null);
		if(dsTemValor(datasetColleague)){
			nomeUser = datasetColleague.getValue(0, "colleagueName");
			
			if(temValor(nomeUser)){
				log.info("info:nomeUser->"+nomeUser)
				log.debug("debug:nomeUser->"+nomeUser)
				form.setValue("campoTextoLGPD", nomeUser);
			}
		}
		
		
	}else if( atv_atual == INICIO ){
		
		
	}else if ( atv_atual == ATIVIDADE_CENTRAL){
		if(form.getFormMode() == 'VIEW'){
			
			customHTML.append("<script>$('#campoData').hide();</script>");
			
		}else{
			
			form.setVisibleById("campoTexto", false);
			
		}
	}else if ( atv_atual == FIM){
		
	}
	

}


function escondePrecoSugeridoMP(form,customHTML){
	customHTML.append("<script>$('#divPrcSugeMP').hide();</script>");
	customHTML.append("<script>$('#divCurvaAbc').addClass('col-md-offset-1');</script>");
}

function desabilitaCamposItemAnalisaGTS(form, customHTML){
	var indexes = form.getChildrenIndexes("tbItensOrcamento");
	//Esconde Lixeira
	customHTML.append("<script>$('#tbItensOrcamento > thead> tr > th:nth-child(1)').hide()</script>");
	customHTML.append("<script>$('#tbItensOrcamento > tbody> tr > td:nth-child(1)').hide()</script>");
	
	//Esconde NCM
	customHTML.append("<script>$('#tbItensOrcamento > thead> tr > th:nth-child(9)').hide()</script>");
	customHTML.append("<script>$('#tbItensOrcamento > tbody> tr > td:nth-child(9)').hide()</script>");
	
	
	for (var i = 0; i < indexes.length; i++) {   	    	    	    	
		customHTML.append("<script>$('#orcPrecoUnitItem___"+ indexes[i] +"').prop('readonly', true);</script>");
    }
}
