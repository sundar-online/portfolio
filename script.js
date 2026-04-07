/* ── FETCH PROJECTS ── */
async function fetchProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  // Detect if running from local file system (CORS restriction)
  if (window.location.protocol === 'file:') {
    console.warn('⚠️ Fetching JSON from local file system (file://) is usually blocked by browsers due to CORS policies.');
    console.warn('To fix this, please run this project using a local server (e.g., VS Code Live Server or python -m http.server)');
  }

  try {
    // Attempt Vite-standard root path first
    let response = await fetch('/data/projects.json');
    
    // Fallback for standard servers (e.g. Live Server) where public is not root
    if (!response.ok && response.status === 404) {
      console.warn('Vite root path /data/ not found. Falling back to public/data/ path...');
      response = await fetch('public/data/projects.json');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const projects = await response.json();
    console.log('Successfully loaded projects:', projects.length);
    
    container.innerHTML = projects.map(p => {
      const imgPath = p.image;
      
      return `
        <div class="project-card">
          <div class="project-image">
            <img src="${imgPath}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='public/${p.image}'">
          </div>
          <div class="project-content">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.description}</p>
            
            ${p.metrics ? `
              <div class="project-metrics">
                ${Object.entries(p.metrics).map(([key, val]) => `
                  <div class="metric-item">
                    <div class="metric-label">${key}</div>
                    <div class="metric-value">${val}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <div class="project-tags">
              ${p.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>

            <div class="project-actions">
              <a href="${p.link}" class="btn-project btn-demo" target="_blank">
                Live Demo
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              <a href="${p.github_link || '#'}" class="btn-project btn-code" target="_blank">
                Code
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="${p.details_link || '#'}" class="btn-project btn-details">
                Details
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error fetching projects:', error);
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: rgba(255, 255, 255, 0.45);">
        <p style="font-size: 14px; margin-bottom: 16px;">Unable to load projects at this time.</p>
        <button onclick="location.reload()" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; padding: 8px 20px; border-radius: 999px; cursor: pointer; font-size: 12px; transition: 0.2s;">
          Retry Connection
        </button>
      </div>
    `;
  }
}

/* ── REUSABLE NAVBAR COMPONENT ── */
const NAVBAR_TEMPLATE = `
<div class="nav-wrap">
  <nav>
    <a href="index.html" class="nav-logo">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <span class="logo-text">SUNDAR</span>
    </a>

    <a class="nav-item" href="index.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M2 6L8 2l6 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" />
        <path d="M6 14V9h4v5" />
      </svg><span>home</span>
    </a>

    <a class="nav-item" href="work.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <rect x="2" y="3" width="5" height="5" rx="1" />
        <rect x="9" y="3" width="5" height="5" rx="1" />
        <rect x="2" y="10" width="5" height="5" rx="1" />
        <rect x="9" y="10" width="5" height="5" rx="1" />
      </svg><span>work</span>
    </a>

    <a class="nav-item" href="about.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <circle cx="8" cy="6" r="3" />
        <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
      </svg><span>about</span>
    </a>

    <a class="nav-item" href="contact.html">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <path d="M3 4h10a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path d="M3 6l5 3 5-3" />
      </svg><span>contact</span>
    </a>

    <div class="sep"></div>

    <button id="theme-toggle" class="nav-item" style="background: none; border: none; outline: none; padding: 10px 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 999px; margin-left: 4px;" title="Toggle Theme">
      <svg id="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; display: none">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <svg id="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>
  </nav>
</div>
`;

function initNavbar() {
  const target = document.getElementById('navbar-target');
  if (!target) return;
  target.innerHTML = NAVBAR_TEMPLATE;
  
  autoActivateNav();
  setupThemeToggle();
  initSmoothScroll();
  initScrollSpy();
}

function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const sunIcon = document.getElementById('theme-icon-light');
  const moonIcon = document.getElementById('theme-icon-dark');

  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isLight ? 'block' : 'none';
      moonIcon.style.display = isLight ? 'none' : 'block';
    }
  });
}

/* ── NAVIGATION LOGIC ── */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-item[href*="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const [page, hash] = href.split('#');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      // If it's an internal link on the current page
      if (!page || page === currentPage || (page === 'index.html' && currentPage === '')) {
        e.preventDefault();
        const targetSection = document.getElementById(hash);
        if (targetSection) {
          window.history.pushState(null, null, `#${hash}`);
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

function initScrollSpy() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page !== 'index.html' && page !== '') return;

  const sections = ['hero', 'work', 'projects'];
  const sectionElements = sections.map(id => document.getElementById(id)).filter(el => el);
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = 'hero';
    const scrollPos = window.scrollY + 150; // offset for nav height

    sectionElements.forEach(el => {
      if (scrollPos >= el.offsetTop) {
        current = el.id;
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (!href) return;

      // Handle Home highlight
      if (current === 'hero' && (href === 'index.html' || href === 'index.html#hero')) {
        item.classList.add('active');
      } 
      // Handle Work/Projects mapping to 'work' link
      else if ((current === 'work' || current === 'projects') && href.includes('#work')) {
        item.classList.add('active');
      }
    });
  });
}

function autoActivateNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || 'index.html';
  const hash = window.location.hash || '#hero';
  const navItems = document.querySelectorAll('.nav-item');
  
  // Clear all first to ensure mutual exclusivity
  navItems.forEach(item => item.classList.remove('active'));

  // 1. Exact page match (about.html, contact.html, work.html)
  if (page === 'about.html' || page === 'contact.html' || page === 'work.html') {
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === page) {
        item.classList.add('active');
      }
    });
    return; // Exit
  }

  // 2. If on home (index.html or root) -> use section hash
  if (page === 'index.html' || page === '') {
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (!href) return;

      const hrefHash = href.includes('#') ? '#' + href.split('#')[1] : '#hero';
      const normalizedHash = hash === '' ? '#hero' : hash;

      if ((href === 'index.html' || href === 'index.html#hero') && normalizedHash === '#hero') {
        item.classList.add('active');
      } else if (href.includes(normalizedHash) && normalizedHash !== '#hero') {
        item.classList.add('active');
      }
    });
  }
}

// Update on hash change for SPA feel
window.addEventListener('hashchange', () => {
  autoActivateNav();
});

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  fetchProjects();
});

/* ── CANVAS BACKGROUND ── */
const canvas = document.getElementById('bg');
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
  g4.addColorStop(0, `rgba(255,255,255,${0.02 + 0.01 * Math.sin(t * 0.0005)})`); g4.addColorStop(1, 'rgba(0,0,0,0)');
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

/* ── NAV ACTIVE ── */
function setActive(el) {
  document.querySelectorAll('.nav-item:not(#theme-toggle)').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('theme-toggle');
const iconLight = document.getElementById('theme-icon-light');
const iconDark = document.getElementById('theme-icon-dark');

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light-mode');
  iconLight.style.display = 'none';
  iconDark.style.display = 'block';
} else {
  iconLight.style.display = 'block';
  iconDark.style.display = 'none';
}

themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-mode');
  if (document.documentElement.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    iconLight.style.display = 'none';
    iconDark.style.display = 'block';
  } else {
    localStorage.setItem('theme', 'dark');
    iconLight.style.display = 'block';
    iconDark.style.display = 'none';
  }
});
