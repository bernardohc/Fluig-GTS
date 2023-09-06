/**
 * Toda a lógica para o correto funcionamento desse componente foi feito em cima das classes abaixo:
 * .componentAnexo, .descAnexo, .inputAnexo, .btnUpFile, .btnViewerFile, .btnDownloadFile e o atributo data-acao
 * Sem elas o código não irá funcionar, então se por acaso você quiser alterar os nomes dessas classes
 * lembre-se de alterar nas funções desse arquivo e também no css
 */

/**
 * Direciona para cada função correspondente ao valor que esta no atributo data-acao do botão
 * @param {object} event Parâmetro obrigatório, o própio elemento que sofreu o evento click
 * @return {void} 
 * @author Sérgio Machado
 */
function anexo(event) {
    try {
        const acao = event.currentTarget.getAttribute("data-acao");
        const inputFile = $(event.currentTarget).parent().parent().find(".inputAnexo")[0]
        // const fileDescription = $(event.currentTarget).parent().parent().find(".descAnexo").val()
        const fileDescription = $(event.currentTarget).parent().parent().find(".rvDespAnexo").val()
        // const indice = validafunctions.getPosicaoFilho($(event).closest('tr').find("input")[0].id);
        if (acao == "viewer") {
            viewerFile(fileDescription)
        }
        if (acao == "download") {
            downloadFile(fileDescription)
        }
        if (acao == "delete") {
            removeFileConfirm(fileDescription, inputFile.id)
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função anexo")
        console.error(e)
    }
}

/**
 * Visualizar arquivos que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do anexo
 * @return {void} 
 */
function viewerFile(fileDescription) {

    let idFluig =  $('#processoId').val().trim();
    let filterFields = "idFluig,"+ idFluig + ",fileDescription," + fileDescription;
            
    $.ajax({
        type: "GET",
        dataType: "json",
        async: true,
        url: "/api/public/ecm/dataset/search?datasetId=dsRelViagConsultaAnexo&filterFields="+filterFields,
        success: function (data, status, xhr) {
            if (data != null && data.content != null && data.content.length > 0) {
                console.log(data)
                const record = data.content[0];
                if( record.CODRET == "1"){

                    const document = {
                        documentId : record.documentId
                        ,downloadUrl : record.downloadUrl
                        ,extension : record.extension
                    }
                    openDocument(document)

                }else if (records[0].CODRET == "2"){
                    messageToast({message: record[0].MSGRET}, 'danger')
                }
            }else{
                messageToast({message: 'Erro ao consultar imagem, comunicar o Administrador do Sistema!'}, 'danger')
            }
            
        },error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
            messageToast({message: 'Erro na consulta imagem, comunicar o Administrador do Sistema!'}, 'danger')
            loading.hide();
        }
    });

}
function openDocument(document) {

    console.log(document)
    if(isMobile == 'true'){

        var html =  '<div class="row" >'+
                        '<div id="div-pdf-viewer" class="col-md-12" align="center" style="display:none;" >'+
                            '<div class="pdfjs-viewer"></div>'+
                        '</div>'+

                        '<div id="div-img-viewer" class="col-md-12" align="center" style="display:none; border: 1px solid rgb(209, 211, 212);" >'+
                            '<div id="img-viewer" style="min-height:380px; "></div>'+
                        '</div>'+
                    '</div>'
        
        var modalImgOS = FLUIGC.modal({
            title: '',
            content: html,
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                
            } else {

                if(document.extension == "pdf"){
                    $("#div-pdf-viewer").show();
                    let pdfViewer = new PDFjsViewer($('.pdfjs-viewer'));
                    
                    pdfViewer.loadDocument( document.downloadUrl).then(function () {
                        pdfViewer.setZoom("out");
                    });
                }else{
                    $("#div-img-viewer").show();
                    // let content = `<embed src="${document.downloadUrl}" type="application/pdf" width="100%" height="100%"  />`
                    let content = `<object data="${document.downloadUrl}" height="100%" width="100%" style="object-fit: contain;"></object>`
                    $("#img-viewer").append(content);
                }

            }
        });
        
    }else{

        parent.WKFViewAttachment.openAttachmentView('adm', document.documentId);

    }
}

/**
 * Realiza o download do arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 */
 function downloadFile(fileDescription) {
    try {
        FLUIGC.message.confirm({
            message: `Deseja baixar o anexo <b>${fileDescription}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero baixar',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
                    var descricao = attachment.description;
                    if (fileDescription == descricao) {
                        parent.WKFViewAttachment.downloadAttach([i]);
                    }
                });
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função downloadFile")
        console.error(e)
    }
}

/**
 * Confirmação para Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 * @author Sérgio Machado
 */
function removeFileConfirm(fileDescription, idInput) {
    try {
        const filename = $(`#${idInput}`).val()
        FLUIGC.message.confirm({
            message: `Deseja remover o anexo <b>${filename}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                removeFile(fileDescription);
                //Confirma se o arquivo não está mais no anexo, para limpar o campo
                //Pois pode ser que o usuário não tinha permissão de deletar o arquivo.
                let fileDeleted = true;
                $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
                    if (attachment.description == fileDescription) {
                    	fileDeleted = false;
                    }
                });
                if(fileDeleted){
	                setFilePhisicalName(idInput, "")
	                btnState(idInput, "upload", "download")
                }
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeFileConfirm")
        console.error(e)
    }
}

/**
 * Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 * @author Sérgio Machado
 */
function removeFile(fileDescription) {
    try {
        $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
            if (attachment.description == fileDescription) {
            	parent.WKFViewAttachment.removeAttach([i]);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeFile")
        console.error(e)
    }
}


/**
 * Seta o nome do arquivo fisico no campo e realiza tratativa caso o campo esteja bloqueado pelo enableFields
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} filePhisical Parâmetro obrigatório, nome do arquivo fisico
 * @return {void} 
 * @author Sérgio Machado
 */
function setFilePhisicalName(idInput, filePhisical) {
    try {
        if (idInput.indexOf("_") == 0) {
            $("#" + idInput.substring(1)).val(filePhisical);
        }
        $("#" + idInput).val(filePhisical);
    } catch (e) {
        console.error("Houve um erro inesperado na função setFilePhisicalName")
        console.error(e)
    }
}


/**
 * Altera o estado e visibilidade dos botões de anexos
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} acao Parâmetro obrigatório, ação para ser executada no momento do click, se é delete ou upload
 * @param {String} btn Parâmetro obrigatório, botão secundário que deve sofrer ação de ficar visível ou não. Botão de Download ou Viewer
 * @return {void} 
 * @author Sérgio Machado
 */
function btnState(idInput, acao, btn) {
    try {
        let btnUpFile = $(`#${idInput}`).parent().parent().find(".btnUpFile");
        let btnDownloadFile = $(`#${idInput}`).parent().parent().find(".btnDownloadFile");
        let btnViewerFile = $(`#${idInput}`).parent().parent().find(".btnViewerFile");
        if (acao == "delete") {
            btnUpFile.removeClass("btn-success").addClass("btn-danger");
            btnUpFile.attr({ 'data-acao': acao, 'title': 'Excluir' });
            btnUpFile.find("i").removeClass("fluigicon-file-upload").addClass("fluigicon-trash");
            if (btn == "download") {
                btnDownloadFile.prop("disabled", false);
                btnDownloadFile.show()
            }
            if (btn == "viewer") {
                btnViewerFile.prop("disabled", false);
                btnViewerFile.show()
            }
        }
        if (acao == "upload") {
            btnUpFile.removeClass("btn-danger").addClass("btn-success");
            btnUpFile.attr({ 'data-acao': acao, 'title': 'Selecionar' });
            btnUpFile.find("i").removeClass("fluigicon-trash").addClass("fluigicon-file-upload");
            btnDownloadFile.prop("disabled", true);
            btnDownloadFile.hide()
            btnViewerFile.prop("disabled", true);
            btnViewerFile.hide()
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função btnState")
        console.error(e)
    }
}


/**
 * Faz tratativa nos botões do anexos percorrente cada class .componentAnexo
 * Em modo de visualização o botão de upload é removido, e caso tenha anexo, habilita o botão de visualização do anexo
 * Se em modo de edição e conter anexo o botão de upload é alterado para o botão de deletar anexos e habilita o botão de visualização
 * @return {void} 
 * @author Sérgio Machado
 */
function displayBtnFiles() {
    try {
        $('.componentAnexo').each(function (i, element) {
            let inputFile = $(element).find(".inputAnexo")
            let btnUpFile = $(element).find(".btnUpFile");
            let btnViewerFile = $(element).find(".btnViewerFile");
            if (getMode() == "VIEW") {
                btnUpFile.remove();
                if (inputFile.val() != "") {
                    btnViewerFile.prop("disabled", false);
                    btnViewerFile.show()
                }
            }
            if (getMode() == "MOD" && inputFile.val() != "") {
                btnState(inputFile[0].id, "delete", "viewer")
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função displayBtnFiles")
        console.error(e)
    }
    
}


/**
 * Remove o botão de upload/delete
 * @param {String} inputFile Parâmetro obrigatório, Id do campo
 * @return {void} 
 * @author Sérgio Machado
 */
function invisibleBtnUpload(inputFile) {
    try {
        if (getMode() == "MOD" || getMode() == "ADD") {
            if ($(`#_${inputFile}`).length) {
                let btnUpFile = $(`#_${inputFile}`).parent().parent().find(".btnUpFile");
                btnUpFile.remove();
            } else {
                let btnUpFile = $(`#${inputFile}`).parent().parent().find(".btnUpFile");
                btnUpFile.remove();
            }
        }
        if ($(`#_${inputFile}`).length) {
            if ($(`#_${inputFile}`).val() == "") {
                $(`#_${inputFile}`).attr({ placeholder: "Nenhum anexo selecionado" });
            }
        } else {
            if ($(`#${inputFile}`).val() == "") {
                $(`#${inputFile}`).attr({ placeholder: "Nenhum anexo selecionado" });
            }
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função invisibleBtnUpload")
        console.error(e)
    }
}

/**
 * Verifica se o campo do anexo de uma tabela pai e filho esta preenchido, 
 * caso esteja, ele verifica se o anexo esta presente na aba de anexos do Fluig
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * @param {String} idInput Parâmetro obrigatório, Id do campo de anexo que deseja verificar
 * @return {String} - Retorna string de erros caso apresente erros
 * @author Sérgio Machado
 */
function invalidFilesTable(tablename, idInput) {
    try {
        let errors = "";
        const countRows = $(`[tablename='${tablename}']`).find('tbody tr').not(':first');
        for (let i = 0; i < countRows.length; i++) {
            let indice = getIndice(countRows.eq(i).find("input")[0].id);
            let inputNameFile = $(`#_${idInput}___${indice}`).length ? $(`#_${idInput}___${indice}`) : $(`#${idInput}___${indice}`)
            let fileDescription = inputNameFile.parent().find(".descAnexo").val()
            if (inputNameFile.val() && !hasFileFluig(fileDescription)) {
                errors += `<li style='margin-bottom: 5px;'>O anexo <b>${inputNameFile.val()}</b> da linha <b>${i + 1}</b> não foi encontrado</li>`
            }
        }
        return errors
    } catch (e) {
        console.error('Houve um erro inesperado na função invalidFileTable')
        console.error(e)
    }
}


/**
 * Verifica se o campo do anexo esta preenchido, caso esteja, ele verifica se o anexo esta válido
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {Boolean}
 * @author Sérgio Machado
 */
function invalidFile(idInput) {
    try {
        const inputNameFile = $(`#${idInput}`).val()
        if (inputNameFile) {
            if ($(`#_${idInput}`).length) {
                let fileDescription = $(`#_${idInput}`).parent().find(".descAnexo").val()
                return !hasFileFluig(fileDescription)
            } else {
                let fileDescription = $(`#${idInput}`).parent().find(".descAnexo").val()
                return !hasFileFluig(fileDescription)
            }
        } else {
            return false
        }
    } catch (e) {
        console.error('Houve um erro inesperado na função validFile')
        console.error(e)
    }
}


/**
 * Verifica se o anexo existe na aba de anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo
 * @return {Boolean} - Retorna verdadeiro caso o arquivo exista
 * @author Sérgio Machado
 */
function hasFileFluig(fileDescription) {
    try {
        const anexos = parent.ECM.attachmentTable.getData();
        for (let i = 0; i < anexos.length; i++) {
            var descricao = anexos[i].description;
            if (fileDescription == descricao) {
                return true
            }
        }
        return false
    } catch (e) {
        console.error('Houve um erro inesperado na função validarAnexo')
        console.error(e)
    }
}