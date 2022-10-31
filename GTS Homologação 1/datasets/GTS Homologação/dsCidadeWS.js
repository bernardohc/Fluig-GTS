function createDataset(fields, constraints, sortFields) {
	var dataset  = DatasetBuilder.newDataset();
	dataset.addColumn("STATUS");
	dataset.addColumn("MSG");
	dataset.addColumn("UF");
	dataset.addColumn("CIDADE");
	
	var UF = '';
	
	for (var i in constraints){
		if ( constraints[i].getFieldName().toString() == 'UF' ) {
			UF = constraints[i].initialValue;
		}
	}
	
	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {                                                   
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'ServicoDadosIbge',                     
	            endpoint : '/api/v1/localidades/estados/'+UF+'/municipios',  
	            method : 'get',                                      
	            timeoutService: '100' // segundos
	        }
	
	var vo = clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult().search("HttpHostConnectException") != -1) {
        log.info("################# Não foi possível estabelecer conexao com o servidor rest #################");
        dataset.addRow("0", "Não foi possível estabelecer conexao com o servidor.", "", "");
    }
    else {
        if (vo.getResult() == null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array('0', 'Servidor não retornou nenhum registro', '', ''));
        }
        else {
            txt = new Array(vo.getResult());
            
            var objdata = JSON.parse(txt);
            try{        
                for (var obj in objdata){
                    dataset.addRow(new Array('1', 'ok', UF, objdata[obj].nome));
                }
            } catch (e) {
                    dataset.addRow(new Array('0', e.toString(), '', ''));
            }
        }

        return dataset;
    }
	
}