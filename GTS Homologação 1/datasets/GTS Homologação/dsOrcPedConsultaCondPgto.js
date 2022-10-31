function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	var tipoPedido = '';
	var valorPedido = 0;
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'tipoPedido' ) {
			tipoPedido = constraints[i].initialValue;
		}
		if ( constraints[i].getFieldName().toString() == 'valorPedido' ) {
			valorPedido = constraints[i].initialValue;
		}
	}
	
	valorPedido = parseFloat(valorPedido);
	
	newDataset.addColumn("tipoPedido");
	newDataset.addColumn("valorPedido");
	newDataset.addColumn("codCondPagto");
	newDataset.addColumn("descCondPagto");
	
	if( tipoPedido == 'CF' ){
		//Compra Futura	
		if(valorPedido >= 8000 && valorPedido < 60000){
			//7x customizado [30,60,90,120,150,180,210],[10,20,20,20,10,10,10]
			newDataset.addRow(new Array(tipoPedido, valorPedido, '198', '7x (% parcelas Compra Futura)'));
		}else if(valorPedido >= 60000 && valorPedido < 120000){
			//9x customizado [30,60,90,120,150,180,210,240,270],[3.33333,3.33333,10.83,17.5,17.5,17.5,10,10,10]
			newDataset.addRow(new Array(tipoPedido, valorPedido, '200', '9x (% parcelas Compra Futura)'));
		}else if(valorPedido >= 120000 ){
			//12x customizado [30,60,90,120,150,180,210,240,270,300,330,360],[2.5,2.5,7.5,7.5,12.5,12.5,12.5,12.5,7.5,7.5,7.5,7.5]
			newDataset.addRow(new Array(tipoPedido, valorPedido, '201', '12x (% parcelas Compra Futura)'));
		}
	}else if( tipoPedido == 'CP'){
		//Compra Programada
		newDataset.addRow(new Array(tipoPedido, valorPedido, '026', '30/60/90 dias'));
		
	}else if( tipoPedido == 'PE' ){
		
		newDataset.addRow(new Array(tipoPedido, valorPedido, '008', 'À Vista - 10 dias'));
		//Pedido Estoque	
		//3x (30, 60, 90 3x com intervalo de 30 dias)
		newDataset.addRow(new Array(tipoPedido, valorPedido, '026', '3x'));
		if(valorPedido >= 16000 ){
			//5x (5x com intervalo de 30 dias)
			newDataset.addRow(new Array(tipoPedido, valorPedido, '034', '5x'));
		}
		if(valorPedido >= 30000 ){
			//7x (7x com intervalo de 28 dias)
			newDataset.addRow(new Array(tipoPedido, valorPedido, '066', '7x'));
		}
		if(valorPedido >= 60000 ){
			//9x (30, 60, 90 3x com intervalo de 30 dias)
			newDataset.addRow(new Array(tipoPedido, valorPedido, '068', '9x'));
		}
	}else if( tipoPedido == 'PP' ){
		//Pedido Promocional
		newDataset.addRow(new Array(tipoPedido, valorPedido, '026', '30/60/90 dias'));
		
	}else if( tipoPedido == 'PG' ){
		//Pedido Garantia é somente 30 dias
		newDataset.addRow(new Array(tipoPedido, valorPedido, '032', '60 dias'));
	
	}else if( tipoPedido == 'MP' ){
		//Máquina Parada é somente 30 dias
		newDataset.addRow(new Array(tipoPedido, valorPedido, '019', '30 dias'));
	
	}else if( tipoPedido == 'PEUSA' ){
		//Pedido USA
		newDataset.addRow(new Array(tipoPedido, valorPedido, '032', '60 days after shipment'));
	
	}
	
	
	
	return newDataset;
}