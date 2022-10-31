//Função para que quando selecionado algum registro dos campos zoom, realizei determinada ação
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "solFilial") {
    	console.log(selectedItem);
        $('#solCodFilial').val(selectedItem.codFilial);
    }
}

function setZoomData(instance, value){
	window[instance].setValue(value);
}

//Função para que quando removido algum registro dos campos zoom, realizei determinada ação
function removedZoomItem(removedItem) {

	if (removedItem.inputId == "solFilial") {
		$('#solCodFilial').val('');
		window["solFilial"].clear();
	}
}