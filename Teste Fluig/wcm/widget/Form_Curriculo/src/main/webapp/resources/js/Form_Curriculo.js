var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {

    },

    bindings: {
        local: {
            'show-message': ['click_showMessage']
        }
    },

    showMessage: function () {
        
    	var nome   = $('#nome').val();
		var email  = $('#email').val();
		var linkedin    = $('#linkedin').val();
		var perfil    = $('#perfil :selected').val();
    	
        var _xml = null;
		$.ajax({
			url : '/Form_Curriculo/resources/js/xml/form_template.xml',
			async : false,
			type : "get",
			datatype : "xml",
			success : function(xml) {
				_xml = $(xml);
			}
		});
		
		_xml.find("documentDescription").text("Curriculo de " + nome);
		
		
		_xml.find("[name='nome']").text(nome);
		_xml.find("[name='perfil']").text(perfil);
		_xml.find("[name='linkedin']").text(linkedin);
		_xml.find("[name='email']").text(email);
		


		WCMAPI.Create({
			url : "/webdesk/ECMCardService?wsdl",
			contentType : "text/xml",
			dataType : "xml",
			data : _xml[0],
			success : function(data) {
				FLUIGC.toast({
			        title: 'Obrigado! ',
			        message: 'Seu currículo foi salvo com sucesso.',
			        type: 'success'
			    });
			}
		});

		
    }
});