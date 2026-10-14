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
        H.pessoas.map(function (p) { return '<td>' + selo(c[p.id].st) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';

  document.getElementById('lista-crit').innerHTML = H.criterios.map(function (c) {
    return '<article class="crit rev" id="crit-' + c.n + '">' +
      '<header class="crit-cab"><span class="tec-ic">' + ic(c.ic) + '</span><h3>' + c.n + '. ' + esc(c.t) + '</h3>' +
      '<p><b>O que os regimes fizeram</b>' + esc(c.hist) + '</p>' + (c.regra ? '<p class="crit-regra">' + esc(c.regra) + '</p>' : '') + '</header>' +
      [['brasil', 'Brasil'], ['mundo', 'Outros países']].map(function (g) {
        return '<p class="grupo-tit">' + g[1] + '</p><div class="crit-col">' + H.pessoas.filter(function (p) { return p.grupo === g[0]; }).map(function (p) {
        var d = c[p.id];
        return '<section class="crit-p"><h4>' + (p.img ? '<img class="sig" src="' + p.img + '" alt="" loading="lazy">' : '<span class="sig" aria-hidden="true">' + p.sig + '</span>') + esc(p.nome) + '</h4>' + selo(d.st) + (d.peso ? '<span class="peso">' + esc(d.peso) + '</span>' : '') +
          '<p>' + esc(d.x) + '</p><div class="mas"><b>O que pesa contra a comparação</b>' + esc(d.mas) + '</div>' +
          fonte(d.f) + fonte(d.f2) + fonte(d.f3) + fonte(d.f4) + fonte(d.f5) + '</section>';
        }).join('') + '</div>';
      }).join('') + '</article>';
  }).join('');

  var btnTema = document.getElementById('btn-tema');
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
})();
