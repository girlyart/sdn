/**
 * Calendar Engine Module
 * Accurate date calculations, leap years, month navigation, and event indicator dots
 */

export class SchoolCalendar {
  constructor(options = {}) {
    this.events = options.events || [];
    this.currentDate = new Date(); // Can be navigated
    this.selectedDateStr = null;
    this.gridContainer = options.gridContainer;
    this.titleContainer = options.titleContainer;
    this.prevBtn = options.prevBtn;
    this.nextBtn = options.nextBtn;
    this.onSelectDate = options.onSelectDate || (() => {});

    this.monthNamesIndo = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.navigateMonth(-1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.navigateMonth(1));
    }
    this.render();
  }

  navigateMonth(delta) {
    this.currentDate.setMonth(this.currentDate.getMonth() + delta);
    this.render();
  }

  render() {
    if (!this.gridContainer) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Update title
    if (this.titleContainer) {
      this.titleContainer.textContent = `${this.monthNamesIndo[month]} ${year}`;
    }

    // Days in current, previous and next months
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    // Indonesian week starts Monday or Sunday: standard Indonesian calendar usually starts Sunday (Minggu)
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    const isCurrentActualMonth = (today.getFullYear() === year && today.getMonth() === month);

    this.gridContainer.innerHTML = '';

    // 1. Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.innerHTML = `<span class="day-number">${dayNum}</span>`;
      this.gridContainer.appendChild(cell);
    }

    // 2. Current month active days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell';
      
      const isToday = isCurrentActualMonth && (today.getDate() === day);
      if (isToday) cell.classList.add('today');

      // Date string format: YYYY-MM-DD with zero-padding
      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      const fullDateStr = `${year}-${mStr}-${dStr}`;

      // Find events matching this day
      const dayEvents = this.events.filter(ev => {
        return ev.fullDate === fullDateStr || (ev.year === year && parseInt(ev.day, 10) === day && ev.fullDate.startsWith(`${year}-${mStr}`));
      });

      let dotsHtml = '';
      if (dayEvents.length > 0) {
        dayEvents.slice(0, 2).forEach(ev => {
          dotsHtml += `<span class="event-dot" title="${ev.title}">${ev.title}</span>`;
        });
        if (dayEvents.length > 2) {
          dotsHtml += `<span class="event-dot" style="background:#FEF3C7; color:#92400E;">+${dayEvents.length - 2} lagi</span>`;
        }
      }

      cell.innerHTML = `
        <span class="day-number">${day}</span>
        ${dotsHtml}
      `;

      cell.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day-cell').forEach(c => c.style.outline = 'none');
        cell.style.outline = '2px solid var(--color-primary)';
        cell.style.outlineOffset = '-2px';
        this.selectedDateStr = fullDateStr;
        this.onSelectDate(fullDateStr, dayEvents);
      });

      this.gridContainer.appendChild(cell);
    }

    // 3. Next month leading days to complete the 35 or 42 grid cells
    const totalRendered = firstDayIndex + daysInCurrentMonth;
    const remainingCells = (totalRendered <= 35) ? (35 - totalRendered) : (42 - totalRendered);
    
    for (let day = 1; day <= remainingCells; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.innerHTML = `<span class="day-number">${day}</span>`;
      this.gridContainer.appendChild(cell);
    }
  }
}
