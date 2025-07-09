// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animate hero section on load
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero h1');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = 'translateY(-40px)';
    setTimeout(() => {
      hero.style.transition = 'all 0.8s cubic-bezier(.77,0,.18,1)';
      hero.style.opacity = 1;
      hero.style.transform = 'translateY(0)';
    }, 200);
  }
  // Apply saved mode or default to dark
  const savedMode = localStorage.getItem('color-mode');
  if (savedMode === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
});

// Section reveal on scroll
const revealSections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealSections.forEach(section => {
  section.classList.add('hidden-section');
  observer.observe(section);
});

// Simple contact form handler
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message!');
    form.reset();
  });
}

// Dark/Light mode toggle
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('color-mode', isLight ? 'light' : 'dark');
  });
}

// Analog clock
function drawAnalogClock() {
  const clock = document.querySelector('#analog-clock canvas');
  if (!clock) return;
  const ctx = clock.getContext('2d');
  const w = clock.width, h = clock.height;
  const r = w / 2;
  ctx.clearRect(0, 0, w, h);

  // Colors
  const isLight = document.body.classList.contains('light-mode');
  const faceColor = isLight ? '#fff' : '#232526';
  const borderColor = isLight ? '#00e676' : '#4f8cff';
  const hourColor = isLight ? '#1a237e' : '#fff';
  const minColor = isLight ? '#00e676' : '#4f8cff';
  const secColor = '#fbbf24';

  // Draw face
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, r - 2, 0, 2 * Math.PI);
  ctx.fillStyle = faceColor;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  ctx.restore();

  // Draw hour marks
  ctx.save();
  ctx.translate(r, r);
  for (let i = 0; i < 12; i++) {
    ctx.rotate(Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(0, -r + 7);
    ctx.lineTo(0, -r + 14);
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }
  ctx.restore();

  // Get time
  const now = new Date();
  let hr = now.getHours() % 12;
  let min = now.getMinutes();
  let sec = now.getSeconds();

  // Draw hour hand
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.lineTo(0, -r + 22);
  ctx.lineWidth = 4.2;
  ctx.strokeStyle = hourColor;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();

  // Draw minute hand
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r + 14);
  ctx.lineWidth = 3;
  ctx.strokeStyle = minColor;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();

  // Draw second hand
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((Math.PI / 30) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 14);
  ctx.lineTo(0, -r + 10);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = secColor;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();

  // Draw center dot
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, 3.2, 0, 2 * Math.PI);
  ctx.fillStyle = borderColor;
  ctx.fill();
  ctx.restore();
}
setInterval(drawAnalogClock, 1000);
drawAnalogClock();
// Redraw on mode toggle
const modeToggleBtn = document.getElementById('mode-toggle');
if (modeToggleBtn) {
  modeToggleBtn.addEventListener('click', () => {
    setTimeout(drawAnalogClock, 300);
  });
}

// Digital clock popup on analog clock click
const analogClock = document.getElementById('analog-clock');
if (analogClock) {
  analogClock.style.cursor = 'pointer';
  analogClock.addEventListener('click', () => {
    let msg = document.getElementById('digital-clock-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'digital-clock-message';
      document.body.insertBefore(msg, document.body.children[1]); // below navbar
    }
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    let hour = now.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    const timeStr = `${pad(hour)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;
    msg.textContent = `Current time: ${timeStr}`;
    msg.className = 'digital-clock-message';
    msg.style.display = 'block';
    clearTimeout(msg._timeout);
    msg._timeout = setTimeout(() => { msg.style.display = 'none'; }, 3000);
  });
}

// Analog clock tooltip on hover
const analogClockTooltip = document.getElementById('analog-clock-tooltip');
let tooltipInterval = null;
function drawBigAnalogClock() {
  const clock = analogClockTooltip.querySelector('canvas');
  if (!clock) return;
  const ctx = clock.getContext('2d');
  const w = clock.width, h = clock.height;
  const r = w / 2;
  ctx.clearRect(0, 0, w, h);
  // Colors
  const isLight = document.body.classList.contains('light-mode');
  const faceColor = isLight ? '#fff' : '#232526';
  const borderColor = isLight ? '#00e676' : '#4f8cff';
  const hourColor = isLight ? '#1a237e' : '#fff';
  const minColor = isLight ? '#00e676' : '#4f8cff';
  const secColor = '#fbbf24';
  // Draw face
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, r - 4, 0, 2 * Math.PI);
  ctx.fillStyle = faceColor;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  ctx.restore();
  // Draw hour marks
  ctx.save();
  ctx.translate(r, r);
  for (let i = 0; i < 12; i++) {
    ctx.rotate(Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(0, -r + 16);
    ctx.lineTo(0, -r + 28);
    ctx.lineWidth = 3.2;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }
  ctx.restore();
  // Get time
  const now = new Date();
  let hr = now.getHours() % 12;
  let min = now.getMinutes();
  let sec = now.getSeconds();
  // Draw hour hand
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min);
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(0, -r + 38);
  ctx.lineWidth = 7;
  ctx.strokeStyle = hourColor;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
  // Draw minute hand
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.lineTo(0, -r + 28);
  ctx.lineWidth = 5;
  ctx.strokeStyle = minColor;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
  // Draw second hand
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((Math.PI / 30) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 24);
  ctx.lineTo(0, -r + 20);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = secColor;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
  // Draw center dot
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, 6, 0, 2 * Math.PI);
  ctx.fillStyle = borderColor;
  ctx.fill();
  ctx.restore();
}
if (analogClock && analogClockTooltip) {
  analogClock.addEventListener('mouseenter', () => {
    analogClockTooltip.style.display = 'block';
    drawBigAnalogClock();
    tooltipInterval = setInterval(drawBigAnalogClock, 1000);
  });
  analogClock.addEventListener('mouseleave', () => {
    analogClockTooltip.style.display = 'none';
    clearInterval(tooltipInterval);
  });
  // Also hide tooltip if mouse leaves tooltip itself
  analogClockTooltip.addEventListener('mouseleave', () => {
    analogClockTooltip.style.display = 'none';
    clearInterval(tooltipInterval);
  });
}
// Redraw big clock on mode toggle
if (modeToggleBtn && analogClockTooltip) {
  modeToggleBtn.addEventListener('click', () => {
    setTimeout(() => { if (analogClockTooltip.style.display === 'block') drawBigAnalogClock(); }, 300);
  });
} 