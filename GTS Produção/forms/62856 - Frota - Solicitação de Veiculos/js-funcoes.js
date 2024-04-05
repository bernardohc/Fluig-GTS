
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
// Gatilhos entrega
$(document).on("change", "input:radio[name='entVistExt']", function() {	
	let entVistExt = $("input:radio[name='entVistExt']:checked").val();
	if( entVistExt == 'Não'){
		$('#entVistExtObs').show();
	}else{
		$('#entVistExtObs').val('');
		$('#entVistExtObs').hide();
	}
});

$(document).on("change", "input:radio[name='entVistInt']", function() {	
	let entVistInt = $("input:radio[name='entVistInt']:checked").val();
	if( entVistInt == 'Não'){
		$('#entVistIntObs').show();
	}else{
		$('#entVistIntObs').val('');
		$('#entVistIntObs').hide();
	}
});

$(document).on("change", "input:radio[name='entPneus']", function() {	
	let entPneus = $("input:radio[name='entPneus']:checked").val();
	if( entPneus == 'Não'){
		$('#entPneusObs').show();
	}else{
		$('#entPneusObs').val('');
		$('#entPneusObs').hide();
	}
});

$(document).on("change", "input:radio[name='entLantFarois']", function() {	
	let entLantFarois = $("input:radio[name='entLantFarois']:checked").val();
	if( entLantFarois == 'Não'){
		$('#entLantFaroisObs').show();
	}else{
		$('#entLantFaroisObs').val('');
		$('#entLantFaroisObs').hide();
	}
});

$(document).on("change", "input:radio[name='entLonaMar']", function() {	
	let entLonaMar = $("input:radio[name='entLonaMar']:checked").val();
	if( entLonaMar == 'Não'){
		$('#entLonaMarObs').show();
	}else{
		$('#entLonaMarObs').val('');
		$('#entLonaMarObs').hide();
	}
});

$(document).on("change", "input:radio[name='entOrgLimpe']", function() {	
	let entOrgLimpe = $("input:radio[name='entOrgLimpe']:checked").val();
	if( entOrgLimpe == 'Não'){
		$('#entOrgLimpeObs').show();
	}else{
		$('#entOrgLimpeObs').val('');
		$('#entOrgLimpeObs').hide();
	}
});

$(document).on("change", "input:radio[name='entObjVeiculos']", function() {	
	let entObjVeiculos = $("input:radio[name='entObjVeiculos']:checked").val();
	if( entObjVeiculos == 'Sim'){
		$('#entObjVeiculosObs').show();
	}else{
		$('#entObjVeiculosObs').val('');
		$('#entObjVeiculosObs').hide();
	}
});

//Gatilho Devolução
$(document).on("change", "input:radio[name='devVistExt']", function() {	
	let devVistExt = $("input:radio[name='devVistExt']:checked").val();
	if( devVistExt == 'Não'){
		$('#devVistExtObs').show();
	}else{
		$('#devVistExtObs').val('');
		$('#devVistExtObs').hide();
	}
});

$(document).on("change", "input:radio[name='devVistInt']", function() {	
	let devVistInt = $("input:radio[name='devVistInt']:checked").val();
	if( devVistInt == 'Não'){
		$('#devVistIntObs').show();
	}else{
		$('#devVistIntObs').val('');
		$('#devVistIntObs').hide();
	}
});

$(document).on("change", "input:radio[name='devPneus']", function() {	
	let devPneus = $("input:radio[name='devPneus']:checked").val();
	if( devPneus == 'Não'){
		$('#devPneusObs').show();
	}else{
		$('#devPneusObs').val('');
		$('#devPneusObs').hide();
	}
});

$(document).on("change", "input:radio[name='devLantFarois']", function() {	
	let devLantFarois = $("input:radio[name='devLantFarois']:checked").val();
	if( devLantFarois == 'Não'){
		$('#devLantFaroisObs').show();
	}else{
		$('#devLantFaroisObs').val('');
		$('#devLantFaroisObs').hide();
	}
});

$(document).on("change", "input:radio[name='devLonaMar']", function() {	
	let devLonaMar = $("input:radio[name='devLonaMar']:checked").val();
	if( devLonaMar == 'Não'){
		$('#devLonaMarObs').show();
	}else{
		$('#devLonaMarObs').val('');
		$('#devLonaMarObs').hide();
	}
});

$(document).on("change", "input:radio[name='devOrgLimpe']", function() {	
	let devOrgLimpe = $("input:radio[name='devOrgLimpe']:checked").val();
	if( devOrgLimpe == 'Não'){
		$('#devOrgLimpeObs').show();
	}else{
		$('#devOrgLimpeObs').val('');
		$('#devOrgLimpeObs').hide();
	}
});

$(document).on("change", "input:radio[name='devObjVeiculos']", function() {	
	let devObjVeiculos = $("input:radio[name='devObjVeiculos']:checked").val();
	if( devObjVeiculos == 'Sim'){
		$('#devObjVeiculosObs').show();
	}else{
		$('#devObjVeiculosObs').val('');
		$('#devObjVeiculosObs').hide();
	}
});


//Gatilho data set consulta veiculos
$(document).on("change", "#libVeiculoLiberado", function() {
	var index = validafunctions.getPosicaoFilho($(this).attr("id"));
				
	if( $(this).val().trim() == ""){
		funcoes.limpaCamposLibVeiculo(index);

	}else{
		funcoes.consultaVeiculo(index);	
	}

});

//Chama função para liberar campo outros motoristas
$(document).on("change", "#solQuantPessoas", function() {
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
}; 

function showCamera() {
	console.log("Camera")
	JSInterface.showCamera("Anexo");
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


};

