$("#cep").blur(function(){
    $.getJSON("//viacep.com.br/ws/"+ $("#cep").val() +"/json/", function(dados){
      $("#rua").val(dados.logradouro);
      $("#bairro").val(dados.bairro);
      $("#cidade").val(dados.localidade);
      $("#estado").val(dados.uf);
      })
  });