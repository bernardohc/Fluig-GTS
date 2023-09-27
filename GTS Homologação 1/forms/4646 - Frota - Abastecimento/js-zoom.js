function setSelectedZoomItem(selectedItem) {
	
	if(selectedItem.inputId == 'abastTipoCombustivel') {
		
		$("#abastCodTipoCombustivel").val(selectedItem.CODCOMBUSTIVEL);
		
	}
}


function setZoomData(instance, value){
	window[instance].setValue(value);
}

function removedZoomItem(removedItem) {
	
	if (removedItem.inputId == 'abastTipoCombustivel') {
		
		$("#abastCodTipoCombustivel").val('');
		
	}
}

