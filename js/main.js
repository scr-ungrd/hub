/**
 * Main Logic and Accessibility Engine - HUB SCR
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTS ---
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  const searchInput = document.getElementById('search-input');
  const searchInputMobile = document.getElementById('search-input-mobile');
  const searchStatusSection = document.getElementById('search-status-section');
  const searchResultsText = document.getElementById('search-results-text');
  const btnClearSearch = document.getElementById('btn-clear-search');
  
  // Theme elements
  const btnThemeToggle = document.getElementById('theme-toggle-btn');
  const sunIcon = btnThemeToggle.querySelector('.theme-icon-sun');
  const moonIcon = btnThemeToggle.querySelector('.theme-icon-moon');
  
  // Mobile search elements
  const btnMobileSearchToggle = document.getElementById('mobile-search-btn');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  
  // Accessibility elements
  const btnToggleContrast = document.getElementById('btn-toggle-contrast');
  const btnToggleDyslexic = document.getElementById('btn-toggle-dyslexic');
  const btnFontDecrease = document.getElementById('btn-font-decrease');
  const btnFontReset = document.getElementById('btn-font-reset');
  const btnFontIncrease = document.getElementById('btn-font-increase');

  // Resource sections and items
  const resourceItems = document.querySelectorAll('.resource-card-item');
  const resourceSections = document.querySelectorAll('.resource-section');

  // --- STATE ---
  let currentFontScale = parseFloat(localStorage.getItem('accessibilityFontScale')) || 1.0;
  
  // --- UTILS ---
  // Accent removal and normalization for search
  const cleanText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  // --- INTERACTION LOGIC ---

  // Filter buttons & category state
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeCategory = 'all';

  // Real-time Search Engine & Category Filter
  const filterResourcesCombined = () => {
    const query = searchInput ? searchInput.value : '';
    const normalizedQuery = cleanText(query);
    let visibleCardsCount = 0;

    resourceItems.forEach(item => {
      const category = item.getAttribute('data-category') || '';
      const searchTerms = cleanText(item.getAttribute('data-search-terms') || '');
      const cardTitle = cleanText(item.querySelector('.card-resource-title')?.textContent || '');
      const cardText = cleanText(item.querySelector('.card-resource-text')?.textContent || '');

      const matchesCategory = (activeCategory === 'all') || (category === activeCategory);
      const matchesSearch = (normalizedQuery === '') || 
                            searchTerms.includes(normalizedQuery) || 
                            cardTitle.includes(normalizedQuery) || 
                            cardText.includes(normalizedQuery);

      if (matchesCategory && matchesSearch) {
        item.classList.remove('d-none');
        visibleCardsCount++;
      } else {
        item.classList.add('d-none');
      }
    });

    // Filter section headers (Hide empty sections)
    resourceSections.forEach(section => {
      const sectionCards = section.querySelectorAll('.resource-card-item');
      const hasVisibleCards = Array.from(sectionCards).some(card => !card.classList.contains('d-none'));
      
      if (hasVisibleCards) {
        section.classList.remove('d-none');
      } else {
        section.classList.add('d-none');
      }
    });

    // Update screen status alert
    if (normalizedQuery !== '' || activeCategory !== 'all') {
      searchStatusSection.classList.remove('d-none');
      let statusMsg = '';
      if (normalizedQuery !== '') {
        statusMsg += ` para "${query}"`;
      }
      if (activeCategory !== 'all') {
        statusMsg += ` en la categoría seleccionada`;
      }

      if (visibleCardsCount === 1) {
        searchResultsText.textContent = `Se encontró 1 recurso${statusMsg}`;
      } else if (visibleCardsCount > 1) {
        searchResultsText.textContent = `Se encontraron ${visibleCardsCount} recursos${statusMsg}`;
      } else {
        searchResultsText.textContent = `No se encontraron recursos${statusMsg}`;
      }
    } else {
      searchStatusSection.classList.add('d-none');
    }
  };

  // Filter button click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      filterResourcesCombined();
    });
  });

  // Sync search inputs
  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (e.target === searchInput) {
      if (searchInputMobile) searchInputMobile.value = value;
    } else {
      if (searchInput) searchInput.value = value;
    }
    filterResourcesCombined();
  };

  if (searchInput) searchInput.addEventListener('input', handleSearchInput);
  if (searchInputMobile) searchInputMobile.addEventListener('input', handleSearchInput);

  // Clear search button
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchInputMobile) searchInputMobile.value = '';
      activeCategory = 'all';
      filterBtns.forEach(b => {
        if (b.getAttribute('data-filter') === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });
      filterResourcesCombined();
    });
  }

  // Keyboard shortcut Ctrl+K to search (WCAG 2.1.4 / 2.1.1)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Mobile search bar toggle
  if (btnMobileSearchToggle && mobileSearchBar) {
    btnMobileSearchToggle.addEventListener('click', () => {
      mobileSearchBar.classList.toggle('d-none');
      if (!mobileSearchBar.classList.contains('d-none') && searchInputMobile) {
        searchInputMobile.focus();
      }
    });
  }

  // --- SYSTEM PREFERENCE & THEME (DARK / LIGHT) ---
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      sunIcon.classList.add('d-none');
      moonIcon.classList.remove('d-none');
    } else {
      sunIcon.classList.remove('d-none');
      moonIcon.classList.add('d-none');
    }
  };

  // Initial Theme determination
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // Theme Toggle Button Event
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // --- ACCESSIBILITY (WCAG) SYSTEM ---

  // Apply Font Scale
  const applyFontScale = (scale) => {
    currentFontScale = Math.min(Math.max(scale, 0.9), 1.4); // Clamp between 0.9 and 1.4
    bodyElement.style.setProperty('--accessibility-font-scale', currentFontScale);
    localStorage.setItem('accessibilityFontScale', currentFontScale);
  };

  // Set initial Font Scale
  applyFontScale(currentFontScale);

  // Font size button events
  if (btnFontIncrease) {
    btnFontIncrease.addEventListener('click', () => {
      applyFontScale(currentFontScale + 0.1);
    });
  }
  
  if (btnFontDecrease) {
    btnFontDecrease.addEventListener('click', () => {
      applyFontScale(currentFontScale - 0.1);
    });
  }

  if (btnFontReset) {
    btnFontReset.addEventListener('click', () => {
      applyFontScale(1.0);
    });
  }

  // High Contrast Toggle
  const applyHighContrast = (enable) => {
    if (enable) {
      bodyElement.classList.add('high-contrast');
      localStorage.setItem('contrastModeEnabled', 'true');
    } else {
      bodyElement.classList.remove('high-contrast');
      localStorage.setItem('contrastModeEnabled', 'false');
    }
  };

  // Initial High Contrast load
  const isHighContrastSaved = localStorage.getItem('contrastModeEnabled') === 'true';
  applyHighContrast(isHighContrastSaved);

  if (btnToggleContrast) {
    btnToggleContrast.addEventListener('click', () => {
      const isCurrentlyContrast = bodyElement.classList.contains('high-contrast');
      applyHighContrast(!isCurrentlyContrast);
    });
  }

  // Dyslexic Font Toggle
  const applyDyslexicFont = (enable) => {
    if (enable) {
      bodyElement.classList.add('dyslexic-font');
      localStorage.setItem('dyslexicFontEnabled', 'true');
    } else {
      bodyElement.classList.remove('dyslexic-font');
      localStorage.setItem('dyslexicFontEnabled', 'false');
    }
  };

  // Initial Dyslexic font load
  const isDyslexicSaved = localStorage.getItem('dyslexicFontEnabled') === 'true';
  applyDyslexicFont(isDyslexicSaved);

  if (btnToggleDyslexic) {
    btnToggleDyslexic.addEventListener('click', () => {
      const isCurrentlyDyslexic = bodyElement.classList.contains('dyslexic-font');
      applyDyslexicFont(!isCurrentlyDyslexic);
    });
  }

  // --- LAZY LOADING SCROLL ENHANCEMENT ---
  // Modern standard browser lazy loading handles this, but we implement a visual fade-in
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease-in-out';
      imageObserver.observe(img);
    });
  } else {
    lazyImages.forEach(img => img.style.opacity = '1');
  }
});
