function beforeTaskSave(colleagueId,nextSequenceId,userList){
    
    var atv_atual = getValue("WKNumState");
    if( atv_atual == INICIO_0 || atv_atual == INICIO){
        //Verifica se tem 'Reserva de Máquina'
        if( hAPI.getCardValue("pedMaqResNumPedidoTotvs") != "" && hAPI.getCardValue("pedMaqResWKUserReserva") == "" ){
            
            var cstResMaq1 = DatasetFactory.createConstraint("tipoUsuario", hAPI.getCardValue("solTipoSolicitante"), "", ConstraintType.MUST); 
            var cstResMaq2 = DatasetFactory.createConstraint("tipoRegistro", "RESERVA", "", ConstraintType.MUST); 
            var cstResMaq3 = DatasetFactory.createConstraint("filialPedido", hAPI.getCardValue("pedMaqResFilialPedidoTotvs"), "", ConstraintType.MUST); 
            var cstResMaq4 = DatasetFactory.createConstraint("codPedido", hAPI.getCardValue("pedMaqResNumPedidoTotvs"), "", ConstraintType.MUST); 
            var cstResMaq5 = DatasetFactory.createConstraint("idFluig", getValue("WKNumProces"), "", ConstraintType.MUST); 
            var cstResMaq = new Array(cstResMaq1, cstResMaq2, cstResMaq3, cstResMaq4, cstResMaq5);
            var dsPedMaqRegistraReservaMaquina = DatasetFactory.getDataset("dsPedMaqRegistraReservaMaquina", [], cstResMaq, []);
            var codRetorno = dsPedMaqRegistraReservaMaquina.getValue(0, "CODRET");
            var msgRetorno = dsPedMaqRegistraReservaMaquina.getValue(0, "MSGRET");
            
            if(codRetorno == "1"){
                hAPI.setCardValue("pedMaqResWKUserReserva", getValue("WKUser"));
                hAPI.setCardValue("pedMaqResDataReserva", dataAtual("dd/mm/yyyy hh:mm"));
            }else{
                throw '<br><br> Não foi possível realizar registro de "Reserva de Máquina": ' + msgRetorno + '<br><br>';
            }
        }
    }
}