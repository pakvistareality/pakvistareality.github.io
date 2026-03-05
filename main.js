/* ================================================
   PakVista Realty - Main JavaScript
   Interactive Functionality & Accessibility
   ================================================ */

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const isExpanded = mainNav.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    mobileMenuToggle.innerHTML = isExpanded ? '✕' : '☰';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mainNav.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.innerHTML = '☰';
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.innerHTML = '☰';
      mobileMenuToggle.focus();
      document.body.style.overflow = '';
    }
  });
}

// ===== Active Navigation Link =====
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// ===== Sticky Header on Scroll =====
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== Property Filter & Sort (properties.html) =====
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortProperties');

if (categoryFilter && sortSelect) {
  const propertyCards = Array.from(document.querySelectorAll('.property-card'));
  
  // Filter by category
  categoryFilter.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    
    propertyCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        card.style.display = 'block';
        // Fade in animation
        card.style.animation = 'fadeInUp 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Announce filter change to screen readers
    announceToScreenReader(`Showing ${selectedCategory === 'all' ? 'all properties' : selectedCategory + ' properties'}`);
  });
  
  // Sort properties
  sortSelect.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    const propertyGrid = document.querySelector('.property-grid');
    const visibleCards = propertyCards.filter(card => card.style.display !== 'none');
    
    let sortedCards = [...visibleCards];
    
    switch(sortValue) {
      case 'price-low':
        sortedCards.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price);
          const priceB = parseFloat(b.dataset.price);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sortedCards.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price);
          const priceB = parseFloat(b.dataset.price);
          return priceB - priceA;
        });
        break;
      case 'newest':
        sortedCards.sort((a, b) => {
          const dateA = new Date(a.dataset.date);
          const dateB = new Date(b.dataset.date);
          return dateB - dateA;
        });
        break;
    }
    
    // Re-append sorted cards
    sortedCards.forEach(card => {
      propertyGrid.appendChild(card);
    });
    
    // Announce sort change to screen readers
    announceToScreenReader(`Properties sorted by ${sortValue.replace('-', ' ')}`);
  });
}

// ===== Contact Form Validation & Submission =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formInputs = contactForm.querySelectorAll('input, textarea');
  const successMessage = document.querySelector('.form-success');
  const liveRegion = document.getElementById('formLiveRegion');
  
  // Real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Show success message
        successMessage.classList.add('show');
        successMessage.textContent = '✓ Thank you! Your message has been sent successfully. We will contact you soon.';
        
        // Announce to screen readers
        if (liveRegion) {
          liveRegion.textContent = 'Form submitted successfully. Thank you for contacting PakVista Realty.';
        }
        
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
          if (liveRegion) {
            liveRegion.textContent = '';
          }
        }, 5000);
        
        // Focus on success message for screen readers
        successMessage.focus();
      }, 1500);
    } else {
      // Announce validation errors to screen readers
      if (liveRegion) {
        liveRegion.textContent = 'Please correct the errors in the form before submitting.';
      }
      
      // Focus on first error
      const firstError = contactForm.querySelector('.error input, .error textarea');
      if (firstError) {
        firstError.focus();
      }
    }
  });
}

// ===== Field Validation Function =====
function validateField(field) {
  const formGroup = field.parentElement;
  const errorElement = formGroup.querySelector('.form-error');
  let isValid = true;
  let errorMessage = '';
  
  // Check if required field is empty
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = `${field.getAttribute('aria-label') || field.name} is required.`;
  }
  
  // Email validation
  if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
  }
  
  // Phone validation (Pakistan format)
  if (field.type === 'tel' && field.value.trim()) {
    const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    if (!phoneRegex.test(field.value.replace(/[\s-]/g, ''))) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number (e.g., +92 300 1234567).';
    }
  }
  
  // Update UI
  if (!isValid) {
    formGroup.classList.add('error');
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
    field.setAttribute('aria-invalid', 'true');
  } else {
    formGroup.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  }
  
  return isValid;
}

// ===== Announce to Screen Readers =====
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Set focus to target for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
    }
  });
});

// ===== Animate on Scroll =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements with fade-in animation
document.querySelectorAll('.property-card, .testimonial-card, .stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  
  // Add keyboard navigation for property cards
  const propertyCards = document.querySelectorAll('.property-card');
  propertyCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = card.querySelector('.btn');
        if (link) link.click();
      }
    });
  });
  
  // Announce page load to screen readers
  const pageTitle = document.querySelector('h1');
  if (pageTitle) {
    announceToScreenReader(`${pageTitle.textContent} page loaded`);
  }
});

// ===== Format Price (PKR) =====
function formatPrice(price) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
  }).format(price);
}

// ===== Export functions for reuse =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateField,
    formatPrice,
    announceToScreenReader
  };
}
