function createDataset(fields, constraints, sortFields) {
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NumProcesso");
    dataset.addColumn("NumFormulario");
    dataset.addColumn("Id");
    dataset.addColumn("orcCodProdutoItem");
    dataset.addColumn("orcDescProdutoItem");
    dataset.addColumn("orcDescProdutoUSAItem");
    dataset.addColumn("orcQtdItem");
    dataset.addColumn("orcEmbalagemItem");
    dataset.addColumn("orcPrecoUnitItem");
    dataset.addColumn("orcPrecoCustoItem");
    dataset.addColumn("orcPrecoCustoDolarItem");
    dataset.addColumn("orcNCMItem");
    dataset.addColumn("orcIPIItem");
    dataset.addColumn("orcAlqIPIItem");
    dataset.addColumn("orcICMSItem");
    dataset.addColumn("orcAlqICMSItem");
    dataset.addColumn("orcTotalItem");
    dataset.addColumn("orcTotalCustoComImpItem");
    dataset.addColumn("orcTotalCustoDolarItem");
    var numFormulario
    for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'NumFormulario' ) {
			numFormulario = constraints[i].initialValue;
			log.info("Testando constante:"+ constraints[i].initialValue);
		}
		
	}
    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("metadata#id",numFormulario, numFormulario, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("userSecurityId", 'admin', 'admin', ConstraintType.MUST));
   
//    var cst2 = DatasetFactory.createConstraint("userSecurityId", user, user, ConstraintType.MUST);
	
    var datasetPrincipal = DatasetFactory.getDataset("dsFormOrcamento", null, constraints, null);

    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var WKNumProces     = datasetPrincipal.getValue(i, "WKNumProces");
        var documentId      = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var constraintsFilhos = new Array();
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tbItensOrcamento" ,"tbItensOrcamento", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("dsFormOrcamento", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    WKNumProces,
                    documentId,
                    datasetFilhos.getValue(j, "wdk_sequence_id"),
                    datasetFilhos.getValue(j, "orcCodProdutoItem"), 
                    datasetFilhos.getValue(j, "orcDescProdutoItem"),
                    datasetFilhos.getValue(j, "orcDescProdutoUSAItem"),
                    datasetFilhos.getValue(j, "orcQtdItem"),
                    datasetFilhos.getValue(j, "orcEmbalagemItem"),
                    datasetFilhos.getValue(j, "orcPrecoUnitItem"),
                    datasetFilhos.getValue(j, "orcPrecoCustoItem"),
                    datasetFilhos.getValue(j, "orcPrecoCustoDolarItem"),
                    datasetFilhos.getValue(j, "orcNCMItem"),
                    datasetFilhos.getValue(j, "orcIPIItem"),
                    datasetFilhos.getValue(j, "orcAlqIPIItem"),
                    datasetFilhos.getValue(j, "orcICMSItem"),
                    datasetFilhos.getValue(j, "orcAlqICMSItem"),
                    datasetFilhos.getValue(j, "orcTotalItem"),             
                    datasetFilhos.getValue(j, "orcTotalCustoComImpItem"),              
                    datasetFilhos.getValue(j, "orcTotalCustoDolarItem")              
            ));
        }
    }

    return dataset;
}