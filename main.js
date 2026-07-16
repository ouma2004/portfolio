/* ═══════════════════════════════════════════════
   PORTFOLIO — EDDARDARI Oumayma
   main.js — Curseur natif, filtres corrigés
═══════════════════════════════════════════════ */

/* ─── 1. LOADER ─── */
(function () {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loaderBar');
  let pct = 0;
  document.body.style.overflow = 'hidden';

  const iv = setInterval(() => {
    pct += Math.random() * 14 + 6;
    if (pct > 100) pct = 100;
    bar.style.width = pct + '%';
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        loader.classList.add('out');
        document.body.style.overflow = '';
        initAll();
      }, 420);
    }
  }, 55);
})();

/* ─── INIT TOUT ─── */
function initAll() {
  initCanvas();
  initTyped();
  initAOS();
  initCounters();
  initSkillBars();
  initFilters();   // filtres projets
  initForm();
  initNav();
  initScrollTop();
  initTilt();
  document.getElementById('yr').textContent = new Date().getFullYear();
}

/* ─── 2. NAV ─── */
function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  const navAs  = document.querySelectorAll('.nav__links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('shrink', window.scrollY > 60);
    // lien actif
    let cur = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) cur = s.id;
    });
    navAs.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  });

  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.classList.toggle('on');
  });
  navAs.forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.classList.remove('on');
  }));
}

/* ─── 3. SMOOTH SCROLL ─── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 68;
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    });
  });
});

/* ─── 4. SCROLL TOP ─── */
function initScrollTop() {
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── 5. TYPED TEXT ─── */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;
  const phrases = [
    'Full-Stack Developer',
    'Data Engineer',
    'Data Analyst',
    'AI Engineer',
    'Ingénieure Informatique'
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) {
        deleting = true;
        return setTimeout(tick, 2200);
      }
    } else {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 42 : 88);
  }
  setTimeout(tick, 900);
}

/* ─── 6. HERO CANVAS ─── */
function initCanvas() {
  const cv = document.getElementById('heroCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  function resize() {
    cv.width  = cv.offsetWidth;
    cv.height = cv.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const pts = Array.from({ length: 55 }, () => ({
    x:  Math.random() * cv.width,
    y:  Math.random() * cv.height,
    r:  Math.random() * 1.6 + .5,
    vx: (Math.random() - .5) * .38,
    vy: (Math.random() - .5) * .38,
    a:  Math.random() * .35 + .1
  }));

  (function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cv.width)  p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.a})`;
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(201,168,76,${.08 * (1 - d / 115)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  })();
}

/* ─── 7. PHOTO CARD TILT (hover only, no cursor) ─── */
function initTilt() {
  const card = document.getElementById('tiltCard');
  if (!card) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - .5) * 14;
    const y = ((e.clientY - r.top)  / r.height - .5) * 10;
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

/* ─── 8. AOS — Scroll Reveal ─── */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('show'), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ─── 9. COUNTERS ─── */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.s || '';
      let cur = 0;
      const step = Math.ceil(target / 40);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + suffix;
        if (cur >= target) clearInterval(iv);
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.spec__n[data-count]').forEach(el => obs.observe(el));
}

/* ─── 10. SKILL BARS ─── */
function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.width = entry.target.dataset.w + '%';
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.sk-bar').forEach(b => obs.observe(b));
}

/* ─── 11. PROJECT FILTERS — VERSION CORRIGÉE ─── */
function initFilters() {
  const buttons = document.querySelectorAll('.filter');
  const cards   = document.querySelectorAll('.pcard');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Retirer active de tous les boutons
      buttons.forEach(b => b.classList.remove('active'));
      // 2. Mettre active sur celui cliqué
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // 3. Afficher/masquer les cartes
      cards.forEach(card => {
        const category = card.getAttribute('data-cat') || '';
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          // Vérifie si la catégorie contient le filtre
          const cats = category.split(' ');
          if (cats.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
}

/* ─── 12. CONTACT FORM — Netlify ─── */
function initForm() {
  const form   = document.getElementById('contactForm');
  if (!form) return;

  const nameI  = document.getElementById('name');
  const emailI = document.getElementById('email');
  const msgI   = document.getElementById('message');
  const nameE  = document.getElementById('nameErr');
  const emailE = document.getElementById('emailErr');
  const msgE   = document.getElementById('msgErr');
  const btn    = document.getElementById('submitBtn');
  const txt    = document.getElementById('submitTxt');
  const ico    = document.getElementById('submitIco');
  const okDiv  = document.getElementById('formOk');

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setErr(input, errEl, msg) {
    input.classList.add('err');
    if (errEl) errEl.textContent = msg;
    return false;
  }
  function clrErr(input, errEl) {
    input.classList.remove('err');
    if (errEl) errEl.textContent = '';
  }

  // Validation en direct
  nameI.addEventListener('input',  () => { if (nameI.value.trim().length  >= 2)             clrErr(nameI, nameE); });
  emailI.addEventListener('input', () => { if (emailRx.test(emailI.value))                   clrErr(emailI, emailE); });
  msgI.addEventListener('input',   () => { if (msgI.value.trim().length   >= 10)             clrErr(msgI, msgE); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    if (nameI.value.trim().length  < 2)   valid = setErr(nameI,  nameE,  'Minimum 2 caractères requis.');
    else clrErr(nameI, nameE);

    if (!emailRx.test(emailI.value))       valid = setErr(emailI, emailE, 'Adresse email invalide.');
    else clrErr(emailI, emailE);

    if (msgI.value.trim().length   < 10)   valid = setErr(msgI,   msgE,   'Minimum 10 caractères requis.');
    else clrErr(msgI, msgE);

    if (!valid) return;

    btn.disabled = true;
    txt.textContent = 'Envoi en cours…';
    ico.className = 'fa-solid fa-spinner fa-spin';

    // Envoi Netlify Forms
    fetch('/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams(new FormData(form)).toString()
    })
    .then(res => {
      btn.disabled = false;
      txt.textContent = 'Envoyer le message';
      ico.className = 'fa-solid fa-paper-plane';
      if (res.ok) {
        okDiv.classList.add('show');
        form.reset();
        setTimeout(() => okDiv.classList.remove('show'), 6000);
      } else {
        setErr(msgI, msgE, '❌ Erreur ' + res.status + '. Réessayez.');
      }
    })
    .catch(() => {
      btn.disabled = false;
      txt.textContent = 'Envoyer le message';
      ico.className = 'fa-solid fa-paper-plane';
      setErr(msgI, msgE, '❌ Erreur réseau. Réessayez plus tard.');
    });
  });
}


/* ─── LIENS PROJETS — à personnaliser ─── */
/*
   Pour chaque projet, remplace le href="#" par ton vrai lien GitHub ou démo.
   Exemple dans index.html :
     id="proj-01" → ton repo Northwind
     id="proj-02" → ton repo Tribunal
     etc.

   Ou décommente et adapte le tableau ci-dessous :
*/
// const projectLinks = {
//   'proj-01': 'https://github.com/oumayma-eddardari/northwind-dw',
//   'proj-02': 'https://github.com/oumayma-eddardari/tribunal-docs',
//   'proj-03': 'https://github.com/oumayma-eddardari/smart-bin',
//   'proj-04': 'https://github.com/oumayma-eddardari/sncf-powerbi',
//   'proj-05': 'https://github.com/oumayma-eddardari/cafe-dotnet',
//   'proj-06': 'https://github.com/oumayma-eddardari/cafe-react-spring',
//   'proj-07': 'https://github.com/oumayma-eddardari/sijel-tadawol',
// };
// Object.entries(projectLinks).forEach(([id, url]) => {
//   const el = document.getElementById(id);
//   if (el && url) el.href = url;
// });
