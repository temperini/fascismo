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

  /* Resumo curtissimo de cada ligacao (na mesma ordem de L) e o bloco da pagina que traz os detalhes */
  var RES = [
    'Pai e filho; Flávio é o candidato do PL.', 'Pai e filho.', 'Pai e filho; Carlos eleito senador.', 'Marido e mulher; Michelle eleita senadora.',
    'R$ 62 milhões do banqueiro para o filme sobre Jair.', 'Cunhado de Vorcaro foi o maior doador de Jair em 2022.', 'Contratos de R$ 129 milhões com o escritório da mulher do ministro.',
    'Empresa do ministro vendeu parte de resort a empresa ligada a Vorcaro.', 'Mensagens citam "Kassio"; consultoria pagou o filho dele.', 'Encontro em 2025; ele nega ter tratado do banco.',
    'Vorcaro escreveu que pagou os voos do deputado.', 'Lula recebeu Vorcaro no Palácio em 12/2024.', 'Jair indicou Kassio ao STF (2020).', 'Jair indicou Mendonça ao STF (2021).',
    'Lula indicou Toffoli ao STF (2009).', 'Moraes relatou a ação que condenou Jair.', 'Operador da "rachadinha", segundo o MP.', 'Medalha ao chefe do "Escritório do Crime"; família dele no gabinete.',
    'Homenagem em 2004; Ronald condenado pela morte de Marielle.', 'Eduardo pediu sanções contra Moraes; condenado por coação.', 'Recebido por Trump; pediu que PCC e CV virassem "terroristas".',
    'Sanção Magnitsky a Moraes (07 a 12/2025).', 'Maduro preso pelos EUA em 01/2026.', 'EUA pagaram El Salvador para prender deportados.', 'Marido e mulher.',
    'Davis ajudou a lançar a moeda $MELANIA.', 'Milei promoveu o $LIBRA, de Davis.', 'Irmãos; ela é a secretária-geral.', 'Marido e mulher; ela é copresidente.',
    'Pai e filho; a PF apura negócios do filho.', 'PF apura se Lulinha foi "sócio oculto" do operador do INSS.', 'Ministro de Lula condenado no mensalão.', 'Ministro de Lula condenado; delação sem provas, diz a PF.',
    'Sucessora; nomeou Lula ministro em 2016.', 'Cunha abriu o impeachment de Dilma.', 'Flávio apoiou Cunha em 2026.', 'Aliados no PL em 2026.',
    'Moro deixou o governo acusando interferência na PF.', 'Rompeu dizendo que Jair quis "proteger filho bandido".', 'Lula chamou de "narrativa" as acusações a Maduro.',
    'Jair rompeu com Maduro e reconheceu Guaidó.', 'Milei chamou Maduro de "ditador criminoso".', 'Aliados; Maduro saudou a reeleição de Ortega.', 'Ortega ignorou Lula; embaixadores expulsos.',
    'Flávio apoiou Canella ao Senado; Canella foi preso.', 'Frias criou o filme sobre Jair e agradeceu Vorcaro.', 'Cunhado e operador financeiro de Vorcaro.',
    'PF aponta Flávio como "usuário master" de conta de Tomaz.', 'Flávio foi a El Salvador estudar o modelo de Bukele.'
  ];
  var IR = ['crit-7', 'volta-8', 'volta-8', 'volta-7', 'crit-7', 'volta-4', 'volta-4', 'volta-4', 'volta-5', 'volta-4', 'volta-4', 'volta-4', 'volta-5', 'crit-10', 'volta-4',
    'crit-5', 'crit-7', 'crit-5', 'crit-5', 'volta-3', 'volta-12', 'volta-3', 'crit-7', 'crit-6', 'crit-7', 'crit-7', 'crit-7', 'crit-7', 'crit-7', 'crit-7', 'crit-7', 'crit-7', 'crit-7',
    'volta-10', 'volta-10', 'volta-10', 'volta-9', 'crit-3', 'volta-9', 'lig-40', 'lig-41', 'lig-42', 'lig-43', 'lig-44', 'volta-11', 'volta-15', 'volta-6', 'crit-7', 'lig-49'];
  var PAPEL = {
    trump: 'Presidente dos EUA', melania: 'Mulher de Trump', hayden: 'Empresário de criptomoedas', milei: 'Presidente da Argentina', karina: 'Irmã de Milei, secretária-geral',
    maduro: 'Ex-presidente da Venezuela, preso nos EUA', bukele: 'Presidente de El Salvador', ortega: 'Presidente da Nicarágua', murillo: 'Copresidente da Nicarágua',
    jair: 'Ex-presidente, condenado por tentativa de golpe', flavio: 'Senador, candidato do PL a presidente', eduardo: 'Filho de Jair', carlos: 'Filho de Jair, eleito senador',
    michelle: 'Mulher de Jair, eleita senadora', moro: 'Ex-ministro de Jair, eleito governador do PR', olimpio: 'Ex-senador, morto em 2021', queiroz: 'Ex-assessor de Flávio',
    adriano: 'Ex-PM, chefe do "Escritório do Crime"', ronald: 'Ex-PM, condenado no caso Marielle', vorcaro: 'Dono do Banco Master, preso', moraes: 'Ministro do STF',
    toffoli: 'Ministro do STF', kassio: 'Ministro do STF e presidente do TSE', mendonca: 'Ministro do STF', nikolas: 'Deputado federal (PL)', lula: 'Presidente, candidato à reeleição',
    lulinha: 'Filho de Lula', careca: 'Operador das fraudes do INSS, segundo a PF', dirceu: 'Ex-ministro de Lula', palocci: 'Ex-ministro de Lula', dilma: 'Ex-presidente',
    cunha: 'Ex-presidente da Câmara', canella: 'Deputado estadual eleito (União)', frias: 'Deputado federal (PL) e ator', zettel: 'Cunhado de Vorcaro, preso', tomaz: 'Advogado investigado no caso do INSS'
  };

  var svg = document.getElementById('rede-svg');
  var lista = document.getElementById('rede-lista');
  if (!svg || !lista) return;
  var ns = 'http://www.w3.org/2000/svg';
  function el(nome, at, pai) { var e = document.createElementNS(ns, nome); for (var k in at) e.setAttribute(k, at[k]); if (pai) pai.appendChild(e); return e; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function nomeCurto(id) { return N[id][0]; }

  var gL = el('g', { 'class': 'r-ligacoes' }, svg);
  var gB = el('g', { 'class': 'r-numeros' }, svg);
  var gN = el('g', { 'class': 'r-nos' }, svg);
  var defs = el('defs', {}, svg);

  L.forEach(function (l, i) {
    var a = N[l[0]], b = N[l[1]], n = i + 1;
    el('line', { x1: a[1], y1: a[2], x2: b[1], y2: b[2], 'class': 'r-l r-' + l[2], 'data-n': n, 'data-t': l[2] }, gL);
    var p = l[4] || 0.5, mx = a[1] + (b[1] - a[1]) * p, my = a[2] + (b[2] - a[2]) * p;
    var g = el('g', { 'class': 'r-b r-' + l[2], 'data-n': n, 'data-t': l[2], tabindex: 0, role: 'button', 'aria-label': 'Ligação ' + n + ': ' + nomeCurto(l[0]) + ' e ' + nomeCurto(l[1]) + '. ' + RES[i] }, gB);
    el('circle', { cx: mx, cy: my, r: 16, 'class': 'r-b-alvo' }, g);
    if (l[2] === 'justica') el('rect', { x: mx - 11, y: my - 11, width: 22, height: 22, rx: 4, 'class': 'r-b-q' }, g);
    else el('circle', { cx: mx, cy: my, r: 11 }, g);
    var t = el('text', { x: mx, y: my + 4 }, g); t.textContent = n;
  });

  Object.keys(N).forEach(function (id) {
    var d = N[id], g = el('g', { 'class': 'r-no' + (d[3] ? ' r-foto' : ''), 'data-id': id, tabindex: 0, role: 'button', 'aria-label': d[0] + ': ver as ligações' }, gN);
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
    return '<li class="r-' + l[2] + '" data-n="' + (i + 1) + '" data-t="' + l[2] + '" id="lig-' + (i + 1) + '"><span class="r-num">' + (i + 1) + '</span><span><b>' + nomeCurto(l[0]) + ' e ' + nomeCurto(l[1]) + '</b> <em>' + TIPOS[l[2]] + '.</em> ' + l[3] + (l[5] ? ' <a class="fonte" href="' + l[5][1] + '" target="_blank" rel="noopener">Fonte: ' + l[5][0] + '</a>' : '') + '</span></li>';
  }).join('');

  /* Destaque de uma ligacao */
  function acende(n) {
    svg.classList.toggle('r-foco', !!n);
    [].forEach.call(svg.querySelectorAll('.r-l, .r-b'), function (e) { e.classList.toggle('r-on', e.getAttribute('data-n') === String(n)); });
  }
  [].forEach.call(lista.children, function (li) {
    li.tabIndex = 0;
    li.addEventListener('mouseenter', function () { acende(li.getAttribute('data-n')); });
    li.addEventListener('focus', function () { acende(li.getAttribute('data-n')); });
    li.addEventListener('mouseleave', function () { acende(null); });
    li.addEventListener('blur', function () { acende(null); });
  });

  /* Filtro por tipo: as outras ligacoes ficam apagadas, sem sumir */
  var filtro = document.getElementById('rede-filtro');
  var tipoAtivo = null;
  function filtra(t) {
    tipoAtivo = t;
    svg.classList.toggle('r-filtrado', !!t);
    [].forEach.call(svg.querySelectorAll('.r-l, .r-b'), function (e) { e.classList.toggle('r-tipo', e.getAttribute('data-t') === t); });
    [].forEach.call(lista.children, function (li) { li.classList.toggle('r-fora', !!t && li.getAttribute('data-t') !== t); });
    if (filtro) [].forEach.call(filtro.querySelectorAll('button'), function (b) { b.setAttribute('aria-pressed', (b.dataset.t || '') === (t || '') ? 'true' : 'false'); });
  }
  if (filtro) filtro.addEventListener('click', function (ev) { var b = ev.target.closest('button'); if (b) filtra(b.dataset.t || null); });

  /* Balao: resumo da ligacao ou ficha da pessoa */
  var balao = document.createElement('div');
  balao.className = 'r-balao'; balao.hidden = true; balao.setAttribute('role', 'dialog'); balao.setAttribute('aria-modal', 'false');
  document.body.appendChild(balao);
  var origem = null;
  function abre(alvo, html, rotulo) {
    balao.innerHTML = '<button type="button" class="r-fecha" aria-label="Fechar">×</button>' + html;
    balao.setAttribute('aria-label', rotulo);
    balao.hidden = false; origem = alvo;
    var r = alvo.getBoundingClientRect(), b = balao.getBoundingClientRect();
    var x = r.left + r.width / 2 - b.width / 2; x = Math.max(8, Math.min(x, window.innerWidth - b.width - 8));
    var y = r.bottom + 10; if (y + b.height > window.innerHeight - 8) y = Math.max(64, r.top - b.height - 10);
    balao.style.left = x + 'px'; balao.style.top = y + 'px';
    var f = balao.querySelector('a, button.r-item, .r-fecha'); if (f) f.focus({ preventScroll: true });
  }
  function fecha(volta) { if (balao.hidden) return; balao.hidden = true; acende(null); if (volta !== false && origem) origem.focus({ preventScroll: true }); origem = null; }
  function balaoLigacao(n, alvo) {
    var i = n - 1, l = L[i], ir = IR[i];
    acende(n);
    abre(alvo, '<p class="r-b-tipo r-' + l[2] + '">' + TIPOS[l[2]] + '</p><p class="r-b-tit">' + n + '. ' + esc(nomeCurto(l[0])) + ' e ' + esc(nomeCurto(l[1])) + '</p><p class="r-b-res">' + esc(RES[i]) + '</p>' +
      '<a class="r-b-ir" href="#' + ir + '">Ver os detalhes e as fontes</a>', 'Ligação ' + n);
  }
  function balaoPessoa(id, alvo) {
    var d = N[id], minhas = [];
    L.forEach(function (l, i) { if (l[0] === id || l[1] === id) minhas.push(i); });
    var foto = d[3] ? '<img src="' + d[3] + '" alt="">' : '<span class="r-p-ini">' + esc(d[0].replace(/"/g, '').split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('')) + '</span>';
    abre(alvo, '<div class="r-p-cab">' + foto + '<div><p class="r-b-tit">' + esc(d[0]) + '</p><p class="r-p-papel">' + esc(PAPEL[id] || '') + '</p></div></div>' +
      '<ul class="r-p-lista">' + minhas.map(function (i) {
        var l = L[i], outro = l[0] === id ? l[1] : l[0];
        return '<li class="r-' + l[2] + '"><button type="button" class="r-item" data-n="' + (i + 1) + '"><b>' + esc(nomeCurto(outro)) + ':</b> ' + esc(RES[i]) + '</button></li>';
      }).join('') + '</ul>', d[0]);
  }
  svg.addEventListener('click', function (ev) {
    var b = ev.target.closest('.r-b'), p = ev.target.closest('.r-no');
    if (b) { ev.stopPropagation(); balaoLigacao(+b.getAttribute('data-n'), b); }
    else if (p) { ev.stopPropagation(); balaoPessoa(p.getAttribute('data-id'), p); }
  });
  svg.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    var b = ev.target.closest('.r-b'), p = ev.target.closest('.r-no');
    if (b || p) { ev.preventDefault(); ev.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });
  balao.addEventListener('click', function (ev) {
    if (ev.target.closest('.r-fecha')) { fecha(); return; }
    var it = ev.target.closest('.r-item');
    if (it) { var n = +it.dataset.n; var badge = svg.querySelector('.r-b[data-n="' + n + '"]'); balaoLigacao(n, badge); return; }
    var a = ev.target.closest('.r-b-ir');
    if (a) { fecha(false); }
  });
  document.addEventListener('click', function (ev) { if (!balao.hidden && !balao.contains(ev.target)) fecha(false); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fecha(); });
  window.addEventListener('resize', function () { fecha(false); });
  document.querySelector('.rede-rol') && document.querySelector('.rede-rol').addEventListener('scroll', function () { fecha(false); }, { passive: true });
})();
