function injetarFuncoesUteisJS(form, customHTML) {
	log.info("#### INICIO injetarFuncoesUteisJS...");
//	var customJS = "<script>";
//		customJS += " function getWKUser(){return " + "'" + getValue("WKUser") + "';}";
//		customJS += " function getWKCompany(){return " + getValue("WKCompany") + ";}";
//		customJS += " function getWKNumState(){return " + getValue("WKNumState") + ";}";
//		customJS += " function getWKNumProces(){return " + getValue("WKNumProces") + ";}";
//		customJS += " function getMode(){ return '" + form.getFormMode() + "'};";
//		customJS += " var CURRENT_STATE = '" + getValue("WKNumState") + "';";
//		customJS += " var isMobile = '" + isMobile(form) + "';";
//	customJS += "</script>";
//	customHTML.append(customJS);
	
	customHTML.append("<script>function getWKUser(){return " + "'" + getValue("WKUser") + "'" + ";}</script>");
	customHTML.append("<script>function getWKCompany(){return " + getValue("WKCompany") + ";}</script>");
	customHTML.append("<script>function getWKNumState(){return " + getValue("WKNumState") + ";}</script>");
	customHTML.append("<script>function getWKNumProces(){return " + getValue("WKNumProces") + ";}</script>");
	customHTML.append("<script>function getMode(){return '" + form.getFormMode() + "'};</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + getValue("WKNumState") + "';</script>");
	customHTML.append("<script> var isMobile = '" + isMobile(form) + "';</script>");
	
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
    return valor == null || valor.trim().length() == 0 || typeof valor === undefined || valor.trim() == '' || valor.trim() == '0' || valor.trim() == '0,00';
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

/*
*	Formatação de Campos
*/
function setPercentual(valor, casasDecimais){
	valor = parseFloat(valor);
	
	var localeBR = new java.util.Locale("pt","BR");
	var big = new java.math.BigDecimal( valor ).setScale(casasDecimais,  java.math.RoundingMode.HALF_EVEN);
	var divisor = new java.math.BigDecimal("100");
	var format = new java.text.NumberFormat.getPercentInstance(localeBR);
	
	format.setMaximumFractionDigits(casasDecimais);
    format.setMinimumFractionDigits(casasDecimais);

    var novoValor = format.format(big.divide(divisor));
     
	return novoValor;
}

/*
 * Formatação Valores
 */
function formatValor(valor) {
    //Entrada do valor 12.345,678
	//Saída do valor 12345.678
	
	//Vai trocar o . por nada
	valor = valor.replace('.', '');
	//Vai trocar a , e . para as casas decimais
	valor = valor.replace(',', '.');
	valor = parseFloat(valor);
	
    return valor;
}

function formatMoney(valor) {
    //Entrada do valor 00000,00
	//Saída do valor 00.000,00
    var localeBR = new java.util.Locale("pt","BR");
//    var dinheiro = new java.text.NumberFormat.getCurrencyInstance(localeBR);
    var numberFormat = new java.text.NumberFormat.getNumberInstance(localeBR);    
    numberFormat.setMinimumFractionDigits(2);
    numberFormat.setMaximumFractionDigits(2);
    valor = numberFormat.format(parseFloat(valor));

    
    return valor;
}

/*
 * Datas
 */
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
    }else if(formato == "yyyy-mm-dd"){
    	retornoData = ano + "-" + mes + "-" + dia;
    }else if(formato == "dd/mm/yyyy hh:mm"){
    	retornoData = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto ;
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
	}else if(formato == "yyyy-mm-dd"){
		retornoData = ano + "-" + mes + "-" + dia;
	}
	
	return retornoData;
	
}

function addDias(formato, data, qtdDias){
	var retornoData = '';
    
	var sdf = new java.text.SimpleDateFormat(formato);
	var cal = java.util.Calendar.getInstance();
	 
	//Converte a string do paramento em uma data
	cal.setTime(sdf.parse(data));
	
	//Number of Days to add
	cal.add(java.util.Calendar.DAY_OF_MONTH, qtdDias);  
	//Date after adding the days to the current date
	retornoData = sdf.format(cal.getTime());  

	return retornoData;
}

function addDiasAPartirHoje(formato, qtdDias){
	
    var retornoData = '';
    
    var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
	//Getting current date
    var cal = java.util.Calendar.getInstance();
	 
	//Number of Days to add
    cal.add(java.util.Calendar.DAY_OF_MONTH, qtdDias);  
	//Date after adding the days to the current date
	retornoData = sdf.format(cal.getTime());  
		
	return retornoData;
	
}

function retornaPais(){
	var WKUser = getValue("WKUser");
	
	var siglaUFUser = WKUser.substring(0, 2);
	var paisUser = "";
	
	if(siglaUFUser == "EX"){
		paisUser = WKUser.substring(2, 5);
	}else{
		paisUser = "BRA";
	}
	return paisUser;
}

/**
 * Função para quando da erro de carregamento das informações e é necessário não apresentar nada do formulário
 * @param form
 * @param customHTML
 */
function ocultaCabecalhosForm(form, customHTML){
	
	customHTML.append("<script>$('form').hide();</script>");
	customHTML.append("<script>window.parent.$('#breadcrumb').remove();</script>");
	customHTML.append("<script>window.parent.$('#textActivity').remove();</script>");
	customHTML.append("<script>window.parent.$('#processTabs').remove();</script>");
	customHTML.append("<script>window.parent.$('#workflowActions').remove();</script>");
	
}