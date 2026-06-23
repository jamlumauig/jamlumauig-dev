// ============================================
// Shared animation behavior across pages
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // --- Timeline node grow-in (Experience page) ---
  const roleEls = document.querySelectorAll('.role');
  if ('IntersectionObserver' in window && roleEls.length) {
    const ioRole = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          ioRole.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    roleEls.forEach(el => ioRole.observe(el));
  }

  // --- Animated stat counters ---
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const ioCount = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => ioCount.observe(el));
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  // --- Magnetic-ish hover tilt for phone frames ---
  document.querySelectorAll('.phone-frame').forEach(frame => {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  });

});

// ============================================
// Clickable project details modal
// Screenshots can be local asset paths or remote image URLs.
// Add store links in googlePlay, appStore, github, live fields when available.
// ============================================
const portfolioProjects = {
  'healthy-options': {
    title: 'Healthy Options App',
    category: 'Health & Wellness',
    description: 'Health and wellness mobile app featuring customer engagement tools, health education content, digital membership features, and a seamless shopping experience.',
    tags: ['Java', 'Okhttp API', 'Google Play'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.healthyoptions&hl=en',
    github: '',
    live: '',
    screenshots: [
      'https://play-lh.googleusercontent.com/WAzjri5K-Jo9X3xMnZhKU29suecDO6bEDNh-dsbd_Mhs3kKW2WtS6SrHdeJBGDQ8f3qJAQM5wNVy4nzGuKCbKw=w480-h960'
    ]
  },
  'bow-and-wow': {
    title: 'Bow and Wow App',
    category: 'Pet Care',
    description: 'Pet health and wellness mobile application for club members, centered on customer engagement, membership, and care tracking.',
    tags: ['Java', 'Okhttp API', 'Google Play'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.bowandwow.app&hl=en',
    github: '',
    live: '',
    screenshots: [
      'https://play-lh.googleusercontent.com/30b4Hm77coTcFuEELYDoe4H8_Nx-SCDEs8VSRuxV2yzpZQjft2sTjBEyriJbKUCaIqVhasJ57q_X5ShXfbxb1g=w480-h960'
    ]
  },
  'philstar': {
    title: 'Philstar App',
    category: 'Media & News',
    description: 'News mobile application delivering real-time articles and media content to a national audience with high-frequency content updates.',
    tags: ['Java', 'Okhttp API', 'Google Play'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.philstar.app&hl=en',
    github: '',
    live: '',
    screenshots: [
      'https://play-lh.googleusercontent.com/fpjGWsJIPy6_JD1OwV7jkhYSk6uECs0m-MQnYl40eOLWmtqzKsp3Q_dHGqWqXpNbF_F_siRNjmpct02xtPScQA=w480-h960'
    ]
  },
  'caltondatx': {
    title: 'CALTONDATx - CaltonReach',
    category: 'Cross-Platform · Built From Scratch',
    description: 'Flutter WebView application taken from zero to published on both Android and iOS, covering development, testing, and deployment lifecycle.',
    tags: ['Flutter', 'WebView', 'Google Play', 'App Store'],
    googlePlay: 'https://play.google.com/store/apps/details?id=ph.nyxsys.calton.datx&hl=en',
    appStore: 'https://apps.apple.com/ph/app/caltondatx/id6744874458',
    github: '',
    live: '',
    screenshots: [
      'https://play-lh.googleusercontent.com/cWqhMuVpr38rei_hma-KvHDrvZjxp2gq-ozHFojhObFI0gZAT9MzGsJeF1lQoqZ0ehVyzAcoVCA6pV0NTXeIEA=w480-h960'
    ]
  },
  'vcastplay': {
    title: 'VCastPlay',
    category: 'Digital Signage · Maintained Codebase',
    description: 'Digital signage application for displaying dynamic media content on screens. Work focused on debugging, optimization, and live product maintenance.',
    tags: ['Kotlin', 'Android SDK', 'REST API'],
    googlePlay: '', appStore: '', github: '', live: '',
    screenshots: ['assets/vcast.png']
  },
  'teletech': {
    title: 'TeleTech App',
    category: 'Inherited Codebase · Client Delivery',
    description: 'Partially completed Android application taken over from a previous developer and delivered by resolving inherited issues and completing remaining features.',
    tags: ['Kotlin', 'Android SDK', 'REST API'],
    googlePlay: '', appStore: '', github: '', live: '',
    screenshots: ['https://upload.wikimedia.org/wikipedia/commons/4/48/TTEC_Logo_Steel.png']
  },
  'calton-commuter-guide': {
    title: 'Calton Commuter Guide',
    category: 'Transit & Navigation · Active Development',
    description: 'Flutter commuter guide app combining route planning, live navigation assistance, route maps, and location discovery for Android and iOS.',
    tags: ['Flutter', 'Maps & Navigation', 'Android', 'iOS', 'Firebase'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: []
  },
  'imwallet': {
    title: 'ImWallet',
    category: 'Cryptocurrency Mobile App',
    description: 'Secure cryptocurrency wallet application for storing, sending, and receiving digital assets such as Bitcoin and Ethereum.',
    tags: ['Kotlin', 'Firebase', 'Encryption', 'Blockchain API'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: []
  },
  '24kchat-lite': {
    title: '24kchat Lite',
    category: 'Messaging Application',
    description: 'Lightweight messaging application with real-time chat, media sharing, push notifications, and performance-conscious mobile design.',
    tags: ['Kotlin', 'Firebase', 'WebSocket', 'Push Notifications'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: ['assets/kchat.png']
  },
  'smartlist-keeper': {
    title: 'SmartList Keeper',
    category: 'Grocery Shopping · CRUD App',
    description: 'Android CRUD grocery list app using Room Database for local data persistence and efficient shopping item management.',
    tags: ['Kotlin', 'Room Database', 'Android SDK'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: ['assets/note.png']
  },
  'cooking-ina': {
    title: 'Cooking Ina',
    category: 'Cooking Recipe App',
    description: 'Kotlin recipe application using MVVM and Room Database, designed around step-by-step cooking guidance and simple recipe organization.',
    tags: ['Kotlin', 'MVVM', 'Room Database', 'Android SDK'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: ['assets/cook.png']
  },
  'jamils-catering-system': {
    title: "Jamil's Catering System",
    category: 'Capstone Project',
    description: 'Web-based catering reservation management system for browsing services and submitting catering reservations online.',
    tags: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: ['assets/jamils.png']
  },
  'soya-data-entry-system': {
    title: 'SOYA Data Entry System',
    category: 'On-the-Job Training Project',
    description: 'C# desktop data entry and transaction management system for adding, updating, deleting, and reviewing company material transaction records.',
    tags: ['C#', '.NET', 'SQL Server', 'Windows Forms'],
    googlePlay: '', appStore: '', github: '', live: '', screenshots: []
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const titleEl = document.getElementById('modalProjectTitle');
  const categoryEl = document.getElementById('modalProjectCategory');
  const descEl = document.getElementById('modalProjectDescription');
  const tagsEl = document.getElementById('modalProjectTags');
  const linksEl = document.getElementById('modalProjectLinks');
  const shotsEl = document.getElementById('modalProjectScreenshots');
  const noteEl = document.getElementById('modalProjectNote');

  function linkButton(label, url, primary = false) {
    if (!url) return '';
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn ${primary ? 'btn-primary' : 'btn-ghost'}">${label} →</a>`;
  }

  function openProject(projectId) {
    const project = portfolioProjects[projectId];
    if (!project) return;

    titleEl.textContent = project.title;
    categoryEl.textContent = project.category;
    descEl.textContent = project.description;
    tagsEl.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    linksEl.innerHTML = [
      linkButton('Google Play', project.googlePlay, true),
      linkButton('App Store', project.appStore),
      linkButton('GitHub', project.github),
      linkButton('Live Preview', project.live)
    ].join('');

    noteEl.textContent = linksEl.innerHTML.trim()
      ? 'Only available uploaded/public links are shown here.'
      : 'No public store or repository link has been added for this project yet.';

    const screenshots = (project.screenshots || [])
      .map(src => typeof src === 'string' ? src.trim() : src)
      .filter(Boolean);

    if (!screenshots.length) {
      shotsEl.style.gridTemplateColumns = '1fr';
      shotsEl.innerHTML = `<div class="project-shot"><div class="project-shot-placeholder"><strong>${project.title}</strong>No screenshots yet</div></div>`;
    } else {
      shotsEl.style.gridTemplateColumns = screenshots.length === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))';
      const isOddTail = (index) => screenshots.length > 1 && screenshots.length % 2 === 1 && index === screenshots.length - 1;
      shotsEl.innerHTML = screenshots.map((src, index) =>
        `<div class="project-shot"${isOddTail(index) ? ' style="grid-column:1 / -1;"' : ''}><img src="${src}" alt="${project.title} screenshot ${index + 1}" loading="lazy" decoding="async"></div>`
      ).join('');
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
  }

  function closeProject() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
  }

  document.querySelectorAll('[data-project]').forEach(section => {
    section.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      openProject(section.dataset.project);
    });
    section.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(section.dataset.project);
      }
    });
  });

  document.querySelectorAll('[data-close-project]').forEach(el => el.addEventListener('click', closeProject));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeProject();
  });
});
