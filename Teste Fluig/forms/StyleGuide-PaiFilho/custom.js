function init(){
	var INICIO_SOLICITACAO = "0";
	var ATIVIDADE_INICIO   = "1";		
	var ANALISE_AUDITORIA = "5";
	//document.getElementById("lineCount").value=1;
	
	var activity = getWKNumState();			
	//document.getElementById("nmMatriculaAuditor").style.display = "none";
	
	if (activity != ATIVIDADE_INICIO && activity != INICIO_SOLICITACAO) {
		setVisible("addSolicitante" ,false);
		//setVisible("limpaSolicitante" ,false);
		setVisible("addArea" ,false);
		//setVisible("limpaArea" ,false);
		setVisible("btCalendarDataIniAudit" ,false);
		//setVisible("limpaDataIniAudit" ,false);
		setVisible("btCalendarDataFimAudit" ,false);
		//setVisible("limpaDataFimAudit" ,false);
		setVisible("btIncluirArea" ,false);
		setVisible("zoomAuditor" ,false);
		var tableGrid = document.getElementById("areaAuditada");
		if (activity != null) 			
			trashDisappearsGrid(tableGrid);
		scramWithButtonsButtonGrid(tableGrid, true);	
	}
	if(activity == 3){
		if(document.getElementById("lineCount").value == null || document.getElementById("lineCount").value == ""){
			document.getElementById("lineCount").value=04;
		}
		var linhasContador = document.getElementById("lineCount").value;
		document.getElementById("lineCount").value=(parseInt(linhasContador))+1;
	}
	if(activity != ANALISE_AUDITORIA){
//		setVisible("btCalendarDataIniReplanAudit" ,false);
//		setVisible("limpaDataIniReplanAudit" ,false);
//		setVisible("btCalendarDataFimReplanAudit" ,false);
//		setVisible("limpaDataFimReplanAudit" ,false);
	}
}

function setVisible(idObject, visible){
	//visible?alert("visible"):alert("hidden");
	//alert(document.getElementById(idObject));
	//alert(idObject);
	document.getElementById(idObject).style.visibility = visible?"visible":"hidden";
}

function openZoomArea() {		
	openZoom("Area", "ecm_kgq_areas", "nmArea,Areas", "nmArea", "addArea", "400", "250", "metadata_active", "true");
}
function openZoomSolicitante() {		
	window.open("/webdesk/zoom.jsp?datasetId=colleague&dataFields=colleagueId,Matricula,colleagueName,Nome"+
			"&resultFields=colleagueId,colleagueName&type=addSolicitante", "zoom" , "status, scrollbars=no , width=600 , heigth=350, top=0 , left=0");
}
function openZoomAreaGrid(object) {
	rowSelected = object.parentNode.parentNode;			
	openZoom("Area", "ecm_kgq_areas", "nmArea,Areas,nmResponsavelArea,Responsaveis", "nmArea,nmResponsavelArea,nmMatricRespArea", "addAreaGrid", "400", "250", "metadata_active", "true");
}
var rowSelected;
function openZoomAuditor(object) {
	rowSelected = object.parentNode.parentNode;			
	openZoom("Auditor", "colleague", "colleagueId,Matricula,colleagueName,Nome", "colleagueId,colleagueName", "addAuditor", "400", "250");
}

function setSelectedZoomItem(selectedItem){
	var tipo = selectedItem.type;
	var index = document.getElementById("hiddenIndex").value;
	if (tipo == "addArea") {
		document.getElementById('nmArea').value = selectedItem.nmArea;
	}
	if (tipo == "addAreaGrid") {
		var inputs = rowSelected.getElementsByTagName("input");
		inputs[4].value = selectedItem.nmArea; //inputs[6].value = selectedItem.nmArea;
		inputs[5].value = selectedItem.nmResponsavelArea; //inputs[7].value = selectedItem.nmResponsavelArea;
		inputs[7].value = selectedItem.nmMatricRespArea; //inputs[9].value = selectedItem.nmMatricRespArea;
	}if(tipo == "addSolicitante"){
		document.getElementById('nmMatricSolicitante').value = selectedItem.colleagueId;
		document.getElementById('nmSolicitante').value = selectedItem.colleagueName;
	}if (tipo == "addAuditor") {
		var inputs = rowSelected.getElementsByTagName("input");		
		inputs[11].value = selectedItem.colleagueName; //inputs[13].value = selectedItem.colleagueName;
		inputs[10].value = selectedItem.colleagueId; //inputs[12].value = selectedItem.colleagueId;
	}
}

function getIndexGrid(buttonSelected){
	var indexInit = 0;
	if ( buttonSelected.id.indexOf('__') > -1 ) {
		var indexInit = buttonSelected.id.indexOf('__') + 3;
	}
	var size = buttonSelected.id.length;
	var number = buttonSelected.id.substring(indexInit, size);
	return number;
}

function selectDateData(object, oldDates, futureDates){
	var objectDate = document.getElementById("dtData");
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}

function selectDateInicioAudit(campo, object, oldDates, futureDates){
	var objectDate = document.getElementById(campo);
	displayDatePicker(objectDate, 'dmy', undefined, futureDates, oldDates );	
}

function clearGridAreasAudit(object) {
	var index = getIndexGrid(object);
	document.getElementById("nmAreaGrid___" + index).value=" ";
	document.getElementById("nmResponsavelArea___" + index).value=" ";
	document.getElementById("hiddenRespArea___" + index).value=" ";
}
function clearGridAuditor(object) {
	var index = getIndexGrid(object);
	document.getElementById("nmAuditor___" + index).value=" ";
	document.getElementById("hiddenAukditArea___" + index).value=" ";
}
function trashDisappearsGrid(tableGrid){		
	var tBody = tableGrid.getElementsByTagName("tbody")[0];	
	var tds = tBody.getElementsByTagName("td");	
	var trs = tBody.getElementsByTagName("tr");			
	var rowsTBody = tBody.rows.length;
	var tdsFirstRow = tds.length /rowsTBody;
	var indexTD = 0;
	
	for(var i=1;i< rowsTBody;i++){ 
		indexTD += tdsFirstRow;		
	 	tds[indexTD].style.visibility = 'hidden';			
	}	
}
function clearField(object_name) {
	var object;
	object = document.getElementsByName(object_name)[0];
	var index = getIndexGrid(object);
	document.getElementById("dtDataInicioAuditArea___" + index).value=" ";
	document.getElementById("dtDataFimAuditArea___" + index).value=" ";
}
function linhasGrid() {
	fieldsCount = 0;
	var elemen = document.form.elements;
	for (var x = 0; x < elemen.length; x++) {
		var field = elemen[x].id.match(/[a-zA-Z]+___\d/gi);
		if (field != null) {
			fieldsCount = fieldsCount + 1;
		}
	}
	lineCount = fieldsCount / 17;
	document.getElementById("hiddenLineCount").value = lineCount;
}

function scramWithButtonsButtonGrid(grid, scram){
	var inputs = grid.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){		
		if(inputs[i].type=="button")					
			inputs[i].style.display = scram?"none":"block";
	}
}
function selectDateInicioAuditPai(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDateQuery = jQuery(object).siblings('input[name^="dtDataInicioAuditArea"]');
	displayDatePicker(objectDateQuery[0], 'dmy', undefined, futureDates, oldDates );	
}
function selectDateInicioAuditPai2(object, oldDates, futureDates){
	var index = getIndexGrid(object);
	var objectDateQuery = jQuery(object).siblings('input[name^="dtDataFimAuditArea"]');
	displayDatePicker(objectDateQuery[0], 'dmy', undefined, futureDates, oldDates );	
}