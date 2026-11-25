/**
 * ============================================================================
 * KỊCH BẢN CHUYỂN ĐỘNG THỐNG NHẤT TOÀN TRANG (GSAP + SCROLLTRIGGER + LENIS)
 * ============================================================================
 * - Cổng chính mở đều hai cánh sang trái & phải khung hình (không biến mất)
 * - Thứ tự tham quan: Cổng -> Văn phòng/Bếp -> Sân chơi -> Nhà trẻ -> Mẫu giáo bé -> Cầu thang -> Lầu 2
 * - Chuyển tiếp liền mạch thống nhất sang Khoảnh khắc -> Giáo viên -> Liên hệ
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

  // Khởi tạo cuộn mượt Lenis (giữ vuốt tự nhiên trên cảm ứng)
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

  function resolveScrollTarget(target) {
    if (typeof target !== "string") return target;
    if (target === "gallery" || target === "teachers" || target === "contact") {
      const sel = window.innerWidth >= 1024 ? `#trigger-${target}` : `#panel-${target}`;
      return document.querySelector(sel);
    }
    if (target.startsWith("#")) return document.querySelector(target);
    return document.querySelector(`#chapter-${target}`);
  }

  // Fallback ngoại tuyến khi không có GSAP CDN
  if (!window.gsap || !window.ScrollTrigger) {
    const stageViewport = document.getElementById("stage-viewport");
    const svgLayerHost = document.getElementById("svg-scene-host");
    const svgGuideHost = document.getElementById("svg-guide-host");
    const facadeCurtain = document.getElementById("facade-curtain");
    const gateDoorLeft = document.getElementById("gate-leaf-left");
    const gateDoorRight = document.getElementById("gate-leaf-right");
    const fallbackTargets = [
      { sel: '[data-chapter="gate"]', id: "gate", cam: data.chapters.find((c) => c.id === "gate").camera },
      { sel: '[data-chapter="veranda-kitchen"]', id: "veranda-kitchen", cam: data.chapters.find((c) => c.id === "veranda-kitchen").camera },
      { sel: '[data-chapter="playground"]', id: "playground", cam: data.chapters.find((c) => c.id === "playground").camera },
      { sel: '[data-chapter="nursery"]', id: "nursery", cam: data.chapters.find((c) => c.id === "nursery").camera },
      { sel: '[data-chapter="preschool-small"]', id: "preschool-small", cam: data.chapters.find((c) => c.id === "preschool-small").camera },
      { sel: '[data-chapter="stairs"]', id: "stairs", cam: data.chapters.find((c) => c.id === "stairs").camera },
      { sel: "#floor2-stop-nho", id: "floor2", cam: data.chapters.find((c) => c.id === "floor2").subClasses[0].camera },
      { sel: "#floor2-stop-lon", id: "floor2", cam: data.chapters.find((c) => c.id === "floor2").subClasses[1].camera },
    ];
    if (svgLayerHost && svgGuideHost && stageViewport) {
      [svgLayerHost, svgGuideHost].forEach((el) => {
        el.style.transition = prefersReducedMotion ? "none" : "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
      });
      const applyCam = (camObj, chId) => {
        const vw = stageViewport.clientWidth || window.innerWidth;
        const vh = stageViewport.clientHeight || window.innerHeight;
        const mode = vw >= 1024 ? "desktop" : vw >= 768 ? "tablet" : "mobile";
        const minH = mode === "desktop" ? 760 : mode === "tablet" ? 700 : 670;
        const t = computeCameraTransform(camObj[mode], vw, vh, minH);
        const tf = `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`;
        svgLayerHost.style.transform = tf;
        svgGuideHost.style.transform = tf;
        if (facadeCurtain) facadeCurtain.style.opacity = chId === "gate" ? "1" : "0";
        if (gateDoorLeft && gateDoorRight) {
          const w = 208 * t.scale;
          gateDoorLeft.style.width = `${w}px`;
          gateDoorRight.style.width = `${w}px`;
          gateDoorLeft.style.opacity = chId === "gate" || chId === "veranda-kitchen" ? "1" : "0";
          gateDoorRight.style.opacity = chId === "gate" || chId === "veranda-kitchen" ? "1" : "0";
        }
        onChapterChange(chId);
      };
      applyCam(fallbackTargets[0].cam, "gate");
      const io = new IntersectionObserver(
        (entries) => {
          const hit = entries.find((e) => e.isIntersecting);
          if (!hit) return;
          const match = fallbackTargets.find((f) => document.querySelector(f.sel) === hit.target);
          if (match) applyCam(match.cam, match.id);
        },
        { threshold: 0.45 }
      );
      fallbackTargets.forEach((f) => {
        const el = document.querySelector(f.sel);
        if (el) io.observe(el);
      });
    }
    return {
      scrollToTarget: (target) => {
        const el = resolveScrollTarget(target);
        if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
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
  const greenCurtains = document.getElementById("facade-green-curtains");
  const outerWalls = document.getElementById("facade-outer-walls");
  const gatePillars = document.getElementById("gate-pillars");
  const gateSignGroup = document.getElementById("gate-sign-group");
  const gateLeafLeft = document.getElementById("gate-leaf-left");
  const gateLeafRight = document.getElementById("gate-leaf-right");
  const storyPath = document.getElementById("campus-story-path");
  const floatingLotus = document.getElementById("floating-lotus-lead");
  const petalA = document.getElementById("floating-petal-a");
  const petalB = document.getElementById("floating-petal-b");

  const epilogueSky = document.getElementById("epilogue-sky-morph");
  const panelGallery = document.getElementById("panel-gallery");
  const panelTeachers = document.getElementById("panel-teachers");
  const panelContact = document.getElementById("panel-contact");

  const lamps = {
    nt: document.getElementById("lamp-nt-cone"),
    mgb: document.getElementById("lamp-mgb-cone"),
    mgn: document.getElementById("lamp-mgn"),
    mgl: document.getElementById("lamp-mgl"),
  };

  let pathLength = 0;
  if (storyPath && typeof storyPath.getTotalLength === "function") {
    pathLength = storyPath.getTotalLength();
    gsap.set(storyPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: prefersReducedMotion ? 0 : pathLength,
    });
  }

  // Lấy cấu hình camera theo thứ tự tham quan mới:
  // Cổng -> Văn phòng & Bếp -> Sân chơi -> Nhà trẻ -> Mẫu giáo bé -> Cầu thang -> Lầu 2
  const chapterGate = data.chapters.find((c) => c.id === "gate");
  const chapterVeranda = data.chapters.find((c) => c.id === "veranda-kitchen");
  const chapterPlayground = data.chapters.find((c) => c.id === "playground");
  const chapterNursery = data.chapters.find((c) => c.id === "nursery");
  const chapterSmall = data.chapters.find((c) => c.id === "preschool-small");
  const chapterStairs = data.chapters.find((c) => c.id === "stairs");
  const chapterFloor2 = data.chapters.find((c) => c.id === "floor2");
  const floor2Nho = chapterFloor2.subClasses[0];
  const floor2Lon = chapterFloor2.subClasses[1];

  const mm = gsap.matchMedia();

  function buildStageTimeline(mode, minWorldHeight, parallaxStrength, triggerStart, triggerEnd) {
    const vw = stageViewport.clientWidth || window.innerWidth;
    const vh = stageViewport.clientHeight || window.innerHeight;
    const camFor = (camObj) => computeCameraTransform(camObj[mode], vw, vh, minWorldHeight);

    const stops = [
      { id: "gate", trigger: '[data-chapter="gate"]', cam: camFor(chapterGate.camera), raw: chapterGate.camera[mode] },
      { id: "veranda-kitchen", trigger: '[data-chapter="veranda-kitchen"]', cam: camFor(chapterVeranda.camera), raw: chapterVeranda.camera[mode] },
      { id: "playground", trigger: '[data-chapter="playground"]', cam: camFor(chapterPlayground.camera), raw: chapterPlayground.camera[mode] },
      { id: "nursery", trigger: '[data-chapter="nursery"]', cam: camFor(chapterNursery.camera), raw: chapterNursery.camera[mode] },
      { id: "preschool-small", trigger: '[data-chapter="preschool-small"]', cam: camFor(chapterSmall.camera), raw: chapterSmall.camera[mode] },
      { id: "stairs", trigger: '[data-chapter="stairs"]', cam: camFor(chapterStairs.camera), raw: chapterStairs.camera[mode] },
      { id: "floor2-nho", trigger: "#floor2-stop-nho", cam: camFor(floor2Nho.camera), raw: floor2Nho.camera[mode] },
      { id: "floor2-lon", trigger: "#floor2-stop-lon", cam: camFor(floor2Lon.camera), raw: floor2Lon.camera[mode] },
    ];

    const init = stops[0].cam;
    gsap.set([svgLayerHost, svgGuideHost], {
      x: init.x,
      y: init.y,
      scale: init.scale,
      transformOrigin: "0 0",
    });

    // Khớp vị trí ban đầu của hai cánh cổng chính vào đúng giữa hai trụ cổng Isometric 30 độ
    const wingW = 74 * init.scale;
    const wingH = 104 * init.scale;
    const gateLeftX = init.x + 1116 * init.scale;
    const gateRightX = init.x + 1188 * init.scale;
    const gateLeftY = init.y + 1312 * init.scale;
    const gateRightY = init.y + 1353 * init.scale;

    if (gateLeafLeft && gateLeafRight) {
      gateLeafLeft.style.width = `${wingW}px`;
      gateLeafLeft.style.height = `${wingH}px`;
      gsap.set(gateLeafLeft, {
        x: gateLeftX,
        y: gateLeftY,
        skewY: 30,
        scale: 1,
        autoAlpha: 1,
        transformOrigin: "0 0",
      });

      gateLeafRight.style.width = `${wingW}px`;
      gateLeafRight.style.height = `${wingH}px`;
      gsap.set(gateLeafRight, {
        x: gateRightX,
        y: gateRightY,
        skewY: 30,
        scale: 1,
        autoAlpha: 1,
        transformOrigin: "0 0",
      });
    }

    gsap.set([facadeCurtain, outerWalls, gatePillars, gateSignGroup], { autoAlpha: 1, y: 0 });
    if (greenCurtains) gsap.set(greenCurtains, { autoAlpha: 0.98, scaleY: 1, transformOrigin: "50% 0%" });

    if (prefersReducedMotion) {
      stops.forEach((stop) => {
        ScrollTrigger.create({
          trigger: stop.trigger,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            gsap.set([svgLayerHost, svgGuideHost], { x: stop.cam.x, y: stop.cam.y, scale: stop.cam.scale });
            gsap.set(facadeCurtain, { autoAlpha: stop.id === "gate" ? 1 : 0 });
            if (gateLeafLeft && gateLeafRight) {
              gsap.set([gateLeafLeft, gateLeafRight], { autoAlpha: stop.id === "gate" ? 1 : 0 });
            }
            onChapterChange(stop.id.startsWith("floor2") ? "floor2" : stop.id);
          },
          onEnterBack: () => {
            gsap.set([svgLayerHost, svgGuideHost], { x: stop.cam.x, y: stop.cam.y, scale: stop.cam.scale });
            gsap.set(facadeCurtain, { autoAlpha: stop.id === "gate" ? 1 : 0 });
            if (gateLeafLeft && gateLeafRight) {
              gsap.set([gateLeafLeft, gateLeafRight], { autoAlpha: stop.id === "gate" ? 1 : 0 });
            }
            onChapterChange(stop.id.startsWith("floor2") ? "floor2" : stop.id);
          },
        });
      });
      return;
    }

    // Kịch bản Scrub liền mạch từng cặp chặng
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

      tl.fromTo(
        [svgLayerHost, svgGuideHost],
        { x: from.cam.x, y: from.cam.y, scale: from.cam.scale },
        { x: to.cam.x, y: to.cam.y, scale: to.cam.scale, ease: "power1.inOut", immediateRender: false },
        0
      );

      if (skyLayer) {
        tl.fromTo(
          skyLayer,
          { x: (from.raw.x - 1185) * 0.18 * parallaxStrength, y: (from.raw.y - 1320) * 0.12 * parallaxStrength },
          { x: (to.raw.x - 1185) * 0.18 * parallaxStrength, y: (to.raw.y - 1320) * 0.12 * parallaxStrength, ease: "none", immediateRender: false },
          0
        );
      }

      if (verandaForeground) {
        tl.fromTo(
          verandaForeground,
          { x: -(from.raw.x - 1185) * 0.04 * parallaxStrength },
          { x: -(to.raw.x - 1185) * 0.04 * parallaxStrength, ease: "none", immediateRender: false },
          0
        );
      }

      if (floor2Trim) {
        tl.fromTo(
          floor2Trim,
          { x: -(from.raw.x - 1800) * 0.04 * parallaxStrength },
          { x: -(to.raw.x - 1800) * 0.04 * parallaxStrength, ease: "none", immediateRender: false },
          0
        );
      }

      // CHẶNG 1 -> CHẶNG 2: Hai cánh cửa cổng mở dần đối xứng sang hai bên khung hình (KHÔNG biến mất, KHÔNG trượt dồn sang phải!)
      if (from.id === "gate" && to.id === "veranda-kitchen") {
        if (gateLeafLeft && gateLeafRight) {
          const openScale = 1.65;
          const openW = wingW * openScale;
          const openY = Math.max(84, vh * 0.48 - (wingH * openScale) * 0.5);
          const openLeftX = -openW * 0.18;
          const openRightX = vw - openW * 0.82;
          tl.fromTo(
            gateLeafLeft,
            { x: gateLeftX, y: gateLeftY, skewY: 30, scale: 1, autoAlpha: 1 },
            { x: openLeftX, y: openY, skewY: 0, scale: openScale, autoAlpha: 1, ease: "power2.inOut", immediateRender: false },
            0
          );
          tl.fromTo(
            gateLeafRight,
            { x: gateRightX, y: gateRightY, skewY: 30, scale: 1, autoAlpha: 1 },
            { x: openRightX, y: openY, skewY: 0, scale: openScale, autoAlpha: 1, ease: "power2.inOut", immediateRender: false },
            0
          );
        }

        if (greenCurtains) {
          tl.fromTo(
            greenCurtains,
            { scaleY: 1, autoAlpha: 0.92 },
            { scaleY: 0.1, autoAlpha: 0, ease: "power2.inOut", immediateRender: false },
            0.08
          );
        }

        tl.fromTo(
          [outerWalls, gatePillars, gateSignGroup],
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: 40, ease: "power2.inOut", immediateRender: false },
          0.2
        );
      }

      // CHẶNG 2 -> CHẶNG 3 (Vào Sân chơi chính): Hai cánh cổng tiếp tục mở thoát ra ngoài hai mép màn hình một cách tự nhiên
      if (from.id === "veranda-kitchen" && to.id === "playground" && gateLeafLeft && gateLeafRight) {
        const openScale = 1.65;
        const openW = wingW * openScale;
        const openLeftX = -openW * 0.18;
        const openRightX = vw - openW * 0.82;
        tl.fromTo(
          gateLeafLeft,
          { x: openLeftX, autoAlpha: 1 },
          { x: -openW - 40, autoAlpha: 1, ease: "power1.in", immediateRender: false },
          0
        );
        tl.fromTo(
          gateLeafRight,
          { x: openRightX, autoAlpha: 1 },
          { x: vw + 40, autoAlpha: 1, ease: "power1.in", immediateRender: false },
          0
        );
      }
    }

    // Đèn ấm dịu bật sáng khi ghé từng lớp học
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

    // Đường nét & cánh hoa sen trôi dọc hành trình kiến trúc
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
            petalA.setAttribute("transform", `translate(${1110 + p * 360}, ${1360 - Math.sin(p * 8) * 35}) rotate(${p * 120})`);
          }
          if (petalB) {
            petalB.setAttribute("transform", `translate(${2420 - p * 260}, ${960 - p * 280}) rotate(${-p * 150})`);
          }
        },
      });
    }
  }

  // KỊCH BẢN CHUYỂN CẢNH THỐNG NHẤT CHO 3 PHẦN CUỐI (KHOẢNH KHẮC -> GIÁO VIÊN -> LIÊN HỆ)
  mm.add("(min-width: 1024px)", () => {
    buildStageTimeline("desktop", 760, 1, "top 88%", "top 28%");

    // Subtle Mouse Parallax trên PC
    let cleanupMouse = () => {};
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
      cleanupMouse = () => window.removeEventListener("mousemove", handleMouseMove);
    }

    // Chuyển cảnh thống nhất trên sân khấu ghim Desktop cho Chặng 8 -> 9 -> 10
    if (panelGallery && panelTeachers && panelContact) {
      if (prefersReducedMotion) {
        gsap.set(panelGallery, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
        gsap.set([panelTeachers, panelContact], { autoAlpha: 0, pointerEvents: "none" });
        ScrollTrigger.create({
          trigger: "#trigger-gallery",
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.set(panelGallery, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set([panelTeachers, panelContact], { autoAlpha: 0, pointerEvents: "none" });
            onChapterChange("gallery");
          },
          onEnterBack: () => {
            gsap.set(panelGallery, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set([panelTeachers, panelContact], { autoAlpha: 0, pointerEvents: "none" });
            onChapterChange("gallery");
          },
        });
        ScrollTrigger.create({
          trigger: "#trigger-teachers",
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.set(panelTeachers, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set([panelGallery, panelContact], { autoAlpha: 0, pointerEvents: "none" });
            onChapterChange("teachers");
          },
          onEnterBack: () => {
            gsap.set(panelTeachers, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set([panelGallery, panelContact], { autoAlpha: 0, pointerEvents: "none" });
            onChapterChange("teachers");
          },
        });
        ScrollTrigger.create({
          trigger: "#trigger-contact",
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.set(panelContact, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set([panelGallery, panelTeachers], { autoAlpha: 0, pointerEvents: "none" });
            onChapterChange("contact");
          },
          onEnterBack: () => {
            gsap.set(panelContact, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set([panelGallery, panelTeachers], { autoAlpha: 0, pointerEvents: "none" });
            onChapterChange("contact");
          },
        });
      } else {
        // Trạng thái đầu của Epilogue: Khoảnh khắc sẵn sàng hiện lên êm ái khi rời Lầu 2
        gsap.set(panelGallery, { autoAlpha: 0, y: 65, scale: 0.96, pointerEvents: "none" });
        gsap.set(panelTeachers, { autoAlpha: 0, y: 65, scale: 0.96, pointerEvents: "none" });
        gsap.set(panelContact, { autoAlpha: 0, y: 65, scale: 0.96, pointerEvents: "none" });

        // Timeline thống nhất duy nhất điều phối Khoảnh khắc -> Giáo viên -> Liên hệ (không xung đột tween)
        const epilogueMaster = gsap.timeline({
          scrollTrigger: {
            trigger: "#epilogue-scroll-triggers",
            start: "top 95%",
            end: "bottom bottom",
            scrub: 0.85,
          },
        });

        // Pha 1 (0.00 -> 0.20): Hiện Khoảnh khắc treo ngẫu nhiên
        epilogueMaster
          .to(panelGallery, { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.2, ease: "power2.out" }, 0)
          // Pha 2 (0.20 -> 0.36): Dừng nhẹ ngắm Khoảnh khắc
          .to(panelGallery, { y: 0, duration: 0.16 }, 0.2)
          // Pha 3 (0.36 -> 0.56): Khoảnh khắc tan lên, Vườn Giáo viên nở vào
          .to(panelGallery, { autoAlpha: 0, y: -55, scale: 0.96, pointerEvents: "none", duration: 0.18, ease: "power1.inOut" }, 0.36)
          .to(panelTeachers, { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.2, ease: "power2.out" }, 0.4)
          // Pha 4 (0.60 -> 0.72): Dừng nhẹ ngắm Vườn Giáo viên
          .to(panelTeachers, { y: 0, duration: 0.12 }, 0.6)
          // Pha 5 (0.72 -> 0.94): Giáo viên tan lên, Bưu thiếp chiều nắng ấm Liên hệ trượt vào
          .to(panelTeachers, { autoAlpha: 0, y: -55, scale: 0.96, pointerEvents: "none", duration: 0.18, ease: "power1.inOut" }, 0.72)
          .to(panelContact, { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.22, ease: "power2.out" }, 0.76);

        if (epilogueSky) {
          epilogueMaster
            .to(
              epilogueSky,
              { background: "linear-gradient(180deg, #F6FAF6 0%, #EAF4ED 58%, #F4EFE6 100%)", duration: 0.22 },
              0.36
            )
            .to(
              epilogueSky,
              { background: "linear-gradient(180deg, #FDF6EE 0%, #FAE8D6 62%, #F6DEC5 100%)", duration: 0.22 },
              0.72
            );
        }
      }
    }

    return () => {
      cleanupMouse();
      gsap.set([panelGallery, panelTeachers, panelContact], { clearProps: "all" });
    };
  });

  // Tablet & Mobile: Chuyển cảnh Scrub mềm mại liên kết 3 phần cuối không đứt gãy
  mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
    buildStageTimeline("tablet", 700, 0.55, "top 95%", "top 53%");
    if (!prefersReducedMotion) {
      [panelGallery, panelTeachers, panelContact].forEach((panel) => {
        if (!panel) return;
        gsap.fromTo(
          panel,
          { y: 42, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 92%",
              end: "top 48%",
              scrub: 0.7,
            },
          }
        );
      });
    }
  });

  mm.add("(max-width: 767px)", () => {
    buildStageTimeline("mobile", 670, 0.35, "top 95%", "top 52%");
    if (!prefersReducedMotion) {
      [panelGallery, panelTeachers, panelContact].forEach((panel) => {
        if (!panel) return;
        gsap.fromTo(
          panel,
          { y: 36, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 92%",
              end: "top 52%",
              scrub: 0.7,
            },
          }
        );
      });
    }
  });

  // Theo dõi trạng thái đang xem của toàn bộ 10 chặng
  const stageChapters = document.querySelectorAll(".story-chapter[data-chapter]");
  stageChapters.forEach((chapterEl) => {
    const chId = chapterEl.getAttribute("data-chapter");
    ScrollTrigger.create({
      trigger: chapterEl,
      start: "top 68%",
      end: "bottom 32%",
      onEnter: () => onChapterChange(chId),
      onEnterBack: () => onChapterChange(chId),
    });
  });

  // Theo dõi active state cho 3 cảnh cuối tùy theo Desktop vs Tablet/Mobile
  mm.add("(min-width: 1024px)", () => {
    ["gallery", "teachers", "contact"].forEach((id) => {
      ScrollTrigger.create({
        trigger: `#trigger-${id}`,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => onChapterChange(id),
        onEnterBack: () => onChapterChange(id),
      });
    });
  });

  mm.add("(max-width: 1023px)", () => {
    ["gallery", "teachers", "contact"].forEach((id) => {
      ScrollTrigger.create({
        trigger: `#panel-${id}`,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => onChapterChange(id),
        onEnterBack: () => onChapterChange(id),
      });
    });
  });

  // Đường dây dẫn chuyện nối Khoảnh khắc -> Giáo viên -> Liên hệ
  if (!prefersReducedMotion) {
    const epilogueVine = document.getElementById("epilogue-vine-path");
    if (epilogueVine && typeof epilogueVine.getTotalLength === "function") {
      const vineLen = epilogueVine.getTotalLength();
      gsap.set(epilogueVine, { strokeDasharray: vineLen, strokeDashoffset: vineLen });
      gsap.to(epilogueVine, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#epilogue-journey",
          start: "top 80%",
          end: "bottom 85%",
          scrub: 0.9,
        },
      });
    }
  }

  return {
    scrollToTarget(target) {
      const targetEl = resolveScrollTarget(target);
      if (!targetEl) return;
      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -10 });
      } else {
        targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
  };
}
