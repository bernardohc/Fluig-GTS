function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    //Cria o dataset
    var dataset = DatasetBuilder.newDataset();

    //Cria coluna do retorno
    dataset.addColumn('Retorno_post');
    //Api do fluig que possui metodo de autorização do client service
    var clienteService =  fluigApi.getAuthorizeClientService();

    var data = {
        //numero da empresa
        companyId: 1 + '',
        //serviço rest cadastrado no fluig
        serviceCode: 'API_PRODUTO',
        endpoint: '/rest/PRODUTOS_SB1',
        method: 'get',
        timeoutService: '100',
        //propriedades que vai ser passado
        params: {
            Cod: '000055',
            Descr: 'BORRACHA BRANCA',
            TIPO: 'PA'
        },

}

//Chamada da requisição
var vo = clientService.invoke(JSON.stringify(data));

if (vo.getResult() == null || vo.getResult().isEmpty()) {
    dataset.addRow(new Array("Retorno esta vazio"))
} else {
    dataset.addRow(new Array(vo.getResult()))
}


return dataset; 


}function onMobileSync(user) {

}