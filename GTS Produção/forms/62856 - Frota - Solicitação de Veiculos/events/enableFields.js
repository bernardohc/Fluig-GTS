function enableFields(form){

    var atv_atual = getValue("WKNumState");
	
	if(atv_atual == INICIO_0){	 
		//form.setEnabled("solOutMotorista", false);

	}else if(atv_atual == APROVA_SOLICITACAO){
		// Solicitação
		form.setEnabled("solSolicitante", false);
		form.setEnabled("solSetor", false);
		form.setEnabled("solDataSol", false);
		form.setEnabled("solObjetivo", false);
        form.setEnabled("solMotivo", false);
		form.setEnabled("solTipo", false);
		form.setEnabled("solMotorista", false);
		form.setEnabled("solDestino", false);
        form.setEnabled("solDataSaida", false);
		form.setEnabled("solHoraSaida", false);
		form.setEnabled("solPrevRetorno", false);
        form.setEnabled("solQuantPessoas", false);
		form.setEnabled("solOutMotorista", false);
		form.setEnabled("solObservacao", false);

	}
	else if(atv_atual == ENTREGA){
		// Solicitação
		form.setEnabled("solSolicitante", false);
		form.setEnabled("solSetor", false);
		form.setEnabled("solDataSol", false);
		form.setEnabled("solObjetivo", false);
        form.setEnabled("solMotivo", false);
		form.setEnabled("solTipo", false);
		form.setEnabled("solMotorista", false);
		form.setEnabled("solDestino", false);
        form.setEnabled("solDataSaida", false);
		form.setEnabled("solHoraSaida", false);
		form.setEnabled("solPrevRetorno", false);
        form.setEnabled("solQuantPessoas", false);
		form.setEnabled("solOutMotorista", false);
		form.setEnabled("solObservacao", false);

		//Aprovação
		form.setEnabled("aprovaSolicitacao", false);
		form.setEnabled("libVeiculoLiberado", false);
		form.setEnabled("libObservacao", false);
		
	}
	else if(atv_atual == RECEBE){
		// Solicitação
		form.setEnabled("solSolicitante", false);
		form.setEnabled("solSetor", false);
		form.setEnabled("solDataSol", false);
		form.setEnabled("solObjetivo", false);
        form.setEnabled("solMotivo", false);
		form.setEnabled("solTipo", false);
		form.setEnabled("solMotorista", false);
		form.setEnabled("solDestino", false);
        form.setEnabled("solDataSaida", false);
		form.setEnabled("solHoraSaida", false);
		form.setEnabled("solPrevRetorno", false);
        form.setEnabled("solQuantPessoas", false);
		form.setEnabled("solOutMotorista", false);
		form.setEnabled("solObservacao", false);

		//Aprovação
		form.setEnabled("aprovaSolicitacao", false);
		form.setEnabled("libVeiculoLiberado", false);
		form.setEnabled("libObservacao", false);

		//Entrega
		form.setEnabled("entDataEntrega", false);
		form.setEnabled("entHoraEntrega", false);
		form.setEnabled("entColaboradorReti", false);
		form.setEnabled("entVigilante", false);

	}
	else if(atv_atual == FIM){
		// Solicitação
		form.setEnabled("solSolicitante", false);
		form.setEnabled("solSetor", false);
		form.setEnabled("solDataSol", false);
		form.setEnabled("solObjetivo", false);
        form.setEnabled("solMotivo", false);
		form.setEnabled("solTipo", false);
		form.setEnabled("solMotorista", false);
		form.setEnabled("solDestino", false);
        form.setEnabled("solDataSaida", false);
		form.setEnabled("solHoraSaida", false);
		form.setEnabled("solPrevRetorno", false);
        form.setEnabled("solQuantPessoas", false);
		form.setEnabled("solOutMotorista", false);
		form.setEnabled("solObservacao", false);

		//Aprovação
		form.setEnabled("aprovaSolicitacao", false);
		form.setEnabled("libVeiculoLiberado", false);
		form.setEnabled("libObservacao", false);

		//Entrega
		form.setEnabled("entDataEntrega", false);
		form.setEnabled("entHoraEntrega", false);
		form.setEnabled("entColaboradorReti", false);
		form.setEnabled("entVigilante", false);

		//Recebe
		form.setEnabled("devDataDevolucao", false);
		form.setEnabled("devHorarioDevolucao", false);
		form.setEnabled("devKM", false);
		form.setEnabled("devColabEntrega", false);
		form.setEnabled("devVigilante", false);
		form.setEnabled("devObs", false);
	
	}

 }

