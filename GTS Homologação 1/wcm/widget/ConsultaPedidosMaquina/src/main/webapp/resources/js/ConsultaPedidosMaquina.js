var ConsultaPedidosMaquina = SuperWidget.extend({
    
    myTable: null,
    mydata: [],
    tableData: null,
	loading : FLUIGC.loading("#wcm-content"),
    
    //método iniciado quando a widget é carregada
    init: function() {
    	
    	if (!this.isEditMode) {
    		$('.pageTitle').parent().hide();
    		
    		//Data Emissão De 60 dias antes de hoje
    		//Data Emissão Até Data de hoje
			var dataEmissaoDe = new Date();
			dataEmissaoDe.setDate(dataEmissaoDe.getDate() - 60);
			var dataEmissaoAte = new Date();
    		
			var conDataEmissaoDe = FLUIGC.calendar('#conDataEmissaoDe',{
    			language: 'pt-br',
    		});
    		var conDataEmissaoAte = FLUIGC.calendar('#conDataEmissaoAte',{
				language: 'pt-br'
			});
    		conDataEmissaoDe.setDate(dataEmissaoDe);
    		conDataEmissaoAte.setDate(dataEmissaoAte);
    		
			this.carregaTipoUsuario();
			
			if(WCMAPI.isMobileAppMode()){
				//Se for mobile, aparece um voltar no fim da tela
				$('#voltarTelaBottom').show();
			}
    	}
    	
    },
  
    //BIND de eventos
    bindings: {
        local: {
        	'pesquisar_pedidos': ['click_pesquisarPedidos'],
        	'limpar_filtro': ['click_limparFiltro'],
        	'visualizar_pedido': ['click_visualizarPedido'],
        	'baixar_nota': ['click_baixarNota'],
        	'voltar_tela': ['click_voltarTela']
        },
    },
    
    
    carregaTipoUsuario : function(){
    	
    	/**
		 * 
		 * Agora verifica qual o tipo de usuário é: 
		 * Gestor Territorial, 
		 * Representante Nacional, 
		 * Representante Exportação, 
		 * Revenda,
		 * Gestor Comercial, 
		 * Administrativo GTS
		 *
		 */
    	
    	const matricula = WCMAPI.userCode;
    	const companyId = WCMAPI.organizationId;
    	$('#conCompanyId').val(companyId);
    	$('#conMatricula').val(matricula);
    	
    	/**
		 * Primeira Verificação: Gestor Territorial
		 * 
		 * Se o usuário estiver aqui, ele é um Gestor Territorial
		 * Verifica se o usuário que está abrindo a solicitação está no papel de GestorTerritorial1 , GestorTerritorial2, ou GestorTerritorial3
		 * Se o usuário estiver nesses grupos, é entendido que ele é um Gestor Territorial
		 */
		var constEhPapelTer1 = DatasetFactory.createConstraint('gesTerWKUser', matricula, matricula, ConstraintType.MUST);
		var constEhPapelTer = new Array(constEhPapelTer1);
		var dsColleagueRoleGestorTerritorial = DatasetFactory.getDataset('dsGestorTerritorial', null, constEhPapelTer, null);
		
		if(dsTemValor(dsColleagueRoleGestorTerritorial)){
			
			$('#conTipoUsuario').val('GestorTerritorial');
			$('#conTipoUsuarioDesc').val('Gestor Territorial');
			$('#divCabConsultaPedido').show();
			
		}else{
			/**
			 * Segunda verificação: Representante Nacional
			 * 
			 * Se o usuário estiver em algum grupo do tipo Territorial1, Territorial2, Territorial3, Territorial4 ou Territorial5
			 * É entendido que quem está abrindo a solcitação é um Representante Nacional
			 * 
			 * 
			 * Achando o Representante Nacional, já é realizada a busca do Gestor Territorial dele,
			 * já que é retornado em qual grupo Territorial está o representante
			 * buscando o papel de Gestor Territorial daquele grupo
			 */
			var achouGrupoNacional = false;
			for ( var i = 1; i <= 5; i++) {
				if(!achouGrupoNacional){
					//Dataset para verificar em qual grupo Territorial está o usuário Representante Nacional
					var nomeGrupoTerritorial = "Territorial" + i;
					var constrainsTer1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST);
					var constrainsTer2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoTerritorial, nomeGrupoTerritorial, ConstraintType.MUST);
					var constrainsTer3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);
					var constraintsTer = new Array(constrainsTer1, constrainsTer2, constrainsTer3);
					
					var dsGruposTer = DatasetFactory.getDataset("colleagueGroup", null, constraintsTer, null);
					if(dsTemValor(dsGruposTer)){
						
						//É um representante Nacional
						achouGrupoNacional = true;
						$('#conTipoUsuario').val('RepresentanteNacional');
						$('#conTipoUsuarioDesc').val('Representante Nacional');
						$('#divCabConsultaPedido').show();
						
					}
				}
			}
			
			
			//Se não achou no Nacional , dentro dos grupos de Territorial, vai procurar no grupo Exportacao1
			/**
			 * Terceira Verificação: Representante Exportação
			 * 
			 * Se não achou como um Representante Nacional, vai buscar como um Representante Exportação
			 * 
			 * Vai verificar se o usuário que está abrindo a solicitação, está em algum grupo do tipo Exportacao1
			 * É entendido que quem está abrindo a solcitação é um Representante Exportação
			 * 
			 * Achando o Representante Exportação, já é realizada a busca do Gestor Comercial dele,
			 * É buscado quem é o GertorComercial do grupo Exportacao1
			 */
			if(!achouGrupoNacional){
				//Se for Gestor Representante Internacional
				var achouGrupoExportacao = false;
				
				var nomeGrupoExportacao = "Exportacao1";
				var constrainsExp1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST);
				var constrainsExp2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", nomeGrupoExportacao, nomeGrupoExportacao, ConstraintType.MUST);
				var constrainsExp3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);
				var constraintsExp = new Array(constrainsExp1, constrainsExp2, constrainsExp3);
				
				var dsGruposExp = DatasetFactory.getDataset("colleagueGroup", null, constraintsExp, null);
				if(dsTemValor(dsGruposExp)){
					//É um representante Exportação
					achouGrupoExportacao = true;
					$('#conTipoUsuario').val('RepresentanteExportacao');
					$('#conTipoUsuarioDesc').val('Representante Exportação');
					$('#divCabConsultaPedido').show();
					
				}
			}
			
			
			/**
			 * Quarta Verificação: Revenda
			 * 
			 * Se ainda não achou como Gestor Territorial, Representante Nacional ou Representante Exportação
			 * Vai verificar se é uma Revenda
			 * 
			 * Primeiro, precisa estar no grupo revendaMaquina
			 * Depois puxa o código e loja que estão nos dados adicionais da revenda.
			 * Com o código e loja, é buscado lá no Protheus, quem é o Representante desta revenda.
			 * Encontrato o Representante, é buscado o Gestor Territorial deste Representante
			 */
			var achouRevendaMaquina = false;
			if(!achouGrupoNacional && !achouGrupoExportacao){
				
				//Primeiro busca se o usuário solicitante está no grupo revendaMaquina
				var constrainsRev1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST);
				var constrainsRev2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "revendaMaquina", "revendaMaquina", ConstraintType.MUST);
				var constrainsRev3 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);
				var constraintsRev = new Array(constrainsRev1, constrainsRev2, constrainsRev3);
				
				var dsGruposRevMaq = DatasetFactory.getDataset("colleagueGroup", null, constraintsRev, null);
				if(dsTemValor(dsGruposRevMaq)){
					//É uma RevendaMaquina
					achouRevendaMaquina = true;
					
					$('#conTipoUsuario').val('Revenda');
					$('#conTipoUsuarioDesc').val('Revenda');
					
					//Estando no grupo revendaMaquina, busca o A1_COD e A1_LOJA nos dados adicionais
					var dsDadosAdicionais = DatasetFactory.getDataset("dsClienteViaDadosAdicionais", null, null, null);
					
					if(dsTemValor(dsDadosAdicionais)){
						
					    if( dsDadosAdicionais.values[0].A1_COD != '' && dsDadosAdicionais.values[0].A1_COD !== undefined && dsDadosAdicionais.values[0].A1_COD != 'undefined' &&
					    	dsDadosAdicionais.values[0].A1_LOJA != '' && dsDadosAdicionais.values[0].A1_LOJA !== undefined && dsDadosAdicionais.values[0].A1_LOJA != 'undefined' ){ 
					    	
				        	$('#conCodRevenda').val(dsDadosAdicionais.values[0].A1_COD.trim());
				        	$('#conLojaRevenda').val(dsDadosAdicionais.values[0].A1_LOJA.trim());
				        	$('#divCabConsultaPedido').show();
				        	
						} else{
							//Se não encontrou o código e loja nos dados adicionais
							FLUIGC.toast({message: 'Os dados adicionais do seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});
							$('#divCabConsultaPedido').hide();
							
						}
					}
				}
			}
			
			/**
			 * Quinta Verificação: Gestor Comercial
			 * 
			 * Se ainda não achou como Gestor Territorial, Representante Nacional, Representante Exportação ou Revenda
			 * Vai verificar se é uma Gestor Comercial
			 * 
			 */
			var achouGestorComercial = false;
			if(!achouGrupoNacional && !achouGrupoExportacao && !achouRevendaMaquina){
				
				var constrainsGesCom1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", companyId, companyId, ConstraintType.MUST);
				var constrainsGesCom2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "GestorComercial1", "GestorComercial1", ConstraintType.MUST);
				var constrainsGesCom3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", matricula, matricula, ConstraintType.MUST);
				var constrainsGesCom = new Array(constrainsGesCom1, constrainsGesCom2, constrainsGesCom3);
				
				var dsPapelGestorComercial = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsGesCom, null);
				if(dsTemValor(dsPapelGestorComercial)){
					//Se não achou como GestorTerritorial ou RepresentanteNacional ou RepresentanteExportacao, Revenda Máquina é um AdministrativoGTS
					achouGestorComercial = true;
					$('#conTipoUsuario').val('GestorComercial');
					$('#conTipoUsuarioDesc').val('Gestor Comercial');
					$('#divCabConsultaPedido').show();
					
				}
				
			}
			/**
			 * Sexta Verificação: AdministrativoGTS
			 * 
			 * Se não encontrou em nenhuma etapa acima, verifica se é AdministrativoGTS
			 * 
			 */ 
			var achouPapelPedMaqAdmGTS = false;
			if(!achouGrupoNacional && !achouGrupoExportacao && !achouRevendaMaquina && !achouGestorComercial){
				
				var constrainsPedMaqAdmGTS1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", companyId, companyId, ConstraintType.MUST);
				var constrainsPedMaqAdmGTS2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "cadastraPedidoDeMaquinaAdmGTS", "cadastraPedidoDeMaquinaAdmGTS", ConstraintType.MUST);
				var constrainsPedMaqAdmGTS3 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", matricula, matricula, ConstraintType.MUST);
				var constrainsPedMaqAdmGTS = new Array(constrainsPedMaqAdmGTS1, constrainsPedMaqAdmGTS2, constrainsPedMaqAdmGTS3);
				
				var dsPapelPedMaqAdmGTS = DatasetFactory.getDataset("workflowColleagueRole", null, constrainsPedMaqAdmGTS, null);
				if(dsTemValor(dsPapelPedMaqAdmGTS)){
					//Se não achou como GestorTerritorial ou RepresentanteNacional ou RepresentanteExportacao, Revenda Máquina é um AdministrativoGTS
					achouPapelPedMaqAdmGTS = true;
					$('#conTipoUsuario').val('AdministrativoGTS');
					$('#conTipoUsuarioDesc').val('Administrativo GTS');
					$('#divCabConsultaPedido').show();
					
				}
			}
			
			
			if(!achouGrupoNacional && !achouGrupoExportacao && !achouRevendaMaquina && !achouGestorComercial && !achouPapelPedMaqAdmGTS){
				//Se não encontrou o código e loja nos dados adicionais
				FLUIGC.toast({message: 'O seu usuário não está configurado corretamente. Entre em contato com o administrador do sistema!', type: 'danger'});
				$('#divCabConsultaPedido').hide();
			}
		}
    
		
    },
    
    
    pesquisarPedidos: function(){
    	
    	$('#tabelaPedidos').show();
    	this.loadData();
    	
	},
	
	limparFiltro : function(){
		
		$('#conNumPedidoFluig').val('');
		$('#conNumPedidoInterno').val('');
		
		//Data Emissão De 60 dias antes de hoje
		//Data Emissão Até Data de hoje
		var dataEmissaoDe = new Date();
		dataEmissaoDe.setDate(dataEmissaoDe.getDate() - 60);
		var dataEmissaoAte = new Date();
		
		var conDataEmissaoDe = FLUIGC.calendar('#conDataEmissaoDe',{
			language: 'pt-br',
		});
		var conDataEmissaoAte = FLUIGC.calendar('#conDataEmissaoAte',{
			language: 'pt-br'
		});
		conDataEmissaoDe.setDate(dataEmissaoDe);
		conDataEmissaoAte.setDate(dataEmissaoAte);
		
		$('#conSituacao').val('');
		
//		$("#tabelaPedidos").hide();
//		$("#dadosPedido").hide();
		
		var that = this;
		that.myTable.destroy();
	},
	
	loadData: function(){
		
		var that = this;
		
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		
		var constraintsConsultaPedidos = this.createConstraintsConsultaPedidos();
		    
		//Verifica a quantidade de filtros selecionados
	    var contConstraints = 0;
		for( var index in constraintsConsultaPedidos) {
	    	if( constraintsConsultaPedidos[index]._initialValue != "" 
	    		&& (constraintsConsultaPedidos[index]._field != "matricula" && constraintsConsultaPedidos[index]._field != "tipoUsuario") ){
	    		contConstraints++;
	    	}
	    }
	    if (contConstraints == 0) {
	        FLUIGC.toast({message: 'É obrigatório selecionar ao menos um filtro!',type: 'warning'});
	        $('#tabelaPedidos').hide();
	        myLoading.hide();
	        return false;
	    }
		 

		getDataset("dsPedMaqConsultaPedidos", constraintsConsultaPedidos, function(data){
			this.mydata = [];
			
			if (data != null && data.content != null && data.content.values.length > 0) {		
	    		const records = data.content.values;
	    		
	    		for( var index in records) {
	    			var record = records[index];
	    			
		            if(record.CODRET.trim() == '1'){
			            icon = '' ;
			            if (record.status.trim() == 'Vazio'){
			            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidosMaquina/resources/images/bola-branca.png' height='30' width='30' alt='Vazio' title='Vazio' style='margin-top:-3px;' /></div>" ; 
			            }
			            if (record.status.trim() == 'Início OP'){
			            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidosMaquina/resources/images/bola-cinza.png' height='26' width='26' alt='Início OP' title='Início OP' style='margin-top:-3px;' /></div>";
			            }
			            if (record.status.trim() == 'Montagem'){
			            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidosMaquina/resources/images/bola-verde.png' height='30' width='30' alt='Montagem' title='Montagem' style='margin-top:-3px;' /></div>" ; 
			            }
			            if (record.status.trim() == 'Teste'){
			            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidosMaquina/resources/images/bola-amarela.png' height='30' width='30' alt='Teste' title='Teste' style='margin-top:-3px;' /></div>" ; 
			            }
			            if (record.status.trim() == 'Finalizada'){
			            	icon = "<div style='text-align:center;'><img src='/ConsultaPedidosMaquina/resources/images/bola-azul.png' height='30' width='30' alt='Finalizada' title='Finalizada' style='margin-top:-3px;' /></div>" ; 
			            }
			            
		
			            var acoes = '<a data-visualizar_pedido alt="Vizualizar Pedido" title="Vizualizar Pedido" ><i class="fluigicon fluigicon-search icon-md" style="cursor: pointer;"></i></a>';
			        	
			            this.mydata.push({
			            	'' : acoes,
			            	'Status' : icon,
			            	'Status Descrição' : record.status,
			            	'Id Fluig': record.idFluig,
			            	'Nº Pedido': record.numPedido,
			            	'Filial Pedido': record.filialPedido,
			            	'Qtd.': record.quantidade,
			            	'Cod. Produto': record.codProduto,
			            	'Desc. Produto': record.descProduto,
			            	'Cond. Pagamento': record.condPagto,
			            	'Liberação Financeria': record.libFinanceira,
			            	'Nº Série': record.numSerie,
			            	'Data Emissão': record.dataEmissao,
			            	'Tipo Frete': record.tpFrete,
			            	'Valor Frete': record.valFrete,
			            	'Prev. Entrega': record.prevEntrega,
			            	'Prev. Início Produção': record.prevIniProducao,
			            	'Valor Venda': record.valVenda,
			            	'Valor Total': record.valTotal,
			            	'Revendedor': record.revendedor,
			            	'Representante': record.representante,
			            	'Gestor Territorial': record.gestorTerritorial,
			            	'Cliente': record.clienteNome,
			            	'CPF/CNPJ Cliente': record.clienteCpfCnpj,
			            	'Inscrição Estadual': record.clienteIE,
			            	'Nota Fiscal': record.numNota,
			            	'Chave NF': record.chaveNF,
			            	'Data Emissão NF': record.dataEmissaoNF,
			            	'Observação': record.observacao
			            	
			            });
			            
		        	}else{
		        		FLUIGC.toast({message: record.MSGRET.trim() , type: 'warning'});
		        	}
	    		}
			}
			
			
			//Início loadTable principal
			var instanceId = that.instanceId;

			that.myTable = FLUIGC.datatable('#tabelaPedidos_' + instanceId , {
				dataRequest: this.mydata,
				renderContent: [
				                ''
				                ,'Status'
				                ,'Status Descrição'
				                ,'Id Fluig'
				                ,'Nº Pedido'
				                ,'Filial Pedido'
				                ,'Qtd.'
				                ,'Cliente'
				                ,'Cod. Produto'
				                ,'Desc. Produto'
				                ,'Cond. Pagamento'
				                ,'Liberação Financeria'
				                ,'Nº Série'
				                ,'Data Emissão'
				                ,'Tipo Frete'
				                ,'Valor Frete'
				                ,'Prev. Entrega'
				                ,'Prev. Início Produção'
				                ,'Valor Venda'
				                ,'Valor Total'
				                ,'Revendedor'
				                ,'Representante'
				                ,'Gestor Territorial'
				                ,'CPF/CNPJ Cliente'
				                ,'Inscrição Estadual'
				                ,'Nota Fiscal'
				                ,'Chave NF'
				                ,'Data Emissão NF'
				                ,'Observação'
				                ],
				mobileMainColumns: [0,1,3,4,7,8,9,12,13,17,26],
				header: [{
					'title': '',
					'size': 'th-icon-acoes'
				},{
					'title': 'Status',
					'size': 'th-icon-acoes'
				},{
					'title': 'Status Descrição',
					'display': false
				}, {
					'title': 'Id Fluig',
					'size': 'th-id-fluig'
				}, {
					'title': 'Nº Pedido',
					'size': 'th-num-pedido'
				}, {
					'title': 'Filial Pedido',
					'display': false
				},{
					'title': 'Qtd.',
					'display': false
				}, {
					'title': 'Cliente',
					'size': 'col-md-3'
				}, {
					'title': 'Cod. Produto',
					'size': 'col-md-1'
				}, {
					'title': 'Desc. Produto',
					'size': 'col-md-4'
				}, {
					'title': 'Cond. Pagamento',
					'display': false
				}, {
					'title': 'Liberação Financeria',
					'display': false
				}, {
					'title': 'Nº Série',
					'size': 'col-md-1',
					'display': false
				}, {
					'title': 'Data Emissão',
					'size': 'col-md-1'
				}, {
					'title': 'Tipo Frete',
					'display': false
				}, {
					'title': 'Valor Frete',
					'display': false
				}, {
					'title': 'Prev. Entrega',
					'display': false
				}, {
					'title': 'Prev. Início Produção',
					'size': 'col-md-1'
				}, {
					'title': 'Valor Venda',
					'display': false
				}, {
					'title': 'Valor Total',
					'display': false
				}, {
					'title': 'Revendedor',
					'display': false
				}, {
					'title': 'Representante',
					'display': false
				}, {
					'title': 'Gestor Territorial',
					'display': false
				}, {
					'title': 'CPF/CNPJ Cliente',
					'display': false
				}, {
					'title': 'Inscrição Estadual',
					'display': false
				}, {
					'title': 'Nota Fiscal',
					'size': 'col-md-1'
				}, {
					'title': 'Chave NF',
					'display': false
				}, {
					'title': 'Data Emissão NF',
					'display': false
				}, {
					'title': 'Observação',
					'display': false
				}],
				
				search: {
					enabled: false,
					onlyEnterkey: false,
					searchAreaStyle: 'col-md-6',
					onSearch: function(res) {
						that.myTable.reload(that.tableData);
						if (res) {
							var data = that.myTable.getData();
							var search = data.filter(function(el) {
								return (el.num.toUpperCase().indexOf(res.toUpperCase()) >= 0)||(el.nomecli.toUpperCase().indexOf(res.toUpperCase()) >= 0)||(el.cliente.toUpperCase().indexOf(res.toUpperCase()) >= 0);
							});
							that.myTable.reload(search);
						}
					}
				},
				scroll: {
					target: "#tabelaPedidos",
					enabled: true
				},
				actions: {
					enabled: false,
					template: '.mydatatable-template-row-area-buttons',
					actionAreaStyle: 'col-md-6'
				},
				navButtons: {
					enabled: false,
					//forwardstyle: 'btn-warning',
					//backwardstyle: 'btn-warning',
				},
				draggable: {
					enabled: false
				},
				//classSelected: 'info',
			}, function(err, data) {
				if (err) {
					FLUIGC.toast({
						message: err,
						type: 'danger'
					});
				}
			});

			that.myTable.on('fluig.datatable.loadcomplete', function() {
				if (!that.tableData) {
					that.tableData = that.myTable.getData();
				}
			});
			
			//Fim loadTable principal
			
			//Oculta aquela setinha que aparece no mobile do lado do primeiro item da tabela
			$('.fluigicon-pointer-right').hide();
			//Oculta a opção de selecionar colunas da tabela no mobile
			$('#tabelaPedidos_' + instanceId + ' .text-right button' ).hide();
			
			setTimeout(function() {
				myLoading.hide();
			}, 500)
			
		});
	},
	
	createConstraintsConsultaPedidos : function(){
		
		// ===============================
	    // Campos
	    // ===============================
		var matricula = $("#conMatricula").val();
		var tipoUsuario = $("#conTipoUsuario").val();
		var conNumPedidoFluig = $("#conNumPedidoFluig").val();
		var conNumPedidoInterno = $("#conNumPedidoInterno").val();
		var conDataEmissaoDe = $("#conDataEmissaoDe").val().trim();
		var conDataEmissaoAte = $("#conDataEmissaoAte").val().trim();
		var conSituacao = $("#conSituacao").val();
		//conSituacao
		//1-Em Aberto (pedido que nao tem NF e estiver com liberado)
        //2-Faturado (tem NF)                                                 
        //3-Finalizado (busca da H6 quando tem data fim)
        
		if(conDataEmissaoDe != ''){
			if(conDataEmissaoDe.indexOf("/") !== -1){
				let arrConDataEmissaoDe = conDataEmissaoDe.split("/");	
				conDataEmissaoDe = arrConDataEmissaoDe[2] + '' + arrConDataEmissaoDe[1] + '' +  arrConDataEmissaoDe[0];
			}
		}
		
		if(conDataEmissaoAte != ''){
			if(conDataEmissaoAte.indexOf("/") !== -1){
				let arrConDataEmissaoAte = conDataEmissaoAte.split("/");	
				conDataEmissaoAte = arrConDataEmissaoAte[2] + '' + arrConDataEmissaoAte[1] + '' +  arrConDataEmissaoAte[0];
			}
		}
		
		// ===============================
	    // Condições
	    // ===============================
	    const constraintsConsultaPedidos = [
	                   	{
					    	"_field": "matricula",
					    	"_initialValue": matricula,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    },
					    {
					    	"_field": "tipoUsuario",
					    	"_initialValue": tipoUsuario,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    },
					    {
					    	"_field": "conNumPedidoFluig",
					    	"_initialValue": conNumPedidoFluig,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    },
					    {
					    	"_field": "conNumPedidoInterno",
					    	"_initialValue": conNumPedidoInterno,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    },
					    {
					    	"_field": "conDataEmissaoDe",
					    	"_initialValue": conDataEmissaoDe,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    },
					    {
					    	"_field": "conDataEmissaoAte",
					    	"_initialValue": conDataEmissaoAte,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    },
					    {
					    	"_field": "conSituacao",
					    	"_initialValue": conSituacao,
					    	"_finalValue": "",
					    	"_type": 1,
					    	"_likeSearch": false
					    }
	                   	];
	    
	    return constraintsConsultaPedidos;
	},
	
	//LOADTABLE2 É O ITEM DO PEDIDO
	loadTable2: function(selected) {
		
		this.loadData2(selected);
		var that = this;
	    var instanceId = that.instanceId;

		that.myTable2 = FLUIGC.datatable('#tabelaItensPedido_' + instanceId , {
			dataRequest: this.mydata2,
			renderContent: ['Qtd.', 'Cod. Produto','Desc. Produto', 'Nº Série', 'Previsão de Entrega', 'Previsão Início de Produção', 'Preço Venda', 'Valor Frete'],
			mobileMainColumns: [0,1,2,3,4,5,6,7],
			header: [
			{
				'title': 'Qtd.'
			},{
				'title': 'Cod. Produto',
				'size': 'col-md-1'
			},{
				'title': 'Desc. Produto',
				'size': 'col-md-5',
				'standard': true
			},{
				'title': 'Nº Série',
				'size': 'col-md-1',
				'display': false
			},{
				'title': 'Previsão de Entrega',
				'size': 'col-md-2',
			},{
				'title': 'Previsão Início de Produção',
				'size': 'col-md-2'
			},{
				'title': 'Preço Venda',
				'size': 'col-md-1',
			},{
				'title': 'Valor Frete',
				'size': 'col-md-1',
				'display': false
			}],
			multiSelect: false,
			search: {
				enabled: false
			},
			scroll: {
				enabled: false
			},
			actions: {
				enabled: false
			},
			navButtons: {
				enabled: false
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
		
		that.myTable.on('fluig.datatable.loadcomplete', function() {
			if (!that.tableData) {
				that.tableData = that.myTable.getData();
			}
		});
		
		
		//Oculta aquela setinha que aparece no mobile
		$('.fluigicon-pointer-right').hide();
		//Oculta a opção de selecionar colunas da tabela no mobile
		$('#tabelaItensPedido_' + instanceId + ' .text-right button' ).hide();
	},
	
	//LOAD TABLE 2 É O LOAD DE VISUALIZAÇÃO
	loadData2: function(selected){
		var that = this;
		
		this.mydata2 = [];
		
		this.mydata2.push({
			'Qtd.' : selected['Qtd.'],
			'Cod. Produto' : selected['Cod. Produto'],
			'Desc. Produto' : selected['Desc. Produto'],
			'Nº Série' : selected['Nº Série'],
			'Previsão de Entrega' : selected['Prev. Entrega'],
			'Previsão Início de Produção' : selected['Prev. Início Produção'],
			'Preço Venda' : selected['Valor Venda'],
			'Valor Frete' : selected['Valor Frete']
        });
	},
	
	
	visualizarPedido: function(el, ev){

    	var index = this.myTable.selectedRows()[0];
    	var selected = this.myTable.getRow(index);
    	this.detalhesPedido(selected);
    	
	},
	
	detalhesPedido : function(selected,el, ev) {
		
		$("#idFluigHref").attr("href", WCMAPI.serverURL + "/portal/p/GTS/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+selected['Id Fluig']);
		//Dados Cabeçalho
		$("#visIdFluig").val(selected['Id Fluig']);
		$("#visNumPedidoInterno").val(selected['Nº Pedido']);
		$("#visFilialPedidoInterno").val(selected['Filial Pedido']);
		$("#visDataEmissao").val(selected['Data Emissão']);
		$("#visStatusMaquina").val(selected['Status Descrição']);
		$("#visLibFinanceira").val(selected['Liberação Financeria']);
		$("#visTipoFrete").val(selected['Tipo Frete']);

		$("#visRevendedor").val(selected['Revendedor']);
		$("#visRepresentante").val(selected['Representante']);
		$("#visGestorTerritorial").val(selected['Gestor Territorial']);

		$("#visClienteNome").val(selected['Cliente']);
		$("#visClienteCpfCnpj").val(selected['CPF/CNPJ Cliente']);
		$("#visClienteIE").val(selected['Inscrição Estadual']);
		$("#visCondPagto").val(selected['Cond. Pagamento']);
		$("#visNumNota").val(selected['Nota Fiscal']);
		$("#visDataEmissaoNF").val(selected['Data Emissão NF']);
		$("#visChaveNF").val(selected['Chave NF']);

		$("#visObservacao").val(selected['Observação']);

		this.detalhesItemPedido(selected);
		
		$("#visTotalPedido").val(selected['Valor Total']);

		//Show-Hide Informações 
//		$("#divCabConsultaPedido").fadeOut('5000');
		$("#divCabConsultaPedido").hide();
		$("#dadosPedido").fadeIn('5000');
		
		$('html,body').animate({scrollTop: 0},'slow');
		
	},
	
	detalhesItemPedido: function(selected){
		
		this.loadTable2(selected);
		
	},
	
	baixarNota : function(){
    	const visChaveNF = $('#visChaveNF').val().trim();
    	
    	if(visChaveNF != ''){
    		window.open('https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=resumo&tipoConteudo=7PhJ+gAVw2g=&nfe='+visChaveNF);
    	}else{
    		FLUIGC.toast({
    	        title: '',
    	        message: "Chave da nota fiscal está inválida.",
    	        type: 'warning'
    	    });
    	}
    },
	    
	voltarTela:function(el, ev) {
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		this.limpaTelaPedido();
//		$("#dadosPedido").fadeOut('1500');
		$("#dadosPedido").hide();
		$("#divCabConsultaPedido").fadeIn('1500');
		$('html,body').animate({scrollTop: 0},'slow');
		myLoading.hide();
	},
	
	limpaTelaPedido:function(el, ev) {
		$('#visIdFluig').val('');
		$('#visNumPedidoInterno').val('');
		$('#visFilialPedidoInterno').val('');
		$('#visDataEmissao').val('');
		$('#visStatusMaquina').val('');
		$('#visLibFinanceira').val('');
		$('#visTipoFrete').val('');
		$('#visRevendedor').val('');
		$('#visRepresentante').val('');
		$('#visGestorTerritorial').val('');
		$('#visCliente').val('');
		$('#visNumNota').val('');
		$('#visDataEmissao').val('');
		$('#visChaveNF').val('');
		$('#visObservacao').text('');
		
	}
});

