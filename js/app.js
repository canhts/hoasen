/**
 * ============================================================================
 * ỨNG DỤNG CHÍNH: RENDER THẺ TẠI CHỖ TRONG KHÔNG GIAN & ĐƯỜNG RAY ĐIỀU PHỐI
 * ============================================================================
 */

import { SCHOOL_DATA } from "./data.js";
import { renderCampusScene } from "./art/scenes.js";
import {
  renderCampusGuideSvg,
  renderEpilogueVineSvg,
  renderLotusGardenDecor,
  renderMiniSunsetGateSvg,
  createTeacherFallbackDataUri,
} from "./art/pathGuide.js";
import { initChoreography } from "./choreography.js";

function escapeHtml(text = "") {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderBadgesHtml(badges = []) {
  if (!badges.length) return "";
  return `
    <div class="badge-row">
      ${badges
        .map(
          (b) =>
            `<span class="story-badge tone-${b.tone || "pink"}">${escapeHtml(b.text)}</span>`
        )
        .join("")}
    </div>
  `;
}

function createPhotoFallbackDataUri(title) {
  const safeTitle = escapeHtml(title).slice(0, 40);
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
    <rect width="640" height="480" fill="#FDF3EE"/>
    <circle cx="320" cy="195" r="78" fill="#F7D1DA"/>
    <path d="M 320 130 C 296 170 296 218 320 250 C 344 218 344 170 320 130 Z" fill="#E87A90"/>
    <path d="M 320 250 C 276 238 250 206 244 170 C 278 176 304 205 320 250 Z" fill="#F29FB1"/>
    <path d="M 320 250 C 364 238 390 206 396 170 C 362 176 336 205 320 250 Z" fill="#F29FB1"/>
    <ellipse cx="320" cy="264" rx="76" ry="14" fill="#52A877" opacity="0.65"/>
    <text x="320" y="340" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="700" fill="#2C2A29">${safeTitle}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function hydrateTopChrome() {
  const { schoolInfo, uiText } = SCHOOL_DATA;
  const logoImg = document.getElementById("brand-logo-img");
  if (logoImg && schoolInfo.logoSrc) logoImg.src = schoolInfo.logoSrc;
  document.getElementById("brand-name").textContent = schoolInfo.shortName;
  document.getElementById("brand-sub").textContent = uiText.brandTag;
  document.getElementById("top-contact-link").textContent = uiText.skipToContact;

  const callWrap = document.getElementById("call-menu-wrap");
  const toggleBtn = document.getElementById("top-call-toggle");
  const popover = document.getElementById("top-call-popover");
  if (toggleBtn && popover && callWrap) {
    const setOpen = (open) => {
      popover.hidden = !open;
      toggleBtn.setAttribute("aria-expanded", String(open));
    };
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(popover.hidden);
    });
    document.addEventListener("click", (e) => {
      if (!popover.hidden && !callWrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !popover.hidden) {
        setOpen(false);
        toggleBtn.focus();
      }
    });
  }
}

/**
 * Render các thẻ Chặng 1 -> Chặng 8 cố định tại chỗ giữa không gian (KHÔNG kéo lên xuống)
 * và render đủ 11 điểm dừng trên đường ray #master-scroll-track
 */
function renderInPlaceCardsAndTrack() {
  const overlayHost = document.getElementById("story-cards-overlay");
  const trackHost = document.getElementById("master-scroll-track");

  const cardItems = [];
  const stepSlots = [];

  SCHOOL_DATA.chapters.forEach((ch) => {
    if (["gallery", "teachers", "contact"].includes(ch.id)) {
      stepSlots.push({ step: ch.id, chapter: ch.id });
      return;
    }

    const sideClass = ch.cardSide === "right" ? "is-side-right" : "is-side-left";
    const highlightsHtml = Array.isArray(ch.highlights)
      ? `<ul class="story-highlights">${ch.highlights
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`
      : "";
    const scrollCueHtml =
      ch.id === "gate"
        ? `<div class="scroll-cue">
             <span>${escapeHtml(SCHOOL_DATA.uiText.scrollHint)}</span>
             <span class="scroll-cue-arrow" aria-hidden="true">↓</span>
           </div>`
        : "";

    cardItems.push({
      cardId: `card-${ch.id}`,
      html: `
        <div class="story-card ${sideClass}" id="card-${ch.id}" data-card-step="${ch.id}">
          <span class="chapter-eyebrow">${escapeHtml(ch.eyebrow)}</span>
          ${
            ch.id === "gate"
              ? `<h1 class="story-title">${escapeHtml(ch.title)}</h1>`
              : `<h2 class="story-title">${escapeHtml(ch.title)}</h2>`
          }
          <p class="story-body">${escapeHtml(ch.story)}</p>
          ${renderBadgesHtml(ch.badges)}
          ${highlightsHtml}
          ${scrollCueHtml}
        </div>`,
    });
    stepSlots.push({ step: ch.id, chapter: ch.id });
  });

  overlayHost.innerHTML = cardItems.map((c) => c.html).join("");
  trackHost.innerHTML = stepSlots
    .map(
      (s) =>
        `<div class="scroll-step-slot" id="step-${s.step}" data-step="${s.step}" data-chapter="${s.chapter}"></div>`
    )
    .join("");
}

function renderEpilogue() {
  const { gallery, teachersSection, contactSection, schoolInfo, uiText } = SCHOOL_DATA;

  document.getElementById("gallery-intro").innerHTML = `
    <span class="chapter-eyebrow">${escapeHtml(gallery.eyebrow)}</span>
    <h2>${escapeHtml(gallery.title)}</h2>
    <p>${escapeHtml(gallery.subtitle)}</p>
  `;

  const photoGrid = document.getElementById("photo-bunting-grid");
  photoGrid.innerHTML = gallery.photos
    .map(
      (item, idx) => `
      <button
        type="button"
        class="bunting-photo-card"
        style="--card-tilt: ${item.tilt || 0}deg; --card-drop: ${item.drop || 0}px;"
        data-photo-index="${idx}"
        aria-label="Phóng to ảnh: ${escapeHtml(item.title)}"
      >
        <span class="wooden-peg" aria-hidden="true"></span>
        <div class="bunting-thumb-wrap">
          <img
            src="${escapeHtml(item.src)}"
            alt="${escapeHtml(item.title)}"
            loading="lazy"
            decoding="async"
          />
          <span class="bunting-photo-tag">${escapeHtml(item.tag)}</span>
        </div>
        <h3 class="bunting-photo-title">${escapeHtml(item.title)}</h3>
        <p class="bunting-photo-caption">${escapeHtml(item.caption)}</p>
      </button>
    `
    )
    .join("");

  photoGrid.querySelectorAll("img").forEach((img, idx) => {
    img.addEventListener(
      "error",
      () => {
        img.src = createPhotoFallbackDataUri(gallery.photos[idx].title);
      },
      { once: true }
    );
  });

  document.getElementById("gallery-note").textContent = uiText.galleryHint;

  document.getElementById("teachers-intro").innerHTML = `
    <span class="chapter-eyebrow">${escapeHtml(teachersSection.eyebrow)}</span>
    <h2>${escapeHtml(teachersSection.title)}</h2>
    <p>${escapeHtml(teachersSection.subtitle)}</p>
  `;

  const teachersGrid = document.getElementById("teachers-garden-grid");
  teachersGrid.innerHTML = teachersSection.groups
    .map((group) => {
      const isSingle = group.teachers.length === 1;
      const avatarsHtml = group.teachers
        .map((t) => {
          const src = t.photo ? escapeHtml(t.photo) : createTeacherFallbackDataUri(t);
          return `
          <div class="petal-avatar-unit">
            <div class="petal-frame">
              <img
                src="${src}"
                alt="${escapeHtml(t.name)} — ${escapeHtml(group.classLabel)}"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span class="teacher-mini-name">${escapeHtml(t.name)}</span>
          </div>`;
        })
        .join("");

      return `
      <article class="teacher-petal-card">
        <div class="teacher-avatars-row ${isSingle ? "is-single" : ""}">
          ${avatarsHtml}
        </div>
        <div class="teacher-info-col">
          <span class="teacher-class-pill">${escapeHtml(group.classLabel)}</span>
          <p class="teacher-quote">“${escapeHtml(group.quote)}”</p>
        </div>
      </article>
    `;
    })
    .join("");

  renderMiniSunsetGateSvg(document.getElementById("mini-gate-art"));

  const contactsHtml = schoolInfo.contacts
    .map(
      (person) => `
      <div class="contact-person-pill">
        <div class="contact-person-meta">
          <strong>${escapeHtml(person.label)}</strong>
          <span>${escapeHtml(person.phoneDisplay)}</span>
        </div>
        <div class="contact-mini-actions">
          <a class="mini-action-btn call" href="${escapeHtml(person.phoneHref)}" aria-label="Gọi ${escapeHtml(person.label)} ${escapeHtml(person.phoneDisplay)}">Gọi</a>
          <a class="mini-action-btn zalo" href="${escapeHtml(person.zaloHref)}" target="_blank" rel="noopener noreferrer" aria-label="Nhắn Zalo ${escapeHtml(person.label)}">Zalo</a>
        </div>
      </div>
    `
    )
    .join("");

  const postcardEl = document.getElementById("postcard-card");
  postcardEl.innerHTML = `
    <span class="postcard-stamp">${escapeHtml(contactSection.stampLabel)}</span>
    <span class="chapter-eyebrow">${escapeHtml(contactSection.eyebrow)}</span>
    <h2>${escapeHtml(schoolInfo.name)}</h2>
    <p class="postcard-sub">${escapeHtml(contactSection.subtitle)}</p>

    <div class="postcard-details">
      <div class="detail-tile is-wide">
        <span class="detail-label">${escapeHtml(contactSection.decisionLabel)}</span>
        <div class="detail-value">${escapeHtml(schoolInfo.decision)}</div>
      </div>

      <div class="detail-tile">
        <span class="detail-label">${escapeHtml(contactSection.addressLabel)}</span>
        <div class="detail-value">${escapeHtml(schoolInfo.address)}</div>
      </div>

      <div class="detail-tile">
        <span class="detail-label">${escapeHtml(contactSection.hoursTitle)}</span>
        <div class="detail-value">
          <span>${escapeHtml(schoolInfo.hours.text)}</span>
        </div>
      </div>
    </div>

    <div class="contacts-split">
      ${contactsHtml}
    </div>

    <div class="postcard-actions">
      <a class="action-btn maps" href="${escapeHtml(schoolInfo.maps.directUrl)}" target="_blank" rel="noopener noreferrer">
        <span>${escapeHtml(schoolInfo.maps.buttonLabel)}</span>
      </a>
    </div>

    <div class="map-embed-frame">
      <iframe
        title="Bản đồ chỉ đường đến ${escapeHtml(schoolInfo.name)}"
        src="${escapeHtml(schoolInfo.maps.embedUrl)}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </div>
  `;

  document.getElementById("storybook-colophon").textContent =
    `${schoolInfo.name} • ${schoolInfo.address} • Chú Cảnh: 0868.474.194 • Cô Hường: 0975.551.545`;
}

function renderStepper(onSelectChapter) {
  const stepper = document.getElementById("journey-stepper");
  stepper.innerHTML = SCHOOL_DATA.chapters
    .map(
      (ch, idx) => `
      <button
        type="button"
        class="stepper-item ${idx === 0 ? "is-active" : ""}"
        data-target-chapter="${ch.id}"
        aria-label="Đi tới ${escapeHtml(ch.navTitle)}"
      >
        <span class="stepper-label">${escapeHtml(ch.stepLabel)}. ${escapeHtml(ch.navTitle)}</span>
        <span class="stepper-dot" aria-hidden="true"></span>
      </button>
    `
    )
    .join("");

  stepper.querySelectorAll(".stepper-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target-chapter");
      onSelectChapter(targetId);
    });
  });
}

function setActiveChapter(chapterId) {
  const chapter = SCHOOL_DATA.chapters.find((c) => c.id === chapterId);
  if (!chapter) return;

  document.querySelectorAll(".stepper-item").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-target-chapter") === chapterId);
  });

  const mobileText = document.getElementById("mobile-step-text");
  if (mobileText) {
    mobileText.textContent = `${SCHOOL_DATA.uiText.stepPrefix} ${chapter.stepLabel} • ${chapter.navTitle}`;
  }
}

function initLightbox() {
  const photos = SCHOOL_DATA.gallery.photos;
  const modal = document.getElementById("photo-lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const tagEl = document.getElementById("lightbox-tag");
  const titleEl = document.getElementById("lightbox-title");
  const descEl = document.getElementById("lightbox-desc");
  const counterEl = document.getElementById("lightbox-counter");
  const figureEl = document.getElementById("lightbox-figure");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");

  let activeIndex = 0;
  let lastTriggerEl = null;
  let touchStartX = 0;

  function renderPhoto(idx) {
    activeIndex = (idx + photos.length) % photos.length;
    const item = photos[activeIndex];
    imgEl.src = item.src;
    imgEl.alt = item.title;
    imgEl.onerror = () => {
      imgEl.src = createPhotoFallbackDataUri(item.title);
    };
    tagEl.textContent = item.tag;
    titleEl.textContent = item.title;
    descEl.textContent = item.caption;
    counterEl.textContent = `${activeIndex + 1} / ${photos.length}`;
  }

  function openLightbox(idx, triggerEl) {
    lastTriggerEl = triggerEl || null;
    renderPhoto(idx);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastTriggerEl && typeof lastTriggerEl.focus === "function") {
      lastTriggerEl.focus();
    }
  }

  document.getElementById("photo-bunting-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".bunting-photo-card");
    if (!card) return;
    const idx = Number(card.getAttribute("data-photo-index")) || 0;
    openLightbox(idx, card);
  });

  closeBtn.addEventListener("click", closeLightbox);
  modal.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => renderPhoto(activeIndex - 1));
  nextBtn.addEventListener("click", () => renderPhoto(activeIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") renderPhoto(activeIndex - 1);
    if (e.key === "ArrowRight") renderPhoto(activeIndex + 1);
  });

  figureEl.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );

  figureEl.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 42) {
        renderPhoto(dx > 0 ? activeIndex - 1 : activeIndex + 1);
      }
    },
    { passive: true }
  );
}

function bootstrap() {
  hydrateTopChrome();
  renderCampusScene(document.getElementById("svg-scene-host"));
  renderCampusGuideSvg(document.getElementById("svg-guide-host"));
  renderEpilogueVineSvg(document.getElementById("epilogue-vine-layer"));
  renderLotusGardenDecor(
    document.getElementById("garden-decor-back"),
    document.getElementById("garden-decor-front")
  );
  renderInPlaceCardsAndTrack();
  renderEpilogue();

  const controller = initChoreography({
    data: SCHOOL_DATA,
    onChapterChange: setActiveChapter,
  });

  renderStepper((targetId) => controller.scrollToTarget(targetId));

  document.querySelector(".brand-pill").addEventListener("click", (e) => {
    e.preventDefault();
    controller.scrollToTarget("gate");
  });
  document.getElementById("top-contact-link").addEventListener("click", (e) => {
    e.preventDefault();
    controller.scrollToTarget("contact");
  });

  initLightbox();
  setActiveChapter("gate");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
