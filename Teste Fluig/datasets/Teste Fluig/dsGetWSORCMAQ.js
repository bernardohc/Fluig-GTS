function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    //Iniciar o dataset
    var dataset = DatasetBuilder.newDataset();

    //Consulta o campo
    //var prdcod = DatasetFactory.createConstraint("Campo", "valor_inicial", "valor_final", tipo);
    var prdcod = DatasetFactory.createConstraint("prdcod", "IPCX03002003", "IPCX03002003", ConstraintType.MUST);

    //Chamada do dataset
    //var dataset = DatasetFactory.getDataset("Nome do dataset da consulta", fields, constraint como array, order field(Ordenação do campo))
    var dataset = DatasetFactory.getDataset("dsWSORCMAQ", null, new Array(prdcod), null);

    return dataset

}function onMobileSync(user) {

}