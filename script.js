// ================= DOM ELEMENTS =================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const progressBars = document.querySelectorAll('.progress');

// ================= INITIALIZE =================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollTop();
    initSectionAnimations();
    initProgressBars();
    initActiveNav();
    initNavbarScroll();
    initSmoothScroll();
});

// ================= THEME =================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ================= NAVIGATION =================
function initNavigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ================= SCROLL TOP =================
function initScrollTop() {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================= SECTIONS =================
function initSectionAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

function initProgressBars() {
    progressBars.forEach(bar => bar.style.width = '0%');
}

function animateProgressBars() {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ================= ACTIVE NAV =================
function initActiveNav() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(entry.target.id);
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}

function updateActiveNavLink(id) {
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === id);
    });
}

// ================= SMOOTH SCROLL =================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================= CONTACT FORM =================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formStatus = document.getElementById('formStatus');

            try {
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    message: document.getElementById('message').value.trim()
                };

                const response = await fetch('https://afiya-portfolio.onrender.com/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    formStatus.innerHTML = "✅ Message sent successfully!";
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = "❌ " + result.message;
                }

            } catch (error) {
                formStatus.innerHTML = "❌ Backend connection error";
            }
        });
    }
});
