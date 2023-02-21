var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
        //code
        if(this.isEditMode){

            var settings = {
                changeDelay: 200,
                control: 'wheel',
                defaultValue: '#58595b',
                inline: false,
                letterCase: 'lowercase',
                opacity: true,
                position: 'bottom left',
                customColorNames: {
                    'mycustomcolor': '#123456'
                }
            } 
            var myColorPicker = FLUIGC.colorpicker('#colorpicker-example-generic', settings);

        }else{
            alert("Modo Visualização");
        }

    },

    bindings: {
        local: {
            'show-message': ['click_showMessage'],
            'show-click':['click_btn1'],
            'show-dblclick':['dblclick_btn2'],
            'show-keypress':['keypress_btn3'],
            'show-mouseOver':['mouseover_btn4'],
            'save':['click_save'],
        }
    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    },

    btn1: function(){
        $("#text01").css("background-color", "red");
    },

    btn2: function(){
        $("#text02").css("background-color", "green");
    },

    btn3: function(){
        $("#text03").css("background-color", "yellow");
    },

    btn4: function(){
        $("#text04").css("background-color", "grey");
    },

    save: function(){
        var args = {};
        args.cor = $("#colorpicker-example-generic", this.DOM).val();

        var result = WCMpaceAPI.PageService.UPDATEPREFERENCES({assync:false}, this.instanceID, args )

        if(result){
            WCMC.messageInfo(result.essage);
        }else{
            WCMC.messageError("Erro");
        }
    },
});