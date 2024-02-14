// $(document).ready(function() {wdkAddChild
// 	setTimeout(function() {
// 		funcoes.start();
// 	}, 100)	
// });

//Aqui cria as funcioes
var funcoes = (function() {
	var loading = FLUIGC.loading(window);

	return {
		start : function() {
			//eventsFuncoes.setup();
		},

        openDocument : function(docId, docVersion) {
            var parentOBJ;
        
            if (window.opener) {
                parentOBJ = window.opener.parent;
            } else {
                parentOBJ = parent;
            }

            if (!parentOBJ.ECM) {
                parentOBJ.ECM = {};
            }
            
            if (!parentOBJ.ECM.documentView) {
                parentOBJ.ECM.documentView = {};
            }
        
            var cfg = {
                url : "/ecm_documentview/documentView.ftl",
                maximized : true,
                title : "Anexo",
                callBack : function() {
                    parentOBJ.ECM.documentView.getDocument(docId, docVersion);
                },
                customButtons : []
            };
                parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
        },

        gerarDataHora : function() {
            const dataAtual = new Date();
            const dia = dataAtual.getDate().toString().padStart(2, '0');
            const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
            const ano = dataAtual.getFullYear();
            //const hora = "08";
            //const minutos = "00";
            const hora = dataAtual.getHours().toString().padStart(2, '0');
            const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
        
            const carimboDataHora = `${dia}/${mes}/${ano}-${hora}:${minutos} `;
            
            $('#aberturaDoc').val(carimboDataHora);			
        },

        capturarValorCheckbox : function() {
            // Obtenha o elemento do checkbox
            var checkbox = document.getElementById('ckConfirma');

            const dataAtual = new Date();
            const dia = dataAtual.getDate().toString().padStart(2, '0');
            const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0.
            const ano = dataAtual.getFullYear();
            const hora = dataAtual.getHours().toString().padStart(2, '0');
            const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
        
            const carimboDataHora = `${dia}/${mes}/${ano}-${hora}:${minutos} `;
    
            // Verifique se o checkbox está marcado
            if (checkbox.checked) {
                // Se estiver marcado, capture o valor
                var valorCheckbox = checkbox.value;
    
                // Faça o que for necessário com o valor capturado
                console.log('Valor do checkbox:', valorCheckbox);
                $('#confirmaLeitura').val(valorCheckbox);	
                funcoes.gerarDataHora();
                $('#dtConfirmaLeitura').val(carimboDataHora);	
            } else {
                console.log('O checkbox não está marcado.');
                $('#confirmaLeitura').val("Não");
                funcoes.gerarDataHora();
                $('#dtConfirmaLeitura').val(carimboDataHora);
            }
        },

        dadosAdicionais : function(){
            console.log("Dados adicionais");
            $.ajax({
                url: '/api/public/2.0/users/getCurrent', 
                type: "GET",
            }).done(function(data) {
                var user_fluig     = data;
                var A1_COD        = user_fluig.content.extData.A1_COD;
                var A1_LOJA        = user_fluig.content.extData.A1_LOJA;
                var A1_TIPO        = user_fluig.content.extData.A1_TIPO;
            
                $("#A1_COD").val(A1_COD);
                $("#A1_LOJA").val(A1_LOJA);
                $("#A1_TIPO").val(A1_TIPO);
            });

        },

        //https://forum.fluig.com/1583-consultar-cadastro-de-dados-adicionais
		
	}
})();

$(document).on("click", "#btnPolitica", function() {
    funcoes.openDocument(86078, 1000);
    funcoes.gerarDataHora();
    funcoes.dadosAdicionais();
});

$(document).on("input", "#ckConfirma", function() {
    funcoes.capturarValorCheckbox();
});

//Aqui colocar os gatilhos
var eventsFuncoes = (function() {
	return {
		setup : function() {			
			
		}
		
	}
});

function loadForm(){	

}
	


