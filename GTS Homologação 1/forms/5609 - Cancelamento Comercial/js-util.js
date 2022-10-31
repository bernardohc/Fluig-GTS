function setCamposObrigatorios(arrayCampos){
	for(var i = 0; i < arrayCampos.length; i++){
		setCampoObrigatorio(arrayCampos[i]);
	}
}

function setCampoObrigatorio(id){
	$("#lbl_" + id).addClass('required');
}

function removeCampoObrigatorio(id){
	$("#lbl_" + id).removeClass('required');
}

/**
 * Funcao para retornar o indice do elemento obj dentro de um pai x filho
 * @param obj
 * @returns
 */
function getIndice(obj){
	var nomeCampo = obj.id;
	var arrayNomeCampo = nomeCampo.split("___");
	if(arrayNomeCampo != null && arrayNomeCampo != undefined && arrayNomeCampo.length > 1){
		return parseInt(arrayNomeCampo[1]);
	}
	return -1;
}

function getIndex(id){
	var arrayNomeCampo = id.split("___");
	if(arrayNomeCampo != null && arrayNomeCampo != undefined && arrayNomeCampo.length > 1){
		return parseInt(arrayNomeCampo[1]);
	}
	return -1;
}

/**
 * Retorna o email de um usuário dada a matricula
 * @param matricula
 * @returns email
 */
function getEmail(matricula) {
	var dsColleagues = null;
	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	if (dsColleagues != null && dsColleagues != undefined && dsColleagues.values.length > 0) {
		return dsColleagues.values[0]["mail"];
	}
	return null;
}

/**
 * Retorna o nome de um usuário dada a matricula
 * @param matricula
 * @returns nome
 */
function getNome(matricula){
	var dsColleagues = null;
	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	if (dsColleagues != null && dsColleagues != undefined && dsColleagues.values.length > 0) {
		return dsColleagues.values[0]["colleagueName"];
	}
	return null;
}

function getColleague(matrUser){
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matrUser, matrUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", buscarEmpresa(), buscarEmpresa(), ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [ c1, c2 ], null);
	if(temValorDS(dataset)){
		return dataset;
	}
	
	return null;
}

function existeUsuarioFluig(login){
	var dsColleagues = null;
	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	if (dsColleagues != null && dsColleagues != undefined && dsColleagues.values.length > 0) {
		return true;
	}
	return false;
}

function addErrorClassZoomPaiFilho(campo){
	if(!($("#" + campo).closest('.has-error'))){
		$("#" + campo).closest().addClass("has-error");
	}
}

function removeErrorClassZoomPaiFilho(campo){
	if($("#" + campo).closest('.has-error')){
		$("#" + campo).closest('.has-error').removeClass("has-error");
	}
}

function removeErrorClass(campo){
	if($("#" + campo).parent().hasClass("has-error")){
		$("#" + campo).parent().removeClass("has-error");
	}
}

function addErrorClass(campo){
	if(!($("#" + campo).parent().hasClass("has-error"))){
		$("#" + campo).parent().addClass("has-error");
	}
}

function addRadioErrorClass(campo){
	var radio = $('input[name=' + campo + ']');
	if(!(radio.parent().parent().hasClass("has-error"))){
		radio.parent().parent().addClass("has-error");
	}
}

function removeRadioErrorClass(campo){
	var radio = $('input[name=' + campo + ']');
	if((radio.parent().parent().hasClass("has-error"))){
		radio.parent().parent().removeClass("has-error");
	}
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

function temValorArray(valor){
	if(valor != null && valor != undefined && valor.length > 0){
		return true;
	}else{
		return false;
	}
}

function temValorDS(dataset){
	if(dataset != null && dataset != undefined && dataset.values.length > 0){
		return true;
	}else{
		return false;
	}
}

function getValor(valor){
	var valorNumero = valor.toString().replaceAll("R$ ", "");
	var valorSemPonto = valorNumero.replaceAll(".", "");
	var valorFinal = valorSemPonto.replaceAll(",", ".");
	return valorFinal;
}

function arredonda(num, numCasaDecimais) {
	return +(Math.round(num + "e+" + numCasaDecimais) + "e-" + numCasaDecimais);
}

/**
 * formatNumber(number, n, x, s, c)
 * 
 * @param number: numero que se deseja formatar
 * @param integer n: quantidade de casas decimais
 * @param integer x: quantidade de casas milhar
 * @param mixed   s: separador de milhar
 * @param mixed   c: separador decimal
 */
function formatNumber(number, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = parseFloat(number).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

function getDataAmericana(data){
	var arrayData = data.split("/");
	var dia = arrayData[0];
	var mes = arrayData[1];
	var ano = arrayData[2];
	
	return ano + "/" + mes + "/" + dia;
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

function dataHoraAtual(){
    var data = new Date();
    var dia = data.getDate();
    
    if(dia.toString().length == 1)
    	dia = "0"+dia;
    
    var mes = data.getMonth()+1;
    if(mes.toString().length == 1)
    	mes = "0"+mes;
    
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

function moveCursorToEnd(input) {
    var originalValue = input.val();
    input.val('');
    input.blur().focus().val(originalValue);
}

String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};

//js-marcaras
function somenteNumeros(num, qtdCaracteres) {
	
	var campo = num;

    if(campo.value.length > qtdCaracteres){
    	var campoMenosUmCaracter = campo.value.substr(0,(campo.value.length - 1));
    	campo.value = campoMenosUmCaracter;
    }
    var er = /[^0-9.,]/;
    er.lastIndex = 0;
//    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }

}

function somenteNumerosInteiros(num, qtdCaracteres, def) {
	
	var campo = num;

    if(campo.value.length > qtdCaracteres){
    	var campoMenosUmCaracter = campo.value.substr(0,(campo.value.length - 1));
    	campo.value = campoMenosUmCaracter;
    }
    var er = /[^0-9]/;
    er.lastIndex = 0;
//    var campo = num;
    if (er.test(campo.value)) {
      campo.value = def;
    }

}

function fMasc(objeto,mascara) {
	obj=objeto
	masc=mascara
	setTimeout("fMascEx()",1)
}
function fMascEx() {
	obj.value=masc(obj.value)
}
function maskTelefone(tel) {
	
	var valTelefone = tel.value;
	

	
	valTelefone=valTelefone.replace("-","");
	var resultado = "";

	if(valTelefone.length > 4 && valTelefone.length <= 8){
		resultado = valTelefone.substring(0, 4)+'-'+valTelefone.substring(4, valTelefone.length);
		tel.value= resultado;
	}else if(valTelefone.length > 4 && valTelefone.length <= 9){
		resultado = valTelefone.substring(0, 5)+'-'+valTelefone.substring(5, valTelefone.length);
		tel.value= resultado;
	}
	
	var er = /[^0-9.,]/;
    er.lastIndex = 0;
    if (er.test(valTelefone)) {
    	tel.value = "";
    }
	
}
function mTel(tel) {
	tel=tel.replace(/\D/g,"")
	tel=tel.replace(/^(\d)/,"($1")
	tel=tel.replace(/(.{3})(\d)/,"$1)$2")
	if(tel.length == 9) {
		tel=tel.replace(/(.{1})$/,"-$1")
	} else if (tel.length == 10) {
		tel=tel.replace(/(.{2})$/,"-$1")
	} else if (tel.length == 11) {
		tel=tel.replace(/(.{3})$/,"-$1")
	} else if (tel.length == 12) {
		tel=tel.replace(/(.{4})$/,"-$1")
	} else if (tel.length > 12) {
		tel=tel.replace(/(.{4})$/,"-$1")
	}
	return tel;
}
