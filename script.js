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
      // Ensure image path is also resilient
      // If it starts with /data, we try both /data and public/data
      const imgPath = p.image.startsWith('/') ? p.image : `/data/${p.image}`;
      
      return `
        <div class="project-card">
          <div class="project-image">
            <img src="${imgPath}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='public${p.image}'">
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

// Initialize Fetch once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
  fetchBlogs();
});

/* ── FETCH BLOGS ── */
async function fetchBlogs() {
  const container = document.getElementById('blogs-container');
  if (!container) return;

  try {
    let response = await fetch('/data/blogs.json');
    if (!response.ok && response.status === 404) {
      response = await fetch('public/data/blogs.json');
    }
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const blogs = await response.json();
    
    container.innerHTML = blogs.map(blog => {
      // Truncate content for "Read More" preview
      const maxLength = 120;
      const displayContent = blog.content.length > maxLength 
        ? blog.content.substring(0, maxLength) + '...' 
        : blog.content;

      return `
        <a href="blog.html" class="d-post-card">
          <div class="d-post-vis" style="background: ${getBlogGradient(blog.visualType)};">
            ${getBlogIcon(blog.visualType)}
          </div>
          <div class="d-post-content">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
              <h3 style="margin: 0;">${blog.title}</h3>
              <span style="font-size: 10px; color: rgba(255,255,255,0.3); white-space: nowrap; margin-left: 10px;">${blog.date}</span>
            </div>
            <p>${displayContent}</p>
            <div class="d-post-tags">
              ${blog.tags.map(tag => `<span class="d-post-tag">${tag}</span>`).join('')}
              <span class="d-post-tag" style="background: rgba(255,255,255,0.05); color: #ffffff; border: none; padding-left: 0;">Read More →</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  } catch (error) {
    console.error('Error fetching blogs:', error);
    container.innerHTML = `<p style="padding: 20px; color: rgba(255,255,255,0.3); font-size: 13px;">Error loading posts: ${error.message}</p>`;
  }
}

function getBlogGradient(type) {
  const gradients = {
    code: 'linear-gradient(135deg,rgba(96,165,250,0.1),rgba(96,165,250,0.02))',
    dream: 'linear-gradient(135deg,rgba(167,139,250,0.1),rgba(167,139,250,0.02))',
    neural: 'linear-gradient(135deg,rgba(45,212,191,0.1),rgba(45,212,191,0.02))'
  };
  return gradients[type] || gradients.code;
}

function getBlogIcon(type) {
  const icons = {
    code: `<svg viewBox="0 0 64 64" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px; opacity:0.8;">
            <rect x="8" y="14" width="48" height="36" rx="4" />
            <path d="M22 26l-8 6 8 6M42 26l8 6-8 6M34 22l-4 20" />
          </svg>`,
    dream: `<svg viewBox="0 0 48 48" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:32px; opacity:0.8;">
            <circle cx="24" cy="24" r="16" />
            <path d="M24 14v10l6 6" />
          </svg>`,
    neural: `<svg class="big" viewBox="0 0 48 48" fill="none" stroke="#2dd4bf" stroke-width="1.4" stroke-linecap="round" style="width:32px; opacity:0.8;">
            <path d="M24 10v20M14 20l10 10 10-10" />
          </svg>`
  };
  return icons[type] || icons.code;
}

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
