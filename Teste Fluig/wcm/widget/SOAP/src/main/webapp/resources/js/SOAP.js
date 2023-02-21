var HelloWorld = SuperWidget.extend({
    //método iniciado quando a widget é carregada
   init: function() {
   },
 
   //BIND de eventos
   bindings: {
       local: {
           'create': ['click_create']
       },
       global: {}
   },

   create: function(htmlElement, event) {
   
       
       
       var nome   = $('#Desc_pasta_'+this.instanceId).val();
        console.log(nome);
       var _xml = null;
       console.log(_xml + "_xml")
       $.ajax({
               url : '/SOAP/resources/js/xml/ECMFolderService_createSimpleFolder.xml',
               async : false,
               type : "GET",
               datatype : "xml",
               success : function(xml) {
                   _xml = $(xml)
               }

           });
       
     //Alterar os valores recuperados na variavel _xml
        _xml.find("companyId").text(WCMAPI.tenantCode);
        _xml.find("username").text("bernardo.correa");
        _xml.find("password").text("GTS@2022");
        _xml.find("parentDocumentId").text("8");
        _xml.find("publisherId").text('demo');
        _xml.find("documentDescription").text(nome);

       
       
       //Usar o metodo WCMAPI.Create para chamar o webservice
       WCMAPI.Create({
           url : "/webdesk/ECMFolderService?wsdl",
           contentType : "text/xml",
           dataType : "xml",
           data : _xml[0],
           success : function(data) {
               console.log(data);
               FLUIGC.toast({
                   title:'Aviso',
                   message:'Pasta Criada',
                   type:'success'
                       
               });
           
           }
       })
   
   }

});