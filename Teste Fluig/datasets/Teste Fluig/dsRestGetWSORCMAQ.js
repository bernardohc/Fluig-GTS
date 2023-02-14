function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    //Variavel codido do produto
    var ccod = "0203124000"
    //Variavel apontando para api
    var servicoURL= "http://gtsdo143182.protheus.cloudtotvs.com.br:1457/rest/PRODUTOS_SB1?ccod=" +ccod;

    //Variavel para passar parametros de autenticação da api, nesse caso vazio.
    var myApiConsumer =  oauthUtil.getGenericConsumer("","", "", "");
    //a variavel recebe a autenticação juntamente com o endereço
    var data = myApiConsumer.get(servicoURL); 

    //Cria o dataset
    var dataset = DatasetBuilder.newDataset(); 

    //objdata recebe o retorno da data em formato de objeto JSON
    var objdata = JSON.parse(data);
    
    //Cria as colunas
    dataset.addColumn('Descrição');
	dataset.addColumn('Tipo');

    dataset.addRow([objdata['Descricao '], objdata['Tipo ']]);

    return dataset;
    

}function onMobileSync(user) {

}