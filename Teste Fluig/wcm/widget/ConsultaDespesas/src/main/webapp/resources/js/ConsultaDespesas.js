var ConsultaDespesas = SuperWidget.extend({
   
	myTable: null,
    myData: [],
    tableData: null,
    
    init: function () {
        
    	if (!this.isEditMode) {
    		$('.pageTitle').parent().hide();
    		
    		$('#divCabConsultaDespesas').show();
    		var today = new Date();
    		var conDataEmissaoDe = FLUIGC.calendar('#conDataEmissaoNota',{
    			language: 'pt-br',
    			maxDate : today,
    			pickDate : true,
    			pickTime : false,
    			defaultDate : today

    			});
    	}
    	
    	    	
    },

    bindings: {
        local: {
            'consulta_num_fluig': ['change_consultarDespesas'],
            'data-consulta_num_nota': ['change_consultarDespesas'],
            'consultar_despesas': ['click_consultarDespesas'],
		    'limpar_filtro': ['click_limparFiltro']
        }
    },
    
    consultarDespesas: function(){
    	
    	$('#tabelaDespesas').show();
    	this.loadDespesas();
    	
    },
    
    limparFiltro: function(){
    	
    	$('#conNumFluig').val('');
    	$('#conNumNotalFiscal').val('');
    	
    	
    	var that = this;
		that.myTable.destroy();
    	
    },
    
    loadDespesas: function(){
    	
    	var that = this;
		
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		
		var constraintsConsultaDespesas = this.createConstraintsConsultaDespesas();
	    
		
		getDataset("dsFormReembolsoDespesa", constraintsConsultaDespesas, function(data){
			this.myData = [];
			
			console.log('data-ConsultaDespesas')
			console.log(data)
			
			if (data != null && data.content != null && data.content.values.length > 0) {		
	    		const records = data.content.values;
	    		
	    		for( var index in records) {
	    			var record = records[index];
	    			
//		            if(record.CODRET.trim() == '1'){
			                        
			            this.myData.push({
			            	'Id Fuig' : record.numFluig,
			            	'Nome Solicitante' : record.solNomeSolicitante,
			            	'E-mail Solicitante' : record.solEmailSolicitante,
			            	'Telefone': record.solTelefone,
			            	'Nº Nota':record.solNumNotaFiscal
			            	
			            });
			            
//		        	}else{
//		        		FLUIGC.toast({message: record.MSGRET.trim() , type: 'warning'});
//		        	}
	    		}
			}
			
		
			
			//Início loadTable principal
			var instanceId = that.instanceId;

			that.myTable = FLUIGC.datatable('#tabelaDespesas_' + instanceId , {
				dataRequest: this.myData,
				renderContent: [
				                'Id Fuig'
				                ,'Nome Solicitante'
				                ,'E-mail Solicitante'
				                ,'Telefone'
				                ,'Nº Nota'
				                ],
				mobileMainColumns: [0,1,2,3,4],
				header: [ {
					'title': 'Id Fuig',
					'size': 'col-md-1'
				},      
				   {
					'title': 'Nome Solicitante',
					'size': 'col-md-3'
				}, {
					'title': 'E-mail Solicitante',
					'size': 'col-md-3'
				}, {
					'title': 'Telefone',
					'size': 'col-md-1'
				},
				{
					'title': 'Nº Nota',
					'size': 'col-md-1'
				}],
				
				search: {
					enabled: false,
				},
				scroll: {
					enabled: true,
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
			$('#tabelaDespesas_' + instanceId + ' .text-right button' ).hide();
			
			setTimeout(function() {
				myLoading.hide();
			}, 500)
			
		});
    	
    },
    
    createConstraintsConsultaDespesas : function(){
		
		// ===============================
	    // Campos
	    // ===============================
		var conNumFluig = $("#conNumFluig").val();
		var conNumNota = $("#conNumNotalFiscal").val();
        
		// ===============================
	    // Condições
	    // ===============================
		
	    var constraintsConsultaDespesas = [];
	    
	    var constNumFluig = '';
	    if(conNumFluig != ''){
	    	
	    	constNumFluig = {
		    	"_field": "numFluig",
		    	"_initialValue": conNumFluig,
		    	"_finalValue": conNumFluig,
		    	"_type": 1,
		    	"_likeSearch": false
		    }
	    	
	    	constraintsConsultaDespesas.push(constNumFluig);
	    }
	    
	    var constNumNota = '';
	    if(conNumNota != ''){
	    	
	    	constNumNota = {
		    	"_field": "solNumNotaFiscal",
		    	"_initialValue": conNumNota,
		    	"_finalValue": conNumNota,
		    	"_type": 1,
		    	"_likeSearch": false
		    }
	    	
	    	constraintsConsultaDespesas.push(constNumNota);
	    }
	    
	   
	    
	    return constraintsConsultaDespesas;
	},
    
   
});