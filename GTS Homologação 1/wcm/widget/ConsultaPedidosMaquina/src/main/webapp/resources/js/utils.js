
function convertDateToString(valor) {
    var d = new Date(valor);

    var day = d.getDate();
    var month = d.getMonth();
    month = parseInt(month) + 1;
    var year = d.getFullYear();

    day = ("00" + day).slice(-2);
    month = ("00" + month).slice(-2);

    var resul = day.toString() + '/' + month.toString() + '/' + year.toString();

    return resul;

}

function checkChecked(valor) {
    return (valor == 1) ? 'Sim' : 'Não';
}

function convertToDate(valor) {
    var d = valor.split("/");
    var day = d[0];
    var month = d[1];
    var year = d[2];
    var resul = year + "-" + month + "-" + day + "T00:00:00";
    return resul;
}


function checkEmpty(valor) {    
    return (valor) ? valor : "";
}

function convertDateToString(date) {
    var DD = date.getDate();
    DD = DD + 1;
    var MM = date.getMonth();
    MM = MM + 1;
    var YYYY = date.getFullYear();
    return ("00" + DD).slice(-2) + '/' + ("00" + MM).slice(-2) + '/' + YYYY;
}


//function getDataset(dataset, filtros, callback) {
//	
//    var retorno;
//    var oauth = OAuth({
//		consumer: {
//	   	 'public': '*****',
//		 'secret': '*****'
//		},
//		signature_method: 'HMAC-SHA1'
//	});
//    
//    var request_data = {
//        url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
//        method: 'POST'
//    };
//	
//    //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
//    var dataRequest = {
//        "name": dataset,
//        "fields": [] ,
//        "constraints": filtros,
//        "order": []
//    }
//
//    var token = {
//			'public': '*****',
//			'secret': '*****'
//	};
//
//    $.ajax({
//    	async: true,
//    	url: request_data.url,
//		type: request_data.method,
//		data: JSON.stringify(dataRequest),
//		contentType: 'application/json',
//		crossDomain: true,
//		headers: oauth.toHeader(oauth.authorize(request_data, token)),
//		
//    }).fail(function(e, data) {
//    	console.log('fail', data);
//    	callback(data);
//    }).success(function(data) {
//		callback(data);
//    });
//	
//	
//};		

function getDataset(dataset, filtros, callback) {
	var retorno;
	
	var request_data = {
			url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
			method: 'POST'
	}
	
	//type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
	var dataRequest = {
			"name": dataset,
			"fields": [] ,
			"constraints": filtros,
			"order": []
	}
	
	$.ajax({
		async: true,
		url: request_data.url,
		type: request_data.method,
		data: JSON.stringify(dataRequest),
		contentType: 'application/json',
		
	}).fail(function(e, data) {
		console.log('fail', data);
		callback(data);
	}).success(function(data) {
		callback(data);
	});
	
}

function dsTemValor(dataset){
	if(dataset != null && dataset.values != null && dataset.values.length > 0){
		return true;
	}else{
		return false;
	}
}

