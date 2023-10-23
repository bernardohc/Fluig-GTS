//Regex das datas, salvsa de formatos diferente
function inputFields(form){

	var regEx = /^\d{4}-\d{2}-\d{2}$/; 
	
	if (form.getValue('solDataSol').match(regEx)) {
		var split = form.getValue('solDataSol').split('-');
		form.setValue('solDataSol', split[2] + '/' + split[1] + '/' + split[0]);
	}
		
	if (form.getValue('solDataSaida').match(regEx)) {
		var split = form.getValue('solDataSaida').split('-');
		form.setValue('solDataSaida', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
	if (form.getValue('solDataRet').match(regEx)) {
		var split = form.getValue('solDataRet').split('-');
		form.setValue('solDataRet', split[2] + '/' + split[1] + '/' + split[0]);
	}
	
	//Regex percorrendo o formulario filho
	var indexesSolTbDespesas = form.getChildrenIndexes("tbRelDespesas");
	for (var i = 0; i < indexesSolTbDespesas.length; i++) { 
		if (form.getValue('rvDespData___'+ indexesSolTbDespesas[i]).match(regEx)) {
			var split = form.getValue('rvDespData___'+ indexesSolTbDespesas[i]).split('-');
			form.setValue('rvDespData___'+ indexesSolTbDespesas[i], split[2] + '/' + split[1] + '/' + split[0]);
		}
	}
}