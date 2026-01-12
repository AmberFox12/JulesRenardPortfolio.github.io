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

// ===== Modal Photos =====
const projectPhotos = {
  'jeu-probleme': {
    title: 'Jeu Problème - Photos',
    photos: [
      {
        src: 'images/Acceuil.png',
        title: 'Page d\'accueil',
        icon: 'fa-home',
        description: 'Interface d\'accueil avec les options principales du jeu'
      },
      {
        src: 'images/Classement.png',
        title: 'Classement',
        icon: 'fa-trophy',
        description: 'Tableau des meilleurs scores et classement des joueurs'
      },
      {
        src: 'images/Historique.png',
        title: 'Historique',
        icon: 'fa-history',
        description: 'Historique des parties jouées et statistiques'
      },
      {
        src: 'images/Jeux.png',
        title: 'Interface de jeu',
        icon: 'fa-gamepad',
        description: 'Zone de jeu avec les problèmes de programmation et éditeur de code'
      }
    ]
  },
  'rftg': {
    title: 'Application RFTG - Schémas',
    photos: [
      {
        src: 'images/SchémaArchitecture.png',
        title: 'Schéma d\'Architecture',
        icon: 'fa-sitemap',
        description: 'Architecture client-serveur avec API REST Spring Boot, frontend Laravel/Android et base MySQL'
      },
      {
        src: 'images/MCD_RFTG.png',
        title: 'Modèle Conceptuel de Données',
        icon: 'fa-database',
        description: 'MCD de l\'application avec les tables clients, dvd, livraisons et locations'
      }
    ]
  }
};

function openPhotoModal(projectId) {
  const modal = document.getElementById('photoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalGallery = document.getElementById('modalGallery');

  const project = projectPhotos[projectId];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalGallery.innerHTML = '';

  project.photos.forEach(photo => {
    const photoItem = document.createElement('div');
    photoItem.className = 'modal-photo-item';
    photoItem.innerHTML = `
      <img src="${photo.src}" alt="${photo.title}" onclick="window.open(this.src, '_blank')">
      <div class="modal-photo-caption">
        <h3><i class="fas ${photo.icon}"></i> ${photo.title}</h3>
        <p>${photo.description}</p>
      </div>
    `;
    modalGallery.appendChild(photoItem);
  });

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
  const modal = document.getElementById('photoModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Fermer la modale en cliquant en dehors
window.addEventListener('click', (e) => {
  const modal = document.getElementById('photoModal');
  if (e.target === modal) {
    closePhotoModal();
  }
});

// Fermer la modale avec la touche Échap
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePhotoModal();
  }
});
