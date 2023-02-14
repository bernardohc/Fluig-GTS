function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    log.info("#### TESTE BEFORE TASK SAVE ####");
    var attachments = hAPI.listAttachments();
    var hasAttachment = false;

    for (var i = 0; i < attachments.size(); i++) {
        var attachment = attachments.get(i);
        if (attachment.getDocumentDescription() == "fluig.pdf") {
            hasAttachment = true;
        }
    }
    log.info("#### hasAttachment ####");
    log.info(hasAttachment);

    if (!hasAttachment) {
        throw "Attachment not found!";
    }
}