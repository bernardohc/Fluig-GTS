function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("siglaEstado");
	dataset.addColumn("matriculaEstado");
	dataset.addColumn("codVendedorProtheus");
	dataset.addColumn("matriculaValidaPedRiscoA");
	
	var dsForm = "dsGestorEstadoParametro";
	var tabela = "table_gestor_estado";
	
	var fields = ["siglaEstado", "matriculaEstado", "codVendedorProtheus", "matriculaValidaPedRiscoA"];
	var cst = DatasetFactory.createConstraint("DSFORM", dsForm, dsForm, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("TABELA", tabela, tabela, ConstraintType.MUST);
    var constraints = new Array(cst, cst2);   
    var datasetGenerico = DatasetFactory.getDataset("ds_pai_filho_generico", fields, constraints, null);
    
    if(dsTemValor(datasetGenerico)){
    	for(var i = 0; i < datasetGenerico.rowsCount; i++){
    		var siglaEstado = datasetGenerico.getValue(i, "siglaEstado");
    		var matriculaEstado = datasetGenerico.getValue(i, "matriculaEstado");
    		var codVendedorProtheus = datasetGenerico.getValue(i, "codVendedorProtheus");
    		var matriculaValidaPedRiscoA = datasetGenerico.getValue(i, "matriculaValidaPedRiscoA");
    		dataset.addRow([siglaEstado, matriculaEstado, codVendedorProtheus, matriculaValidaPedRiscoA]);
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