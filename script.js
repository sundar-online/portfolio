/* ── CONFIG ── */
const TYPING_TEXTS = ["Data Scientist", "Full Stack Developer", "AI Builder"];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

/* ── REUSABLE NAVBAR COMPONENT ── */
const NAVBAR_TEMPLATE = `
<div class="nav-wrap">
  <nav>
    <a href="index.html" class="nav-item-icon" style="padding: 0 12px; display: flex; align-items: center; border-right: 1px solid rgba(255,255,255,0.1);">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 20px; height: 20px;">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </a>

    <a class="nav-item" href="index.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 6L8 2l6 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" />
        <path d="M6 14V9h4v5" />
      </svg><span>Home</span>
    </a>

    <a class="nav-item" href="work.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <rect x="2" y="3" width="5" height="5" rx="1" />
        <rect x="9" y="3" width="5" height="5" rx="1" />
        <rect x="2" y="10" width="5" height="5" rx="1" />
        <rect x="9" y="10" width="5" height="5" rx="1" />
      </svg><span>Work</span>
    </a>

    <a class="nav-item" href="about.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <circle cx="8" cy="6" r="3" />
        <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
      </svg><span>About</span>
    </a>

    <a class="nav-item" href="contact.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <path d="M3 4h10a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path d="M3 6l5 3 5-3" />
      </svg><span>Contact</span>
    </a>
  </nav>
</div>
`;

/* ── REUSABLE FOOTER COMPONENT ── */
const FOOTER_TEMPLATE = `
<footer>
  <div class="container footer-content">
    <div class="footer-brand">
      <div class="footer-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 24px; height: 24px;">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span>Sundar.</span>
      </div>
      <p>Building the future of intelligent systems.</p>
    </div>
    
    <div class="footer-links">
      <div class="footer-col">
        <h4>Navigation</h4>
        <a href="index.html">Home</a>
        <a href="work.html">Work</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Socials</h4>
        <a href="#" target="_blank">LinkedIn</a>
        <a href="#" target="_blank">GitHub</a>
        <a href="#" target="_blank">Twitter</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Sundaramoorthy. All rights reserved.</p>
  </div>
</footer>
`;

function initNavbar() {
  const target = document.getElementById('navbar-target');
  if (!target) return;
  target.innerHTML = NAVBAR_TEMPLATE;
  autoActivateNav();
}

function initFooter() {
  const target = document.getElementById('footer-target');
  if (!target) return;
  target.innerHTML = FOOTER_TEMPLATE;
}

function autoActivateNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => item.classList.remove('active'));

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === page) {
      item.classList.add('active');
    }
  });
}

/* ── TYPING EFFECT ── */
function typeEffect() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const currentWord = TYPING_TEXTS[typingIndex];

  if (isDeleting) {
    target.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    target.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  target.style.animation = "blink 0.7s step-end infinite";

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % TYPING_TEXTS.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

/* ── SCROLL ANIMATIONS (INTERSECTION OBSERVER) ── */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.id === 'stats') {
          startCounters();
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

function startCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

/* ── MAILTO LOGIC ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`New Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:sundar@example.com?subject=${subject}&body=${body}`;
  });
}

/* ── FETCH PROJECTS (DYNAMIC) ── */
let allProjects = [];

async function fetchProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  try {
    // BUG 2 FIX: Use absolute paths (leading slash) so they resolve correctly
    // regardless of which page/directory is currently loaded.
    let response = await fetch('/data/projects.json');
    if (!response.ok && response.status === 404) {
      response = await fetch('/public/data/projects.json'); // ← fixed: added leading /
    }

    if (!response.ok) throw new Error("HTTP error " + response.status);

    allProjects = await response.json();
    renderProjects(allProjects);
    initFilters();
  } catch (error) {
    console.error('Error fetching projects:', error);
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1;">Could not load dynamic projects.</p>`;
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1; padding: 40px;">No projects found in this category.</p>`;
    return;
  }

  container.innerHTML = projects.map((p, index) => {
    // BUG 1 FIX: Normalise image path so it always resolves from the site root.
    // Your JSON uses paths like "data/project1.png" which are relative and break
    // on any page that isn't at the root. Prepend a leading slash to make them
    // absolute (/data/project1.png) so they work on every page.
    let imgSrc = p.image || '';
    if (imgSrc && !imgSrc.startsWith('/') && !imgSrc.startsWith('http')) {
      imgSrc = '/' + imgSrc;   // "data/x.png"  →  "/data/x.png"
    }

    return `
      <div class="glass-card fade-up" style="transition-delay: ${index * 100}ms">
        <div class="project-img-container">
          <img class="project-img" src="${imgSrc}" alt="${p.title}" loading="lazy"
               onerror="this.style.display='none'">
        </div>

        <div class="project-info">
          <div class="project-category-tag">${p.category || 'Project'}</div>
          <h3>${p.title}</h3>

          <div class="badges">
            ${(p.tags || []).map(tag => `<span class="badge">${tag}</span>`).join('')}
          </div>

          <p>${p.description}</p>

          <div class="card-actions">
            <a href="${p.link || '#'}" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;">Live Demo</a>
            <a href="${p.github_link || '#'}" class="btn btn-secondary" style="padding: 8px 16px; font-size: 13px;">GitHub</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // BUG 3 FIX: Create a fresh IntersectionObserver for newly rendered cards
  // instead of calling initScrollAnimations() which skips already-observed elements.
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  container.querySelectorAll('.fade-up:not(.visible)').forEach(el => obs.observe(el));
}

function initFilters() {
  const filterContainer = document.getElementById('filter-container');
  if (!filterContainer) return;

  const categories = ['All', ...new Set(allProjects.map(p => p.category).filter(Boolean))];

  filterContainer.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>
  `).join('');

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      const filtered = category === 'All'
        ? allProjects
        : allProjects.filter(p => p.category === category);

      renderProjects(filtered);
    });
  });
}

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();
  typeEffect();
  initScrollAnimations();
  initContactForm();
  fetchProjects();

  // BUG 4 FIX: Canvas init moved inside DOMContentLoaded so the <canvas id="bg">
  // element is guaranteed to exist before we query it.
  const canvas = document.getElementById('bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;
    function rand(a, b) { return Math.random() * (b - a) + a; }

    class Puff {
      constructor() { this.init(); this.age = rand(0, 3000); }
      init() {
        this.x = rand(-0.1, 1.1); this.y = rand(-0.1, 1.1);
        this.rx = rand(0.10, 0.28); this.ry = rand(0.06, 0.16);
        this.baseOpacity = rand(0.06, 0.18);
        this.vx = rand(-0.00004, 0.00004); this.vy = rand(-0.00002, 0.00002);
        this.rotation = rand(0, Math.PI * 2); this.rotSpeed = rand(-0.00015, 0.00015);
        this.hue = 0; this.lightness = rand(20, 40);
        this.pulseSpeed = rand(0.0015, 0.005); this.pulseOffset = rand(0, Math.PI * 2);
        this.fadeSpeed = rand(0.0008, 0.002); this.fadeOffset = rand(0, Math.PI * 2);
        this.morphSpeed = rand(0.0006, 0.0018); this.morphOffset = rand(0, Math.PI * 2);
      }
      update(t) {
        this.age++;
        this.x += this.vx; this.y += this.vy; this.rotation += this.rotSpeed;
        const morph = 0.85 + 0.15 * Math.sin(t * this.morphSpeed + this.morphOffset);
        this._curRx = this.rx * morph; this._curRy = this.ry * (1 / morph);
        const fade = 0.5 + 0.5 * Math.sin(t * this.fadeSpeed + this.fadeOffset);
        const pulse = 0.7 + 0.3 * Math.sin(t * this.pulseSpeed + this.pulseOffset);
        this._opacity = this.baseOpacity * fade * pulse;
        if (this.x < -0.35 || this.x > 1.35 || this.y < -0.35 || this.y > 1.35) this.init();
      }
      draw() {
        const cx = this.x * W(), cy = this.y * H();
        const rx = this._curRx * W(), ry = this._curRy * H();
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(this.rotation);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        const op = this._opacity;
        g.addColorStop(0, `hsla(0,0%,${this.lightness}%,${op})`);
        g.addColorStop(0.35, `hsla(0,0%,${this.lightness - 4}%,${op * 0.65})`);
        g.addColorStop(0.7, `hsla(0,0%,${this.lightness - 8}%,${op * 0.25})`);
        g.addColorStop(1, `hsla(0,0%,${this.lightness - 12}%,0)`);
        ctx.scale(1, ry / rx); ctx.beginPath(); ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill(); ctx.restore();
      }
    }

    const puffs = Array.from({ length: 28 }, () => new Puff());

    const stars = Array.from({ length: 200 }, () => {
      const roll = Math.random();
      let baseR = roll < 0.70 ? rand(0.25, 0.8) : roll < 0.90 ? rand(0.9, 1.7) : roll < 0.97 ? rand(1.8, 3.0) : rand(3.2, 4.8);
      const isBig = baseR > 1.8;
      return {
        x: Math.random(), y: Math.random(), r: baseR, baseR, op: isBig ? rand(0.55, 0.95) : rand(0.15, 0.80),
        twinkleSpeed: rand(0.003, isBig ? 0.01 : 0.02), twinkleOffset: rand(0, Math.PI * 2),
        hue: 0, isBig, shrinkRate: rand(0.00008, 0.00018), minScale: 0.02, age: rand(0, 600)
      };
    });

    function drawStars(t) {
      stars.forEach(s => {
        s.age++;
        const scale = Math.max(s.minScale, 1 - s.shrinkRate * s.age);
        s.r = s.baseR * scale;
        if (scale <= s.minScale) s.age = 0;
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.op * (s.isBig ? (0.55 + 0.45 * twinkle) : twinkle);
        ctx.save(); ctx.globalAlpha = alpha;
        if (s.isBig) {
          const glow = ctx.createRadialGradient(s.x * W(), s.y * H(), 0, s.x * W(), s.y * H(), s.r * 5.5);
          glow.addColorStop(0, `hsla(0,0%,90%,0.32)`); glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(s.x * W(), s.y * H(), s.r * 5.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `hsla(0, 0%, 100%, 0.8)`;
        ctx.beginPath(); ctx.arc(s.x * W(), s.y * H(), Math.max(0.15, s.r), 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
    }

    function drawBase(t) {
      const w = W(), h = H();
      ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, w, h);
      const shift = Math.sin(t * 0.0003) * 0.06;
      const g1 = ctx.createRadialGradient(w * (0.32 + shift), h * 0.50, 0, w * (0.32 + shift), h * 0.50, w * 0.65);
      g1.addColorStop(0, 'rgba(255,255,255,0.03)'); g1.addColorStop(0.5, 'rgba(255,255,255,0.01)'); g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * (0.78 - shift), h * 0.40, 0, w * (0.78 - shift), h * 0.40, w * 0.48);
      g2.addColorStop(0, 'rgba(255,255,255,0.02)'); g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);
      const breathe = 0.08 + 0.06 * Math.sin(t * 0.0008);
      const g3 = ctx.createRadialGradient(w * 0.44, h * 0.44, 0, w * 0.44, h * 0.44, w * (0.22 + breathe));
      g3.addColorStop(0, 'rgba(255,255,255,0.04)'); g3.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g3; ctx.fillRect(0, 0, w, h);
      const g4 = ctx.createRadialGradient(w * 0.62, h * 0.60, 0, w * 0.62, h * 0.60, w * 0.35);
      g4.addColorStop(0, `rgba(255,255,255,${0.02 + 0.01 * Math.sin(t * 0.0005)})`);
      g4.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g4; ctx.fillRect(0, 0, w, h);
    }

    let mouseX = 0.5, mouseY = 0.5, smoothMX = 0.5, smoothMY = 0.5;
    window.addEventListener('mousemove', e => { mouseX = e.clientX / window.innerWidth; mouseY = e.clientY / window.innerHeight; });

    function drawMouseGlow() {
      smoothMX += (mouseX - smoothMX) * 0.04; smoothMY += (mouseY - smoothMY) * 0.04;
      const w = W(), h = H(), cx = smoothMX * w, cy = smoothMY * h;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.30);
      g.addColorStop(0, 'rgba(255,255,255,0.03)'); g.addColorStop(0.5, 'rgba(255,255,255,0.01)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }

    let t = 0;
    function loop() {
      t++;
      drawBase(t);
      puffs.forEach(p => { p.update(t); p.draw(); });
      drawStars(t);
      drawMouseGlow();
      requestAnimationFrame(loop);
    }
    loop();
  }
});