# Habilitando eventos sociais para pontuar em gamificação
---

Com intuito de facilitar a criação de jogos simples em comunidades, criamos esse cadastro de jogo em comunidades por like de publicações e artigos.

Apenas com a criação de um registro de formulário do tipo "Cadastro de Jogo" e informando nesse formulário as comunidades participantes do jogo e as hashtags que geram pontuação, o seu fluig estará com um pequeno jogo habilitado.

Esse jogo consiste em pontuar e rankear os usuários que tiverem os publicações, ou artigos, que possuirem a hashtag cadastrada e com maior número de apoios nas comunidades informadas no registro de formulário.

Caso deseje que todas as comunidades participem do jogo, basta não informar nenhuma comunidade, o mesmo se aplica para as hashtags.

Etapas de habilitação e configuração de eventos sociais da Campanha de capacitação TOTVS.

1.  Pré condição: Ter usuario app para utilizar na integração com
    "gamification".

1.  Pré condição: Ter "gamification" habilitado.

1.  Baixar o pacote de customizações de Campanha de capacitação no
    repositório publico de amostras do fluig aqui contidos.

1.  Aplicar as alterações dos eventos customizados da campanha caso ja
    existam customizações em seu ambiente.

1.  Pré condição: Ter diretório com permissão de leitura para todos
    usuarios onde serão publicados os formulários de configuração da
    gamificação. EX: "/Raiz/config\_gamificacao"

1.  Exportar o formulário [Cadastro de jogo]
    atribuindo os campos:
    -   Nome Dataset o valor: "gameDataset"
    -   Pasta destino: "(ID da pasta configurada) config\_gamificacao"
    -   Campo descritor: "gamename"

1.  Exportar o formulário [Cadastro de propriedades gamificacao]
    atribuindo os campos:
    -   Nome Dataset o valor: "PropriedadesDeGamificacao"
    -   Pasta destino: "(ID da pasta configurada) config\_gamificacao"
    -   Campo descritor: "gamificationProperties"

1.  Exportar para o servidor os datasets: executeSocialGamification.js;
										  getActiveGames.js;
										  getGamePoints.js;
										  getGamifiedCommunities.js;
										  getGamifiedTags.js;
										  isPostGamified.js;
										  sendCompletEvent.js.

1. Exportar para o servidor os eventos customizados da campanha: afterSocialLike.js;
																  beforeSocialLike.js;
																  beforeSocialUnlike.js;

	*** caso esses eventos já existam em seu servidos, adicione o conteúdo dos mesmos ***
	*** no início de cada médodo 														  	***

1. Incluir um novo registro de formulário [Cadastro de propriedades
    gamificacao] preenchendo os dados do servidor.

1. Incluir registro(s) de formulário [Cadastro de jogo] para cada jogo que deseja adicionar.

1. Incluir em alguma página a widget de Ranking que será gerado com o nome "Campanha nome do jogo cadastrado".

Confira nosso [Guia Completo](http://tdn.totvs.com/x/DbhICw) de Gamification do fluig.
