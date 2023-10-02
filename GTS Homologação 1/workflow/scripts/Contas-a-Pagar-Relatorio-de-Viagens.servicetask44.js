function servicetask44(attempt, message) {

    try{

        var indexTbRelDespesas = hAPI.getChildrenIndexes("tbRelDespesas");
        for (var i = 0; i < indexTbRelDespesas.length; i++) {
            if(hAPI.getCardValue("rvDespClassi___"+indexTbRelDespesas[i]) == 'Combustível'){

                //Cadastra Abastecimento no Protheus
                var IDFLUIG = DatasetFactory.createConstraint("IDFLUIG", getValue('WKNumProces')+"", "", ConstraintType.MUST); 
                var geraisCodMotorista = DatasetFactory.createConstraint("geraisCodMotorista", hAPI.getCardValue("geraisCodMotorista"), "", ConstraintType.MUST); 
                var geraisCPFMotorista = DatasetFactory.createConstraint("geraisCPFMotorista", hAPI.getCardValue("geraisCPFMotorista"), "", ConstraintType.MUST); 
                var geraisNomeMotorista = DatasetFactory.createConstraint("geraisNomeMotorista", hAPI.getCardValue("solNomeSol"), "", ConstraintType.MUST); 
                var geraisCarimboDataHora = DatasetFactory.createConstraint("geraisCarimboDataHora", hAPI.getCardValue("geraisCarimboDataHora"), "", ConstraintType.MUST); 
                var geraisPlaca = DatasetFactory.createConstraint("geraisPlaca", hAPI.getCardValue("geraisPlaca"), "", ConstraintType.MUST); 
                var abastCNPJPosto = DatasetFactory.createConstraint("abastCNPJPosto", hAPI.getCardValue("rvDespCnpj___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastNomePosto = DatasetFactory.createConstraint("abastNomePosto", hAPI.getCardValue("rvDespNomePosto___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastKmAbastecimento = DatasetFactory.createConstraint("abastKmAbastecimento", hAPI.getCardValue("rvDespKmAbast___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastTpCombustivel = DatasetFactory.createConstraint("abastTpCombustivel", hAPI.getCardValue("rvDespTpComb___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastQtdLitros = DatasetFactory.createConstraint("abastQtdLitros", hAPI.getCardValue("rvDespQtdL___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastValorLitro = DatasetFactory.createConstraint("abastValorLitro", hAPI.getCardValue("rvDespValorL___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastValorTotal = DatasetFactory.createConstraint("abastValorTotal", hAPI.getCardValue("rvDespValor___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastFormaPagamento = DatasetFactory.createConstraint("abastFormaPagamento", hAPI.getCardValue("rvDespTpPag___"+indexTbRelDespesas[i]), "", ConstraintType.MUST); 
                var abastSetor = DatasetFactory.createConstraint("abastSetor", "Relatório de Viagem", "", ConstraintType.MUST); 
                    
                var constraints = new Array(IDFLUIG, geraisCodMotorista, geraisCPFMotorista, geraisNomeMotorista, geraisCarimboDataHora, geraisPlaca, abastCNPJPosto, abastNomePosto, abastKmAbastecimento, abastTpCombustivel, abastQtdLitros, abastValorLitro, abastValorTotal, abastFormaPagamento, abastSetor);
                
                var dsAbastCadastraAbastecimento = DatasetFactory.getDataset("dsAbastCadastraAbastecimento", null, constraints, null);
                
                if(dsTemValor(dsAbastCadastraAbastecimento)){
                    var codRetorno = dsAbastCadastraAbastecimento.getValue(0, "CODRET");
                    var msgRetorno = dsAbastCadastraAbastecimento.getValue(0, "MSGRET");
                    
                    if(codRetorno == '1'){
                        hAPI.setCardValue("abastRetornoIntegracao", msgRetorno);
                    }else{
                        throw(msgRetorno);
                    }
                }else{
                    throw(" ao cadastrar abastecimento: sem retorno do dataset.");
                }

            }
        }


    }catch(erro){ 
		throw(" ao cadastrar abastecimento: " + erro);
	}
}