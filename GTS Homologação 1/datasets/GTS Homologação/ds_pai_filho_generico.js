function createDataset(fields, constraints, sortFields) {
	log.info("#### executando ds_pai_filho_generico");
	
	// LISTA DE VALORES QUE PODEM SER PASSADOS NAO ARRAY DE CONSTRAINTS
	// FORM = Dataset do formulario que deseja recuperar valores da tabela pai x filho
	// TABELA = Name da tabela pai x filho que se deseja recuperar os valores
	// METAID = metadata#id do formulario
	// METAVERSION = metadata#version do formulario
	
	var dsFormulario = "";
	var tabela = "";
	
	if(temValorArray(constraints)){
		for(var i = 0; i < constraints.length; i++){
			if(constraints[i].fieldName.toString().toUpperCase() == "DSFORM"){	
				dsFormulario = constraints[i].initialValue;
				
			}else if(constraints[i].fieldName.toString().toUpperCase() == "TABELA"){
				tabela = constraints[i].initialValue;
				
			}
		}
	}
     
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var constraints = new Array(cst);   
    var datasetPrincipal = DatasetFactory.getDataset(dsFormulario, null, constraints, null);
    
    if(datasetPrincipal != null && datasetPrincipal != undefined && datasetPrincipal.rowsCount > 0){
    	
    	var metaId = datasetPrincipal.getValue(0, "metadata#id");
    	var versionId = datasetPrincipal.getValue(0, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", tabela, tabela, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", metaId, metaId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", versionId, versionId, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);

        //Retorna o dataset
//        return DatasetFactory.getDataset(dsFormulario, fields, constraintsFilhos, null);
        return DatasetFactory.getDataset(dsFormulario, fields, constraintsFilhos, sortFields);
    }
     
    return null;
}

function temValorArray(inputArray){
	if(inputArray != null && inputArray != undefined && inputArray.length > 0)
		return true;
	else
		return false;
}

function hasArrayValue(inputArray){
	if(inputArray != null && inputArray != undefined && inputArray.length > 0)
		return true;
	else
		return false;
}