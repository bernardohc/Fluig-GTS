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


/*
 * Zoom para busca de máquina nos itens
 */
$(document).ready(function() {
	setTimeout(function() {
		zoom.start();
	}, 100)
});

var zoom = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsZoom.setup();
		}
	}
})();

var eventsZoom = (function() {
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				var ev = $(this).data("event");
			
				if( ev == 'selecionaMaquina' ){
					zoom.index = validafunctions.getPosicaoFilho($(this).attr("id"));
					zooms(ev);
				}
				
			});

		}
	}
})();

function zooms(ev){

	//SE FOR IOS OU PC ELE EXECUTARA ZOOMMODAL USANDO #AJAX API FLUIG 
	//SE FOR ANDROID ELE USARA ZOOMMODAL VIA DATASETFATORY 
	//MOTIVO : PARA FUNCIONAMENTO DE OFFLINE EM SO ANDORID... 
	
	if ( ev ==  'selecionaMaquina' ) {
		if (zoom.index != 0) {
			
			let tabPreco = ( $("#tabPreco").val() == '' ? 'PADRAO' : $("#tabPreco").val());
			let porcDesconto = validafunctions.getFloatValue("itPedPorcDescontoItem___"+zoom.index);
			
			var constraintsSelecionaMaquina = "PROPORCDESC,"+porcDesconto+",TABPRECO,"+tabPreco;
			//		  open(dataset, fields, resultfields, title, contraints, searchBy, idZoom)
			modalzoom.open( "selecionaMaquina", "dsPedMaqConsultaProduto","PROCOD,Cód. Item,PRODESC, Descrição", "PRDFIL,PROCOD,PRODESC,PROPRCTAB2,PROPRCTAB6,PROPRCUNIT,PRONCM,PROFINAME,PROIPIVAL,PROIPIALIQ,PROVLTOTLIQ,PROVALTOT", "Consulta de Máquina", constraintsSelecionaMaquina, "PROCOD", "Código da Máquina","Digite no mínimo 3 caracteres");
		
		}
		
	}
	

}

function setSelectedZoomCustom(selectedItem) {
	var tipo = selectedItem.type;
	
	if (tipo == "selecionaMaquina" ) {
		if (zoom.index != 0) {
			let FilialItem = selectedItem.PRDFIL;
			let CodigoItem = selectedItem.PROCOD;
			let DescricaoItem = selectedItem.PRODESC;
			
			let PrecoTabela2 = selectedItem.PROPRCTAB2;
			let PrecoTabela6 = selectedItem.PROPRCTAB6;
			let PrecoUnit = selectedItem.PROPRCUNIT;
			
			let NCM = selectedItem.PRONCM;
			let Finame = selectedItem.PROFINAME;
			let IPIValor = selectedItem.PROIPIVAL;
			let IPIAliq = selectedItem.PROIPIALIQ;
			let TotalCusto = selectedItem.PROVLTOTLIQ;
			let TotalCustoComImp = selectedItem.PROVALTOT;
			
			$("#itPedFilialItem___"+zoom.index).val(FilialItem);
			$('#itPedCodItemItem___' + zoom.index).val(CodigoItem);
    		$("#itPedDescricaoItemItem___"+zoom.index).val(DescricaoItem);
    		
    		$("#itPedPrecoListaItem___"+zoom.index).val(PrecoTabela2);
    		$("#itPedPrecoTabelaItem___"+zoom.index).val(PrecoTabela6);
    		$("#itPedPrecoUnitItem___"+zoom.index).val(PrecoUnit);
    		
    		$("#itPedNCMItem___"+zoom.index).val(NCM);
    		$("#itPedFinameItem___"+zoom.index).val(Finame);
    		$("#itPedIPIValorItem___"+zoom.index).val(IPIValor);
    		$("#itPedIPIAliqItem___"+zoom.index).val(IPIAliq);
    		validafunctions.setPercentual("itPedIPIAliqItem___"+zoom.index, 2, false);
    		
    		$("#itPedTotalCustoSemImpItem___"+zoom.index).val(TotalCusto);
    		$("#itPedTotalCustoComImpItem___"+zoom.index).val(TotalCustoComImp);
    		
    		
			funcoes.calculaTotalCusto();
		}
	}

	zoom.index = 0;
}

//MODAL NORMAL AJAX VIA API REST - ASSINCRONO 
var modalzoom = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading(window);
	return {
		//idZoom=Código Identificado do Zoom; dataset=Código do Dataset; fields=Campos que serão exibidos na tela; 
		//resultfields; campos que deverão retornar quando consulta o datset;title=título do modal; 
		//contraints:constraints fixas; searchBy:Campo de busca que estará no modal; labelSearch=Descrição do label de busca; placeholder=Descrição do campo de busca
		open: function(idZoom, dataset, fields, resultfields, title, contraints, searchBy, labelSearch, placeholder) {
			
			var globaldataset = [];
			var showfields = [];
			var current = 0;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;

				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html =  "<div class='fluig-style-guide'>" +
							"<div class='row'>"+
								"<div class='col-md-5 col-xs-12' align='left'>"+
								    "<label for='zoomCustomFieldSearch'>"+labelSearch+"</label>" +
								    "<div class='input-group'>" +
								    	"<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
								    	"<input type='text' class='form-control' id='zoomCustomFieldSearch' placeholder='"+placeholder+"'>" +
								    "</div>" +
							    "</div>" +
	//							    "<br>" +
							    "<div class='col-md-2 col-xs-12' align='right'>"+
							    	"<label >&nbsp;</label>" +
							    	"<button type='button' class='btn btn-primary' id='zoomCustomButtonSearch' style='min-width: 130px;'>Buscar <i class='flaticon flaticon-search icon-sm'></i></button>"+
							    "</div>" +
						    "</div>" +
	
						    "<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
							    "<table class='table table-hover table-zoom'>" +
								    "<thead>" +
								    "</thead>" +
								    "<tbody>" +
								    "</tbody>" +
							    "</table>" +
						    "</div>" +
						"</div>";
			
			var zoommodal = FLUIGC.modal({
								    title: title,
								    content: html,
								    formModal: false,
								    size: 'large',
								    id: 'modal-zoom-large',
								    actions: [{
								        'label': 'Selecionar',
								        'classType': 'btn-primary zoom-selected',
								        'autoClose': true,
								    },{
								        'label': 'Fechar',
								        'autoClose': true
								    }]
									}, function(err, data) {
										if(err) {
											FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
											loading.hide();
									    } else {
											$('#zoomCustomFieldSearch').keyup(function() {
												$('#zoomCustomFieldSearch').val( $('#zoomCustomFieldSearch').val().toUpperCase());
											});
												
											$('#zoomCustomFieldSearch').change(function(){
												let zoomCustomFieldSearch = $('#zoomCustomFieldSearch').val();
												if( zoomCustomFieldSearch.length < 3 ){
													FLUIGC.toast({ title: '', message: 'É preciso digitar no mínimo 3 caracteres do <b>'+labelSearch+'</b>!', type: 'warning' });
												}else{
													loading.show();
													//Limpa a tabela
													clearZoomCustom();
													//Monsta o cabeçalho com os itens que estarão visíveis
													cabecalhoZoomCustom(fields);
													doSearch();
												}
									    	});
											$('#zoomCustomButtonSearch').click(function() {
												
												let zoomCustomFieldSearch = $('#zoomCustomFieldSearch').val();
												if( zoomCustomFieldSearch.length < 3 ){
													FLUIGC.toast({ title: '', message: 'É preciso digitar no mínimo 3 caracteres do <b>'+labelSearch+'</b>!', type: 'warning' });
												}else{
													loading.show();
													//Limpa a tabela
													clearZoomCustom();
													//Monsta o cabeçalho com os itens que estarão visíveis
													cabecalhoZoomCustom(fields);
													doSearch();
												}
											});
											
											$('.zoom-selected').click(function() {
									 			var row = globaldataset[current];
									 			row["type"] = idZoom;
									 			setSelectedZoomCustom(row);
											});
											
											//Limpa a tabela
											var clearZoomCustom = function(){
												$(".table-zoom > thead").html("");
												$(".table-zoom > tbody").html("");
											}
											
											//Monta cabeçalho e itens que serão exibidos
											var cabecalhoZoomCustom = function(lista) {
												showfields = [];
												let listaSplit = lista.split(",");
												let html = "<tr>";
												for (var i=0; i<listaSplit.length; i++) {
													showfields.push(listaSplit[i]);
													html += "<th>" + listaSplit[i+1] + "</th>"
													i++;
												}
												html += "</tr>";
										 		$(".table-zoom > thead").append(html);
											}

											var trimArray = function (fields) {
										    	for(var i=0; i < fields.length; i++){
										    		fields[i] = fields[i].trim();
										    	}
										    	return fields;
										    }
											//Monta a URL de requisição para o dataset
											var urlrequest = function(){
											    var request = "/ecm/api/rest/ecm/dataset/getDatasetZoom",
											    json = {};
											    json.datasetId = dataset;
											    
											    //Inclui o resultfields (que vem por parâmetro no método)
											    if (resultfields != null && resultfields.length > 0 ){
											    	json.resultFields = trimArray(resultfields.split(","));
											    }
											    
											    //Inclui a constraints, mais com o filtro aplicado
											    filterFields = '';
										    	if(contraints != null && contraints.length > 0 ){
										    		if(searchBy != ""){
										    			//Se foi colocado para um filtro a mais, pelo parâmetro searchBy
										    			filterFields = contraints + ','+searchBy+','+$('#zoomCustomFieldSearch').val();
										    		}else{
										    			filterFields = contraints;
										    		}
										    		
										    	}else{
										    		if(searchBy != ""){
										    			filterFields = searchBy+','+$('#zoomCustomFieldSearch').val();
										    		}
										    	}
											    if (filterFields != null && filterFields.length > 0 ){
											        json.filterFields = trimArray(filterFields.split(","));
											    }
						
											    return request +="?json=" + encodeURI(JSON.stringify(json));
											}
											
											//Realiza a busca dos dados
											var doSearch = function() {
										 		let url = urlrequest();
										 		
												$.ajax({
										    		type: "GET",
										    		dataType: "json",
										    		url: url,
										    		data: "",
										    		error: function(XMLHttpRequest, textStatus, errorThrown) {
										    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
										    	    	FLUIGC.toast({
												    		title: '',
												    		message: 'Erro na busca das informações, comunicar Administrado do Sistema!' ,
												    		type: 'danger'
												    	});
										    	    	loading.hide();
													},
										    	    success: function (data, status, xhr) {
										    	    	var records = data["invdata"];
										    	    	readyDataset(records);
										    	    }
												});
											}
											
											//Inclui dados na tabela
											var readyDataset = function(records) {
												globaldataset = records;
												for (var i=0; i<records.length; i++) {
													if( records[i].CODRET == "1"){
														var row = records[i];
														var html = "<tr data-dataset=" + i + ">";
														for (var x=0; x<showfields.length; x++) {
															html += "<td>" + row[showfields[x]] + "</td>";
														}
														html += "</tr>";
														$(".table-zoom > tbody").append(html);
													}else{
														//Como está no foreach, se retornar o codret 2 e somente 1 registro, vai mostrar a msg de nao localido
														//pode ser tbm que nao esteja na tabela de preço
														if(records[i].CODRET == "2" && records.length == 1 ){
															var html = "<tr data-dataset=" + i + ">";
															html += "<td colspan='2' style='text-align:center;'>"+records[i].MSGRET+"</td>";
															html += "</tr>";
															$(".table-zoom > tbody").append(html);
														}else if(records.length == 1){
															var html = "<tr data-dataset=" + i + ">";
															html += "<td colspan='2' style='text-align:center;'>Nenhum registro localizado.</td>";
															html += "</tr>";
															$(".table-zoom > tbody").append(html);
														}
													}
												}
												
												
										 		$(".table-zoom > tbody > tr").click(function() {
										 			$(".table-zoom > tbody > tr").removeClass("active");
										 			$(this).addClass("active");
										 			current = $(this).data("dataset");
										 		});
										 		$(".table-zoom > tbody > tr").dblclick(function() {
										 			var row = globaldataset[$(this).data("dataset")];
										 			if(row !== undefined){
										 				row["type"] = idZoom;
											 			setSelectedZoomCustom(row);
											 			zoommodal.remove();
										 			}
										 		});
						
										 		loading.hide();
											}
											
											
									    }
									});
		}
		
	}
})();

 

