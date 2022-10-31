function displayFields(form,customHTML){
	
	var atv_atual = getValue("WKNumState");
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	papelConsultaPrecoTabela(form, customHTML);
	
	 if (!isMobile(form)){
		 customHTML.append("<script>$('#divOrcamentoProduto').css('top', '-130px')</script>");
	}
}



function papelConsultaPrecoTabela(form,customHTML){
	
	
	//Vai verificar se o usuário está no papel divOrcamentoProduto
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', "consultaPrecoTabela", "consultaPrecoTabela", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constraints, null);
	
	if(dsTemValor(datasetWorkflowColleagueRole)){
		
	}else{
		customHTML.append("<script>$('#divOrcamentoProduto').hide()</script>");	
	}
}