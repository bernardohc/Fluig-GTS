var ConsultaSACInterno = SuperWidget.extend({
    loading : FLUIGC.loading("#wcm-content"),
    myTableListaSAC : null,
    myDataListaSAC : [],
    myTableAtendimentoSAC : null,
    myDataAtendimentoSAC : [],
    
    init: function () {
    	if (!this.isEditMode) {
    		$('.pageTitle').parent().hide();
    		
    		var mesPassado = new Date();
    		var today = new Date();
    		mesPassado.setDate(mesPassado.getDate() - 30);
    		
			FLUIGC.calendar('#conDataAberturaDe', {
				language: 'pt-br',
				pickDate: true,
				pickTime: false,
				defaultDate: mesPassado
			});
			FLUIGC.calendar('#conDataAberturaAte', {
				language: 'pt-br',
				pickDate: true,
				pickTime: false,
				defaultDate: today});
			
			this.carregaSetores();
    		$('#divCabConsultaSacInterno').show();
    		
	    	
	    }
    },

    bindings: {
        local: {
        	 'tipo_pessoa_requisitante': ['change_tipoPessoaRequisitante']
    		,'estado_requisitante': ['change_estadoRequisitante']
    		,'estado_revenda': ['change_estadoRevenda']
    		,'cidade_revenda': ['change_carregaRevendas']
            ,'filtrar_sac': ['click_filtrarSAC']
    		,'limpar_filtro_sac': ['click_limparFiltroSAC']
    		,'visualizar_sac': ['click_visualizarSAC']
    		,'voltar_tela': ['click_voltarTela']
    		,'imprimir_sac': ['click_imprimirSAC']
        }
    },
    
    
    carregaSetores: function() {
    	var datasetReturned = DatasetFactory.getDataset("ds_parametro_sac_setor", null, null, null);
	    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	        var records = datasetReturned.values;
	        for ( var index in records) {
	            var record = records[index];
	            $("#conSetor").append("<option value='" +  record.codSetor + "'>" +  record.setor + "</option>");
	        }
    	}
    },
    
    
    
    tipoPessoaRequisitante: function (){
    	
    	var conTipoPessoaRequisitante = $('#conTipoPessoaRequisitante').val();
    
    	if(conTipoPessoaRequisitante != ''){
    		$('#conCpfCnpjRequisitante').prop("readonly", false);
    		$('#conCpfCnpjRequisitante').val('')
    		
    		if($('#conTipoPessoaRequisitante').val() == 'PF'){
				validafunctions.setCpf("conCpfCnpjRequisitante");	
			}else if($('#conTipoPessoaRequisitante').val() == 'PJ'){
				validafunctions.setCnpj("conCpfCnpjRequisitante");	
			}
    	}else{
    		$('#conCpfCnpjRequisitante').prop("readonly", true);
    		$('#conCpfCnpjRequisitante').val('')
    	}
    	
    	
    },
    
    estadoRequisitante: function(){
    	
    	$("#conCidadeRequisitante").empty();
    	
    	var estado = $('#conEstadoRequisitante').val();
    	
    	//Congelo o estado para não ficar mudando de estado toda hora e ficar todo momento realizando requisição
    	$('#conEstadoRequisitante').prop('disabled', true);
    	
    	if(estado != ''){
    		window.loading= FLUIGC.loading('#divCabConsultaSacInterno');
        	window.loading.show();
 			$.ajax({
 		        async: true,
 		        dataType: "json",
 		        type: "GET",
 		        url: "/api/public/ecm/dataset/search?datasetId=dsCidade&filterFields=UF,"+estado,
 		        success : function(data) {
 		        	if (data != null && data.content != null && data.content.length > 0) {
 		        		const records = data.content;
 		        		$("#conCidadeRequisitante").append("<option value=''></option>");
 		        		for ( var index in records) {
 	    		            var record = records[index];
 	    		           $("#conCidadeRequisitante").append("<option value='" +  record.CODCIDADE + "'>" +  record.CIDADE + "</option>");
 		        		}
 		        	}
 		        	$('#conEstadoRequisitante').prop('disabled', false);
 		        	window.loading.hide();
 		        },
 		        error: function (msg){
 		            // código omitido
 		        	console.log(msg)
 		        	$('#conEstadoRequisitante').prop('disabled', false);
 		        	window.loading.hide();
 		        }
 		    });
 			
//    		var cidades = this.getCidades(estado);
//        	var settings = {
//    	        source: cidades,
//    	        displayKey: 'CIDADE',
//    	        multiSelect: false,
//    	        style: {
//    	            autocompleteTagClass: 'tag-gray',
//    	            tableSelectedLineClass: 'info'
//    	        },
//    	        table: {
//    	            header: [{
//    	                'title': 'CIDADE',
//    	                'size': 'col-xs-9',
//    	                'dataorder': 'CIDADE',
//    	                'standard': true
//    	            }],
//    	            renderContent: ['CIDADE']
//    	        }
//    	    };
//        	
//    		var filter = FLUIGC.filter('#conCidadeRequisitante', settings);
    		 
    	}else{
    		
    		$("#conCidadeRequisitante").empty();
    		$("#conCidadeRequisitante").append("<option value=''></option>");
    		$('#conEstadoRequisitante').prop('disabled', false);
    	}
    
    	
    	
    	
    },
    
    estadoRevenda: function(){
    	
    	$("#conCidadeRevenda").empty();
    	$("#conRevenda").empty();
		$("#conRevenda").append("<option value=''></option>");
		
    	var estado = $('#conEstadoRevenda').val();
    	
    	//Congelo o estado para não ficar mudando de estado toda hora e ficar todo momento realizando requisição
    	$('#conEstadoRevenda').prop('disabled', true);
    	if(estado != ''){
    		window.loading= FLUIGC.loading('#divCabConsultaSacInterno');
        	window.loading.show();
 			$.ajax({
 		        async: true,
 		        dataType: "json",
 		        type: "GET",
 		        url: "/api/public/ecm/dataset/search?datasetId=dsCidade&filterFields=UF,"+estado,
 		        success : function(data) {
 		        	if (data != null && data.content != null && data.content.length > 0) {
 		        		const records = data.content;
 		        		$("#conCidadeRevenda").append("<option value=''></option>");
 		        		for ( var index in records) {
 	    		            var record = records[index];
 	    		           $("#conCidadeRevenda").append("<option value='" +  record.CODCIDADE + "'>" +  record.CIDADE + "</option>");
 		        		}
 		        	}
 		        	$('#conEstadoRevenda').prop('disabled', false);
 		        	window.loading.hide();
 		        },
 		        error: function (msg){
 		            // código omitido
 		        	console.log(msg)
 		        	$('#conEstadoRevenda').prop('disabled', false);
 		        	window.loading.hide();
 		        }
 		    });
 			

    	}else{
    		$("#conCidadeRevenda").empty();
    		$("#conCidadeRevenda").append("<option value=''></option>");
    		$('#conEstadoRevenda').prop('disabled', false);
    	}
    
    	
    	
    	
    },
    
    carregaRevendas: function() {
    	
    	$("#conRevenda").empty();
    	
    	var conEstadoRevenda = $('#conEstadoRevenda').val();
		var conCidadeRevenda = $("#conCidadeRevenda").val();
		
		//Congelo a cidade para não ficar mudando de cidade  toda hora e ficar todo momento realizando requisição
    	$('#conCidadeRevenda').prop('disabled', true);
		$("#conRevenda").append("<option value=''></option>");
		
		if(conCidadeRevenda != ''){
    		window.loading= FLUIGC.loading('#divCabConsultaSacInterno');
        	window.loading.show();
 			$.ajax({
 		        async: true,
 		        dataType: "json",
 		        type: "GET",
 		        url: "/api/public/ecm/dataset/search?datasetId=dsConsultaSACRevendas&filterFields=UF,"+conEstadoRevenda+",CODCIDADE,"+conCidadeRevenda,
 		        success : function(data) {
 		        	if (data != null && data.content != null && data.content.length > 0) {
 		        		const records = data.content;
 		        		for ( var index in records) {
 	    		            var record = records[index];
 	    		           $("#conRevenda").append("<option value='" +  record.A1_CODLOJA + "'>" +  record.A1_NOME + "</option>");
 		        		}
 		        	}
 		        	window.loading.hide();
 		        },
 		        error: function (msg){
 		            // código omitido
 		        	console.log(msg)
 		        	window.loading.hide();
 		        }
 		    });
 			

    	}else{
    		$("#conRevenda").empty();
    		$("#conRevenda").append("<option value=''></option>");
    	}
		$('#conCidadeRevenda').prop('disabled', false);
		
    },
    
    getCidades: function(uf){
    	
    	try {
            var constUF = DatasetFactory.createConstraint('UF', uf , uf, ConstraintType.MUST);

            var constraints = new Array(constUF)
            
//			var datasetReturned = DatasetFactory.getDataset("dsCidadeWS", null, constraints, null);
            var datasetReturned = DatasetFactory.getDataset("dsCidade", null, constraints, null);
			if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
				var records = datasetReturned.values;
				return records;
			}

	    } catch(error) {
            console.error(error);
	        return [];
	    }
    
    },
    
    filtrarSAC: function (){
    	
    	var conNumProtocoloFluig = $('#conNumProtocoloFluig').val();
    	var conNumProtocoloTelefonico = $('#conNumProtocoloTelefonico').val();
    	var conStatusAtendimento = $('#conStatusAtendimento').val();
    	var conDataAberturaDe = $('#conDataAberturaDe').val();
    	var conDataAberturaAte = $('#conDataAberturaAte').val();

    	var conNomeRequisitante = $('#conNomeRequisitante').val();
    	var conTipoPessoaRequisitante = $('#conTipoPessoaRequisitante').val();
    	var conCpfCnpjRequisitante = $('#conCpfCnpjRequisitante').val();
    	var conEstadoRequisitante = $('#conEstadoRequisitante').val();
    	var conCidadeRequisitante = $('#conCidadeRequisitante').val();

    	var conEstadoRevenda = $('#conEstadoRevenda').val();
    	var conCidadeRevenda = $('#conCidadeRevenda').val();
    	var conRevenda = $('#conRevenda').val();
    	var conTipoSolicitacao = $('#conTipoSolicitacao').val();
    	var conSetor = $('#conSetor').val();
    	
    	
    	
    	if(conNumProtocoloFluig != '' || conNumProtocoloTelefonico != '' || conStatusAtendimento != '' || conDataAberturaDe != '' || conDataAberturaAte != ''
    		|| conNomeRequisitante != '' || conTipoPessoaRequisitante != '' || conCpfCnpjRequisitante != '' || conEstadoRequisitante != '' || conCidadeRequisitante != ''
    		|| conEstadoRevenda != '' || conCidadeRevenda != '' || conRevenda != '' || conTipoSolicitacao != '' || conSetor != ''
    				
    		){
    		this.loadTableListaSAC();
    	}else{
    		FLUIGC.toast({message: 'É necessário preencher ao menos um filtro!', type: 'warning'});
    	}
    	
    	
    },
    
    loadTableListaSAC: function (){

//		CONSULTA DE DATASET VIA AJAX, PARA COLOCAR LOADER
//    	window.loading.show();
		
		this.loadDataListaSAC();
		
		var that = this;
		var instanceId = that.instanceId;
		
		that.myTableListaSAC = FLUIGC.datatable('#tabelaSAC_' + instanceId, {
			dataRequest: this.myDataListaSAC,
		    renderContent: ['acoes', 'statusAtendimentoDesc', 'numProtocoloFluig', 'numProtocoloTelefonico', 'dataAberturaSoData', 'dataAbertura', 'dataEncerramento'
		                    ,'nomeRequisitante', 'tipoPessoaRequisitante', 'cpfCnpjRequisitante', 'telRequisitante', 'emailRequisitante', 'estadoRequisitante', 'cidadeRequisitante' 
		                    ,'tipoSolicitacaoDesc', 'estadoRevenda', 'codCidadeRevenda', 'cidadeRevenda', 'revenda', 'tipoPessoaRevenda', 'cpfCnpjRevenda', 'setor', 'numSerie', 'modeloEquipamento', 'assuntoSolicitacao', 'descricaoSolicitacao'],
            mobileMainColumns: [0,1,2, 15, 19],
            header: [{
					'title': '',
					'size': 'icon-acoes'
				},
				{
					'title': 'Status',
					'size': 'col-md-1',
					'display': true
				},
		        {
					'title': 'Nº Protocolo',
					'size': 'col-md-1',
					'display': true
		        },
		        {
					'title': 'Nº Protocolo Telefônico',
					'size': 'col-md-1',
					'display': true
		        },
		        {
					'title': 'Data Abertura',
					'size': 'col-md-1',
					'display': true
		        },
		        {
					'title': 'Data Abertura',
					'size': 'col-md-1',
					'display': false
		        },
		        {
					'title': 'Encerramento',
					'size': 'col-md-1',
					'display': false
		        },
		        {
					'title': 'Requisitante',
					'size': 'col-md-2',
					'display': true
				},
		        {
					'title': 'Tipo Pessoa',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'CPF/CNPJ',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Telefone',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'E-mail',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Estado',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Cidade',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Tipo',
					'size': 'col-md-1',
					'display': true
				},
				{
					'title': 'Estado Revenda',
					'size': 'col-md-2',
					'display': false
				},
		        {
					'title': 'Cod. Cidade Revenda',
					'size': 'col-md-2',
					'display': false
				},
		        {
					'title': 'Cidade Revenda',
					'size': 'col-md-2',
					'display': false
				},
		        {
					'title': 'Revenda',
					'size': 'col-md-2',
					'display': true
				},
		        {
					'title': 'Tipo Pessoa Revenda',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'CPF/CNPJ Revenda',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Setor',
					'size': 'col-md-1',
					'display': true
				},
		        {
					'title': 'Nº Série',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Modelo Equipamento',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Assunto',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Descrição Solicitação',
					'size': 'col-md-1',
					'display': false
				}
		        
		        /*,
		        {
		         'title': 'UF',
		         'dataorder': 'UF',
		         'size': 'col-md-5',
		        }*/
		    ],
		    multiSelect: false,
//		    classSelected: 'danger',
		    search: {
		        enabled: false,
		        onSearch: function(response) {
		            // DO SOMETHING
		        },
		        onlyEnterkey: true,
		        searchAreaStyle: 'col-md-3'
		    },
		    scroll: {
		        target: "#tabelaSAC_" + instanceId,
		        enabled: true,
		        onScroll: function() {
		            // DO SOMETHING
		        }
		    },
		    actions: {
		        enabled: false,
		        template: '.my_template_area_actions',
		        actionAreaStyle: 'col-md-9'
		    },
		    navButtons: {
		        enabled: false,
		        forwardstyle: 'btn-warning',
		        backwardstyle: 'btn-warning',
		    },
		    emptyMessage: '<div class="text-center">Sem resgistros para mostrar.</div>',
		    tableStyle: 'table-striped',
		    draggable: {
			     enabled: false,
			     onDrag: function(dragInfo) {
			         // Do something
			         return false; // If it returns false, will cancel the draggable
			     }
		    }
		}, function(err, data) {
		    // DO SOMETHING (error or success)
		});
		
		
    },
    
    	
    loadDataListaSAC: function(){
    	
    	var that = this;
    	this.myDataListaSAC = [];
    	
		var acoes = '<a data-visualizar_sac  alt="Vizualizar SAC" title="Vizualizar SAC" ><i class="fluigicon fluigicon-search icon-sm" style="cursor: pointer;"></i></a>';
    	
    	//Cabeçalho
    	var conNumProtocoloFluig = $("#conNumProtocoloFluig").val();
    	var conNumProtocoloTelefonico = $("#conNumProtocoloTelefonico").val();
    	var conStatusAtendimento = $("#conStatusAtendimento").val();
    	var conDataAberturaDe = $("#conDataAberturaDe").val();
    	var conDataAberturaAte = $("#conDataAberturaAte").val();
		//Requisitantes
		var conNomeRequisitante = $("#conNomeRequisitante").val();
		var conTipoPessoaRequisitante = $("#conTipoPessoaRequisitante").val();
		var conCpfCnpjRequisitante = $("#conCpfCnpjRequisitante").val();
		var conEstadoRequisitante = $("#conEstadoRequisitante").val();
		var conCidadeRequisitante = $("#conCidadeRequisitante").val();
		//Revenda
		var conEstadoRevenda = $("#conEstadoRevenda").val();
		var conCidadeRevenda = $("#conCidadeRevenda").val();
		var codLojaRevenda = $("#conRevenda").val();
		
		//Solicitação
		var conTipoSolicitacao = $("#conTipoSolicitacao").val();
		var conCodSetor = $("#conSetor").val();
		
		//Cabeçalho
		var constNumProtocoloFluig = DatasetFactory.createConstraint('numProtocoloFluig', conNumProtocoloFluig , conNumProtocoloFluig, ConstraintType.MUST);
		var constNumProtocoloTelefonico = DatasetFactory.createConstraint('numProtocoloTelefonico', conNumProtocoloTelefonico , conNumProtocoloTelefonico, ConstraintType.MUST);
		var constStatusAtendimento = DatasetFactory.createConstraint('statusAtendimento', conStatusAtendimento , conStatusAtendimento, ConstraintType.MUST);
		var constDataAberturaDe = DatasetFactory.createConstraint('dataAberturaDe', conDataAberturaDe , conDataAberturaDe, ConstraintType.MUST);
		var constDataAberturaAte = DatasetFactory.createConstraint('dataAberturaAte', conDataAberturaAte , conDataAberturaAte, ConstraintType.MUST);
		
		//Requisitante
		var constNomeRequisitante = DatasetFactory.createConstraint('nomeRequisitante', conNomeRequisitante , conNomeRequisitante, ConstraintType.MUST);
		var constTipoPessoaRequisitante = DatasetFactory.createConstraint('tipoPessoaRequisitante', conTipoPessoaRequisitante , conTipoPessoaRequisitante, ConstraintType.MUST);
		var constCpfCnpjRequisitante = DatasetFactory.createConstraint('cpfCnpjRequisitante', conCpfCnpjRequisitante , conCpfCnpjRequisitante, ConstraintType.MUST);
		var constEstadoRequisitante = DatasetFactory.createConstraint('estadoRequisitante', conEstadoRequisitante , conEstadoRequisitante, ConstraintType.MUST);
		var constCidadeRequisitante = DatasetFactory.createConstraint('cidadeRequisitante', conCidadeRequisitante , conCidadeRequisitante, ConstraintType.MUST);
		
		//Revenda
		var constEstadoRevenda = DatasetFactory.createConstraint('estadoRevenda', conEstadoRevenda , conEstadoRevenda, ConstraintType.MUST);
		var constCidadeRevenda = DatasetFactory.createConstraint('cidadeRevenda', conCidadeRevenda , conCidadeRevenda, ConstraintType.MUST);
		var constCodLojaRevenda = DatasetFactory.createConstraint('codLojaRevenda', codLojaRevenda , codLojaRevenda, ConstraintType.MUST);
		
		//Solicitação
		var constTipoSolicitacao = DatasetFactory.createConstraint('tipoSolicitacao', conTipoSolicitacao , conTipoSolicitacao, ConstraintType.MUST);
		var constCodSetor = DatasetFactory.createConstraint('codSetor', conCodSetor , conCodSetor, ConstraintType.MUST);
		
		var constraints = new Array(constNumProtocoloFluig, constNumProtocoloTelefonico, constStatusAtendimento, constDataAberturaDe, constDataAberturaAte
									,constNomeRequisitante, constTipoPessoaRequisitante, constCpfCnpjRequisitante, constEstadoRequisitante, constCidadeRequisitante
									,constEstadoRevenda, constCidadeRevenda, constCodLojaRevenda
									,constTipoSolicitacao, constCodSetor)
		
    	var datasetReturned = DatasetFactory.getDataset("dsConsultaSAC", null, constraints, null);
	    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	        var records = datasetReturned.values;
	        var cont = 1;
	        for ( var index in records) {
	            var record = records[index];
	            this.myDataListaSAC.push({
	            	 acoes : acoes
	            	,metadataID: record.metadataID
	            	,numProtocoloFluig: record.numProtocoloFluig
	            	,numProtocoloTelefonico: record.numProtocoloTelefonico
	            	,statusAtendimentoDesc: record.statusAtendimentoDesc
	            	,dataAberturaSoData: record.dataAberturaSoData
	            	,dataAbertura: record.dataAbertura
	            	,dataEncerramento: record.dataEncerramento
	                //Requisitante 
	                ,nomeRequisitante: record.nomeRequisitante
	                ,tipoPessoaRequisitante: record.tipoPessoaRequisitante
	                ,cpfCnpjRequisitante: record.cpfCnpjRequisitante
	                ,telRequisitante: record.telRequisitante
	                ,emailRequisitante: record.emailRequisitante
	                ,estadoRequisitante: record.estadoRequisitante
	                ,cidadeRequisitante: record.cidadeRequisitante
	                //Solicitação
	                ,tipoSolicitacaoDesc: record.tipoSolicitacaoDesc
	                ,estadoRevenda: record.estadoRevenda
	                ,codCidadeRevenda: record.codCidadeRevenda
	                ,cidadeRevenda: record.cidadeRevenda
	                ,revenda: record.revenda
	                ,tipoPessoaRevenda: record.tipoPessoaRevenda
	                ,cpfCnpjRevenda: record.cpfCnpjRevenda
	                ,setor: record.setor
	                ,numSerie: record.numSerie
	                ,modeloEquipamento: record.modeloEquipamento
	                ,assuntoSolicitacao: record.assuntoSolicitacao
	                ,descricaoSolicitacao: record.descricaoSolicitacao
	            });
	        }
	    };
    	
    },
    
    limparFiltroSAC: function(){
    	
    	$("#conNumProtocoloFluig").val('');
    	$("#conNumProtocoloTelefonico").val('');
    	$("#conStatusAtendimento").val('');
    	$("#conDataAberturaDe").val('');
    	$("#conDataAberturaAte").val('');
		//Requisitantes
		$("#conNomeRequisitante").val('');
		$("#conTipoPessoaRequisitante").val('');
		$("#conCpfCnpjRequisitante").val('');
		$("#conEstadoRequisitante").val('');
		$("#conCidadeRequisitante").empty();
		$("#conCidadeRequisitante").append("<option value=''></option>");
		//Revenda
		$("#conEstadoRevenda").val('');
		$("#conCidadeRevenda").empty();
		$("#conCidadeRevenda").append("<option value=''></option>");
		
		$("#conRevenda").empty();
		$("#conRevenda").append("<option value=''></option>");
		
		
		$("#conTipoSolicitacao").val('');
		$("#conSetor").val('');
//		this.filtrarSAC();
		
		var that = this;
		that.myTableListaSAC.destroy();
    },
    
    visualizarSAC: function(el, ev){
    	var index = this.myTableListaSAC.selectedRows()[0];
    	var selected = this.myTableListaSAC.getRow(index);
    	this.detalhesSAC(selected);
    },
    
    detalhesSAC:function(selected,el, ev) {
    	
    	//Cabeçalho
    	$("#visNumProtocoloFluig").val(selected.numProtocoloFluig);
    	$("#visNumProtocoloTelefonico").val(selected.numProtocoloTelefonico);
    	$("#visStatusAtendimento").val(selected.statusAtendimentoDesc);
    	$("#visDataAbertura").val(selected.dataAbertura);
    	$("#visDataFinalizado").val(selected.dataEncerramento);
        //Requisitante 
    	$("#visNomeRequisitante").val(selected.nomeRequisitante);
    	$("#visTipoPessoaRequisitante").val(selected.tipoPessoaRequisitante);
    	$("#visCpfCnpjRequisitante").val(selected.cpfCnpjRequisitante);
    	$("#visTelRequisitante").val(selected.telRequisitante);
    	$("#visEmailRequisitante").val(selected.emailRequisitante);
    	$("#visEstadoRequisitante").val(selected.estadoRequisitante);
    	$("#visCidadeRequisitante").val(selected.cidadeRequisitante);
        //Solicitação
    	$("#visTipoSolicitacao").val(selected.tipoSolicitacaoDesc);
    	$("#visEstadoRevenda").val(selected.estadoRevenda);
    	$("#visCodCidadeRevenda").val(selected.codCidadeRevenda);
    	$("#visCidadeRevenda").val(selected.cidadeRevenda);
    	$("#visRevenda").val(selected.revenda);
    	$("#visTipoPessoaRevenda").val(selected.tipoPessoaRevenda);
    	$("#visCpfCnpjRevenda").val(selected.cpfCnpjRevenda);
    	$("#visSetor").val(selected.setor);
    	$("#visNumSerie").val(selected.numSerie);
    	$("#visModeloEquipamento").val(selected.modeloEquipamento);
    	$("#visAssuntoSolicitacao").val(selected.assuntoSolicitacao);
    	$("#visDescricaoSolicitacao").val(selected.descricaoSolicitacao);
    	
    	
    	this.detalhesAtendimento(selected.metadataID);
    	
    	$("#divCabConsultaSacInterno").hide();
		$("#dadosSAC").fadeIn('5000');
		
		$('html,body').animate({scrollTop: 0},'slow');
    },
    
    detalhesAtendimento: function(metadataID){
    	this.loadTableAtendimentoSAC(metadataID);
    	
    },
    
    loadTableAtendimentoSAC: function (metadataID){
    	this.loadDataAtendimentoSAC(metadataID);
    	
    	var that = this;
		var instanceId = that.instanceId;
		that.myTableAtendimentoSAC = FLUIGC.datatable('#tabelaAtendimento_' + instanceId, {
			dataRequest: this.myDataAtendimentoSAC,
//		    renderContent: ['atendId', 'atendData', 'atendUsuario', 'atendStatus', 'atendComInterna', 'atendComExterna'],
		    renderContent: '.tabelaAtendimento',
		    mobileMainColumns: [1,2,3,4,5],
		    header: [
				{
					'title': 'Id',
					'size': 'col-md-1',
					'display': false
				},
		        {
					'title': 'Data',
					'size': 'col-md-2',
					'display': true
		        },
		        {
					'title': 'Usuário',
					'size': 'col-md-1',
					'display': true
		        },
		        {
					'title': 'Status',
					'size': 'col-md-1',
					'display': true
		        },
		        {
					'title': 'Comunicação Interna',
					'size': 'col-md-4',
					'display': true
		        },
		        {
					'title': 'Comunicação Externa',
					'size': 'col-md-4',
					'display': true
		        }
		    ],
		    multiSelect: false,
//		    classSelected: 'danger',
		    search: {
		        enabled: false,
		        onSearch: function(response) {
		            // DO SOMETHING
		        },
		        onlyEnterkey: true,
		        searchAreaStyle: 'col-md-3'
		    },
		    scroll: {
		        target: "#tabelaAtendimento_" + instanceId,
		        enabled: true,
		        onScroll: function() {
		            // DO SOMETHING
		        }
		    },
		    actions: {
		        enabled: false,
		        template: '.my_template_area_actions',
		        actionAreaStyle: 'col-md-9'
		    },
		    navButtons: {
		        enabled: false,
		        forwardstyle: 'btn-warning',
		        backwardstyle: 'btn-warning',
		    },
		    emptyMessage: '<div class="text-center">Sem atendimentos realizados.</div>',
		    tableStyle: 'table-striped',
		    draggable: {
			     enabled: false,
			     onDrag: function(dragInfo) {
			         // Do something
			         return false; // If it returns false, will cancel the draggable
			     }
		    }
		}, function(err, data) {
		    // DO SOMETHING (error or success)
		});
		
    	
    },
    
    loadDataAtendimentoSAC: function(metadataID){
    	
    	var that = this;
    	this.myDataAtendimentoSAC = [];
    	
    	//Fluig
//    	var metadataID = $("#conNumProtocoloFluig").val();
    	
		//Fluig
		var constMetadataID = DatasetFactory.createConstraint('metadataID', metadataID , metadataID, ConstraintType.MUST);

		var constraints = new Array(constMetadataID);
		
    	var datasetReturned = DatasetFactory.getDataset("dsConsultaSACAtendimento", null, constraints, null);
	    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	        var records = datasetReturned.values;
	        var cont = 1;
	        for ( var index in records) {
	            var record = records[index];
	            this.myDataAtendimentoSAC.push({
	            	 atendId: record.atendId
	            	,atendUsuario: record.atendUsuario
	            	,atendData: record.atendData
	            	,atendStatus: record.atendStatus
	            	,atendComInterna: record.atendComInterna
	            	,atendComExterna: record.atendComExterna

	            });
	        }
	    };
    },
    
    voltarTela:function(el, ev) {
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		this.limpaTelaDetalhesSAC();
//		$("#dadosPedido").fadeOut('1500');
		$("#dadosSAC").hide();
		$("#divCabConsultaSacInterno").fadeIn('1500');
		$('html,body').animate({scrollTop: 0},'slow');
		myLoading.hide();
	},
	
    limpaTelaDetalhesSAC:function(el, ev) {
    	//Cabeçalho
    	$("#visNumProtocoloFluig").val('');
    	$("#visNumProtocoloTelefonico").val('');
    	$("#visStatusAtendimento").val('');
    	$("#visDataAbertura").val('');
    	$("#visDataFinalizado").val('');
        //Requisitante 
    	$("#visNomeRequisitante").val('');
    	$("#visTipoPessoaRequisitante").val('');
    	$("#visCpfCnpjRequisitante").val('');
    	$("#visTelRequisitante").val('');
    	$("#visEmailRequisitante").val('');
    	$("#visEstadoRequisitante").val('');
    	$("#visCidadeRequisitante").val('');
        //Solicitação
    	$("#visTipoSolicitacao").val('');
    	$("#visEstadoRevenda").val('');
    	$("#visCodCidadeRevenda").val('');
    	$("#visCidadeRevenda").val('');
    	$("#visRevenda").val('');
    	$("#visTipoPessoaRevenda").val('');
    	$("#visCpfCnpjRevenda").val('');
    	$("#visSetor").val('');
    	$("#visNumSerie").val('');
    	$("#visModeloEquipamento").val('');
    	$("#visAssuntoSolicitacao").val('');
    	$("#visDescricaoSolicitacao").val('');
    	
    	var that = this;
		that.myTableAtendimentoSAC.destroy();
	},
	
	imprimirSAC : function(el, ev) {
		
		//Dados Gerais
		var visNumProtocoloFluig = $('#visNumProtocoloFluig').val();
		var visDataAbertura = $('#visDataAbertura').val();
		
		//Requisitante
		var visNomeRequisitante = $('#visNomeRequisitante').val();
		var visCpfCnpjRequisitante = $('#visCpfCnpjRequisitante').val();
		var visTelRequisitante = $('#visTelRequisitante').val();
		var visEmailRequisitante = $('#visEmailRequisitante').val();
		var visEstadoRequisitante = $('#visEstadoRequisitante').val();
		var visCidadeRequisitante = $('#visCidadeRequisitante').val();
		
		//Revenda
		var visEstadoRevenda = $('#visEstadoRevenda').val();
		var visCidadeRevenda = $('#visCidadeRevenda').val();
		var visRevenda = $('#visRevenda').val();
		var visCpfCnpjRevenda = $('#visCpfCnpjRevenda').val();
		
		//Solicitação
		var visTipoSolicitacao = $('#visTipoSolicitacao').val();
		var visSetor = $('#visSetor').val();
		var visNumSerie = $('#visNumSerie').val();
		var visModeloEquipamento = $('#visModeloEquipamento').val();
		var visAssuntoSolicitacao = $('#visAssuntoSolicitacao').val();
		var visDescricaoSolicitacao = $('#visDescricaoSolicitacao').val();
		
	    var html = " <!DOCTYPE html> "+
	                " <html> "+
	                " 	<head> "+
	                " 		<style> "+
	                " 			th, td { "+
	                " 				font-size: 12px; "+
	                " 				 text-transform: uppercase; "+
	                " 			} "+
	                " 			.quebratexto { "+
	                "   			white-space: pre-line; "+
	                "     			word-wrap: break-word; "+
	                "     			 text-transform: uppercase; "+
	                " 			} "+
	                " 		</style> "+
	                " 	</head> "+
	                " <body> ";            

	    html += "<table style='width:  100%; border: 1px solid black; ' >" +
		        "	<tr>" +
		        "		<td align='center' style='font-size: 22px !important;'>" +
		        "			<b>SAC</b>" +
		        "		</td>" +
		        "	</tr>" +
		        "</table>";	    

	    
		html += "<h4><u>DADOS GERAIS</u></h4>" +
		        "<table style='width: 80%;' >" +
	            "	<tr>" +
	            "		<td align='left' style='width: 50%;'>" +
	            "			<b>Nº Protocolo: </b>"+ visNumProtocoloFluig +"" +
	            "		</td>" +
	            "		<td align='left' style='width: 50%;'>" +
	            "			<b>Data Abertura: </b>"+ visDataAbertura +"" +
	            "		</td>" +
	            "	</tr>" +
	            "</table>" ;
		
	    	
	    
		html += "<h4><u>REQUISITANTE</u></h4>" +
		        "<table style='width:  100%;' >" +
		        "	<tr>" +
		        "		<td align='left' style='width: 62%;' >" +
		        "			<b>Nome: </b>" + visNomeRequisitante +
		        "		</td>" +
		        "		<td align='left' style='width: 38%;'>" +
		        "			<b>CPF/CNPJ: </b>" + visCpfCnpjRequisitante +
		        "		</td>" +
		        "	</tr>" +
		        "	<tr>" +
		        "		<td align='left' style='width: 62%;' >" +
		        "			<b>E-mail: </b>" + visEmailRequisitante +
		        "		</td>" +
		        "		<td align='left' style='width: 38%;'>" +
		        "			<b>Telefone: </b>" + visTelRequisitante +
		        "		</td>" +
		        "	</tr>" +
		        "	<tr>" +
		        "		<td align='left' style='width: 62%;' >" +
		        "			<b>Estado: </b>" + visEstadoRequisitante +
		        "		</td>" +
		        "		<td align='left' style='width: 38%;'>" +
		        "			<b>Cidade: </b>" + visCidadeRequisitante +
		        "		</td>" +
		        "	</tr>" +
		        "</table>" ;
		
		html += "<h4><u>REVENDA</u></h4>" +
		        "<table style='width:  100%;' >" +
		        "	<tr>" +
		        "		<td align='left' style='width: 62%;' >" +
		        "			<b>Nome: </b>" + visRevenda +
		        "		</td>" +
		        "		<td align='left' style='width: 38%;'>" +
		        "			<b>CPF/CNPJ: </b>" + visCpfCnpjRevenda +
		        "		</td>" +
		        "	</tr>" +
		        "	<tr>" +
		        "		<td align='left' style='width: 62%;' >" +
		        "			<b>Estado: </b>" + visEstadoRevenda +
		        "		</td>" +
		        "		<td align='left' style='width: 38%;'>" +
		        "			<b>Cidade: </b>" + visCidadeRevenda +
		        "		</td>" +
		        "	</tr>" +
		        "</table>" ;
		
		
		html += "<h4><u>SOLICITAÇÃO</u></h4>" +
				"<table style='width: 80%;' >" +
		        "	<tr>" +
		        "		<td align='left' style='width: 50%;' >" +
		        "			<b>Setor Atendimento: </b>" + visSetor +
		        "		</td>" +
		        "		<td align='left' style='width: 50%;'>" +
		        "			<b>Tipo: </b>" + visTipoSolicitacao +
		        "		</td>" +
		        "	</tr>" +
		        "	<tr>" +
		        "		<td align='left' style='width: 50%;' >" +
		        "			<b>Nº Série: </b>" + visNumSerie +
		        "		</td>" +
		        "		<td align='left' style='width: 50%;'>" +
		        "			<b>Equipamento: </b>" + visModeloEquipamento +
		        "		</td>" +
		        "	</tr>" +
		        "</table>" ;
		
		html += "<table style='width:  100%;' >" +
		        "	<tr>" +
		        "		<td align='left' style='width: 100%;' >" +
		        "			<b>Assunto: </b>" + visAssuntoSolicitacao +
		        "		</td>" +
		        "	</tr>" +
		        "	<tr>" +
		        "		<td align='left' style='width: 100%;'>" +
		        "			<b>Descrição:</b>" +
		        "		</td>" +
		        "	</tr>" +
		        "	<tr>" +
		        "		<td align='left' style='width: 100%;' class='quebratexto' >" + visDescricaoSolicitacao + "</td>" +
		        "	</tr>" +
		        "</table>" ;	
		
		
	    html += "</body> "+
	            "</html> "; 	
	    
	    var WindowObject = window.open('', "SAC", "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
	    WindowObject.document.writeln(html);
	    WindowObject.document.close();
	    WindowObject.focus();
	    WindowObject.print();
	    WindowObject.close();

	}
	
	
});
