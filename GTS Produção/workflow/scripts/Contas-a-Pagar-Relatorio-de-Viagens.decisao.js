function temAbastecimento(){
    //Função para verifica se foi passado pela etapa de abastecimento, e realizar a integração
    var temAbastecimento = 'false';
    
    //Somente se o setor for 'outro' para validar se 'tem abastecimento'
    var indexTbRelDespesas = hAPI.getChildrenIndexes("tbRelDespesas");
    for (var i = 0; i < indexTbRelDespesas.length; i++) {
        //Quando a classificação for 'Combustível', é que tem abastecimento
        if(hAPI.getCardValue("rvDespClassi___"+indexTbRelDespesas[i]) == 'Combustível'){
            temAbastecimento = 'true';
        }
    }

    return temAbastecimento;
}