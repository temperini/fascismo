(function () {
  var D = window.DADOS;
  var doc = document.documentElement;
  var semMov = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.classList.add('js');

  var ICONES = {
    info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 11v5 M12 7.6v.4',
    link: 'M14 4h6v6 M20 4l-9 9 M18 14v5H5V6h5',
    seta: 'M6 9l6 6 6-6',
    lua: 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z',
    sol: 'M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    megafone: 'M3 10v4l11 5V5z M14 8a4 4 0 0 1 0 8 M6 15v4h3v-3',
    relogio: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2',
    pao: 'M4 11a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1a2 2 0 0 1-1 1.7V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4.3A2 2 0 0 1 4 12z',
    faca: 'M14.5 3.5 20 3l-.5 5.5L9 19l-4-4z M5 15l-2 2 4 4 2-2',
    coluna: 'M3 21h18 M5 21V10 M19 21V10 M9 21V10 M15 21V10 M12 3 3 8h18z',
    alvo: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
    radio: 'M4 9h16v11H4z M8 9l8-5 M8 12.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M14 13h3 M14 16h3',
    repetir: 'M17 2l4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3',
    holofote: 'M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    coroa: 'M3 18h18 M3 18 2 7l5.5 4L12 4l4.5 7L22 7l-1 11',
    punho: 'M7 11V7a2 2 0 0 1 4 0 2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-1a2 2 0 0 1 2-2z',
    carimbo: 'M5 21h14 M6 17h12v-2a2 2 0 0 0-2-2h-2l1-6a3 3 0 1 0-6 0l1 6H8a2 2 0 0 0-2 2z',
    aperto: 'M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M3 20a6 6 0 0 1 12 0 M17 11a3 3 0 1 0 0-6 M21 20a6 6 0 0 0-4-5.6',
    presente: 'M4 12v8h16v-8 M3 8h18v4H3z M12 8v12 M12 8S10 3 7.5 4 9 8 12 8 M12 8s2-5 4.5-4S15 8 12 8',
    crianca: 'M12 3 2 8l10 5 10-5z M6 10.5V16c2 2 10 2 12 0v-5.5 M22 8v6',
    sirene: 'M7 18v-6a5 5 0 0 1 10 0v6 M5 21h14v-3H5z M12 2v2 M4 5l1.5 1.5 M20 5l-1.5 1.5 M2 12h2 M20 12h2',
    bandeira: 'M5 22V3 M5 4h13l-2 4 2 4H5',
    algema: 'M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3',
    capacete: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    casa: 'M3 11l9-8 9 8 M5 10v10h14V10 M10 20v-6h4v6',
    igreja: 'M12 2v6 M9.5 4.5h5 M6 21V12l6-4 6 4v9z M10 21v-4a2 2 0 0 1 4 0v4',
    fabrica: 'M3 21V10l6 4v-4l6 4V5h5v16z M8 17h1 M13 17h1',
    livro: 'M4 19V5a2 2 0 0 1 2-2h13v14H6a2 2 0 0 0 0 4h13',
    martelo: 'M14 4l6 6 M11 7l6 6 M15.5 8.5 5 19l-2-2L13.5 6.5 M13 21h8',
    moedas: 'M9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3z M15.5 9.5a6 6 0 1 1-6 6',
    folha: 'M5 19c0-8 5-13 15-14-1 10-6 15-14 15z M5 19c3-5 6-8 10-10',
    urna: 'M4 12h16v8H4z M8 12V4h8v8 M10 8l1.5 1.5L14 7'
  };

  function ic(nome) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONES[nome] || ICONES.info) + '"/></svg>';
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fonte(nome, url) {
    return '<a class="fonte" href="' + esc(url) + '" target="_blank" rel="noopener">' + ic('link') + 'Fonte: ' + esc(nome) + '</a>';
  }
  function $(id) { return document.getElementById(id); }
  function cor(p) { return D.paises[p].cor; }
  function tagsPais(lista) {
    return '<div class="tags">' + lista.map(function (p) {
      return '<span class="tag" style="--cor:' + cor(p) + '">' + D.paises[p].nome + '</span>';
    }).join('') + '</div>';
  }
  function numBR(v, dec) {
    return v.toLocaleString('pt-BR', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }

  document.querySelectorAll('[data-ic]').forEach(function (el) { el.innerHTML = ic(el.dataset.ic); });

  /* Numeros */
  $('numeros').innerHTML = D.numeros.map(function (n, i) {
    return '<div class="num rev" style="--d:' + i * 90 + 'ms"><b data-v="' + n.valor + '" data-dec="' + (n.decimais || 0) + '" data-pre="' + (n.prefixo || '') + '" data-suf="' + n.sufixo + '">' +
      (n.prefixo || '') + numBR(n.valor, n.decimais) + n.sufixo + '</b><p>' + esc(n.texto) + '</p>' + fonte(n.fonte, n.url) + '</div>';
  }).join('');

  /* Lideres */
  $('lideres').innerHTML = D.lideres.map(function (l, i) {
    return '<article class="lider rev" style="--cor:' + cor(l.pais) + ';--d:' + i * 80 + 'ms">' +
      '<button class="lider-foto" type="button" data-zoom="' + l.img + '" data-leg="' + esc(l.nome) + '" aria-label="Ampliar foto de ' + esc(l.nome) + '">' +
      '<img src="' + l.img + '" alt="Retrato de ' + esc(l.nome) + '" loading="lazy"><span class="lider-pais">' + D.paises[l.pais].nome + ' - ' + l.poder + '</span></button>' +
      '<div class="lider-txt"><h3>' + esc(l.nome) + '</h3><p class="lider-ap">' + esc(l.apelido) + '</p>' +
      '<span class="rotulo">' + esc(l.rotulo) + '</span>' +
      '<ul class="tres">' +
      '<li>' + ic('megafone') + '<div><b>O que prometeu</b>' + esc(l.prometeu) + '</div></li>' +
      '<li>' + ic('punho') + '<div><b>O que fez</b>' + esc(l.fez) + '</div></li>' +
      '<li>' + ic('relogio') + '<div><b>Como terminou</b>' + esc(l.terminou) + '</div></li>' +
      '</ul>' + fonte(l.fonte, l.url) + '</div></article>';
  }).join('');

  /* Regua de tempo no poder */
  var R0 = 1920, R1 = 1980;
  $('regua').innerHTML = D.lideres.map(function (l, i) {
    var left = (l.inicio - R0) / (R1 - R0) * 100;
    var w = (l.fim - l.inicio) / (R1 - R0) * 100;
    var anos = l.fim - l.inicio;
    return '<div class="regua-l"><span>' + esc(l.nome.split(' ').pop()) + '</span><div class="regua-t rev">' +
      '<div class="regua-b cresce' + (w > 40 ? ' dentro' : '') + '" style="--l:' + left + '%;--w:' + w + '%;--cor:' + cor(l.pais) + ';--d:' + i * 120 + 'ms">' +
      '<span>' + l.poder.replace(' a ', '-') + ' · ' + anos + ' anos</span></div></div></div>';
  }).join('') + '<div class="regua-eixo" aria-hidden="true"><span></span><div><span>1920</span><span>1935</span><span>1950</span><span>1965</span><span>1980</span></div></div>';

  /* Linha do tempo */
  function graficoVotos() {
    var max = 60;
    return '<div class="votos"><h4>Votos do Partido Nazista nas eleições nacionais</h4>' + D.votos.map(function (v, i) {
      var ult = i === D.votos.length - 1;
      return '<div class="voto"><span>' + v.rot + '</span><div class="voto-t" style="--w:' + (v.v / max * 100) + '%">' +
        '<div class="voto-b cresce' + (ult ? ' ult' : '') + '" style="--d:' + i * 120 + 'ms"></div>' +
        '<span>' + numBR(v.v, 1) + '%</span></div></div>';
    }).join('') + '<p>A barra listrada é a eleição de março de 1933, já com Hitler no governo e opositores presos. Mesmo assim, o partido não passou de 50%.</p></div>';
  }

  $('tl').innerHTML = D.linha.map(function (e) {
    var img = '';
    if (e.img) {
      img = '<figure class="ev-img' + (e.sensivel ? ' sensivel' : '') + '">' +
        '<button type="button" data-zoom="' + e.img + '" data-leg="' + esc(e.leg) + '" aria-label="Ampliar imagem"' + (e.sensivel ? ' tabindex="-1"' : '') + '>' +
        '<img src="' + e.img + '" alt="' + esc(e.leg) + '" loading="lazy"></button>' +
        (e.sensivel ? '<div class="ver"><p>Imagem forte: corpos expostos em praça pública.</p><button type="button" data-ver>Ver imagem</button></div>' : '') +
        '<figcaption>' + esc(e.leg) + '</figcaption></figure>';
    }
    return '<li class="ev rev" data-p="' + e.p.join(' ') + '" style="--fase:var(--f-' + e.fase + ')">' +
      '<div class="ev-data"><time>' + esc(e.d) + '</time><span class="ev-fase">' + D.fases[e.fase] + '</span></div>' +
      '<article class="ev-card' + (e.img ? ' com-img' : '') + '">' + img +
      '<div class="ev-txt"><h3>' + esc(e.t) + '</h3><p>' + esc(e.x) + '</p>' +
      (e.grafico === 'votos' ? graficoVotos() : '') +
      tagsPais(e.p) + fonte(e.f, e.u) + '</div></article></li>';
  }).join('');

  $('legenda').innerHTML = Object.keys(D.fases).map(function (k) {
    return '<li><i style="background:var(--f-' + k + ')"></i>' + D.fases[k] + '</li>';
  }).join('');

  var chips = '<button class="chip" type="button" data-f="todos" aria-pressed="true">Todos</button>' +
    Object.keys(D.paises).map(function (k) {
      return '<button class="chip" type="button" data-f="' + k + '" aria-pressed="false" style="--cor:' + cor(k) + '"><i></i>' + D.paises[k].nome + '</button>';
    }).join('');
  $('filtros').innerHTML = chips;
  $('filtros').addEventListener('click', function (ev) {
    var b = ev.target.closest('.chip');
    if (!b) return;
    var f = b.dataset.f;
    this.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
    document.querySelectorAll('#tl .ev').forEach(function (li) {
      var mostra = f === 'todos' || li.dataset.p.split(' ').indexOf(f) > -1;
      li.hidden = !mostra;
      if (mostra) li.classList.add('on');
    });
  });

  /* Tecnicas */
  $('tecnicas').innerHTML = D.tecnicas.map(function (t, i) {
    var img = t.img ? '<figure class="tec-img"><button type="button" data-zoom="' + t.img + '" data-leg="' + esc(t.leg) + '" aria-label="Ampliar imagem" style="border:0;padding:0;background:none;width:100%;display:block">' +
      '<img src="' + t.img + '" alt="' + esc(t.leg) + '" loading="lazy"></button><figcaption>' + esc(t.leg) + '</figcaption></figure>' : '';
    return '<article class="tec rev" style="--d:' + (i % 3) * 80 + 'ms">' +
      '<div class="tec-cab"><span class="tec-ic">' + ic(t.ic) + '</span><h3>' + esc(t.t) + '</h3></div>' + img +
      '<div class="bloco diz"><b>O que diziam</b>' + esc(t.diziam) + '</div>' +
      '<div class="bloco faz"><b>O que faziam</b>' + esc(t.faziam) + '</div>' +
      '<div class="tec-pe"><div class="liga"><span>Liga com:</span>' + t.sinais.map(function (n) {
        return '<a href="#sinal-' + n + '" data-sinal="' + n + '">Sinal ' + n + '</a>';
      }).join('') + '</div><span>' + esc(t.autor) + '</span></div></article>';
  }).join('');

  /* Sinais */
  $('lista-sinais').innerHTML = D.sinais.map(function (s, i) {
    return '<details class="sinal rev" id="sinal-' + s.n + '" style="--d:' + (i % 2) * 70 + 'ms"' + (i === 0 ? ' open' : '') + '>' +
      '<summary><span class="sinal-n">' + s.n + '</span><h3>' + esc(s.t) + '</h3>' + ic('seta') + '</summary>' +
      '<div class="sinal-corpo"><p>' + esc(s.simples) + '</p><div class="exemplo"><b>Exemplo documentado</b>' + esc(s.ex) + '</div>' +
      tagsPais(s.p) + '</div></details>';
  }).join('');

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('[data-sinal]');
    if (!a) return;
    var alvo = $('sinal-' + a.dataset.sinal);
    if (!alvo) return;
    alvo.open = true;
    alvo.classList.add('on', 'alvo');
    setTimeout(function () { alvo.classList.remove('alvo'); }, 2400);
  });

  $('estudos').innerHTML = D.estudos.map(function (e) {
    return '<article class="estudo rev"><h4>' + esc(e.autor) + '</h4><em>' + esc(e.obra) + '</em><p>' + esc(e.x) + '</p>' +
      '<a class="fonte" href="' + e.url + '" target="_blank" rel="noopener">' + ic('link') + esc(e.link) + '</a></article>';
  }).join('');

  /* Fim */
  var FIM = {
    mussolini: ['28 de abril de 1945', 'Fuzilado ao tentar fugir'],
    hitler: ['30 de abril de 1945', 'Suicídio no abrigo subterrâneo'],
    tojo: ['23 de dezembro de 1948', 'Julgado e enforcado'],
    salazar: ['27 de julho de 1970', 'Doença, já fora do poder'],
    franco: ['20 de novembro de 1975', 'Doença, ainda no poder']
  };
  $('fins').innerHTML = ['mussolini', 'hitler', 'tojo', 'salazar', 'franco'].map(function (id, i) {
    var l = D.lideres.filter(function (x) { return x.id === id; })[0];
    return '<article class="fim rev" style="--cor:' + cor(l.pais) + ';--d:' + i * 70 + 'ms"><img src="' + l.img + '" alt="" loading="lazy">' +
      '<div><h3>' + esc(l.nome) + '</h3><p class="fim-data">' + FIM[id][0] + ' - ' + FIM[id][1] + '</p></div>' +
      '<p class="fim-x">' + esc(l.terminou) + '</p></article>';
  }).join('');

  /* Balanco */
  var B = window.BALANCO || [];
  var SELO = { nao: 'Não entregou', parcial: 'Entregou em parte', sim: 'Entregou' };
  var TIPO = { eco: ['Economia', 'moedas'], soc: ['Vida das pessoas', 'aperto'], amb: ['Meio ambiente', 'folha'] };
  function fonteB(f) { return f ? fonte(f[0], f[1]) : ''; }
  function pintaBalanco(id) {
    var r = B.filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    $('bal').style.setProperty('--cor', cor(r.pais));
    $('bal').innerHTML =
      '<div class="bal-topo"><h3>' + esc(r.nome) + '</h3><small>' + r.periodo + '</small><b>' + esc(r.destaque) + '</b><p>' + esc(r.destaqueTxt) + '</p></div>' +
      '<div class="bal-grade">' +
      '<div class="bal-bloco"><h4>' + ic('relogio') + 'Mortes causadas</h4><ul class="bal-lista">' + r.mortes.map(function (m) {
        return '<li><b>' + esc(m.n) + '</b><span>' + esc(m.x) + '</span>' + fonteB(m.f) + '</li>';
      }).join('') + '</ul></div>' +
      '<div class="bal-bloco"><h4>' + ic('alvo') + 'Quem foi o alvo</h4><ul class="alvos">' + r.alvos.map(function (a) {
        return '<li><span>' + esc(a.g) + '</span><b>' + esc(a.n) + '</b></li>';
      }).join('') + '</ul>' + fonteB(r.alvosFonte) + '</div>' +
      '<div class="bal-bloco"><h4>' + ic('megafone') + 'Prometido e entregue</h4>' + r.promessas.map(function (p) {
        return '<div class="pe-li"><span class="pe-p">"' + esc(p.p) + '"</span><span class="selo selo-' + p.st + '">' + SELO[p.st] + '</span><span>' + esc(p.r) + '</span>' + fonteB(p.f) + '</div>';
      }).join('') + '</div>' +
      '<div class="bal-bloco"><h4>' + ic('fabrica') + 'Outros resultados</h4>' + r.ind.map(function (i) {
        return '<div class="ind"><span>' + ic(TIPO[i.tipo][1]) + '</span><div><small>' + TIPO[i.tipo][0] + '</small>' + esc(i.x) + '<br>' + fonteB(i.f) + '</div></div>';
      }).join('') + '</div></div>';
  }
  if (B.length) {
    $('bal-abas').innerHTML = B.map(function (r, i) {
      return '<button class="chip" type="button" data-b="' + r.id + '" aria-pressed="' + (i === 0) + '" style="--cor:' + cor(r.pais) + '"><i></i>' + esc(r.nome) + '</button>';
    }).join('');
    $('bal-abas').addEventListener('click', function (ev) {
      var b = ev.target.closest('.chip');
      if (!b) return;
      this.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
      pintaBalanco(b.dataset.b);
    });
    pintaBalanco(B[0].id);
  }

  /* Fontes e creditos */
  $('lista-fontes').innerHTML = D.fontes.map(function (f) {
    return '<li>' + (f.u ? '<a href="' + f.u + '" target="_blank" rel="noopener">' + esc(f.t) + '</a>' : esc(f.t)) + '</li>';
  }).join('');
  $('lista-creditos').innerHTML = (window.CREDITOS || []).map(function (c) {
    return '<li><a href="' + c.pagina + '" target="_blank" rel="noopener">' + esc(c.nome) + '</a> <span>- ' + esc(c.autor) + ' - ' + esc(c.licenca) + '</span></li>';
  }).join('');

  /* Imagem sensivel */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-ver]');
    if (!b) return;
    var fig = b.closest('.ev-img');
    fig.classList.add('visto');
    fig.querySelector('[data-zoom]').removeAttribute('tabindex');
  });

  /* Ampliar imagem */
  var luz = $('luz');
  document.addEventListener('click', function (ev) {
    var z = ev.target.closest('[data-zoom]');
    if (!z || !luz.showModal) return;
    var fig = z.closest('.sensivel');
    if (fig && !fig.classList.contains('visto')) return;
    $('luz-img').src = z.dataset.zoom;
    $('luz-img').alt = z.dataset.leg || '';
    $('luz-leg').textContent = z.dataset.leg || '';
    luz.showModal();
  });
  $('luz-x').addEventListener('click', function () { luz.close(); });
  luz.addEventListener('click', function (ev) { if (ev.target === luz) luz.close(); });

  /* Tema */
  var btnTema = $('btn-tema');
  function aplicaTema(t) {
    doc.setAttribute('data-theme', t);
    btnTema.innerHTML = ic(t === 'dark' ? 'sol' : 'lua');
  }
  var salvo = null;
  try { salvo = localStorage.getItem('tema'); } catch (e) {}
  aplicaTema(salvo || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  btnTema.addEventListener('click', function () {
    var novo = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    aplicaTema(novo);
    try { localStorage.setItem('tema', novo); } catch (e) {}
  });

  /* Contagem dos numeros */
  function conta(el) {
    var alvo = parseFloat(el.dataset.v), dec = parseInt(el.dataset.dec, 10), t0 = null, dur = 1300;
    function passo(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = el.dataset.pre + numBR(alvo * k, dec) + el.dataset.suf;
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  /* Revelar ao rolar */
  var revs = document.querySelectorAll('.rev');
  if ('IntersectionObserver' in window && !semMov) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('on');
        var b = en.target.querySelector('b[data-v]');
        if (b) conta(b);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revs.forEach(function (r) { io.observe(r); });
  } else {
    revs.forEach(function (r) { r.classList.add('on'); });
  }

  /* Barra de progresso e menu ativo */
  var barra = $('barra');
  var links = document.querySelectorAll('.menu a');
  var secs = [].map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  var marcado = false;
  function aoRolar() {
    marcado = false;
    var h = doc.scrollHeight - window.innerHeight;
    barra.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
    var atual = -1;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) atual = i; });
    links.forEach(function (a, i) { a.classList.toggle('ativo', i === atual); });
  }
  window.addEventListener('scroll', function () {
    if (!marcado) { marcado = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  aoRolar();
})();
