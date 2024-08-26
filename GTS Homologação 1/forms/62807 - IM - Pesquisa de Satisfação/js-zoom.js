function setSelectedZoomItem(selectedItem) {
	
	if (selectedItem.inputId == 'pesqRevendaZoom') {
		$("#pesqCidadeRevenda").val(selectedItem.A1MUN);
		$("#pesqEstadoRevenda").val(selectedItem.A1EST);
		console.log("entrega zoom");
	}
	if (selectedItem.inputId == 'psPesqRevendaZoom') {
		$("#psPesqCidadeRevenda").val(selectedItem.A1MUN);
		console.log(selectedItem.A1MUN);
		$("#psPesqEstadoRevenda").val(selectedItem.A1EST);
		console.log("pos venda zoom");
	}

	
		
}

function setZoomData(instance, value){
	window[instance].setValue(value);
	
}

function removedZoomItem(removedItem) {
	
	if (removedItem.inputId == 'pesqRevendaZoom') {
		$("#pesqCidadeRevenda").val('');
		$("#pesqEstadoRevenda").val('');
		console.log("entrega zoom");
	}
	if (removedItem.inputId == 'psPesqRevendaZoom') {
		$("#pesqCidadeRevenda").val('');
		$("#pesqEstadoRevenda").val('');
		console.log("pos venda zoom");
	}
		// $("#pesqCidadeRevenda").val('');
		// $("#pesqEstadoRevenda").val('');

		// $("#pesqCidadeRevenda").val('');
		// $("#pesqEstadoRevenda").val('');
	
}
