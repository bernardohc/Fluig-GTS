function injetarFuncoesUteisJS(form, customHTML) {
	log.info("#### INICIO injetarFuncoesUteisJS...");
	
	customHTML.append("<script>function getWKUser(){return " + "'" + getValue("WKUser") + "'" + ";}</script>");
	customHTML.append("<script>function getWKCompany(){return " + getValue("WKCompany") + ";}</script>");
	customHTML.append("<script>function getWKNumState(){return " + getValue("WKNumState") + ";}</script>");
	customHTML.append("<script>function getWKNumProces(){return " + getValue("WKNumProces") + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + getValue("WKNumState") + "';</script>");

		
	var processo = getValue("WKNumProces");
	form.setValue("processoId",processo);
	
	log.info("#### FIM injetarFuncoesUteisJS...");
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
