var HelloWorld = SuperWidget.extend({
    tenantId: null,

    init: function () {

    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },
    
    userInfo: function(){
        var tenantId = this.tenantId;
		$.ajax({
			url: '/restOauth/rest/conn/userInfo',
//			url: '/restOauth/rest/conn/userInfo/' + tenantId,
			type: 'GET',
			contentType: 'application/json',
		}).done(function(data,textStatus,jqXHR) {
			console.log(data.content);
		}).fail(function(jqXHR,textStatus,errorThrown) {
			FLUIGC.toast({
				message: "ERRO: " + errorThrown,
				type: 'danger'
			});
			console.log("ERRO: " + errorThrown);
		}).always(function() {
		});
    },
    
    consulta: function(){
   		var tenantId = this.tenantId;
        $.ajax({
//            url: '/restOauth/rest/conn/search/' + tenantId,
            url: '/restOauth/rest/conn/search',
            type: 'GET',
            contentType: 'application/json',
        }).done(function(data,textStatus,jqXHR) {
            console.log(data.content);

        }).fail(function(jqXHR,textStatus,errorThrown) {
            console.log('ERRO: ' + errorThrown);
            FLUIGC.toast({
                title: 'ERRO: ',
                message: errorThrown,
                type: 'danger'
            });
        }).always(function() {

        });
    },
    
    dataset: function(){
    	
    	var parms = {
                "name": "dsConsultaSACByProtocolo",
                "fields": [],
                "constraints":  [{
                	"_field": "numProtocoloFluig",
                	"_initialValue": "202106010004965",
                	"_finalValue": "202106010004965",
                	"_type": 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
                	"_likeSearch": false
                },{
                	"_field": "cpfCnpjRequisitante",
                	"_initialValue": "069.451.439-02",
                	"_finalValue": "069.451.439-02",
                	"_type": 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
                	"_likeSearch": false
                }],
                "order": []
            }
    	
    	
    	var request_data = {
        		url: WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets',
        		method: 'POST',
        		parms: JSON.stringify(parms)
        		
        	}
    	
    	
    	console.log('parms-dale');
    	console.log(request_data);
    	console.log( JSON.stringify(request_data) );
    	
        $.ajax({
            url: '/restOauth/rest/conn/datasets',
            type: 'POST',
            data: JSON.stringify(request_data),
            async: false,
            contentType: 'application/json',
        }).done(function(data,textStatus,jqXHR) {
            console.log('foi um novo dataset');
            console.log(data);
            console.log(data.content);
            console.log(data.content.values[0]);
            
        }).fail(function(jqXHR,textStatus,errorThrown) {
            console.log('ERRO: ' + errorThrown);
            FLUIGC.toast({
                title: 'ERRO: ',
                message: errorThrown,
                type: 'danger'
            });
        }).always(function() {

        });
    },
    
    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
//        this.consulta();
//        this.userInfo();
        
        this.dataset();
    }
});