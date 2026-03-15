document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════ HERO TYPING ANIMATION ═══════════════════ */
  const typingEl = document.getElementById('helloTypingText');
  if (typingEl) {
    const phrases = [
      'Available for Freelance',
      'Open to Projects',
      'Hire Me',
      "Let's Build Together",
      'Android & Web Expert'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 50;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 500;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typingEl.textContent = `"${current.slice(0, charIndex)}"`;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, pauseAfterDelete);
          return;
        }
        setTimeout(type, deleteSpeed);
      } else {
        typingEl.textContent = `"${current.slice(0, charIndex + 1)}"`;
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, pauseAfterType);
          return;
        }
        setTimeout(type, typeSpeed);
      }
    }
    setTimeout(type, 500);
  }

  /* ═══════════════════ NAVBAR SCROLL & ACTIVE SECTION ═══════════════════ */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = ['home', 'services', 'about', 'projects', 'testimonials', 'blogs'];

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = 'home';
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 100) {
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

  const mobileToggleLabel = document.getElementById('mobileToggleLabel');
  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    if (mobileToggleLabel) {
      mobileToggleLabel.textContent = isOpen ? 'Menu' : 'Close';
    }
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
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  const isMobile = () => window.innerWidth < 768;

  const CARD_WIDTH = 580;
  const CARD_GAP = 24;

  function updateCarousel(animate = false) {
    const track = document.getElementById('testimonialTrack');
    if (isMobile()) {
      if (track) track.style.transform = '';
      testimonialCards.forEach((card, i) => {
        card.classList.remove('center', 'side', 'animating-in');
        card.style.display = '';
        card.style.order = '';
      });
      scrollToTestimonial(currentTestimonial, animate);
      if (animate) {
        const centerCard = testimonialCards[currentTestimonial];
        centerCard.classList.add('animating-in');
        centerCard.addEventListener('animationend', function removeAnim() {
          centerCard.classList.remove('animating-in');
          centerCard.removeEventListener('animationend', removeAnim);
        }, { once: true });
      }
      return;
    }

    if (!track) return;

    testimonialCards.forEach((card, i) => {
      card.classList.remove('center', 'side', 'animating-in');
      card.style.display = '';
      card.style.order = '';
      if (i === currentTestimonial) {
        card.classList.add('center');
      } else {
        card.classList.add('side');
      }
    });

    const containerWidth = testimonialCarousel ? testimonialCarousel.offsetWidth : 1152;
    const translateX = (containerWidth - CARD_WIDTH) / 2 - currentTestimonial * (CARD_WIDTH + CARD_GAP);
    track.style.transform = `translateX(${translateX}px)`;

    if (animate) {
      const centerCard = testimonialCards[currentTestimonial];
      centerCard.classList.add('animating-in');
      centerCard.addEventListener('animationend', function removeAnim() {
        centerCard.classList.remove('animating-in');
        centerCard.removeEventListener('animationend', removeAnim);
      }, { once: true });
    }
  }

  function scrollToTestimonial(index, smooth = true) {
    if (!testimonialCarousel || !isMobile()) return;
    const cardWidth = testimonialCarousel.offsetWidth;
    const scrollLeft = index * cardWidth;
    testimonialCarousel.scrollTo({
      left: scrollLeft,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  function goToNext() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateCarousel(true);
  }

  function goToPrev() {
    currentTestimonial = currentTestimonial === 0 ? totalTestimonials - 1 : currentTestimonial - 1;
    updateCarousel(true);
  }

  let autoscrollInterval;
  function startAutoscroll() {
    clearInterval(autoscrollInterval);
    autoscrollInterval = setInterval(goToNext, 15000);
  }
  function stopAutoscroll() {
    clearInterval(autoscrollInterval);
  }

  testimonialCarousel.addEventListener('scroll', () => {
    if (!isMobile()) return;
    clearTimeout(testimonialCarousel.scrollTimeout);
    testimonialCarousel.scrollTimeout = setTimeout(() => {
      const cardWidth = testimonialCarousel.offsetWidth;
      currentTestimonial = Math.round(testimonialCarousel.scrollLeft / cardWidth);
      currentTestimonial = Math.min(currentTestimonial, totalTestimonials - 1);
      stopAutoscroll();
      startAutoscroll();
    }, 100);
  });

  document.getElementById('testimonialPrev').addEventListener('click', () => {
    goToPrev();
    stopAutoscroll();
    startAutoscroll();
  });

  document.getElementById('testimonialNext').addEventListener('click', () => {
    goToNext();
    stopAutoscroll();
    startAutoscroll();
  });

  testimonialCards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (!isMobile() && card.classList.contains('side')) {
        currentTestimonial = i;
        updateCarousel(true);
        stopAutoscroll();
        startAutoscroll();
      }
    });
  });

  updateCarousel(false);
  startAutoscroll();

  window.addEventListener('resize', () => {
    updateCarousel(false);
    if (isMobile()) {
      scrollToTestimonial(currentTestimonial, false);
    }
  });

  const testimonialSection = document.getElementById('testimonials');
  if (testimonialSection) {
    const testimonialObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const centerCard = entry.target.querySelector('.testimonial-card.center') || entry.target.querySelector('.testimonial-card');
          if (centerCard && !centerCard.classList.contains('animating-in')) {
            centerCard.classList.add('animating-in');
            centerCard.addEventListener('animationend', function removeAnim() {
              centerCard.classList.remove('animating-in');
              centerCard.removeEventListener('animationend', removeAnim);
            }, { once: true });
          }
          testimonialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    testimonialObserver.observe(testimonialSection);
  }

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

  /* ═══════════════════ BLOG MODAL ═══════════════════ */
  const BLOG_DATA = [
    {
      title: 'Kotlin Coroutines: Mastering Async Programming in Android',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
      tags: ['Android', 'Kotlin'],
      date: '15 Mar 2025',
      content: `<p>Kotlin Coroutines have become the standard for handling asynchronous operations in Android development. They replace callbacks and RxJava with a more readable, sequential style of code.</p>
        <p><strong>Why Coroutines?</strong> They simplify async code by allowing you to write it in a synchronous manner. Instead of nesting callbacks or chaining operators, you use <code>suspend</code> functions and structured concurrency.</p>
        <h3>Key Concepts</h3>
        <p><strong>Suspend functions</strong> can pause execution without blocking the thread. <strong>CoroutineScope</strong> defines the lifetime of coroutines. <strong>Dispatchers</strong> (Main, IO, Default) control which thread runs your code.</p>
        <p>For Android, use <code>viewModelScope</code> or <code>lifecycleScope</code> to automatically cancel coroutines when the ViewModel or Activity is destroyed. Combine with <code>Flow</code> for reactive data streams.</p>`
    },
    {
      title: 'Jetpack Compose: Building Declarative UIs the Modern Way',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
      tags: ['Jetpack Compose', 'Android'],
      date: '12 Mar 2025',
      content: `<p>Jetpack Compose is Android's modern toolkit for building native UI. It uses a declarative approach—you describe what the UI should look like, and Compose handles updates efficiently.</p>
        <p><strong>Declarative vs Imperative:</strong> With XML and Views, you manually update UI when data changes. With Compose, you recompose only what changed when state updates.</p>
        <h3>State & Recomposition</h3>
        <p>Use <code>remember</code> for composable-local state and <code>mutableStateOf</code> for reactive state. Compose automatically recomposes when state changes. For ViewModels, use <code>collectAsState()</code> to observe flows.</p>
        <p>Material Design 3 is built-in with dynamic theming. Use <code>MaterialTheme.colorScheme</code> for adaptive colors that respond to system settings.</p>`
    },
    {
      title: 'Clean Architecture in Android: Scalable & Maintainable Apps',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
      tags: ['Architecture', 'Android'],
      date: '8 Mar 2025',
      content: `<p>Clean Architecture separates concerns into layers: Presentation (UI), Domain (business logic), and Data (repositories, APIs). Each layer depends inward, keeping the core independent of frameworks.</p>
        <p><strong>Domain Layer:</strong> Contains Use Cases (interactors) and Entity models. No Android dependencies. Pure Kotlin/Java.</p>
        <h3>Data Layer</h3>
        <p>Repositories implement interfaces defined in the domain layer. They coordinate data sources (remote API, local DB). Use dependency injection (Hilt) to provide implementations.</p>
        <p><strong>Presentation:</strong> ViewModels call Use Cases. UI observes ViewModel state. This structure makes testing easy—you can unit test Use Cases without Android.</p>`
    },
    {
      title: 'Firebase vs Supabase: Choosing the Right BaaS for Your App',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
      tags: ['Backend', 'Firebase', 'Supabase'],
      date: '5 Mar 2025',
      content: `<p>Both Firebase and Supabase offer Backend-as-a-Service: auth, database, storage, and real-time capabilities. Choosing depends on your stack and requirements.</p>
        <p><strong>Firebase</strong> excels with Android/iOS SDKs, Google integration, and ML features. <strong>Supabase</strong> is PostgreSQL-based, open-source, and great if you prefer SQL and self-hosting options.</p>
        <h3>Auth & Real-time</h3>
        <p>Firebase Auth supports Google, Apple, email, phone. Supabase Auth is similar with Row Level Security. For real-time, Firebase Realtime DB and Firestore both work well; Supabase uses PostgreSQL with Realtime extensions.</p>
        <p>Consider Supabase if you need complex queries, SQL, or want to avoid vendor lock-in. Choose Firebase for tight Google ecosystem integration and mature mobile SDKs.</p>`
    },
    {
      title: 'React Native vs Flutter: Which Framework Fits Your Project?',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      tags: ['Cross-Platform', 'React Native', 'Flutter'],
      date: '1 Mar 2025',
      content: `<p>Both React Native and Flutter enable building iOS and Android apps from one codebase. The choice often comes down to team skills, performance needs, and ecosystem.</p>
        <p><strong>React Native</strong> uses JavaScript/TypeScript and React. It bridges to native components. Large ecosystem, many npm packages. Hot reload is fast.</p>
        <h3>Flutter</h3>
        <p><strong>Flutter</strong> uses Dart and renders with Skia. No bridge—compiles to native ARM. Consistent UI across platforms. Strong performance for animations and complex layouts.</p>
        <p>React Native suits web developers; Flutter suits those who want pixel-perfect control. Consider hiring pool: React devs are more common. Flutter has a steeper learning curve but excellent docs.</p>`
    },
    {
      title: 'Material Design 3: Dynamic Color & New Components',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop',
      tags: ['UI/UX', 'Material Design'],
      date: '25 Feb 2025',
      content: `<p>Material Design 3 (Material You) introduces dynamic color that adapts to the user's wallpaper and preferences. It creates a more personalized, cohesive experience across Android and web.</p>
        <p><strong>Dynamic Theming:</strong> Use <code>DynamicColorScheme</code> in Compose or CSS variables on web. Colors are derived from a seed color and user preferences.</p>
        <h3>New Components</h3>
        <p>Updated components include FAB variants, navigation bar, search bar, and bottom sheets. Tonal surfaces replace elevation for depth. Typography scales are more flexible.</p>
        <p>Implement in Jetpack Compose with <code>MaterialTheme</code> and <code>dynamicColorOf</code>. For web, use Material Web Components or custom CSS with design tokens.</p>`
    }
  ];

  const blogModal = document.getElementById('blogModal');
  const blogModalBackdrop = document.getElementById('blogModalBackdrop');
  const blogModalClose = document.getElementById('blogModalClose');
  const blogModalDialog = document.getElementById('blogModalDialog');

  function openBlogModal(id) {
    const blog = BLOG_DATA[id];
    if (!blog || !blogModal) return;
    document.getElementById('blogModalImage').src = blog.image;
    document.getElementById('blogModalImage').alt = blog.title;
    document.getElementById('blogModalTitle').textContent = blog.title;
    document.getElementById('blogModalDate').textContent = blog.date;
    document.getElementById('blogModalTags').innerHTML = blog.tags.map(t => `<span class="tag">${t}</span>`).join('');
    document.getElementById('blogModalArticle').innerHTML = blog.content;
    blogModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeBlogModal() {
    blogModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.blogId, 10);
      if (!isNaN(id)) openBlogModal(id);
    });
  });

  if (blogModalBackdrop) blogModalBackdrop.addEventListener('click', closeBlogModal);
  if (blogModalClose) blogModalClose.addEventListener('click', closeBlogModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogModal?.classList.contains('is-open')) closeBlogModal();
    if (e.key === 'Escape' && projectModal?.classList.contains('is-open')) closeProjectModal();
  });

  /* ═══════════════════ PROJECT MODAL ═══════════════════ */
  const PROJECT_DATA = [
    {
      title: 'ChargeGrid – EV Charger Locator',
      image: 'assets/ev-app.webp',
      tags: ['Kotlin', 'Android', 'Firebase'],
      desc: 'A native Android app that helps EV drivers find and navigate to charging stations in real-time.',
      content: `<p>ChargeGrid was built for Rudra Robotics to simplify the EV charging experience. Users can search nearby stations, view availability, and get turn-by-turn directions.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Real-time charger availability and status</li>
          <li>Google Maps integration for navigation</li>
          <li>Firebase Auth & Firestore for user data</li>
          <li>Offline support for saved locations</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Kotlin, MVVM, Jetpack Compose, Firebase (Auth, Firestore, Cloud Functions), Google Maps SDK.</p>`
    },
    {
      title: 'Portfolio Pro – Developer Showcase',
      image: 'assets/9ad09b6874b5b78c8edaee5f760c0ffe.webp',
      tags: ['Next.js', 'Tailwind', 'ShadCn', 'Clerk', 'Supabase'],
      desc: 'A professional portfolio website showcasing skills, projects, and expertise with a modern design.',
      content: `<p>Portfolio Pro is a responsive portfolio built with Next.js and Tailwind CSS. Features smooth animations, ShadCn UI components, Clerk authentication, and Supabase for backend.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Responsive design for all devices</li>
          <li>Animated sections on scroll</li>
          <li>Clerk auth & contact form integration</li>
          <li>Skills & project showcase with Supabase</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Next.js, Tailwind CSS, ShadCn, Clerk, Supabase.</p>`
    },
    {
      title: 'LaunchPad – SaaS Landing Platform',
      image: 'assets/saas-website.webp',
      tags: ['Next.js', 'Tailwind', 'ShadCn', 'Clerk', 'Supabase'],
      desc: 'A high-converting landing page for SaaS products with clear CTAs and feature highlights.',
      content: `<p>LaunchPad is a conversion-optimized landing page for SaaS startups built with Next.js. It includes hero sections, feature grids, pricing tables, and testimonials using ShadCn components.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Hero with value proposition</li>
          <li>Feature comparison sections</li>
          <li>Pricing tiers and CTA buttons</li>
          <li>Clerk auth & Supabase for signup/leads</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Next.js, Tailwind CSS, ShadCn, Clerk, Supabase.</p>`
    },
    {
      title: 'FitFusion Fitness Tracker',
      image: 'assets/heath-app.webp',
      tags: ['Android', 'Kotlin', 'Supabase'],
      desc: 'A fitness app for tracking workouts, steps, and goals with a clean, motivating UI.',
      content: `<p>FitFusion helps users track daily activity, set goals, and visualize progress. Built with Material Design 3 and Supabase for backend.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Step counter and workout logging</li>
          <li>Challenges and achievements</li>
          <li>Progress charts and statistics</li>
          <li>Supabase Auth & real-time sync</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Kotlin, Jetpack Compose, Supabase (Auth, Realtime, Storage), Room for local cache.</p>`
    },
    {
      title: 'QuickBite – Food Delivery App',
      image: 'assets/quick-commerce.webp',
      tags: ['Android', 'Kotlin', 'Firebase'],
      desc: 'A food delivery app connecting users with restaurants for quick ordering and delivery tracking.',
      content: `<p>QuickBite enables users to browse restaurants, place orders, and track delivery in real-time. Includes admin panel for restaurant management.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Restaurant browsing and menu</li>
          <li>Cart, checkout, and payment flow</li>
          <li>Real-time order tracking</li>
          <li>Firebase Cloud Messaging for notifications</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Kotlin, MVVM, Firebase (Auth, Firestore, FCM), Google Maps for delivery tracking.</p>`
    },
    {
      title: 'Aime Store – E-Commerce Platform (Android/iOS)',
      image: 'assets/aimestore.webp',
      tags: ['Android', 'Next.js', 'Tailwind', 'ShadCn', 'Clerk', 'Supabase'],
      desc: 'A full e-commerce platform with mobile apps and web dashboard for Dekeract.',
      content: `<p>Aime Store is a complete e-commerce solution with native Android and iOS apps plus a web admin dashboard. Built for Dekeract Pvt. Ltd.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Product catalog and search</li>
          <li>Cart, wishlist, and checkout</li>
          <li>Order history and tracking</li>
          <li>Web admin (Next.js) for inventory & orders</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Android (Kotlin), iOS (Swift), Web: Next.js, Tailwind, ShadCn, Clerk, Supabase.</p>`
    },
    {
      title: 'TaskFlow – Task Management App',
      image: 'assets/task-mgmt.webp',
      tags: ['Android', 'Kotlin', 'Room DB'],
      desc: 'A productivity app for managing tasks, projects, and deadlines with local-first storage.',
      content: `<p>TaskFlow helps users organize tasks into projects, set due dates, and track progress. Uses Room for offline-first data persistence.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Tasks with priorities and due dates</li>
          <li>Project grouping and filters</li>
          <li>Room database for local storage</li>
          <li>Material Design 3 UI</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Kotlin, Jetpack Compose, Room, ViewModel, Coroutines.</p>`
    },
    {
      title: 'RideShare – Cab Booking App',
      image: 'assets/ride-app.webp',
      tags: ['Android', 'Kotlin', 'Firebase'],
      desc: 'A ride-hailing app for booking cabs, tracking drivers, and managing rides.',
      content: `<p>RideShare connects riders with drivers. Users can book rides, track driver location, and pay via integrated payment options.</p>
        <h3>Key Features</h3>
        <ul>
          <li>Pickup and drop location selection</li>
          <li>Real-time driver tracking on map</li>
          <li>Fare estimation and payment</li>
          <li>Ride history and ratings</li>
        </ul>
        <h3>Tech Stack</h3>
        <p>Kotlin, MVVM, Firebase (Auth, Firestore, FCM), Google Maps SDK, Retrofit for APIs.</p>`
    }
  ];

  const projectModal = document.getElementById('projectModal');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalClose = document.getElementById('projectModalClose');

  function openProjectModal(id) {
    const project = PROJECT_DATA[id];
    if (!project || !projectModal) return;
    document.getElementById('projectModalImage').src = project.image;
    document.getElementById('projectModalImage').alt = project.title;
    document.getElementById('projectModalTitle').textContent = project.title;
    document.getElementById('projectModalDesc').textContent = project.desc;
    document.getElementById('projectModalTags').innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
    document.getElementById('projectModalArticle').innerHTML = project.content;
    projectModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const id = parseInt(card.dataset.projectId, 10);
      if (!isNaN(id)) openProjectModal(id);
    });
  });

  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);
  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);

  /* ═══════════════════ COUNTRY SEARCHABLE DROPDOWN ═══════════════════ */
  const COUNTRY_LIST = [
    { name: 'Afghanistan', code: 'AF' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' }, { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahrain', code: 'BH' }, { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' }, { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' }, { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' }, { name: 'Brazil', code: 'BR' }, { name: 'Brunei', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' }, { name: 'Central African Republic', code: 'CF' }, { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' }, { name: 'China', code: 'CN' }, { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' }, { name: 'Congo', code: 'CG' }, { name: 'Costa Rica', code: 'CR' },
    { name: 'Croatia', code: 'HR' }, { name: 'Cuba', code: 'CU' }, { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' }, { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominican Republic', code: 'DO' }, { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' }, { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' }, { name: 'Ethiopia', code: 'ET' }, { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' }, { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' }, { name: 'Greece', code: 'GR' }, { name: 'Guatemala', code: 'GT' },
    { name: 'Guinea', code: 'GN' }, { name: 'Guinea-Bissau', code: 'GW' }, { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' }, { name: 'Honduras', code: 'HN' }, { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' }, { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' }, { name: 'Iraq', code: 'IQ' }, { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' }, { name: 'Italy', code: 'IT' }, { name: 'Ivory Coast', code: 'CI' },
    { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' }, { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' }, { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Laos', code: 'LA' }, { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' }, { name: 'Lesotho', code: 'LS' }, { name: 'Liberia', code: 'LR' },
    { name: 'Libya', code: 'LY' }, { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' }, { name: 'North Macedonia', code: 'MK' }, { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' }, { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' }, { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' }, { name: 'Mexico', code: 'MX' }, { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' }, { name: 'Mongolia', code: 'MN' }, { name: 'Montenegro', code: 'ME' },
    { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' }, { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' }, { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' }, { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' }, { name: 'North Korea', code: 'KP' }, { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' }, { name: 'Other', code: '' }, { name: 'Palestine', code: 'PS' },
    { name: 'Panama', code: 'PA' }, { name: 'Papua New Guinea', code: 'PG' }, { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' }, { name: 'Philippines', code: 'PH' }, { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' }, { name: 'Qatar', code: 'QA' }, { name: 'Romania', code: 'RO' },
    { name: 'Russia', code: 'RU' }, { name: 'Rwanda', code: 'RW' }, { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' }, { name: 'Serbia', code: 'RS' }, { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' }, { name: 'Singapore', code: 'SG' }, { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' }, { name: 'Somalia', code: 'SO' }, { name: 'South Africa', code: 'ZA' },
    { name: 'South Korea', code: 'KR' }, { name: 'South Sudan', code: 'SS' }, { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' }, { name: 'Sudan', code: 'SD' }, { name: 'Suriname', code: 'SR' },
    { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Syria', code: 'SY' },
    { name: 'Taiwan', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Tanzania', code: 'TZ' },
    { name: 'Thailand', code: 'TH' }, { name: 'Timor-Leste', code: 'TL' }, { name: 'Togo', code: 'TG' },
    { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' }, { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' }, { name: 'Uganda', code: 'UG' }, { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE', alt: ['UAE'] }, { name: 'United Kingdom', code: 'GB', alt: ['UK'] }, { name: 'United States', code: 'US', alt: ['USA'] },
    { name: 'Uruguay', code: 'UY' }, { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vatican City', code: 'VA' },
    { name: 'Venezuela', code: 'VE' }, { name: 'Vietnam', code: 'VN' }, { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' }
  ];

  const countrySearchInput = document.getElementById('countrySearchInput');
  const countryDropdown = document.getElementById('countryDropdown');
  const countryValue = document.getElementById('countryValue');
  const countryWrap = document.getElementById('countrySearchWrap');

  function renderCountryList(filter = '') {
    const q = filter.trim().toLowerCase();
    const filtered = q
      ? COUNTRY_LIST.filter(c =>
          c.name.toLowerCase().includes(q) ||
          (c.code && c.code.toLowerCase().includes(q)) ||
          (c.alt && c.alt.some(a => a.toLowerCase().includes(q)))
        )
      : COUNTRY_LIST;
    countryDropdown.innerHTML = filtered.length
      ? filtered.map(c => `<div class="country-option" data-country="${c.name}" role="option">${c.name}${c.code ? ` <span class="country-code">(${c.code})</span>` : ''}</div>`).join('')
      : '<div class="country-option country-option-empty">No country found</div>';
  }

  function selectCountry(country) {
    countrySearchInput.value = country;
    if (countryValue) countryValue.value = country;
    countryDropdown.classList.remove('open');
  }

  if (countrySearchInput && countryDropdown) {
    countrySearchInput.addEventListener('focus', () => {
      countryDropdown.classList.add('open');
      renderCountryList(countrySearchInput.value);
    });
    countrySearchInput.addEventListener('input', () => {
      renderCountryList(countrySearchInput.value);
      countryDropdown.classList.add('open');
    });
    countrySearchInput.addEventListener('blur', () => {
      setTimeout(() => countryDropdown.classList.remove('open'), 200);
    });
    countryDropdown.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const opt = e.target.closest('.country-option');
      if (opt && opt.dataset.country !== undefined && !opt.classList.contains('country-option-empty')) selectCountry(opt.dataset.country);
    });
    countryDropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') countryDropdown.classList.remove('open');
    });
    renderCountryList();
  }

  /* ═══════════════════ CONTACT FORM (prevent default) ═══════════════════ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

});
