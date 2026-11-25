/**
 * ============================================================================
 * KỊCH BẢN SÂN KHẤU THỐNG NHẤT DUY NHẤT (SINGLE PINNED MASTER TIMELINE)
 * ============================================================================
 * - 2 cánh cổng trượt mở theo đúng góc 30° dọc 2 trụ cổng và DỪNG TẠI 2 TRỤ
 * - Các thẻ Chương 1 -> 7 xuất hiện TẠI CHỖ giữa không gian (không kéo lên xuống)
 * - Chuyển tiếp Sơ đồ Nhà trẻ -> Khoảnh khắc -> Giáo viên -> Liên hệ mượt mà tại chỗ
 */

const COS30 = 0.8660254;
const SIN30 = 0.5;

function computeCameraTransform(cam, vw, vh, minWorldHeight, isSplitMobile) {
  const stageH = isSplitMobile ? vh * 0.5 : vh;
  const scale = Math.min(vw / cam.width, stageH / minWorldHeight);
  const screenFocusX = vw * (0.5 + (isSplitMobile ? 0 : cam.offsetX || 0));
  const screenFocusY = stageH * (0.5 + (isSplitMobile ? 0 : cam.offsetY || 0));
  return {
    x: screenFocusX - cam.x * scale,
    y: screenFocusY - cam.y * scale,
    scale,
  };
}

export function initChoreography({ data, onChapterChange }) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lenis = null;
  if (typeof window.Lenis === "function" && !prefersReducedMotion) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
    });

    if (window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
    }

    if (window.gsap) {
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    }
  }

  function resolveStepSlot(target) {
    if (!target) return null;
    const key = String(target).replace(/^#?(chapter-|step-)/, "");
    if (key === "floor2") return document.getElementById("step-floor2-nho");
    return document.getElementById(`step-${key}`) || document.querySelector(`[data-step="${key}"]`);
  }

  // Fallback ngoại tuyến khi không có GSAP
  if (!window.gsap || !window.ScrollTrigger) {
    const cards = Array.from(document.querySelectorAll(".story-card"));
    const panels = Array.from(document.querySelectorAll(".epilogue-scene-panel"));
    const stageCanvas = document.getElementById("stage-canvas");
    const svgLayerHost = document.getElementById("svg-scene-host");
    const svgGuideHost = document.getElementById("svg-guide-host");
    const showStep = (stepKey) => {
      const isEpilogue = ["gallery", "teachers", "contact"].includes(stepKey);
      if (stageCanvas) stageCanvas.style.opacity = isEpilogue ? "0" : "1";
      cards.forEach((c) => {
        c.style.opacity = c.getAttribute("data-card-step") === stepKey ? "1" : "0";
        c.style.pointerEvents = c.getAttribute("data-card-step") === stepKey ? "auto" : "none";
      });
      panels.forEach((p) => {
        p.style.opacity = p.getAttribute("data-epilogue-panel") === stepKey ? "1" : "0";
        p.style.pointerEvents = p.getAttribute("data-epilogue-panel") === stepKey ? "auto" : "none";
      });
      onChapterChange(stepKey);
    };
    showStep("gate");
    if (svgLayerHost && svgGuideHost) {
      const t = computeCameraTransform(data.chapters[0].camera.desktop, window.innerWidth, window.innerHeight, 760, false);
      svgLayerHost.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`;
      svgGuideHost.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) showStep(hit.target.getAttribute("data-step"));
      },
      { threshold: 0.45 }
    );
    document.querySelectorAll(".scroll-step-slot").forEach((s) => io.observe(s));
    return {
      scrollToTarget: (target) => {
        const slot = resolveStepSlot(target);
        if (slot) slot.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
      },
    };
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const stageViewport = document.getElementById("stage-viewport");
  const skyBackdrop = document.getElementById("stage-sky-backdrop");
  const stageCanvas = document.getElementById("stage-canvas");
  const svgLayerHost = document.getElementById("svg-scene-host");
  const svgGuideHost = document.getElementById("svg-guide-host");
  const skyLayer = document.getElementById("layer-sky");
  const groundStageGroup = document.getElementById("ground-stage-group");
  const facadeCurtain = document.getElementById("facade-curtain");
  const floor2Iso = document.getElementById("floor-2-iso");
  const floor2Badges = document.getElementById("floor2-room-badges");
  const groundBadges = document.getElementById("ground-room-badges");
  const gateLeafLeft = document.getElementById("gate-leaf-left");
  const gateLeafRight = document.getElementById("gate-leaf-right");
  const storyPath = document.getElementById("campus-story-path");
  const floatingLotus = document.getElementById("floating-lotus-lead");
  const epilogueVineLayer = document.getElementById("epilogue-vine-layer");

  const panelGallery = document.getElementById("panel-gallery");
  const panelTeachers = document.getElementById("panel-teachers");
  const panelContact = document.getElementById("panel-contact");

  const roomBadges = Array.from(document.querySelectorAll(".iso-room-badge")).map((el) => ({
    el,
    step: el.getAttribute("data-room-step"),
    fullWidth: parseFloat(el.getAttribute("data-full-width")) || 200,
    iconX: -80,
    rect: el.querySelector(".iso-badge-rect"),
    icon: el.querySelector(".iso-badge-icon"),
    text: el.querySelector(".iso-badge-text"),
  }));

  function measureRoomBadges() {
    const iconW = 14;
    const gap = 8;
    const padX = 18;
    roomBadges.forEach((b) => {
      if (!b.text || typeof b.text.getComputedTextLength !== "function") return;
      const textLen = b.text.getComputedTextLength() || b.fullWidth - 52;
      const contentW = iconW + gap + textLen;
      b.fullWidth = Math.max(88, Math.ceil(contentW + padX * 2));
      b.iconX = +(-contentW / 2 + iconW / 2).toFixed(1);
      const textX = +(-contentW / 2 + iconW + gap).toFixed(1);
      b.el.setAttribute("data-full-width", String(b.fullWidth));
      b.text.setAttribute("x", String(textX));
    });
  }
  measureRoomBadges();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      measureRoomBadges();
    });
  }

  let currentBadgeStep = null;
  function setActiveRoomBadges(stepKey, immediate = false) {
    if (stepKey === currentBadgeStep) return;
    currentBadgeStep = stepKey;
    roomBadges.forEach(({ el, step, fullWidth, iconX, rect, icon, text }) => {
      const active = step === stepKey;
      el.classList.toggle("is-expanded", active);
      const targetX = active ? -fullWidth / 2 : -19;
      const targetW = active ? fullWidth : 38;
      const targetIconX = active ? iconX : 0;
      const dur = immediate ? 0 : 0.42;

      if (rect) {
        gsap.to(rect, {
          attr: { x: targetX, width: targetW },
          duration: dur,
          ease: active ? "back.out(1.2)" : "power2.inOut",
          overwrite: "auto",
        });
      }
      if (icon) {
        gsap.to(icon, {
          x: targetIconX,
          duration: dur,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (text) {
        gsap.to(text, {
          autoAlpha: active ? 1 : 0,
          x: active ? 0 : -6,
          duration: immediate ? 0 : active ? 0.28 : 0.16,
          delay: immediate || !active ? 0 : 0.1,
          overwrite: "auto",
        });
      }
    });
  }

  const lamps = {
    nt: document.getElementById("lamp-nt-cone"),
    mgb: document.getElementById("lamp-mgb-cone"),
    mgn: document.getElementById("lamp-mgn"),
    mgl: document.getElementById("lamp-mgl"),
  };

  let pathLength = 0;
  let stopRatios = [0, 0.16, 0.34, 0.44, 0.54, 0.68, 0.85, 1];
  if (storyPath && typeof storyPath.getTotalLength === "function") {
    pathLength = storyPath.getTotalLength();
    const rawRatios = storyPath.getAttribute("data-stop-ratios");
    if (rawRatios) {
      try {
        const parsed = JSON.parse(rawRatios);
        if (Array.isArray(parsed) && parsed.length === 8) stopRatios = parsed;
      } catch {}
    }
  }

  function applyCursorRatio(ratio) {
    if (!storyPath || pathLength <= 0) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    if (floatingLotus) {
      const pt = storyPath.getPointAtLength(clamped * pathLength);
      floatingLotus.setAttribute("transform", `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`);
    }
  }

  const chGate = data.chapters.find((c) => c.id === "gate");
  const chVeranda = data.chapters.find((c) => c.id === "veranda-kitchen");
  const chPlayground = data.chapters.find((c) => c.id === "playground");
  const chNursery = data.chapters.find((c) => c.id === "nursery");
  const chSmall = data.chapters.find((c) => c.id === "preschool-small");
  const chStairs = data.chapters.find((c) => c.id === "stairs");
  const floor2Nho = data.chapters.find((c) => c.id === "floor2-nho");
  const floor2Lon = data.chapters.find((c) => c.id === "floor2-lon");

  const cardsMap = {
    gate: document.getElementById("card-gate"),
    "veranda-kitchen": document.getElementById("card-veranda-kitchen"),
    playground: document.getElementById("card-playground"),
    nursery: document.getElementById("card-nursery"),
    "preschool-small": document.getElementById("card-preschool-small"),
    stairs: document.getElementById("card-stairs"),
    "floor2-nho": document.getElementById("card-floor2-nho"),
    "floor2-lon": document.getElementById("card-floor2-lon"),
  };

  const mm = gsap.matchMedia();

  function buildMasterTimeline(mode, minWorldHeight, parallaxStrength, isSplitMobile) {
    const vw = stageViewport.clientWidth || window.innerWidth;
    const vh = stageViewport.clientHeight || window.innerHeight;
    const camFor = (camObj) => computeCameraTransform(camObj[mode], vw, vh, minWorldHeight, isSplitMobile);

    const stops = [
      { key: "gate", ch: "gate", cam: camFor(chGate.camera), raw: chGate.camera[mode] },
      { key: "veranda-kitchen", ch: "veranda-kitchen", cam: camFor(chVeranda.camera), raw: chVeranda.camera[mode] },
      { key: "playground", ch: "playground", cam: camFor(chPlayground.camera), raw: chPlayground.camera[mode] },
      { key: "nursery", ch: "nursery", cam: camFor(chNursery.camera), raw: chNursery.camera[mode] },
      { key: "preschool-small", ch: "preschool-small", cam: camFor(chSmall.camera), raw: chSmall.camera[mode] },
      { key: "stairs", ch: "stairs", cam: camFor(chStairs.camera), raw: chStairs.camera[mode] },
      { key: "floor2-nho", ch: "floor2-nho", cam: camFor(floor2Nho.camera), raw: floor2Nho.camera[mode] },
      { key: "floor2-lon", ch: "floor2-lon", cam: camFor(floor2Lon.camera), raw: floor2Lon.camera[mode] },
    ];

    // Trạng thái ban đầu: Chặng 1 (Cổng Hoa Sen đóng khít & hàng rào rõ 100%)
    const init = stops[0].cam;
    gsap.set([svgLayerHost, svgGuideHost], {
      x: init.x,
      y: init.y,
      scale: init.scale,
      transformOrigin: "0 0",
    });
    gsap.set(stageCanvas, { autoAlpha: 1, scale: 1 });
    gsap.set([gateLeafLeft, gateLeafRight], { x: 0, y: 0, autoAlpha: 1 });
    if (facadeCurtain) gsap.set(facadeCurtain, { opacity: 1 });
    if (floor2Iso || floor2Badges) gsap.set([floor2Iso, floor2Badges].filter(Boolean), { x: 0, y: 0 });
    currentBadgeStep = null;
    setActiveRoomBadges("gate", true);
    const cursorState = { ratio: 0 };
    applyCursorRatio(prefersReducedMotion ? 1 : 0);

    // Ẩn tất cả thẻ trừ thẻ đầu tiên
    Object.entries(cardsMap).forEach(([k, el]) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: k === "gate" ? 1 : 0,
        scale: k === "gate" ? 1 : 0.96,
        pointerEvents: k === "gate" ? "auto" : "none",
      });
    });

    gsap.set([panelGallery, panelTeachers, panelContact], {
      autoAlpha: 0,
      scale: 0.96,
      pointerEvents: "none",
    });
    if (epilogueVineLayer) gsap.set(epilogueVineLayer, { autoAlpha: 0 });
    if (groundBadges) gsap.set(groundBadges, { autoAlpha: 1 });
    if (groundStageGroup) gsap.set(groundStageGroup, { opacity: 1 });
    if (skyBackdrop) {
      gsap.set(skyBackdrop, {
        background: "linear-gradient(180deg, #FCF9F4 0%, #FBF3E7 58%, #F5EBDE 100%)",
      });
    }

    if (prefersReducedMotion) {
      const allSteps = [...stops.map((s) => s.key), "gallery", "teachers", "contact"];
      allSteps.forEach((stepKey, idx) => {
        ScrollTrigger.create({
          trigger: `#step-${stepKey}`,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (!self.isActive) return;
            const isEpi = ["gallery", "teachers", "contact"].includes(stepKey);
            gsap.set(stageCanvas, { autoAlpha: isEpi ? 0 : 1 });
            if (!isEpi && stops[idx]) {
              const c = stops[idx].cam;
              gsap.set([svgLayerHost, svgGuideHost], { x: c.x, y: c.y, scale: c.scale });
              const open = idx > 0;
              gsap.set(gateLeafLeft, { x: open ? -92 * COS30 : 0, y: open ? -92 * SIN30 : 0 });
              gsap.set(gateLeafRight, { x: open ? 92 * COS30 : 0, y: open ? 92 * SIN30 : 0 });
              if (facadeCurtain) gsap.set(facadeCurtain, { opacity: open ? 0.3 : 1 });
              const onFloor2 = stepKey === "floor2-nho" || stepKey === "floor2-lon";
              if (floor2Iso || floor2Badges) {
                gsap.set([floor2Iso, floor2Badges].filter(Boolean), {
                  x: onFloor2 ? -520 * COS30 : 0,
                  y: onFloor2 ? 520 * SIN30 : 0,
                });
              }
              if (groundBadges) gsap.set(groundBadges, { autoAlpha: onFloor2 ? 0 : 1 });
              if (groundStageGroup) gsap.set(groundStageGroup, { opacity: onFloor2 ? 0.3 : 1 });
              applyCursorRatio(stopRatios[Math.min(idx, stopRatios.length - 1)]);
            }
            Object.entries(cardsMap).forEach(([k, el]) => {
              if (!el) return;
              gsap.set(el, { autoAlpha: k === stepKey ? 1 : 0, pointerEvents: k === stepKey ? "auto" : "none" });
            });
            [panelGallery, panelTeachers, panelContact].forEach((p) => {
              if (!p) return;
              const match = p.getAttribute("data-epilogue-panel") === stepKey;
              gsap.set(p, { autoAlpha: match ? 1 : 0, pointerEvents: match ? "auto" : "none" });
            });
            setActiveRoomBadges(stepKey, true);
            onChapterChange(stepKey);
          },
        });
      });
      return;
    }

    // MỘT TIMELINE DUY NHẤT ĐỒNG BỘ TOÀN BỘ 11 ĐIỂM DỪNG (0 -> 10)
    // Mỗi đoạn có nhịp chuyển (0.55) và nhịp dừng đọc êm (0.45)
    const master = gsap.timeline({
      onUpdate: () => applyCursorRatio(cursorState.ratio),
      scrollTrigger: {
        trigger: "#master-scroll-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.75,
        invalidateOnRefresh: true,
      },
    });

    // Bước 0 -> 7: Di chuyển bản đồ Isometric, con trỏ đồng bộ chính xác từng chặng & crossfade thẻ tại chỗ
    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i];
      const to = stops[i + 1];
      const tStart = i + 0.35; // Cho phép người dùng đứng đọc ở bước i trước khi chuyển sang i+1

      // Con trỏ hành trình đi từ đúng mốc dừng chặng i sang đúng mốc dừng chặng i+1
      master.to(
        cursorState,
        { ratio: stopRatios[i + 1], duration: 0.65, ease: "power1.inOut" },
        tStart
      );

      // Camera trượt mượt
      master.to(
        [svgLayerHost, svgGuideHost],
        { x: to.cam.x, y: to.cam.y, scale: to.cam.scale, duration: 0.65, ease: "power1.inOut" },
        tStart
      );

      if (skyLayer) {
        master.to(
          skyLayer,
          {
            x: (to.raw.x - 1185) * 0.16 * parallaxStrength,
            y: (to.raw.y - 1320) * 0.1 * parallaxStrength,
            duration: 0.65,
            ease: "none",
          },
          tStart
        );
      }

      // Thẻ cũ tan nhẹ tại chỗ, thẻ mới hiện lên tại chỗ (KHÔNG trượt lên xuống!)
      const fromCard = cardsMap[from.key];
      const toCard = cardsMap[to.key];
      if (fromCard) {
        master.to(
          fromCard,
          { autoAlpha: 0, scale: 0.96, pointerEvents: "none", duration: 0.28, ease: "power1.in" },
          tStart
        );
      }
      if (toCard) {
        master.fromTo(
          toCard,
          { autoAlpha: 0, scale: 0.96, pointerEvents: "none" },
          { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: 0.32, ease: "power2.out" },
          tStart + 0.32
        );
      }

      // CHẶNG 1 -> CHẶNG 2:
      // 1) Con trỏ vừa xuất phát là 2 cánh cổng trượt mở ngay lập tức theo đúng góc 30° về 2 bên trụ
      // 2) Khi con trỏ đi qua cổng vào bên trong, khu vực cổng & hàng rào mờ dần còn 30% để nhìn xuyên vào hành lang
      if (from.key === "gate" && to.key === "veranda-kitchen") {
        master.to(
          gateLeafLeft,
          { x: -92 * COS30, y: -92 * SIN30, duration: 0.3, ease: "power2.out" },
          0.04
        );
        master.to(
          gateLeafRight,
          { x: 92 * COS30, y: 92 * SIN30, duration: 0.3, ease: "power2.out" },
          0.04
        );
        if (facadeCurtain) {
          master.to(
            facadeCurtain,
            { opacity: 0.3, duration: 0.36, ease: "power1.inOut" },
            tStart + 0.08
          );
        }
      }

      // CHẶNG 6 (Cầu thang chữ U) -> CHẶNG 7 (Lầu 2):
      // Toàn bộ Lầu 2 trượt ra phía trước (+520 theo trục V) ngang hàng khít với tầng trệt!
      // Khi cuộn xuống lại trệt, GSAP tự đảo ngược đưa Lầu 2 lệch lại về sau để nhìn rõ bên dưới.
      if (from.key === "stairs" && to.key === "floor2-nho") {
        const f2Targets = [floor2Iso, floor2Badges].filter(Boolean);
        if (f2Targets.length) {
          master.to(
            f2Targets,
            { x: -520 * COS30, y: 520 * SIN30, duration: 0.62, ease: "power2.inOut" },
            tStart
          );
        }
        if (groundBadges) {
          master.to(groundBadges, { autoAlpha: 0, duration: 0.25, ease: "power1.inOut" }, tStart);
        }
        if (groundStageGroup) {
          master.to(groundStageGroup, { opacity: 0.3, duration: 0.5, ease: "power1.inOut" }, tStart + 0.06);
        }
      }

      // Bật ánh sáng đèn ấm dịu khi vào các lớp học
      const lampMap = {
        nursery: lamps.nt,
        "preschool-small": lamps.mgb,
        "floor2-nho": lamps.mgn,
        "floor2-lon": lamps.mgl,
      };
      if (lampMap[to.key]) {
        master.to(lampMap[to.key], { opacity: 0.92, duration: 0.4 }, tStart + 0.2);
      }
      if (lampMap[from.key]) {
        master.to(lampMap[from.key], { opacity: 0.22, duration: 0.35 }, tStart);
      }

      // Nhãn phòng: thu gọn phòng cũ về icon tròn, mở rộng viên nhộng tên đầy đủ (icon & chữ căn giữa) khi tới phòng mới
      roomBadges.forEach(({ step, fullWidth, iconX, rect, icon, text }) => {
        if (step === from.key) {
          if (text) master.to(text, { autoAlpha: 0, x: -6, duration: 0.16, ease: "power1.in" }, tStart);
          if (rect) master.to(rect, { attr: { x: -19, width: 38 }, duration: 0.26, ease: "power2.inOut" }, tStart + 0.04);
          if (icon) master.to(icon, { x: 0, duration: 0.26, ease: "power2.inOut" }, tStart + 0.04);
        } else if (step === to.key) {
          if (rect) {
            master.to(
              rect,
              { attr: { x: -fullWidth / 2, width: fullWidth }, duration: 0.34, ease: "back.out(1.2)" },
              tStart + 0.26
            );
          }
          if (icon) {
            master.to(icon, { x: iconX, duration: 0.34, ease: "power2.out" }, tStart + 0.26);
          }
          if (text) {
            master.to(text, { autoAlpha: 1, x: 0, duration: 0.24, ease: "power2.out" }, tStart + 0.38);
          }
        }
      });
    }

    // CHẶNG 7 (Lầu 2) -> CHẶNG 8 (Khoảnh khắc): Chuyển cảnh mượt mà tại chỗ (KHÔNG kéo lên xuống!)
    const tToGallery = 7.35;
    master
      .to(cardsMap["floor2-lon"], { autoAlpha: 0, scale: 0.95, pointerEvents: "none", duration: 0.3, ease: "power1.in" }, tToGallery)
      .to(stageCanvas, { autoAlpha: 0, scale: 0.9, duration: 0.52, ease: "power2.inOut" }, tToGallery)
      .to(epilogueVineLayer, { autoAlpha: 1, duration: 0.45, ease: "power1.out" }, tToGallery + 0.15)
      .fromTo(
        panelGallery,
        { autoAlpha: 0, scale: 0.95, pointerEvents: "none" },
        { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: 0.42, ease: "power2.out" },
        tToGallery + 0.25
      );

    // CHẶNG 8 (Khoảnh khắc) -> CHẶNG 9 (Giáo viên): Tan mượt trong cùng sân khấu
    const tToTeachers = 8.35;
    master
      .to(panelGallery, { autoAlpha: 0, scale: 0.95, pointerEvents: "none", duration: 0.32, ease: "power1.inOut" }, tToTeachers)
      .fromTo(
        panelTeachers,
        { autoAlpha: 0, scale: 0.95, pointerEvents: "none" },
        { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: 0.38, ease: "power2.out" },
        tToTeachers + 0.26
      );
    if (skyBackdrop) {
      master.to(
        skyBackdrop,
        { background: "linear-gradient(180deg, #F6FAF6 0%, #EAF4ED 58%, #F4EFE6 100%)", duration: 0.45 },
        tToTeachers
      );
    }

    // CHẶNG 9 (Giáo viên) -> CHẶNG 10 (Liên hệ): Chuyển tiếp mượt sang Bưu thiếp chiều nắng ấm
    const tToContact = 9.35;
    master
      .to(panelTeachers, { autoAlpha: 0, scale: 0.95, pointerEvents: "none", duration: 0.32, ease: "power1.inOut" }, tToContact)
      .fromTo(
        panelContact,
        { autoAlpha: 0, scale: 0.95, pointerEvents: "none" },
        { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: 0.38, ease: "power2.out" },
        tToContact + 0.26
      );
    if (skyBackdrop) {
      master.to(
        skyBackdrop,
        { background: "linear-gradient(180deg, #FDF6EE 0%, #FAE8D6 62%, #F6DEC5 100%)", duration: 0.45 },
        tToContact
      );
    }

    // Neo điểm cuối nhẹ nhàng để trang kết thúc ổn định
    master.to({}, { duration: 0.35 }, 9.75);
  }

  // Thiết lập cho 3 nhóm màn hình qua gsap.matchMedia()
  mm.add("(min-width: 1024px)", () => {
    buildMasterTimeline("desktop", 760, 1, false);

    if (!prefersReducedMotion && stageViewport) {
      const skyX = gsap.quickTo(skyLayer, "xPercent", { duration: 0.7, ease: "power2.out" });
      const skyY = gsap.quickTo(skyLayer, "yPercent", { duration: 0.7, ease: "power2.out" });
      const handleMouseMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        skyX(-nx * 1.2);
        skyY(-ny * 0.9);
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  });

  mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
    buildMasterTimeline("tablet", 640, 0.5, true);
  });

  mm.add("(max-width: 767px)", () => {
    buildMasterTimeline("mobile", 580, 0.3, true);
  });

  // Cập nhật active dot trên thanh định vị & pill Mobile theo từng slot trên đường ray
  document.querySelectorAll(".scroll-step-slot").forEach((slotEl) => {
    const chId = slotEl.getAttribute("data-chapter");
    ScrollTrigger.create({
      trigger: slotEl,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => onChapterChange(chId),
      onEnterBack: () => onChapterChange(chId),
    });
  });

  return {
    scrollToTarget(target) {
      const slot = resolveStepSlot(target);
      if (!slot) return;
      // Đặt vị trí cuộn vào giữa đoạn dừng của slot để thẻ & cảnh khớp 100%
      const rectTop = slot.offsetTop;
      const offsetY = target === "gate" ? 0 : slot.offsetHeight * 0.36;
      const destY = Math.max(0, rectTop + offsetY);
      if (lenis) {
        lenis.scrollTo(destY);
      } else {
        window.scrollTo({ top: destY, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
  };
}
