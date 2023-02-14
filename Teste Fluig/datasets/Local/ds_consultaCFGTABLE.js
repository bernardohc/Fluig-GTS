//Com valores dinâmicos
function createDataset(fields, constraints, sortFields) {
	try {
		
		log.info("---------------------------Inicio do dataset ds_consultaCFGTABLE_2");
		
		//Cria o dataset
		
		
		var dataset = DatasetBuilder.newDataset();
		
		if (fields != undefined && fields != null) {
			
			var userCode = "MSALPHA";//Usuário padrão
			var alias = ""; //Nome da tabela
			var queryaddwhere = "";//Query
			var branch = "";//Filial
			var listfieldsview = new Array();//Colunas da tabela do Protheus
			
			alias = fields[0];
			queryaddwhere = fields[1];
			branch = fields[2];
			
			log.info("---------------------------Tabela: " + alias);
			log.info("---------------------------Query: "  + queryaddwhere);
			log.info("---------------------------Filial: " + branch);
			
			for(var posicao = 3 ; posicao < fields.length ; posicao++){
				
				listfieldsview.push(fields[posicao]); //colunas para o select
				log.info("--------------------------- Campo: " + fields[posicao]); 
				
			};
			
		    //Instancia o serviço
		    var periodicService = ServiceManager.getService('CFGTABLE');
			var serviceHelper = periodicService.getBean();
			var serviceLocator = serviceHelper.instantiate('br.com.microsiga.webservices.cfgtable_apw.CFGTABLELocator');
			var service = serviceLocator.getCFGTABLESOAP();
			
			var tableView = serviceHelper.instantiate('br.com.microsiga.webservices.cfgtable_apw.TABLEVIEW');
			
			tableView = service.GETTABLE(userCode, alias, queryaddwhere, branch, listfieldsview);
			
			if (!tableView || tableView == null) {
	            log.info("---------------------------NENHUM DADO RETORNADO POR ESTA CONSULTA.");
	            throw "NENHUM DADO RETORNADO POR ESTA CONSULTA.";
	        } else {
	        	
	        	var arrayFieldStruct = serviceHelper.instantiate('br.com.microsiga.webservices.cfgtable_apw.ARRAYOFFIELDSTRUCT');
	    		var arrayFieldView = serviceHelper.instantiate('br.com.microsiga.webservices.cfgtable_apw.ARRAYOFFIELDVIEW');
	    		var arrayOfString = serviceHelper.instantiate('br.com.microsiga.webservices.cfgtable_apw.ARRAYOFSTRING');
	    		var fieldStruct;
	    		var fieldData;
	    		var campo;
	    		var valor;
	    		
	    		arrayFieldStruct = tableView.getTABLESTRUCT();
	            arrayFieldView = tableView.getTABLEDATA();
	            fieldStruct = arrayFieldStruct.getFIELDSTRUCT();
	            fieldData = arrayFieldView.getFIELDVIEW();
	            
	            var types = new Array();
	            
	            log.info("---------------------------Tamanho: " + fieldStruct.length);
	            for ( var i = 0; i < fieldStruct.length; i++) {
	                   campo = fieldStruct[i].getFLDNAME();
	                   tipo = fieldStruct[i].getFLDTYPE();
	                   types[i] = tipo;
	                   log.info("--------------------------- Campo: " + campo + " do tipo "+tipo);
	                   dataset.addColumn(campo);
	            };
	            
	            log.info("---------------------------Dados: " + fieldData.length);
	            for ( var j = 0; j < fieldData.length; j++) {
	            	arrayOfString = fieldData[j].getFLDTAG();
		            valor = arrayOfString.getSTRING();
		           
		       	    var row = new Array();
	               	  
	               	for(var k in valor){
	               		var value = valor[k].trim();
	              	  
		              	if (types[k] == "D" && value != "") {
		              		value = value.substr(6, 2) + "/" + value.substr(4, 2) + "/" + value.substr(0, 4);  
		              	};
		              	  
		              	row.push(value);
		              	log.info("--------------------------- Valor campo " + k + ": " + row[k]);
	                };
	                
	                dataset.addRow(row);
	            };
	            
	        };
        
		} else {
			
            log.info("---------------------------OS PARAMETROS NAO FORAM INFORMADOS.");
            throw "OS PARAMETROS NAO FORAM INFORMADOS.";
            
		};
		
	} catch (erro) {
		dataset.addColumn("Erro");
        dataset.addRow(new Array(erro));
    } finally{
    	log.info("---------------------------Fim do dataset ds_consultaCFGTABLE_2");
    	return dataset;
    };

};