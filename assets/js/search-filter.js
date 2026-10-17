/**
 * Search and Filter Reusable Module
 * Supports real-time debounced query, category filtering, and empty state rendering
 */

export class SearchFilterController {
  constructor(options = {}) {
    this.allData = options.data || [];
    this.filteredData = [...this.allData];
    this.renderCallback = options.onRender || (() => {});
    this.searchFields = options.searchFields || ['title', 'name', 'desc'];
    this.activeCategory = options.defaultCategory || 'all';
    this.searchQuery = '';
    
    this.searchInputEl = options.searchInput;
    this.clearBtnEl = options.clearBtn;
    this.filterButtons = options.filterButtons || [];
    this.containerEl = options.container;
    this.emptyStateEl = options.emptyState;

    this.init();
  }

  init() {
    this.bindSearch();
    this.bindFilters();
    this.apply();
  }

  bindSearch() {
    if (!this.searchInputEl) return;

    let debounceTimer;
    this.searchInputEl.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.clearBtnEl) {
          if (this.searchQuery.length > 0) {
            this.clearBtnEl.classList.add('show');
          } else {
            this.clearBtnEl.classList.remove('show');
          }
        }
        this.apply();
      }, 150);
    });

    if (this.clearBtnEl) {
      this.clearBtnEl.addEventListener('click', () => {
        this.searchInputEl.value = '';
        this.searchQuery = '';
        this.clearBtnEl.classList.remove('show');
        this.searchInputEl.focus();
        this.apply();
      });
    }
  }

  bindFilters() {
    if (!this.filterButtons || this.filterButtons.length === 0) return;

    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const category = btn.getAttribute('data-filter') || 'all';
        this.activeCategory = category;

        // Toggle active class
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.apply();
      });
    });
  }

  apply() {
    this.filteredData = this.allData.filter(item => {
      // 1. Check category match
      let matchesCategory = true;
      if (this.activeCategory !== 'all') {
        const itemCat = item.category || item.year || item.level;
        matchesCategory = itemCat === this.activeCategory;
      }

      // 2. Check search query match
      let matchesSearch = true;
      if (this.searchQuery.length > 0) {
        matchesSearch = this.searchFields.some(field => {
          const val = item[field];
          if (!val) return false;
          if (Array.isArray(val)) {
            return val.some(v => String(v).toLowerCase().includes(this.searchQuery));
          }
          return String(val).toLowerCase().includes(this.searchQuery);
        });
      }

      return matchesCategory && matchesSearch;
    });

    // Handle Empty State
    if (this.emptyStateEl) {
      if (this.filteredData.length === 0) {
        this.emptyStateEl.style.display = 'block';
        if (this.containerEl) this.containerEl.style.display = 'none';
      } else {
        this.emptyStateEl.style.display = 'none';
        if (this.containerEl) this.containerEl.style.display = '';
      }
    }

    // Trigger UI Render
    this.renderCallback(this.filteredData);
  }

  reset() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    if (this.searchInputEl) this.searchInputEl.value = '';
    if (this.clearBtnEl) this.clearBtnEl.classList.remove('show');
    if (this.filterButtons) {
      this.filterButtons.forEach(b => {
        if (b.getAttribute('data-filter') === 'all') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    }
    this.apply();
  }
}
