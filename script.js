/* ── CONFIG ── */
const neuralConfig = {
  background: "#08090B",
  nodeColor: "#FFFFFF",
  lineColor: "#7DD3FC",
  glowColor: "#60A5FA",
  nodeCount: 70,
  connectionDistance: 150,
  lineOpacity: 0.15,
  animationSpeed: 0.15
};

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sundar.matrix?stkn=MTJzMjQyZjgzZjB0ZA==",
  facebook: "https://www.facebook.com/share/1GFmyZ4AmK/",
  x: "https://x.com/sundar_datasci",
  linkedin: "https://www.linkedin.com/in/sundaramoorthys23?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/Sundaramoorthy-G",
  leetcode: "https://leetcode.com/u/Sundar1207/",
};

const TYPING_TEXTS = ["Data Scientist", "Full Stack Developer", "AI Builder"];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const ENABLE_CANVAS_ANIMATION =
  !!document.body.dataset.hasAnimatedBg &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── THEME MANAGEMENT ── */
function getActiveTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeToggle(theme);
}

function toggleTheme() {
  const current = getActiveTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}

function updateThemeToggle(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  const isLight = theme === "light";
  toggleBtn.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );
  toggleBtn.setAttribute(
    "title",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  setTheme(initial);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
}

/* ── REUSABLE NAVBAR COMPONENT ── */
const NAVBAR_TEMPLATE = `
<div class="nav-wrap">
  <nav>
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

    <div class="nav-divider"></div>

    <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
      <svg class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
      <svg class="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </button>
  </nav>
</div>
`;

function initNavbar() {
  const target = document.getElementById("navbar-target");
  if (!target) return;
  target.innerHTML = NAVBAR_TEMPLATE;
  autoActivateNav();
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
    updateThemeToggle(getActiveTheme());
  }
}

function initFooter() {
  const target = document.getElementById("footer-target");
  if (target) target.remove();
}


function syncSocialLinks() {
  const map = {
    "social-instagram": SOCIAL_LINKS.instagram,
    "social-facebook": SOCIAL_LINKS.facebook,
    "social-x": SOCIAL_LINKS.x,
    "social-linkedin": SOCIAL_LINKS.linkedin,
    "social-github": SOCIAL_LINKS.github,
    "social-leetcode": SOCIAL_LINKS.leetcode,
  };
  for (const [id, url] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el && url) el.href = url;
  }
}

function autoActivateNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => item.classList.remove("active"));

  navItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href === page) {
      item.classList.add("active");
    }
  });
}

/* ── TYPING EFFECT ── */
function typeEffect() {
  const target = document.getElementById("typewriter");
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
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.id === "stats") {
          startCounters();
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
      if (el.id === "stats") startCounters();
    } else {
      observer.observe(el);
    }
  });
}

function startCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
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
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`New Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:sundar@example.com?subject=${subject}&body=${body}`;
  });
}

/* ── FETCH PROJECTS (DYNAMIC) ── */
let allProjects = [];

async function fetchProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const paths = ["data/projects.json", "public/data/projects.json"];
  let response;
  let usedPath = "";

  for (const path of paths) {
    try {
      const res = await fetch(path);
      if (res.ok) {
        response = res;
        usedPath = path;
        break;
      }
    } catch (e) {
      // Continue to next path
    }
  }

  try {
    if (!response || !response.ok) throw new Error("Could not find projects.json");

    allProjects = await response.json();
    
    // If we had to use the 'public/' prefix, we should also use it for images
    const pathPrefix = usedPath.startsWith("public/") ? "public/" : "";
    if (pathPrefix) {
      allProjects = allProjects.map(p => ({
        ...p,
        image: p.image && !p.image.startsWith("http") && !p.image.startsWith("public/") 
          ? pathPrefix + p.image 
          : p.image
      }));
    }

    renderProjects(allProjects);
    initFilters();
  } catch (error) {
    console.error("Error fetching projects:", error);
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1;">Could not load dynamic projects.</p>`;
  }
}

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1; padding: 40px;">No projects found in this category.</p>`;
    return;
  }

  const categoryMap = {
    ML: "Machine Learning",
    DL: "Deep Learning",
    Web: "Web Development",
    "Full Stack": "Full Stack",
    "Web Design": "Web Design",
  };

  const objectPositionMap = {
    "Electricity Consumption Predictor": "center 75%",
    "GoalForge – Discipline Builder": "center 35%",
    "SpendSmart – Expense Tracker": "center 25%",
    "Face Recognition Attendance System": "center center",
    "XO Game – Tic Tac Toe": "center center",
    "Video Frame Extractor Web App": "center top",
    "Web Templates": "center top",
  };

  container.innerHTML = projects
    .map((p, index) => {
      let imgSrc = p.image || "";
      if (imgSrc && !imgSrc.startsWith("http")) {
        imgSrc = imgSrc.replace(/^\/+/, "");
      }

      const displayCategory =
        categoryMap[p.category] ||
        p.category ||
        (p.tags && p.tags[0]) ||
        "Project";

      const projectUrl =
        p.link && p.link !== "#" ? p.link : p.github_link || "#";

      const objPos =
        p.object_position || objectPositionMap[p.title] || "center top";

      return `
      <div class="project-card project-card-tilt fade-up" data-url="${projectUrl}" style="transition-delay: ${
        index * 60
      }ms" role="region" aria-label="${p.title}">
        <img class="project-card-img" src="${imgSrc}" alt="${
        p.title
      }" style="object-position: ${objPos};" loading="lazy" decoding="async" onerror="this.style.display='none'">
        
        <div class="project-card-gradient"></div>

        <div class="project-card-top-left">
          <h3 class="project-card-title">${p.title}</h3>
          <span class="project-card-category">${displayCategory}</span>
        </div>

        <a href="${projectUrl}" target="_blank" rel="noopener noreferrer" class="project-card-arrow-btn" aria-label="Open ${
        p.title
      } project" title="Open Project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="project-card-arrow-icon">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        <div class="project-card-bottom">
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer" class="project-card-action-btn">
            <span>View Project</span>
            <span class="project-card-btn-arrow">→</span>
          </a>
        </div>
      </div>
    `;
    })
    .join("");

  // Allow clicking on card background to navigate, while letting buttons work natively
  container.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const url = card.getAttribute("data-url");
      if (url && url !== "#") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  });

  // Re-init Tilt Effect
  initTilt();

  // Create a fresh IntersectionObserver for newly rendered cards
  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );

  container
    .querySelectorAll(".fade-up:not(.visible)")
    .forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      } else {
        obs.observe(el);
      }
    });
}


function initFilters() {
  const filterContainer = document.getElementById("filter-container");
  if (!filterContainer) return;

  const categories = [
    "All",
    ...new Set(allProjects.map((p) => p.category).filter(Boolean)),
  ];

  filterContainer.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn ${
      cat === "All" ? "active" : ""
    }" data-category="${cat}">${cat}</button>
  `
    )
    .join("");

  const buttons = filterContainer.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      const filtered =
        category === "All"
          ? allProjects
          : allProjects.filter((p) => p.category === category);

      renderProjects(filtered);
    });
  });
}

/* ── DOM READY ── */
function onDOMReady() {
  initTheme();
  initNavbar();
  initFooter();
  syncSocialLinks();
  typeEffect();
  initScrollAnimations();
  initContactForm();
  if (document.getElementById("projects-container")) {
    fetchProjects();
  }

  // Initialize Lucide Icons for static elements
  if (window.lucide) {
    lucide.createIcons();
  }

  // BUG 4 FIX: Canvas init moved inside DOMContentLoaded so the <canvas id="bg">
  // element is guaranteed to exist before we query it.
  // ── DYNAMIC NEURAL-NETWORK CANVAS BACKGROUND ──
  if (ENABLE_CANVAS_ANIMATION) {
    const canvas = document.getElementById("bg");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      function parseHex(colorStr, fallback = { r: 255, g: 255, b: 255 }) {
        if (!colorStr) return fallback;
        const str = colorStr.toString().trim();
        if (str.startsWith("#")) {
          let hex = str.slice(1);
          if (hex.length === 3) {
            hex = hex.split("").map((c) => c + c).join("");
          }
          const num = parseInt(hex, 16);
          if (!isNaN(num) && hex.length === 6) {
            return {
              r: (num >> 16) & 255,
              g: (num >> 8) & 255,
              b: num & 255,
            };
          }
        }
        return fallback;
      }

      let nodes = [];

      function getEffectiveNodeCount() {
        const count = neuralConfig.nodeCount || 70;
        return window.innerWidth < 768
          ? Math.max(28, Math.round(count * 0.55))
          : count;
      }

      function createNode(w, h) {
        const speed = neuralConfig.animationSpeed || 0.15;
        const angle = Math.random() * Math.PI * 2;
        const velocity = speed * (0.7 + Math.random() * 0.6);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          radius: 1.2 + Math.random() * 1.1,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        };
      }

      function initNodes() {
        const targetCount = getEffectiveNodeCount();
        nodes = [];
        for (let i = 0; i < targetCount; i++) {
          nodes.push(createNode(canvas.width, canvas.height));
        }
      }

      function resize() {
        const prevW = canvas.width || window.innerWidth;
        const prevH = canvas.height || window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (nodes.length === 0) {
          initNodes();
        } else {
          const scaleX = canvas.width / (prevW || 1);
          const scaleY = canvas.height / (prevH || 1);
          nodes.forEach((n) => {
            n.x = Math.max(0, Math.min(canvas.width, n.x * scaleX));
            n.y = Math.max(0, Math.min(canvas.height, n.y * scaleY));
          });
          const targetCount = getEffectiveNodeCount();
          while (nodes.length < targetCount) {
            nodes.push(createNode(canvas.width, canvas.height));
          }
          if (nodes.length > targetCount) {
            nodes = nodes.slice(0, targetCount);
          }
        }
      }

      resize();
      window.addEventListener("resize", resize);

      let t = 0;
      let animId = null;

      function render() {
        t++;
        const isLight =
          document.documentElement.getAttribute("data-theme") === "light";

        // Dynamic theme-aware palette honoring neuralConfig
        const currentBg = isLight ? "#F6F8FB" : neuralConfig.background || "#08090B";
        const nodeColorHex = isLight ? "#0F172A" : neuralConfig.nodeColor || "#FFFFFF";
        const lineColorHex = isLight ? "#0284C7" : neuralConfig.lineColor || "#7DD3FC";
        const glowColorHex = isLight ? "#38BDF8" : neuralConfig.glowColor || "#60A5FA";

        const nodeRgb = parseHex(nodeColorHex, { r: 255, g: 255, b: 255 });
        const lineRgb = parseHex(lineColorHex, { r: 125, g: 211, b: 252 });
        const glowRgb = parseHex(glowColorHex, { r: 96, g: 165, b: 250 });

        // Clean background fill - no extra particles, galaxies, or heavy gradients
        ctx.fillStyle = currentBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const w = canvas.width;
        const h = canvas.height;
        const maxDist = neuralConfig.connectionDistance || 150;
        const maxDistSq = maxDist * maxDist;
        const baseOpacity =
          neuralConfig.lineOpacity !== undefined ? neuralConfig.lineOpacity : 0.15;

        // 1. UPDATE NODES (autonomous fixed slow velocity, bounce smoothly on edges)
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];

          n.x += n.vx;
          n.y += n.vy;

          // Smooth boundary bounce
          if (n.x <= 0) {
            n.x = 0;
            n.vx = Math.abs(n.vx);
          } else if (n.x >= w) {
            n.x = w;
            n.vx = -Math.abs(n.vx);
          }

          if (n.y <= 0) {
            n.y = 0;
            n.vy = Math.abs(n.vy);
          } else if (n.y >= h) {
            n.y = h;
            n.vy = -Math.abs(n.vy);
          }
        }

        // 2. DRAW CONNECTING LINES (autonomous, based purely on distance between nodes)
        ctx.lineWidth = 0.8;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;

            if (Math.abs(dx) > maxDist || Math.abs(dy) > maxDist) continue;

            const distSq = dx * dx + dy * dy;
            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq);
              const ratio = 1 - dist / maxDist;
              const alpha = baseOpacity * ratio;

              ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        // 3. DRAW GLOWING NODES (small glowing dots)
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const pulse =
            0.85 + 0.15 * Math.sin(t * n.pulseSpeed + n.pulseOffset);

          const glowAlpha = (0.22 * pulse).toFixed(3);
          const coreAlpha = (0.92 * pulse).toFixed(3);

          // Subtle outer halo glow
          ctx.fillStyle = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glowAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();

          // Crisp core node dot
          ctx.fillStyle = `rgba(${nodeRgb.r}, ${nodeRgb.g}, ${nodeRgb.b}, ${coreAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        animId = requestAnimationFrame(render);
      }

      animId = requestAnimationFrame(render);

      // Visibility change: pause rendering when tab is inactive to preserve CPU & battery
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (animId) cancelAnimationFrame(animId);
        } else {
          animId = requestAnimationFrame(render);
        }
      });
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onDOMReady);
} else {
  onDOMReady();
}


/* ── TILT EFFECT ── */
function initTilt() {
  const cards = document.querySelectorAll(".project-card-tilt");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
      const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees

      card.style.setProperty("--rotateX", `${rotateX}deg`);
      card.style.setProperty("--rotateY", `${rotateY}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rotateX", `0deg`);
      card.style.setProperty("--rotateY", `0deg`);
    });
  });
}
