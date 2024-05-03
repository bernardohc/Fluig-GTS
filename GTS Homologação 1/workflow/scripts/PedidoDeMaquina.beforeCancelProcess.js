function beforeCancelProcess(colleagueId,processId){
	
	var message = "";
	var hasErros = false;
	var defineGeracaoPedidoInicio = hAPI.getCardValue("defineGeracaoPedidoInicio");
	var revPedSolicitanteAcao = hAPI.getCardValue("revPedSolicitanteAcao");
	var aprovAdmGTS = hAPI.getCardValue("aprovAdmGTS");
	var cancelamentoAutomatico = hAPI.getCardValue("cancelamentoAutomatico");
	
	var ehGestorPedidoDeMaquina = false;
	//Se o usuário logado for gestor do processo, no papel gestorOrcamento, vai conseguir cancelar a solicitação
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', "gestorPedidoDeMaquina", "gestorPedidoDeMaquina", ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constraints, null);
	if(dsTemValor(datasetWorkflowColleagueRole)){
		ehGestorPedidoDeMaquina = true;
	}
	
	/*
	 * Se for marcado alguma das opções ou for Gestor do Processo, vai poder cancelar
	 */
	if(defineGeracaoPedidoInicio == "Cancelar" || revPedSolicitanteAcao == "cancelar" || aprovAdmGTS == "reprovado" || cancelamentoAutomatico == "cancelar" || ehGestorPedidoDeMaquina){
		
		if( hAPI.getCardValue("pedMaqResNumPedidoTotvs") != "" ){
			
			var cstResMaq1 = DatasetFactory.createConstraint("tipoRegistro", "CANCELA-RESERVA", "", ConstraintType.MUST); 
			var cstResMaq2 = DatasetFactory.createConstraint("filialPedido", hAPI.getCardValue("pedMaqResFilialPedidoTotvs"), "", ConstraintType.MUST); 
			var cstResMaq3 = DatasetFactory.createConstraint("codPedido", hAPI.getCardValue("pedMaqResNumPedidoTotvs"), "", ConstraintType.MUST); 
			var cstResMaq = new Array(cstResMaq1, cstResMaq2, cstResMaq3);
			var dsPedMaqRegistraReservaMaquina = DatasetFactory.getDataset("dsPedMaqRegistraReservaMaquina", [], cstResMaq, []);
			var codRetorno = dsPedMaqRegistraReservaMaquina.getValue(0, "CODRET");
			var msgRetorno = dsPedMaqRegistraReservaMaquina.getValue(0, "MSGRET");
			
			if(codRetorno == "1"){
				hAPI.setCardValue("pedMaqResWKUserCancelReserva", getValue("WKUser"));
				hAPI.setCardValue("pedMaqResDataCancelReserva", dataAtual("dd/mm/yyyy hh:mm"));
			}else{
				throw msgRetorno;
			}
			
		}
		
		
	}else{
		
		hasErros = true;
		message = "ATENÇÃO! Não é possível cancelar o pedido! Só é possível cancelar o pedido pelo formulário!";
		
	}
	
	if (hasErros) {
        throw  message;
    }
}