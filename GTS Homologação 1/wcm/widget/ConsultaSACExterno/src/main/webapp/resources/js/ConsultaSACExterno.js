var ConsultaSACExterno = SuperWidget.extend({
    //variáveis da widget
//	 myDataSAC : [],
    myTableAtendimentoSAC : null,
    myDataAtendimentoSAC : [],
	 
    //método iniciado quando a widget é carregada
    init: function() {
    	if (!this.isEditMode) {
    		$('.pageTitle').parent().hide();
    		$('#divCabConsultaSacExterno').show();
    		
    		if(FLUIGC.localStorage.getItem('storage-pref-sac') != 'ok'){
    			$('.footer').show();
    		}
    			
    	}
    },
  
    //BIND de eventos
    bindings: {
        local: {
        	 'tipo_pessoa_requisitante': ['change_tipoPessoaRequisitante']
    		,'consultar_sac': ['click_consultarSAC']
    		,'fechar_cookie': ['click_fecharCookie']
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
    
    consultarSAC: function (){
    	
//    	var response = grecaptcha.getResponse();
//    	if(response.length == 0) {
//            $('#g-recaptcha-error').show();
//            this.limpaTela();
//            
//        }else{
//        	$('#g-recaptcha-error').hide();
    	
	    	var conNumProtocoloFluig = $("#conNumProtocoloFluig").val();
	    	var conCpfCnpjRequisitante = $("#conCpfCnpjRequisitante").val();
	    	if(conNumProtocoloFluig != "" && conCpfCnpjRequisitante != ""){
	    		
	    		this.loadDataSAC();
	    		
	    	}else{
	    		FLUIGC.toast({message: 'Preencha o campo Nº Protocolo e CPF/CNPJ para pesquisar seu atendimento!', type: 'warning'});
	    		this.limpaTela();
	    	}
    	
//    	}
    },
    
    loadDataSAC: function(){
    	
    	var conNumProtocoloFluig = $("#conNumProtocoloFluig").val();
    	var conCpfCnpjRequisitante = $("#conCpfCnpjRequisitante").val();
    	
    	var that = this;

    	var parms = {
                "name": "",
                "fields": [],
                "constraints":  [{
                	"_field": "numProtocoloFluig",
                	"_initialValue": conNumProtocoloFluig,
                	"_finalValue": conNumProtocoloFluig,
                	"_type": 1,
                	"_likeSearch": false
                },{
                	"_field": "cpfCnpjRequisitante",
                	"_initialValue": conCpfCnpjRequisitante,
                	"_finalValue": conCpfCnpjRequisitante,
                	"_type": 1,
                	"_likeSearch": false
                }],
                "order": []
            }
    	
    	
    	var request_data = {
        		domain: WCMAPI.getServerURL(),
        		method: 'POST',
        		parms: JSON.stringify(parms)
        	}
    	
    	$.ajax({
    		url: '/WSRestOAuth/rest/conn/dsConsultaSACByProtocolo',
    		type: 'POST',
    		data: JSON.stringify(request_data),
    		async: false,
    		contentType: 'application/json'
    	
    	}).success(function(data,textStatus,jqXHR) {
		   
    		if (data != null && data.content != null && data.content.values.length > 0) {	
                const record = data.content.values[0];
                
	            //Dados Gerais
	            $("#visNumProtocoloFluig").val(record.numProtocoloFluig);
//	        	$("#visNumProtocoloTelefonico").val(record.numProtocoloTelefonico);
	        	$("#visStatusAtendimento").val(record.statusAtendimentoDesc);
	        	$("#visDataAbertura").val(record.dataAbertura);
	        	$("#visDataFinalizado").val(record.dataEncerramento);
	        	
                //Requisitante 
	        	$("#visNomeRequisitante").val(record.nomeRequisitante);
	        	$("#visTipoPessoaRequisitante").val(record.tipoPessoaRequisitante);
	        	$("#visCpfCnpjRequisitante").val(record.cpfCnpjRequisitante);
	        	$("#visTelRequisitante").val(record.telRequisitante);
	        	$("#visEmailRequisitante").val(record.emailRequisitante);
	        	$("#visEstadoRequisitante").val(record.estadoRequisitante);
	        	$("#visCodCidadeRequisitante").val(record.codCidadeRequisitante);
	        	$("#visCidadeRequisitante").val(record.cidadeRequisitante);
                
	            //Solicitação
	        	$("#visTipoSolicitacao").val(record.tipoSolicitacaoDesc);
//	        	$("#visTipoSolicitacao").val(record.tipoSolicitacao);
	        	$("#visEstadoRevenda").val(record.estadoRevenda);
	        	$("#visCodCidadeRevenda").val(record.codCidadeRevenda);
	        	$("#visCidadeRevenda").val(record.cidadeRevenda);
	        	$("#visRevenda").val(record.revenda);
	        	$("#visTipoPessoaRevenda").val(record.tipoPessoaRevenda);
	        	$("#visCpfCnpjRevenda").val(record.cpfCnpjRevenda);
	        	$("#visSetor").val(record.setor);
	        	$("#visNumSerie").val(record.numSerie);
	        	$("#visModeloEquipamento").val(record.modeloEquipamento);
	        	$("#visAssuntoSolicitacao").val(record.assuntoSolicitacao);
	        	$("#visDescricaoSolicitacao").val(record.descricaoSolicitacao);
	        	
	        	
	        	that.detalhesAtendimento(record.metadataID);
	        	
	        	$('#divDadosGeraisConsultaSacExterno').show();
	            $('#divRequisitante').show();
	            $('#divSolicitacao').show();
	            $('#divAtendimento').show();
            } else {
            	FLUIGC.toast({message: 'Não foi possível encontrar o registro!<br>Nº Protocolo ou CPF/CNPJ inválidos.', type: 'warning'});
            	that.limpaTela();
            }
        }).fail(function(jqXHR,textStatus,errorThrown) {
        	 FLUIGC.toast({message: 'Não foi possível conectar com o servidor.', type: 'danger'});
        	 console.log(jqXHR);
        	 console.log(textStatus);
        	 console.log(errorThrown);
        })
    	

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
//		    renderContent: ['atendId', 'atendData', 'atendStatus', 'atendComExterna'],
		    renderContent: '.tabelaAtendimento',
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
					'title': 'Status',
					'size': 'col-md-2',
					'display': true
		        },
		        {
					'title': 'Descrição Atendimento',
					'size': 'col-md-6',
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
    	that.myDataAtendimentoSAC = [];
    	
    	var conNumProtocoloFluig = $("#conNumProtocoloFluig").val();
    	var conCpfCnpjRequisitante = $("#conCpfCnpjRequisitante").val();
    	

    	var parms = {
                "name": "",
                "fields": [],
                "constraints":  [{
                	"_field": "metadataID",
                	"_initialValue": metadataID,
                	"_finalValue": metadataID,
                	"_type": 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
                	"_likeSearch": false
                },{
                	"_field": "numProtocoloFluig",
                	"_initialValue": conNumProtocoloFluig,
                	"_finalValue": conNumProtocoloFluig,
                	"_type": 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
                	"_likeSearch": false
                },{
                	"_field": "cpfCnpjRequisitante",
                	"_initialValue": conCpfCnpjRequisitante,
                	"_finalValue": conCpfCnpjRequisitante,
                	"_type": 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
                	"_likeSearch": false
                }],
                "order": []
            }
    	
    	var request_data = {
    		domain: WCMAPI.getServerURL(),
    		method: 'POST',
    		parms: JSON.stringify(parms)
    		
    	};
    	
    	$.ajax({
    		url: '/WSRestOAuth/rest/conn/dsConsultaSACAtendimentoExterno',
    		type: 'POST',
    		data: JSON.stringify(request_data),
    		async: false,
    		contentType: 'application/json'
    	
    	}).success(function(data,textStatus,jqXHR) {
		            
    		if (data != null && data.content != null && data.content.values.length > 0) {
                const records = data.content.values;
                for ( var index in records) {
    	            var record = records[index];
    	            that.myDataAtendimentoSAC.push({
    	            	 atendId: record.atendId
    	            	,atendData: record.atendData
    	            	,atendStatus: record.atendStatus
    	            	,atendComExterna: record.atendComExterna

    	            });
    	        }
            } 
        }).fail(function(jqXHR,textStatus,errorThrown) {
        	 FLUIGC.toast({message: 'Não foi possível conectar com o servidor.', type: 'danger'});
        	 console.log(jqXHR);
        	 console.log(textStatus);
        	 console.log(errorThrown);
        })

    },
    
    limpaTela:function() {
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
    	$("#visCodCidadeRequisitante").val('');
    	$("#visCidadeRequisitante").val('');
        //Solicitação
    	$("#visTipoSolicitacao").val('');
    	$("#visEstadoRevenda").val('');
    	$("#visCodCidadeRevenda").val('');
    	$("#cidadeRevenda").val('');
    	$("#visRevenda").val('');
    	$("#visTipoPessoaRevenda").val('');
    	$("#visCpfCnpjRevenda").val('');
    	$("#visSetor").val('');
    	$("#visNumSerie").val('');
    	$("#visModeloEquipamento").val('');
    	$("#visAssuntoSolicitacao").val('');
    	$("#visDescricaoSolicitacao").val('');
    	
    	var that = this;
    	if(that.myTableAtendimentoSAC != null){
    		that.myTableAtendimentoSAC.destroy();
    	}
		
		$('#divDadosGeraisConsultaSacExterno').hide();
        $('#divRequisitante').hide();
        $('#divSolicitacao').hide();
        $('#divAtendimento').hide();
	},
	
	fecharCookie:function() {
		
		FLUIGC.localStorage.setItem('storage-pref-sac', 'ok');
		$('.footer').hide();
		
	}
	
});

