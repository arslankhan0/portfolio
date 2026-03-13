/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links and handle tab switching
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
      
      if (navmenu.hash) {
        let section = document.querySelector(navmenu.hash);
        if (section) {
          let tabPane = section.closest('.tab-pane');
          if (tabPane && !tabPane.classList.contains('active')) {
            e.preventDefault();
            let tabBtn = document.querySelector(`button[data-bs-target="#${tabPane.id}"]`);
            if (tabBtn) tabBtn.click();
            setTimeout(() => {
              let scrollMarginTop = getComputedStyle(section).scrollMarginTop || 0;
              window.scrollTo({
                top: section.offsetTop - parseInt(scrollMarginTop),
                behavior: 'smooth'
              });
            }, 300);
          }
        }
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      let section = document.querySelector(window.location.hash);
      if (section) {
        let tabPane = section.closest('.tab-pane');
        if (tabPane && !tabPane.classList.contains('active')) {
          let tabBtn = document.querySelector(`button[data-bs-target="#${tabPane.id}"]`);
          if (tabBtn) tabBtn.click();
        }
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop || 0;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section || section.offsetParent === null) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Load More Portfolio Items
   */
  if (document.getElementById('load-more-btn')) {
    const loadMoreBtn = document.getElementById('load-more-btn');

    loadMoreBtn.addEventListener('click', function () {
      const hiddenItems = document.querySelectorAll('.portfolio-item-hidden');
      const batchSize = 9; // Load 9 items at a time
      const itemsToShow = Array.from(hiddenItems).slice(0, batchSize);

      if (itemsToShow.length === 0) return;

      itemsToShow.forEach(item => {
        const img = item.querySelector('img');
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
          // Clean up data attribute
          img.removeAttribute('data-src');
        }
        // Remove hidden classes and add isotope-item class
        item.classList.remove('d-none', 'portfolio-item-hidden');
        item.classList.add('isotope-item');
      });

      const isotopeContainer = document.querySelector('.isotope-container');

      // Wait for images to load before appending to Isotope to ensure correct layout
      imagesLoaded(isotopeContainer, function () {
        const iso = Isotope.data(isotopeContainer);
        if (iso) {
          iso.appended(itemsToShow);
          // Optional: Re-arrange if a filter is active
          // check if active filter exists
          const activeFilter = document.querySelector('.portfolio-filters .filter-active');
          const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : '*';
          iso.arrange({ filter: filterValue });
        }
      });

      // Hide button if no more hidden items
      if (document.querySelectorAll('.portfolio-item-hidden').length === 0) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

})();