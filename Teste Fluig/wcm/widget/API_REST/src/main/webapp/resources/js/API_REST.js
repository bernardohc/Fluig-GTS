var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        //code
        var _this = this;

        var _Jsonret = null;

        $.ajax({

            async: false,
            type: "GET",
            datatype: "json",
            url: '/api/public/ecm/document/listDocument/0',
            success: function(retorno){
                _Jsonret = retorno;

                $.each(_Jsonret.content, function(k,v){
                    $("#lista_diretorios_" + _this.instanceId).append("<option value=" + v.id +">"+ v.description + "</option>") ;
                });
            }

        });

    },

    bindings: {
        local: {
            'carregaDiretorio': ['change_fnCarrega']
        }
    },

    fnCarrega: function(){
        var _this = this;

        var idDiretorio = $("#lista_diretorios_" + _this.instanceId).val();
        console.log(idDiretorio);
        var _Jsonret = null;

        $.ajax({

            async: false,
            type: "GET",
            datatype: "json",
            url: '/api/public/ecm/document/listDocument/' + idDiretorio,
            success: function(retorno){
                _Jsonret = retorno;

                var registros = _Jsonret.content.length;

                $("#bagde_diretorios_" + _this.instanceId).text(registros);

                $(".diretorios").remove();

                $.each(_Jsonret.content, function(k,v){
                    $("#relacionar_diretorios_" + _this.instanceId).append('<li class="list-group-item diretorios">' + v.description + '</li>') ;
                    });
                }

        });

    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    }
});