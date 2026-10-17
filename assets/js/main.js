/**
 * Main Application Orchestrator
 * Coordinates Navigation, Modals, Animated Counters, FAQ Accordions, and Fallbacks
 */

import { initNavigation } from './navigation.js';
import { CONFIG } from './config.js';
import { teachers, facilities, extracurriculars, newsArticles, achievements } from './data.js';

// 1. Initialize Navigation
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFaqAccordion();
  initStatsCounter();
  initModalTriggers();
  initCopyrightYear();
  initImageFallbacks();
});

// 2. FAQ Accordion Handler
export function initFaqAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      const body = item.querySelector('.accordion-body');

      // Close other accordion items in the same container
      const parentAccordion = item.closest('.accordion');
      if (parentAccordion) {
        parentAccordion.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBody = other.querySelector('.accordion-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });
      }

      if (isActive) {
        item.classList.remove('active');
        if (body) body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

// 3. Animated Stats Counter via IntersectionObserver
export function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeProgress * target);
          el.textContent = currentVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        };

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

// 4. Modal System (Universal for Teachers, Facilities, Ekskul)
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('.modal-close, [data-modal-close]');
  if (closeBtn) closeBtn.focus();
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

export function initModalTriggers() {
  // Listen for clicks on elements with data-modal-target
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const teacherId = trigger.getAttribute('data-teacher-id');
      const facilityId = trigger.getAttribute('data-facility-id');
      const ekskulId = trigger.getAttribute('data-ekskul-id');

      if (teacherId) populateTeacherModal(teacherId);
      if (facilityId) populateFacilityModal(facilityId);
      if (ekskulId) populateEkskulModal(ekskulId);

      openModal(targetId);
    }

    // Modal close buttons
    const closeBtn = e.target.closest('.modal-close, [data-modal-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    }

    // Click outside modal dialog to close
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target.id);
    }
  });

  // Escape key closes open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay.open');
      openModals.forEach(m => closeModal(m.id));
    }
  });
}

function populateTeacherModal(id) {
  const teacher = teachers.find(t => t.id === id);
  if (!teacher) return;

  const modal = document.getElementById('teacher-detail-modal');
  if (!modal) return;

  const photo = modal.querySelector('#teacher-modal-photo');
  const name = modal.querySelector('#teacher-modal-name');
  const role = modal.querySelector('#teacher-modal-role');
  const nip = modal.querySelector('#teacher-modal-nip');
  const education = modal.querySelector('#teacher-modal-education');
  const experience = modal.querySelector('#teacher-modal-experience');
  const bio = modal.querySelector('#teacher-modal-bio');
  const quote = modal.querySelector('#teacher-modal-quote');

  if (photo) photo.src = teacher.photo;
  if (name) name.textContent = teacher.name;
  if (role) role.textContent = `${teacher.subject} • ${teacher.role}`;
  if (nip) nip.textContent = teacher.nip;
  if (education) education.textContent = teacher.education;
  if (experience) experience.textContent = teacher.experience;
  if (bio) bio.textContent = teacher.bio;
  if (quote) quote.textContent = `"${teacher.quote}"`;
}

function populateFacilityModal(id) {
  const facility = facilities.find(f => f.id === id);
  if (!facility) return;

  const modal = document.getElementById('facility-detail-modal');
  if (!modal) return;

  const photo = modal.querySelector('#facility-modal-photo');
  const title = modal.querySelector('#facility-modal-title');
  const spec = modal.querySelector('#facility-modal-spec');
  const desc = modal.querySelector('#facility-modal-desc');
  const tagsContainer = modal.querySelector('#facility-modal-tags');

  if (photo) photo.src = facility.photo;
  if (title) title.textContent = facility.name;
  if (spec) spec.textContent = facility.spec;
  if (desc) desc.textContent = facility.desc;

  if (tagsContainer && facility.tags) {
    tagsContainer.innerHTML = facility.tags.map(t => `<span class="badge badge-blue">${t}</span>`).join(' ');
  }
}

function populateEkskulModal(id) {
  const ekskul = extracurriculars.find(e => e.id === id);
  if (!ekskul) return;

  const modal = document.getElementById('ekskul-detail-modal');
  if (!modal) return;

  const photo = modal.querySelector('#ekskul-modal-photo');
  const name = modal.querySelector('#ekskul-modal-name');
  const category = modal.querySelector('#ekskul-modal-category');
  const schedule = modal.querySelector('#ekskul-modal-schedule');
  const coach = modal.querySelector('#ekskul-modal-coach');
  const members = modal.querySelector('#ekskul-modal-members');
  const desc = modal.querySelector('#ekskul-modal-desc');
  const benefitsList = modal.querySelector('#ekskul-modal-benefits');

  if (photo) photo.src = ekskul.photo;
  if (name) name.textContent = ekskul.name;
  if (category) category.textContent = ekskul.categoryLabel;
  if (schedule) schedule.textContent = ekskul.schedule;
  if (coach) coach.textContent = ekskul.coach;
  if (members) members.textContent = ekskul.members;
  if (desc) desc.textContent = ekskul.desc;

  if (benefitsList && ekskul.benefits) {
    benefitsList.innerHTML = ekskul.benefits.map(b => `<li><span style="color:var(--color-primary); font-weight:bold; margin-right:6px;">✓</span> ${b}</li>`).join('');
  }
}

// 5. Dynamic Copyright Year
function initCopyrightYear() {
  const yearEls = document.querySelectorAll('.dynamic-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);
}

// 6. Image Fallback Handling
function initImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
    }, { once: true });
  });
}
