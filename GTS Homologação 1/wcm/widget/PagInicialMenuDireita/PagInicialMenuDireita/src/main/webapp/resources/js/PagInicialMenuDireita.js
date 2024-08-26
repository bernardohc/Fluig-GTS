var PagInicialMenuDireita = SuperWidget.extend({

	flRevendaPeca : false,
	flGerentePeca: false,

    init: function() {
    	
    	const companyId = WCMAPI.organizationId;
    	const matricula = WCMAPI.userCode;
    	let definiuMenu = false;

    	//Papel
    	var constRoleCompanyId = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', companyId, companyId, ConstraintType.MUST);
    	var constRoleColleagueId = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', matricula, matricula, ConstraintType.MUST);
		var constColleagueRole = new Array(constRoleCompanyId, constRoleColleagueId)
    	var dsWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, constColleagueRole, null);

		
		if(dsTemValor(dsWorkflowColleagueRole)){
	        var records = dsWorkflowColleagueRole.values;
	        for ( var index in records) {
	            let record = records[index];         

	            /*
	             * Peças
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000030'){
	            	//Peças - Consulta Produto com Preço de Tabela
					definiuMenu = true;
	            	$('#divPecas').show();
	            	$('#000030').show();
	            }
	            
	            /*
	             * Máquina
	             */
	            if(record['workflowColleagueRolePK.roleId'] == 'cadastraPedidoDeMaquina'){
	            	//Comercial - Pedido de Máquina
	            	definiuMenu = true;
					$('#divMaquina').show();
	            	$('#cadPedidoMaquina').show();
	            	$('#conPedidoMaquina').show();
	            }
	            
	            /*
	             * Entrega Técnica
	             */
            	if(record['workflowColleagueRolePK.roleId'] == '000031' && !WCMAPI.isMobileAppMode() ){
	            	//Entrega Técnica - Cadastra Processo Entrega Técnica - Administrativo GTS
	            	definiuMenu = true;
					$('#divPosVenda').show();
	            	$('#cadastraEntregaTecnica').show();
	            	$('#checklistEntregaTecnica').show();
	            }
	            
	            
	            /*
	             * Frota
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000002'){
	            	//Cadastra Processo - Frota Checklist
	            	definiuMenu = true;
					$('#divFrota').show();
	            	$('#000002').show();
	            	
	            }
	            if(record['workflowColleagueRolePK.roleId'] == '000004'){
	            	//Cadastra Processo - Frota Abastecimento
	            	definiuMenu = true;
					$('#divFrota').show();
	            	$('#000004').show();
	            	
	            }
	            /*
	             * Relatório de Viagem
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000024'){
	            	//Cadastra Processo - Contas a Pagar - Relatório de Viagens
	            	definiuMenu = true;
					$('#divRelatorioViagens').show();
	            	$('#000024').show();
	            }
	            /*
	             * SAC
	             */
	            if(record['workflowColleagueRolePK.roleId'] == '000027' && !WCMAPI.isMobileAppMode() ){
	            	//SAC - Cadastra SAC
	            	definiuMenu = true;
					$('#divSAC').show();
	            	$('#000027').show();
	            }
	            if(record['workflowColleagueRolePK.roleId'] == '000028' && !WCMAPI.isMobileAppMode()  ){
	            	//SAC - Consulta SAC
	            	definiuMenu = true;
					$('#divSAC').show();
	            	$('#000028').show();
	            }
	        }
		}
		
		
		
		//Grupo
		var constGroupCompanyId = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST);
		var constGroupColleagueId = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);
		var constColleagueGroup = new Array(constGroupCompanyId, constGroupColleagueId);
		var dsColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, constColleagueGroup, null);

		if(dsTemValor(dsColleagueGroup)){
			var records = dsColleagueGroup.values;
	        for ( var index in records) {
	            let record = records[index];

				/*
	             * Peças
	             */
				if(record['colleagueGroupPK.groupId'] == '000009'){
	            	//Pós-Venda - Consulta classificação de revenda
					definiuMenu = true;
	            	$('#divClassificacao').show();
	            	$('#000009').show();
	            }
	            
	            /*
	             * Peça
	             */
	            if(record['colleagueGroupPK.groupId'] == 'revenda' ){
	            	//Revenda
	            	definiuMenu = true;
					this.flRevendaPeca = true;
					$('#divPecas').show();
	            	$('#conProdutoPeca').show();
	            	$('#cadPedidoPeca').show();
	            	$('#conPedidoPeca').show();
	            	$('#reanalisePreco').show();
	            	$('#divergenciaPeca').show();
	            }
	            if(record['colleagueGroupPK.groupId'] == 'revendaEXUSA' ){
	            	//Revenda Exportação USA
	            	definiuMenu = true;
					$('#divPecasUSA').show();
	            	$('#conProdutoPecaUSA').show();
	            	$('#cadPedidoPecaUSA').show();
	            }
	            /*
	             * Máquina
	             */
	            if(record['colleagueGroupPK.groupId'] == '000038'){
	            	//Comercial - Pedido de Máquina
	            	definiuMenu = true;
					$('#divMaquina').show();
	            	$('#reservaMaquina').show();
	            }
	            /*
	             * Entrega Técnica
	             */
	            if(record['colleagueGroupPK.groupId'] == '000009' && !WCMAPI.isMobileAppMode() ){
	            	//Entrega Técnica - Revenda
	            	definiuMenu = true;
					$('#divPosVenda').show();
	            	$('#cadastraEntregaTecnica').show();
	            	$('#checklistEntregaTecnica').show();
	            	$('#transferenciaEquipamento').show();
	            }
				if(record['colleagueGroupPK.groupId'] == '000009'){
					definiuMenu = true;
					//Pós-Venda - Chamado de Atendimento - Revenda (pode ser aberto pelo mobile)
					$('#divPosVenda').show();
					$('#chamadoDeAtendimento').show();
					$('#politicaPosVenda').show();
				}
	            if(record['colleagueGroupPK.groupId'] == '000020' ){
	            	//Pós-Venda - Complemento de OS
	            	definiuMenu = true;
					$('#divPosVenda').show();
	            	$('#000020').show();
	            }
				if(record['colleagueGroupPK.groupId'] == '000045' ){
	            	//Pós-Venda - Chamado de Atendimento - Colaborador GTS
	            	definiuMenu = true;
					$('#divPosVenda').show();
	            	$('#chamadoDeAtendimento').show();
	            }
				if(record['colleagueGroupPK.groupId'] == '000046' ){
					//Pós-Venda - Pesquisa de Satisfação
	            	definiuMenu = true;
					$('#divPosVenda').show();
	            	$('#000046').show();
	            	$('#pesqOS').show();
				}
				/*
	             * Frota
	             */
				if(record['colleagueGroupPK.groupId'] == '000039' ){
					//Cadastra Processo - Frota Solicitação de Veículo
	            	definiuMenu = true;
					$('#divFrota').show();
					$('#000039').show();
				}
	            /*
	             * PCP
	             */
	            if(record['colleagueGroupPK.groupId'] == '000022' ){
	            	//Cancelamento Comercial
	            	definiuMenu = true;
					$('#divPCP').show();
	            	$('#000022').show();
	            }
	            //Solicitação de Antecipação
	            if(record['colleagueGroupPK.groupId'] == '000023' ){
	            	definiuMenu = true;
					$('#divPCP').show();
	            	$('#000023').show();
	            }
	            //Alteração de Maquinas
	            if(record['colleagueGroupPK.groupId'] == '000021' ){
	            	definiuMenu = true;
					$('#divPCP').show();
	            	$('#000021').show();
	            }
	            //Solicitação de Peças
	            if(record['colleagueGroupPK.groupId'] == '000011' ){
	            	definiuMenu = true;
					$('#divPCP').show();
	            	$('#000011').show();
	            }

	            //Qualidade SGQ
	            if(record['colleagueGroupPK.groupId'] == '000054' ){
	            	definiuMenu = true;
					$('#divQualidade').show();
	            	$('#000054').show();
	            }
	        }
		        
		}
		
		if(this.flRevendaPeca){
			//Se estiver no Grupo 'revenda' e o dados adiciona A1_TIPO for gerente, mostra o icone 'Lista de Preço'
			var dsClienteViaDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
			if(dsTemValor(dsClienteViaDadosAdicionais)){
				const record = dsClienteViaDadosAdicionais.values[0];
				if(record.A1_TIPO.trim() == 'GERENTE'){
					this.flGerentePeca = true;
					$('#listaDePreco').show();
				}
			}
		}

		if(!definiuMenu){
			$('#divImgDefault').show();
		}

		//Pega os dados adicionais
		$.ajax({
			url: '/api/public/2.0/users/getCurrent', 
			type: "GET",
		}).done(function(data) {
			var user_fluig     = data;
			var codCli        = user_fluig.content.extData.A1_COD;
			var lojaCli       = user_fluig.content.extData.A1_LOJA;
			$('#codRev').val(codCli);
			$('#lojaRev').val(lojaCli);
			
			//Dataset de consulta da classificação da revenda
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				//url: "/api/public/ecm/dataset/search?datasetId=dsMenuConsultaClassRevenda&filterFields=codCli,022625036,lojaCli,0001",
				url: "/api/public/ecm/dataset/search?datasetId=dsMenuConsultaClassRevenda&filterFields=codCli,"+codCli+",lojaCli,"+lojaCli,
				
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							var calassificacaoRev = record.CLASSREV;

							if(calassificacaoRev == 'O'){
								$("#classRev").text('Ouro');
							}if(calassificacaoRev == 'P'){
								$("#classRev").text('Prata');
							}if(calassificacaoRev == 'B'){
								$("#classRev").text('Bronze');
							}if(calassificacaoRev == 'D'){
								$("#classRev").text('Premium Dealer');
							}if(calassificacaoRev == ''){
								$("#classRev").text('Não Classificada');
							}
							//$("#classificacaoRev").val(calassificacaoRev);
							
						}
						else if (records[0].CODRET == "2"){
							//FLUIGC.toast({ title: '', message: records[0].CMSG, type: 'warning' });
							console.log(records[0].CMSG);
						}
						
					}
					else{
							FLUIGC.toast({ title: '', message: 'Erro ao consultar revenda, comunicar o Administrador do Sistema!', type: 'danger' });
						}
					setTimeout(function(){ 
						//loading.hide();
					}, 1000);
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'Erro na consulta do revenda, comunicar Administrador do Sistema' ,
						type: 'danger'
					});
					//loading.hide();
				}
			});
			
		});		

    },
  
    //BIND de eventos
    bindings: {
        local: {
            'lista_de_preco': ['click_listaDePreco'],
            'checklist_entrega_tecnica': ['click_checklistEntregaTecnica'],
        },
        global: {}
    },	
	
	listaDePreco: function(){
		
		if(this.flGerentePeca){

			var html =  `<div class='fluig-style-guide'>
							<div class='row'>
								<div class='col-md-12' >
								    <p>A lista contém os valores da tabela base de preços.<br>
									Deve ser aplicado sobre a mesma seu respectivo desconto, impostos e frete para gerar o custo total do item.<br>
									Após isso, a revenda deve parametrizar seu sistema adicionando a margem desejada.</p>
							    </div>
							</div>
							<div class='row'>
							    <div class='col-md-2' >
							    	<button type=button class='btn btn-primary' id='btnDownloadListaPreco' >Download Lista de Preço</button>
							    </div>
						    </div>
						</div>`;


			const modalListaPreco = FLUIGC.modal({
				title: "",
				content: html,
				formModal: false,
				size: "large",
				id: "modal-zoom-large",
				actions: [{
					"label": "Fechar",
					"autoClose": true
						}]
				}, 
				function(err, data) {
									
					$("#btnDownloadListaPreco").click(function() {
						
						var myLoading = FLUIGC.loading(window);
						myLoading.show();
					
						var dataRequest = {
								"name": "dsOrcPedConsultaProdutos",
								"fields": [] ,
								"constraints": [],
								"order": []
						}
									
						$.ajax({
							async: true,
							type: "POST",
							url: "/api/public/ecm/dataset/datasets",
							data: JSON.stringify(dataRequest),
							contentType: 'application/json',
							success: function (data, status, xhr) {
								if (data != null && data.content != null && data.content.values.length > 0) {
									const records = data.content.values;

									//Ver mais em: https://redstapler.co/sheetjs-tutorial-create-xlsx/
									var wb = XLSX.utils.book_new();
									
									wb.Props = {
											Title: "Lista de Preço de Peças GTS",
											Subject: "Lista de Preço de Peças GTS",
											Author: "Marco Comassetto",
											CreatedDate: new Date(2023,05,19)
									};
									wb.SheetNames.push("Lista de Preço GTS");
									
									//Conteúdo
									var dataExcel = [[ 'Cod. Produto', 'Desc. Produto', 'Família', 'Grupo' ,'NCM', 'IPI','Preço Tabela', 'Unid./Embalagem', 'Cod. Crítico', 'Cod. Origem', 'Origem', 'Percentual Conteúdo de Importação', 'Alíquota ICMS', 'Curva ABC', 'Recompra']];
									
									for( let index in records) {
										const record = records[index];
										
										let ZDESCP = record.ZDESCP;
										if( ZDESCP.indexOf('–') !== -1 ){
											ZDESCP = ZDESCP.replaceAll('–', '-');
										}

										// Definindo a variável reCompraText baseada no valor de record.RECOMPRA
										let reCompraText = '';
										if (record.RECOMPRA == 1) {
											reCompraText = 'Sim';
										} else if (record.RECOMPRA == 2) {
											reCompraText = 'Não';
										};
										const newDatas = [
												record.CODPRODUTO,
												ZDESCP,	
												record.FAMILIA,
												record.GRUPO,
												record.NCM,
												record.IPI,
												record.PRCTABELA,
												record.UNEMBALAGEM,
												record.CODCRITICO,
												record.ORIGEM_CODIGO,
												record.ORIGEM_NACIONAL_IMPORTADO,
												record.ORIGEM_PERC_CONTEUDO_IMPORTACAO,
												record.ORIGEM_ALIQ_ICMS,
												record.CURVAABC,
												//record.RECOMPRA
												reCompraText
											
												];
										
										dataExcel.push(newDatas)
									}
									let ws = XLSX.utils.aoa_to_sheet(dataExcel);
									let wsCSV = XLSX.utils.sheet_to_csv(ws, {FS: ";", RS:"\n"});
									
									//Este método saveAs está contino no FileSaver.min.js
									//Função s2ab está neste fonte
									saveAs(new Blob([s2ab(wsCSV)],{type:"application/octet-stream"}), 'Lista de Preço de Peças GTS.csv');
									

									setTimeout(function(){ 
										myLoading.hide();
										modalListaPreco.remove();
									}, 1000);

								}
								
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
								FLUIGC.toast({message: 'Erro ao consultar Lista de Preço.<br>Comunique o Administrador do Sistema!', type: 'danger'});
								setTimeout(function(){ 
									myLoading.hide();
								}, 1000);
							}
						});
						
						
					});
					
			});

		
		}else{
			FLUIGC.toast({message: 'O seu usuário não está configurado corretamente para consultar Lista de Preço.<br>Comunique o Administrador do Sistema!', type: 'danger'});
		}


	},

	

    checklistEntregaTecnica: function(){
    	
    	if( this.retornaSO() == "mobile"){
			//Não funcionou no IOS
			FLUIGC.toast({ title: "", message: "Funcionalidade não disponível para dispositivos mobile!", type: "danger" });

			
		}else{
		
		  	var html =  "<div class=fluig-style-guide>" +
							"<div class=row>"+
								"<div class=col-md-4 >"+
								    "<label for=entTecChecklistFamilia>Família </label>" +
								    "<select name=entTecChecklistFamilia id=entTecChecklistFamilia class=form-control >" +
								    	"<option value=></option>" +
								    	"<option value=PM >Plataforma de Milho</option>" +
								    	"<option value=PC >Plataforma de Corte</option>" +
								    	"<option value=CG >Carreta Graneleira</option>" +
								    	"<option value=SS >Sistematização de Solo</option>" +
								    	"<option value=MS >Manejo de Solo</option>" +
								    	"<option value=SE >Semeadora</option>" +
								    "</select>" +
							    "</div>" +
							    
							    "<div class=col-md-4  align=left>"+
								    "<label for=entTecChecklistMaquina>Máquina</label>" +
								    "<select name=entTecChecklistMaquina id=entTecChecklistMaquina class=form-control >" +
								    	"<option value=></option>" +
								    "</select>" +
							    "</div>" +
							    
							    "<div class=col-md-2 >"+
							    	"<label style=\"opacity: 0;\">.</label>" +
							    	"<button type=button class=\"btn btn-primary\" id=btnVisualizarDoc >Download Documento</button>"+
							    "</div>" +
						    "</div>" +
						"</div>";
		  	
		  	
		  	FLUIGC.modal({
			    title: "Checklist de Entrega Técnica",
			    content: html,
			    formModal: false,
			    size: "large",
			    id: "modal-zoom-large",
			    actions: [{
			        "label": "Fechar",
			        "autoClose": true
			   		}]
				}, 
				function(err, data) {
						
					$("#entTecChecklistFamilia").change(function() {
						
						$("#entTecChecklistMaquina").empty();
						
						if( $("#entTecChecklistFamilia").val() == "PM" ) {
							$("#entTecChecklistMaquina").append("<option value=PM_Vellox >Checklist Vellox</option>");
							$("#entTecChecklistMaquina").append("<option value=PM_X10 >Checklist X10</option>");
							$("#entTecChecklistMaquina").append("<option value=PM_Produtiva >Checklist Produtiva</option>");
						}else if( $("#entTecChecklistFamilia").val() == "PC" ){
							$("#entTecChecklistMaquina").append("<option value=PC_Flexer >Checklist Flexer</option>");
						}else if( $("#entTecChecklistFamilia").val() == "CG" ){
							$("#entTecChecklistMaquina").append("<option value=CG_19_25 >Checklist Carreta 19000-25000</option>");
							$("#entTecChecklistMaquina").append("<option value=CG_30_36 >Checklist Carreta 30000-36000</option>");
						}else if( $("#entTecChecklistFamilia").val() == "SS" ){
							$("#entTecChecklistMaquina").append("<option value=SS_310_HD >Checklist Planner 310 HD</option>");
							$("#entTecChecklistMaquina").append("<option value=SS_510 >Checklist Planner 510</option>");
							$("#entTecChecklistMaquina").append("<option value=SS_710_Canavieira >Checklist Planner 710 Canavieira</option>");
							$("#entTecChecklistMaquina").append("<option value=SS_710_Construction >Checklist Planner 710 Construction</option>");
						}else if( $("#entTecChecklistFamilia").val() == "MS" ){
							$("#entTecChecklistMaquina").append("<option value=MS_Fertti >Checklist Fertti</option>");
							$("#entTecChecklistMaquina").append("<option value=MS_Terrus_DUO >Checklist Terrus DUO</option>");
							$("#entTecChecklistMaquina").append("<option value=MS_Terrus_DXS_DSR >Checklist Terrus DXS-DSR</option>");
							$("#entTecChecklistMaquina").append("<option value=MS_Tiller >Checklist Tiller</option>");
						}else if( $("#entTecChecklistFamilia").val() == "SE" ){
							$("#entTecChecklistMaquina").append("<option value=SE_Semeadora >Checklist Semeadora</option>");
						}
						
					});
						
					$("#btnVisualizarDoc").click(function() {
						
						let entTecChecklistMaquina = $("#entTecChecklistMaquina").val();
						let docId = "";
						
						if(entTecChecklistMaquina == "PM_Vellox"){
							docId = "19793";
						}else if(entTecChecklistMaquina == "PM_X10"){
							docId = "19794";
						}else if(entTecChecklistMaquina == "PM_Produtiva"){
							docId = "19795";
						}else if(entTecChecklistMaquina == "PC_Flexer"){
							docId = "19796";
						}else if(entTecChecklistMaquina == "CG_19_25"){
							docId = "19797";
						}else if(entTecChecklistMaquina == "CG_30_36"){
							docId = "19798";
						}else if(entTecChecklistMaquina == "SS_310_HD"){
							docId = "19799";
						}else if(entTecChecklistMaquina == "SS_510"){
							docId = "19800";
						}else if(entTecChecklistMaquina == "SS_710_Canavieira"){
							docId = "19801";
						}else if(entTecChecklistMaquina == "SS_710_Construction"){
							docId = "19802";
						}else if(entTecChecklistMaquina == "MS_Fertti"){
							docId = "19803";
						}else if(entTecChecklistMaquina == "MS_Terrus_DUO"){
							docId = "19804";
						}else if(entTecChecklistMaquina == "MS_Terrus_DXS_DSR"){
							docId = "19805";
						}else if(entTecChecklistMaquina == "MS_Tiller"){
							docId = "19806";
						}else if(entTecChecklistMaquina == "SE_Semeadora"){
							docId = "19807";
						}
						
						if(docId != ""){
							downloadDocument(docId);
						}
						
					});
						
					function openDocument(docId, docVersion) {
					    var parentOBJ;

					    if (window.opener) {
					        parentOBJ = window.opener.parent;
					    } else {
					        parentOBJ = parent;
					    }

					    var cfg = {
					        url : "/ecm_documentview/documentView.ftl",
					        maximized : true,
					        title : "Visualizador de Documentos",
					        callBack : function() {
					            parentOBJ.ECM.documentView.getDocument(docId, docVersion);
					        },
					        customButtons : []
					    };
					        parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
					}
						
					function downloadDocument(docId) {
							
						$.ajax({
					        async : false,
					        contentType : "application/json",
					        type : "GET",
					        dataType : "json",
					        url: "/api/public/ecm/document/downloadURL/"+docId,

					        success: function (data, textStatus, jqXHR) {
				        		let urlDownload = data.content;
						        	
//									var WindowObject = window.open(urlDownload, "_blank");
//									WindowObject.print();
									
								var link = document.createElement("a");
								link.href = urlDownload;
								link.download = "Arquivo.pdf";
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
								
					        },
					        error: function (jqXHR, textStatus, errorThrown) {
					            // seu tratamento de erro usando: textStatus
					            console.log(jqXHR)
					            
					            FLUIGC.toast({ title: "", message: jqXHR.responseJSON.message.message, type: "danger" });

					        }
					    })
						
					}
			});
		}
	  
    },
    
	retornaSO: function(){
	    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	    if (/windows phone/i.test(userAgent)) {
	        return "mobile";
	    } else if (/android/i.test(userAgent)) {
	        return "mobile";
	    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
	        return "mobile";
	    } else {
	        return "unknownnnnn";
	    }                
	},
	
});

//Função necessário para exportação de excel
function s2ab(s) { 
	var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	var view = new Uint8Array(buf);  //create uint8array as viewer
	for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	return buf;    
}