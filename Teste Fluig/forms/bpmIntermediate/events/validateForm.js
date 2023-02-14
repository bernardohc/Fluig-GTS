function validateForm(form){
    var msg = "";
    //Dados Pessoais
    if(form.getValue("nome") == ""){
        msg += "Campo nome não foi preenchido. ";
    }

    if(form.getValue("email") == ""){
        msg += "Campo email não foi preenchido. ";
    }

    if(form.getValue("telefone") == ""){
        msg += "Campo telefone não foi preenchido. ";
    }

    if(form.getValue("dataNascimento") == ""){
        msg += "Campo data de nascimento não foi preenchido. ";
    }

    if(form.getValue("documentoIdentidade") == ""){
        msg += "Campo documento de identidade não foi preenchido. ";
    }

    if(msg != ""){
        throw msg;
    }
}