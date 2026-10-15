(function () {
  var J = window.JORNADA;
  var doc = document.documentElement;
  var palco = document.getElementById('palco');
  var pe = document.getElementById('pe');
  var btVoltar = document.getElementById('bt-voltar');
  var btSeguir = document.getElementById('bt-seguir');
  var btOuvir = document.getElementById('bt-ouvir');
  var CHAVE = 'jornada-v1';

  var IC = {
    casa: 'M3 11l9-8 9 8 M5 10v10h14V10 M10 20v-6h4v6',
    esq: 'M15 5l-7 7 7 7', dir: 'M9 5l7 7-7 7', check: 'M5 12l5 5 9-10',
    som: 'M4 9v6h4l5 4V5L8 9z M16 9a4 4 0 0 1 0 6 M18.5 6.5a8 8 0 0 1 0 11',
    parar: 'M7 7h10v10H7z',
    lua: 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z',
    sol: 'M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    pao: 'M4 11a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1a2 2 0 0 1-1 1.7V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4.3A2 2 0 0 1 4 12z',
    megafone: 'M3 10v4l11 5V5z M14 8a4 4 0 0 1 0 8 M6 15v4h3v-3',
    porta: 'M4 21h16 M7 21V4h10v17 M14 12.5v.5',
    radio: 'M4 9h16v11H4z M8 9l8-5 M8 12.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M14 13h3 M14 16h3',
    alvo: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
    balanca: 'M12 3v18 M7 21h10 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0z M19 7l-3 7a3 3 0 0 0 6 0z',
    vela: 'M9 21h6 M10 21V11h4v10 M12 3c2 2 2.5 3.5 2 5a2 2 0 0 1-4 0c-.5-1.5 0-3 2-5z',
    moedas: 'M9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3z M15.5 9.5a6 6 0 1 1-6 6',
    carimbo: 'M5 21h14 M6 17h12v-2a2 2 0 0 0-2-2h-2l1-6a3 3 0 1 0-6 0l1 6H8a2 2 0 0 0-2 2z',
    grupo: 'M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M3 20a6 6 0 0 1 12 0 M17 11a3 3 0 1 0 0-6 M21 20a6 6 0 0 0-4-5.6'
  };
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (IC[n] || IC.alvo) + '"/></svg>'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var PESSOA = '<path d="M12 3.5a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z M5.5 21v-4.5a6.5 6.5 0 0 1 13 0V21z"/>';

  /* Estado salvo */
  var est = { feitas: {}, sinal: null, pos: null };
  try { var s = JSON.parse(localStorage.getItem(CHAVE)); if (s) est = s; } catch (e) {}
  function salva() { try { localStorage.setItem(CHAVE, JSON.stringify(est)); } catch (e) {} }

  var vista = { v: 'mapa' };
  var respondida = {};
  var indo = 1;

  /* Tema e letra */
  var btTema = document.getElementById('bt-tema');
  function tema(t) { doc.setAttribute('data-theme', t); btTema.innerHTML = ic(t === 'dark' ? 'sol' : 'lua'); }
  var tSalvo = null, lSalva = null;
  try { tSalvo = localStorage.getItem('tema'); lSalva = localStorage.getItem('letra'); } catch (e) {}
  tema(tSalvo || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  if (lSalva) doc.setAttribute('data-letra', lSalva);
  btTema.onclick = function () {
    var n = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    tema(n); try { localStorage.setItem('tema', n); } catch (e) {}
  };
  document.getElementById('bt-letra').onclick = function () {
    var g = doc.getAttribute('data-letra') === 'grande' ? '' : 'grande';
    doc.setAttribute('data-letra', g); try { localStorage.setItem('letra', g); } catch (e) {}
  };
  document.getElementById('bt-mapa').innerHTML = ic('casa');
  document.getElementById('bt-mapa').onclick = function () { indo = -1; ir({ v: 'mapa' }); };

  /* Ouvir */
  var fala = window.speechSynthesis;
  function paraFala() { if (fala) fala.cancel(); btOuvir.classList.remove('tocando'); btOuvir.innerHTML = ic('som') + '<span class="rot">Ouvir</span>'; }
  btOuvir.onclick = function () {
    if (!fala) return;
    if (fala.speaking) { paraFala(); return; }
    var txt = [].map.call(palco.querySelectorAll('[data-fala]'), function (e) { return e.textContent.trim(); }).join('. ');
    var u = new SpeechSynthesisUtterance(txt);
    u.lang = 'pt-BR'; u.rate = 0.92;
    var v = fala.getVoices().filter(function (x) { return /^pt/i.test(x.lang); });
    var br = v.filter(function (x) { return /BR/i.test(x.lang); })[0] || v[0];
    if (br) u.voice = br;
    u.onend = paraFala; u.onerror = paraFala;
    btOuvir.classList.add('tocando'); btOuvir.innerHTML = ic('parar') + '<span class="rot">Parar</span>';
    fala.speak(u);
  };
  if (!fala) btOuvir.hidden = true;

  /* Progresso */
  function progresso() {
    var h = J.map(function (e, i) {
      var p = 0;
      if (vista.v === 'est' && vista.e === i) p = Math.round((vista.t + 1) / (e.telas.length + 1) * 100);
      return '<i class="' + (est.feitas[e.id] ? 'feita' : '') + '" style="--p:' + p + '%"><b></b></i>';
    }).join('');
    var feitas = J.filter(function (e) { return est.feitas[e.id]; }).length;
    var pg = document.getElementById('prog');
    pg.innerHTML = h;
    pg.setAttribute('aria-label', feitas + ' de ' + J.length + ' paradas concluídas');
  }

  /* Telas */
  function tMapa() {
    var feitas = J.filter(function (e) { return est.feitas[e.id]; }).length;
    var prox = 0;
    for (var i = 0; i < J.length; i++) { if (!est.feitas[J[i].id]) { prox = i; break; } }
    var rot = feitas === 0 ? 'Começar a jornada' : (feitas === J.length ? 'Ver o final' : 'Continuar: ' + J[prox].titulo);
    var luzes = J.map(function (e) { return '<svg viewBox="0 0 24 24" class="ic' + (est.feitas[e.id] ? ' acesa' : '') + '" aria-hidden="true"><path d="' + IC.vela + '"/></svg>'; }).join('');
    return '<section class="tela inicio">' +
      '<p class="olho">A promessa e o preço</p>' +
      '<h1 class="tit" data-fala>A Jornada<span>Como o fascismo convenceu milhões de pessoas</span></h1>' +
      '<p class="txt" data-fala>São 7 paradas curtas. Uma ideia por tela. Leva cerca de 15 minutos, e você pode parar e voltar quando quiser.</p>' +
      '<button class="bt bt-pri bt-grande" type="button" data-acao="comecar">' + esc(rot) + ic('dir') + '</button>' +
      '<div class="luzes" aria-label="' + feitas + ' de 7 luzes acesas">' + luzes + '<span>' + feitas + ' de 7 luzes acesas</span></div>' +
      '<ol class="trilha">' + J.map(function (e, i) {
        return '<li><button class="parada' + (est.feitas[e.id] ? ' feita' : '') + '" type="button" data-est="' + i + '" style="--cb:' + e.cor + '">' +
          '<span class="bola">' + ic(e.ic) + '</span><span><b>' + (i + 1) + '. ' + esc(e.titulo) + '</b><span>' + esc(e.resumo) + '</span></span>' +
          ic(est.feitas[e.id] ? 'check' : 'dir') + '</button></li>';
      }).join('') + '</ol>' +
      '<div class="aviso"><p data-fala><strong>Antes de começar.</strong> Esta história fala de violência e morte, mas não mostra imagens fortes.</p>' +
      '<p><strong>O que é este material.</strong> Um trabalho pessoal, informal e apartidário, sem ligação com partido, candidato, empresa ou governo. Só entram fatos com data e fonte.</p>' +
      '<p><strong>Feito com ajuda de inteligência artificial.</strong> Pode conter erros: as fontes estão na versão completa.</p></div>' +
      '<p class="links"><a href="index.html">Versão completa, com linha do tempo</a><a href="index.html#balanco">O balanço de cada regime</a><a href="hoje.html">E hoje? A mesma régua para oito políticos</a><a href="index.html#fontes">Fontes</a></p>' +
      '</section>';
  }

  function tCapa(e, i) {
    return '<section class="tela capa"><span class="num">Parada ' + (i + 1) + ' de ' + J.length + '</span>' +
      '<span class="simbolo">' + ic(e.ic) + '</span>' +
      '<h1 class="tit" data-fala>' + esc(e.titulo) + '</h1><p class="txt" data-fala>' + esc(e.resumo) + '</p></section>';
  }

  function gente(de, marca) {
    var h = '';
    for (var k = 0; k < de; k++) h += '<svg viewBox="0 0 24 24" class="' + (k < marca ? 'm' : '') + '" style="--i:' + k + '" aria-hidden="true">' + PESSOA + '</svg>';
    return '<div class="gente">' + h + '</div>';
  }

  function tTela(e, i, t) {
    var d = e.telas[t], chave = e.id + t, h = '';
    var olho = '<p class="olho">' + (i + 1) + '. ' + esc(e.titulo) + '</p>';
    if (d.tipo === 'historia') {
      h = olho + (d.img ? '<figure class="foto"><img src="' + d.img + '" alt="' + esc(d.alt || '') + '"></figure>' : '<span class="simbolo">' + ic(d.ic) + '</span>') +
        '<h2 class="tit" data-fala>' + esc(d.t) + '</h2><p class="txt" data-fala>' + esc(d.x) + '</p>';
    } else if (d.tipo === 'numero') {
      h = olho + '<div class="cartao"><p class="numero" data-fala>' + esc(d.n) + '</p><p class="txt" data-fala>' + esc(d.x) + '</p>' +
        (d.de ? gente(d.de, d.marca) : '') + (d.leg ? '<p class="leg" data-fala>' + esc(d.leg) + '</p>' : '') + '</div>';
    } else if (d.tipo === 'passos') {
      h = olho + '<div class="cartao"><p class="numero" data-fala>' + esc(d.t) + '</p><p class="txt" data-fala>' + esc(d.x) + '</p>' +
        '<ol class="passos">' + d.passos.map(function (p, k) { return '<li style="--i:' + k + '"><span data-fala><b>' + esc(p[0]) + '</b>' + esc(p[1]) + '</span></li>'; }).join('') + '</ol></div>';
    } else if (d.tipo === 'lista') {
      h = olho + '<h2 class="tit" data-fala>' + esc(d.t) + '</h2>' +
        '<ul class="dados">' + d.itens.map(function (p, k) { return '<li style="--i:' + k + '" data-fala><span>' + esc(p[0]) + '</span><b>' + esc(p[1]) + '</b></li>'; }).join('') + '</ul>' +
        '<p class="nota" data-fala>' + esc(d.x) + ' <a href="index.html#balanco">Ver fontes e mais dados</a></p>';
    } else if (d.tipo === 'virar') {
      h = olho + '<h2 class="tit" data-fala>Prometeram. E entregaram?</h2><p class="txt">' + esc(d.t) + '</p>' +
        '<div class="cartas">' + d.cartas.map(function (c) {
          return '<button class="carta" type="button" aria-pressed="false"><span class="carta-in">' +
            '<span class="face frente" data-fala><small>Prometeram</small>' + esc(c[0]) + '</span>' +
            '<span class="face verso" data-fala><small>Entregaram</small>' + esc(c[1]) + '</span></span></button>';
        }).join('') + '</div>';
    } else if (d.tipo === 'pergunta') {
      var r = respondida[chave];
      h = olho + '<h2 class="tit" data-fala>' + esc(d.q) + '</h2><div class="ops">' + d.op.map(function (o, k) {
        var cls = r == null ? '' : (k === d.certa ? ' certa' : (k === r ? ' marcada' : ''));
        return '<button class="op' + cls + '" type="button" data-op="' + k + '" data-fala>' + esc(o) + ic('check') + '</button>';
      }).join('') + '</div>' +
        (r != null ? '<div class="fb" data-fala><b>' + (r === d.certa ? 'Isso mesmo.' : 'Veja o que aconteceu:') + '</b>' + esc(d.fb) + '</div>' : '');
    } else if (d.tipo === 'sinais') {
      h = olho + '<h2 class="tit" data-fala>' + esc(d.t) + '</h2><p class="txt" data-fala>' + esc(d.x) + '</p><div class="ops">' + d.itens.map(function (o, k) {
        return '<button class="op sinal-op' + (est.sinal === k ? ' certa' : '') + '" type="button" data-sinal="' + k + '" data-fala>' + esc(o) + ic('check') + '</button>';
      }).join('') + '</div>';
    }
    return '<section class="tela' + (indo < 0 ? ' volta' : '') + '">' + h + '</section>';
  }

  function tFimEst(e, i) {
    var feitas = J.filter(function (x) { return est.feitas[x.id]; }).length;
    return '<section class="tela festa"><span class="vela"><svg viewBox="0 0 24 24" class="ic" aria-hidden="true"><path d="' + IC.vela + '"/></svg></span>' +
      '<h2 class="tit" data-fala>Mais uma luz acesa</h2>' +
      '<p class="txt" data-fala>Você concluiu a parada ' + (i + 1) + ': ' + esc(e.titulo) + '. Já são ' + feitas + ' de 7.</p>' +
      '<p class="nota">Cada luz lembra que conhecer essa história ajuda a não repeti-la.</p></section>';
  }

  function tFinal() {
    var itens = J[J.length - 1].telas.filter(function (t) { return t.tipo === 'sinais'; })[0].itens;
    var meu = est.sinal != null ? itens[est.sinal] : null;
    return '<section class="tela festa"><span class="vela"><svg viewBox="0 0 24 24" class="ic" aria-hidden="true"><path d="' + IC.vela + '"/></svg></span>' +
      '<h1 class="tit" data-fala>Você completou a jornada</h1>' +
      '<p class="txt" data-fala>Sete luzes acesas. Eles prometeram trabalho, ordem e orgulho. Entregaram guerra, prisão e morte. Agora você sabe como começou.</p>' +
      (meu ? '<p class="olho">O sinal que você escolheu guardar</p><p class="compromisso" data-fala>' + esc(meu) + '</p>' : '') +
      '<a class="ponte-hoje" href="hoje.html"><span class="olho">Próximo passo</span><b data-fala>E hoje?</b><span data-fala>A mesma régua aplicada a oito políticos de hoje: Lula, Flávio, Jair, Trump, Milei, Bukele, Maduro e Ortega. Com o quadro dos 10 critérios, o mapa de quem se liga a quem e cada fato com fonte.</span></a>' +
      '<button class="bt bt-pri bt-grande" type="button" data-acao="compartilhar">Compartilhar com alguém</button>' +
      '<p class="nota" id="msg-comp" role="status"></p>' +
      '<a class="bt bt-grande" href="index.html#balanco">Ver os números de cada regime</a>' +
      '<a class="bt bt-grande" href="index.html">Ver a versão completa</a>' +
      '<button class="bt bt-som bt-grande" type="button" data-acao="recomecar">Fazer a jornada de novo</button></section>';
  }

  /* Navegacao */
  function ir(nova) {
    paraFala();
    vista = nova;
    var e = vista.v === 'est' ? J[vista.e] : null;
    doc.style.setProperty('--acc-base', e ? e.cor : '#d6303b');
    if (e) doc.style.removeProperty('--fundo'); else doc.style.setProperty('--fundo', '#566074');
    var html, n = e ? e.telas.length : 0;
    if (vista.v === 'mapa') html = tMapa();
    else if (vista.v === 'final') html = tFinal();
    else if (vista.t === -1) html = tCapa(e, vista.e);
    else if (vista.t === n) html = tFimEst(e, vista.e);
    else html = tTela(e, vista.e, vista.t);
    palco.innerHTML = html;
    pe.hidden = vista.v !== 'est';
    if (e) {
      btVoltar.innerHTML = ic('esq') + '<span class="rot">Voltar</span>';
      var rot = vista.t === -1 ? 'Começar' : (vista.t === n ? (vista.e === J.length - 1 ? 'Ver o final' : 'Próxima parada') : 'Continuar');
      btSeguir.innerHTML = '<span>' + rot + '</span>' + ic('dir');
      est.pos = { e: vista.e, t: Math.min(vista.t, n - 1) };
    }
    salva(); progresso();
    window.scrollTo(0, 0);
    var foco = palco.querySelector('.tit');
    if (foco) { foco.setAttribute('tabindex', '-1'); foco.focus({ preventScroll: true }); }
  }

  function seguir() {
    indo = 1;
    var e = J[vista.e], n = e.telas.length;
    if (vista.t < n - 1) return ir({ v: 'est', e: vista.e, t: vista.t + 1 });
    if (vista.t === n - 1) { est.feitas[e.id] = true; return ir({ v: 'est', e: vista.e, t: n }); }
    if (vista.e < J.length - 1) return ir({ v: 'est', e: vista.e + 1, t: -1 });
    ir({ v: 'final' });
  }
  function voltar() {
    indo = -1;
    if (vista.t > -1) return ir({ v: 'est', e: vista.e, t: vista.t - 1 });
    ir({ v: 'mapa' });
  }
  btSeguir.onclick = seguir;
  btVoltar.onclick = voltar;

  palco.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.acao === 'comecar') {
      var prox = -1;
      for (var i = 0; i < J.length; i++) { if (!est.feitas[J[i].id]) { prox = i; break; } }
      indo = 1;
      if (prox === -1) return ir({ v: 'final' });
      var t = est.pos && est.pos.e === prox && est.pos.t > 0 ? est.pos.t : -1;
      return ir({ v: 'est', e: prox, t: t });
    }
    if (b.dataset.est != null) { indo = 1; return ir({ v: 'est', e: +b.dataset.est, t: -1 }); }
    if (b.dataset.op != null) {
      respondida[J[vista.e].id + vista.t] = +b.dataset.op;
      indo = 0; ir(vista);
      var fb = palco.querySelector('.fb'); if (fb) fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    if (b.dataset.sinal != null) { est.sinal = +b.dataset.sinal; indo = 0; return ir(vista); }
    if (b.classList.contains('carta')) { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); return; }
    if (b.dataset.acao === 'recomecar') { est = { feitas: {}, sinal: null, pos: null }; respondida = {}; return ir({ v: 'mapa' }); }
    if (b.dataset.acao === 'compartilhar') {
      var url = location.href.replace(/[#?].*$/, '');
      var dados = { title: 'A Jornada - A promessa e o preço', text: 'Em 15 minutos, entenda como o fascismo convenceu milhões de pessoas e o que ele entregou.', url: url };
      var msg = document.getElementById('msg-comp');
      if (navigator.share) navigator.share(dados).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(dados.text + ' ' + url).then(function () { msg.textContent = 'Texto copiado. Agora é só colar na conversa.'; });
      else msg.textContent = 'Copie o endereço desta página e envie para alguém.';
    }
  });

  document.addEventListener('keydown', function (ev) {
    if (vista.v !== 'est' || /^(INPUT|TEXTAREA)$/.test(ev.target.tagName)) return;
    if (ev.key === 'ArrowRight') seguir();
    if (ev.key === 'ArrowLeft') voltar();
  });

  ir({ v: 'mapa' });
})();
