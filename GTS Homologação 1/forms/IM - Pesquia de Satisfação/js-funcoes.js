//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);

	return {
		start : function() {
			eventsFuncoes.setup();
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

	var pesqData = FLUIGC.calendar('#pesqData', {
		language: 'pt-br',
		minDate: today,
		pickDate: true,
		pickTime: false,
	});

	

	
	
}
	


