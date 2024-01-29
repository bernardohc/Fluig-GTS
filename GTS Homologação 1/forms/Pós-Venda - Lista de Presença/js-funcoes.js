$(document).ready(function() {wdkAddChild
	setTimeout(function() {
		funcoes.start();
	}, 100)	
});

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);


	return {
		start : function() {
			//eventsFuncoes.setup();
		},

		addParticipante: function(){
			const tablename = "tbListaPresenca"
			const indice = wdkAddChild(tablename);

			let addCodigoParti = document.getElementById("addCodigoParti").value;
			let addListaNome = document.getElementById("addListaNome").value;
			let addListaRevenda = document.getElementById("addListaRevenda").value;


			$('[name^="listaNome___"]'); //trará todos os campos filhos deste formulário. 
			// //Aqui percorrerá todos os itens.
			for(var i = 0; i < $('[name^="listaNumero___"]').length; i++){
				$(`#listaNumero___${indice}`).val(addCodigoParti).prop("readonly", true);
				$(`#listaNome___${indice}`).val(addListaNome).prop("readonly", true);
				$(`#listaRevenda___${indice}`).val(addListaRevenda).prop("readonly", true);
				//$(`#pesqOcorreAponta___${indice}`).val(pesqOcorrenciaApontamento).prop("readonly", true);

				
			}	

			//limpa campos ao inserir participante
			// const limpaddCodigoParti = document.querySelector('#addCodigoParti');
			// limpaddCodigoParti.value = '';
			const limpAddListaNome = document.querySelector('#addListaNome');
			limpAddListaNome.value = '';
			const limpaddListaRevenda = document.querySelector('#addListaRevenda');
			limpaddListaRevenda.value = '';

			//Adiciona o Id de código de despesa
			let addCodigoPartiNext = parseInt($("#addCodigoParti").val()) + 1;
			$("#addCodigoParti").val(addCodigoPartiNext);

			
		},

		//Valida os dados da despesa antes de enviar pro pai x filho
		validaAddParticipante : function(){

			let addNovoItem = true;

			let addListaNome = $("#addListaNome").val();
			let addListaRevenda = $("#addListaRevenda").val();

			if (addListaNome.trim() !=='' && addListaRevenda.trim() !=='') {
				funcoes.addParticipante();
			} else if (addListaNome.trim() === '' && addListaRevenda.trim() ===''){
				FLUIGC.toast({ title: '', message: "É preciso preencher os campos para um novo participante", type: 'warning' });
			}else{
				if (addListaNome.trim() === ''){
					FLUIGC.toast({ title: '', message: "É preciso preencher o nome para adicionar um novo participante.", type: 'warning' });
				}else{
					FLUIGC.toast({ title: '', message: "É preciso preencher a revenda para adicionar um novo participante.", type: 'warning' });
				}
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


$(document).on("click", "#addListaParticipante", function() {
	funcoes.validaAddParticipante();	
});



function loadForm(){	

	
}
	


