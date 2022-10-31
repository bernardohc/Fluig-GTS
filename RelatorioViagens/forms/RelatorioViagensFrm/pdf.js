function printDiv() {
    alert("IMPRIMINDO")
    var originalContents = document.body.innerHTML;

    var HTML = 
         '<HTML align="top" id="divTestePrint">'+
         ' <head>    '+
         ' <link rel="stylesheet" href="css/style.css"/> ' +
         '  <style type="text/css" media="print">'+

         '    @page {'+
         '       margin: 0.5cm;'+

         ' }  '+

         '          @media print {'+
         '               * { margin: 0 !important; padding: 0 !important; }'+
         '               #controls, .footer, .footerarea{ display: none; }'+
         '               html, body {'+
         '                 height:100%; '+
         '                 overflow: hidden;'+
         '                 background: #FFF; '+
         '                 font-size: 9.5pt;'+
         '               }'+

         '               .template { width: auto; left:0; top:0; }'+
         '               img { width:100%; }'+
         '               li { margin: 10px 10px 10px 20px !important;}'+
         '     }         '+


         '  </style>'+


         ' </head>    '+    

         '<BODY align="top"> '+
         '  <table style="width:100%">'+
         '  <tr>'+
         '     <td style="text-align:left;"> TRANSFERÊNCIA DE MATERIAIS</th>'+
         '  </tr>'+
         '  <tr>'+
         '     <td style="text-align:left;">EMPRESA</th>'+
         '  </tr>'+         


         '  </table>'+
         '  <table style="border:1px solid black;border-collapse:collapse;" >'+
         '    <thead> '+
         '        <tr class="tableHeadRow"> '+
         '            <th class="tableColumn" style="border:1px solid black;text-align:center;width:10%;">Código</th> '+
         '            <th class="tableColumn" style="border:1px solid black;text-align:center;width:70%;">Descrição</th> '+         
         '            <th class="tableColumn" style="border:1px solid black;text-align:center;width:10%;">UM</th> '+
         '            <th class="tableColumn" style="border:1px solid black;text-align:center;width:10%;">QTD</th> '+
         '        </tr> '+
         '    </thead> '+     
         '  <tbody> ';

        $("input").each( function(index, value) {
             var name = $(this).attr('id');

             if ( Left( name, 6 ) == "IDPRD_" ){

                 item = "___" + name.split("___")[1] ;

                 codigoComponente = $("[name='codigoComponente"+item+"']").val();
                 descricao        = $("[name='descricaoComponente"+item+"']").val();
                 unidade          = $("[name='medidaComponente"+item+"']").val();
                 quantidade       = $("[name='qtdComponente"+item+"']").val();
                 HTML = HTML +
                     '      <tr class="tableBodyRow">     '+    
                     '        <td style="border:1px solid black;text-align:center;width:15%;">'+codigoComponente+'</td> '+ 
                     '        <td style="border:1px solid black;text-align:center;width:40%;">'+descricao+'</td> '+
                     '        <td style="border:1px solid black;text-align:center;width:10%;">'+unidade+'</td> '+         
                     '        <td style="border:1px solid black;text-align:left;width:35%;">'+quantidade+'</td> '+        
                     '    </tr> ' ;    
             }
        });


        HTML = HTML +     

         '  </tbody> '+
         '  </table> '+        
         ' <br/> <br/> <br/> <br/> <br/> <br/>'+
         '  <table style="width:100%">'+

             '  <tr>'+
             '     <td style="width:70%"></th>'+
             '     <td style="text-align:center;">______________________________</th>'+
             '  </tr>'+
             '  <tr>'+
             '     <td style="width:70%"></th>'+             
             '     <td style="text-align:center;"><B>Solicitante</B></th>'+
             '  </tr>'+
             '  <tr>'+
             '     <td style="width:70%"></th>'+             
             '  </tr>'+         
         '  </table>'+


         '</BODY>'+
         '</HTML>';

    tela_impressao = window.open('about:blank');
    tela_impressao.document.write('<html><body><div id="demo"></div></body></html>');
    tela_impressao.document.getElementById("demo").innerHTML = HTML;
    tela_impressao.window.print();//abre janela de impressão
    tela_impressao.window.close();//fecha janela de impressão após imprimir ou cancela   
}