var ConsultaPedidos = SuperWidget.extend({
    message: null,
    editMode: false,
	viewMode: false,
	
	flGerente: false,
	myTablePedidos: null,
	myTableAdministrador: null,
	myTableBalconista: null,
	myDataPedidos: [],
	myDataAdministrador: [],
	myDataBalconista: [],
	
    bindings: {
        local: {
//    		'limpa_campo_revenda': ['change_limpaCampoRevenda'],
    		'pesquisar_pedidos': ['click_pesquisarPedidos'],
    		'limpar_filtro': ['click_limparFiltro'],
    		'visualizar_pedido': ['click_visualizarPedido'],
    		'voltar_tela': ['click_voltarTela'],
    		'imprimir': ['click_imprimir'],
        }
    },
    
    init: function () {
    	if (!this.isEditMode) {
    		$('.pageTitle').parent().hide();
			FLUIGC.calendar('#conDataEmissaoDe');
			FLUIGC.calendar('#conDataEmissaoAte');
			
			this.carregaUsuarioDadosAdicionais()
			
    	}
    },
    
    carregaUsuarioDadosAdicionais : function(){
    	
		
		var datasetReturned = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
		
	    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	        
	        if( datasetReturned.values[0].A1_COD != '' && datasetReturned.values[0].A1_COD !== undefined && datasetReturned.values[0].A1_COD != 'undefined' &&
	        	datasetReturned.values[0].A1_LOJA != '' && datasetReturned.values[0].A1_LOJA !== undefined && datasetReturned.values[0].A1_LOJA != 'undefined' ){ 

	        	$('#codRevenda').val(datasetReturned.values[0].A1_COD.trim());
	        	$('#lojaRevenda').val(datasetReturned.values[0].A1_LOJA.trim());
	        	
	        	
	        	if( datasetReturned.values[0].A1_TIPO.trim().toUpperCase() == 'GERENTE' ){
	        		
	        		$('#divZoomRevendedor').show();
	        		this.flGerente = true;
	        	}else{
	        		
	        		//Adiciona classe para ficar centralizado
	        		$("#divNumPedido").addClass("col-md-offset-3");
	        		this.flGerente = false;
	        	}
	        	$('#divCabConsultaPedido').show();
	        	
	        	
	        	
	        }else{
	        	FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});
	        }
	        
	    }else{
	    	FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});
	    }
    	
    },
    
    limpaCampoRevenda : function(){
    	
    	//Vai setar a lojaRevenda como vazio, para poder buscar de todas as lojas
//    	if($('#nomeRevenda').val() == ''){
//    		$('#lojaRevenda').val('');
//    	}
    },
    
    pesquisarPedidos: function(){
    	
    	var that = this;
		var instanceId = that.instanceId;
		
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		
		if (that.myTablePedidos !== null) {
			that.myTablePedidos.destroy();
		}
		
		var codRevenda = $("#codRevenda").val();
		//Se o usuário for Gerente, ele vai poder visualizar todos os pedidod
		var lojaRevenda = (this.flGerente && $('#nomeRevenda').val().trim() == '') ? '' : $("#lojaRevenda").val(); 
		var numPedido = $("#conNumPedido").val();
		var conIdFluig = $("#conIdFluig").val();
		var dataEmissaoDe = $("#conDataEmissaoDe").val();
		var dataEmissaoAte = $("#conDataEmissaoAte").val();
		
		const constraintsConsultaPedidos = [
		            	                   	{
		            					    	"_field": "a1Cod",
		            					    	"_initialValue": codRevenda,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "a1Loja",
		            					    	"_initialValue": lojaRevenda,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "c5Num",
		            					    	"_initialValue": numPedido,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "cjZIdFlui",
		            					    	"_initialValue": conIdFluig,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "c5EmissaoDe",
		            					    	"_initialValue": dataEmissaoDe,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "c5EmissaoAte",
		            					    	"_initialValue": dataEmissaoAte,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    }];
		
		getDataset("dsConsultaPedidos", constraintsConsultaPedidos, function(data){
			
			this.myDataPedidos = [];
			if (data != null && data.content != null && data.content.values.length > 0) {		
				const records = data.content.values;
				
				for ( var index in records) {
    	    		var record = records[index];
    	    		if(record.CODRET.trim() == '1'){
	    	    		icon = '' ;
	    	            if (record.STATUS.trim() == 'RECEBIDO'){
	    	            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/2verde.png' height='30' width='30'  alt='Recebido' title='Recebido' style='margin-top:-3px;' /></div>" ; 
	    	            }
	    	            if (record.STATUS.trim() == 'FATURADO'){
	    	            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/1vermelho.png'  height='30' width='30' alt='Faturado' title='Faturado' style='margin-top:-3px;' /></div>";
	    	            }
	    	            if (record.STATUS.trim() == 'EM SEPARAÇÃO'){
	    	            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/3amarelo.png' height='30' width='30' alt='Em Separação' title='Em Separação' style='margin-top:-3px;' /></div>" ; 
	    	            }
	    	            if (record.STATUS.trim() == 'BLOQUEADO'){
	    	            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/4azul.png' height='30' width='30' alt='Bloqueado' title='Bloqueado' style='margin-top:-3px;' /></div>" ; 
	    	            }
	    	            
	    	            var acoes = '<a data-visualizar_pedido  alt="Vizualizar Pedido" title="Vizualizar Pedido" ><i class="fluigicon fluigicon-search icon-md" style="cursor: pointer;"></i></a>';
	    	            
	    	            var CJ_ZIDFLUIG = (record.CJ_ZIDFLUIG == null) ? '' : record.CJ_ZIDFLUIG;
	    	            
	    	            this.myDataPedidos.push({
	    	            	opcoes : acoes,
	    	            	statusIcon : icon,
	    	            	status : record.STATUS,
	    	            	numPedido: record.C5_NUM,
	                		idFluig: CJ_ZIDFLUIG,
	    	            	filialPedido: record.C5_FILIAL,
	    	            	dataEmissao: record.C5_EMISSAO.trim(),
	    	            	numNota: record.C5_NOTA,
	    	            	chaveNota: record.F2_CHVNFE,
	    	            	tpPedido: record.CJ_ZTPPED,
	    	            	revenda: record.A1_MUN.trim() + ' - ' + record.A1_NOME.trim(),
	    	            	codCondPag: record.C5_CONDPAG,
	    	            	descCondPag: record.E4_DESCRI.trim(),
	    	            	tpFrete: record.C5_TPFRETE.trim(),
	    	            	valFrete: record.C5_FRETE
	    	            });
    	    		}else{
    	    			FLUIGC.toast({message: record.MSGRET.trim() , type: 'danger'});
    	    		}
				}
				
				
				that.myTablePedidos = FLUIGC.datatable('#tabelaPedidos_' + instanceId , {
					dataRequest: this.myDataPedidos,
					renderContent: ['opcoes', 'statusIcon', 'status', 'numPedido', 'idFluig', 'filialPedido', 'dataEmissao', 'numNota', 'chaveNota','tpPedido','revenda', 'codCondPag', 'descCondPag', 'tpFrete', 'valFrete'],
					mobileMainColumns: [0,1,3,4],
					header: [{
						'title': '',
						'size': 'icon-acoes'
					},{
						'title': 'Status',
						'size': 'icon-acoes'
					},{
						'title': 'Status',
						'display': false
					}, {
						'title': 'Nº Pedido',
						'size': 'col-md-1'
					}, {
						'title': 'ID Fluig',
						'size': 'col-md-1'
					}, {
						'title': 'Filial Pedido',
						'display': false
					}, {
						'title': 'Emissão',
						'size': 'col-md-1'
					},{
						'title': 'Nº Nota',
						'size': 'col-md-1'
					},{
						'title': 'Chave Nota',
						'display': false
					},{
						'title': 'Tipo de Pedido',
						'size': 'col-md-2'
					},{
						'title': 'Revenda',
						'size': 'col-md-6'
					},{
						'title': 'Cod. Cond Pgto',
						'display': false
					},{
						'title': 'Desc. Cond Pgto',
						'display': false
					},{
						'title': 'Tp. Frete',
						'display': false
					},{
						'title': 'Val. Frete',
						'display': false
					}],
					
					search: {
						enabled: false,
					},
					scroll: {
						enabled: false
					},
					actions: {
						enabled: false,
					},
					navButtons: {
						enabled: false,
					},
					draggable: {
						enabled: false
					},
				}, function(err, data) {
					if (err) {
						FLUIGC.toast({
							message: err,
							type: 'danger'
						});
					}
				});

			}
		
			setTimeout(function() {
				myLoading.hide();
			}, 500)
		});
        		
        	     		
	},
	
	limparFiltro : function(){
		
		$('#nomeRevenda').val('');
		$('#conNumPedido').val('');
		$('#conIdFluig').val('');
		$('#conDataEmissaoDe').val('');
		$('#conDataEmissaoAte').val('');
		
		var that = this;
		if (that.myTablePedidos !== null) {
			that.myTablePedidos.destroy();
		}
	},
	
	visualizarPedido: function(el, ev){

    	var index = this.myTablePedidos.selectedRows()[0];
    	var selected = this.myTablePedidos.getRow(index);
    	this.detalhesPedido(selected);
	},
	
	detalhesPedido: function(selected,el, ev) {
		
		//Só mostra o botão de imprimir se for gerente, estiver no status em separação e não for no mobile
		if( this.flGerente && (selected.status.trim() == 'EM SEPARAÇÃO' || selected.status.trim() == 'FATURADO') ){
			if(!WCMAPI.isMobileAppMode()){
				$('#divImprimir').show();
			}
		}else{
			$('#divImprimir').hide();
		}
		
		//Dados Cabeçalho
		$("#visNumPedido").val(selected.numPedido);
		$("#visFilialPedido").val(selected.filialPedido);
		$("#visIdFluig").val(selected.idFluig);
		
		$("#visRevenda").val(selected.revenda);
		$("#visTipoPedido").val(selected.tpPedido);
		$("#visDataEmissao").val(selected.dataEmissao);
		
		
		$("#visCondPgto").val(selected.descCondPag);
		switch (selected.tpFrete) {
			case 'C' :
				$("#visTipoFrete").val('CIF');
				break;
			case 'F' :
				$("#visTipoFrete").val('FOB');	
				break;
			case 'T' :
				$("#visTipoFrete").val('Por Conta Terceiros');	
				break;
			case 'R' :
				$("#visTipoFrete").val('Por Conta Remetente');	
				break;
			case 'D' :
				$("#visTipoFrete").val('Por Conta Destinatário');	
				break;
			case 'S' :
				$("#visTipoFrete").val('Sem Frete');	
				break;
			case '' :
				$("#visTipoFrete").val('');	
				break;	
		}
		$("#visValFrete").val(selected.valFrete);	
		$("#visStatus").val(selected.status);
		
		
		//Dados da NF.
		this.dadosNF();
		
		//Dados Itens
		//Se for Gerente, vai buscar dados de Impostos e totais
		if(this.flGerente){
			//Gerente/Administrador busca com valores
			this.detalhesItemPedidoAdministrador(selected.numPedido, selected.filialPedido);
		}else{
			//Balconista não mostra valores
			this.detalhesItemPedidoBalconista(selected.numPedido, selected.filialPedido);
			$('#divTotais').hide();
		}
		
		
		//Esconde tela de busca de pedido
		$("#divCabConsultaPedido").hide();
		
		$('html,body').animate({scrollTop: 0},'slow');
		
	},
	
	detalhesItemPedidoAdministrador: function(numPedido, filialPedido){
		
		var that = this;
		var instanceId = that.instanceId;
		
		var myLoading = FLUIGC.loading(window, {
			textMessage:  'Aguarde! Carregando dados do pedido...'
		});
		myLoading.show();
		
		const constraintsConsultaItensPedido = [
		            	                   	{
		            					    	"_field": "numPedido",
		            					    	"_initialValue": numPedido,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "filialPedido",
		            					    	"_initialValue": filialPedido,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    }];
		
		getDataset("dsConsultaItensPedidoWS", constraintsConsultaItensPedido, function(data){
			
			this.myDataAdministrador = [];
			if (data != null && data.content != null && data.content.values.length > 0) {		
				const records = data.content.values;
        		var cont = 1;
        		
    	    	for ( var index in records) {
    	    		var record = records[index];
    	    		if(record.CODRET.trim() == '1'){
    	    		
    	    			var PRCTOTALIT = record.PRCTOTALIT
	    	            	PRCTOTALIT = PRCTOTALIT.replace(/[^\d,-]/g, '');
	    					PRCTOTALIT = PRCTOTALIT.replace(",", ".");
	    					PRCTOTALIT = parseFloat(PRCTOTALIT);
	    	            
	    				var IPI = record.IPI
	    					IPI = parseFloat(IPI);
	    				
	    				var bolinhaStatusItem = '';
	    				if (record.STATUS_ITM.trim() == 'RECEBIDO'){
	    					bolinhaStatusItem = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/2verde.png' height='30' width='30' title='Recebido' alt='Recebido' style='margin-top:-3px;' /></div>" ; 
	    	            }
	    	            if (record.STATUS_ITM.trim() == 'FATURADO'){
	    	            	bolinhaStatusItem = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/1vermelho.png'  height='30' width='30' title='Faturado' alt='Faturado' style='margin-top:-3px;' /></div>";
	    	            }
	    	            if (record.STATUS_ITM.trim() == 'EM SEPARAÇÃO'){
	    	            	bolinhaStatusItem = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/3amarelo.png' height='30' width='30' title='Em Separação' alt='Em Separação' style='margin-top:-3px;' /></div>" ; 
	    	            }
	    	            if (record.STATUS_ITM.trim() == 'BLOQUEADO'){
	    	            	bolinhaStatusItem = "<div style='text-align:center;'><img src='/ConsultaPedidos/resources/images/4azul.png' height='30' width='30' title='Bloqueado' alt='Bloqueado' style='margin-top:-3px;' /></div>" ; 
	    	            }
	    				
	    	            this.myDataAdministrador.push({
	    	            	statusItem : bolinhaStatusItem,
	    	            	filial: record.C6_FILIAL,
	    	            	item: record.C6_ITEM,
	    	            	codProduto: record.C6_PRODUTO,
	    	            	descProduto: record.B1_ZDESCP,
	    	            	qtdVenda: record.C6_QTDVEN,
	    	            	qtdAFaturar: record.C6_QTAFAT,
	    	            	tes: record.C6_TES,
	    	            	prcVenda: record.PRCVENDA,
	    	            	NCM: record.POSIPINCM,
	    	            	IPI:  formatNumber(record.IPI, 2, 3, '.', ',')  ,
	    	            	AliqIPI:  formatNumber(record.ALIQIPI, 2, 3, '.', ',')  ,
	    	            	ICMS:  formatNumber(record.ICMS, 2, 3, '.', ',') , 
	    	            	AliqICMS:  formatNumber(record.ALIQICMS, 2, 3, '.', ',') , 
	    	            	ICMSRetido:  formatNumber(record.ICMSRET, 2, 3, '.', ',') ,
	    	            	valTotalItem: formatNumber( PRCTOTALIT + IPI , 2, 3, '.', ',')
	    	            	
	    	            });
	    	            
	    	            //O retorno o TOTIPI, TOTICMSRE e TOTNOTA, vai somando item a item, ele não traz o valor final
	    	            //Então, o que eu fiz, foi pegar o último registro e colocar como valor final.
	    	            if(cont === data.content.values.length){
	    	            	
	    	            	var TOTIPI = formatNumber(record.TOTIPI, 2, 3, '.', ',') 
	    	            	var TOTICMSRE = formatNumber(record.TOTICMSRE, 2, 3, '.', ',') 
	    	            	var TOTNOTA = formatNumber(record.TOTNOTA, 2, 3, '.', ',') 
	    	            	
	    	            	$("#visTotalIPI").val(TOTIPI);
	    	            	$("#visTotalICMSRet").val(TOTICMSRE);
	    	            	$("#visTotalPedido").val(TOTNOTA);
	    	            	
	    	            }
	    	            
	    	            cont++;
	    	    	}else{
	    	    		FLUIGC.toast({message: record.MSGRET.trim() , type: 'danger'});
	    	    	}
    	    	}
    	    	
    	    	//Alimenta campos na tabela
    			that.myTableAdministrador = FLUIGC.datatable('#tabelaItensPedidoAdministrador_' + instanceId , {
    				dataRequest: this.myDataAdministrador,
    				renderContent: ['statusItem', 'filial', 'item', 'codProduto','descProduto', 'qtdVenda', 'qtdAFaturar', 'tes', 'prcVenda','NCM', 'IPI','AliqIPI', 'ICMS', 'AliqICMS', 'ICMSRetido', 'valTotalItem'],
    				limit:5,
    				header: [
    				{
    					'title': ' '
    				},{
    					'title': 'Filial',
    					'display': false
    				},{
    					'title': 'Item',
    					'display': false
    				},{
    					'title': 'Código',
    					'size': 'col-md-1'
    				},{
    					'title': 'Produto',
    					'size': 'col-md-3',
    					'standard': true
    				},{
    					'title': 'Quant.',
    					'size': 'col-md-1'
    				},{
    					'title': 'Quant. a Faturar',
    					'size': 'col-md-1'
    				},{
    					'title': 'Tes',
    					'display': false
    				},{
    					'title': 'Preço Custo',
    					'size': 'col-md-1',
    					'display': this.flGerente
    				},{
    					'title': 'NCM',
    					'size': 'col-md-1'
    				},{
    					'title': 'IPI',
    					'size': 'col-md-1',
    					'display': false
    				},{
    					'title': 'IPI',
    					'size': 'col-md-1'
    				},{
    					'title': 'ICMS',
    					'size': 'col-md-1',
    					'display': false
    				},{
    					'title': 'ICMS',
    					'size': 'col-md-1'
    				},{
    					'title': 'ICMS-ST',
    					'size': 'col-md-1'
    				},{
    					'title': 'Total',
    					'size': 'col-md-1'
    				}],
    				
    				
    				search: {
    					enabled: false,
    				},
    				scroll: {
    					enabled: false
    				},
    				actions: {
    					enabled: false,
    				},
    				navButtons: {
    					enabled: false,
    				},
    				draggable: {
    					enabled: false
    				},
    			}, function(err, data) {
    				if (err) {
    					FLUIGC.toast({message: err, type: 'danger'});
    				}
    			});
    	    	
			}
			
			//Mostra a tela do detalhe do pedido
			$("#dadosPedido").fadeIn('5000');
			
			setTimeout(function() {
				myLoading.hide();
			}, 500)
		});
		
	},
	
	detalhesItemPedidoBalconista: function(numPedido, filialPedido){

	    var that = this;
		var instanceId = that.instanceId;
		
		var myLoading = FLUIGC.loading(window, {
			textMessage:  'Aguarde! Carregando dados do pedido...'
		});
		myLoading.show();
		
		const constraintsConsultaItensPedido = [
		            	                   	{
		            					    	"_field": "numPedido",
		            					    	"_initialValue": numPedido,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    },
		            					    {
		            					    	"_field": "filialPedido",
		            					    	"_initialValue": filialPedido,
		            					    	"_finalValue": "",
		            					    	"_type": 1,
		            					    	"_likeSearch": false
		            					    }];
		
		getDataset("dsConsultaItensPedido", constraintsConsultaItensPedido, function(data){
			
			this.myDataBalconista = [];
			if (data != null && data.content != null && data.content.values.length > 0) {		
				const records = data.content.values;
        		
    	    	for ( var index in records) {
    	    		var record = records[index];
    	    		if(record.CODRET.trim() == '1'){
    	    			
    	    			this.myDataBalconista.push({
    		            	filial: record.C6_FILIAL,
    		            	item: record.C6_ITEM,
    		            	codProduto: record.C6_PRODUTO,
    		            	descProduto: record.B1_ZDESCP,
    		            	qtdVenda: record.C6_QTDVEN
    		            	
    		            });
    	    			
	    	    	}else{
	    	    		FLUIGC.toast({message: record.MSGRET.trim() , type: 'danger'});
	    	    	}
    	    	}
			
    	    	
    	    	that.myTableBalconista = FLUIGC.datatable('#tabelaItensPedidoBalconista_' + instanceId , {
    				dataRequest: this.myDataBalconista,
    				renderContent: ['filial', 'item', 'codProduto','descProduto', 'qtdVenda'],
    				
    				limit:5,
    				header: [
    				   {
    					'title': 'Filial',
    					'display': false
    				},{
    					'title': 'Item',
    					'display': false
    				},{
    					'title': 'Código',
    					'size': 'col-md-1'
    				},{
    					'title': 'Produto',
    					'size': 'col-md-3',
    					'standard': true
    				},{
    					'title': 'Quantidade',
    					'size': 'col-md-1'
    				},{
    					'title': 'Tes',
    					'display': false
    				}],
    				
    				search: {
    					enabled: false,
    				},
    				scroll: {
    					enabled: false
    				},
    				actions: {
    					enabled: false,
    				},
    				navButtons: {
    					enabled: false,
    				},
    				draggable: {
    					enabled: false
    				},
    			}, function(err, data) {
    				if (err) {
    					FLUIGC.toast({message: err, type: 'danger'});
    				}
    			});

			}
			
			//Mostra a tela do detalhe do pedido
			$("#dadosPedido").fadeIn('5000');
			
			setTimeout(function() {
				myLoading.hide();
			}, 500)
			
		});
		
	},
	

	dadosNF: function(){
		
		var numPedido = $("#visNumPedido").val();
		var filialPedido = $("#visFilialPedido").val();
		
		var c1 = DatasetFactory.createConstraint('numPedido', numPedido , numPedido, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('filialPedido', filialPedido, filialPedido, ConstraintType.MUST);
		var datasetReturned = DatasetFactory.getDataset("dsConsultaDadosNF", null, new Array(c1,c2), null);
		
	    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	        var records = datasetReturned.values;
	        var cont = 0;
	        console.log(records)
	        for ( var index in records) {
	            var record = records[index];
	            cont++;
	            
	            $('#visNumNota'+cont).val(record.D2_DOC);
	            $('#visDataEmissaoNF'+cont).val(record.F2_EMISSAO);
	            
	            $('#divNumNF'+cont).show();
	            $('#divDtEmissaoNF'+cont).show();
	            
	            
	            if(this.flGerente){
	            	$('#divChaveNotaFiscal'+cont).show();
	            	$('#visChaveNota'+cont).val(record.F2_CHVNFE);
	            }
	            
	        }

	    };
		
		
	},
	
	voltarTela: function(el, ev) {
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		this.limpaTelaPedido();
		$("#dadosPedido").hide();
		$("#divCabConsultaPedido").fadeIn('1500');
		$('html,body').animate({scrollTop: 0},'slow');
		myLoading.hide();
	},
	
	imprimir: function(el, ev) {
		var documentId = 294;
		var companyId = WCMAPI.organizationId;
		var numPed = $("#visNumPedido").val();
		var filial = $("#visFilialPedido").val();
		
		var link = "/webdesk/streamcontrol/?WDCompanyId=" + companyId + "&WDParentDocumentId=" + documentId + "&numPed=" + numPed+ "&filial=" + filial;
		window.open(link , "Pedido", "height=700,width=700");
	},
	
	limpaTelaPedido: function(el, ev) {
		$('#visNumPedido').val('');
		$('#visIdFluig').val('');
		$('#visTipoPedido').val('');
		$('#visRevenda').val('');
		$('#visDataEmissao').val('');
		$('#visCondPgto').val('');
		$('#visTipoFrete').val('');
		$('#visValFrete').val('');
		$('#visStatus').val('');
		$('#visNumNota1').val('');
		$('#visDataEmissaoNF1').val('');
		$('#visChaveNota1').val('');
		$('#visNumNota2').val('');
		$('#visDataEmissaoNF2').val('');
		$('#visChaveNota2').val('');
		$('#divNumNF2').hide();
        $('#divDtEmissaoNF2').hide();
        $('#divChaveNotaFiscal2').hide();
		$('#visNumNota3').val('');
		$('#visDataEmissaoNF3').val('');
		$('#visChaveNota3').val('');
		$('#divNumNF3').hide();
        $('#divDtEmissaoNF3').hide();
        $('#divChaveNotaFiscal3').hide();
		
	}
});

/**
 * formatNumber(number, n, x, s, c)
 * 
 * @param number: numero que se deseja formatar
 * @param integer n: quantidade de casas decimais
 * @param integer x: quantidade de casas milhar
 * @param mixed   s: separador de milhar
 * @param mixed   c: separador decimal
 */
function formatNumber(number, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = parseFloat(number).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}