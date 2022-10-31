
$(document).ready(function() {
	setTimeout(function() {
		zoom.start();
	}, 100)
});


//** funcao de apoio para funcoes de calculo e index
var zoom = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {//inicia processo

			eventsZoom.setup();
		},
		
		limpaCampos : function(){
					
			/*
			 * MODELO
			 */
			$('#codModelo').val('');
	    	validafunctions.setMoeda("valUnMotor",2, false , '')
	    	
		}

	}
})();

var eventsZoom = (function() {
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				var ev = $(this).data("event");
			
				if( ev == 'selecionaItemOpc' || ev == 'selecionaItemAcess' ){

					zoom.index = validafunctions.getPosicaoFilho($(this).attr("id"));
				}
				
				if(ev =="selecionaModeloBarco" ){

					var desMotor = $("#desMotor").val();
					if( desMotor != ""){
						var modalconfim = FLUIGC.message.confirm({
						    message: '<b>Atenção!</b> Você já possui dados preenchidos no formulário, caso modifique o modelo,<br>os itens selecionados serão removidos deste formulário.',
						    title: 'Alterar Modelo',
						    labelYes: 'Ok',
						    labelNo: 'Cancelar',
						    autoClose: true,
						}, function(result, el, even) {

							if(result){							
								zooms(ev);
							}
						});
					}else{
						zooms(ev);
					}
				}else{
					
					var codModeloBarco = $('#codModeloBarco').val();
					var estadoCliente = $('#estadoCliente').val();
					
					if(ev == 'selecionaCidadeCliente' && estadoCliente == ""){
						FLUIGC.toast({ title: '', message: 'Favor selecione primeiramente um estado', type: 'warning' });
						
					}else if(codModeloBarco == "" && (ev != 'selecionaPaisCliente' && ev != 'selecionaCidadeCliente' ) ){
						FLUIGC.toast({ title: '', message: 'Favor selecione primeiramente um modelo/padrão', type: 'warning' });
						
					}else{
						zooms(ev);
					}
					
					
				}
				
				
				
			});
			

		}
	}
})();




//FUNCAO PARA SABER O SISTEMA OPERACIONAL MOBILE 
function retornaSO() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    } else if (/android/i.test(userAgent)) {
        return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    } else {
        return "unknown";
    }                
}


function zooms(ev){

		//SE FOR IOS OU PC ELE EXECUTARA ZOOMMODAL USANDO #AJAX API FLUIG 
		//SE FOR ANDROID ELE USARA ZOOMMODAL VIA DATASETFATORY 
		//MOTIVO : PARA FUNCIONAMENTO DE OFFLINE EM SO ANDORID... 
		
		if ( ev ==  'selecionaCidadeCliente' ) {

			var constraintsCidade = "codEstado," +$("#estadoCliente").val() ; 
			modalzoom.open("DSMunicipio", "CC2CODMUN,Código,CC2MUN,Município,CC2EST,Estado", "CC2CODMUN,CC2MUN,CC2EST", "Município", constraintsCidade , 'selecionaCidadeCliente' , "" , "", "" );

		}
		
}


//atribui o valor selecionado do zoom para o campo do formulario
function setSelectedZoomItem(selectedItem) {
	var tipo = selectedItem.type;
	/*
	 * CIDADE
	 */
	if(tipo == "selecionaCidadeCliente"){
		$('#codCidadeCliente').val(selectedItem.CC2CODMUN);
		$('#cidadeCliente').val(selectedItem.CC2MUN);
	}

	zoom.index = 0;
}


//MODAL NORMAL AJAX VIA API REST - ASSINCRONO 
var modalzoom = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading(window);
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {

			//console.log(likefield)
//			console.log(filters)
			loading.show();

			var showfields = [];
			var globaldataset = [];
			var current = 0;
			var tipo = type ;

			var tamModal = "";

			if( tipo == "condpag" ){
				tamModal = "small";
			}else{
				tamModal = "large";
			}

			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;

				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}

			var html = "<body class='fluig-style-guide'>" +
				    "<div class='input-group'>" +
				    "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
				    "<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" +
				    "</div>" +
				    "<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
				    "<table class='table table-hover table-zoom'>" +
				    "<thead>" +
				    "</thead>" +
				    "<tbody>" +
				    "</tbody>" +
				    "</table>" +
				    "</div>" +
				    "</body>";


			var zoommodal = FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: tamModal ,//"large",
			    id: 'modal-zoom-' + type,
			    actions: [{
			        'label': 'Selecionar',
			        'classType': 'btn-success zoom-selected',
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
					var trimarray = function (fields) {
				    	for(var i=0; i < fields.length; i++){
				    		fields[i] = fields[i].trim();
				    	}
				    	return fields;
				    }

					var urlrequest = function(){
					    var request = "/ecm/api/rest/ecm/dataset/",
					        json = {};

					    if (dataset != null) {
					        request += "getDatasetZoom";
					        json.datasetId = dataset;
					    } else if(cardDatasetId != null){
					        request += "getCardDatasetValues";
					        json.cardDatasetId = cardDatasetId;
					    }

					    if (resultfields != null && resultfields.length > 0 ){
					    	json.resultFields = trimarray(resultfields.split(","));
					    }

					    if (filters != null && filters.length > 0 ){
					        json.filterFields = trimarray(filters.split(","));
					    }

					    if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
					        json.likeField = likefield;
					        json.likeValue = likevalue;
					    }

					    var searchValue = $("#search").val();
					    if(searchValue && searchValue.length > 0) {
					    	json.searchValue = searchValue;

					    	if (searchby && searchby != "") {
						        json.searchField = searchby;
					    	} else {
					    		json.searchField = fields.split(",")[0];
					    	}

					    }

					    return request +="?json=" + encodeURI(JSON.stringify(json));
					};

					var searchtable = function (text) {
						var table = $('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true)$(row).show();else $(row).hide();
							}
						});
					}

					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
				 		$(".table-zoom > thead").append(html);
					}

					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";

							}
							html += "</tr>";
					 		$(".table-zoom > tbody").append(html);
						}
				 		$(".table-zoom > tbody > tr").click(function() {
				 			$(".table-zoom > tbody > tr").removeClass("active");
				 			$(this).addClass("active");
				 			current = $(this).data("dataset");
				 		});
				 		$(".table-zoom > tbody > tr").dblclick(function() {
				 			var row = globaldataset[$(this).data("dataset")];
				 			row["type"] = type;
				 			setSelectedZoomItem(row);
				 			zoommodal.remove();
				 		});

				 		loading.hide();
					}

					var dosearch = function() {
				 		var url = urlrequest();
						$(".table-zoom > tbody").html("");

//						console.log("url", url)

				 		//loading.show();

						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		url: url,
				    		data: "",
				    		error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	FLUIGC.toast({
						    		title: '',
						    		message: 'ERROR NA CONSULTA DO DATASET, COMUNICAR ADMINISTRADOR DO SISTEMA!' ,
						    		type: 'danger'
						    	});
				    	    	loading.hide();
							},
				    	    success: function (data, status, xhr) {
//				    	    	console.log("dataset sucess", data, status, xhr)
				    	    	var dataset = data["invdata"];
				    	    	readydataset(dataset);
				    	    }
						});
					}

					var timeout;
			 		$('#search').keyup(function() {
//					$('#search').keypress(function(event) {
			 	    	clearTimeout(timeout);
			 	    	var keycode;
			 	    	if (window.event) {
			 	    		keycode = window.event.keyCode;
			 	    	} else if (event) {
			 	    		keycode = event.which;
			 	    	} else {
			 	    		return true;
			 	    	}
//			 	    	console.log("search", keycode);
			 	    	if (keycode == 13) {
					 		dosearch();
			 	    	} else {
			 	    		timeout = setTimeout(searchtable($(this).val()), 500);
			 	    	}
			 		});

			 		$('.zoom-selected').click(function() {
			 			var row = globaldataset[current];
			 			row["type"] = type;
			 			setSelectedZoomItem(row);
					});

			 		setup(fields);
			 		dosearch();

			    }
			});

		}
	}
})();




//ZOOMMODAL PARA ANDROID - VIA DATASETFACTORY - SINCRONO 
var modalzoom2 = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading(window);
	return {
		open: function(datasetname, fields, title, filters, type) {

			//console.log(likefield)
			console.log(filters)
			loading.show();

			var showfields = [];
			var globaldataset = [];
			var current = 0;
			var tipo = type ;
			var nomedataset = datasetname;

			var tamModal = "";

			if( tipo == "condpag" ){
				tamModal = "small";
			}else{
				tamModal = "large";
			}

			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;

				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}

			var html = "<body class='fluig-style-guide'>" +
				    "<div class='input-group'>" +
				    "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
				    "<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" +
				    "</div>" +
				    "<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
				    "<table class='table table-hover table-zoom'>" +
				    "<thead>" +
				    "</thead>" +
				    "<tbody>" +
				    "</tbody>" +
				    "</table>" +
				    "</div>" +
				    "</body>";


			var zoommodal = FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: tamModal ,//"large",
			    id: 'modal-zoom-' + type,
			    actions: [{
			        'label': 'Selecionar',
			        'classType': 'btn-success zoom-selected',
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

			    	
					var searchtable = function (text) {
						var table = $('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true)$(row).show();else $(row).hide();
							}
						});
					}

					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
				 		$(".table-zoom > thead").append(html);
					}

					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.values.length; i++) {
							var row = dataset.values[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";

							}
							html += "</tr>";
					 		$(".table-zoom > tbody").append(html);
						}
				 		$(".table-zoom > tbody > tr").click(function() {
				 			$(".table-zoom > tbody > tr").removeClass("active");
				 			$(this).addClass("active");
				 			current = $(this).data("dataset");
				 		});
				 		$(".table-zoom > tbody > tr").dblclick(function() {
				 			var row = globaldataset.values[$(this).data("dataset")];
				 			row["type"] = type;
				 			setSelectedZoomItem(row);
				 			zoommodal.remove();
				 		});

				 		loading.hide();
					}


					//chama funcao principal 
					var dosearch = function() {
						$(".table-zoom > tbody").html("");
						var datasetReturned = DatasetFactory.getDataset( nomedataset , null, filters , null , {
						    success: function(datasetReturned) {
										if(datasetReturned != undefined){
											readydataset(datasetReturned);
										}else{
											FLUIGC.toast({
									    		title: '',
									    		message: 'Consulta nao contem itens..' ,
									    		type: 'alert'
									    	});
							    	    	loading.hide();
										}
									} 
							, error: function(jqXHR, textStatus, errorThrown) {
										FLUIGC.toast({
								    		title: '',
								    		message: 'ERROR AO CONSULTAR DATASET!' ,
								    		type: 'danger'
								    	});
						    	    	loading.hide();

									}
							}
						);
						
						
						
					}

					var timeout;
			 		$('#search').keyup(function() {
			 	    	clearTimeout(timeout);
			 	    	var keycode;
			 	    	if (window.event) {
			 	    		keycode = window.event.keyCode;
			 	    	} else if (event) {
			 	    		keycode = event.which;
			 	    	} else {
			 	    		return true;
			 	    	}
			 	    	console.log("search", keycode);
			 	    	if (keycode == 13) {
					 		dosearch();
			 	    	} else {
			 	    		timeout = setTimeout(searchtable($(this).val()), 500);
			 	    	}
			 		});

			 		$('.zoom-selected').click(function() {
			 			var row = globaldataset.values[current];
			 			row["type"] = type;
			 			setSelectedZoomItem(row);
					});
			 		
			 		//executa a magia 
			    	setup(fields);
			 		dosearch();


			 
			    }
			});

		}
	}
})();

