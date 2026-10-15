/* Conteudo da Jornada: 7 estacoes, uma ideia por tela. Frases curtas. */
window.JORNADA = [
  {
    id: 'dor', titulo: 'A dor', ic: 'pao', cor: '#b35c00', capa: 'assets/bancos-1931.jpg', capaAlt: 'Multidão tenta sacar as economias na porta de uma caixa econômica de Berlim, na crise bancária de 1931',
    resumo: 'Tudo começa com gente sofrendo de verdade.',
    telas: [
      { tipo: 'historia', img: 'assets/guerra-1918.jpg', alt: 'Soldados alemães voltam da guerra e passam pelo Portão de Brandemburgo, em Berlim, em 1918', ic: 'casa', t: 'Depois da guerra',
        x: 'A Primeira Guerra acabou em 1918. A Alemanha perdeu. A Itália venceu, mas saiu pobre e frustrada. Milhões de soldados voltaram para casa sem trabalho.' },
      { tipo: 'historia', img: 'assets/inflacao-1923.jpg', alt: 'Homem cola notas de dinheiro numa parede, como papel de parede, na Alemanha de 1923', ic: 'moedas', t: 'O dinheiro que virou papel',
        x: 'Em 1923, na Alemanha, os preços subiam a cada hora. As economias de uma vida inteira não compravam um pão.' },
      { tipo: 'numero', n: '6 milhões', x: 'de pessoas sem emprego na Alemanha em 1932.', de: 3, marca: 1,
        leg: 'De cada 3 trabalhadores, 1 estava parado.' },
      { tipo: 'pergunta', q: 'Quando a vida aperta assim, o que as pessoas mais querem?',
        op: ['Uma explicação longa e complicada', 'Alguém que prometa resolver rápido', 'Esperar com calma'], certa: 1,
        fb: 'É humano. Quem está com medo e com fome quer uma saída rápida. Foi nesse momento que eles apareceram.' }
    ]
  },
  {
    id: 'promessa', titulo: 'A promessa', ic: 'megafone', cor: '#d9480f', capa: 'assets/nuremberg-1934.jpg', capaAlt: 'Comício do partido nazista em Nuremberg, em 1934, com milhares de homens em fileiras',
    resumo: 'Eles ofereceram o que todo mundo queria ouvir.',
    telas: [
      { tipo: 'historia', img: 'assets/cartaz-1932.jpg', alt: 'Cartaz nazista de 1932 com as palavras Trabalho e Pão', t: 'Duas palavras',
        x: 'Em 1932, o cartaz do partido de Hitler dizia só isto: "Trabalho e Pão". Nada sobre guerra. Nada sobre morte.' },
      { tipo: 'historia', img: 'assets/boicote-1933.jpg', alt: 'Homens da SA colam na vitrine de uma loja o cartaz "Alemães, defendam-se! Não comprem de judeus!", em Berlim, 1933', ic: 'alvo', t: 'Um culpado',
        x: 'Para explicar a crise, apontaram culpados: os judeus, os comunistas, os estrangeiros. Era mais fácil odiar um vizinho do que entender a economia.' },
      { tipo: 'historia', img: 'assets/holofotes-1936.jpg', alt: 'Comício noturno com fileiras de holofotes apontados para o céu', t: 'O espetáculo',
        x: 'Comícios gigantes, bandeiras, música e luzes. No meio da multidão, cada pessoa sentia que fazia parte de algo grande.' },
      { tipo: 'historia', img: 'assets/radio.jpg', alt: 'Rádio antigo de madeira', t: 'A voz dentro de casa',
        x: 'O governo barateou o rádio. Assim, a voz do líder entrava em cada sala, todos os dias.' },
      { tipo: 'pergunta', q: 'O que NÃO aparecia nos cartazes e discursos?',
        op: ['Trabalho', 'Orgulho do país', 'Guerra e campos de prisioneiros'], certa: 2,
        fb: 'A promessa era de coisas boas. O preço não estava no cartaz.' }
    ]
  },
  {
    id: 'porta', titulo: 'A porta aberta', ic: 'porta', cor: '#d6303b', capa: 'assets/tochas-1933.jpg', capaAlt: 'Desfile com tochas em Berlim na noite de 30 de janeiro de 1933, quando Hitler virou chefe de governo',
    resumo: 'Ninguém chegou ao poder sozinho.',
    telas: [
      { tipo: 'historia', img: 'assets/napoles-1922.jpg', alt: 'Mussolini e chefes fascistas caminhando em 1922', t: 'Itália, 1922',
        x: 'Milhares de fascistas armados marcharam para Roma. O rei podia mandar o exército parar. Preferiu convidar Mussolini para governar.' },
      { tipo: 'historia', img: 'assets/potsdam-1933.jpg', alt: 'Hitler cumprimenta o presidente Hindenburg em 1933', t: 'Alemanha, 1933',
        x: 'Hitler nunca teve a maioria dos votos. Políticos poderosos o colocaram no governo. Achavam que iam mandar nele.' },
      { tipo: 'numero', n: '33,1%', x: 'foi a votação do partido de Hitler na última eleição livre.', de: 3, marca: 1,
        leg: 'De cada 3 eleitores, 2 votaram em outros partidos.' },
      { tipo: 'passos', t: '52 dias', x: 'Foi o tempo para a democracia alemã acabar.',
        passos: [['30 de janeiro', 'Hitler assume o governo'], ['28 de fevereiro', 'Direitos são suspensos'], ['22 de março', 'Abre o primeiro campo de presos'], ['23 de março', 'Hitler ganha poder para fazer leis sozinho']] },
      { tipo: 'pergunta', q: 'Quem abriu a porta para eles?',
        op: ['Só os eleitores', 'Reis, presidentes e gente rica que achava que ia controlar o líder', 'Ninguém: tomaram à força'], certa: 1,
        fb: 'Na Itália foi o rei. Na Alemanha, o presidente e políticos conservadores. Todos acharam que sairiam ganhando.' }
    ]
  },
  {
    id: 'silencio', titulo: 'O silêncio', ic: 'radio', cor: '#a61e4d', capa: 'assets/reichstag-1933.jpg', capaAlt: 'O prédio do Parlamento alemão em chamas, em fevereiro de 1933',
    resumo: 'Primeiro, calaram quem podia avisar.',
    telas: [
      { tipo: 'historia', img: 'assets/livros-1933.jpg', alt: 'Multidão em volta de uma fogueira de livros em Berlim, 1933', t: 'Livros na fogueira',
        x: 'Em maio de 1933, estudantes queimaram milhares de livros em praça pública. Entre os autores proibidos: Einstein e Freud.' },
      { tipo: 'historia', img: 'assets/sindicatos-1933.jpg', alt: 'Placa em Hamburgo lembra o 2 de maio de 1933, quando a SA invadiu a sede dos sindicatos e prendeu os dirigentes', ic: 'megafone', t: 'Sem jornal, sem sindicato',
        x: 'Os jornais passaram a publicar só o que o governo deixava. Os sindicatos foram fechados em um dia. Fazer greve virou crime.' },
      { tipo: 'historia', img: 'assets/dachau-1933.jpg', alt: 'Presos enfileirados no campo de Dachau em 1933', t: 'O primeiro campo',
        x: 'O campo de Dachau abriu menos de dois meses depois de Hitler assumir. Os primeiros presos eram alemães: políticos, jornalistas e sindicalistas.' },
      { tipo: 'historia', img: 'assets/cedula-1938.jpg', alt: 'Cédula de 1938 com um círculo grande para o sim e um pequeno para o não', t: 'Eleição de mentira',
        x: 'Nesta cédula de 1938, o círculo do "sim" é bem maior que o do "não". Resultado oficial: 99,7%.' },
      { tipo: 'pergunta', q: 'Por que calar jornais, professores(as) e sindicatos primeiro?',
        op: ['Porque custavam caro', 'Para ninguém poder avisar o que estava acontecendo', 'Foi por acaso'], certa: 1,
        fb: 'Sem imprensa e sem escola livre, o povo só ouvia a versão do governo.' }
    ]
  },
  {
    id: 'alvo', titulo: 'O alvo', ic: 'alvo', cor: '#6741d9', capa: 'assets/estrela-amarela.jpg', capaAlt: 'Estrela amarela com a palavra "Jude" (judeu), que os judeus eram obrigados a costurar na roupa',
    resumo: 'De vizinhos a inimigos.',
    telas: [
      { tipo: 'historia', img: 'assets/leis-1935.jpg', alt: 'Quadro oficial de 1935 que explicava as Leis de Nuremberg e classificava as pessoas pela ascendência', ic: 'carimbo', t: 'Primeiro, a lei',
        x: 'Em 1935, uma lei tirou a cidadania dos judeus alemães. Eram vizinhos, colegas, médicos, comerciantes. De um dia para o outro, viraram "os outros".' },
      { tipo: 'historia', img: 'assets/sinagoga-1938.jpg', alt: 'Sinagoga em chamas em 1938', t: 'Depois, a violência',
        x: 'Numa noite de 1938, centenas de sinagogas foram queimadas e milhares de lojas destruídas. A polícia tinha ordem de não impedir.' },
      { tipo: 'lista', t: 'Quem o regime nazista matou', x: 'Estimativas do Museu do Holocausto dos EUA.',
        itens: [['Judeus', '6 milhões'], ['Prisioneiros de guerra soviéticos', '3,3 milhões'], ['Civis poloneses', '1,8 milhão'], ['Ciganos (povo roma)', '250 a 500 mil'], ['Pessoas com deficiência', '250 a 300 mil'], ['Opositores políticos', 'dezenas de milhares']] },
      { tipo: 'historia', img: 'assets/stolpersteine.jpg', alt: 'Pedras de tropeço numa calçada de Berlim, cada uma com o nome de uma vítima do nazismo', ic: 'grupo', t: 'Cada número era uma pessoa',
        x: 'Seis milhões é difícil de imaginar. É quase toda a população da cidade do Rio de Janeiro. Cada uma dessas pessoas tinha nome, casa e família.' },
      { tipo: 'pergunta', q: 'Quem estava seguro nesses regimes?',
        op: ['Quem não era judeu', 'Quem apoiava o governo', 'No fim, ninguém'], certa: 2,
        fb: 'Começou com um grupo. Depois vieram opositores, pessoas com deficiência, religiosos e, por fim, qualquer pessoa que reclamasse.' }
    ]
  },
  {
    id: 'conta', titulo: 'A conta', ic: 'balanca', cor: '#1864ab', capa: 'assets/guernica-1937.jpg', capaAlt: 'Ruínas da cidade de Guernica, na Espanha, depois do bombardeio de 1937',
    resumo: 'O que foi prometido e o que foi entregue.',
    telas: [
      { tipo: 'numero', n: 'mais de 60 milhões', x: 'de pessoas morreram na Segunda Guerra Mundial.', leg: 'A guerra foi começada por esses regimes.' },
      { tipo: 'virar', t: 'Toque para ver o resultado',
        cartas: [
          ['Trabalho e pão', 'O desemprego caiu. Mas o emprego vinha de fabricar armas, e as armas levaram à guerra.'],
          ['Um império de mil anos', 'Durou 12. No fim, 4,8 milhões de casas destruídas e a Alemanha dividida por 45 anos.'],
          ['A grandeza de Roma', 'A Itália perdeu as colônias, foi invadida e viveu dois anos de guerra civil.']
        ] },
      { tipo: 'lista', t: 'Mortes ligadas a cada regime', x: 'São estimativas de historiadores. Por isso aparecem como faixa.',
        itens: [['Alemanha de Hitler', 'mais de 11 milhões de civis e prisioneiros'], ['Japão militarista', '10 a 20 milhões de chineses'], ['Itália de Mussolini', '400 a 550 mil africanos'], ['Espanha de Franco', '130 a 150 mil executados'], ['Portugal de Salazar', '70 a 110 mil civis africanos']] },
      { tipo: 'numero', n: '1 em cada 4', x: 'pessoas não sabia ler em Portugal em 1970, depois de quase 40 anos de ditadura.', de: 4, marca: 1,
        leg: 'A conta também veio para quem ficou vivo.' },
      { tipo: 'pergunta', q: 'O desemprego na Alemanha caiu mesmo. Isso prova que o regime deu certo?',
        op: ['Sim, o que importa é o emprego', 'Não: o emprego veio de preparar uma guerra que destruiu o país', 'Não dá para saber'], certa: 1,
        fb: 'Um resultado bom no começo não conta a história inteira. É preciso olhar o preço e quem pagou.' }
    ]
  },
  {
    id: 'fim', titulo: 'O fim e a lição', ic: 'vela', cor: '#0f7a52', capa: 'assets/vitoria-1945.jpg', capaAlt: 'Multidão em Londres comemora o fim da guerra na Europa, em 8 de maio de 1945',
    resumo: 'Como terminaram, e o que guardar.',
    telas: [
      { tipo: 'historia', img: 'assets/mussolini.jpg', alt: 'Retrato de Mussolini', t: 'Mussolini',
        x: 'Tentou fugir disfarçado de soldado alemão. Foi reconhecido e fuzilado por italianos que lutavam contra o regime, em abril de 1945.' },
      { tipo: 'historia', img: 'assets/berlim-1945.jpg', alt: 'Soldado ergue bandeira sobre prédio em ruínas em Berlim, 1945', t: 'Hitler',
        x: 'Escondido debaixo da terra, mandou destruir o que restava da Alemanha. Matou-se dois dias depois de Mussolini.' },
      { tipo: 'historia', img: 'assets/tribunal-1945.jpg', alt: 'Líderes nazistas sentados no banco dos réus', t: 'O julgamento',
        x: 'Os chefes que sobraram foram julgados. "Eu só cumpria ordens" não foi aceito como desculpa.' },
      { tipo: 'historia', img: 'assets/cravos-1974.jpg', alt: 'Pessoas comemoram na rua em Lisboa, 1974', t: 'Portugal e Espanha',
        x: 'Salazar e Franco morreram velhos. Mas os regimes não sobreviveram a eles. Em Portugal, o povo pôs cravos nos canos das armas.' },
      { tipo: 'sinais', t: '5 sinais para guardar', x: 'Escolha o que você mais quer lembrar.',
        itens: ['Um culpado para todos os problemas', 'Um líder que nunca erra', 'A imprensa tratada como inimiga', 'Direitos vistos como estorvo', 'Uma emergência que nunca termina'] }
    ]
  }
];
