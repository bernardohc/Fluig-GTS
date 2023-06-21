//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);

	return {
		start : function() {
			eventsFuncoes.setup();
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
	


