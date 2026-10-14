/* Menu do topo: itens visiveis enquanto couberem, o resto vai para "Mais".
   No celular, gaveta lateral. Marca a secao atual com aria-current. */
(function () {
  var topo = document.getElementById('topo');
  var lista = document.getElementById('menu-lista');
  var mais = document.getElementById('menu-mais');
  var maisBtn = document.getElementById('menu-mais-btn');
  var maisLista = document.getElementById('menu-mais-lista');
  var gaveta = document.getElementById('gaveta');
  var gavetaLista = document.getElementById('gaveta-lista');
  var abrir = document.getElementById('menu-abrir');
  var fechar = document.getElementById('gaveta-fechar');
  var fundo = document.getElementById('gaveta-fundo');
  if (!topo || !lista) return;

  var itens = [].slice.call(lista.children);

  /* Gaveta: copia dos links do menu */
  gavetaLista.innerHTML = itens.filter(function (li) { return li.querySelector('a').getAttribute('href').charAt(0) === '#'; }).map(function (li) {
    var a = li.querySelector('a');
    return '<li><a href="' + a.getAttribute('href') + '">' + a.innerHTML + '</a></li>';
  }).join('');

  /* Prioridade: mostra o que cabe, o resto vai para "Mais" */
  function distribui() {
    itens.forEach(function (li) { lista.appendChild(li); });
    mais.hidden = true;
    fechaMais();
    if (window.matchMedia('(max-width: 760px)').matches) return;
    var nav = lista.parentNode;
    if (lista.scrollWidth <= nav.clientWidth) return;
    mais.hidden = false;
    var limite = nav.clientWidth - mais.offsetWidth - 4;
    var n = itens.length;
    while (n > 1 && lista.scrollWidth > limite) {
      n--;
      maisLista.insertBefore(itens[n], maisLista.firstChild);
    }
    marca();
  }

  function abreMais() { maisLista.hidden = false; maisBtn.setAttribute('aria-expanded', 'true'); }
  function fechaMais() { maisLista.hidden = true; maisBtn.setAttribute('aria-expanded', 'false'); }
  maisBtn.addEventListener('click', function () { maisLista.hidden ? abreMais() : fechaMais(); });
  document.addEventListener('click', function (ev) { if (!mais.contains(ev.target)) fechaMais(); });
  maisLista.addEventListener('click', function (ev) { if (ev.target.closest('a')) fechaMais(); });

  /* Gaveta do celular */
  var fora = [document.getElementById('conteudo'), document.querySelector('.rodape'), topo];
  function abreGaveta() {
    gaveta.classList.add('aberta');
    abrir.setAttribute('aria-expanded', 'true');
    fora.forEach(function (el) { if (el) el.inert = true; });
    document.body.style.overflow = 'hidden';
    var primeiro = gaveta.querySelector('a, button');
    if (primeiro) primeiro.focus();
  }
  function fechaGaveta(volta) {
    if (!gaveta.classList.contains('aberta')) return;
    gaveta.classList.remove('aberta');
    abrir.setAttribute('aria-expanded', 'false');
    fora.forEach(function (el) { if (el) el.inert = false; });
    document.body.style.overflow = '';
    if (volta !== false) abrir.focus();
  }
  abrir.addEventListener('click', abreGaveta);
  fechar.addEventListener('click', function () { fechaGaveta(); });
  fundo.addEventListener('click', function () { fechaGaveta(); });
  gaveta.addEventListener('click', function (ev) {
    var a = ev.target.closest('a');
    if (!a) return;
    var h = a.getAttribute('href');
    if (h.charAt(0) !== '#') { fechaGaveta(false); return; }
    ev.preventDefault();
    fechaGaveta(false);
    var alvo = document.querySelector(h);
    if (!alvo) return;
    setTimeout(function () {
      var suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      alvo.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', h);
    }, 30);
  });
  var temaG = document.getElementById('gaveta-tema');
  if (temaG) temaG.addEventListener('click', function () { var b = document.getElementById('btn-tema'); if (b) b.click(); });

  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    if (gaveta.classList.contains('aberta')) fechaGaveta();
    else if (!maisLista.hidden) { fechaMais(); maisBtn.focus(); }
  });

  /* Secao atual */
  var todos = function () { return [].slice.call(document.querySelectorAll('#menu-lista a, #menu-mais-lista a, #gaveta-lista a')); };
  var secoes = itens.map(function (li) {
    var h = li.querySelector('a').getAttribute('href');
    return h.charAt(0) === '#' ? document.querySelector(h) : null;
  });
  var atual = null, pedido = false;
  function marca() {
    pedido = false;
    var id = null;
    secoes.forEach(function (s) { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.35) id = '#' + s.id; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      var ult = secoes.filter(Boolean).pop(); if (ult) id = '#' + ult.id;
    }
    atual = id;
    todos().forEach(function (a) {
      if (a.getAttribute('href') === id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    maisBtn.classList.toggle('tem-atual', !!maisLista.querySelector('[aria-current]'));
  }
  window.addEventListener('scroll', function () { if (!pedido) { pedido = true; requestAnimationFrame(marca); } }, { passive: true });

  if ('ResizeObserver' in window) new ResizeObserver(function () { distribui(); }).observe(topo);
  else window.addEventListener('resize', distribui);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(distribui);
  distribui();
  marca();
})();
