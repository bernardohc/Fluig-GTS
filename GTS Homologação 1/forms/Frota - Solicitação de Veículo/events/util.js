function isEmpty(campo, form) {
    var valor = form.getValue(campo);
    return valor == null || valor.trim().length() == 0 || typeof valor === undefined || valor.trim() == '0' || valor.trim() == '0,00';
}

function isMobile(form) {
    return form.getMobile() != null && form.getMobile();
}
