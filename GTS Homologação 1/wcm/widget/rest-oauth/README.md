# Múltiplas Consultas REST
---

Esse é um exemplo de uma widget que faz múltiplas requisições ao fluig utilizando OAUTH.

  * Pré-Requisito
       - Maven configurado no computador.
       - Ter um [OAuth App](http://tdn.totvs.com/x/54L5DQ) cadastrado fluig.

Para utilizar o exemplo basta editar a classe ConnectRest, colocar os dados do seu servidor no método config e colocar as chaves do OAuth App nas variáveis FLUIG_CONSUMER_KEY e FLUIG_CONSUMER_SECRET.

A compilação da widget deve ser feita através do comando "mvn clean install", no terminal, após isso vai ser gerado um .war na pasta target dentro da raiz do projeto, esse arquivo gerado deve ser *deployado* via central de componentes.
