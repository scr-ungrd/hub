/* Red animada de nodos para el hero (inspirada en particles.js; sin dependencias) */
(function () {
  'use strict';
  var hero = document.querySelector('.hero-banner');
  if (!hero) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'hero-network';
  canvas.setAttribute('aria-hidden', 'true');
  hero.insertBefore(canvas, hero.firstChild);
  var ctx = canvas.getContext('2d');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LINK_DIST = 140, REPEL_DIST = 110;
  var W = 0, H = 0, dpr = 1, nodes = [], mouse = { x: -9999, y: -9999 };
  var running = false, visible = true;

  // Paleta del hub: blanco (mayoría), turquesa claro y amarillo institucional (acentos)
  var COLORS = [
    { c: '255,255,255', a: 0.55, w: 70 },
    { c: '60,198,214',  a: 0.75, w: 18 },
    { c: '250,199,24',  a: 0.90, w: 12 }
  ];
  function pickColor() {
    var t = Math.random() * 100, acc = 0;
    for (var i = 0; i < COLORS.length; i++) { acc += COLORS[i].w; if (t < acc) return COLORS[i]; }
    return COLORS[0];
  }

  function makeNode(spawnBelow) {
    var col = pickColor();
    return {
      x: Math.random() * W,
      y: spawnBelow ? H + 20 : Math.random() * H,
      r: 2.5 + Math.pow(Math.random(), 2.4) * 12,  // muchos pequeños, pocos grandes
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(0.06 + Math.random() * 0.16),          // deriva lenta hacia arriba
      col: col.c, a: col.a
    };
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    W = rect.width; H = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var target = Math.max(18, Math.min(90, Math.round(W * H / 5500)));
    while (nodes.length < target) nodes.push(makeNode(false));
    nodes.length = target;
    if (!running) draw();
  }

  function step() {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < REPEL_DIST && d > 0.1) {
        var f = (REPEL_DIST - d) / REPEL_DIST;
        n.x += (dx / d) * f * 2.2; n.y += (dy / d) * f * 2.2;
      }
      n.x += n.vx; n.y += n.vy;
      if (n.y < -n.r - 10) { var m = makeNode(true); n.x = m.x; n.y = m.y; n.r = m.r; n.col = m.col; n.a = m.a; }
      if (n.x < -n.r - 10) n.x = W + n.r; else if (n.x > W + n.r + 10) n.x = -n.r;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, dx, dy, d, al;
    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
        if (d < LINK_DIST * LINK_DIST) {
          al = (1 - Math.sqrt(d) / LINK_DIST) * 0.35;
          ctx.strokeStyle = 'rgba(255,255,255,' + al.toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      ctx.fillStyle = 'rgba(' + a.col + ',' + a.a + ')';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
    }
  }

  function loop() {
    if (!running) return;
    step(); draw();
    requestAnimationFrame(loop);
  }
  function start() { if (reduceMotion || running || !visible || document.hidden) return; running = true; requestAnimationFrame(loop); }
  function stop() { running = false; }

  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero); else window.addEventListener('resize', resize);

  resize();
  start();
})();
