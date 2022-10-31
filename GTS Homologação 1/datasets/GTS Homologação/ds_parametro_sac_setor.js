function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("ativo");
	dataset.addColumn("codSetor");
	dataset.addColumn("setor");
	dataset.addColumn("codGrupo");
	
	var dsForm = "dsSACSetorParametro";
	var tabela = "table_sac_setor";
	
	var fields = ["ativo", "codSetor", "setor", "codGrupo"];
	var cst = DatasetFactory.createConstraint("DSFORM", dsForm, dsForm, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("TABELA", tabela, tabela, ConstraintType.MUST);
    var constraints = new Array(cst, cst2);   
    var sortingFields = new Array("setor");
    var datasetGenerico = DatasetFactory.getDataset("ds_pai_filho_generico", fields, constraints, sortingFields);
    
    if(dsTemValor(datasetGenerico)){
    	for(var i = 0; i < datasetGenerico.rowsCount; i++){
    		var ativo = datasetGenerico.getValue(i, "ativo");
    		var codSetor = datasetGenerico.getValue(i, "codSetor");
    		var setor = datasetGenerico.getValue(i, "setor");
    		var codGrupo = datasetGenerico.getValue(i, "codGrupo");
    		if(ativo == 'selecionado'){
    			dataset.addRow([ativo, codSetor, setor, codGrupo]);
    		}
    	}
    }else{
    	dataset.addRow(["Não foi encontrado nenhum setor de SAC cadastrado", "-1"]);
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