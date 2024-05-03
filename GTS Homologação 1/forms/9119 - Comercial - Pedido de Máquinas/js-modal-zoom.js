$(document).ready(function() {
	setTimeout(function() {
		modalZoom.start();
	}, 100)
});

var modalZoom = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsModalZoom.setup();
		}
	}
})();

var eventsModalZoom = (function() {
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				var ev = $(this).data("event");
				
				if( ev == 'selecionaMaquina' ){
					
					modalZoom.index = validafunctions.getPosicaoFilho($(this).attr("id"));
					
					let html =  "<div class='fluig-style-guide'>" +
									"<div class='row'>"+
										"<div class='col-md-5 col-xs-9' align='left'>"+
										    "<label for='conCodMaquina'>Código da Máquina</label>" +
										    "<div class='input-group'>" +
										    	"<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
										    	"<input type='text' class='form-control' id='conCodMaquina' placeholder='Digite no mínimo 3 caracteres'>" +
										    "</div>" +
									    "</div>" +
									    "<div class='col-md-1 col-xs-3' align='right'>"+
									    	"<label >&nbsp;</label>" +
									    	"<button type='button' class='btn btn-primary' id='zoomSearch'>Buscar";
									    	if(isMobile == 'false'){
									    		html += " <i class='flaticon flaticon-search icon-sm'></i>";
									    	}
							    	html +=	"</button>"+
									    "</div>" +
								    "</div>";
								    if(isMobile == 'true'){
								    	html += "<br>";
								    }
								    html += "<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
									    "<table class='table table-hover table-zoom'>" +
										    "<thead>" +
										    "</thead>" +
										    "<tbody>" +
										    "</tbody>" +
									    "</table>" +
								    "</div>" +
								"</div>";
					
					const tabPreco = ( $("#tabPreco").val() == '' ? 'PADRAO' : $("#tabPreco").val());
					const porcDesconto = validafunctions.getFloatValue("itPedPorcDescontoItem___"+modalZoom.index);
					
					const fnConstraintsDataset = function(){
						return [
          	                   	{
							    	"_field": "PROCOD",
							    	"_initialValue": $('#conCodMaquina').val().trim(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "PROPORCDESC",
							    	"_initialValue": porcDesconto,
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "TABPRECO",
							    	"_initialValue": tabPreco,
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    }
							  ];
					}
					
					const fnValidaFiltrosPesquisa = function(){
						let message = "";
					    let hasErros = false;
					    
					    if( $('#conCodMaquina').val().trim().length < 3 ){
					    	message = "É preciso digitar no mínimo 3 caracteres do 'Código da Máquina'!";
					    	hasErros = true;
					    }
					    if (hasErros) {
					    	if(isMobile == 'true'){
					    		alert(message);
					    	}else{
					    		FLUIGC.toast({message: message, type: 'warning'});
					    	}
					    	return false;
					    }
						return true;
					}
					
					const fnOnload = function(){
			        }
					
					const fnRegistroSelecionado = function(linhaSelecionada){
						
    					linhaSelecionada["type"] = "selecionaMaquina";
			 			setSelectedModalZoom(linhaSelecionada);
			 			return true;
					}
					
					var fnGatilhoExclusivo = function(){
						$('#conCodMaquina').keyup(function() {
							$('#conCodMaquina').val( $('#conCodMaquina').val().toUpperCase());
						});
					}
					
					var fnValidaCampoChange = function(){
						let conCodMaquina = $('#conCodMaquina').val().trim();
						if( conCodMaquina.length < 3 ){
							FLUIGC.toast({ title: '', message: 'É preciso digitar no mínimo 3 caracteres do <b>Código da Máquina</b>!', type: 'warning' });
							return false;
						}
						return true;
					}
					
					const paramsSelecionaMaquina = {
							'id': 'modal-zoom-item-maquina',
							'size': 'large',
							'titulo': 'Consulta de Máquina',
							'html' : html,
							'dataset' : 'dsPedMaqConsultaProduto',
						    'colunas' : [{
											'cabecalho':'Cód. Item',
											'campoDataset':'PROCOD',
										},{
											'cabecalho':'Descrição',
											'campoDataset':'PRODESC',
										}],
							'camposChangePesquisaDados' : [{
												'idCampoChange' : 'conCodMaquina',
												'fnValidaCampoChange' : fnValidaCampoChange,
											  }],
							'fnConstraintsDataset' : fnConstraintsDataset,
							'fnValidaFiltrosPesquisa' : fnValidaFiltrosPesquisa,
							'fnGatilhoExclusivo' : fnGatilhoExclusivo,
							'fnOnload' : fnOnload,
							'fnRegistroSelecionado' : fnRegistroSelecionado,
					}
					
					fnModalZoom(paramsSelecionaMaquina);
					
				}else if( ev == 'selecionaMaquinaReservada'){
					
					let htmlMinhasPreReservas = '';
					if(isMobile == 'true'){
						htmlMinhasPreReservas = "<div id='divMinhasPreReservasWeb' class='col-md-2 col-xs-12' align='center' >"+
													"<div class='custom-checkbox custom-checkbox-inline custom-checkbox-primary'>"+
														"<input type='checkbox' id='conMinhasPreReservas' value='minhasPreReservas' style='width:100%; height: 30px; display: block;' >"+
														"<label for='conMinhasPreReservas' style='font-weight: bold;'>Minhas Pré-Reservas</label>"+
													"</div>"+
												"</div>";
					}else{
						htmlMinhasPreReservas = "<div id='divMinhasPreReservasWeb' class='col-md-2 col-xs-12' align='right' >"+
													"<label for='conMinhasPreReservas' >"+
														"Minhas Pré-Reservas"+
														"<input type='checkbox' id='conMinhasPreReservas' value='minhasPreReservas' style='width:100%; height: 30px; display: block;' >"+
													"</label>"+
												"</div>";
					}

					let html = "<div class='fluig-style-guide'>" +
									"<div class='row'>"+
										htmlMinhasPreReservas +
										"<div class='col-md-2 col-xs-12' >"+   
				                             "<label for='conFamilia'>Família</label>"+                                   
				                             "<select class='form-control' name='conFamilia' id='conFamilia' >"+
				                                  "<option value=''></option>"+
				                                  "<option value='PM'>PM - Plataforma de Milho</option>"+
				                                  "<option value='IH'>IH - Plataforma de Milho</option>"+
				                                  "<option value='PC'>PC - Plataforma de Cereal</option>"+
				                                  "<option value='CG'>CG - Carreta Graneleira</option>"+
				                                  "<option value='DC'>DC - Decompactador</option>"+
				                                  "<option value='CS'>CS - Corretor de Solo</option>"+
				                                  "<option value='NT'>NT - Nivelador Triturador</option>"+
				                                  "<option value='PN'>PN - Plainas</option>"+
				                                  "<option value='SM'>SM - Semeadora</option>"+
				                             "</select>"+
					                   	"</div>"+
										"<div class='col-md-2 col-xs-7' align='left'>"+
											"<label for='conCodMaquina'>Modelo</label>" +
											"<input type='text' name='conCodModelo' id='conCodModelo' class='form-control' maxlength='50'>"+
									    "</div>" +
									    "<div class='col-md-1 col-xs-5' align='left'>"+
											"<label for='conEstoque'>Estoque</label>" +
											"<select class='form-control' name='conEstoque' id='conEstoque'>" +
					                              "<option value=''></option>" +
					                              "<option value='SIM'>Sim</option>" +
					                              "<option value='NAO'>Não</option> " +                                                    
					                         "</select>" +
									    "</div>" +
									    "<div class='col-md-3 col-xs-12' align='left'>" +
											"<div class='form-group'>"+
												"<label for='conPrazoEntrega'>Prazo Entrega (Mês/Ano)</label>" +
												"<div class='row'>" +
												    "<div class='col-md-5 col-xs-7' align='left'>" +
														"<select class='form-control' name='conPrazoEntregaMes' id='conPrazoEntregaMes'>" +
							                                  "<option value=''></option>" +
							                                  "<option value='01'>Janeiro</option>" +
							                                  "<option value='02'>Fevereiro</option>" +                                          
							                                  "<option value='03'>Março</option>" +                                                  
							                                  "<option value='04'>Abril</option>" +                                                  
							                                  "<option value='05'>Maio</option>" +                                                  
							                                  "<option value='06'>Junho</option>" +                                                  
							                                  "<option value='07'>Julho</option>" +                                                  
							                                  "<option value='08'>Agosto</option>" +                                                  
							                                  "<option value='09'>Setembro</option>" +                                                  
							                                  "<option value='10'>Outubro</option>" +                                                  
							                                  "<option value='11'>Novembro</option>" +                                                  
							                                  "<option value='12'>Dezembro</option>" +                                                  
							                             "</select>" +   
						                         	"</div>" +
						                         	"<div class='col-md-4 col-xs-5' align='left'>" +   
														"<select class='form-control' name='conPrazoEntregaAno' id='conPrazoEntregaAno'>" +   
							                                  "<option value=''></option>" +   
							                             "</select>" +   
													"</div>" +   
					                         	"</div>" +   
					                     	"</div>" +   
					                 	"</div>" +   
									    "<div class='col-md-1 col-xs-12' align='right'>"+
									    	"<label >&nbsp;</label>" +
									    	"<button type='button' class='btn btn-primary' id='zoomSearch' style='min-width: 130px;'>Buscar";
											if(isMobile == 'false'){
									    		html += " <i class='flaticon flaticon-search icon-sm'></i>";
									    	}
							    	html +=	"</button>"+
									    "</div>" +
								   "</div>";
								   if(isMobile == 'true'){
								    	html += "<br>";
								   }
						  html +=  "<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
									    "<table class='table table-hover table-zoom'>" +
										    "<thead>" +
										    "</thead>" +
										    "<tbody>" +
										    "</tbody>" +
									    "</table>" +
								    "</div>" +
							    "</div>";
					
					const fnConstraintsDataset = function(){
						return [
          	                   	{
							    	"_field": "matricula",
							    	"_initialValue": getWKUser(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "tipoUsuario",
							    	"_initialValue": $('#solTipoSolicitante').val(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "conFamilia",
							    	"_initialValue": $('#conFamilia').val(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "conCodModelo",
							    	"_initialValue": $('#conCodModelo').val(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "conEstoque",
							    	"_initialValue": $('#conEstoque').val(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "conPrazoEntregaMes",
							    	"_initialValue": $('#conPrazoEntregaMes').val(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "conPrazoEntregaAno",
							    	"_initialValue": $('#conPrazoEntregaAno').val(),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    },{
							    	"_field": "conMinhasPreReservas",
							    	"_initialValue": ($('#conMinhasPreReservas').prop('checked') ? 'S' : ''),
							    	"_finalValue": "",
							    	"_type": 1,
							    	"_likeSearch": false
							    }
							  ];
					}
					
					const fnValidaFiltrosPesquisa = function(){
						
						const constraintsConsultaMaquinas = fnConstraintsDataset();
						let message = "";
					    let hasErros = false;
						
						let contConstraints = 0;
						for( var index in constraintsConsultaMaquinas) {
					    	if( constraintsConsultaMaquinas[index]._initialValue != "" 
					    		&& (constraintsConsultaMaquinas[index]._field != "matricula" && constraintsConsultaMaquinas[index]._field != "tipoUsuario") ){
					    		contConstraints++;
					    	}
						}
						if ( ($('#conPrazoEntregaMes').val().trim() != '' && $('#conPrazoEntregaAno').val().trim() == '') ||
									($('#conPrazoEntregaMes').val().trim() == '' && $('#conPrazoEntregaAno').val().trim() != '') ) {
									hasErros = true;
									message = "É preciso selecionar o 'Mês' e 'Ano' para filtrar pelo 'Prazo de Entrega'!";
						}
					    if (hasErros) {
					    	if(isMobile == 'true'){
					    		alert(message);
					    	}else{
					    		FLUIGC.toast({message: message, type: 'warning'});
					    	}
					    	return false;
					    }
						return true;
					}
					
					const fnOnload = function(){
			        	const diaHoje = new Date();
			        	let ano = diaHoje.getFullYear();
			        	let proximoAno = ano + 1;
			        	
			            $("#conPrazoEntregaAno").append("<option value='" +  ano + "'>" +  ano + "</option>");
			            $("#conPrazoEntregaAno").append("<option value='" +  proximoAno + "'>" +  proximoAno + "</option>");
			        }
					
					const fnRegistroSelecionado = function(linhaSelecionada){
						if(  linhaSelecionada["STATUS"] == 'DISPONIVEL' ||
						( linhaSelecionada["STATUS"] == 'PRE-RESERVA' && linhaSelecionada["WKUSER_RESERVADOPOR"].trim() == getWKUser() ) ){
							//Se estiver disponível ou Pré-Reservado para este usuário, deixa selecionar
							linhaSelecionada["type"] = "selecionaMaquinaReservada";
							setSelectedModalZoom(linhaSelecionada);
							return true;
						}else{
							if(isMobile == 'true'){
								alert('Esta máquina não está disponível para ser reservada para o seu usuário!');
							}else{
								FLUIGC.toast({message: 'Esta máquina não está disponível para ser reservada para o seu usuário!', type: 'warning'});
							}
							return false;
						}
					}
					
					var fnGatilhoExclusivo = function(){
						$('#conEstoque').change(function() {
							if($('#conEstoque').val() == "SIM"){
								$('#conPrazoEntregaMes').val('');
								$('#conPrazoEntregaAno').val('');
								$('#conPrazoEntregaMes').prop('disabled', true);
								$('#conPrazoEntregaAno').prop('disabled', true);
							}else{
								$('#conPrazoEntregaMes').prop('disabled', false);
								$('#conPrazoEntregaAno').prop('disabled', false);
							}
						});
					}
					
					var fnValidaCampoChange = function(){
					}
					
					const paramsMaquinaReservada = {
							'id': 'modal-zoom-reserva-maquina',
							'size': 'full',
							'titulo': 'Reserva de Máquina',
							'html' : html,
							'dataset' : 'dsPedMaqConsultaMaquinasParaReserva',
						    'colunas' : [{
											'cabecalho':'Cod. Pedido',
											'campoDataset':'COD_PEDIDO',
										},{
											'cabecalho':'Cod. Produto',
											'campoDataset':'COD_PRODUTOV',
										},{
											'cabecalho':'Família',
											'campoDataset':'DESC_FAMILIA',
										},{
											'cabecalho':'Modelo',
											'campoDataset':'MODELO',
										},{
											'cabecalho':'Máquina',
											'campoDataset':'DESCRICAO_MAQUINA',
										},{
											'cabecalho':'Estoque?',
											'campoDataset':'ESTOQUE',
										},{
											'cabecalho':'Prazo de Entrega',
											'campoDataset':'PRAZO_ENTREGA',
										},{
											'cabecalho':'Status',
											'campoDataset':'STATUS',
										}],
							'camposChangePesquisaDados' : [],			
							'fnConstraintsDataset' : fnConstraintsDataset,
							'fnValidaFiltrosPesquisa' : fnValidaFiltrosPesquisa,
							'fnGatilhoExclusivo' : fnGatilhoExclusivo,
							'fnOnload' : fnOnload,
							'fnRegistroSelecionado' : fnRegistroSelecionado,
					}
					
					fnModalZoom(paramsMaquinaReservada);
				}
				
			});

		}
	}
})();

function setSelectedModalZoom(selectedItem){
	
	if(selectedItem.type == "selecionaMaquina"){
		
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
		
		$("#itPedFilialItem___"+modalZoom.index).val(FilialItem);
		$('#itPedCodItemItem___' + modalZoom.index).val(CodigoItem);
		$("#itPedDescricaoItemItem___"+modalZoom.index).val(DescricaoItem);
		
		$("#itPedPrecoListaItem___"+modalZoom.index).val(PrecoTabela2);
		$("#itPedPrecoTabelaItem___"+modalZoom.index).val(PrecoTabela6);
		$("#itPedPrecoUnitItem___"+modalZoom.index).val(PrecoUnit);
		
		$("#itPedNCMItem___"+modalZoom.index).val(NCM);
		$("#itPedFinameItem___"+modalZoom.index).val(Finame);
		$("#itPedIPIValorItem___"+modalZoom.index).val(IPIValor);
		$("#itPedIPIAliqItem___"+modalZoom.index).val(IPIAliq);
		validafunctions.setPercentual("itPedIPIAliqItem___"+modalZoom.index, 2, false);
		
		$("#itPedTotalCustoSemImpItem___"+modalZoom.index).val(TotalCusto);
		$("#itPedTotalCustoComImpItem___"+modalZoom.index).val(TotalCustoComImp);
		
		
		funcoes.calculaTotalCusto();
		
	}else if(selectedItem.type == "selecionaMaquinaReservada"){
		$('#pedMaqResDesc').val(selectedItem.DESCRICAO_MAQUINA);
		$('#pedMaqResModelo').val(selectedItem.MODELO);
		$('#pedMaqResEstoque').val(selectedItem.ESTOQUE);
		$('#pedMaqResPrazoEnt').val(selectedItem.PRAZO_ENTREGA);
		$('#pedMaqResFilialPedidoTotvs').val(selectedItem.FILIAL_PEDIDO);
		$('#pedMaqResNumPedidoTotvs').val(selectedItem.COD_PEDIDO);
		
		//Consulta o Produto
		$('#divMaquinaReservadaRemove').show();
		$('#divMaquinaReservadaDesc').removeClass('col-md-offset-1');
		if(selectedItem.COD_PRODUTOV.trim() != ''){
			$('#itPedCodItemItem___1').val(selectedItem.COD_PRODUTOV);
			funcoes.consultaProduto('1', 'MaquinaReservada');
		}
	}
	
}

function fnModalZoom(params){
	
	let loading = FLUIGC.loading(window);
	let registrosGlobais = [];
	let indexLinhaSelecionada = '';
	
	const fluigcModalZoom = FLUIGC.modal({
	    title: params.titulo,
	    content: params.html,
	    formModal: false,
	    size: params.size,
	    id: params.id,
	    actions: [{
			        'label': 'Selecionar',
			        'classType': 'btn-primary modal-zoom-selected',
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
		    	
				function limpaTabela(){
					$(".table-zoom > thead").html("");
					$(".table-zoom > tbody").html("");
				}
				
		    	function cabecalhoTabela() {
					let html = "<tr>";
						$.each( params.colunas, function( index, value ) {
							html += `<th>${value.cabecalho}</th>`;	
						})
						html += "</tr>";
			 		$(".table-zoom > thead").append(html);
				}
		    	
		    	function pesquisaDados(){
		    		if(!params.fnValidaFiltrosPesquisa()){
		    			limpaTabela();
			 			return;
			 		}
		    		
		    		loading.show();
		    		const dataRequest = {
		    				"name": params.dataset,
		    				"fields": [] ,
		    				"constraints": params.fnConstraintsDataset(),
		    				"order": []
		    		}
		    		
		    		$.ajax({
		    			async: true,
		    			url: '/api/public/ecm/dataset/datasets',
		    			type: 'POST',
		    			data: JSON.stringify(dataRequest),
		    			contentType: 'application/json',
		    			success: function (data, status, xhr) {
	    					if (data != null && data.content != null && data.content.values.length > 0) {	
	    						registrosGlobais = data.content.values;
								
								if(registrosGlobais[0].CODRET.trim() == '1'){
									cabecalhoTabela();
								}

	    			    		for( var index in registrosGlobais) {
	    			    			const record = registrosGlobais[index];
	    				            if(record.CODRET.trim() == '1'){
										let html = `<tr data-dataset=${index} >`;
										$.each( params.colunas, function( index, value ) {
											html += `<td>${record[value.campoDataset]}</td>`;	
										})
										html += "</tr>";
										$(".table-zoom > tbody").append(html);
	    				            }else{
	    				            	//Como está no foreach, se retornar o codret 2 e somente 1 registro, vai mostrar a msg de nao localido
										//pode ser tbm que nao esteja na tabela de preço
										if(record.CODRET == "2" && registrosGlobais.length == 1 ){
											limpaTabela();
											var html = "<tr data-dataset=" + i + ">";
											html += "<td style='text-align:center;'>"+record.MSGRET+"</td>";
											html += "</tr>";
											$(".table-zoom > tbody").append(html);
										}else if(registrosGlobais.length == 1){
											limpaTabela();
											var html = "<tr data-dataset=" + i + ">";
											html += "<td style='text-align:center;'>Nenhum registro localizado.</td>";
											html += "</tr>";
											$(".table-zoom > tbody").append(html);
										}
	    				            }
	    			    		}
	    			    		
	    			    		$(".table-zoom > tbody > tr").click(function() {
						 			$(".table-zoom > tbody > tr").removeClass("active");
						 			$(this).addClass("active");
						 			indexLinhaSelecionada = $(this).data("dataset");
						 		});
	    			    		
	    			    		$(".table-zoom > tbody > tr").dblclick(function() {
	    			    			const linhaSelecionada = registrosGlobais[$(this).data("dataset")];
	    			    			if(linhaSelecionada !== undefined){
	    			    				
	    			    				const retornofnRegistroSelecionado = params.fnRegistroSelecionado(linhaSelecionada);
	    			    				if(retornofnRegistroSelecionado){
	    			    					fluigcModalZoom.remove();
	    			    				}else{
	    			    					return false;
	    			    				}
	    			    			}
						 		});
	    					}
		    				
		    				setTimeout(function(){ 
			    	    		loading.hide();
			    	    	}, 1000);
			    	    },
			    	    error: function(XMLHttpRequest, textStatus, errorThrown) {
			    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown);
			    	    	FLUIGC.toast({message: 'Erro na busca das informações, comunicar Administrado do Sistema!', type: 'danger'});
			    	    	setTimeout(function(){ 
			    	    		loading.hide();
			    	    	}, 1000);
						},
		    		});
		    	}
		    	
		    	$('#zoomSearch').click(function() {
					limpaTabela();
					pesquisaDados();
				});
		    	
		    	$('.modal-zoom-selected').click(function() {
		    		if(indexLinhaSelecionada === ''){
		    			if(isMobile == 'true'){
		    				alert("Nenhum registro selecionado!")
		    			}else{
		    				FLUIGC.toast({message: 'Nenhum registro selecionado!', type: 'warning'});
		    			}
		    			return false;
		    		}else{
		    			const linhaSelecionada = registrosGlobais[indexLinhaSelecionada];
		    			if(linhaSelecionada !== undefined){
		    				
		    				const retornofnRegistroSelecionado = params.fnRegistroSelecionado(linhaSelecionada);
		    				if(retornofnRegistroSelecionado){
		    					fluigcModalZoom.remove();
		    				}else{
		    					return false;
		    				}
		    			}
		    		}
				});
		    	
		    	$.each( params.camposChangePesquisaDados, function( index, value ) {
		    		$('#'+params.camposChangePesquisaDados[index].idCampoChange).change(function(){
			    		if( params.camposChangePesquisaDados[index].fnValidaCampoChange() ){
			    			limpaTabela();
							pesquisaDados();
			    		}else{
			    			limpaTabela();
			    		}
			    	});
				})
		    	
		    	params.fnGatilhoExclusivo();
		    	params.fnOnload();
		    }
	});
}