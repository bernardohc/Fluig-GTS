function defineStructure() {
	addColumn("A1_COD");
	addColumn("A1_LOJA");
	addColumn("A1_GERENTE");
	addColumn("A1_TIPO");
}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("A1_COD");
    dataset.addColumn("A1_LOJA");
    dataset.addColumn("A1_GERENTE");
    dataset.addColumn("A1_TIPO");
	
    var WKUser = getValue("WKUser");
    
	try{
		var clientService = fluigAPI.getAuthorizeClientService();

        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'ServidorFluigGTS',
            endpoint : '/api/public/2.0/users/getUser/'+WKUser,
            method : 'get',
            timeoutService: '100' // segundos
        }
                                                      
        var vo = clientService.invoke(JSON.stringify(data));
	 
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw new Exception("Retorno está vazio");
        }else{
            log.info(vo.getResult());
            
            
            var json = JSON.parse(vo.getResult());
            dataset.addRow([json.content.extData.A1_COD, json.content.extData.A1_LOJA, json.content.extData.A1_GERENTE, json.content.extData.A1_TIPO]);
            
        }
    } catch(err) {
        throw new Exception(err);
    }
	
	    
    return dataset;
	
	
}function onMobileSync(user) {

}