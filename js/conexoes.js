/* Mapa "Quem se liga a quem": pessoas, ligacoes e a lista numerada que explica cada uma.
   Cada ligacao resume um fato que ja esta, com fonte, nos criterios ou nos cards da pagina. */
(function () {
  var N = {
    trump: ['Donald Trump', 180, 120, 'assets/p-trump.jpg'],
    melania: ['Melania Trump', 70, 250],
    hayden: ['Hayden Davis', 215, 315],
    milei: ['Javier Milei', 380, 230, 'assets/p-milei.jpg'],
    karina: ['Karina Milei', 520, 300],
    maduro: ['Nicolás Maduro', 400, 70, 'assets/p-maduro.jpg'],
    bukele: ['Nayib Bukele', 60, 90, 'assets/p-bukele.jpg'],
    ortega: ['Daniel Ortega', 1110, 80, 'assets/p-ortega.jpg'],
    murillo: ['Rosario Murillo', 1110, 260],
    jair: ['Jair Bolsonaro', 470, 520, 'assets/p-jair.jpg'],
    flavio: ['Flávio Bolsonaro', 660, 600, 'assets/p-flavio.jpg'],
    eduardo: ['Eduardo Bolsonaro', 270, 430],
    carlos: ['Carlos Bolsonaro', 300, 640],
    michelle: ['Michelle Bolsonaro', 560, 410],
    moro: ['Sergio Moro', 420, 750],
    olimpio: ['Major Olímpio', 230, 540],
    queiroz: ['Fabrício Queiroz', 600, 820],
    adriano: ['Adriano da Nóbrega', 800, 860],
    ronald: ['Ronald Pereira', 860, 760],
    vorcaro: ['Daniel Vorcaro', 800, 420],
    moraes: ['Alexandre de Moraes', 640, 170],
    toffoli: ['Dias Toffoli', 840, 230],
    kassio: ['Kassio Nunes Marques', 700, 300],
    mendonca: ['André Mendonça', 900, 320],
    nikolas: ['Nikolas Ferreira', 960, 440],
    lula: ['Lula', 1040, 560, 'assets/p-lula.jpg'],
    lulinha: ['Lulinha', 1120, 680],
    careca: ['"Careca do INSS"', 1110, 800],
    dirceu: ['José Dirceu', 1120, 380],
    palocci: ['Antonio Palocci', 1130, 470],
    dilma: ['Dilma Rousseff', 990, 735],
    cunha: ['Eduardo Cunha', 940, 615],
    canella: ['Márcio Canella', 430, 880],
    frias: ['Mario Frias', 700, 905],
    zettel: ['Fabiano Zettel', 640, 505],
    tomaz: ['Willer Tomaz', 250, 900]
  };
  /* [de, para, tipo, texto, posicao do numero na linha (opcional, 0 a 1), fonte (opcional, para fatos que nao estao no resto da pagina)] */
  var L = [
    ['jair', 'flavio', 'familia', 'Pai e filho. Flávio é o candidato do PL a presidente.'],
    ['jair', 'eduardo', 'familia', 'Pai e filho.'],
    ['jair', 'carlos', 'familia', 'Pai e filho. Carlos foi eleito senador em 2026.'],
    ['jair', 'michelle', 'familia', 'Marido e mulher. Michelle foi eleita senadora em 2026.'],
    ['flavio', 'vorcaro', 'dinheiro', 'Cerca de R$ 62 milhões do banqueiro para o filme sobre Jair; a PF investiga Flávio desde 07/2026.'],
    ['jair', 'zettel', 'dinheiro', 'Fabiano Zettel, cunhado de Vorcaro, foi o maior doador da campanha de Jair em 2022 (R$ 2 milhões). Está preso desde 03/2026.'],
    ['vorcaro', 'moraes', 'dinheiro', 'Contratos de cerca de R$ 129 milhões com o escritório da mulher do ministro, Viviane Barci; em 08/2025, o casal usou um jato do qual uma empresa de Vorcaro era cotista. Ele chama as mensagens de mentiras.'],
    ['vorcaro', 'toffoli', 'dinheiro', 'Empresa de que Toffoli é sócio vendeu parte de um resort a empresa ligada ao cunhado de Vorcaro.'],
    ['vorcaro', 'kassio', 'dinheiro', 'Mensagens citam "Kassio" numa festa de Vorcaro; consultoria paga pelo banco pagou o filho do ministro. Ele nega.'],
    ['vorcaro', 'mendonca', 'poder', 'Mendonça admitiu ter se encontrado com Vorcaro em 2025 e nega ter tratado do banco.'],
    ['vorcaro', 'nikolas', 'dinheiro', 'Vorcaro escreveu que pagou "todos os voos" do deputado. Em 2024, o pastor André Valadão, da Lagoinha, intermediou um pedido de desculpas de Nikolas a Vorcaro. Nikolas nega proximidade.'],
    ['vorcaro', 'lula', 'poder', 'Lula recebeu Vorcaro no Palácio em 12/2024, sem irregularidade apontada.'],
    ['jair', 'kassio', 'poder', 'Jair indicou Kassio ao STF em 2020.', 0.3],
    ['jair', 'mendonca', 'poder', 'Jair indicou Mendonça ao STF em 2021, como "terrivelmente evangélico".'],
    ['lula', 'toffoli', 'poder', 'Lula indicou Toffoli ao STF em 2009.'],
    ['moraes', 'jair', 'justica', 'Moraes foi o relator da ação em que o STF condenou Jair por tentativa de golpe.'],
    ['flavio', 'queiroz', 'dinheiro', 'Segundo o MP do Rio, Queiroz operava a "rachadinha" do gabinete de Flávio; o caso foi arquivado após anulação das provas.'],
    ['flavio', 'adriano', 'dinheiro', 'Flávio deu a Medalha Tiradentes a Adriano, depois apontado como chefe do "Escritório do Crime"; a mãe e a ex-mulher dele trabalharam no gabinete.'],
    ['flavio', 'ronald', 'poder', 'Flávio deu moção de louvor a Ronald em 2004; em 2026 Ronald foi condenado por ajudar a planejar a morte de Marielle Franco.'],
    ['eduardo', 'trump', 'poder', 'Eduardo pediu ao governo Trump sanções a Moraes; foi condenado pelo STF por coação.'],
    ['flavio', 'trump', 'poder', 'Flávio foi recebido por Trump na Casa Branca em 05/2026 e disse ter pedido que os EUA classificassem o PCC e o CV como terroristas, o que foi anunciado dois dias depois.'],
    ['trump', 'moraes', 'justica', 'Os EUA aplicaram a Lei Magnitsky a Moraes em 07/2025 e retiraram em 12/2025.', 0.62],
    ['trump', 'maduro', 'justica', 'Maduro foi preso pelos EUA em 01/2026 e responde a processo em Nova York.'],
    ['trump', 'bukele', 'dinheiro', 'Os EUA pagaram El Salvador para prender deportados no presídio CECOT, a partir de 03/2025.'],
    ['trump', 'melania', 'familia', 'Marido e mulher.'],
    ['melania', 'hayden', 'dinheiro', 'Hayden Davis diz ter ajudado a lançar a criptomoeda $MELANIA, que caiu cerca de 99%.'],
    ['milei', 'hayden', 'dinheiro', 'Milei promoveu o $LIBRA, lançado por Davis; uma comissão do Congresso argentino viu responsabilidade política dele.'],
    ['milei', 'karina', 'familia', 'Irmãos. Milei mudou a regra contra nepotismo para nomeá-la secretária-geral.'],
    ['ortega', 'murillo', 'familia', 'Marido e mulher. Murillo virou copresidente em 2025.'],
    ['lula', 'lulinha', 'familia', 'Pai e filho. A PF apura negócios do filho com uma lobista.'],
    ['lulinha', 'careca', 'justica', 'A PF apura se Lulinha foi "sócio oculto" do operador das fraudes do INSS; não há prova de participação direta.'],
    ['lula', 'dirceu', 'justica', 'Ministro da Casa Civil de Lula, condenado no mensalão em 2012.'],
    ['lula', 'palocci', 'justica', 'Ministro da Fazenda de Lula, condenado na Lava Jato; a PF concluiu que a delação dele contra Lula não tinha provas.'],
    ['lula', 'dilma', 'poder', 'Sucessora de Lula. Em 2016, nomeou Lula ministro, e o STF suspendeu a posse.'],
    ['cunha', 'dilma', 'poder', 'Cunha abriu o impeachment de Dilma em 2015.'],
    ['flavio', 'cunha', 'poder', 'Flávio apoiou a candidatura de Cunha em 2026, dizendo que ele "derrubou a Dilma".'],
    ['flavio', 'moro', 'poder', 'Aliados no PL em 2026; Moro foi eleito governador do Paraná e faz campanha por Flávio.'],
    ['jair', 'moro', 'rompe', 'Moro deixou o governo em 2020 acusando Jair de interferir na Polícia Federal.'],
    ['jair', 'olimpio', 'rompe', 'Rompeu com Jair em 2020, dizendo que ele quis "proteger filho bandido".'],
    ['lula', 'maduro', 'poder', 'Lula recebeu Maduro com honras de chefe de Estado em 05/2023 e chamou de "narrativa" as acusações de autoritarismo na Venezuela.', 0.65, ['Poder360', 'https://www.poder360.com.br/governo/para-lula-venezuela-nao-ser-uma-democracia-e-narrativa/']],
    ['jair', 'maduro', 'rompe', 'Em 2019, o governo de Jair rompeu com Maduro e reconheceu Juan Guaidó como presidente da Venezuela.', 0.5, ['Jornal de Brasília', 'https://jornaldebrasilia.com.br/noticias/mundo/veja-altos-e-baixos-das-relacoes-diplomaticas-entre-brasil-e-venezuela/']],
    ['milei', 'maduro', 'rompe', 'Milei chamou Maduro de "ditador criminoso" depois que a Venezuela prendeu um gendarme argentino, solto só em 03/2026, após 448 dias.', 0.25, ['O Povo', 'https://www.opovo.com.br/noticias/mundo/2024/12/17/milei-chama-maduro-de-ditador-criminoso-por-sequestro-de-gendarme-argentino-na-venezuela.html']],
    ['maduro', 'ortega', 'poder', 'Aliados: em 2021, Maduro saudou a reeleição de Ortega, feita com os sete principais rivais presos.', 0.5, ['RPP', 'https://rpp.pe/mundo/actualidad/nicaragua-tiene-quien-la-defienda-nicolas-maduro-saluda-la-segura-reeleccion-de-daniel-ortega-noticia-1367976']],
    ['lula', 'ortega', 'rompe', 'Ortega ignorou o pedido de Lula pela libertação de um bispo preso; em 08/2024, os dois países expulsaram os embaixadores um do outro.', 0.5, ['SBT News', 'https://sbtnews.sbt.com.br/noticia/politica/em-retaliacao-a-ortega-governo-lula-expulsa-embaixadora-da-nicaragua']],
    ['flavio', 'canella', 'poder', 'Flávio apoiou Canella ao Senado em 2026, com a própria mãe como suplente; Canella foi preso duas vezes na operação Unha e Carne e nega os crimes.', 0.5, ['Jornal do Brasil', 'https://www.jb.com.br/brasil/politica/2026/07/1060205-preso-pela-pf-canella-e-o-candidato-ao-senado-de-flavio-bolsonaro-no-rj.html']],
    ['frias', 'vorcaro', 'dinheiro', 'O deputado e ator Mario Frias (PL), reeleito em 2026, criou a história do filme sobre Jair e agradeceu a Vorcaro pelo apoio; a produtora nega ter recebido dinheiro do banqueiro.', 0.16, ['O Povo (BBC)', 'https://www.opovo.com.br/agencia/bbc/2026/05/27/de-baixissimo-orcamento-a-milhoes-pedidos-a-vorcaro-os-bastidores-do-filme-sobre-bolsonaro.html']],
    ['vorcaro', 'zettel', 'familia', 'Cunhado e, segundo a PF, operador financeiro de Vorcaro. A igreja Lagoinha de Belo Horizonte recebeu R$ 19,2 milhões dele entre 2024 e 2025, segundo o Coaf.', 0.5, ['Correio Braziliense', 'https://www.correiobraziliense.com.br/economia/2026/01/7343481-church-bank-banco-master-lagoinha-e-as-conexoes-sob-investigacao.html']],
    ['flavio', 'tomaz', 'dinheiro', 'A PF aponta Flávio como "usuário master" da conta de uma empresa do advogado Willer Tomaz, dona de um terço do jato também usado por Vorcaro; Tomaz é investigado na fraude do INSS. Flávio nega e diz que o vínculo foi um erro corrigido.', 0.75, ['BPMoney', 'https://bpmoney.com.br/politica/flavio-bolsonaro-usuario-master-offshore-jato-vorcaro/']],
    ['flavio', 'bukele', 'poder', 'Flávio e Eduardo foram a El Salvador em 11/2025 estudar o modelo de segurança de Bukele e se reuniram com o ministro da Segurança dele.', 0.5, ['CNN Brasil', 'https://www.cnnbrasil.com.br/politica/flavio-e-eduardo-vao-a-el-salvador-encontrar-bukele/']]
  ];
  var TIPOS = { familia: 'Família', dinheiro: 'Dinheiro ou negócios', poder: 'Poder e alianças', justica: 'Justiça e investigação', rompe: 'Rompimento ou conflito' };

  var svg = document.getElementById('rede-svg');
  var lista = document.getElementById('rede-lista');
  if (!svg || !lista) return;
  var ns = 'http://www.w3.org/2000/svg';
  function el(nome, at, pai) { var e = document.createElementNS(ns, nome); for (var k in at) e.setAttribute(k, at[k]); if (pai) pai.appendChild(e); return e; }
  function nomeCurto(id) { return N[id][0]; }

  var gL = el('g', { 'class': 'r-ligacoes' }, svg);
  var gB = el('g', { 'class': 'r-numeros' }, svg);
  var gN = el('g', { 'class': 'r-nos' }, svg);
  var defs = el('defs', {}, svg);

  L.forEach(function (l, i) {
    var a = N[l[0]], b = N[l[1]], n = i + 1;
    el('line', { x1: a[1], y1: a[2], x2: b[1], y2: b[2], 'class': 'r-l r-' + l[2], 'data-n': n }, gL);
    var p = l[4] || 0.5, mx = a[1] + (b[1] - a[1]) * p, my = a[2] + (b[2] - a[2]) * p;
    var g = el('g', { 'class': 'r-b r-' + l[2], 'data-n': n }, gB);
    el('circle', { cx: mx, cy: my, r: 11 }, g);
    var t = el('text', { x: mx, y: my + 4 }, g); t.textContent = n;
  });

  Object.keys(N).forEach(function (id) {
    var d = N[id], g = el('g', { 'class': 'r-no' + (d[3] ? ' r-foto' : ''), 'data-id': id }, gN);
    if (d[3]) {
      var cp = el('clipPath', { id: 'cp-' + id }, defs); el('circle', { cx: d[1], cy: d[2], r: 30 }, cp);
      el('circle', { cx: d[1], cy: d[2], r: 33, 'class': 'r-aro' }, g);
      el('image', { href: d[3], x: d[1] - 30, y: d[2] - 30, width: 60, height: 60, 'clip-path': 'url(#cp-' + id + ')', preserveAspectRatio: 'xMidYMin slice' }, g);
      var t = el('text', { x: d[1], y: d[2] + 52, 'class': 'r-nome' }, g); t.textContent = d[0];
    } else {
      var w = d[0].length * 7.4 + 22;
      el('rect', { x: d[1] - w / 2, y: d[2] - 15, width: w, height: 30, rx: 15, 'class': 'r-pilula' }, g);
      var t2 = el('text', { x: d[1], y: d[2] + 5, 'class': 'r-nome r-nome-p' }, g); t2.textContent = d[0];
    }
  });

  lista.innerHTML = L.map(function (l, i) {
    return '<li class="r-' + l[2] + '" data-n="' + (i + 1) + '"><span class="r-num">' + (i + 1) + '</span><span><b>' + nomeCurto(l[0]) + ' e ' + nomeCurto(l[1]) + '</b> <em>' + TIPOS[l[2]] + '.</em> ' + l[3] + (l[5] ? ' <a class="fonte" href="' + l[5][1] + '" target="_blank" rel="noopener">Fonte: ' + l[5][0] + '</a>' : '') + '</span></li>';
  }).join('');

  /* Destaque: passar o mouse ou focar num item da lista acende a ligacao no mapa */
  function acende(n) {
    svg.classList.toggle('r-foco', !!n);
    [].forEach.call(svg.querySelectorAll('[data-n]'), function (e) { e.classList.toggle('r-on', e.getAttribute('data-n') === String(n)); });
  }
  [].forEach.call(lista.children, function (li) {
    li.tabIndex = 0;
    li.addEventListener('mouseenter', function () { acende(li.getAttribute('data-n')); });
    li.addEventListener('focus', function () { acende(li.getAttribute('data-n')); });
    li.addEventListener('mouseleave', function () { acende(null); });
    li.addEventListener('blur', function () { acende(null); });
  });
})();
