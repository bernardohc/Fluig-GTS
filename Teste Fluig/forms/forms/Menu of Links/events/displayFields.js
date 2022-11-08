function displayFields(form,customHTML){

	form.setHidePrintLink(true);
	var WKNumState = getValue("WKNumState");
	var WKNumProces = getValue("WKNumProces");
	var WKUser = getValue("WKUser");
	var WKNextState = getValue("WKNextState");
	var WKMobile = form.getMobile();
	var formMode = form.getFormMode();

	log.info('----> Iniciando DisplayFields');
	
	//Passando parametros para dentro do html
	customHTML.append("<script>");
	customHTML.append("\n   var WKNumState = " + WKNumState + ";");
	customHTML.append("\n   var WKNumProces = " + WKNumProces + ";");
	customHTML.append("\n   var WKUser = '" + WKUser + "';");
	customHTML.append("\n   var WKNextState = " + WKNextState + ";");
	customHTML.append("\n   var WKMobile = " + WKMobile + ";");
	customHTML.append("\n   var formMode = '" + formMode + "';");
	
	//Escondendo fields via manipulacao DOM
	if ((WKNumState == null || WKNumState == '') && formMode == "VIEW") {
		hideElementes(customHTML);
	}
	
	customHTML.append("\n</script>");
	log.info('----> FIM do DisplayFields');
}

function hideElementes(customHTML){
	customHTML.append("\n $(function() { $('#mdp_origin').parent().addClass('hidden'); });");
}

