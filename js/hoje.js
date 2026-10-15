(function () {
  var H = window.HOJE;
  var doc = document.documentElement;
  var semMov = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.classList.add('js');

  var ICONES = {
    info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 11v5 M12 7.6v.4',
    link: 'M14 4h6v6 M20 4l-9 9 M18 14v5H5V6h5',
    lua: 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z',
    sol: 'M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    alvo: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
    radio: 'M4 9h16v11H4z M8 9l8-5 M8 12.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M14 13h3 M14 16h3',
    balanca: 'M12 3v18 M7 21h10 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0z M19 7l-3 7a3 3 0 0 0 6 0z',
    urna: 'M4 12h16v8H4z M8 12V4h8v8 M10 8l1.5 1.5L14 7',
    punho: 'M7 11V7a2 2 0 0 1 4 0 2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-1a2 2 0 0 1 2-2z',
    sirene: 'M7 18v-6a5 5 0 0 1 10 0v6 M5 21h14v-3H5z M12 2v2 M4 5l1.5 1.5 M20 5l-1.5 1.5 M2 12h2 M20 12h2',
    moedas: 'M9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3z M15.5 9.5a6 6 0 1 1-6 6',
    repetir: 'M17 2l4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3',
    megafone: 'M3 10v4l11 5V5z M14 8a4 4 0 0 1 0 8 M6 15v4h3v-3',
    igreja: 'M12 2v6 M9.5 4.5h5 M6 21V12l6-4 6 4v9z M10 21v-4a2 2 0 0 1 4 0v4'
  };
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONES[n] || ICONES.info) + '"/></svg>'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fonte(f) { return f ? '<a class="fonte" href="' + esc(f[1]) + '" target="_blank" rel="noopener">' + ic('link') + 'Fonte: ' + esc(f[0]) + '</a>' : ''; }
  var ROT = { ha: 'Há registro', parte: 'Registro parcial', nao: 'Não encontrei registro' };
  function selo(st) { return '<span class="st st-' + st + '"><i></i><span class="st-t">' + ROT[st] + '</span></span>'; }

  document.querySelectorAll('[data-ic]').forEach(function (el) { el.innerHTML = ic(el.dataset.ic); });

  document.getElementById('tabela').innerHTML =
    '<thead><tr class="grupos"><th></th><th scope="colgroup" colspan="3">Brasil</th><th scope="colgroup" colspan="5">Outros países</th></tr><tr><th scope="col">Critério</th>' + H.pessoas.map(function (p) { return '<th scope="col"><span class="th-p">' + (p.img ? '<img src="' + p.img + '" alt="">' : '') + esc(p.nome) + '</span></th>'; }).join('') + '</tr></thead><tbody>' +
    H.criterios.map(function (c) {
      return '<tr><th scope="row"><a href="#crit-' + c.n + '">' + c.n + '. ' + esc(c.t) + '</a></th>' +
        H.pessoas.map(function (p) { return '<td><button type="button" class="q-cel" data-c="' + c.n + '" data-p="' + p.id + '" aria-haspopup="dialog" aria-label="' + esc(p.nome) + ', critério ' + c.n + ': ' + ROT[c[p.id].st] + '. Ver resumo">' + selo(c[p.id].st) + '</button></td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';

  /* Quadro do celular: o nome do criterio em linha propria e os oito simbolos alinhados sob os rostos fixos no topo */
  var qm = document.getElementById('quadro-m');
  if (qm) {
    var curto = function (p) { var w = p.nome.split(' '); return p.grupo === 'brasil' ? w[0] : w[w.length - 1]; };
    var celulas = function (fn) { var o = '', ant = null; H.pessoas.forEach(function (p) { if (ant && ant !== p.grupo) o += '<span class="qm-sep" aria-hidden="true"></span>'; ant = p.grupo; o += fn(p); }); return o; };
    qm.innerHTML =
      '<div class="qm-cab"><div class="qm-grade qm-gt"><span style="grid-column:1/4">Brasil</span><span style="grid-column:5/10">Outros países</span></div>' +
      '<div class="qm-grade">' + celulas(function (p) { return '<button type="button" class="qm-p" data-p="' + p.id + '" aria-pressed="false"><img src="' + p.img + '" alt=""><span>' + esc(curto(p)) + '</span></button>'; }) + '</div></div>' +
      '<ol class="qm-lista">' + H.criterios.map(function (c) {
        return '<li><a class="qm-t" href="#crit-' + c.n + '">' + c.n + '. ' + esc(c.t) + '</a><div class="qm-grade">' +
          celulas(function (p) { return '<button type="button" class="qm-c q-cel" data-c="' + c.n + '" data-p="' + p.id + '" aria-haspopup="dialog" aria-label="' + esc(p.nome) + ', critério ' + c.n + ': ' + ROT[c[p.id].st] + '. Ver resumo">' + selo(c[p.id].st) + '</button>'; }) + '</div></li>';
      }).join('') + '</ol>';
    qm.addEventListener('click', function (ev) {
      var b = ev.target.closest('.qm-p'); if (!b) return;
      var id = b.getAttribute('aria-pressed') === 'true' ? null : b.dataset.p;
      qm.classList.toggle('qm-foco', !!id);
      [].forEach.call(qm.querySelectorAll('[data-p]'), function (e) {
        var on = e.dataset.p === id; e.classList.toggle('on', on);
        if (e.classList.contains('qm-p')) e.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  }


  /* Celulas longas: o texto vira lista de fatos, com os primeiros visiveis e o resto atras de um botao */
  function frases(s) { return String(s).replace(/([.!?]["\u201d]?)\s+(?=["\u201c(]?[A-Z\u00c0-\u00dd])/g, '$1|#|').split('|#|'); }
  var nFatos = 0;
  function fatos(x) {
    var fs = frases(x);
    if (x.length < 380 || fs.length < 3) return '<p>' + esc(x) + '</p>';
    var id = 'fatos-' + (++nFatos), vis = 2;
    return '<ul class="fatos" id="' + id + '">' + fs.map(function (f, i) { return '<li' + (i >= vis ? ' class="fato-mais" hidden' : '') + '>' + esc(f) + '</li>'; }).join('') + '</ul>' +
      (fs.length > vis ? '<button type="button" class="fatos-btn" aria-controls="' + id + '" aria-expanded="false" data-n="' + (fs.length - vis) + '">Ver mais ' + (fs.length - vis) + (fs.length - vis === 1 ? ' fato' : ' fatos') + '</button>' : '');
  }
  function fontes(d) {
    var fs = Object.keys(d).filter(function (k) { return /^f\d*$/.test(k); }).sort(function (a, b) { return (+a.slice(1) || 1) - (+b.slice(1) || 1); }).map(function (k) { return d[k]; });
    if (fs.length <= 4) return '<div class="fontes-cel">' + fs.map(fonte).join('') + '</div>';
    return '<div class="fontes-cel">' + fs.slice(0, 3).map(fonte).join('') + '</div><details class="fontes-mais"><summary>Ver todas as ' + fs.length + ' fontes</summary><div class="fontes-cel">' + fs.slice(3).map(fonte).join('') + '</div></details>';
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('.fatos-btn'); if (!b) return;
    var abre = b.getAttribute('aria-expanded') !== 'true';
    [].forEach.call(document.getElementById(b.getAttribute('aria-controls')).querySelectorAll('.fato-mais'), function (li) { li.hidden = !abre; });
    b.setAttribute('aria-expanded', abre ? 'true' : 'false');
    var n = +b.dataset.n; b.textContent = abre ? 'Mostrar menos' : 'Ver mais ' + n + (n === 1 ? ' fato' : ' fatos');
  });

  document.getElementById('lista-crit').innerHTML = H.criterios.map(function (c) {
    return '<article class="crit rev" id="crit-' + c.n + '">' +
      '<header class="crit-cab"><span class="tec-ic">' + ic(c.ic) + '</span><h3>' + c.n + '. ' + esc(c.t) + '</h3>' +
      '<p><b>O que os regimes fizeram</b>' + esc(c.hist) + '</p>' + (c.regra ? '<p class="crit-regra">' + esc(c.regra) + '</p>' : '') + '</header>' +
      [['brasil', 'Brasil'], ['mundo', 'Outros países']].map(function (g) {
        return '<p class="grupo-tit">' + g[1] + '</p><div class="crit-col">' + H.pessoas.filter(function (p) { return p.grupo === g[0]; }).map(function (p) {
        var d = c[p.id];
        return '<section class="crit-p" id="crit-' + c.n + '-' + p.id + '"><h4>' + (p.img ? '<img class="sig" src="' + p.img + '" alt="" loading="lazy">' : '<span class="sig" aria-hidden="true">' + p.sig + '</span>') + esc(p.nome) + '</h4>' + selo(d.st) + (d.peso ? '<span class="peso">' + esc(d.peso) + '</span>' : '') +
          fatos(d.x) + '<div class="mas"><b>O que pesa contra a comparação</b>' + esc(d.mas) + '</div>' +
          fontes(d) + '</section>';
        }).join('') + '</div>';
      }).join('') + '</article>';
  }).join('');

  var btnTema = document.getElementById('btn-tema');

  /* Janelinha do quadro: toque numa bolinha mostra pessoa, criterio, resultado e um resumo */
  var RES = window.HOJE_RES || {}, qb = document.createElement('div'), qOrigem = null, qY = 0;
  qb.className = 'r-balao q-balao'; qb.hidden = true; qb.setAttribute('role', 'dialog'); qb.setAttribute('aria-modal', 'false');
  document.body.appendChild(qb);
  function pessoa(id) { return H.pessoas.filter(function (p) { return p.id === id; })[0]; }
  function crit(n) { return H.criterios.filter(function (c) { return c.n === n; })[0]; }
  function qAbre(bt) {
    var c = crit(+bt.dataset.c), p = pessoa(bt.dataset.p), d = c[p.id], r = (RES[c.n] || {})[p.id] || frases(d.x)[0];
    qb.innerHTML = '<button type="button" class="r-fecha" aria-label="Fechar">×</button>' +
      '<div class="r-p-cab"><img src="' + p.img + '" alt=""><div><p class="r-b-tit">' + esc(p.nome) + '</p><p class="r-p-papel">' + esc(p.sub) + '</p></div></div>' +
      '<p class="q-crit">Critério ' + c.n + ': ' + esc(c.t) + '</p>' +
      '<p class="q-res st-' + d.st + '"><span class="st st-' + d.st + '"><i></i></span>' + ROT[d.st] + (d.peso ? '<small>' + esc(d.peso) + '</small>' : '') + '</p>' +
      '<p class="r-b-res">' + esc(r) + '</p>' +
      '<a class="r-b-ir" href="#crit-' + c.n + '-' + p.id + '">Ver os fatos, o contraponto e as fontes</a>';
    qb.setAttribute('aria-label', p.nome + ', critério ' + c.n);
    qb.hidden = false; qOrigem = bt; qY = window.scrollY;
    [].forEach.call(document.querySelectorAll('.q-cel.q-on'), function (e) { e.classList.remove('q-on'); }); bt.classList.add('q-on');
    var a = bt.getBoundingClientRect(), b = qb.getBoundingClientRect();
    var x = a.left + a.width / 2 - b.width / 2; x = Math.max(8, Math.min(x, window.innerWidth - b.width - 8));
    var y = a.bottom + 8; if (y + b.height > window.innerHeight - 8) y = Math.max(64, a.top - b.height - 8);
    qb.style.left = x + 'px'; qb.style.top = y + 'px';
    qb.querySelector('.r-fecha').focus({ preventScroll: true });
  }
  function qFecha(volta) {
    if (qb.hidden) return; qb.hidden = true;
    if (qOrigem) { qOrigem.classList.remove('q-on'); if (volta !== false) qOrigem.focus({ preventScroll: true }); }
    qOrigem = null;
  }
  document.addEventListener('click', function (ev) {
    var bt = ev.target.closest('.q-cel');
    if (bt) { ev.stopPropagation(); if (qOrigem === bt && !qb.hidden) qFecha(); else qAbre(bt); return; }
    if (qb.hidden) return;
    if (ev.target.closest('.q-balao .r-fecha')) { qFecha(); return; }
    if (ev.target.closest('.q-balao .r-b-ir')) { qFecha(false); return; }
    if (!qb.contains(ev.target)) qFecha(false);
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') qFecha(); });
  window.addEventListener('resize', function () { qFecha(false); });
  window.addEventListener('scroll', function () { if (Math.abs(window.scrollY - qY) > 60) qFecha(false); }, { passive: true });
  [].forEach.call(document.querySelectorAll('.quadro-rol'), function (r) { r.addEventListener('scroll', function () { qFecha(false); }, { passive: true }); });

  function aplicaTema(t) { doc.setAttribute('data-theme', t); btnTema.innerHTML = ic(t === 'dark' ? 'sol' : 'lua'); }
  var salvo = null;
  try { salvo = localStorage.getItem('tema'); } catch (e) {}
  aplicaTema(salvo || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  btnTema.addEventListener('click', function () {
    var novo = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    aplicaTema(novo);
    try { localStorage.setItem('tema', novo); } catch (e) {}
  });

  var revs = document.querySelectorAll('.rev');
  if ('IntersectionObserver' in window && !semMov) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revs.forEach(function (r) { io.observe(r); });
  } else {
    revs.forEach(function (r) { r.classList.add('on'); });
  }

  var barra = document.getElementById('barra'), marcado = false;
  function aoRolar() {
    marcado = false;
    var h = doc.scrollHeight - window.innerHeight;
    barra.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
  }
  window.addEventListener('scroll', function () { if (!marcado) { marcado = true; requestAnimationFrame(aoRolar); } }, { passive: true });
  aoRolar();

  /* "Em volta": abrir/fechar todos e abrir o card quando o endereco aponta para ele */
  var todos = document.getElementById('volta-todos');
  var itensVolta = [].slice.call(document.querySelectorAll('.volta-item'));
  if (todos) todos.addEventListener('click', function () {
    var abrir = todos.getAttribute('aria-pressed') !== 'true';
    itensVolta.forEach(function (d) { d.open = abrir; });
    todos.setAttribute('aria-pressed', abrir ? 'true' : 'false');
    todos.textContent = abrir ? 'Fechar todos' : 'Abrir todos';
  });
  /* Cards de "Em volta": cada paragrafo vira um bloco com titulo, um fato por linha e listas de nomes em etiquetas. O texto nao muda. */
  function frasesV(s) {
    var fs = frases(s), o = [];
    fs.forEach(function (f) { if (o.length && /(\b(Jr|Sr|Sra|Dr|Dra|Prof)|\b[A-Z])\.$/.test(o[o.length - 1])) o[o.length - 1] += ' ' + f; else o.push(f); });
    return o;
  }
  function itensLista(s) {
    var it = [], cur = '', dep = 0;
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (ch === '(') dep++; else if (ch === ')') dep--;
      if (ch === ',' && dep === 0) { it.push(cur.trim()); cur = ''; } else cur += ch;
    }
    it.push(cur.trim());
    var ult = it.pop(), d = 0, corte = -1;
    for (var k = 0; k < ult.length; k++) { var c = ult[k]; if (c === '(') d++; else if (c === ')') d--; else if (d === 0 && ult.substr(k, 3) === ' e ') corte = k; }
    if (corte > 0) { it.push(ult.slice(0, corte).trim()); it.push(ult.slice(corte + 3).trim()); } else it.push(ult);
    return it;
  }
  function chip(t) { var m = t.match(/^([^(]+?)\s*(\(.+\))$/); return '<span class="vb-chip">' + (m ? m[1] + ' <small>' + m[2] + '</small>' : t) + '</span>'; }
  function itemVolta(f) {
    var m = f.match(/^([^:()]{3,60}):\s+(.+?)\.?$/) || f.match(/^(Ficaram de fora)\s+(.+?)\.?$/);
    if (m) { var its = itensLista(m[2]); if (its.length >= 2) return '<li class="vb-com-chips"><span class="vb-rot">' + m[1] + '</span><span class="vb-chips">' + its.map(chip).join('') + '</span></li>'; }
    return '<li>' + f + '</li>';
  }
  [].forEach.call(document.querySelectorAll('.volta-corpo > p:not(.mas)'), function (p) {
    var html = p.innerHTML.trim(), tit = '', m = html.match(/^<b>([^<]+)<\/b>\s*/);
    if (m) { tit = m[1].replace(/[.:]\s*$/, ''); html = html.slice(m[0].length); }
    var fs = frasesV(html);
    if (!tit && fs.length < 2) return;
    var sec = document.createElement('section');
    sec.className = 'vb';
    sec.innerHTML = (tit ? '<h4 class="vb-tit">' + tit + '</h4>' : '') + '<ul class="vb-lista">' + fs.map(itemVolta).join('') + '</ul>';
    p.parentNode.replaceChild(sec, p);
  });
  [].forEach.call(document.querySelectorAll('.volta-corpo'), function (c) {
    var fs = [].filter.call(c.children, function (e) { return e.matches('a.fonte'); });
    if (fs.length < 2) return;
    var box = document.createElement('div'), vis = document.createElement('div');
    box.className = 'volta-fontes'; vis.className = 'fontes-cel';
    c.insertBefore(box, fs[0]); box.appendChild(vis);
    fs.slice(0, fs.length > 4 ? 3 : 4).forEach(function (a) { vis.appendChild(a); });
    if (fs.length > 4) {
      var det = document.createElement('details'), resto = document.createElement('div');
      det.className = 'fontes-mais'; resto.className = 'fontes-cel';
      det.innerHTML = '<summary>Ver todas as ' + fs.length + ' fontes</summary>';
      fs.slice(3).forEach(function (a) { resto.appendChild(a); });
      det.appendChild(resto); box.appendChild(det);
    }
  });

  function abreDoEndereco() { var d = location.hash && document.querySelector(location.hash); if (d && d.tagName === 'DETAILS') d.open = true; }
  window.addEventListener('hashchange', abreDoEndereco); abreDoEndereco();
})();
