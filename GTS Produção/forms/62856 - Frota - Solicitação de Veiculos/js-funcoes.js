//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;

	return {
		start : function() {
			eventsFuncoes.setup();
		},

		limpaCamposLibVeiculo: function(indexItem){
			$("#libVeiculoLiberado").val('');
			$("#libPlaca").val('');
		},

		//Dataset consulta veiculos
		consultaVeiculo : function(indexItem){
			
			let codVeiculo = $("#libVeiculoLiberado").val();

			if( codVeiculo.trim() == "" ){
				return;
			}

			var loading = FLUIGC.loading(window);
			loading.show();
			
			$.ajax({
				type: "GET",
				dataType: "json",
				async: true,
				url: "/api/public/ecm/dataset/search?datasetId=dsConsultaVeiculo&filterFields=CBEM,"+codVeiculo,
				
				success: function (data, status, xhr) {
					if (data != null && data.content != null && data.content.length > 0) {
						const records = data.content;
						if( records[0].CODRET == "1"){
							var record = records[0];
							var placaVeiculo = record.CDESC;

							$("#libPlaca").val(placaVeiculo);
							console.log("Placa do Veiculo " + placaVeiculo);
							
						}else if (records[0].CODRET == "2"){
							FLUIGC.toast({ title: '', message: records[0].CMSG, type: 'warning' });
							funcoes.limpaCamposLibVeiculo(indexItem);
							
						}
						
					}else{
							FLUIGC.toast({ title: '', message: 'Erro ao consultar o item, comunicar o Administrador do Sistema!', type: 'danger' });
							funcoes.limpaCamposLibVeiculo(indexItem);
						}
					setTimeout(function(){ 
						loading.hide();
					}, 1000);
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
					FLUIGC.toast({
						title: '',
						message: 'Erro na consulta do Veiculo, comunicar Administrador do Sistema' ,
						type: 'danger'
					});
					funcoes.limpaCamposLibVeiculo(indexItem)
					loading.hide();
				}
			});
			
		},

		//Condição para ocultar campo outros motoristas
		liberOutrosMotoristas : function(){
			let solQuantPessoas = 0;
			solQuantPessoas = document.getElementById("solQuantPessoas").value;
			if(solQuantPessoas <= 1){
				$("[outrosMotoristas]").hide();
			}else{
				$("[outrosMotoristas]").show();
			}
		},

	}
})();

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {	

		}
	}
});

//Gatilho data set consulta veiculos
$(document).on("change", "#libVeiculoLiberado", function() {
	var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
	if( $(this).val().trim() == ""){
		funcoes.limpaCamposLibVeiculo(index);
		console.log("Limpou campo")

	}else{
		console.log("Acionou gatilho")
		funcoes.consultaVeiculo(index);	
	}

});

//Chama função para liberar campo outros motoristas
$(document).on("change", "#solQuantPessoas", function() {
	console.log("Libera outros motoristas");
	funcoes.liberOutrosMotoristas();
});

//Função para definir data atual
function dataAtual() {
    var data = new Date();
    var dia  = data.getDate();
    var mes  = data.getMonth() + 1;
    var ano  = data.getFullYear();

    dia  = (dia<=9 ? "0"+dia : dia);
    mes  = (mes<=9 ? "0"+mes : mes);

    var newData = dia+"/"+mes+"/"+ano;

    return newData;
} 

function loadForm(){
	//Adiciona a dataAtual ao campo data da solicitação
	$("#solDataSol").val(dataAtual);

	//Add Calendarios
	var today = new Date();	

	var solDataSaida = FLUIGC.calendar('#solDataSaida', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});

	var solHoraSaida = FLUIGC.calendar('#solHoraSaida', {
		language: 'pt-br',
		pickDate: false,
		pickTime: true,
	});

	var solPrevRetorno = FLUIGC.calendar('#solPrevRetorno', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});

	var entDataEntrega = FLUIGC.calendar('#entDataEntrega', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});

	var entHoraEntrega = FLUIGC.calendar('#entHoraEntrega', {
		language: 'pt-br',
		pickDate: false,
		pickTime: true,
	});

	var devDataDevolucao = FLUIGC.calendar('#devDataDevolucao', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});

	var devHorarioDevolucao = FLUIGC.calendar('#devHorarioDevolucao', {
		language: 'pt-br',
		pickDate: false,
		pickTime: true,
	});
	
}
	


