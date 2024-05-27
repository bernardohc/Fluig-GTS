function setSelectedZoomItem(selectedItem) {
	
	if(selectedItem.inputId == 'repNome') {
		
		$("#repWKUser").val(selectedItem.RepComWKUser);
		$("#repEmail").val(selectedItem.RepComEmail);
		$("#repTipo").val(selectedItem.RepComTipo);
		
		var loading = FLUIGC.loading(window);
		loading.show();
		/**
		 * vai buscar o repA3COD do representante
		 * ou podemos colocar no dataset de representante, que é melhor na verdade
		 */
		 $.ajax({
    		type: "GET",
    		dataType: "json",
    		async: true,
    		url: "/api/public/ecm/dataset/search?datasetId=dsPedMaqConsultaRevenda&filterFields=VENDMATFLUIG,"+selectedItem.RepComWKUser,
    		data: "",
    	    success: function (data, status, xhr) {
    	    	if (data != null && data.content != null && data.content.length > 0) {
    	    		const records = data.content;
    	    		if( records[0].CODRET == "1"){
    		            var record = records[0];
    					let CODVEND = record.CODVEND;
    					
			    		$("#repA3COD").val(CODVEND);
			    		
			    		if( $('#vendedor1').val().trim() != '' && ( $('#vendedor1').val().trim() != CODVEND.trim() ) ){
			    			FLUIGC.toast({ title: 'Atenção!', message: 'O Representante definido no formulário não está vinculado como "Representante do Cliente"!', type: 'danger' });
			    		}
    	    		}else if (records[0].CODRET == "2"){
	    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o Representante no ERP, comunicar o Administrador do Sistema!', type: 'danger'});
	   				 	console.log(records[0].MSGRET);
	    	    		
	    	    	}
    	    	}
    	    	setTimeout(function(){ 
    	    		loading.hide();
    	    	}, 1000);
    	    },
			error: function(XMLHttpRequest, textStatus, errorThrown) {
    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
    	    	FLUIGC.toast({
		    		title: '',
		    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
		    		type: 'danger'
		    	});
    	    	loading.hide();
			}
		});
		 
		
		//Somente se o usuário que abriu for o AdministrativoGTS vai alimentar o campo de GestorTerrial
		//Para RepresentanteComercial e GestorTerritorial, já vai preencher na abertura da solicitação, no displayFields
		if($('#solTipoSolicitante').val() == 'AdministrativoGTS'){
			
			//Se for um RepresentanteNacional, busca o GestorTerritorial
			//Se for um RepresentanteExportacao, busca o GestorComercial
			if(selectedItem.RepComTipo == "RepresentanteNacional"){
				
				$("#solGerenteAprovaWKUser").val(selectedItem.RepComGesTerWKUser);
				$("#solGerenteAprovaPapel").val('Pool:Role:'+selectedItem.RepComGesTerPapel);
				$("#repGestorTerritorialWKUser").val(selectedItem.RepComGesTerWKUser);
				$("#repGestorTerritorial").val(selectedItem.RepComGesTerNome);
				$("#repEmailGestorTerritorial").val(selectedItem.RepComGesTerEmail);
				
				var loading = FLUIGC.loading(window);
				loading.show();
				/**
				 * vai buscar o repGesTerA3COD do gestor territorial
				 */
				 $.ajax({
		    		type: "GET",
		    		dataType: "json",
		    		async: true,
		    		url: "/api/public/ecm/dataset/search?datasetId=dsPedMaqConsultaRevenda&filterFields=VENDMATFLUIG,"+selectedItem.RepComGesTerWKUser,
		    		data: "",
		    	    success: function (data, status, xhr) {
		    	    	if (data != null && data.content != null && data.content.length > 0) {
		    	    		const records = data.content;
		    	    		if( records[0].CODRET == "1"){
		    		            var record = records[0];
		    					let CODVEND = record.CODVEND;
					    		$("#repGesTerA3COD").val(CODVEND);
					    		
		    	    		}else if (records[0].CODRET == "2"){
			    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o Gestor Territorial no ERP, comunicar o Administrador do Sistema!', type: 'danger'});
			   				 	console.log(records[0].MSGRET);
			    	    		
			    	    	}
		    	    	}
		    	    	setTimeout(function(){ 
		    	    		loading.hide();
		    	    	}, 1000);
		    	    },
					error: function(XMLHttpRequest, textStatus, errorThrown) {
		    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
		    	    	FLUIGC.toast({
				    		title: '',
				    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
				    		type: 'danger'
				    	});
		    	    	loading.hide();
					}
				});
			}else if(selectedItem.RepComTipo == "RepresentanteExportacao"){
				
				$("#solGerenteAprovaWKUser").val(selectedItem.RepComGesTerWKUser);
				$("#solGerenteAprovaPapel").val('Pool:Role:'+selectedItem.RepComGesTerPapel);
				$("#repGestorComercialWKUser").val(selectedItem.RepComGesTerWKUser);
				$("#repGestorComercial").val(selectedItem.RepComGesTerNome);
				$("#repEmailGestorComercial").val(selectedItem.RepComGesTerEmail);
				
				
				var loading = FLUIGC.loading(window);
				loading.show();
				/**
				 * vai buscar o repGesTerA3COD do gestor territorial
				 */
				 $.ajax({
		    		type: "GET",
		    		dataType: "json",
		    		async: true,
		    		url: "/api/public/ecm/dataset/search?datasetId=dsPedMaqConsultaRevenda&filterFields=VENDMATFLUIG,"+selectedItem.RepComGesTerWKUser,
		    		data: "",
		    	    success: function (data, status, xhr) {
		    	    	if (data != null && data.content != null && data.content.length > 0) {
		    	    		const records = data.content;
		    	    		if( records[0].CODRET == "1"){
		    		            var record = records[0];
		    					let CODVEND = record.CODVEND;
					    		$("#repGesComA3COD").val(CODVEND);
					    		
		    	    		}else if (records[0].CODRET == "2"){
			    	    		FLUIGC.toast({ title: '', message: 'Erro ao consultar o Gestor Comercial no ERP, comunicar o Administrador do Sistema!', type: 'danger'});
			   				 	console.log(records[0].MSGRET);
			    	    	}
		    	    	}
		    	    	setTimeout(function(){ 
		    	    		loading.hide();
		    	    	}, 1000);
		    	    },
					error: function(XMLHttpRequest, textStatus, errorThrown) {
		    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
		    	    	FLUIGC.toast({
				    		title: '',
				    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
				    		type: 'danger'
				    	});
		    	    	loading.hide();
					}
				});
			}
			
			
		}
		
	}else if(selectedItem.inputId == 'pedCondPagto'){
		
		$('#pedCodCondPagto').val(selectedItem.CODPAGTO);
		if(selectedItem.DESCPAGTO == 'OUTRO'){
			$("#pedOutraCodPagto").prop('readonly', false);
		}else{
			$("#pedOutraCodPagto").prop('readonly', true);
			$("#pedOutraCodPagto").val('');
		}
	}

}


function setZoomData(instance, value){
	window[instance].setValue(value);
}

function removedZoomItem(removedItem) {
	
	if (removedItem.inputId == 'repNome') {
		
		$("#repA3COD").val('');
		$("#repTipo").val('');
		$("#repWKUser").val('');
		$("#repEmail").val('');
		
		//Somente se o usuário que abriu for o AdministrativoGTS vai limpar o campo de GestorTerritorial
		//Para RepresentanteComercial e GestorTerritorial, não precisa limpar este campo
		if($('#solTipoSolicitante').val() == 'AdministrativoGTS'){
			$("#solGerenteAprovaWKUser").val('');
			$("#solGerenteAprovaPapel").val('');
			
			$("#repGesTerA3COD").val('');
			$("#repGestorTerritorialWKUser").val('');
			$("#repGestorTerritorial").val('');
			$("#repEmailGestorTerritorial").val('');
			
			$("#repGesComA3COD").val('');
			$("#repGestorComercialWKUser").val('');
			$("#repGestorComercial").val('');
			$("#repEmailGestorComercial").val('');
		}
		
	}else if (removedItem.inputId == 'pedCondPagto') {
		
		$("#pedCodCondPagto").val('');
		$("#pedOutraCodPagto").prop('readonly', true);
		$("#pedOutraCodPagto").val('');
		
	}
}

