function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var ccod = "IPCX04011003";
	
	var servicoURL = "http://gtsdo143182.protheus.cloudtotvs.com.br:1457/rest/WS_GTS_FLUIG?ccod=" + ccod;
	var data = myApiConsumer.get(servicoURL);
	
	var dataset = DatasetBuilder.newDataset();
	
	var objdata = JSON.parse(data);
	
	dataset.addColumn('CODRET');
	dataset.addColumn('MSGRET');
	dataset.addColumn('CDESC');
	
	dataset.addRow([objdata['CODRET'], objdata['MSGRET'], objdata['CDESC']]);
	
	return dataset;
	

}function onMobileSync(user) {

}