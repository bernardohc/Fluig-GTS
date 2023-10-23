function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODRET");
	dataset.addColumn("MSGRET");
	dataset.addColumn("WKUser");
	dataset.addColumn("COD_MOTORISTA");
	dataset.addColumn("CPF_MOTORISTA");
    dataset.addColumn("NOME");
	
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

            dataset.addRow(new Array('1' 
            						 ,'OK'
            						 ,WKUser
            						 ,json.content.extData.COD_MOTORISTA
            						 ,json.content.extData.CPF_MOTORISTA
            						 ,json.content.fullName
            						 ));
            
        }
    } catch(erro) {
        log.info("Erro na busca do motorista " + erro);
        dataset.addRow(new Array('2', erro));
    }
	
    return dataset;
	
}