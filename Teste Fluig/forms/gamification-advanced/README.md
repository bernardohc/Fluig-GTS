# Habilitando eventos sociais para pontuar em gamificação
---

Habilitando e configurando eventos sociais da Campanha de
 capacitação TOTVS. Acesse nosso [Guia Completo](http://tdn.totvs.com/x/DbhICw) de Gamification do fluig.

1.  Pré condição: Ter usuário app para utilizar na integração com
    "gamification"

1.  Pré condição: Ter "gamification" habilitado e cadastrado conforme
 campanha

    Cadastro de níveis e Grupos de eventos de acordo e cadastros de
 times e eventos conforme abaixo descrito

    Cadastro de times:

         Nome do time                       Código do time     
         VP Administrativo Financeiro       time-af    
         VP Atendimento e Relacionamento    time-ar    
         VP Plataformas e Cloud             time-pc    
         VP Tecnologia                      time-tec   
         RMO - Assistente / Técnico         time-rmo-at
         RMO - Analista I                   time-rmo-a1
         RMO - Analista II                  time-rmo-a2
         RMO - Analista III                 time-rmo-a3
         Software                           time-sfw   
         VP Segmentos                       time-seg   
         Mercado Internacional              time-mi    
         Consulting                         time-com   
         Presidência                        time-pre

    Eventos:

        Nome do evento                                   Código do evento
        Publicar vídeo                                         A9990
        Responder Formulário                                   A9991
        Acessar documento do TDN                               A9992
        Inclusão de artigos TDN                                A9993
        Avaliação de artigo no TDN                             A9994
        Criação de artigo no Fluig                             A9995
        Postagens em comunidades específicas                   A9996
        Compartilhamento de postagem em comunidade             A9997
        Curtir postagens de comunidades especificas            A9998

1.  Baixar o pacote de customizações de Campanha de capacitação no
    repositório publico de amostras do fluig aqui contidos.

1.  Aplicar as alterações dos eventos customizados da campanha caso ja
    existam custizações em seu ambiente.

1.  Pré condição: Ter diretório com permissão de leitura para todos
    usuarios onde serão publicados os formulários de configuração da
    gamificação. EX: "/Raiz/config\_gamificacao"

1.  Exportar o formulário [Cadastro de comunidades Gamificadas]
    atribuindo os campos:
    -   Nome Dataset o valor: "comunidadesGamificadas"
    -   Pasta destno: "(ID da pasta configurada) config\_gamificacao"
    -   Campo descritor: "RegisterValue"

1.  Exportar o formulário [Cadastro de grupos Gamificados] atribuindo os
    campos:
    -   Nome Dataset o valor: "gruposGamificados"
    -   Pasta destno: "(ID da pasta configurada) config\_gamificacao"
    -   Campo descritor: "RegisterValue"

1.  Exportar o formulário [Cadastro de propriedades gamificacao]
    atribuindo os campos:
    -   Nome Dataset o valor: "PropriedadesDeGamificacao"
    -   Pasta destno: "(ID da pasta configurada) config\_gamificacao"
    -   Campo descritor: "gamificationProperties"

1.  Exportar para o servidor os dataset da campanha

1. Exportar para o servidor os eventos customizados da campanha

1. Incluir um novo registro de formulário [Cadastro de propriedades
    gamificacao] preenchendo os dados campanha

1. Incluir registro(s) de formulário [Cadastro de comunidades
    Gamificadas] selecionando quais comunidades serão gamificadas

1. Incluir registro(s) de formulário [Cadastro de grupos Gamificados]
    selecionando quais grupos de usuários serão gamificados

1. Adicionar serviço no TDS apontando para o servidor do fluig URL:
    (http://172.16.93.204/web/wsGlbSSL.asmx?WSDL) Tipo: WebService\
     API: CXF-Fluig
