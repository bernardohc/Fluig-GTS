//Regex das datas, salvsa de formatos diferente
function inputFields(form){

		var regEx = /^\d{4}-\d{2}-\d{2}$/; 
		
		if (form.getValue('solDataRelatorio').match(regEx)) {
			var split = form.getValue('solDataRelatorio').split('-');
			form.setValue('solDataRelatorio', split[2] + '/' + split[1] + '/' + split[0]);
		}
			
		if (form.getValue('solDataSaida').match(regEx)) {
			var split = form.getValue('solDataSaida').split('-');
			form.setValue('solDataSaida', split[2] + '/' + split[1] + '/' + split[0]);
		}
		
		if (form.getValue('solDataRetorno').match(regEx)) {
			var split = form.getValue('solDataRetorno').split('-');
			form.setValue('solDataRetorno', split[2] + '/' + split[1] + '/' + split[0]);
		}
		
		//Regex percorrendo o formulario filho
		var indexesSolTbDespesas = form.getChildrenIndexes("solTbDespesas");
		 for (var i = 0; i < indexesSolTbDespesas.length; i++) { 
			 if (form.getValue('solDataDocumento___'+ indexesSolTbDespesas[i]).match(regEx)) {
					var split = form.getValue('solDataDocumento___'+ indexesSolTbDespesas[i]).split('-');
					form.setValue('solDataDocumento___'+ indexesSolTbDespesas[i], split[2] + '/' + split[1] + '/' + split[0]);
			 }
		 }
}