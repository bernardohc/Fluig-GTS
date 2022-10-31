function dataHoraAtual(){
    var data = new Date();
    
    var dia = addZero(data.getDate());
    var mes = addZero(data.getMonth()+1);
    var ano = data.getFullYear(); 
    
    var hora = addZero(data.getHours());
    var minuto = addZero(data.getMinutes());
    var segundo = addZero(data.getSeconds());
    
    return dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function temValor(valor){
	if(valor != null && valor != undefined){
		valor = valor.toString().trim();
		
		if(valor != ""){
			return true;
		}else{
			return false;
		}
	}
	
	return false;
}

function temValorArray(arrayValor){
	if(arrayValor != null && arrayValor != undefined && arrayValor.length > 0){
		return true;
	}else{
		return false;
	}
}

function dsTemValor(dataset){
	if(dataset != null && dataset != undefined && dataset.rowsCount > 0){
		return true;
	}else{
		return false;
	}
}

function buscarData(){
	return new Date();
}

function buscarDiaAtual(){
	return buscarData().getDate().toString();
}

function buscarMesAtual(){
	return (buscarData().getMonth()+1).toString();
}

function buscarAnoAtual(){
	return buscarData().getFullYear().toString();
}

function buscarDataAtualSistema(){
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
}

function formatarData(dia, mes, ano){
	if(dia.length == 1)
		dia = 0+dia;	
	if(mes.length == 1)
		mes = 0+mes;	
	return dia+"/"+mes+"/"+ano;
}

function buscarIdSolicitacao(){
	return getValue("WKNumProces");
}

function buscarUsuarioLogado(){
	return getValue("WKUser");
}

function buscarEmpresa(){
	return getValue("WKCompany");
}

/*
 * Retorna o Valor do Campo
 */
function buscarValorCampo(nomeCampo) {
	return hAPI.getCardValue(nomeCampo);
}

/*
 * Método para retornar os Dados do dataSet selecionado
 */
function getValorDataSet(nomeDataSet, campoIdDataSet, valorIdDataSet, nomeCampo) {
	var dataSet = DatasetFactory.getDataset(nomeDataSet, null, null, null);
	var valorCampo = false;

	for ( var i = 0; i < dataSet.rowsCount; i++) {
		if (dataSet.getValue(i, codigoDataSet) == valorIdDataSet) {
			valorCampo = dataSet.getValue(i, nomeCampo);
		}
	}
	return valorCampo;
}

/*
 * Debug
 */
function debug(string){
	log.info(string);	
	throw string;
}

function gravarLog(string){
	log.info(string);
}