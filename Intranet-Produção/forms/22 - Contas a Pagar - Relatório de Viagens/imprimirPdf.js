function gerarPDF() {
    const content = document.getElementById("divRelatorioViagens").innerHTML

    const options = {
        margin: [10, 10, 10 ,10],
        filename: "rv.pdf",
        html2canvas: {scale: 2},
        jsPDF:{unit: "mm", format: "a4", orientation:"portrait"}
    }

    html2pdf().set(options).from(content).save();

}