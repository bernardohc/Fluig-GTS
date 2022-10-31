function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("familia");
	dataset.addColumn("tipoProduto");
	dataset.addColumn("familiaTipoProduto");
	
	var sortingFields = new Array("familiaTipoProduto");
    var datasetParamFamiliaTpProd = DatasetFactory.getDataset("ds_parametro_familia_tipo_produto", null, null, sortingFields);
    
    if(dsTemValor(datasetParamFamiliaTpProd)){
    	for(var i = 0; i < datasetParamFamiliaTpProd.rowsCount; i++){
    		var familia = datasetParamFamiliaTpProd.getValue(i, "familia");
    		var tipoProduto = datasetParamFamiliaTpProd.getValue(i, "tipoProduto");
    		var familiaTipoProduto = datasetParamFamiliaTpProd.getValue(i, "familiaTipoProduto");

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