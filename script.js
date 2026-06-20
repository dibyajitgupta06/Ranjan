document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Interactive Smooth Cursor Follower
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let hasMoved = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!hasMoved) {
      cursorFollower.style.opacity = '1';
      cursorX = mouseX;
      cursorY = mouseY;
      hasMoved = true;
    }
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (hasMoved) {
      cursorFollower.style.opacity = '1';
    }
  });

  function animateCursor() {
    // Lerp: current = current + (target - current) * speed
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursorFollower.style.left = `${cursorX}px`;
    cursorFollower.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover states for links and interactive targets
  function bindCursorHovers() {
    const hoverElements = document.querySelectorAll('a, button, .timeline-card, .filter-btn, .timeline-group-toggle, .reference-card');
    hoverElements.forEach(el => {
      // Remove any existing event listeners to avoid duplicates
      el.removeEventListener('mouseenter', onMouseEnterHover);
      el.removeEventListener('mouseleave', onMouseLeaveHover);
      
      el.addEventListener('mouseenter', onMouseEnterHover);
      el.addEventListener('mouseleave', onMouseLeaveHover);
    });
  }

  function onMouseEnterHover() {
    cursorFollower.classList.add('hovering');
  }

  function onMouseLeaveHover() {
    cursorFollower.classList.remove('hovering');
  }

  bindCursorHovers();

  // 3. Theme Switcher (Light/Dark Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 4. Sticky Header on Scroll
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 5. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
    bindCursorHovers();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = mobileToggle.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // 6. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Dynamic Skills Progress Bar Animation
  const progressBars = document.querySelectorAll('.skill-progress');
  
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const widthVal = bar.getAttribute('data-width');
        bar.style.width = widthVal;
        observer.unobserve(bar);
      }
    });
  }, {
    threshold: 0.1
  });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // 8. Stats & Metrics Count-Up Animation
  const counters = document.querySelectorAll('[data-val]');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-val'));
        if (isNaN(endValue)) return;

        let startValue = 0;
        const duration = 1500; // 1.5 seconds
        const step = Math.max(Math.ceil(endValue / (duration / 16)), 1); // 60 FPS approx

        const interval = setInterval(() => {
          startValue += step;
          if (startValue >= endValue) {
            target.textContent = endValue;
            clearInterval(interval);
          } else {
            target.textContent = startValue;
          }
        }, 16);

        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.1
  });

  counters.forEach(counter => counterObserver.observe(counter));

  // 9. Timeline Accordion Expansion
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const headerEl = item.querySelector('.timeline-card');
    headerEl.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;

      const isItemActive = item.classList.contains('active');
      
      // Close other timeline items
      timelineItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      item.classList.toggle('active');
    });
  });

  // Older career roles toggle
  const olderToggleBtn = document.getElementById('older-roles-toggle');
  const olderRolesContent = document.getElementById('older-roles-content');

  olderToggleBtn.addEventListener('click', () => {
    const isHidden = olderRolesContent.classList.contains('hidden');
    
    if (isHidden) {
      olderRolesContent.classList.remove('hidden');
      olderToggleBtn.classList.add('active');
      olderToggleBtn.querySelector('span').textContent = 'Hide Earlier Career Roles';
      // Re-bind cursor follower hovers on newly revealed cards
      setTimeout(bindCursorHovers, 50);
    } else {
      olderRolesContent.classList.add('hidden');
      olderToggleBtn.classList.remove('active');
      olderToggleBtn.querySelector('span').textContent = 'Show Earlier Career Roles (1997 - 2010)';
      olderToggleBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // 10. Certifications Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.25s ease';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 11. Contact Form Verification
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill out all fields.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      formFeedback.classList.add('hidden');

      setTimeout(() => {
        showFeedback(`Thank you, ${name}! Your message has been received successfully.`, 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }, 1200);
    });
  }

  function showFeedback(text, type) {
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.classList.remove('hidden');
  }

  // 12. Active Nav Link on Scroll Highlight
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 140; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < (sectionTop + sectionHeight)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
});
