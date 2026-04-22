// ===== Active nav link =====
(function markActive() {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current) a.classList.add('active');
  });
})();

// ===== Mobile menu toggle =====
(function menu() {
  const btn = document.querySelector('.menu-toggle');
  const list = document.querySelector('.nav-links');
  if (!btn || !list) return;
  btn.addEventListener('click', () => {
    list.classList.toggle('open');
  });
})();

// ===== Scroll reveal =====
(function reveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
})();

// ===== Scroll to top =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.scrollToTop = scrollToTop;

// ===== Project filters =====
(function projectFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!filters.length || !cards.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(c => {
        const tags = (c.dataset.tags || '').split(',');
        if (f === 'all' || tags.includes(f)) {
          c.classList.remove('hidden');
        } else {
          c.classList.add('hidden');
        }
      });
    });
  });
})();

// ===== Project photo modal =====
const projectPhotos = {
  'jeu-probleme': {
    title: 'Jeu Problème — Captures',
    photos: [
      { src: 'images/Acceuil.png', title: 'Page d\'accueil', description: 'Interface d\'accueil avec les options principales du jeu.' },
      { src: 'images/Jeux.png', title: 'Interface de jeu', description: 'Zone de jeu avec les problèmes de programmation et éditeur de code.' },
      { src: 'images/Classement.png', title: 'Classement', description: 'Tableau des meilleurs scores et classement des joueurs.' },
      { src: 'images/Historique.png', title: 'Historique', description: 'Historique des parties jouées et statistiques.' }
    ]
  },
  'rftg': {
    title: 'Application RFTG — Schémas',
    photos: [
      { src: 'images/SchemaArchitecture.png', title: 'Architecture', description: 'Architecture client-serveur avec API REST Spring Boot, frontend Laravel/Android et base MySQL.' },
      { src: 'images/MCD_RFTG.png', title: 'Modèle conceptuel de données', description: 'MCD de l\'application : clients, dvd, livraisons et locations.' }
    ]
  }
};

function openPhotoModal(id) {
  const modal = document.getElementById('photoModal');
  const title = document.getElementById('modalTitle');
  const gallery = document.getElementById('modalGallery');
  const p = projectPhotos[id];
  if (!modal || !p) return;

  title.textContent = p.title;
  gallery.innerHTML = p.photos.map(ph => `
    <div class="modal-photo">
      <img src="${ph.src}" alt="${ph.title}" onclick="window.open(this.src, '_blank')">
      <div class="modal-photo-caption">
        <h4>${ph.title}</h4>
        <p>${ph.description}</p>
      </div>
    </div>
  `).join('');

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closePhotoModal() {
  const modal = document.getElementById('photoModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;

window.addEventListener('click', e => {
  const modal = document.getElementById('photoModal');
  if (modal && e.target === modal) closePhotoModal();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePhotoModal();
});
