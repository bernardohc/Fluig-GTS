
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
	
	
});
//Aqui cria as funcioes
var funcoes = (function() {
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		
		/*
		 * ATENDIMENTO
		 */
		//Dados Gerais
		/**
		 * Consulta Atendimento já realizado na API do Protheus
		 */
		consultaAtendimento : function(){
			
			let codigoTecnicoGTS = $('#codigoTecnicoGTS').val().trim();
			let gerNumeroOS = $('#gerNumeroOS').val().trim();

			let filterFields = "codigoTecnicoGTS,"+ codigoTecnicoGTS + ",numeroOS," + gerNumeroOS;
			
			var loading = FLUIGC.loading(window);
			loading.show();
			
			funcoes.limpaCamposAtendimento();
			
			//type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
			var dataRequest = {
					"name": "dsFormComplementoOS",
					"fields": [] ,
					"constraints": [
				                   	{
								    	"_field": "metadata#active",
								    	"_initialValue": true,
								    	"_finalValue": true,
								    	"_type": 1,
								    	"_likeSearch": false
								    },
								    {
								    	"_field": "gerNumeroOS",
								    	"_initialValue": gerNumeroOS,
								    	"_finalValue": gerNumeroOS,
								    	"_type": 1,
								    	"_likeSearch": false
								    }],
					"order": []
			}
			
			$.ajax({
				async: true,
				url: '/api/public/ecm/dataset/datasets',
				type: 'POST',
				data: JSON.stringify(dataRequest),
				contentType: 'application/json',
				
			}).fail(function(e, data) {
				console.log('fail', data);
				console.log(data);
				if(isMobile == 'true'){
					alert('Erro ao consultar a OS, comunicar o Administrador do Sistema!');
				}else{
					FLUIGC.toast({ title: '', message: 'Erro ao consultar a OS, comunicar o Administrador do Sistema!', type: 'warning' });
				}
				
				setTimeout(function(){ 
    	    		loading.hide();
    	    	}, 1000);
			}).success(function(data) {
				if (data != null && data.content != null && data.content.values.length > 0) {	
					
					if(isMobile == 'true'){
						alert( 'Número de Ordem de Serviço já utilizado.')
					}else{
						FLUIGC.toast({ title: '', message: 'Número de Ordem de Serviço já utilizado.', type: 'warning' });
					}
					
					setTimeout(function(){ 
	    	    		loading.hide();
	    	    	}, 1000);
					
					return;
				}else{
					
					$.ajax({
			    		type: "GET",
			    		dataType: "json",
			    		async: true,
			    		url: "/api/public/ecm/dataset/search?datasetId=dsCompOSConsultaAtendimentoOS&filterFields="+filterFields,
			    	    success: function (data, status, xhr) {
			    	    	
			    	    	if (data != null && data.content != null && data.content.length > 0) {
			    	    		const records = data.content;
			    	    		
			    	    		if( records[0].CODRET == "1"){
			    		            var record = records[0];
			    					let gerModalidade = record.ATDMODALIDADE;
			    					let gerNumSerie = record.ATDNUMSERIE;
			    					let gerModeloEquipamento = record.ATDMODELOEQUIPAMENTO;
			    					let gerLaudo = record.ATDLAUDO;
			    					let cliCpfCnpj = record.ATDCLICGC;
			    					let cliInscricaoEstadual = record.ATDCLIINSCEST;
			    					let cliNomeCliente = record.ATDCLINOME;
			    					let cliCodigo = record.ATDCLICODIGO;
			    					let cliLoja = record.ATDCLILOJA;
			    					let cliCEP = record.ATDCLICEP;
			    					let cliEndereco = record.ATDCLIEND;
			    					let cliBairro = record.ATDCLIBAIRRO;
			    					let cliComplemento = record.ATDCLICOMPLEMENTO;
			    					let cliCidade = record.ATDCLICIDADE;
			    					let cliEstado = record.ATDCLIESTADO;
			    					let cliTelefone = record.ATDCLITELEFONE;
			    					let cliEmail = record.ATDCLIEMAIL;
			    					
			    					let revCpfCnpj = record.ATDREVCGC;
			    					let revInscricaoEstadual = record.ATDREVINSCEST;
			    					let revNomeRevenda = record.ATDREVNOME;
			    					let revCodigo = record.ATDREVCODIGO;
			    					let revLoja = record.ATDREVLOJA;
			    					let revCEP = record.ATDREVCEP;
			    					let revEndereco = record.ATDREVEND;
			    					let revBairro = record.ATDREVBAIRRO;
			    					let revComplemento = record.ATDREVCOMPLEMENTO;
			    					let revCidade = record.ATDREVCIDADE;
			    					let revEstado = record.ATDREVESTADO;
			    					let revTelefone = record.ATDREVTELEFONE;
			    					let revEmail = record.ATDREVEMAIL;
			    					
			    					
			    					$("#gerModalidade").val(gerModalidade);
			    					$("#gerNumSerie").val(gerNumSerie);
			    					$("#gerModeloEquipamento").val(gerModeloEquipamento);
			    					$("#gerLaudo").val(gerLaudo);
			    					
			    					if(cliCodigo.trim() != ''){
			    						funcoes.somenteLeituraCamposCliente(true);
			    						
			    						$("#cliCpfCnpj").val(cliCpfCnpj);
				    					$("#cliInscricaoEstadual").val(cliInscricaoEstadual);
				    					$("#cliNomeCliente").val(cliNomeCliente);
				    					$("#cliCodigo").val(cliCodigo);
				    					$("#cliLoja").val(cliLoja);
				    					$("#cliCEP").val(cliCEP);
				    					$("#cliEndereco").val(cliEndereco);
				    					$("#cliBairro").val(cliBairro);
				    					$("#cliComplemento").val(cliComplemento);
				    					$("#cliCidade").val(cliCidade);
				    					$("#cliEstadoHidden").val(cliEstado);
				    					$("#cliEstado").val(cliEstado);
				    					$("#cliTelefone").val(cliTelefone);
				    					$("#cliEmail").val(cliEmail);
				    					
				    					var dsParametroSuporteEstado = DatasetFactory.getDataset( 'ds_parametro_compOS_suporte_estado' , null, null , null);
				    					
				    					if (dsParametroSuporteEstado != null && dsParametroSuporteEstado.values != null && dsParametroSuporteEstado.values.length > 0) {
				    						const recordsSuporteEstado = dsParametroSuporteEstado.values;
					    			        let setouSuporteEstado = false;
				    						for ( var index in recordsSuporteEstado) {
					    			            var recordSuporteEstado = recordsSuporteEstado[index];
					    			            if (recordSuporteEstado.siglaEstado == cliEstado.trim() ) {
					    			            	setouSuporteEstado = true;
					    			            	var WKUserSuporteGTS = recordSuporteEstado.WKUserSuporteGTS;
					    			            	$("#matFluigSuporteGTS").val(WKUserSuporteGTS);
					    			            }
					    			        }
				    						if(!setouSuporteEstado){
				    							if(isMobile == 'true'){
				    								alert('Não foi localizado o usuário Suporte GTS para este estado.');
				    							}else{
				    								FLUIGC.toast({ title: '', message: 'Não foi localizado o usuário Suporte GTS para este estado.', type: 'warning' });
				    							}
							    	    		funcoes.limpaCamposAtendimento();
				    						}
				    					}
			    					}else{
			    						//Não tem cliente associado a esta OS, abre campos para usuário digitar.
			    						funcoes.somenteLeituraCamposCliente(false);
			    						
			    					}
			    					
			    					if(revCodigo.trim() != ''){
			    						//Se tem mais de uma Revenda, não é retornado no Dataset
			    						funcoes.somenteLeituraCamposRevenda(true);
			    						
			    						$("#revCpfCnpj").val(revCpfCnpj);
				    					$("#revInscricaoEstadual").val(revInscricaoEstadual);
				    					$("#revNomeRevenda").val(revNomeRevenda);
				    					$("#revCodigo").val(revCodigo);
				    					$("#revLoja").val(revLoja);
				    					$("#revCEP").val(revCEP);
				    					$("#revEndereco").val(revEndereco);
				    					$("#revBairro").val(revBairro);
				    					$("#revComplemento").val(revComplemento);
				    					$("#revCidade").val(revCidade);
				    					$("#revEstadoHidden").val(revEstado);
				    					$("#revEstado").val(revEstado);
				    					$("#revTelefone").val(revTelefone);
				    					$("#revEmail").val(revEmail);
			    						
			    					}else{
			    						
			    						//Consulta de tem Revenda associada, se não tiver libera os campos.
				    					var cstRev1 = DatasetFactory.createConstraint("codigoTecnicoGTS", codigoTecnicoGTS, codigoTecnicoGTS, ConstraintType.MUST);
				    					var cstRev2 = DatasetFactory.createConstraint("numeroOS", gerNumeroOS, gerNumeroOS, ConstraintType.MUST);
				    					var cstRev   = new Array(cstRev1, cstRev2);
				    					var dsCompOSConsultaRevendas = DatasetFactory.getDataset( 'dsCompOSConsultaRevendas' , null, cstRev , null) 
				    					
				    					if (dsCompOSConsultaRevendas != null && dsCompOSConsultaRevendas.values != null && dsCompOSConsultaRevendas.values.length > 0) {
				    				        var revRecords = dsCompOSConsultaRevendas.values;
				    				        var revRecord = revRecords[0];
				    			            
				    			            if( revRecord.CODRET == "1"){
				    			            	funcoes.somenteLeituraCamposRevenda(true);
				    			            	
				    			            	//Se retornar somente 1 Revenda, já define ela no formulário, se não, mostra pelo campo zoom.
				    			            	if(revRecords.length == 1){
				    			            		$('#divRevNomeRevenda').show();
					    			            	$('#divRevNomeRevendaZoom').hide();
					    			            	
					    			            	$("#revCpfCnpj").val(revRecord.REVCGC);
							    					$("#revInscricaoEstadual").val(revRecord.REVINSCEST);
							    					$("#revNomeRevenda").val(revRecord.REVNOME);
							    					$("#revCodigo").val(revRecord.REVCODIGO);
							    					$("#revLoja").val(revRecord.REVLOJA);
							    					$("#revCEP").val(revRecord.REVCEP);
							    					$("#revEndereco").val(revRecord.REVEND);
							    					$("#revBairro").val(revRecord.REVBAIRRO);
							    					$("#revComplemento").val(revRecord.REVCOMPLEMENTO);
							    					$("#revCidade").val(revRecord.REVCIDADE);
							    					$("#revEstadoHidden").val(revRecord.REVESTADO);
							    					$("#revEstado").val(revRecord.REVESTADO);
							    					$("#revTelefone").val(revRecord.REVTELEFONE);
							    					$("#revEmail").val(revRecord.REVEMAIL);
					    			            	
				    			            	}else{
				    			            		$('#divRevNomeRevenda').hide();
					    			            	$('#divRevNomeRevendaZoom').show();
					    			            	reloadZoomFilterValues('revNomeRevendaZoom', 'codigoTecnicoGTS,'+codigoTecnicoGTS+',numeroOS,'+gerNumeroOS );
					    			            	
				    			            	}
				    			            	
				    			            	
				    			            	
				    			            }else if(revRecords[0].CODRET == "2"){
				    			            	$('#divRevNomeRevenda').show();
				    			            	$('#divRevNomeRevendaZoom').hide();
				    			            	funcoes.somenteLeituraCamposRevenda(false);
				    			            }
				    					}else{
				    						
				    						$('#divRevNomeRevenda').show();
			    			            	$('#divRevNomeRevendaZoom').hide();
			    			            	funcoes.somenteLeituraCamposRevenda(false);
				    						
				    					}
			    						
			    					}
				    				
			    				}else if (records[0].CODRET == "2"){
			    					if(isMobile == 'true'){
	    								alert(records[0].MSGRET);
	    							}else{
	    								FLUIGC.toast({ title: '', message: records[0].MSGRET, type: 'warning' });
	    							}
				    	    		funcoes.limpaCamposAtendimento();
				    	    	}
			    	    	}else{
			    	    		if(isMobile == 'true'){
    								alert('Erro ao consultar o atendimento, comunicar o Administrador do Sistema!');
    							}else{
    								FLUIGC.toast({ title: '', message: 'Erro ao consultar o atendimento, comunicar o Administrador do Sistema!', type: 'danger' });
    							}
			    	    		funcoes.limpaCamposAtendimento();
			    	    	}
			    	    	setTimeout(function(){ 
			    	    		loading.hide();
			    	    	}, 1000);
			    	    },
						error: function(XMLHttpRequest, textStatus, errorThrown) {
			    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
			    	    	FLUIGC.toast({title: '', message: 'Erro na consulta do atendimento, comunicar o Administrador do Sistema!', type: 'danger'});
			    	    	loading.hide();
						}
					});
					
				}
			});
			
		},
		
		somenteLeituraCamposCliente : function(readonly){
			
			$('#cliCpfCnpj').prop('readonly', readonly);
			$('#cliInscricaoEstadual').prop('readonly', readonly);
			$('#cliNomeCliente').prop('readonly', readonly);
			$('#cliCEP').prop('readonly', readonly);
			$('#cliEndereco').prop('readonly', readonly);
			$('#cliBairro').prop('readonly', readonly);
			$('#cliComplemento').prop('readonly', readonly);
			$('#cliCidade').prop('readonly', readonly);
			$('#cliEstado').prop('disabled', readonly);
			$('#cliTelefone').prop('readonly', readonly);
			$('#cliEmail').prop('readonly', readonly);
			
		},
		
		somenteLeituraCamposRevenda : function(readonly){
			
			$('#revCpfCnpj').prop('readonly', readonly);
			$('#revInscricaoEstadual').prop('readonly', readonly);
			$('#revNomeRevenda').prop('readonly', readonly);
			$('#revCEP').prop('readonly', readonly);
			$('#revEndereco').prop('readonly', readonly);
			$('#revBairro').prop('readonly', readonly);
			$('#revComplemento').prop('readonly', readonly);
			$('#revCidade').prop('readonly', readonly);
			$('#revEstado').prop('disabled', readonly);
			$('#revTelefone').prop('readonly', readonly);
			$('#revEmail').prop('readonly', readonly);
			
		},
		/**
		 * Limpa campos de atendimento
		 */
		limpaCamposAtendimento : function(){
			$('#gerModalidade').val('');
			$('#gerModalidade').val('');
			$('#gerNumSerie').val('');
			$('#gerModeloEquipamento').val('');
			$('#gerLaudo').val('');
			$('#cliCpfCnpj').val('');
			$('#cliInscricaoEstadual').val('');
			$('#cliNomeCliente').val('');
			$('#cliCodigo').val('');
			$('#cliLoja').val('');
			$('#cliCEP').val('');
			$('#cliEndereco').val('');
			$('#cliBairro').val('');
			$('#cliComplemento').val('');
			$('#cliCidade').val('');
			$('#cliEstado').val('');
			$('#cliEstadoHidden').val('');
			$('#cliTelefone').val('');
			$('#cliEmail').val('');
			$('#revCpfCnpj').val('');
			$('#revInscricaoEstadual').val('');
			$('#revNomeRevenda').val('');
			window["revNomeRevendaZoom"].clear();
			$('#revCodigo').val('');
			$('#revLoja').val('');
			$('#revCEP').val('');
			$('#revEndereco').val('');
			$('#revBairro').val('');
			$('#revComplemento').val('');
			$('#revCidade').val('');
			$('#revEstado').val('');
			$('#revTelefone').val('');
			$('#revEmail').val('');
			$('#divRevNomeRevenda').show();
        	$('#divRevNomeRevendaZoom').hide();
			reloadZoomFilterValues('revNomeRevendaZoom', 'tipoFiltro,limpar');
        	
		},
		
		//Falha
		addFalha : function(){
			
			const indexTbFalha = wdkAddChild('falTbFalha');

			//Família
			$("#falCodFamiliaItem___"+ indexTbFalha).val( $("#maqCodFamilia").val() );
			$("#falCodFalhaFamiliaItem___"+ indexTbFalha).val( $("#maqCodFalhaFamilia").val() );
			$("#falFamiliaItem___"+ indexTbFalha).val( $("#maqDescFamilia").val() );
			//Modelo Máquina
			$("#falCodFalhaModeloMaquinaItem___"+ indexTbFalha).val( $("#maqCodFalhaModeloMaquina").val() );
			$("#falModeloMaquinaItem___"+ indexTbFalha).val( $("#maqDescModeloMaquina").val() );

			//Grupo
			reloadZoomFilterValues('falGrupoMaquinaItem___'+ indexTbFalha, 'tipoFiltro,grupo,codFamilia,'+ $("#maqCodFamilia").val() );


		},

		// Atendimento
		/**
		 * Função para adicionar atendimento na tabela de atendimentos
		 */
		addAtendimento :  function(){
			
			let atdDataAtendimento = $('#atdDataAtendimento').val().trim();
			let atdHoraInicial = $('#atdHoraInicial').val().trim();
			let atdHoraFinal = $('#atdHoraFinal').val().trim();
			let atdHoraInicialMoment = moment($('#atdHoraInicial').val().trim(),"HH:mm");
			let atdHoraFinalMoment = moment($('#atdHoraFinal').val().trim(),"HH:mm");
			let atdDeslocamento = $('#atdDeslocamento').val().trim();
			let atdIntervalo = $('#atdIntervalo').val().trim();
			let atdIntervaloMoment = moment($('#atdIntervalo').val().trim(),"HH:mm");
			let atdKmInicial = validafunctions.getFloatValue("atdKmInicial");
			let atdKmFinal = validafunctions.getFloatValue("atdKmFinal")
			let camposValidados = true;
			let msgValidado = '';
			
			if(atdDataAtendimento == ''){
				msgValidado = 'Preencher a "Data de Atendimento".';
				camposValidados = false;
			}else if(atdHoraInicial == ''){
				msgValidado = 'Preencher a "Hora Inicial".';
				camposValidados = false;
			}else if(atdHoraInicial.length != 5){
				msgValidado = '"Hora Inicial" está inválido.';
				camposValidados = false;
			}else if(atdHoraFinal == ''){
				msgValidado = 'Preencher a "Hora Final".';
				camposValidados = false;
			}else if(atdHoraFinal.length != 5){
				msgValidado = '"Hora Final" está inválido.';
				camposValidados = false;
			}else if(moment(atdHoraFinalMoment).isSame(atdHoraInicialMoment)){
				msgValidado = '"Hora Inicial" e "Hora Final" não podem ser iguais.';
				camposValidados = false;
			}else if(moment(atdHoraFinalMoment).isBefore(atdHoraInicialMoment)){
				msgValidado = '"Hora Final" não pode ser maior que a "Hora Inicial".';
				camposValidados = false;
			}else if(atdDeslocamento == ''){
				msgValidado = 'Preencher o "Deslocamento".';
				camposValidados = false;
			}else if(atdDeslocamento.length != 5){
				msgValidado = '"Deslocamento" está inválido.';
				camposValidados = false;
			}else if(atdIntervalo == ''){
				msgValidado = 'Preencher o "Intervalo".';
				camposValidados = false;
			}else if(atdIntervalo.length != 5){
				msgValidado = '"Intervalo" está inválido.';
				camposValidados = false;
			}else if( $('#atdKmInicial').val().trim() == ''){
				msgValidado = 'Preencher o "KM Inicial".';
				camposValidados = false;
			}else if( $('#atdKmFinal').val().trim() == ''){
				msgValidado = 'Preencher o "KM Final".';
				camposValidados = false;
			}else if(atdKmInicial == atdKmFinal){
				msgValidado = '"KM Inicial" e "KM Final" não podem ser iguais.';
				camposValidados = false;
			}else if(atdKmInicial > atdKmFinal){
				msgValidado = '"KM Inicial" não pode ser maior que o "KM Final".';
				camposValidados = false;
			}
			
			
			
			let atdSaldoHorasItem = '';
			let atdSaldoHorasTrabalhadasItem = '';
			let HoraFinalHoraInicial = atdHoraFinalMoment.diff(atdHoraInicialMoment);
			diffHoraFinalHoraInicial = moment.duration(HoraFinalHoraInicial);
			//No saldo de horas diminui o intervalo
			diffHoraFinalHoraInicial.subtract( moment.duration( atdIntervalo ) , 'hours');
			atdSaldoHorasTrabalhadasItem =  diffHoraFinalHoraInicial.get('hours').toString().padStart(2, '0') + ':' +diffHoraFinalHoraInicial.get('minutes').toString().padStart(2, '0');
			
			//No saldo de horas adiciona o deslocamento
			diffHoraFinalHoraInicial.add( moment.duration( atdDeslocamento ) , 'hours');
			atdSaldoHorasItem = diffHoraFinalHoraInicial.get('hours').toString().padStart(2, '0') + ':' +diffHoraFinalHoraInicial.get('minutes').toString().padStart(2, '0');
			
			
			if( atdSaldoHorasItem.indexOf("-") >= 0){
				msgValidado = '"Saldo de Horas" não pode ser negativo.';
				camposValidados = false;
			}
			if(!camposValidados){
				if(isMobile == 'true'){
					alert(msgValidado)
				}else{
					FLUIGC.toast({title: '', message: msgValidado, type: 'warning'});
				}
				return;
			}
			
			
			let atdSaldoKmItem = atdKmFinal - atdKmInicial;
			
			let indexTbAtendimentos = wdkAddChild('atdTbAtendimentos');
			$('#atdDataAtendimentoItem___'+indexTbAtendimentos).val(atdDataAtendimento);
			$('#atdHoraInicialItem___'+indexTbAtendimentos).val(atdHoraInicial);
			$('#atdHoraFinalItem___'+indexTbAtendimentos).val(atdHoraFinal);
			$('#atdDeslocamentoItem___'+indexTbAtendimentos).val(atdDeslocamento);
			$('#atdIntervaloItem___'+indexTbAtendimentos).val(atdIntervalo);
			$('#atdSaldoHorasItem___'+indexTbAtendimentos).val(atdSaldoHorasItem);
			$('#atdSaldoHorasTrabalhadasItem___'+indexTbAtendimentos).val(atdSaldoHorasTrabalhadasItem);
			$('#atdKmInicialItem___'+indexTbAtendimentos).val(atdKmInicial);
			$('#atdKmFinalItem___'+indexTbAtendimentos).val(atdKmFinal);
			$('#atdSaldoKmItem___'+indexTbAtendimentos).val(atdSaldoKmItem);
			
			validafunctions.setNumero('atdKmInicialItem___'+indexTbAtendimentos, 0, false);
			validafunctions.setNumero('atdKmFinalItem___'+indexTbAtendimentos, 0, false);
			validafunctions.setNumero('atdSaldoKmItem___'+indexTbAtendimentos, 0, false);
			
			
			funcoes.calculaTotaisAtendimento();
			
			$('#atdDataAtendimento').val('');
			$('#atdHoraInicial').val('');
			$('#atdHoraFinal').val('');
			$('#atdDeslocamento').val('');
			$('#atdIntervalo').val('');
			$('#atdKmInicial').val('');
			$('#atdKmFinal').val('');
			
			$('#divTabelaAtendimentos').show();
			$('#divTotalAtendimentos').show();
		},
		
		/**
		 * Função que calcula os totais e atendimento
		 * Total de Horas e Total de KM
		 */
		calculaTotaisAtendimento : function(){
			
			let atdTotalHorasDeslocamento = moment.duration(0);
			let atdTotalHorasIntervalo = moment.duration(0);
			let atdTotalHorasTrabalhadas = moment.duration(0);
			let atdTotalKM = 0;
			let atdSaldoKmItem = 0;
			
			$("input[name*=atdDataAtendimentoItem___]").each(function(index){
				var indexaTbAtendimentos = validafunctions.getPosicaoFilho($(this).attr("id"));
				
				//Soma Saldo de Horas
				atdTotalHorasDeslocamento.add( moment.duration( $('#atdDeslocamentoItem___'+indexaTbAtendimentos).val() ) , 'hours');
				atdTotalHorasIntervalo.add( moment.duration( $('#atdIntervaloItem___'+indexaTbAtendimentos).val() ) , 'hours');
				atdTotalHorasTrabalhadas.add( moment.duration( $('#atdSaldoHorasTrabalhadasItem___'+indexaTbAtendimentos).val() ) , 'hours');
				
				//Soma Saldo de  KM
				atdSaldoKmItem = validafunctions.getFloatValue("atdSaldoKmItem___"+indexaTbAtendimentos);
				if (!isNaN(atdSaldoKmItem) ) {
					atdTotalKM += atdSaldoKmItem;
				}
				
			});
			

			$("#atdTotalHorasDeslocamento").val( atdTotalHorasDeslocamento.get('hours').toString().padStart(2, '0') + ':' +atdTotalHorasDeslocamento.get('minutes').toString().padStart(2, '0') );
			$("#atdTotalHorasIntervalo").val( atdTotalHorasIntervalo.get('hours').toString().padStart(2, '0') + ':' +atdTotalHorasIntervalo.get('minutes').toString().padStart(2, '0') );
			$("#atdTotalHorasTrabalhadas").val( atdTotalHorasTrabalhadas.get('hours').toString().padStart(2, '0') + ':' +atdTotalHorasTrabalhadas.get('minutes').toString().padStart(2, '0') );
			
			$("#atdTotalKM").val(atdTotalKM);
			validafunctions.setNumero('atdTotalKM', 0, false);
			
		},
		
		/*
		 * COMUNICAÇÃO
		 */
		addLinhaComunicacao : function(param){
			
			//ADICIONA LINHA PARA ATENDIMENTO
			var addLinhaComunicacao = true;
			$("input[name*=comIdItem___]").each(function(index){
				var index = validafunctions.getPosicaoFilho($(this).attr("id"));
	
				var comId = $('#comIdItem___' + index).val();
				var comData = $('#comDataItem___' + index).val();
				
				if(comId != "" && comData == ""){
					addLinhaComunicacao = false;
				}
			});
			
			if(addLinhaComunicacao){
		    	let indexTbComunicacao = wdkAddChild('comTbComunicacao');
		    	
		    	let solStatus = $('#solStatus').val();
		    	let wkUser = getWKUser();
		    	let nomeUsuarioComunicacao = getNome(wkUser);
		    	
		    	$("#comIdItem___" + indexTbComunicacao ).val(indexTbComunicacao)
		    	$("#comUsuarioWKUserItem___" + indexTbComunicacao ).val(wkUser)
		    	$("#comUsuarioItem___" + indexTbComunicacao ).val(nomeUsuarioComunicacao)
		    	$("#comTipoUsuarioItem___" + indexTbComunicacao ).val(param['tipoUsuario'])
		    	$("#comStatusItem___" + indexTbComunicacao ).val(solStatus);
		    	
		    	if(param['tipoUsuario'] != "Técnico GTS"){
		    		$('textarea[name*=comComInternaItem___'+indexTbComunicacao+']').show();
		    	}
			}
			
		},
		
		/*
		 * Utils
		 */
		mascaraCpfCnpj : function(idCampo){
			$('#'+idCampo).unmask();
			if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length <= 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#'+idCampo).mask("000.000.000-009");
			}else{
				$('#'+idCampo).mask("00.000.000/0000-00");
			}
		},
		
		mascaraTelefone : function(idCampo){
			$('#'+idCampo).unmask();
			//11 dígitos de somente número ddd + numero
			if($('#'+idCampo).val().replace(/[^0-9]/g, "").trim().length == 11){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
				$('#'+idCampo).mask('(00) 00000-0009');
			} else {
				$('#'+idCampo).mask('(00) 0000-00009');
			}
		},
		
		mascaraCep : function(idCampo){
			$('#'+idCampo).unmask();
			$('#'+idCampo).mask('99999-999');
		}
	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			/*
			 * DADOS GERAIS
			 */
			/**
			 * Busca as informações de atendimento
			 */
			$(document).on("change", "#gerNumeroOS", function() {
				if($("#gerNumeroOS").val().trim() == '' || $("#gerNumeroOS").val().trim() == '0'){
					funcoes.limpaCamposAtendimento();
					$('#gerNumeroOS').val('0');
					funcoes.somenteLeituraCamposCliente(true);
					funcoes.somenteLeituraCamposRevenda(true);
				}else if($("#gerNumeroOS").val().trim().length != 6) {
					funcoes.limpaCamposAtendimento();
					funcoes.somenteLeituraCamposCliente(true);
					funcoes.somenteLeituraCamposRevenda(true);
					if(isMobile == 'true'){
						alert('Número da OS está preenchido incorretamente.');
					}else{
						FLUIGC.toast({ title: '', message: 'Número da OS está preenchido incorretamente.', type: 'warning' });
					}
				}else{
					funcoes.consultaAtendimento();
				}
			});
			/**
			 * Botão para visualizar as fotos do modal
			 */
			$(document).on("click", "#btnVisualizarFotos", function() {
				
				let gerNumeroOS = $('#gerNumeroOS').val().trim();
				
				if(gerNumeroOS == ''){
					FLUIGC.toast({ title: '', message: 'Favor preencher o Número da OS.', type: 'warning' });
					
				}else{
					var html =  '<div class="row" >'+
						       		'<div class="col-md-12" align="center">'+
						       			'<div id="carousel-modal"></div>'+
						       		'</div>'+
								'</div>'
					
					var modalImgOS = FLUIGC.modal({
					    title: '',
					    content: html,
					    id: 'fluig-modal',
					    size: 'full',
					    actions: [{
					        'label': 'Fechar',
					        'autoClose': true
					    }]
					}, function(err, data) {
					    if(err) {
					    	
					    } else {
					    	
					    	let codigoTecnicoGTS = $('#codigoTecnicoGTS').val().trim();
							let gerNumeroOS = $('#gerNumeroOS').val().trim();
							let filterFields = "codigoTecnicoGTS,"+ codigoTecnicoGTS + ",numeroOS," + gerNumeroOS;
							
							var loading = FLUIGC.loading(window);
							loading.show();
							
							$.ajax({
					    		type: "GET",
					    		dataType: "json",
					    		async: true,
					    		url: "/api/public/ecm/dataset/search?datasetId=dsCompOSConsultaAtendimentoOSImg&filterFields="+filterFields,
					    	    success: function (data, status, xhr) {
					    	    	if (data != null && data.content != null && data.content.length > 0) {
					    	    		const records = data.content;
					    	    		
					    	    		if( records[0].CODRET == "1"){
				    	    				let arrImagens = [];
					    					for ( var indexFoto in records) {
					    						let recordFoto = records[indexFoto];
					    						let idFoto = recordFoto.ATDIDFOTO;
						    					let fotoB64 = recordFoto.ATDBASE64;
						    					let objImagem = {src: fotoB64, alt: idFoto};
						    					
						    					arrImagens.push(objImagem);
					    					}
					    					
									        let settingsCarousel = {
									              id: 'myCarouselImgOS',
									              images: arrImagens,
									              indicators: true,
									              startIndex: 0,
									              interval: 6000
									        }
									          
									        FLUIGC.carousel('#carousel-modal', settingsCarousel);
									
										}else if (records[0].CODRET == "2"){
											$('#carousel-modal').html('<p><b>'+records[0].MSGRET+'</b></p>');
						    	    	}
							    	}else{
							    		FLUIGC.toast({ title: '', message: 'Erro ao consultar as imagens, comunicar o Administrador do Sistema!', type: 'danger' });
							    		
							    	}
							    	setTimeout(function(){ 
							    		loading.hide();
							    	}, 1000);
					    	    
					    	    },error: function(XMLHttpRequest, textStatus, errorThrown) {
							    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
							    	FLUIGC.toast({
							    		title: '',
							    		message: 'Erro na consulta das imagens, comunicar o Administrador do Sistema!' ,
							    		type: 'danger'
							    	});
							    	loading.hide();
					    	    }
							});
					    	
					    }
					});
					
				}
				
			});
			//Cliente
			$(document).on("keyup blur", "#cliCpfCnpj", function() {	
				funcoes.mascaraCpfCnpj('cliCpfCnpj');
			});
			/**
			 * Quando não existe o cliente na base de dados, habilita os campos para preencher.
			 * Se preenche o campo de CEP faz uma busca no site viaCEP
			 */
			$(document).on("change", "#cliCEP", function() {
				
				if ( !$('#revCEP').is('[readonly]') ) { 
					var cep = $('#cliCEP').val().replace('.','').replace('-','');
					
					if(cep != "" && cep.length == 8){
						var loading = FLUIGC.loading(window);
						loading.show();
						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		async: true,
				    		url: "//viacep.com.br/ws/"+cep+"/json",
				    	    success: function (data, status, xhr) {
				    	    	
				    	    	if (!data.erro) {
			    					let ufCliente = data.uf;
			    					let cidadeCliente = data.localidade;
			    					let enderecoCliente = data.logradouro;
			    					let bairroCliente = data.bairro;
			    					
			    					$('#cliEstado').val(ufCliente);
			    					$('#cliEstadoHidden').val(ufCliente);
			    					$('#cliCidade').val(cidadeCliente);
			    					$('#cliEndereco').val(enderecoCliente);
			    					$('#cliBairro').val(bairroCliente);
				    					
				    	    	}else{
				    	    		FLUIGC.toast({ title: '', message: 'O CEP não existe na base de dados!', type: 'warning' });
				    	    		$('#cliEstado').val('');
				    	    		$('#cliEstadoHidden').val('');
			    					$('#cliCidade').val('');
			    					$('#cliEndereco').val('');
			    					$('#cliBairro').val('');
				    	    	}
				    	    	
				    	    	loading.hide();
				    	    },
							error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	FLUIGC.toast({
						    		title: '',
						    		message: 'Erro ao consultar CEP, servidor indisponível!' ,
						    		type: 'danger'
						    	});
				    	    	
				    	    	$('#cliEstado').val('');
			    	    		$('#cliEstadoHidden').val('');
		    					$('#cliCidade').val('');
		    					$('#cliEndereco').val('');
		    					$('#cliBairro').val('');
				    	    	loading.hide();
							}
						});
						
					}else{
						$('#cliEstado').val('');
	    	    		$('#cliEstadoHidden').val('');
    					$('#cliCidade').val('');
    					$('#cliEndereco').val('');
    					$('#cliBairro').val('');
					}
				}
				
			});
			/**
			 * Gatilho para alimentar o estado no campo hidden
			 */
			$(document).on("change", "#cliEstado", function() {
				let cliEstado = $('#cliEstado').val();
				$('#cliEstadoHidden').val( cliEstado );
				
				if(  cliEstado.trim() != ''){
					var dsParametroSuporteEstado = DatasetFactory.getDataset( 'ds_parametro_compOS_suporte_estado' , null, null , null);
					
					if (dsParametroSuporteEstado != null && dsParametroSuporteEstado.values != null && dsParametroSuporteEstado.values.length > 0) {
						const recordsSuporteEstado = dsParametroSuporteEstado.values;
				        let setouSuporteEstado = false;
						for ( var index in recordsSuporteEstado) {
				            var recordSuporteEstado = recordsSuporteEstado[index];
				            if (recordSuporteEstado.siglaEstado == cliEstado.trim() ) {
				            	setouSuporteEstado = true;
				            	var WKUserSuporteGTS = recordSuporteEstado.WKUserSuporteGTS;
				            	$("#matFluigSuporteGTS").val(WKUserSuporteGTS);
				            }
				        }
						if(!setouSuporteEstado){
							if(isMobile == 'true'){
								alert('Não foi localizado o usuário Suporte GTS para este estado.');
							}else{
								FLUIGC.toast({ title: '', message: 'Não foi localizado o usuário Suporte GTS para este estado.', type: 'warning' });
							}
						}
					}
				}else{
					$("#matFluigSuporteGTS").val('');
				}
				
			});
			$(document).on("keyup blur", "#cliTelefone", function() {	
				funcoes.mascaraTelefone('cliTelefone');
			});
			
			//Revenda
			/**
			 * Gatilho para validar o preenchimento do CNPJ da Revenda
			 */
			$(document).on("change", "#revCpfCnpj", function() {
				if( $("#revCpfCnpj").val().trim() == '' && $("#revCpfCnpj").val().trim().length != 18) {
					if(isMobile == 'true'){
						alert('CNPJ da Revenda está preenchido incorretamente.');
					}else{
						FLUIGC.toast({ title: '', message: 'CNPJ da Revenda está preenchido incorretamente.', type: 'warning' });
					}
				}
			});
			/**
			 * Quando muda a opção de Técnico da Revenda que Acompanhou o atendimento
			 */
			$(document).on("change", "input:radio[name='revTecAcompAtendimento']", function() {
				var revTecAcompAtendimento = $("input:radio[name='revTecAcompAtendimento']:checked").val();
				
				if(revTecAcompAtendimento == 'sim'){
					
					$('#divTecAcompanhouAtendimento').show();
					
				}else{
					$('#divTecAcompanhouAtendimento').hide();
					$('#revTecAcompAtendimentoNome').val('');
					$('#revTecAcompAtendimentoCPF').val('');
					$('#revTecAcompAtendimentoTel').val('');
				}
				
			});
			/**
			 * Quando não existe o cliente na base de dados, habilita os campos para preencher.
			 * Se preenche o campo de CEP faz uma busca no site viaCEP
			 */
			$(document).on("change", "#revCEP", function() {
				
				if ( !$('#revCEP').is('[readonly]') ) { 
					var cep = $('#revCEP').val().replace('.','').replace('-','');
					
					if(cep != "" && cep.length == 8){
						var loading = FLUIGC.loading(window);
						loading.show();
						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		async: true,
				    		url: "//viacep.com.br/ws/"+cep+"/json",
				    	    success: function (data, status, xhr) {
				    	    	
				    	    	if (!data.erro) {
			    					let ufCliente = data.uf;
			    					let cidadeCliente = data.localidade;
			    					let enderecoCliente = data.logradouro;
			    					let bairroCliente = data.bairro;
			    					
			    					$('#revEstado').val(ufCliente);
			    					$('#revEstadoHidden').val(ufCliente);
			    					$('#revCidade').val(cidadeCliente);
			    					$('#revEndereco').val(enderecoCliente);
			    					$('#revBairro').val(bairroCliente);
				    					
				    	    	}else{
				    	    		FLUIGC.toast({ title: '', message: 'O CEP não existe na base de dados!', type: 'warning' });
				    	    		$('#revEstado').val('');
				    	    		$('#revEstadoHidden').val('');
			    					$('#revCidade').val('');
			    					$('#revEndereco').val('');
			    					$('#revBairro').val('');
				    	    	}
				    	    	
				    	    	loading.hide();
				    	    },
							error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	FLUIGC.toast({
						    		title: '',
						    		message: 'Erro ao consultar CEP, servidor indisponível!' ,
						    		type: 'danger'
						    	});
				    	    	
				    	    	$('#revEstado').val('');
			    	    		$('#revEstadoHidden').val('');
		    					$('#revCidade').val('');
		    					$('#revEndereco').val('');
		    					$('#revBairro').val('');
				    	    	loading.hide();
							}
						});
						
					}else{
						$('#revEstado').val('');
	    	    		$('#revEstadoHidden').val('');
    					$('#revCidade').val('');
    					$('#revEndereco').val('');
    					$('#revBairro').val('');
					}
				}
				
			});
			/**
			 * Gatilho para alimentar o estado no campo hidden
			 */
			$(document).on("change", "#revEstado", function() {
				$('#revEstadoHidden').val( $('#revEstado').val() );
			});
			$(document).on("keyup blur", "#revTelefone", function() {	
				funcoes.mascaraTelefone('revTelefone');
			});
			/**
			 * Gatilho para marcara de telefone da revenda que realizou o atendimento
			 */
			$(document).on("keyup blur", "#revTecAcompAtendimentoTel", function() {	
				funcoes.mascaraTelefone('revTecAcompAtendimentoTel');
			});
			
			//Atendimento
			/**
			 * Quando clica para add um atendimento
			 */
			$(document).on("click", "#btnAddAtendimento", function() {
				funcoes.addAtendimento();
			});
			/**
			 * Gatilho para marcara de telefone
			 */
			$(document).on("keyup blur", "#atdTelPessoaAcompAtend", function() {	
				funcoes.mascaraTelefone('atdTelPessoaAcompAtend');
			});
			/**
			 * Quando muda a opção de Atendimento Finalizado
			 */
			$(document).on("change", "input:radio[name='atdAtendimentoFinalizado']", function() {
				var atdAtendimentoFinalizado = $("input:radio[name='atdAtendimentoFinalizado']:checked").val();
				
				if(atdAtendimentoFinalizado == 'nao'){
					$('#divFalha').show();
					
					let qtdFalhas = 0;
					$("input[name*=falCodFamiliaItem___]").each(function(){
						let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
						qtdFalhas++;

						//Família
						$("#falCodFamiliaItem___"+ indexTbFalha).val( $("#maqCodFamilia").val() );
						$("#falCodFalhaFamiliaItem___"+ indexTbFalha).val( $("#maqCodFalhaFamilia").val() );
						$("#falFamiliaItem___"+ indexTbFalha).val( $("#maqDescFamilia").val() );
						//Modelo Máquina
						$("#falCodFalhaModeloMaquinaItem___"+ indexTbFalha).val( $("#maqCodFalhaModeloMaquina").val() );
						$("#falModeloMaquinaItem___"+ indexTbFalha).val( $("#maqDescModeloMaquina").val() );
					});

					//Se não tiver nenhuma linha, adiciona a primeira linha.
					if(qtdFalhas == 0){
						funcoes.addFalha();
					}
				}else{

					let temFalhas = false;
					$("input[name*=falCodFamiliaItem___]").each(function(){
						temFalhas = true;
					});

					if(temFalhas){
						//Opção para quando troca de 'não' para 'sim' na falha, faz uma confirmação, antes de limpar toda a tabela.
						FLUIGC.message.confirm({
							message: `A tabela de descrição da falha está preenchida e será removida se for marcado como <b>Atendimento Finalizado? 'Sim'</b>.<br><br>Tem certeza que deseja selecionar a opção Atendimento Finalizado como <b>Sim</b>?`,
							title: 'Confirmação',
							labelYes: 'Sim',
							labelNo: 'Não',
						}, function (result) {
							console.log(result)
							if (result) {
								$('#divFalha').hide();
					
								$("input[name*=falCodFamiliaItem___]").each(function(){
									//Remove linhas  de Falha
									fnWdkRemoveChild(this);
								});
							}else{
								$("#atdAtendimentoFinalizadoNao").prop("checked", true);
							}
						});

					}else{
						//Só para garantir de que quando colocar 'Sim', não vai cadastrar falha
						$('#divFalha').hide();
					
						$("input[name*=falCodFamiliaItem___]").each(function(){
							//Remove linhas  de Falha
							fnWdkRemoveChild(this);
						});
					}

				}
				
			});
			//Descrição da Falha
			$(document).on("click", "#divBtnAddFalha", function() {
				
				funcoes.addFalha();

			});
			/*
			 * Comunicação
			 */
			/**
			 * Quando seleciona a opção 'Status'
			 */
			$(document).on("change", "#solStatus", function() {
				let solStatus = $('#solStatus').val().trim();
				
				$('#getStatus').text(solStatus);
				if(solStatus == 'Finalizado'){
					$('#divSolEncaminharSolicitacao').hide();
					$('#solEncaminharSolicitacao').val('');
					$('#divSolFinalizarSolicitacao').show();
					
				}else{
					$('#divSolEncaminharSolicitacao').show();
					$('#divSolFinalizarSolicitacao').hide();
					$('#solFinalizarSolicitacao').prop('checked', false);
					
				}
				
				//Ajusta na tabela de comunicação o status da última linha
				$("input[name*=comIdItem___]").each(function(){
					let indexTbComunicacao = validafunctions.getPosicaoFilho($(this).attr("id"));

					let comIdItem = $('#comIdItem___' + indexTbComunicacao).val();
					let comDataItem = $('#comDataItem___' + indexTbComunicacao).val();
					
					if(comIdItem != "" &&  comDataItem == ""){
						$('#comStatusItem___' + indexTbComunicacao).val(solStatus);
					}
				});
				
			});

			
		}
	}
})();

function loadForm(){
	
	const today = new Date();
	
	if(CURRENT_STATE == INICIO_0)
	{	
		//Revenda
		$('#revCpfCnpj').mask("00.000.000/0000-00");
		funcoes.mascaraCep('revCEP');
		funcoes.mascaraTelefone('revTelefone');
		$('#revTecAcompAtendimentoCPF').mask("000.000.000-00");
		funcoes.mascaraTelefone('revTecAcompAtendimentoTel');
		
		//Atendimento
		FLUIGC.calendar('#atdDataAtendimento',{
			  language: 'pt-br',
			  maxDate: today,
			  pickDate: true,
			  pickTime: false,
			  showToday: true
		});
		FLUIGC.calendar('#atdHoraInicial',{
			  language: 'pt-br',
			  pickDate: false,
			  pickTime: true,
			  showToday: true
		});
		FLUIGC.calendar('#atdHoraFinal',{
			  language: 'pt-br',
			  pickDate: false,
			  pickTime: true,
			  showToday: true
		});
		
		$('#atdHoraInicial').mask("00:00");
		$('#atdHoraFinal').mask("00:00");
		$('#atdDeslocamento').mask("00:00");
		$('#atdIntervalo').mask("00:00");
		
		funcoes.mascaraTelefone('atdTelPessoaAcompAtend');
		
		
	}else if(CURRENT_STATE == INICIO || CURRENT_STATE == TECNICO_COMPLEMENTA ){
		
		if( FORM_MODE == 'MOD'){
			//Dados Gerais
			if($('#maqCodFamilia').val() != ''){
				//Modelo Máquina
				reloadZoomFilterValues('maqDescModeloMaquina', 'tipoFiltro,modelos,codFamilia,'+$('#maqCodFamilia').val() );
				$("input[name*=falCodFamiliaItem___]").each(function(){
					let indexTbFalha = validafunctions.getPosicaoFilho($(this).attr("id"));
					reloadZoomFilterValues('falGrupoMaquinaItem___'+ indexTbFalha, 'tipoFiltro,grupo,codFamilia,'+$('#maqCodFamilia').val() );
				
					if( $('#falCodFalhaGrupoMaquinaItem___'+ indexTbFalha).val() != ''){
						//Falha
						reloadZoomFilterValues('falDescFalhaFalhaItem___'+ indexTbFalha, 'tipoFiltro,falha,codFamilia,' + $('#maqCodFamilia').val() +',codFalhaGrupo,'+ $('#falCodFalhaGrupoMaquinaItem___'+ indexTbFalha).val() );
					}
				});
			}

			
			//Cliente
			if( ($('#gerNumeroOS').val().trim() != '' && $('#gerNumeroOS').val().trim() != '0') && $('#cliCodigo').val().trim() == ''){
				funcoes.somenteLeituraCamposCliente(false);
			}
			//Revenda
			if( ($('#gerNumeroOS').val().trim() != '' && $('#gerNumeroOS').val().trim() != '0') ){
				
				
				let codigoTecnicoGTS = $('#codigoTecnicoGTS').val().trim();
				let gerNumeroOS = $('#gerNumeroOS').val().trim();
				//Consulta de tem Revenda associada, se não tiver libera os campos.
				var cstRev1 = DatasetFactory.createConstraint("codigoTecnicoGTS", codigoTecnicoGTS, codigoTecnicoGTS, ConstraintType.MUST);
				var cstRev2 = DatasetFactory.createConstraint("numeroOS", gerNumeroOS, gerNumeroOS, ConstraintType.MUST);
				var cstRev   = new Array(cstRev1, cstRev2);
				var dsCompOSConsultaRevendas = DatasetFactory.getDataset( 'dsCompOSConsultaRevendas' , null, cstRev , null) 
				console.log(dsCompOSConsultaRevendas)
				if (dsCompOSConsultaRevendas != null && dsCompOSConsultaRevendas.values != null && dsCompOSConsultaRevendas.values.length > 0) {
			        var revRecords = dsCompOSConsultaRevendas.values;
		            var revRecord = revRecords[0];
		            
		            if( revRecord.CODRET == "1"){
		            	//Se retornar somente 1 Revenda, já define ela no formulário, se não, mostra pelo campo zoom.
		            	if(revRecords.length == 1){
		            		funcoes.somenteLeituraCamposRevenda(true);
		            	}else{
		            		$('#divRevNomeRevenda').hide();
			            	$('#divRevNomeRevendaZoom').show();
			            	reloadZoomFilterValues('revNomeRevendaZoom', 'codigoTecnicoGTS,'+codigoTecnicoGTS+',numeroOS,'+gerNumeroOS );
		            	}
		            }else if( revRecord.CODRET == "2"){
		            	funcoes.somenteLeituraCamposRevenda(false);
		            }
				}
				
			}
			$('#revCpfCnpj').mask("00.000.000/0000-00");
			funcoes.mascaraCep('revCEP');
			funcoes.mascaraTelefone('revTelefone');
			$('#revTecAcompAtendimentoCPF').mask("000.000.000-00");
			funcoes.mascaraTelefone('revTecAcompAtendimentoTel');
			
			//Atendimento
			FLUIGC.calendar('#atdDataAtendimento',{
				  language: 'pt-br',
				  maxDate: today,
				  pickDate: true,
				  pickTime: false,
				  showToday: true
			});
			FLUIGC.calendar('#atdHoraInicial',{
				  language: 'pt-br',
				  pickDate: false,
				  pickTime: true,
				  showToday: true
			});
			FLUIGC.calendar('#atdHoraFinal',{
				  language: 'pt-br',
				  pickDate: false,
				  pickTime: true,
				  showToday: true
			});
			
			$('#atdHoraInicial').mask("00:00");
			$('#atdHoraFinal').mask("00:00");
			$('#atdDeslocamento').mask("00:00");
			$('#atdIntervalo').mask("00:00");
			
			funcoes.mascaraTelefone('atdTelPessoaAcompAtend');
		}
		
	}else if(CURRENT_STATE == SUPORTE_GTS){
		
		if( FORM_MODE != 'VIEW'){
			let parametro = [];
			parametro['tipoUsuario'] = 'Suporte GTS';
			funcoes.addLinhaComunicacao(parametro);
		}
		
	}else if(CURRENT_STATE == TECNICO_GTS){
		
		if( FORM_MODE != 'VIEW'){
			let param = [];
			param['tipoUsuario'] = 'Técnico GTS';
			funcoes.addLinhaComunicacao(param);
		}
		
	}else if(CURRENT_STATE == SETOR_GTS){
		
		if( FORM_MODE != 'VIEW'){
			let param = [];
			param['tipoUsuario'] = 'Setor GTS';
			funcoes.addLinhaComunicacao(param);
		}
		
	}
	
	
}

function removeAtendimento(oElement){
	
	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const atdDataAtendimentoItem = $(`#atdDataAtendimentoItem___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro de atendimento do dia <b>${atdDataAtendimentoItem}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
            	fnWdkRemoveChild(oElement);
            	funcoes.calculaTotaisAtendimento();
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeAtendimento")
        console.error(e)
    }
    
	
}

function removeFalha(oElement){
	
	try {
		const indice = validafunctions.getPosicaoFilho($(oElement).closest('tr').find("input")[0].id);
        const falCodigoFalhaItem = $(`#falCodigoFalhaItem___${indice}`).val() || "";
        FLUIGC.message.confirm({
            message: `Deseja remover o registro de falha <b>${falCodigoFalhaItem}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
            	fnWdkRemoveChild(oElement);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeAtendimento")
        console.error(e)
    }
    
	
}