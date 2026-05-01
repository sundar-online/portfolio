(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const j=["Data Scientist","Full Stack Developer","AI Builder"];let A=0,y=0,v=!1;const Y=!!document.body.dataset.hasAnimatedBg&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches,q=`
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
`,F=`
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
`;function G(){const r=document.getElementById("navbar-target");r&&(r.innerHTML=q,z())}function X(){const r=document.getElementById("footer-target");r&&(r.innerHTML=F)}function z(){const i=window.location.pathname.split("/").pop()||"index.html",s=document.querySelectorAll(".nav-item");s.forEach(e=>e.classList.remove("active")),s.forEach(e=>{e.getAttribute("href")===i&&e.classList.add("active")})}function T(){const r=document.getElementById("typewriter");if(!r)return;const i=j[A];v?(r.textContent=i.substring(0,y-1),y--):(r.textContent=i.substring(0,y+1),y++),r.style.animation="blink 0.7s step-end infinite";let s=v?50:100;!v&&y===i.length?(s=2e3,v=!0):v&&y===0&&(v=!1,A=(A+1)%j.length,s=500),setTimeout(T,s)}function D(){const r={root:null,rootMargin:"0px",threshold:.1},i=new IntersectionObserver((s,e)=>{s.forEach(n=>{n.isIntersecting&&(n.target.classList.add("visible"),n.target.id==="stats"&&W(),e.unobserve(n.target))})},r);document.querySelectorAll(".fade-up:not(.visible)").forEach(s=>{i.observe(s)})}function W(){const r=document.querySelectorAll(".counter"),i=200;r.forEach(s=>{const e=()=>{const n=+s.getAttribute("data-target"),a=+s.innerText,d=n/i;a<n?(s.innerText=Math.ceil(a+d),setTimeout(e,10)):s.innerText=n};e()})}function V(){const r=document.getElementById("contactForm");r&&r.addEventListener("submit",i=>{i.preventDefault();const s=document.getElementById("name").value,e=document.getElementById("email").value,n=document.getElementById("message").value;if(!s||!e||!n)return;const a=encodeURIComponent(`New Portfolio Inquiry from ${s}`),d=encodeURIComponent(`Name: ${s}
Email: ${e}

Message:
${n}`);window.location.href=`mailto:sundar@example.com?subject=${a}&body=${d}`})}let w=[];async function U(){const r=document.getElementById("projects-container");if(r)try{const i=await fetch("data/projects.json");if(!i.ok)throw new Error("HTTP error "+i.status);w=await i.json(),O(w),K()}catch(i){console.error("Error fetching projects:",i),r.innerHTML='<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1;">Could not load dynamic projects.</p>'}}function O(r){const i=document.getElementById("projects-container");if(!i)return;if(r.length===0){i.innerHTML='<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1; padding: 40px;">No projects found in this category.</p>';return}i.innerHTML=r.map((e,n)=>{let a=e.image||"";return a&&!a.startsWith("http")&&(a=a.replace(/^\/+/,"")),`
      <div class="glass-card fade-up project-card-tilt" style="transition-delay: ${n*100}ms">
        <div class="project-img-container">
          <img class="project-img" src="${a}" alt="${e.title}" loading="lazy" decoding="async"
               onerror="this.style.display='none'">
        </div>

        <div class="project-info">
          <div class="project-category-tag">${e.category||"Project"}</div>
          <h3>${e.title}</h3>

          <div class="badges">
            ${(e.tags||[]).map(d=>`<span class="badge">${d}</span>`).join("")}
          </div>

          <p>${e.description}</p>

          <div class="card-actions">
            <a href="${e.link||"#"}" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 13px;">
              <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>
              <span>Live Demo</span>
            </a>
            <a href="${e.github_link||"#"}" target="_blank" class="btn btn-secondary" style="padding: 10px 20px; font-size: 13px;">
              <i data-lucide="github" style="width: 16px; height: 16px;"></i>
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    `}).join(""),window.lucide&&lucide.createIcons(),J();const s=new IntersectionObserver((e,n)=>{e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),n.unobserve(a.target))})},{root:null,rootMargin:"0px",threshold:.1});i.querySelectorAll(".fade-up:not(.visible)").forEach(e=>s.observe(e))}function K(){const r=document.getElementById("filter-container");if(!r)return;const i=["All",...new Set(w.map(e=>e.category).filter(Boolean))];r.innerHTML=i.map(e=>`
    <button class="filter-btn ${e==="All"?"active":""}" data-category="${e}">${e}</button>
  `).join("");const s=r.querySelectorAll(".filter-btn");s.forEach(e=>{e.addEventListener("click",()=>{s.forEach(d=>d.classList.remove("active")),e.classList.add("active");const n=e.getAttribute("data-category"),a=n==="All"?w:w.filter(d=>d.category===n);O(a)})})}document.addEventListener("DOMContentLoaded",()=>{if(G(),X(),T(),D(),V(),document.getElementById("projects-container")&&U(),window.lucide&&lucide.createIcons(),Y){const d=document.getElementById("bg");if(d){let b=function(){d.width=window.innerWidth,d.height=window.innerHeight},l=function(h,t){return Math.random()*(t-h)+h},L=function(h){N.forEach(t=>{t.age++;const c=Math.max(t.minScale,1-t.shrinkRate*t.age);t.r=t.baseR*c,c<=t.minScale&&(t.age=0);const f=.5+.5*Math.sin(h*t.twinkleSpeed+t.twinkleOffset),u=t.op*(t.isBig?.55+.45*f:f);if(o.save(),o.globalAlpha=u,t.isBig){const p=o.createRadialGradient(t.x*g(),t.y*m(),0,t.x*g(),t.y*m(),t.r*5.5);p.addColorStop(0,"hsla(0,0%,90%,0.32)"),p.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=p,o.beginPath(),o.arc(t.x*g(),t.y*m(),t.r*5.5,0,Math.PI*2),o.fill()}o.fillStyle="hsla(0, 0%, 100%, 0.8)",o.beginPath(),o.arc(t.x*g(),t.y*m(),Math.max(.15,t.r),0,Math.PI*2),o.fill(),o.restore()})},$=function(h){const t=g(),c=m();o.fillStyle="#000000",o.fillRect(0,0,t,c);const f=Math.sin(h*3e-4)*.06,u=o.createRadialGradient(t*(.32+f),c*.5,0,t*(.32+f),c*.5,t*.65);u.addColorStop(0,"rgba(255,255,255,0.03)"),u.addColorStop(.5,"rgba(255,255,255,0.01)"),u.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=u,o.fillRect(0,0,t,c);const p=o.createRadialGradient(t*(.78-f),c*.4,0,t*(.78-f),c*.4,t*.48);p.addColorStop(0,"rgba(255,255,255,0.02)"),p.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=p,o.fillRect(0,0,t,c);const x=.08+.06*Math.sin(h*8e-4),I=o.createRadialGradient(t*.44,c*.44,0,t*.44,c*.44,t*(.22+x));I.addColorStop(0,"rgba(255,255,255,0.04)"),I.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=I,o.fillRect(0,0,t,c);const k=o.createRadialGradient(t*.62,c*.6,0,t*.62,c*.6,t*.35);k.addColorStop(0,`rgba(255,255,255,${.02+.01*Math.sin(h*5e-4)})`),k.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=k,o.fillRect(0,0,t,c)},R=function(){M+=(P-M)*.04,E+=(B-E)*.04;const h=g(),t=m(),c=M*h,f=E*t,u=o.createRadialGradient(c,f,0,c,f,h*.3);u.addColorStop(0,"rgba(255,255,255,0.03)"),u.addColorStop(.5,"rgba(255,255,255,0.01)"),u.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=u,o.fillRect(0,0,h,t)},C=function(){S++,$(S),H.forEach(h=>{h.update(S),h.draw()}),L(S),R(),requestAnimationFrame(C)};var r=b,i=l,s=L,e=$,n=R,a=C;const o=d.getContext("2d");b(),window.addEventListener("resize",b);const g=()=>d.width,m=()=>d.height;class _{constructor(){this.init(),this.age=l(0,3e3)}init(){this.x=l(-.1,1.1),this.y=l(-.1,1.1),this.rx=l(.1,.28),this.ry=l(.06,.16),this.baseOpacity=l(.06,.18),this.vx=l(-4e-5,4e-5),this.vy=l(-2e-5,2e-5),this.rotation=l(0,Math.PI*2),this.rotSpeed=l(-15e-5,15e-5),this.hue=0,this.lightness=l(20,40),this.pulseSpeed=l(.0015,.005),this.pulseOffset=l(0,Math.PI*2),this.fadeSpeed=l(8e-4,.002),this.fadeOffset=l(0,Math.PI*2),this.morphSpeed=l(6e-4,.0018),this.morphOffset=l(0,Math.PI*2)}update(t){this.age++,this.x+=this.vx,this.y+=this.vy,this.rotation+=this.rotSpeed;const c=.85+.15*Math.sin(t*this.morphSpeed+this.morphOffset);this._curRx=this.rx*c,this._curRy=this.ry*(1/c);const f=.5+.5*Math.sin(t*this.fadeSpeed+this.fadeOffset),u=.7+.3*Math.sin(t*this.pulseSpeed+this.pulseOffset);this._opacity=this.baseOpacity*f*u,(this.x<-.35||this.x>1.35||this.y<-.35||this.y>1.35)&&this.init()}draw(){const t=this.x*g(),c=this.y*m(),f=this._curRx*g(),u=this._curRy*m();o.save(),o.translate(t,c),o.rotate(this.rotation);const p=o.createRadialGradient(0,0,0,0,0,f),x=this._opacity;p.addColorStop(0,`hsla(0,0%,${this.lightness}%,${x})`),p.addColorStop(.35,`hsla(0,0%,${this.lightness-4}%,${x*.65})`),p.addColorStop(.7,`hsla(0,0%,${this.lightness-8}%,${x*.25})`),p.addColorStop(1,`hsla(0,0%,${this.lightness-12}%,0)`),o.scale(1,u/f),o.beginPath(),o.arc(0,0,f,0,Math.PI*2),o.fillStyle=p,o.fill(),o.restore()}}const H=Array.from({length:28},()=>new _),N=Array.from({length:200},()=>{const h=Math.random();let t=h<.7?l(.25,.8):h<.9?l(.9,1.7):h<.97?l(1.8,3):l(3.2,4.8);const c=t>1.8;return{x:Math.random(),y:Math.random(),r:t,baseR:t,op:c?l(.55,.95):l(.15,.8),twinkleSpeed:l(.003,c?.01:.02),twinkleOffset:l(0,Math.PI*2),hue:0,isBig:c,shrinkRate:l(8e-5,18e-5),minScale:.02,age:l(0,600)}});let P=.5,B=.5,M=.5,E=.5;window.addEventListener("mousemove",h=>{P=h.clientX/window.innerWidth,B=h.clientY/window.innerHeight});let S=0;C()}}});function J(){document.querySelectorAll(".project-card-tilt").forEach(i=>{i.addEventListener("mousemove",s=>{const e=i.getBoundingClientRect(),n=s.clientX-e.left,a=s.clientY-e.top,d=e.width/2,o=e.height/2,b=(a-o)/o*-10,g=(n-d)/d*10;i.style.setProperty("--rotateX",`${b}deg`),i.style.setProperty("--rotateY",`${g}deg`)}),i.addEventListener("mouseleave",()=>{i.style.setProperty("--rotateX","0deg"),i.style.setProperty("--rotateY","0deg")})})}
