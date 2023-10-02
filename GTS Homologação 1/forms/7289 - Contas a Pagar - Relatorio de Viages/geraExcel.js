function gerarPlanilha() {
    // Obter os valores dos campos HTML
    var solMatSol = document.getElementById("solMatSol").value;
    var solNomeSol = document.getElementById("solNomeSol").value;
    var solDataSol = document.getElementById("solDataSol").value;

    // Criar um CSV com os valores
    var csv = "solMatSol 1, solNomeSol 2, solDataSol 3\n" + solMatSol + "," + solNomeSol + "," + solDataSol;

    // Criar um objeto Blob a partir do CSV
    var blob = new Blob([csv], { type: 'text/csv' });

    // Criar um link para fazer o download do arquivo
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "dados.csv";
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}