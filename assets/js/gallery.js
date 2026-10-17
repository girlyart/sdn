/**
 * Interactive Lightbox Gallery Module
 * Supports Touch/Click, Prev/Next Navigation, Keyboard Shortcuts, and Counter
 */

export class LightboxGallery {
  constructor(options = {}) {
    this.items = options.items || [];
    this.currentIndex = 0;
    this.lightboxEl = null;
    this.init();
  }

  init() {
    this.createLightboxDOM();
    this.bindEvents();
  }

  createLightboxDOM() {
    // Check if already created
    if (document.getElementById('site-lightbox')) {
      this.lightboxEl = document.getElementById('site-lightbox');
      return;
    }

    const lightbox = document.createElement('div');
    lightbox.id = 'site-lightbox';
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Penampil Foto Galeri');

    lightbox.innerHTML = `
      <div class="lightbox-header">
        <span class="lightbox-counter" id="lightbox-counter">Foto 1 dari 1</span>
        <button class="lightbox-close" id="lightbox-close" aria-label="Tutup Galeri">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <button class="lightbox-nav-btn lightbox-prev" id="lightbox-prev" aria-label="Foto Sebelumnya">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div class="lightbox-stage">
        <img src="" alt="" class="lightbox-img" id="lightbox-img" />
      </div>

      <button class="lightbox-nav-btn lightbox-next" id="lightbox-next" aria-label="Foto Berikutnya">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div class="lightbox-caption" id="lightbox-caption"></div>
    `;

    document.body.appendChild(lightbox);
    this.lightboxEl = lightbox;
  }

  bindEvents() {
    if (!this.lightboxEl) return;

    const closeBtn = this.lightboxEl.querySelector('#lightbox-close');
    const prevBtn = this.lightboxEl.querySelector('#lightbox-prev');
    const nextBtn = this.lightboxEl.querySelector('#lightbox-next');

    closeBtn.addEventListener('click', () => this.close());
    prevBtn.addEventListener('click', () => this.prev());
    nextBtn.addEventListener('click', () => this.next());

    // Close on clicking backdrop outside stage
    this.lightboxEl.addEventListener('click', (e) => {
      if (e.target === this.lightboxEl || e.target.classList.contains('lightbox-stage')) {
        this.close();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxEl.classList.contains('open')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  }

  setItems(items) {
    this.items = items;
  }

  open(index = 0) {
    if (!this.items || this.items.length === 0) return;
    this.currentIndex = index;
    this.updateContent();
    this.lightboxEl.classList.add('open');
    document.body.style.overflow = 'hidden';

    const closeBtn = this.lightboxEl.querySelector('#lightbox-close');
    if (closeBtn) closeBtn.focus();
  }

  close() {
    if (!this.lightboxEl) return;
    this.lightboxEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  next() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back
    }
    this.updateContent();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - 1; // Loop to end
    }
    this.updateContent();
  }

  updateContent() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    const img = this.lightboxEl.querySelector('#lightbox-img');
    const caption = this.lightboxEl.querySelector('#lightbox-caption');
    const counter = this.lightboxEl.querySelector('#lightbox-counter');

    img.style.opacity = '0';
    img.src = item.photo || item.src;
    img.alt = item.title || item.alt || 'Foto Galeri SMPN 6 Jember';

    img.onload = () => {
      img.style.opacity = '1';
    };

    counter.textContent = `Foto ${this.currentIndex + 1} dari ${this.items.length}`;
    caption.innerHTML = `<strong>${item.title || ''}</strong><br><span style="opacity:0.85; font-size: 0.85rem;">${item.desc || ''}</span>`;
  }
}
