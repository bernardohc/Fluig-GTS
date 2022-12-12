var PagInicialMenuDireita = SuperWidget.extend({

    init: function() {
    	
    	const companyId = WCMAPI.organizationId;
    	const matricula = WCMAPI.userCode;
    	
    	//Papel
    	var constCompanyId = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', companyId, companyId, ConstraintType.MUST);
    	var constColleagueId = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', matricula, matricula, ConstraintType.MUST);
		var constColleagueRole = new Array(constCompanyId, constColleagueId)
    	var dsWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constColleagueRole, null);
		
		if(dsTemValor(dsWorkflowColleagueRole)){
	        var records = dsWorkflowColleagueRole.values;
	        for ( var index in records) {
	            let record = records[index];
	            
	            /*
	             * Frota
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000002'){
	            	//Cadastra Processo - Frota Checklist
	            	$('#divFrota').show();
	            	$('#000002').show();
	            	
	            }
	            if(record['workflowColleagueRolePK.roleId'] == '000004'){
	            	//Cadastra Processo - Frota Abastecimento
	            	$('#divFrota').show();
	            	$('#000004').show();
	            	
	            }
	            /*
	             * Relatório de Viagem
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000024'){
	            	//Cadastra Processo - Contas a Pagar - Relatório de Viagens
	            	$('#divRelatorioViagens').show();
	            	$('#000024').show();
	            }
	            /*
	             * SAC
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000027' && !WCMAPI.isMobileAppMode() ){
	            	//SAC - Cadastra SAC
	            	$('#divSAC').show();
	            	$('#000027').show();
	            }
	            if(record['workflowColleagueRolePK.roleId'] == '000028' && !WCMAPI.isMobileAppMode()  ){
	            	//SAC - Consulta SAC
	            	$('#divSAC').show();
	            	$('#000028').show();
	            }
	        }
		}
		
		
		
		//Grupo
//		var constRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST);
//		var constRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);
//		var constColleagueGroup = new Array(constrainsRev1, constrainsRev2, constrainsRev3);
//		
//		var dsColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, constColleagueGroup, null);
		
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 

});

