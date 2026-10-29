/* ==============================================
   EBONICS INTEGRATED SERVICES - Main JavaScript
   Scroll animations, navigation, form handling
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- HEADER SCROLL EFFECT ----
  const header = document.getElementById('header');
  const isInnerPage = header.classList.contains('scrolled');

  if (!isInnerPage) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---- MOBILE NAVIGATION ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation based on element index within its parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        let siblingIndex = 0;
        siblings.forEach((el, i) => {
          if (el === entry.target) siblingIndex = i;
        });

        setTimeout(() => {
          entry.target.classList.add('active');
        }, siblingIndex * 100);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- CONTACT FORM (MAILTO) ----
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || 'General Inquiry';
      const message = document.getElementById('contactMessage')?.value || '';

      const mailSubject = encodeURIComponent(`${subject} - From ${name}`);
      const mailBody = encodeURIComponent(
        `Hello Ebonics Integrated Services,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${subject}\n\n` +
        `Message:\n${message}\n\n` +
        `---\nSent from Ebonics website contact form`
      );

      window.location.href = `mailto:thompsomenwadike@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    });
  }

  // ---- PORTFOLIO FILTER ----
  const filterButtons = document.querySelectorAll('#portfolioFilter button');
  const portfolioItems = document.querySelectorAll('#portfolioGrid > *');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.transition = 'all 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (lightbox && portfolioCards.length > 0) {
    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 100; // account for fixed header
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- COUNTER ANIMATION FOR HERO STATS ----
  const counters = document.querySelectorAll('.hero-stat h3');

  if (counters.length > 0) {
    const animateCounter = (element) => {
      const text = element.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[0]);
      const suffix = text.replace(match[0], '');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
      }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

});
