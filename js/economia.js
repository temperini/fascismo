/* Graficos da secao "Economia": barras por ano (PIB, IPCA, desemprego) e linha (divida).
   Cor = governo (Jair ou Lula). Valor exato no toque/hover; tabela completa logo abaixo. */
(function () {
  var D = {
    pib:   { un: '%', dec: 1, tipo: 'barra', serie: [[2019, 1.2], [2020, -3.3], [2021, 4.8], [2022, 2.9], [2023, 3.2], [2024, 3.4], [2025, 2.3], [2026, 1.9, '12 meses até junho']] },
    ipca:  { un: '%', dec: 1, tipo: 'barra', serie: [[2019, 4.31], [2020, 4.52], [2021, 10.06], [2022, 5.79], [2023, 4.62], [2024, 4.83], [2025, 4.26], [2026, 4.58, '12 meses até setembro']] },
    desemp:{ un: '%', dec: 1, tipo: 'barra', serie: [[2019, 11.9], [2020, 13.8], [2021, 13.2], [2022, 9.3], [2023, 7.8], [2024, 6.6], [2025, 5.6], [2026, 5.3, 'trimestre até agosto']] },
    divida:{ un: '% do PIB', dec: 1, tipo: 'linha', serie: [[2018, 75.3, 'dezembro, governo anterior'], [2019, 74.4], [2020, 86.9], [2021, 77.3], [2022, 71.7], [2023, 74.3], [2024, 76.3], [2025, 78.7], [2026, 82.9, 'agosto']] }
  };
  function gov(ano) { return ano <= 2022 ? 'jair' : 'lula'; }
  function nome(g) { return g === 'jair' ? 'Jair' : 'Lula'; }
  function fmt(v, d) { return v.toFixed(d).replace('.', ','); }
  var ns = 'http://www.w3.org/2000/svg';
  function el(n, a, p) { var e = document.createElementNS(ns, n); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }

  var tip = document.createElement('div');
  tip.className = 'eco-tip'; tip.setAttribute('role', 'status'); tip.hidden = true;
  document.body.appendChild(tip);
  function mostra(alvo, html) {
    tip.innerHTML = html; tip.hidden = false;
    var r = alvo.getBoundingClientRect(), t = tip.getBoundingClientRect();
    var x = r.left + r.width / 2 - t.width / 2;
    x = Math.max(8, Math.min(x, window.innerWidth - t.width - 8));
    var y = r.top - t.height - 10; if (y < 64) y = r.bottom + 10;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function esconde() { tip.hidden = true; }
  window.addEventListener('scroll', esconde, { passive: true });

  function grafico(box, cfg) {
    var W = 560, H = 250, ml = 42, mr = 12, mt = 30, mb = 34;
    var s = cfg.serie, n = s.length;
    var vals = s.map(function (p) { return p[1]; });
    var lo = Math.min(0, Math.min.apply(null, vals)), hi = Math.max.apply(null, vals);
    if (cfg.tipo === 'linha') { lo = Math.floor((Math.min.apply(null, vals) - 6) / 10) * 10; }
    var passo = (hi - lo) > 40 ? 10 : (hi - lo) > 12 ? 4 : 2;
    lo = Math.floor(lo / passo) * passo; hi = Math.ceil(hi / passo) * passo + (cfg.tipo === 'linha' ? passo : passo * 0.4);
    var y = function (v) { return mt + (hi - v) / (hi - lo) * (H - mt - mb); };
    var bw = (W - ml - mr) / n, xc = function (i) { return ml + bw * i + bw / 2; };
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': box.dataset.titulo + '. Valores na tabela abaixo.' }, box);

    /* faixas dos governos */
    ['jair', 'lula'].forEach(function (g) {
      var idx = s.map(function (p, i) { return gov(p[0]) === g ? i : -1; }).filter(function (i) { return i >= 0; });
      if (cfg.tipo === 'linha' && g === 'jair') idx = idx.filter(function (i) { return s[i][0] >= 2019; });
      var x0 = ml + bw * idx[0], x1 = ml + bw * (idx[idx.length - 1] + 1);
      el('rect', { x: x0, y: mt - 22, width: x1 - x0, height: H - mt - mb + 22, 'class': 'eco-faixa eco-faixa-' + g }, svg);
      var t = el('text', { x: (x0 + x1) / 2, y: mt - 8, 'class': 'eco-faixa-t' }, svg); t.textContent = nome(g) + (g === 'jair' ? ' (2019 a 2022)' : ' (2023 a 2026)');
    });
    /* grade recessiva */
    for (var v = lo; v <= hi + 0.001; v += passo) {
      if (v > hi - passo * 0.3 && cfg.tipo !== 'linha' && v !== 0) continue;
      el('line', { x1: ml, x2: W - mr, y1: y(v), y2: y(v), 'class': v === 0 ? 'eco-zero' : 'eco-grade' }, svg);
      var tt = el('text', { x: ml - 6, y: y(v) + 4, 'class': 'eco-eixo', 'text-anchor': 'end' }, svg); tt.textContent = fmt(v, 0) + (cfg.un === '%' ? '%' : '');
    }
    /* eixo x */
    s.forEach(function (p, i) {
      var t = el('text', { x: xc(i), y: H - mb + 18, 'class': 'eco-eixo', 'text-anchor': 'middle' }, svg);
      t.textContent = p[2] && i === n - 1 && cfg.tipo !== 'linha' ? p[0] + '*' : (cfg.tipo === 'linha' && i === n - 1 ? 'ago/26' : p[0]);
    });

    if (cfg.tipo === 'barra') {
      var w = Math.min(34, bw * 0.58), r = 4;
      s.forEach(function (p, i) {
        var g = gov(p[0]), x = xc(i) - w / 2, y0 = y(0), y1 = y(p[1]), up = p[1] >= 0;
        var top = Math.min(y0, y1), h = Math.abs(y1 - y0), rr = Math.min(r, h);
        var d = up
          ? 'M' + x + ',' + y0 + 'V' + (top + rr) + 'Q' + x + ',' + top + ' ' + (x + rr) + ',' + top + 'H' + (x + w - rr) + 'Q' + (x + w) + ',' + top + ' ' + (x + w) + ',' + (top + rr) + 'V' + y0 + 'Z'
          : 'M' + x + ',' + y0 + 'V' + (y1 - rr) + 'Q' + x + ',' + y1 + ' ' + (x + rr) + ',' + y1 + 'H' + (x + w - rr) + 'Q' + (x + w) + ',' + y1 + ' ' + (x + w) + ',' + (y1 - rr) + 'V' + y0 + 'Z';
        el('path', { d: d, 'class': 'eco-barra eco-' + g + (p[2] ? ' eco-parcial' : '') }, svg);
        /* rotulo direto so nos extremos e no ultimo */
        var ext = p[1] === Math.max.apply(null, vals) || p[1] === Math.min.apply(null, vals) || i === n - 1;
        if (ext) { var lb = el('text', { x: xc(i), y: up ? top - 6 : y1 + 14, 'class': 'eco-rot', 'text-anchor': 'middle' }, svg); lb.textContent = fmt(p[1], cfg.dec) + '%'; }
      });
    } else {
      var pts = s.map(function (p, i) { return [xc(i), y(p[1])]; });
      for (var i = 0; i < n - 1; i++) {
        var g = s[i + 1][0] <= 2022 ? 'jair' : 'lula';
        el('line', { x1: pts[i][0], y1: pts[i][1], x2: pts[i + 1][0], y2: pts[i + 1][1], 'class': 'eco-linha eco-l-' + g }, svg);
      }
      s.forEach(function (p, i) {
        var g = p[0] <= 2018 ? 'antes' : gov(p[0]);
        el('circle', { cx: pts[i][0], cy: pts[i][1], r: 5, 'class': 'eco-ponto eco-p-' + g }, svg);
        if (p[0] === 2018 || p[0] === 2020 || p[0] === 2022 || i === n - 1) { var lb = el('text', { x: pts[i][0], y: pts[i][1] - 12, 'class': 'eco-rot', 'text-anchor': 'middle' }, svg); lb.textContent = fmt(p[1], 1) + '%'; }
      });
    }
    /* alvos de toque maiores que a marca */
    s.forEach(function (p, i) {
      var g = cfg.tipo === 'linha' && p[0] <= 2018 ? null : gov(p[0]);
      var rot = (cfg.tipo === 'linha' && i === n - 1 ? 'Agosto de 2026' : p[0]) + ': ' + fmt(p[1], cfg.dec) + (cfg.un === '%' ? '%' : ' ' + cfg.un) + (p[2] ? ' (' + p[2] + ')' : '');
      var hit = el('rect', { x: ml + bw * i, y: mt - 22, width: bw, height: H - mt - mb + 22, 'class': 'eco-hit', tabindex: 0, role: 'button', 'aria-label': rot + (g ? ', governo ' + nome(g) : '') }, svg);
      var html = '<b>' + rot.split(': ')[0] + '</b><span>' + fmt(p[1], cfg.dec) + (cfg.un === '%' ? '%' : ' ' + cfg.un) + '</span>' + (p[2] ? '<small>' + p[2] + '</small>' : '') + (g ? '<em class="eco-tip-' + g + '">Governo ' + nome(g) + '</em>' : '<em>Antes de 2019</em>');
      var on = function () { mostra(hit, html); svg.classList.add('eco-foco'); hit.classList.add('on'); };
      var off = function () { esconde(); svg.classList.remove('eco-foco'); hit.classList.remove('on'); };
      hit.addEventListener('mouseenter', on); hit.addEventListener('focus', on);
      hit.addEventListener('mouseleave', off); hit.addEventListener('blur', off);
      hit.addEventListener('click', on);
    });
  }
  [].forEach.call(document.querySelectorAll('.eco-graf[data-serie]'), function (box) { grafico(box, D[box.dataset.serie]); });
})();
