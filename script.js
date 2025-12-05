// Project data
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'assets/projects/ecommerce.jpg',
    type: 'personal',
    demo: 'https://example.com/ecommerce',
    code: 'https://github.com/yourusername/ecommerce'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify'],
    image: 'assets/projects/taskapp.jpg',
    type: 'personal',
    demo: 'https://example.com/taskapp',
    code: 'https://github.com/yourusername/taskapp'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website to showcase my projects and skills.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'AOS'],
    image: 'assets/projects/portfolio.jpg',
    type: 'personal',
    demo: 'https://example.com/portfolio',
    code: 'https://github.com/yourusername/portfolio'
  }
];

// Journey data
const journey = [
  {
    id: 1,
    title: 'Software Developer at ABC Tech',
    period: '2022 - Present',
    description: 'Developing and maintaining web applications using modern JavaScript frameworks.',
    icon: 'fa-briefcase'
  },
  {
    id: 2,
    title: 'Computer Science Degree',
    period: '2018 - 2022',
    description: 'Bachelor of Science in Computer Science from XYZ University.',
    icon: 'fa-graduation-cap'
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    period: '2021',
    description: 'Completed an intensive 12-week coding bootcamp focusing on full-stack development.',
    icon: 'fa-code'
  }
];

// Light/Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function setTheme(mode) {
    if (mode === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        if (themeToggle) themeToggle.checked = false;
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        if (themeToggle) themeToggle.checked = true;
    }
}

// Initial theme
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDark) {
    setTheme('dark');
} else {
    setTheme('light');
}

// Add event listener to theme toggle checkbox
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });
}
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

window.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  starfield();
  cobweb();
  
  // Initialize mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Toggle mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
  
  // Populate projects
  const projectContainer = document.querySelector('.project-container');
  const filterSelect = document.getElementById('filter');
  
  function renderProjects(filter = 'all') {
    if (!projectContainer) return;
    
    // Use projects from work.js if available, otherwise use the ones defined in this file
    const projectsData = window.projects || projects;
    
    const filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.type === filter);
    
    // Check if projects have the structure from work.js or from this file
    const isWorkJsFormat = filteredProjects.length > 0 && 'img' in filteredProjects[0];
    
    if (isWorkJsFormat) {
      // Format for work.js projects
      projectContainer.innerHTML = '';
      filteredProjects.forEach((item, index) => {
        const row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('data-aos', index % 2 === 0 ? 'fade-left' : 'fade-right');
        row.setAttribute('data-aos-duration', '1000');
        
        const colImg = document.createElement('div');
        colImg.classList.add('col-work');
        
        const imgLink = document.createElement('a');
        imgLink.href = item.liveLink || '#';
        imgLink.target = item.liveLink ? '_blank' : '_self';
        if (!item.liveLink) imgLink.classList.add('inactive-link');
        
        const projectImg = document.createElement('img');
        projectImg.src = item.img;
        projectImg.alt = 'project-img';
        projectImg.classList.add('project-img');
        
        imgLink.appendChild(projectImg);
        colImg.appendChild(imgLink);
        
        const colText = document.createElement('div');
        colText.classList.add('col-work');
        
        const projectTitle = document.createElement('h3');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = item.title;
        
        const techStack = document.createElement('p');
        techStack.classList.add('tech-stack-text');
        techStack.textContent = item.techStack;
        
        const projectTopList = document.createElement('ul');
        projectTopList.classList.add('project-top-list');
        
        const codeLi = document.createElement('li');
        const codeLink = document.createElement('a');
        codeLink.href = item.code || '#';
        codeLink.target = item.code ? '_blank' : '_self';
        codeLink.textContent = 'Code ';
        codeLink.classList.add('links');
        if (!item.code) codeLink.classList.add('inactive-link');
        
        const codeIcon = document.createElement('i');
        codeIcon.classList.add('fab', 'fa-github');
        codeLink.appendChild(codeIcon);
        codeLi.appendChild(codeLink);
        
        const liveLinkLi = document.createElement('li');
        const liveLinkA = document.createElement('a');
        liveLinkA.href = item.liveLink || '#';
        liveLinkA.target = item.liveLink ? '_blank' : '_self';
        liveLinkA.textContent = 'Visit Site ';
        liveLinkA.classList.add('links');
        if (!item.liveLink) liveLinkA.classList.add('inactive-link');
        
        const liveLinkIcon = document.createElement('i');
        liveLinkIcon.classList.add('fas', 'fa-external-link-alt');
        liveLinkA.appendChild(liveLinkIcon);
        liveLinkLi.appendChild(liveLinkA);
        
        projectTopList.appendChild(codeLi);
        projectTopList.appendChild(liveLinkLi);
        
        const projectText = document.createElement('p');
        projectText.classList.add('project-text');
        projectText.textContent = item.description;
        
        colText.appendChild(projectTitle);
        colText.appendChild(techStack);
        colText.appendChild(projectTopList);
        colText.appendChild(projectText);
        
        // Alternate layout
        if (index % 2 === 0) {
          row.appendChild(colImg);
          row.appendChild(colText);
        } else {
          row.appendChild(colText);
          row.appendChild(colImg);
        }
        
        projectContainer.appendChild(row);
      });
    } else {
      // Format for script.js projects
      projectContainer.innerHTML = filteredProjects.map(project => `
        <div class="project-card" data-aos="fade-up">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
          </div>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
              ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
              ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn">Live Demo</a>` : ''}
              <a href="${project.code}" target="_blank" class="btn btn-outline">View Code</a>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
  
  // Filter projects
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      renderProjects(e.target.value);
    });
  }
  
  // Populate journey
  const journeyList = document.querySelector('.my-journey');
  if (journeyList) {
    // Check if journey data exists in this file, otherwise use from about.js
    const journeyData = typeof education !== 'undefined' ? education : journey;
    
    journeyList.innerHTML = journeyData.map(item => `
      <li class="journey-item" data-aos="fade-up">
        <div class="journey-icon">
          <i class="fas ${item.icon || 'fa-briefcase'}"></i>
        </div>
        <div class="journey-content">
          <h3>${item.title}</h3>
          <span class="journey-period">${item.period || item.date}</span>
          <p>${item.description}</p>
          ${item.additionalText ? `<p>${item.additionalText}</p>` : ''}
        </div>
      </li>
    `).join('');
  }
  
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active nav link highlighting
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`.nav-item[href*="${sectionId}"]`)?.classList.add('active');
        document.querySelector(`.mobile-nav-link[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-item[href*="${sectionId}"]`)?.classList.remove('active');
        document.querySelector(`.mobile-nav-link[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });
  });
  
  // Initial render
  renderProjects();
});
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

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Close mobile menu when clicking nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const behavior = prefersReducedMotion ? 'auto' : 'smooth';
            const headerOffset = 80; // Adjust based on your header height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: behavior
            });
            
            // Close mobile menu if it's open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
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

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    element.innerHTML = ''; // Clear the element first
    type();
}

// Initialize typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroHeading = document.querySelector('.hero-text h1');
    if (heroHeading) {
        const originalText = heroHeading.innerHTML;
        typeWriter(heroHeading, originalText, 100);
    }
});

// Original typing animation for rotating text
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
    
    // Validate form data
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    
    // Reset form
    event.target.reset();
}

// Setup contact form event listener
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
});

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
