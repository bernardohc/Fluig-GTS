function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("siglaEstado");
	dataset.addColumn("periodoInicialDesconto");
	dataset.addColumn("periodoFinalDesconto");
	dataset.addColumn("porcDescontoPP");
	
	var dsForm = "dsPedidoPromocionalParametro";
	var tabela = "table_pedido_promocional";
	
	var fields = ["siglaEstado", "periodoInicialDesconto", "periodoFinalDesconto", "porcDescontoPP"];
	var cst = DatasetFactory.createConstraint("DSFORM", dsForm, dsForm, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("TABELA", tabela, tabela, ConstraintType.MUST);
    var constraints = new Array(cst, cst2);   
    var datasetGenerico = DatasetFactory.getDataset("ds_pai_filho_generico", fields, constraints, null);
    
    if(dsTemValor(datasetGenerico)){
    	for(var i = 0; i < datasetGenerico.rowsCount; i++){
    		var siglaEstado = datasetGenerico.getValue(i, "siglaEstado");
    		var periodoInicialDesconto = datasetGenerico.getValue(i, "periodoInicialDesconto");
    		var periodoFinalDesconto = datasetGenerico.getValue(i, "periodoFinalDesconto");
    		var porcDescontoPP = datasetGenerico.getValue(i, "porcDescontoPP");
    		dataset.addRow([siglaEstado, periodoInicialDesconto, periodoFinalDesconto, porcDescontoPP]);
    	}
    }else{
    	dataset.addRow(["Não foi encontrado nenhum tipo de pedido cadastrado", "-1"]);
    }
    	
	return dataset;
}

function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}