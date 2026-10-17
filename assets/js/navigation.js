/**
 * Navigation Module
 * Handles Sticky Navbar, Mobile Drawer, Active Page Links, Keyboard Navigation, and Back-to-Top
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');
  const backToTop = document.querySelector('.back-to-top');

  // 1. Sticky Navbar on Scroll
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Back-to-top visibility
      if (backToTop) {
        if (window.scrollY > 350) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Back to top button action
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const openDrawer = () => {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
      const firstFocusable = drawer.querySelector('button, a');
      if (firstFocusable) firstFocusable.focus();
    }
  };

  const closeDrawer = () => {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // Close drawer on link click
  if (drawer) {
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // Escape key closes mobile drawer and any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer && drawer.classList.contains('open')) {
        closeDrawer();
      }
    }
  });

  // 4. Mark Active Navigation Item based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .drawer-link, .drawer-sublink');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();
    
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      
      // Also highlight parent dropdown trigger if inside a dropdown
      const parentDropdown = link.closest('.has-dropdown');
      if (parentDropdown) {
        const trigger = parentDropdown.querySelector('.nav-link');
        if (trigger) trigger.classList.add('active');
      }
    }
  });
}
