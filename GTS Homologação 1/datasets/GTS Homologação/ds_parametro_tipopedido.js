function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("tipoPedido");
	dataset.addColumn("DescricaoTipoPedido");
	dataset.addColumn("CodFormaPagto");
	dataset.addColumn("DescricaoFormaPagto");
	dataset.addColumn("Desconto");
	dataset.addColumn("DescontoGS");
	dataset.addColumn("ValorMinimo");
	dataset.addColumn("TpFrete");
	
	var dsForm = "dsTipoPedidoParametro";
	var tabela = "table_tipo_pedido";
	
	var fields = ["tipoPedido", "DescricaoTipoPedido", "CodFormaPagto", "DescricaoFormaPagto", "Desconto", "DescontoGS", "ValorMin", "TpFrete"];
	var cst = DatasetFactory.createConstraint("DSFORM", dsForm, dsForm, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("TABELA", tabela, tabela, ConstraintType.MUST);
    var constraints = new Array(cst, cst2);   
    var datasetGenerico = DatasetFactory.getDataset("ds_pai_filho_generico", fields, constraints, null);
    
    if(dsTemValor(datasetGenerico)){
    	for(var i = 0; i < datasetGenerico.rowsCount; i++){
    		var tipoPedido = datasetGenerico.getValue(i, "tipoPedido");
    		var DescricaoTipoPedido = datasetGenerico.getValue(i, "DescricaoTipoPedido");
    		var CodFormaPagto = datasetGenerico.getValue(i, "CodFormaPagto");
    		var DescricaoFormaPagto = datasetGenerico.getValue(i, "DescricaoFormaPagto");
    		var Desconto = datasetGenerico.getValue(i, "Desconto");
    		var DescontoGS = datasetGenerico.getValue(i, "DescontoGS");
    		var ValorMin = datasetGenerico.getValue(i, "ValorMin");
    		var TpFrete = datasetGenerico.getValue(i, "TpFrete");
    		
    		dataset.addRow([tipoPedido, DescricaoTipoPedido, CodFormaPagto, DescricaoFormaPagto, Desconto, DescontoGS, ValorMin, TpFrete]);
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