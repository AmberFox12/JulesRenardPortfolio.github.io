// ===== Menu Toggle Mobile =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = menuToggle.querySelector('i');

    if (navLinksContainer.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Fermer le menu en cliquant sur un lien
  const navLinksItems = navLinksContainer.querySelectorAll('a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
      }
    });
  });
}

// ===== Scroll to Top =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ===== Animations au scroll =====
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

// Observer toutes les sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in-scroll');
    observer.observe(section);
  });
});

// ===== Animation des barres de compétences =====
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');

  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';

    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

// Lancer l'animation des compétences quand la section est visible
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);
}

// ===== Active Navigation Link =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ===== Smooth Scroll pour tous les liens d'ancre =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Animation au chargement =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
