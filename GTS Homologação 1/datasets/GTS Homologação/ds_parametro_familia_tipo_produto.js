function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("familia");
	dataset.addColumn("tipoProduto");
	dataset.addColumn("familiaTipoProduto");
	
	var dsForm = "dsControleDeProspectParametro";
	var tabela = "table_familia_tipo_produto";
	
	var fields = ["familia", "tipoProduto", "familiaTipoProduto"];
	var cst = DatasetFactory.createConstraint("DSFORM", dsForm, dsForm, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("TABELA", tabela, tabela, ConstraintType.MUST);
    var constraints = new Array(cst, cst2);   
    var sortingFields = new Array("familiaTipoProduto");
    var datasetGenerico = DatasetFactory.getDataset("ds_pai_filho_generico", fields, constraints, sortingFields);
    
    if(dsTemValor(datasetGenerico)){
    	for(var i = 0; i < datasetGenerico.rowsCount; i++){
    		var familia = datasetGenerico.getValue(i, "familia");
    		var tipoProduto = datasetGenerico.getValue(i, "tipoProduto");
    		var familiaTipoProduto = datasetGenerico.getValue(i, "familiaTipoProduto");
    		

    		dataset.addRow([familia, tipoProduto, familiaTipoProduto]);
    	}
    }else{
    	dataset.addRow(["Não foi encontrado nenhuma família e tipo de produto", "-1"]);
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