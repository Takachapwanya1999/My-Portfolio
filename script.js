// Light/Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function setTheme(mode) {
    if (mode === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
    // Force update of all Tailwind utility backgrounds/texts
    document.querySelectorAll('[class*="bg-"]').forEach(el => {
        el.className = el.className;
    });
    document.querySelectorAll('[class*="text-"]').forEach(el => {
        el.className = el.className;
    });
}

// Initial theme
if (savedTheme) {
    setTheme(savedTheme);
} else if (!prefersDark) {
    setTheme('light');
}

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});
// Utility: motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Starfield background animation
function starfield() {
    const canvas = document.getElementById('starfield-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const STAR_COUNT = Math.floor((width * height) / 1200);
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.2 + 0.3,
            o: Math.random() * 0.7 + 0.3,
            speed: Math.random() * 0.08 + 0.02
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < stars.length; i++) {
            ctx.beginPath();
            ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255,255,255,${stars[i].o})`;
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function animate() {
        for (let i = 0; i < stars.length; i++) {
            stars[i].y += stars[i].speed;
            if (stars[i].y > height) {
                stars[i].y = 0;
                stars[i].x = Math.random() * width;
            }
        }
        draw();
        if (!prefersReducedMotion) requestAnimationFrame(animate);
    }

    if (prefersReducedMotion) {
        draw(); // static frame
    } else {
        animate();
    }

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
}

window.addEventListener('DOMContentLoaded', starfield);

document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic year in footer if present
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
 
  // Optional: smooth scroll for "Back to top" if anchor default is used
  const backToTop = document.querySelector('a[href="#home"]');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      // If default anchor is fine elsewhere, keep smooth behavior only when same-page
      if (location.pathname === backToTop.pathname && location.hostname === backToTop.hostname) {
        e.preventDefault();
        const target = document.querySelector('#home');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Cobweb background animation
function cobweb() {
    const canvas = document.getElementById('cobweb-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const points = [];
    const POINTS = Math.floor((width * height) / 8000);
    for (let i = 0; i < POINTS; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        // Draw lines
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = 'rgba(100, 116, 139, ' + (1 - dist / 120) * 0.5 + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }
        // Draw points
        for (let i = 0; i < points.length; i++) {
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, 1.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#64748b'; // Tailwind slate-500
            ctx.fill();
        }
    }

    function animate() {
        for (let i = 0; i < points.length; i++) {
            points[i].x += points[i].vx;
            points[i].y += points[i].vy;
            if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
            if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;
        }
        draw();
        if (!prefersReducedMotion) requestAnimationFrame(animate);
    }

    if (prefersReducedMotion) {
        draw(); // static frame
    } else {
        animate();
    }

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
}

window.addEventListener('DOMContentLoaded', cobweb);
// Custom JavaScript for Takafakare Chapwanya Portfolio
// Extracted from index.html

// Smooth scrolling
function scrollToSection(sectionId) {
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';
    document.getElementById(sectionId).scrollIntoView({ behavior });
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('translate-x-full');
    // translate-x-full present means hidden; aria-expanded should be opposite
    const expanded = !isOpen;
    mobileMenuBtn.setAttribute('aria-expanded', String(expanded));
    if (expanded) {
        const firstLink = mobileMenu.querySelector('.mobile-nav-link');
        if (firstLink) firstLink.focus();
    }
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const behavior = prefersReducedMotion ? 'auto' : 'smooth';
            target.scrollIntoView({ behavior, block: 'start' });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    if (el.querySelector('.skill-bar')) {
        skillObserver.observe(el);
    }
});

// Typing animation
const typingText = document.getElementById('typing-text');
const names = ['Takafakare', 'a Developer', 'a Creator'];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentName = names[nameIndex];
    
    if (isDeleting) {
        typingText.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentName.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        typeSpeed = 500;
    }

    setTimeout(typeAnimation, typeSpeed);
}

// Start typing animation after page load
setTimeout(typeAnimation, 1000);

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;
    
    // Show success message
    alert(`Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
    
    // Reset form
    event.target.reset();
}

// Add active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-600');
        }
    });
});
