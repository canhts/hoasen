/**
 * ===================================================================
 * QUẢN LÝ GIAO DIỆN & RENDER DỮ LIỆU TỪ DATA.JS (APP CONTROLLER)
 * ===================================================================
 * - Render tự động 8 chặng Timeline, Thẻ lớp học, Ảnh hoạt động, Cô giáo
 * - Điều hướng Pill Stepper dọc màn hình
 * - Lightbox xem ảnh phóng to mượt mà
 * - Tương tác di động, gọi điện, nhắn tin Zalo
 */

import { schoolData } from './data.js';
import { Scene3D } from './scene3d.js';
import { initTimeline } from './timeline.js';

class App {
  constructor() {
    this.currentStep = 1;
    this.lightboxOpen = false;
    this.currentImageIdx = 0;
  }

  init() {
    this.renderHeader();
    this.renderTimelineSteps();
    this.renderPillStepper();
    this.renderGallery();
    this.renderTeachers();
    this.renderContactInfo();
    this.setupLightbox();

    // Khởi tạo 3D Canvas
    const canvasContainer = document.getElementById('webgl-container');
    if (canvasContainer) {
      this.scene3d = new Scene3D(canvasContainer);

      // Khởi tạo ScrollTrigger đồng bộ 3D
      this.timelineController = initTimeline(this.scene3d, (stepNum) => {
        this.updateActiveStep(stepNum);
      });
    }

    this.bindEvents();
  }

  // --- 1. RENDER HEADER & NAVBAR ---
  renderHeader() {
    const headerTitle = document.getElementById('header-school-name');
    if (headerTitle) {
      headerTitle.textContent = schoolData.generalInfo.name;
    }

    const hotlineBtn = document.getElementById('header-hotline-btn');
    if (hotlineBtn) {
      hotlineBtn.href = schoolData.generalInfo.phoneTel;
      hotlineBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span>${schoolData.generalInfo.phone}</span>
      `;
    }

    const zaloBtn = document.getElementById('header-zalo-btn');
    if (zaloBtn) {
      zaloBtn.href = schoolData.generalInfo.zaloUrl;
      zaloBtn.target = "_blank";
      zaloBtn.rel = "noopener noreferrer";
    }
  }

  // --- 2. RENDER 8 THẺ NỘI DUNG TIMELINE ---
  renderTimelineSteps() {
    const stepsContainer = document.getElementById('timeline-steps');
    if (!stepsContainer) return;

    stepsContainer.innerHTML = schoolData.timelineStops.map(stop => {
      let extraHtml = '';

      // Thống kê ở Chặng 1
      if (stop.stats) {
        extraHtml += `
          <div class="step-stats-grid">
            ${stop.stats.map(s => `
              <div class="stat-item">
                <span class="stat-value">${s.value}</span>
                <span class="stat-label">${s.label}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      // Badges ở các lớp học (Đặc biệt: Có WC riêng khép kín cho trẻ)
      if (stop.badges) {
        extraHtml += `
          <div class="step-badges">
            ${stop.badges.map(b => {
              const isWc = b.includes('nhà vệ sinh') || b.includes('WC');
              return `<span class="badge-item ${isWc ? 'badge-highlight-wc' : ''}">${b}</span>`;
            }).join('')}
          </div>
        `;
      }

      // Đặc điểm phòng học
      if (stop.roomFeatures) {
        extraHtml += `
          <ul class="step-features-list">
            ${stop.roomFeatures.map(f => `
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E87A90" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        `;
      }

      // Điểm nổi bật
      if (stop.highlights) {
        extraHtml += `
          <ul class="step-features-list">
            ${stop.highlights.map(h => `
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF78" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        `;
      }

      // Tags
      if (stop.tags) {
        extraHtml += `
          <div class="step-tags">
            ${stop.tags.map(t => `<span class="tag-pill"># ${t}</span>`).join('')}
          </div>
        `;
      }

      // Nút kêu gọi hành động
      if (stop.callToAction) {
        extraHtml += `
          <div class="step-cta-container">
            <button class="btn-step-cta" data-next-step="${stop.stepNumber + 1}">
              ${stop.callToAction}
            </button>
          </div>
        `;
      }

      return `
        <article class="story-step" id="${stop.id}" data-step="${stop.stepNumber}">
          <div class="glass-card">
            <div class="step-header">
              <span class="step-index-pill">Chặng ${stop.stepNumber}</span>
              <span class="step-badge">${stop.badge}</span>
            </div>
            <h2 class="step-title">${stop.title}</h2>
            <h3 class="step-subtitle">${stop.subtitle}</h3>
            <p class="step-desc">${stop.description}</p>
            ${extraHtml}
          </div>
        </article>
      `;
    }).join('');
  }

  // --- 3. RENDER PILL STEPPER DỌC MÀN HÌNH ---
  renderPillStepper() {
    const stepperContainer = document.getElementById('pill-stepper');
    if (!stepperContainer) return;

    stepperContainer.innerHTML = schoolData.timelineStops.map(stop => `
      <button class="stepper-dot ${stop.stepNumber === 1 ? 'active' : ''}" 
              data-step="${stop.stepNumber}" 
              aria-label="Đến chặng ${stop.stepNumber}: ${stop.badge}"
              title="Chặng ${stop.stepNumber}: ${stop.badge}">
        <span class="stepper-tooltip">${stop.badge}</span>
      </button>
    `).join('');

    // Bắt sự kiện bấm nhảy mượt tới chặng
    stepperContainer.querySelectorAll('.stepper-dot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stepNum = parseInt(btn.getAttribute('data-step'), 10);
        if (this.timelineController) {
          this.timelineController.goToStep(stepNum);
        }
      });
    });
  }

  // Cập nhật trạng thái active của Stepper
  updateActiveStep(stepNum) {
    this.currentStep = stepNum;
    const dots = document.querySelectorAll('.stepper-dot');
    dots.forEach(d => {
      const s = parseInt(d.getAttribute('data-step'), 10);
      d.classList.toggle('active', s === stepNum);
    });

    // Cập nhật thanh tiến trình cuộn trên mobile
    const progressFill = document.getElementById('mobile-progress-bar');
    if (progressFill) {
      const pct = ((stepNum - 1) / (schoolData.timelineStops.length - 1)) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  // --- 4. RENDER ALBUM ẢNH CHỤP THẬT (PHOTO GALLERY) ---
  renderGallery() {
    const galleryGrid = document.getElementById('photo-gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = schoolData.photoGallery.map((item, idx) => `
      <figure class="gallery-item" data-idx="${idx}">
        <div class="gallery-img-wrapper">
          <img src="${item.src}" alt="${item.title}" loading="lazy" />
          <div class="gallery-overlay">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>Phóng to</span>
          </div>
        </div>
        <figcaption class="gallery-caption">
          <strong>${item.title}</strong>
          <p>${item.caption}</p>
        </figcaption>
      </figure>
    `).join('');

    // Bấm ảnh để mở Lightbox
    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        this.openLightbox(idx);
      });
    });
  }

  // --- 5. RENDER ĐỘI NGŨ CÔ GIÁO ---
  renderTeachers() {
    const teachersList = document.getElementById('teachers-list');
    if (!teachersList) return;

    teachersList.innerHTML = schoolData.teachers.map(t => `
      <div class="teacher-card">
        <div class="teacher-avatar" style="background-color: ${t.avatarBg}; color: ${t.avatarColor}">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="teacher-content">
          <h4 class="teacher-name">${t.name}</h4>
          <span class="teacher-role">${t.role}</span>
          <span class="teacher-exp">⭐ ${t.experience}</span>
          <p class="teacher-bio">"${t.bio}"</p>
        </div>
      </div>
    `).join('');
  }

  // --- 6. RENDER THÔNG TIN LIÊN HỆ & BẢN ĐỒ ---
  renderContactInfo() {
    const info = schoolData.generalInfo;

    const schoolTitle = document.getElementById('contact-school-name');
    if (schoolTitle) schoolTitle.textContent = info.name;

    const schoolDec = document.getElementById('contact-decision');
    if (schoolDec) schoolDec.textContent = info.decision;

    const schoolAddr = document.getElementById('contact-address');
    if (schoolAddr) schoolAddr.textContent = info.address;

    const pickupMorn = document.getElementById('pickup-morning');
    if (pickupMorn) pickupMorn.textContent = info.pickupHours.morning;

    const pickupAft = document.getElementById('pickup-afternoon');
    if (pickupAft) pickupAft.textContent = info.pickupHours.afternoon;

    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneLink) {
      phoneLink.href = info.phoneTel;
      phoneLink.textContent = info.phone;
    }

    const zaloLink = document.getElementById('contact-zalo-link');
    if (zaloLink) {
      zaloLink.href = info.zaloUrl;
    }

    const mapsBtn = document.getElementById('contact-maps-btn');
    if (mapsBtn) {
      mapsBtn.href = info.googleMapsSearchUrl;
    }

    const mapIframe = document.getElementById('google-map-iframe');
    if (mapIframe) {
      mapIframe.src = info.googleMapsEmbedUrl;
    }
  }

  // --- 7. QUẢN LÝ LIGHTBOX XEM ẢNH ---
  setupLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    if (!lightboxModal) return;

    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevImage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextImage());

    // Đóng khi click ngoài ảnh
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        this.closeLightbox();
      }
    });

    // Phím tắt bàn phím
    window.addEventListener('keydown', (e) => {
      if (!this.lightboxOpen) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });
  }

  openLightbox(idx) {
    this.currentImageIdx = idx;
    this.lightboxOpen = true;
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('open');
      this.updateLightboxContent();
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    this.lightboxOpen = false;
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  prevImage() {
    const total = schoolData.photoGallery.length;
    this.currentImageIdx = (this.currentImageIdx - 1 + total) % total;
    this.updateLightboxContent();
  }

  nextImage() {
    const total = schoolData.photoGallery.length;
    this.currentImageIdx = (this.currentImageIdx + 1) % total;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const captionEl = document.getElementById('lightbox-caption');
    const counterEl = document.getElementById('lightbox-counter');

    const item = schoolData.photoGallery[this.currentImageIdx];
    if (item && imgEl) {
      imgEl.src = item.src;
      imgEl.alt = item.title;
      if (titleEl) titleEl.textContent = item.title;
      if (captionEl) captionEl.textContent = item.caption;
      if (counterEl) counterEl.textContent = `${this.currentImageIdx + 1} / ${schoolData.photoGallery.length}`;
    }
  }

  // --- 8. LIÊN KẾT SỰ KIỆN TỔNG THỂ ---
  bindEvents() {
    // Nút cuộn xuống tiếp tục
    document.querySelectorAll('.btn-step-cta').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextStep = parseInt(btn.getAttribute('data-next-step'), 10);
        if (this.timelineController && nextStep <= schoolData.timelineStops.length) {
          this.timelineController.goToStep(nextStep);
        } else {
          const gallerySection = document.getElementById('gallery-section');
          if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// Khởi chạy ứng dụng khi DOM sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
