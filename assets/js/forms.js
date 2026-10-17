/**
 * Form Validation and Toast Notification Module
 * Provides Frontend Validation, Error Messages, and Transparent Demo Feedback
 */

export class ToastManager {
  constructor() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  show(title, message, type = 'info', duration = 5500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16835D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D6A84F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    }

    toast.innerHTML = `
      <div style="flex-shrink:0;">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    this.container.appendChild(toast);

    // Trigger animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 400);
    }, duration);
  }
}

export function initContactForm(formSelector = '#contact-form') {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const toast = new ToastManager();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const messageInput = form.querySelector('[name="message"]');

    let isValid = true;

    // Reset previous errors
    form.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('is-invalid');
    });

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 4) {
      subjectInput.classList.add('is-invalid');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      toast.show(
        "Formulir Belum Lengkap",
        "Harap periksa kembali kolom yang bertanda merah sebelum mengirim pesan.",
        "info"
      );
      return;
    }

    // Success Simulation Feedback (Explicitly informing user that it's a frontend simulation)
    toast.show(
      "Simulasi Validasi Berhasil!",
      "Pesan Anda berhasil divalidasi pada sisi frontend. Sesuai ketentuan prototipe tanpa backend, pesan ini TIDAK dikirimkan ke server nyata atau pihak sekolah.",
      "success",
      7000
    );

    form.reset();
  });
}
