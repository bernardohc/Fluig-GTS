var INICIO = 1
var APROVACAO = 2

$(document).ready(function () {

    // Caso queira remover a aba de anexos
    //window.parent.$("#processTabs").find("li").last().hide();

    if (getAtividade() != INICIO) {
        invisibleBtnUpload("fnRegistroNascimento")
        invisibleBtnUpload("fnCpf")
    }

    if (getAtividade() != APROVACAO) {
        invisibleBtnUpload("fnFoto")
        invisibleBtnUpload("fnComprovante")
    }

});


/**
 * Adiciona uma nova linha na tabela pai e filho de dependentes
 * @return {void} 
 * @author Sérgio Machado
 */
function addNewRowDependente() {
    try {
        const tablename = "dependentes"
        const idByTimestamp = (new Date().getTime()).toString(32);
        const indice = wdkAddChild(tablename);
        $(`#dependenteCodigo___${indice}`).val(idByTimestamp).prop("readonly", true);
        $(`#fdRegistroNascDep___${indice}`).val(`Registro de Nascimento ${idByTimestamp}`);
        tableLineCount(tablename)
    } catch (e) {
        console.error("Houve um erro inesperado na função addNewRowDependente")
        console.error(e)
    }
}


/**
 * Delete uma linha da tabela pai e filho de dependentes e remove o anexo caso exista
 * @return {void} 
 * @author Sérgio Machado
 */
function destroyRowDependente(event) {
    try {
        const tabela = $(event).closest('table')[0];
        const tablename = tabela.getAttribute("tablename");
        const indice = getIndice($(event).closest('tr').find("input")[0].id);
        const codigo = $(`#dependenteCodigo___${indice}`).val() || "Código em branco";
        const inputFileName = $(event).closest('tr').find(".inputAnexo").val();
        const inputFileDesc = $(event).closest('tr').find(".descAnexo").val();
        FLUIGC.message.confirm({
            message: `Deseja remover o dependente de código <b>${codigo}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                fnWdkRemoveChild(event)
                if (inputFileName && inputFileDesc) {
                    removeFile(inputFileDesc)
                }
                tableLineCount(tablename)
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função destroyRowDependente")
        console.error(e)
    }
}


/**
 * Retorna o índice da linha da tabela pai e filho com base em uma string que pode ser o name ou id de um campo qualquer 
 * @param {String} id Parâmetro obrigatório, id ou name de um campo qualquer da tabela pai e filho
 * @example
 * getIndice("dependenteNome___8") - Retorna o índice 8
 * @return {String}
 * @author Sérgio Machado
 */
function getIndice(id) {
    return id.split('___').pop();
}


/**
 * Insere a numeração correspondente a cada linha da tabela pai e filho de forma automática.
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * Quando informado um valor válido para tablename, o script irá percorre apenas as linhas da própia tabela.
 * Se informar o valor false para o parâmetro tablename, o script irá percorrer todas as tabelas. Recomendado apenas para o carregamento do formulário.
 * @return {void} 
 * @author Sérgio Machado
 */
function tableLineCount(tablename) {
    try {
        let atributo = "[tablename]";
        if (tablename) {
            atributo = `[tablename='${tablename}']`
        }
        $.each($(atributo), function (index) {
            const tabelaRow = $(this).find('tbody tr').not(':first');
            tabelaRow.each(function (i) {
                tabelaRow.eq(i).find('td.count').html(`<span>${i + 1}</span>`);
            });
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função tableLineCount")
        console.error(e)
    }
}



/**
 * Exemplo de validação de anexos usando o beforeSendValidate
 * Nestes exemplos abaixo eu não estou obrigando o campo do anexo, isso eu estou realizando no validateForm
 * Imagine a seguinte situação, digamos que você obrigue um determinado campo de anexo no validateForm, mas por algum motivo
 * que seja por algum erro de script ou ação de usuário, tenha removido este anexo da aba de anexos do Fluig
 * Quando chegar no validateForm ele vai deixar passar já que é analizado apenas o valor do campo
 *
 * Mas se você preferir pode realizar essa validação em eventos de processos como beforeTaskSave, inclusive eu acho a melhor alternativa
 * Apenas demonstrei aqui que também é possivel realizar essa validação direto no front-end.
 */

var beforeSendValidate = function (numState, nextState) {
    let hasError = "";

    if (numState == INICIO && nextState == APROVACAO) {
        if (invalidFile("fnRegistroNascimento")) {
            hasError += "<li style='margin-bottom: 5px;'>Anexo <b>Registro Nascimento</b> não encontrado.</li>";
        }

        hasError += invalidFilesTable("dependentes", "fnRegistroNascDep")

    }

    if (hasError) {
        let aviso = "A solicitação não pode ser enviada pois apresenta os seguintes erros:"
        let erros = `<br/><br/><ul style='padding-left: 17px;color: red;list-style: disc;'>${hasError}</ul><br/>`;
        throw (`<b>${aviso}</b>${erros}`);
    }
}
