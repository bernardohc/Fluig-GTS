
$(document).ready(function() {
	setTimeout(function() {
		funcoes.start();
	}, 100)
	
	
});

var funcoes = (function() {
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {
			eventsFuncoes.setup();
		},
		
				
		/*
		 * Cabeçalho do produto
		 */
		
		limpaCampos : function(){
			$("#orcProdCod").val('');
			$("#orcProdQtd").val('');
			$("#orcProdDesc").val('');

			
		},
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
//			$(document).on("change", "#representante", function() {
//				alert('teste')
//				var representante = $('#representante').val();
//				alert(representante)
//			});
			
		}
	}
})();



function modal( title , html) {
    var myModal = FLUIGC.modal({
        title: title ,
        content: html,
        id: 'fluig-modal',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}


function loadForm(){
	
	if(CURRENT_STATE == INICIO_0)
	{	
	}else if(CURRENT_STATE == INICIO){
		
		if($('#tipoSolicitante').val() == 'GestorComercial' ){
			$(document).ready(function() {
				setTimeout(function() {
					
					var tipoRepresentante = $("#tipoRepresentante").val();
					if(tipoRepresentante != ""){
						window["gestorTerritorial"].disable(true);
					}
					
				}, 100)
			});
		}
	}
	
}

//Função para que quando selecionado algum registro dos campos zoom, realizei determinada ação
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "representante") { 
        $('#tipoRepresentante').val(selectedItem.RepComTipo);
        $('#WKUserRepresentante').val(selectedItem.RepComWKUser);
    	
    	//Se for um usuário Gestor Comercial Selecionando, já define qual é o Gestor Territorial automaticamente
        if($('#tipoUsuarioAtual').val() == 'GestorComercial' ){
        	if(selectedItem.RepComTipo == 'RepresentanteNacional'){
        		$('#WKUserGestorTerritorial').val(selectedItem.RepComGesTerWKUser);
        		setZoomData("gestorTerritorial", selectedItem.RepComGesTerNome);
        	}else{
        		//Se for Representante Exportação, vai limpar o Gestor Territorial, já que não tem Gestor TErritorial para Exportação
        		$('#WKUserGestorTerritorial').val('');
        		window["gestorTerritorial"].clear();
        		//Se for o Representante for Exportação, tira a opção de encaminhar para Gestor Territorial
        		$('#optEncaminhaGestorTerritorial').hide();
        	}
        	window["gestorTerritorial"].disable(true);
    	}
       
    } else if (selectedItem.inputId == "gestorTerritorial") { 
        
    	 $('#WKUserGestorTerritorial').val(selectedItem.gesTerWKUser);
         $('#gestorTerritorial').val(selectedItem.gesTerNome);
         
    }
}

function setZoomData(instance, value){
	window[instance].setValue(value);
}

//Função para que quando removido algum registro dos campos zoom, realizei determinada ação
function removedZoomItem(removedItem) {

	if (removedItem.inputId == "representante") {
		$('#tipoRepresentante').val('');
		$('#WKUserRepresentante').val('');
		$('#WKUserGestorTerritorial').val('');
		window["representante"].clear();
		
		if($('#tipoUsuarioAtual').val() == 'GestorComercial' ){
	   		 $('#WKUserGestorTerritorial').val('');
	   		 window["gestorTerritorial"].clear();
	   		 window["gestorTerritorial"].disable(false);
	   		 $('#optEncaminhaGestorTerritorial').show();
	   		 $('#encaminharAtividade').val('');
	   	}
		
	}else if(removedItem.inputId == "gestorTerritorial"){
		
		 $('#WKUserGestorTerritorial').val('');
		 window["gestorTerritorial"].clear();
         
	}
}