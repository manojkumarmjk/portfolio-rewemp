document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════ NAVBAR SCROLL & ACTIVE SECTION ═══════════════════ */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = ['home', 'services', 'about', 'projects', 'blogs', 'testimonials'];

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = 'home';
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        currentSection = sections[i];
        break;
      }
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
    mobileLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ═══════════════════ SMOOTH SCROLL ═══════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const id = anchor.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      const mobileMenu = document.getElementById('mobileMenu');
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });

  /* ═══════════════════ MOBILE MENU ═══════════════════ */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconMenu = mobileToggle.querySelector('.icon-menu');
  const iconClose = mobileToggle.querySelector('.icon-close');

  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);

  /* ═══════════════════ FAQ ACCORDION ═══════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(fi => fi.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  /* ═══════════════════ TESTIMONIALS CAROUSEL ═══════════════════ */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const totalTestimonials = testimonialCards.length;
  let currentTestimonial = 0;

  function updateCarousel() {
    const prevIdx = currentTestimonial === 0 ? totalTestimonials - 1 : currentTestimonial - 1;
    const nextIdx = currentTestimonial === totalTestimonials - 1 ? 0 : currentTestimonial + 1;

    testimonialCards.forEach((card, i) => {
      card.classList.remove('center', 'side');
      card.style.display = 'none';
      card.style.order = '';
    });

    testimonialCards[prevIdx].classList.add('side');
    testimonialCards[prevIdx].style.display = '';
    testimonialCards[prevIdx].style.order = '1';

    testimonialCards[currentTestimonial].classList.add('center');
    testimonialCards[currentTestimonial].style.display = '';
    testimonialCards[currentTestimonial].style.order = '2';

    testimonialCards[nextIdx].classList.add('side');
    testimonialCards[nextIdx].style.display = '';
    testimonialCards[nextIdx].style.order = '3';
  }

  document.getElementById('testimonialPrev').addEventListener('click', () => {
    currentTestimonial = currentTestimonial === 0 ? totalTestimonials - 1 : currentTestimonial - 1;
    updateCarousel();
  });

  document.getElementById('testimonialNext').addEventListener('click', () => {
    currentTestimonial = currentTestimonial === totalTestimonials - 1 ? 0 : currentTestimonial + 1;
    updateCarousel();
  });

  updateCarousel();

  /* ═══════════════════ INTERSECTION OBSERVER ANIMATIONS ═══════════════════ */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(el => observer.observe(el));

  /* ═══════════════════ CONTACT FORM (prevent default) ═══════════════════ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

});
