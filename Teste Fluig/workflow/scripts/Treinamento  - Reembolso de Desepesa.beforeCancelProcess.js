function beforeCancelProcess(colleagueId,processId){
	
		
		var message = "";
		var hasErros = false;
		var ehGestorProcesso = false;
		
		//verificar em instalação Fluig/\appserver\domain\servers\fluig1\log\server.log
		log.info('--Before Cancel Processo--')
		log.info('--Usuario Logado--'+getValue("WKUser"))
		
		//Se o usuário logado for gestor do processo, no grupo gestorReebolsoDeDespesa, vai conseguir cancelar a solicitação
		var c1 = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('colleagueGroupPK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', "GestorReembolsoDeDespesa", "GestorReembolsoDeDespesa", ConstraintType.MUST);
		
		var constraints = new Array(c1, c2, c3);
		var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, constraints, null);
		if(dsTemValor(datasetColleagueGroup)){
			log.info('Entrou em ehGestorProcesso');
			ehGestorProcesso = true;
		}
		
		/*
		 * Se não for Gestor do Processo, não vai poder cancelar
		 */
		if( !ehGestorProcesso ){
			
			hasErros = true;
			message = "ATENÇÃO! Não é possível cancelar a solicitação, somente o Gestor do Processo possui esta funcionalidade!";
			
		}
		
		if (hasErros) {
	        throw  message;
	    }
		
		
	}
	
