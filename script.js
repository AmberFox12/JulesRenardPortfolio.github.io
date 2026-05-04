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

// ===== Bloc-tag tooltips =====
(function blocTooltips() {
  const competences = {
    'B1': {
      label: 'Gérer le patrimoine informatique',
      items: [
        'Recenser et identifier les ressources numériques',
        'Exploiter des référentiels, normes et standards',
        'Mettre en place et vérifier les niveaux d\'habilitation',
        'Vérifier la continuité d\'un service informatique',
        'Gérer des sauvegardes',
        'Vérifier le respect des règles d\'utilisation'
      ]
    },
    'B2': {
      label: 'Répondre aux incidents et aux demandes',
      items: [
        'Collecter, suivre et orienter des demandes',
        'Traiter des demandes réseau et système',
        'Traiter des demandes concernant les applications'
      ]
    },
    'B3': {
      label: 'Développer la présence en ligne',
      items: [
        'Valoriser l\'image de l\'organisation sur les médias numériques',
        'Référencer les services en ligne et mesurer leur visibilité',
        'Participer à l\'évolution d\'un site Web'
      ]
    },
    'B4': {
      label: 'Travailler en mode projet',
      items: [
        'Analyser les objectifs et les modalités d\'organisation',
        'Planifier les activités',
        'Évaluer les indicateurs de suivi et analyser les écarts'
      ]
    },
    'B5': {
      label: 'Mettre à disposition un service informatique',
      items: [
        'Réaliser les tests d\'intégration et d\'acceptation',
        'Déployer un service',
        'Accompagner les utilisateurs dans la mise en place'
      ]
    },
    'B6': {
      label: 'Organiser son développement professionnel',
      items: [
        'Mettre en place son environnement d\'apprentissage',
        'Mettre en œuvre des outils et stratégies de veille',
        'Gérer son identité professionnelle',
        'Développer son projet professionnel'
      ]
    }
  };

  document.querySelectorAll('.bloc-tag').forEach(tag => {
    const numEl = tag.querySelector('.num');
    if (!numEl) return;
    const key = numEl.textContent.trim();
    const data = competences[key];
    if (!data) return;

    tag.removeAttribute('title');

    const tooltip = document.createElement('span');
    tooltip.className = 'bloc-tooltip';
    tooltip.innerHTML =
      '<span class="bloc-tooltip-title">' + data.label + '</span>' +
      '<ul>' + data.items.map(i => '<li>' + i + '</li>').join('') + '</ul>';
    tag.appendChild(tooltip);
  });
})();

// ===== Contact form =====
(function contactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const wrap = document.getElementById('contact-form-wrap');
  const success = document.getElementById('contact-success');
  const errorEl = document.getElementById('form-error');
  const btn = document.getElementById('form-btn');

  // Coordonnées injectées uniquement après envoi réussi
  const c = {
    e: ['jules', 'renad27', 'gmail.com'].join('@').replace('renad27@', 'renad27@'),
    p: '06 14 64 54 02',
    l: 'Caen, France'
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    errorEl.textContent = '';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        document.getElementById('coord-email').textContent = c.e;
        document.getElementById('coord-phone').textContent = c.p;
        document.getElementById('coord-location').textContent = c.l;
        wrap.hidden = true;
        success.hidden = false;
      } else {
        const data = await res.json().catch(() => ({}));
        errorEl.textContent = (data.errors || []).map(e => e.message).join(' ') || 'Une erreur est survenue, veuillez réessayer.';
      }
    } catch {
      errorEl.textContent = 'Impossible d\'envoyer le message. Vérifiez votre connexion.';
    }

    btn.classList.remove('loading');
    btn.disabled = false;
  });
})();
