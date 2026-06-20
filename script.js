document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Theme Switcher (Light/Dark Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference, otherwise use system preference
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

  // 3. Sticky Header on Scroll
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Change menu icon to close icon if open
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = mobileToggle.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // 5. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Timeline Accordion (Professional Experience)
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const headerEl = item.querySelector('.timeline-card');
    headerEl.addEventListener('click', (e) => {
      // Prevent collapse toggles if user clicked on nested links
      if (e.target.tagName === 'A' || e.target.closest('a')) return;

      const isActive = item.classList.contains('active');
      
      // Close other timeline items (accordion mode)
      timelineItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current timeline item
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
    } else {
      olderRolesContent.classList.add('hidden');
      olderToggleBtn.classList.remove('active');
      olderToggleBtn.querySelector('span').textContent = 'Show Earlier Career Roles (1997 - 2010)';
      // Smooth scroll back to toggle button so user doesn't lose position
      olderToggleBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // 7. Certifications Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter cards
      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Small animation trigger
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Contact Form Handling
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Form validation
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill out all fields.', 'error');
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      formFeedback.classList.add('hidden');

      setTimeout(() => {
        // Mock successful submission
        showFeedback(`Thank you, ${name}! Your message has been received successfully.`, 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }, 1500);
    });
  }

  function showFeedback(text, type) {
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.classList.remove('hidden');
  }

  // 9. Active Nav Link on Scroll Highlight
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
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
