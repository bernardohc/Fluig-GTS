
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
		
				
		carregaDados : function(){
			
			
			var WKUser = getWKUser();
			var WKCompany = getWKCompany();
			var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', WKUser , WKUser, ConstraintType.MUST);
			var constraintColleague2 = DatasetFactory.createConstraint('colleaguePK.companyId', WKCompany , WKCompany, ConstraintType.MUST);
			var colunasColleague = new Array('colleagueName', 'mail');
			var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1, constraintColleague2), null);
			if(datasetColleague.values.length > 0){		
				var name = datasetColleague.values['0']["colleagueName"];
				var mail = datasetColleague.values['0']["mail"].toLowerCase();
				var telefone = datasetColleague.values['0']["extensionNr"];
				$("#orcNomeRevenda").append(name);  
				$("#orcEmailRevenda").append(mail);  
				$("#orcTelRevenda").append(telefone);  
			}
			
			var param = window.location.href.split("&")
            
			var codempresa = param[0].split("WDCompanyId=")[1]
			var documentID = param[1].split("WDParentDocumentId=")[1]
			var solicitacao = param[2].split("IDsolicitacao=")[1]
			
			$("#numOrcamento").append(solicitacao);  
			
			var c1 = DatasetFactory.createConstraint('solicitacao', solicitacao, solicitacao, ConstraintType.MUST);
           
            var datasetReturned = DatasetFactory.getDataset("dsFormOrcamento", null, new Array(c1), null);
           
            if(datasetReturned.values.length > 0){				
            	$("#orcNomeClienteFinal").append(datasetReturned.values['0']['orcNomeClienteFinal']);           	
            	$("#orcTelClienteFinal").append(datasetReturned.values['0']['orcTelClienteFinal']);
            	$("#orcDataOrcamento").append(datasetReturned.values['0']['DataAbertura']);
            	$("#orcObservacao").append(datasetReturned.values['0']['orcObservacao']);  
            	$("#totalPedido").append(datasetReturned.values['0']['totalPedido']);  
            	
            	var DocumentId = datasetReturned.values['0']['documentid']
            }
            
            
            
            var c1 = DatasetFactory.createConstraint('NumFormulario', DocumentId, DocumentId, ConstraintType.MUST);
            
            var datasetFilho = DatasetFactory.getDataset("dsFormOrcamentoItens", null, new Array(c1), null);
            
            var records = datasetFilho.values;
            for (var index in records) {
                var record = records[index];
                
                var codProd = record.orcCodProdutoItem;
                var desProd = record.orcDescProdutoItem;
                var qtdProd = record.orcQtdItem;
                var precoUnitProd = record.orcPrecoUnitItem;
                var NCMProd = record.orcNCMItem;
                var TotalProd = record.orcTotalItem;
             
				
                var newRow = $("<tr>");
                var cols = "";
                cols += '<td align=center class="font-item">' + qtdProd + '</td>';
                cols += '<td class="font-item">' + codProd + '</td>';
                cols += '<td class="font-item">' + desProd + '</td>';
                cols += '<td align=center class="font-item">' + NCMProd + '</td>';
                cols += '<td align=left class="font-item">' + precoUnitProd + '</td>';
                cols += '<td align=left class="font-item">' + TotalProd + '</td>';
                
                newRow.append(cols);
                $("#tbItensOrcamento").append(newRow);
        
        
            }
		},
		
	}
})();


var eventsFuncoes = (function() {
	return {
		setup : function() {	
			
			
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
	funcoes.carregaDados();
	window.print();
}