/* O balanco de cada regime: mortes, alvos, prometido x entregue, indicadores.
   Numeros de mortes sao estimativas de historiadores e aparecem como faixa quando ha divergencia. */
(function () {
  var F = {
    ushmm: ['USHMM', 'https://encyclopedia.ushmm.org/content/pt-br/article/documenting-numbers-of-victims-of-the-holocaust-and-nazi-persecution'],
    ecoNazi: ['Wikipédia (em inglês) - Economia da Alemanha nazista', 'https://en.wikipedia.org/wiki/Economy_of_Nazi_Germany'],
    baixasDe: ['Wikipédia (em inglês) - Baixas alemãs', 'https://en.wikipedia.org/wiki/German_casualties_in_World_War_II'],
    ruinas: ['Big Think - mapa da guerra aérea', 'https://bigthink.com/strange-maps/air-war-germany-map/'],
    expulsos: ['Wikipédia (em inglês) - Fuga e expulsão de alemães', 'https://en.wikipedia.org/wiki/Flight_and_expulsion_of_Germans_(1944%E2%80%931950)'],
    naturDe: ['Closmann, A Companion to Nazi Germany', 'https://digitalcommons.unf.edu/unf_faculty_publications/1613'],
    etiopia: ['Mattioli, Instituto de História Contemporânea de Munique', 'https://www.ifz-muenchen.de/heftarchiv/2003_3_1_mattioli.pdf'],
    libia: ['Wikipédia (em inglês) - Campos italianos na Líbia', 'https://en.wikipedia.org/wiki/Italian_concentration_camps_in_Libya'],
    itGuerra: ['World War II Database', 'https://m.ww2db.com/country/italy'],
    itJudeus: ['Centro Primo Levi', 'https://primolevicenter.org/?p=8485'],
    pontina: ['Geissler e Guillemin, Politics and the Life Sciences', 'https://pubmed.ncbi.nlm.nih.gov/20812795/'],
    circeo: ['Environment & Society Portal', 'https://www.environmentandsociety.org/arcadia/circeo-national-park-fascist-land-reclamation-and-conservation-pontine-marshes'],
    itRenda: ['Gabbuti, Universidade de Oxford', 'https://ora.ox.ac.uk/objects/uuid:eeddbb9c-7b39-4347-91ff-fa25fa2c44bf/files/scc08hg081'],
    esTerror: ['Wikipédia (em inglês) - Números da repressão', 'https://en.wikipedia.org/wiki/Historiography_on_Spanish_Civil_War_repressions_(numbers)'],
    esTerror2: ['Wikipédia (em inglês) - Terror Branco', 'https://en.wikipedia.org/wiki/White_Terror_(Spain)'],
    esGuerra: ['Britannica', 'https://www.britannica.com/event/Spanish-Civil-War'],
    esEco: ['Biblioteca do Congresso dos EUA - Country Studies', 'https://countrystudies.us/spain/51.htm'],
    esAgua: ['iAgua', 'https://www.iagua.es/blogs/agueda-garcia-de-durango/pueblos-sumergidos'],
    esFloresta: ['El Salto', 'https://www.elsaltodiario.com/biodiversidad/galicia-destine-gestion-forestal-eucalipto'],
    ptGuerra: ['Wikipédia (em inglês) - Guerra Colonial Portuguesa', 'https://en.wikipedia.org/wiki/Portuguese_Colonial_War'],
    ptSocial: ['Rádio Renascença, com dados da Pordata', 'https://rr.pt/especial/pais/2024/04/22/mais-dinheiro-mais-saude-mais-educacao-os-50-anos-de-democracia-em-19-graficos/375337/'],
    ptTrigo: ['Wikipédia - Campanha do Trigo', 'https://pt.wikipedia.org/wiki/Campanha_do_Trigo'],
    ptPresos: ['Sábado', 'https://www.sabado.pt/ultima-hora/detalhe/solidariedade-entre-presos-politicos-permitiu-lhes-aguentar-o-tarrafal'],
    jpChina: ['Universidade de Warwick', 'https://warwick.ac.uk/news/expertcomment/world_war_ii/'],
    jpSoldados: ['The Asia-Pacific Journal', 'https://apjjf.org/wp-content/uploads/2023/10/article-458.pdf'],
    itInd: ['Mattesini e Quintieri, Macroeconomic Dynamics', 'https://www.cambridge.org/core/journals/macroeconomic-dynamics/article/abs/italys-industrial-great-depression-fascist-price-and-wage-policies/6946CED3D1410BD34F4FB6D0C1679F4E'],
    brit: ['Britannica - Fascismo', 'https://www.britannica.com/topic/fascism'],
    salazar: ['Britannica', 'https://www.britannica.com/biography/Antonio-de-Oliveira-Salazar'],
    reunif: ['Wikipédia - Reunificação da Alemanha', 'https://pt.wikipedia.org/wiki/Reunifica%C3%A7%C3%A3o_da_Alemanha'],
    nanquim: ['Britannica', 'https://www.britannica.com/event/Nanjing-Massacre']
  };

  window.BALANCO = [
    {
      id: 'hitler', pais: 'de', nome: 'Alemanha de Hitler', periodo: '1933 a 1945',
      destaque: 'mais de 11 milhões', destaqueTxt: 'de civis e prisioneiros assassinados, fora dos combates',
      mortes: [
        { n: '6 milhões', x: 'de judeus assassinados no Holocausto', f: F.ushmm },
        { n: '3,3 milhões', x: 'de prisioneiros de guerra soviéticos mortos de fome, frio e fuzilamento', f: F.ushmm },
        { n: '1,8 milhão', x: 'de civis poloneses não judeus', f: F.ushmm },
        { n: '5,3 milhões', x: 'de soldados alemães mortos na guerra que o próprio regime começou', f: F.baixasDe }
      ],
      alvos: [
        { g: 'Judeus', n: '6 milhões' },
        { g: 'Prisioneiros de guerra soviéticos', n: '3,3 milhões' },
        { g: 'Civis poloneses', n: '1,8 milhão' },
        { g: 'Ciganos (povo roma)', n: '250 a 500 mil' },
        { g: 'Pessoas com deficiência', n: '250 a 300 mil' },
        { g: 'Opositores políticos alemães', n: 'dezenas de milhares' },
        { g: 'Testemunhas de Jeová', n: 'cerca de 1.700' },
        { g: 'Homens acusados de homossexualidade', n: 'centenas, talvez milhares' }
      ],
      alvosFonte: F.ushmm,
      promessas: [
        { p: 'Trabalho e pão', st: 'parcial', r: 'O desemprego caiu de 6 milhões para quase zero em 1939. Mas mulheres casadas, judeus e jovens em serviço obrigatório saíram da conta, e o emprego vinha de fabricar armas.', f: F.ecoNazi },
        { p: 'Um império de mil anos', st: 'nao', r: 'Durou 12 anos. A Alemanha foi ocupada e ficou dividida em dois países por 45 anos.', f: F.reunif },
        { p: 'Orgulho e grandeza', st: 'nao', r: 'Em 1945: 4,8 milhões de moradias destruídas, 13 milhões de pessoas sem casa e cerca de 12 milhões de alemães expulsos do Leste Europeu.', f: F.ruinas }
      ],
      ind: [
        { tipo: 'eco', x: 'O gasto militar subiu de 1% da renda do país em 1933 para cerca de 20% em 1938. Nenhum país tinha feito isso em tempo de paz.', f: F.ecoNazi },
        { tipo: 'soc', x: 'A fatia da renda que ficava com os trabalhadores caiu de 64% para 59% entre 1932 e 1936, enquanto os lucros subiam.', f: F.ecoNazi },
        { tipo: 'amb', x: 'Para depender menos de importações, o regime drenou pântanos, arrancou cercas vivas, retificou rios e abandonou parte do manejo cuidadoso das florestas. Depois vieram 400 milhões de metros cúbicos de entulho.', f: F.naturDe }
      ]
    },
    {
      id: 'mussolini', pais: 'it', nome: 'Itália de Mussolini', periodo: '1922 a 1943',
      destaque: '400 a 550 mil', destaqueTxt: 'africanos mortos nas guerras coloniais na Etiópia e na Líbia',
      mortes: [
        { n: '350 a 480 mil', x: 'etíopes mortos na invasão e ocupação (1935 a 1941). Outras estimativas são mais altas.', f: F.etiopia },
        { n: '50 a 70 mil', x: 'líbios mortos na região da Cirenaica. De 100 mil pessoas levadas a campos, 40 mil morreram.', f: F.libia },
        { n: 'cerca de 460 mil', x: 'italianos mortos na Segunda Guerra: 306 mil soldados e 153 mil civis', f: F.itGuerra },
        { n: 'cerca de 7 mil', x: 'judeus deportados da Itália para campos de extermínio. Menos de mil voltaram.', f: F.itJudeus }
      ],
      alvos: [
        { g: 'Povos colonizados (líbios e etíopes)', n: 'centenas de milhares' },
        { g: 'Opositores: socialistas, comunistas, sindicalistas', n: 'presos, exilados ou mortos' },
        { g: 'Judeus italianos', n: 'perseguidos a partir de 1938' },
        { g: 'Eslovenos e croatas das regiões de fronteira', n: 'língua e cultura proibidas' }
      ],
      alvosFonte: F.libia,
      promessas: [
        { p: 'A grandeza do Império Romano', st: 'nao', r: 'A Itália perdeu todas as colônias, foi invadida e viveu dois anos de guerra civil (1943 a 1945).', f: F.itGuerra },
        { p: 'Terra nova para o povo', st: 'parcial', r: 'O regime secou os Pântanos Pontinos e reduziu a malária na região. Em 1943, tropas alemãs inundaram tudo de novo: os casos de malária saltaram de 1.217 para 54.929 em um ano.', f: F.pontina },
        { p: 'Harmonia entre patrões e trabalhadores', st: 'nao', r: 'A fatia da renda que ficava com os trabalhadores caiu ano após ano e chegou ao ponto mais baixo no começo dos anos 1940.', f: F.itRenda }
      ],
      ind: [
        { tipo: 'eco', x: 'A produção das fábricas só voltou ao nível de antes da crise de 1929 em 1938, pouco antes da guerra.', f: F.itInd },
        { tipo: 'soc', x: 'Sindicatos livres e greves foram proibidos. Quem negociava salário era o sindicato do próprio regime.', f: F.brit },
        { tipo: 'amb', x: 'A drenagem dos Pântanos Pontinos destruiu a maior parte de 20.700 hectares de floresta e áreas alagadas. Só 3.270 foram protegidos. Na Etiópia, o exército usou gás venenoso.', f: F.circeo }
      ]
    },
    {
      id: 'franco', pais: 'es', nome: 'Espanha de Franco', periodo: '1939 a 1975',
      destaque: '130 a 150 mil', destaqueTxt: 'pessoas executadas pela repressão, segundo a maioria dos historiadores',
      mortes: [
        { n: 'cerca de 500 mil', x: 'mortos na guerra civil que começou com o golpe de 1936, somando os dois lados', f: F.esGuerra },
        { n: '130 a 150 mil', x: 'executados pela repressão franquista entre 1936 e 1975. A repressão do lado republicano matou cerca de 50 mil.', f: F.esTerror },
        { n: '160 a 400 mil', x: 'é a faixa total quando se somam execuções, mortes em prisões e em campos de trabalho', f: F.esTerror2 }
      ],
      alvos: [
        { g: 'Republicanos, socialistas, comunistas e anarquistas', n: 'fuzilados ou presos' },
        { g: 'Sindicalistas e professores(as)', n: 'demitidos, presos ou mortos' },
        { g: 'Catalães, bascos e galegos', n: 'línguas proibidas na vida pública' },
        { g: 'Famílias dos vencidos', n: 'perda de emprego, bens e direitos' }
      ],
      alvosFonte: F.esTerror,
      promessas: [
        { p: 'Salvar a Espanha do caos', st: 'nao', r: 'A guerra que o golpe começou matou cerca de 500 mil pessoas e deixou o país em ruínas.', f: F.esGuerra },
        { p: 'Um país que se sustenta sozinho', st: 'nao', r: 'A economia só voltou ao nível de 1935 em 1951 ou 1952. O resto da Europa se recuperou da guerra mundial em cerca de dois anos.', f: F.esEco },
        { p: 'Progresso e obras', st: 'parcial', r: 'O crescimento veio nos anos 1960, depois que o regime abandonou o isolamento e aceitou ajuda e comércio de fora.', f: F.esEco }
      ],
      ind: [
        { tipo: 'eco', x: 'A indústria voltou ao nível de antes da guerra civil no início dos anos 1950. A agricultura, só em 1958.', f: F.esEco },
        { tipo: 'soc', x: 'Os anos 1940 ficaram conhecidos como "anos da fome", com racionamento de comida até 1952.', f: F.esEco },
        { tipo: 'amb', x: 'Foram construídas 824 represas. Estima-se que cerca de 500 povoados ficaram debaixo d\'água (não há número oficial). Plantios em massa de pinheiro e eucalipto trouxeram erosão, incêndios e perda de espécies.', f: F.esAgua }
      ]
    },
    {
      id: 'salazar', pais: 'pt', nome: 'Portugal de Salazar', periodo: '1932 a 1974',
      destaque: '70 a 110 mil', destaqueTxt: 'civis africanos mortos na guerra para manter as colônias',
      mortes: [
        { n: '70 a 110 mil', x: 'civis mortos em Angola, Moçambique e Guiné-Bissau na guerra colonial (1961 a 1974)', f: F.ptGuerra },
        { n: '41 a 46 mil', x: 'combatentes africanos mortos', f: F.ptGuerra },
        { n: 'cerca de 8.800', x: 'soldados portugueses mortos, a maioria jovens obrigados a servir', f: F.ptGuerra }
      ],
      alvos: [
        { g: 'Povos das colônias africanas', n: 'mais de 100 mil mortos' },
        { g: 'Presos políticos em Portugal', n: '29.510 registrados' },
        { g: 'Comunistas, sindicalistas e estudantes', n: 'prisão e tortura' },
        { g: 'Presos do campo do Tarrafal', n: 'mais de 500, com mais de 30 mortos' }
      ],
      alvosFonte: F.ptPresos,
      promessas: [
        { p: 'Contas em dia', st: 'sim', r: 'Salazar equilibrou as contas do Estado logo no começo. Foi o que lhe deu fama.', f: F.salazar },
        { p: 'Paz social', st: 'nao', r: 'Foram 13 anos de guerra em três frentes na África, censura até 1974 e quase 30 mil presos políticos.', f: F.ptPresos },
        { p: 'Deus, Pátria e Família', st: 'nao', r: 'Em 1974, Portugal era o país da Europa ocidental onde mais bebês morriam: 38 em cada mil. A média europeia era 21.', f: F.ptSocial }
      ],
      ind: [
        { tipo: 'soc', x: 'Em 1970, depois de quase 40 anos de regime, 1 em cada 4 pessoas não sabia ler nem escrever (25,7%).', f: F.ptSocial },
        { tipo: 'soc', x: 'Em 1970, só 38 em cada 100 partos aconteciam em hospital ou maternidade.', f: F.ptSocial },
        { tipo: 'amb', x: 'A Campanha do Trigo (1929 a 1938) trocou grandes áreas de montado por cereal. Resultado: mais erosão do solo e perda de espécies. A pobreza no campo continuou e empurrou muita gente para a emigração.', f: F.ptTrigo }
      ]
    },
    {
      id: 'tojo', pais: 'jp', nome: 'Japão militarista', periodo: '1931 a 1945',
      destaque: '10 a 20 milhões', destaqueTxt: 'de chineses mortos na guerra, a maioria civis',
      mortes: [
        { n: '10 a 20 milhões', x: 'de chineses mortos entre 1937 e 1945, a maioria civis', f: F.jpChina },
        { n: 'mais de 200 mil', x: 'mortos no Massacre de Nanquim, segundo o tribunal de Tóquio', f: F.nanquim },
        { n: '3,1 milhões', x: 'de japoneses mortos, sendo 2,3 milhões de soldados. De cada 10 soldados mortos, 6 morreram de fome e doença, longe do combate.', f: F.jpSoldados }
      ],
      alvos: [
        { g: 'Civis chineses', n: 'milhões' },
        { g: 'Povos dos países ocupados na Ásia', n: 'trabalho forçado e fome' },
        { g: 'Prisioneiros de guerra', n: 'maus-tratos e trabalho forçado' },
        { g: 'Japoneses contrários à guerra', n: 'presos pela polícia política' }
      ],
      alvosFonte: F.jpChina,
      promessas: [
        { p: 'Libertar a Ásia dos impérios ocidentais', st: 'nao', r: 'Os países "libertados" foram ocupados, saqueados e submetidos a trabalho forçado.', f: F.jpChina },
        { p: 'Um Japão forte e respeitado', st: 'nao', r: 'O país terminou com cidades arrasadas, duas bombas atômicas e sete anos de ocupação estrangeira.', f: F.jpSoldados }
      ],
      ind: [
        { tipo: 'soc', x: 'Os próprios soldados japoneses foram abandonados: 1,4 milhão morreu de fome e doença.', f: F.jpSoldados },
        { tipo: 'amb', x: 'Não encontrei um indicador ambiental bem documentado e comparável para este regime. Fica registrado como ponto a pesquisar.', f: null }
      ]
    }
  ];
})();
