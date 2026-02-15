// ===== Loader =====
document.body.classList.add('loading');

(function initLoader() {
    const trail = document.getElementById('loaderTrail');
    const totalSteps = 8;
    const stepInterval = 280;

    // SVG лапки
    const pawSVG = `<svg viewBox="0 0 48 48" width="36" height="36">
        <ellipse cx="24" cy="32" rx="10" ry="12" fill="currentColor"/>
        <ellipse cx="12" cy="18" rx="5" ry="6.5" fill="currentColor" transform="rotate(-10 12 18)"/>
        <ellipse cx="22" cy="12" rx="4.5" ry="6" fill="currentColor" transform="rotate(5 22 12)"/>
        <ellipse cx="33" cy="14" rx="4.5" ry="6" fill="currentColor" transform="rotate(15 33 14)"/>
        <ellipse cx="40" cy="22" rx="4.5" ry="6" fill="currentColor" transform="rotate(30 40 22)"/>
    </svg>`;

    const centerX = window.innerWidth / 2;
    const startY = window.innerHeight + 20;
    const stepY = (window.innerHeight + 80) / totalSteps;
    const offsetX = 32;

    for (let i = 0; i < totalSteps; i++) {
        const paw = document.createElement('div');
        paw.className = 'loader-paw';
        paw.innerHTML = pawSVG;

        const isLeft = i % 2 === 0;
        const x = centerX + (isLeft ? -offsetX : offsetX) - 18;
        const y = startY - stepY * (i + 1);
        const rotation = isLeft ? -20 : 20;

        paw.style.left = x + 'px';
        paw.style.top = y + 'px';
        paw.style.transform = `rotate(${rotation}deg)`;
        paw.style.animationDelay = (i * stepInterval) + 'ms';

        trail.appendChild(paw);
    }

    const totalTime = totalSteps * stepInterval + 800;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');

            window.dispatchEvent(new Event('loaderDone'));
        }, totalTime);
    });
})();

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ===== Burger menu =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== Parallax on hero =====
const heroImage = document.querySelector('.hero-image-wrapper');
const heroContent = document.querySelector('.hero-content');

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrollY < heroHeight) {
            const speed = scrollY * 0.3;
            const speedSlow = scrollY * 0.12;

            heroImage.style.transform = `translateY(${speed}px)`;
            heroContent.style.transform = `translateY(${speedSlow}px)`;
        }
    });
}

// ===== Scroll reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Scroll spy =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const scrollSpy = () => {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', scrollSpy);
window.addEventListener('load', scrollSpy);

// ===== Scroll to top =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== FAQ accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(other => other.classList.remove('open'));

        if (!isOpen) {
            item.classList.add('open');
        }
    });
});


// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Typewriter =====
const typewriterEl = document.getElementById('typewriter');
const typewriterText = 'Моя цель: помочь вам и вашей собаке создать тёплые доверительные отношения.';
let typewriterStarted = false;

function typeWriter(el, text, speed = 45) {
    let i = 0;
    el.innerHTML = '<span class="typewriter-cursor"></span>';

    function type() {
        if (i < text.length) {
            el.innerHTML = text.slice(0, i + 1) + '<span class="typewriter-cursor"></span>';
            i++;
            setTimeout(type, speed);
        } else {
            // курсор исчезает через 2 сек после окончания
            setTimeout(() => {
                const cursor = el.querySelector('.typewriter-cursor');
                if (cursor) cursor.style.display = 'none';
            }, 2000);
        }
    }

    type();
}

// Запускаем после лоадера
window.addEventListener('loaderDone', () => {
    if (!typewriterStarted) {
        typewriterStarted = true;
        setTimeout(() => typeWriter(typewriterEl, typewriterText), 400);
    }
});

// ===== Animated counters =====
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.round(target * easedProgress);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statNumbers.forEach((num, i) => {
                setTimeout(() => animateCounter(num), i * 150);
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== Gallery drag scroll =====
const galleryTrack = document.getElementById('galleryTrack');

if (galleryTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = galleryTrack.parentElement;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = slider.scrollLeft;
        slider.style.overflow = 'auto';
        slider.style.scrollbarWidth = 'none';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    let touchStartX;
    let touchScrollLeft;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = slider.scrollLeft;
        slider.style.overflow = 'auto';
        slider.style.scrollbarWidth = 'none';
    });

    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - touchStartX) * 1.5;
        slider.scrollLeft = touchScrollLeft - walk;
    });

    // Hide scrollbar
    slider.style.msOverflowStyle = 'none';
    slider.style.scrollbarWidth = 'none';
    slider.style.WebkitOverflowScrolling = 'touch';
    slider.style.overflow = 'auto';
}