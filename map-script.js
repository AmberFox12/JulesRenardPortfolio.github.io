// ===== Gestion du thème =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Charger le thème depuis le localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle du thème
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// ===== Navigation vers les îles =====
const islands = document.querySelectorAll('.island');

islands.forEach(island => {
  island.addEventListener('click', () => {
    const targetPage = island.getAttribute('data-page');

    // Ajouter une classe d'animation avant de naviguer
    island.style.transform = 'scale(1.2) translateY(-50px)';
    island.style.opacity = '0';

    // Naviguer après l'animation
    setTimeout(() => {
      window.location.href = targetPage;
    }, 500);
  });

  // Effet de curseur personnalisé au survol
  island.addEventListener('mouseenter', () => {
    island.style.cursor = 'pointer';
  });
});

// ===== Animation des particules au scroll =====
window.addEventListener('scroll', () => {
  const particles = document.querySelectorAll('.particle');
  const scrollY = window.scrollY;

  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.1;
    particle.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// ===== Animation d'entrée des îles =====
window.addEventListener('load', () => {
  const islands = document.querySelectorAll('.island');

  islands.forEach((island, index) => {
    setTimeout(() => {
      island.style.opacity = '1';
      island.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Initialiser l'opacité des îles
document.querySelectorAll('.island').forEach(island => {
  island.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
});
