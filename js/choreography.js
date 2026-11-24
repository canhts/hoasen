/**
 * ============================================================================
 * KỊCH BẢN CHUYỂN ĐỘNG & CAMERA 2.5D (GSAP + SCROLLTRIGGER + LENIS)
 * ============================================================================
 * Dùng gsap.matchMedia() để điều phối camera và parallax riêng biệt cho:
 * - Desktop (>= 1024px)
 * - Tablet (768px - 1023px)
 * - Mobile (< 768px)
 */

function computeCameraTransform(cam, vw, vh, minWorldHeight) {
  const scale = Math.min(vw / cam.width, vh / minWorldHeight);
  const screenFocusX = vw * (0.5 + (cam.offsetX || 0));
  const screenFocusY = vh * (0.5 + (cam.offsetY || 0));
  return {
    x: screenFocusX - cam.x * scale,
    y: screenFocusY - cam.y * scale,
    scale,
  };
}

export function initChoreography({ data, onChapterChange }) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Khởi tạo cuộn mượt Lenis (giữ vuốt tự nhiên trên thiết bị cảm ứng)
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

  // Fallback nếu thư viện GSAP chưa tải được
  if (!window.gsap || !window.ScrollTrigger) {
    return {
      scrollToTarget: (selector) => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    };
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const stageViewport = document.getElementById("stage-viewport");
  const svgLayerHost = document.getElementById("svg-scene-host");
  const svgGuideHost = document.getElementById("svg-guide-host");
  const skyLayer = document.getElementById("layer-sky");
  const verandaForeground = document.getElementById("veranda-foreground");
  const floor2Trim = document.getElementById("floor2-front-trim");
  const facadeCurtain = document.getElementById("facade-curtain");
  const gateLeafLeft = document.getElementById("gate-leaf-left");
  const gateLeafRight = document.getElementById("gate-leaf-right");
  const storyPath = document.getElementById("campus-story-path");
  const floatingLotus = document.getElementById("floating-lotus-lead");
  const petalA = document.getElementById("floating-petal-a");
  const petalB = document.getElementById("floating-petal-b");

  const lamps = {
    nt: document.getElementById("lamp-nt-cone"),
    mgb: document.getElementById("lamp-mgb-cone"),
    mgn: document.getElementById("lamp-mgn"),
    mgl: document.getElementById("lamp-mgl"),
  };

  // Chuẩn bị đường nét dẫn chuyện (stroke-dashoffset)
  let pathLength = 0;
  if (storyPath && typeof storyPath.getTotalLength === "function") {
    pathLength = storyPath.getTotalLength();
    gsap.set(storyPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: prefersReducedMotion ? 0 : pathLength,
    });
  }

  // Chuẩn bị danh sách chặng dừng camera
  const chapterGate = data.chapters.find((c) => c.id === "gate");
  const chapterVeranda = data.chapters.find((c) => c.id === "veranda-kitchen");
  const chapterNursery = data.chapters.find((c) => c.id === "nursery");
  const chapterSmall = data.chapters.find((c) => c.id === "preschool-small");
  const chapterPlayground = data.chapters.find((c) => c.id === "playground");
  const chapterStairs = data.chapters.find((c) => c.id === "stairs");
  const chapterFloor2 = data.chapters.find((c) => c.id === "floor2");
  const floor2Nho = chapterFloor2.subClasses[0];
  const floor2Lon = chapterFloor2.subClasses[1];

  // Hàm thiết lập sân khấu theo từng nhóm màn hình bằng gsap.matchMedia()
  const mm = gsap.matchMedia();

  function buildStageTimeline(mode, minWorldHeight, parallaxStrength, triggerStart = "top 88%", triggerEnd = "top 28%") {
    const vw = stageViewport.clientWidth || window.innerWidth;
    const vh = stageViewport.clientHeight || window.innerHeight;

    const camFor = (camObj) => computeCameraTransform(camObj[mode], vw, vh, minWorldHeight);

    const stops = [
      { id: "gate", trigger: '[data-chapter="gate"]', cam: camFor(chapterGate.camera), raw: chapterGate.camera[mode] },
      { id: "veranda-kitchen", trigger: '[data-chapter="veranda-kitchen"]', cam: camFor(chapterVeranda.camera), raw: chapterVeranda.camera[mode] },
      { id: "nursery", trigger: '[data-chapter="nursery"]', cam: camFor(chapterNursery.camera), raw: chapterNursery.camera[mode] },
      { id: "preschool-small", trigger: '[data-chapter="preschool-small"]', cam: camFor(chapterSmall.camera), raw: chapterSmall.camera[mode] },
      { id: "playground", trigger: '[data-chapter="playground"]', cam: camFor(chapterPlayground.camera), raw: chapterPlayground.camera[mode] },
      { id: "stairs", trigger: '[data-chapter="stairs"]', cam: camFor(chapterStairs.camera), raw: chapterStairs.camera[mode] },
      { id: "floor2-nho", trigger: "#floor2-stop-nho", cam: camFor(floor2Nho.camera), raw: floor2Nho.camera[mode] },
      { id: "floor2-lon", trigger: "#floor2-stop-lon", cam: camFor(floor2Lon.camera), raw: floor2Lon.camera[mode] },
    ];

    // Đặt camera ban đầu ở Cổng Hoa Sen
    const init = stops[0].cam;
    gsap.set([svgLayerHost, svgGuideHost], {
      x: init.x,
      y: init.y,
      scale: init.scale,
      transformOrigin: "0 0",
    });

    gsap.set(facadeCurtain, { autoAlpha: 1, y: 0 });
    gsap.set(gateLeafLeft, { x: 0, scaleX: 1, opacity: 1 });
    gsap.set(gateLeafRight, { x: 0, scaleX: 1, opacity: 1 });

    // Nếu người dùng bật reduced motion thì chỉ chuyển cảnh tức thì theo trigger
    if (prefersReducedMotion) {
      stops.forEach((stop) => {
        ScrollTrigger.create({
          trigger: stop.trigger,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            gsap.set([svgLayerHost, svgGuideHost], { x: stop.cam.x, y: stop.cam.y, scale: stop.cam.scale });
            gsap.set(facadeCurtain, { autoAlpha: stop.id === "gate" ? 1 : 0 });
            onChapterChange(stop.id.startsWith("floor2") ? "floor2" : stop.id);
          },
          onEnterBack: () => {
            gsap.set([svgLayerHost, svgGuideHost], { x: stop.cam.x, y: stop.cam.y, scale: stop.cam.scale });
            gsap.set(facadeCurtain, { autoAlpha: stop.id === "gate" ? 1 : 0 });
            onChapterChange(stop.id.startsWith("floor2") ? "floor2" : stop.id);
          },
        });
      });
      return;
    }

    // Timeline đồng bộ cuộn từng cặp chặng liên tiếp (cuộn lên/xuống đảo chiều mượt mà)
    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i];
      const to = stops[i + 1];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: to.trigger,
          start: triggerStart,
          end: triggerEnd,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      // Chuyển động camera mượt mà
      tl.fromTo(
        [svgLayerHost, svgGuideHost],
        { x: from.cam.x, y: from.cam.y, scale: from.cam.scale },
        { x: to.cam.x, y: to.cam.y, scale: to.cam.scale, ease: "power1.inOut", immediateRender: false },
        0
      );

      // Chiều sâu Parallax 2.5D cho Hậu cảnh & Tiền cảnh
      if (skyLayer) {
        tl.fromTo(
          skyLayer,
          { x: (from.raw.x - 2130) * 0.22 * parallaxStrength, y: (from.raw.y - 1280) * 0.14 * parallaxStrength },
          { x: (to.raw.x - 2130) * 0.22 * parallaxStrength, y: (to.raw.y - 1280) * 0.14 * parallaxStrength, ease: "none", immediateRender: false },
          0
        );
      }

      if (verandaForeground) {
        tl.fromTo(
          verandaForeground,
          { x: -(from.raw.x - 1800) * 0.08 * parallaxStrength },
          { x: -(to.raw.x - 1800) * 0.08 * parallaxStrength, ease: "none", immediateRender: false },
          0
        );
      }

      if (floor2Trim) {
        tl.fromTo(
          floor2Trim,
          { x: -(from.raw.x - 2100) * 0.08 * parallaxStrength },
          { x: -(to.raw.x - 2100) * 0.08 * parallaxStrength, ease: "none", immediateRender: false },
          0
        );
      }

      // Chặng 1 -> Chặng 2: Mở hai cánh cổng & vén mặt tiền vào Hiên chính
      if (from.id === "gate" && to.id === "veranda-kitchen") {
        tl.fromTo(gateLeafLeft, { x: 0, scaleX: 1, opacity: 1 }, { x: -165, scaleX: 0.25, opacity: 0.15, ease: "power2.out", immediateRender: false }, 0);
        tl.fromTo(gateLeafRight, { x: 0, scaleX: 1, opacity: 1 }, { x: 165, scaleX: 0.25, opacity: 0.15, ease: "power2.out", immediateRender: false }, 0);
        tl.fromTo(facadeCurtain, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 72, ease: "power2.inOut", immediateRender: false }, 0.24);
      }
    }

    // Bật ánh sáng đèn ấm dịu khi ghé từng lớp học
    const lampTriggers = [
      { el: lamps.nt, trigger: '[data-chapter="nursery"]' },
      { el: lamps.mgb, trigger: '[data-chapter="preschool-small"]' },
      { el: lamps.mgn, trigger: "#floor2-stop-nho" },
      { el: lamps.mgl, trigger: "#floor2-stop-lon" },
    ];
    lampTriggers.forEach(({ el, trigger }) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0.18 },
        {
          opacity: 0.92,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            start: "top 68%",
            end: "center 48%",
            scrub: 0.6,
          },
        }
      );
    });

    // Cánh Hoa Sen trên tường chiếu nghỉ khẽ hé nở khi leo cầu thang
    const muralLeft = document.querySelectorAll(".anim-lotus-petal-left");
    const muralRight = document.querySelectorAll(".anim-lotus-petal-right");
    if (muralLeft.length && muralRight.length) {
      const lotusTl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-chapter="stairs"]',
          start: "top 75%",
          end: "bottom 35%",
          scrub: 0.7,
        },
      });
      lotusTl.to(muralLeft, { rotation: -12, scale: 1.07, ease: "sine.inOut" }, 0);
      lotusTl.to(muralRight, { rotation: 12, scale: 1.07, ease: "sine.inOut" }, 0);
    }

    // Đường nét mảnh & cánh hoa sen trôi theo tiến trình hành trình kiến trúc
    if (storyPath && pathLength > 0) {
      ScrollTrigger.create({
        trigger: "#story-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          storyPath.style.strokeDashoffset = `${pathLength * (1 - p)}`;
          if (floatingLotus) {
            const pt = storyPath.getPointAtLength(p * pathLength);
            const nextPt = storyPath.getPointAtLength(Math.min(pathLength, p * pathLength + 6));
            const angle = (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI + 90;
            floatingLotus.setAttribute("transform", `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
          }
          if (petalA) {
            petalA.setAttribute("transform", `translate(${1700 - p * 420}, ${1360 - Math.sin(p * 8) * 35}) rotate(${p * 120})`);
          }
          if (petalB) {
            petalB.setAttribute("transform", `translate(${2420 - p * 260}, ${960 - p * 280}) rotate(${-p * 150})`);
          }
        },
      });
    }
  }

  // Thiết lập riêng 3 nhóm màn hình chuẩn xác qua gsap.matchMedia()
  mm.add("(min-width: 1024px)", () => {
    buildStageTimeline("desktop", 760, 1, "top 88%", "top 28%");

    // Subtle Mouse Parallax trên PC
    if (!prefersReducedMotion && stageViewport) {
      const stageCanvas = document.getElementById("stage-canvas");
      const skyX = gsap.quickTo(skyLayer, "xPercent", { duration: 0.7, ease: "power2.out" });
      const skyY = gsap.quickTo(skyLayer, "yPercent", { duration: 0.7, ease: "power2.out" });
      const canvasX = gsap.quickTo(stageCanvas, "x", { duration: 0.6, ease: "power2.out" });
      const canvasY = gsap.quickTo(stageCanvas, "y", { duration: 0.6, ease: "power2.out" });

      const handleMouseMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        skyX(-nx * 1.4);
        skyY(-ny * 1.1);
        canvasX(-nx * 14);
        canvasY(-ny * 9);
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  });

  mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
    buildStageTimeline("tablet", 700, 0.55, "top 95%", "top 53%");
  });

  mm.add("(max-width: 767px)", () => {
    buildStageTimeline("mobile", 670, 0.35, "top 95%", "top 52%");
  });

  // Cập nhật active state trên thanh định vị & pill mobile cho cả 8 chặng
  const allChapters = document.querySelectorAll("[data-chapter]");
  allChapters.forEach((chapterEl) => {
    const chId = chapterEl.getAttribute("data-chapter");
    ScrollTrigger.create({
      trigger: chapterEl,
      start: "top 68%",
      end: "bottom 32%",
      onEnter: () => onChapterChange(chId),
      onEnterBack: () => onChapterChange(chId),
    });
  });

  // Hoạt họa cho Chặng 8 (Dây cờ ảnh, Vườn cô giáo & Bưu thiếp)
  if (!prefersReducedMotion) {
    const epilogueVine = document.getElementById("epilogue-vine-path");
    if (epilogueVine && typeof epilogueVine.getTotalLength === "function") {
      const vineLen = epilogueVine.getTotalLength();
      gsap.set(epilogueVine, { strokeDasharray: vineLen, strokeDashoffset: vineLen });
      gsap.to(epilogueVine, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#chapter-epilogue",
          start: "top 80%",
          end: "bottom 85%",
          scrub: 0.9,
        },
      });
    }

    gsap.from(".bunting-photo-card", {
      y: 26,
      opacity: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#photo-bunting-grid",
        start: "top 82%",
        once: true,
      },
    });

    gsap.from(".teacher-petal-card", {
      y: 28,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#teachers-garden-grid",
        start: "top 82%",
        once: true,
      },
    });

    gsap.from(["#mini-gate-art", "#postcard-card"], {
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact-postcard",
        start: "top 84%",
        once: true,
      },
    });
  }

  return {
    scrollToTarget(selector) {
      const targetEl = document.querySelector(selector);
      if (!targetEl) return;
      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -20 });
      } else {
        targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
  };
}
