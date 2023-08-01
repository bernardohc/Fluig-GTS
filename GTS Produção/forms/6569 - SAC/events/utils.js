function injetarFuncoesUteisJS(form, customHTML) {
	log.info("#### INICIO injetarFuncoesUteisJS...");
	
	customHTML.append("<script>function getWKUser(){return " + "'" + getValue("WKUser") + "'" + ";}</script>");
	customHTML.append("<script>function getWKCompany(){return " + getValue("WKCompany") + ";}</script>");
	customHTML.append("<script>function getWKNumState(){return " + getValue("WKNumState") + ";}</script>");
	customHTML.append("<script>function getWKNumProces(){return " + getValue("WKNumProces") + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + getValue("WKNumState") + "';</script>");
	
	log.info("#### FIM injetarFuncoesUteisJS...");
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}

function temValor(valor){
	if(valor != null && valor != undefined && valor.trim() != ""){
		return true;
	}else{
		return false;
	}
}

/*
 * Método para retornar os Dados do dataSet selecionado
 */
function getValorDataSet(nomeDataSet, campoIdDataSet, valorIdDataSet, nomeCampo) {
	var dataSet = DatasetFactory.getDataset(nomeDataSet, null, null, null);
	var valorCampo = false;

	for ( var i = 0; i < dataSet.rowsCount; i++) {
		if (dataSet.getValue(i, valorIdDataSet) == valorIdDataSet) {
			valorCampo = dataSet.getValue(i, nomeCampo);
		}
	}
	return valorCampo;
}

function isEmpty(campo, form) {
    var valor = form.getValue(campo);
    return valor == null || valor.trim().length() == 0 || typeof valor === undefined || valor.trim() == '0' || valor.trim() == '0,00';
}

function isMobile(form) {
    return form.getMobile() != null && form.getMobile();
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function dataHoraMinutoAtual(formato){
	var retornoDataMinuto = "";
    var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    
    if(formato == "dd/mm/yyyy hh:mm"){
    	retornoDataMinuto = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto ;
    }
    
    return retornoDataMinuto;
    
}

function dataAtual(formato){
    var retornoData = "";
	var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    
    if(formato == "dd/mm/yyyy"){
    	retornoData = dia + "/" + mes + "/" + ano;
    }else if(formato == "yyyymmdd"){
    	retornoData = ano + "" + mes + "" + dia;
    }
    
    return retornoData;
}

function formataData(data, formato){
	
	var ano = '';
	var mes = '';
	var dia = '';
	if(data.indexOf('-') > -1){
		ano = data.substring(0, 4);
		mes = data.substring(5, 7);
		dia = data.substring(8, 10);
	}else if(data.indexOf('/') > -1){
		dia = data.substring(0, 2);
		mes = data.substring(3, 5);
		ano = data.substring(6, 10);
	}
	
	if(formato == "dd/mm/yyyy"){
		retornoData = dia + "/" + mes + "/" + ano;
	}else if(formato == "yyyymmdd"){
		retornoData = ano + "" + mes + "" + dia;
	}
	
	return retornoData;
	
}

function validaEmail(field) {
	var emailValido = false;
	var indexArroba = field.indexOf("@");
	
	var indexUltimoPontoVirgula = field.lastIndexOf(";") + 1;
	var indexUltimoCaractere = field.length();
	
	if(indexArroba != '-1' && indexUltimoPontoVirgula != indexUltimoCaractere){
		
		var fieldSplit = field.split(';');
		
		var fieldSplitLen = fieldSplit.length - 1;
		for(var i=0; i<= fieldSplitLen; i++ ){
			
			if(emailValido == true || i == 0){
				//Todo e-mail que passa, precisa validar, então sempre deixo false, 
				//e no último e-mail que passar ele fica true, é que todos ficaram true.
				emailValido = false;
				
				var fieldSplited = fieldSplit[i];
				
				var indexArrobaSplit = fieldSplited.indexOf("@");
				if(indexArrobaSplit != '-1' ){
					var usuario = fieldSplited.substring(0, fieldSplited.indexOf("@"));
					var dominio = fieldSplited.substring(fieldSplited.indexOf("@")+ 1, fieldSplited.length());
					
					if ((usuario.length() >=1) &&
						    (dominio.length() >=3) &&
						    (usuario.search("@")==-1) &&
						    (dominio.search("@")==-1) &&
						    (usuario.search(" ")==-1) &&
						    (dominio.search(" ")==-1) &&
						    (dominio.search(".")!=-1) &&
						    (dominio.indexOf(".") >=1)&&
						    (dominio.lastIndexOf(".") < dominio.length() - 1)) {
						
							emailValido = true;
					}
				}
			}
			
		}
	}
	
	return emailValido ;
	
}

function completeToLeft(value, caracter, size) {
	
	var result = value;
	
	while (result.length < size) {
		result = caracter + result;
	}

	return result;
}