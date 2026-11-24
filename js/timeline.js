/**
 * ===================================================================
 * ĐỒNG BỘ GSAP SCROLLTRIGGER & HÀNH TRÌNH CAMERA 3D (8 CHẶNG)
 * ===================================================================
 * Định nghĩa chi tiết tọa độ Camera, điểm ngắm LookAt, độ mở Cutaway
 * và đèn phòng cho từng mốc nội dung khi phụ huynh cuộn trang.
 */

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

// BẢNG THÔNG SỐ CAMERA & CUTAWAY CHO 8 CHẶNG HÀNH TRÌNH
export const cameraStops = {
  1: {
    // Chặng 1: Cổng trường & Sảnh chính (Tập trung chính diện cổng, biển hiệu Hoa Sen & cờ Tổ quốc)
    cam: { x: 1.8, y: 6.8, z: 19.5 },
    look: { x: 2.2, y: 3.2, z: 3.5 },
    floor2Lift: 0.0,  // Lầu 2 hạ bình thường
    roofLift: 0.0,    // Mái che đóng kín
    gateOpen: 0.15,   // Cổng hé mở 20 độ chào đón
    activeLight: null
  },
  2: {
    // Chặng 2: Hiên chính, Văn phòng & Góc Bếp thơm (Tầng trệt)
    // Lầu 2 nhấc lên để lộ tầng trệt, nhìn vào Văn phòng và Bếp bên phải
    cam: { x: 6.5, y: 3.8, z: 8.0 },
    look: { x: 5.8, y: 1.6, z: -1.5 },
    floor2Lift: 1.0,  // Nhấc lầu 2
    roofLift: 0.0,
    gateOpen: 0.95,   // Cổng mở rộng
    activeLight: 'vanPhong'
  },
  3: {
    // Chặng 3: Lớp Nhà trẻ (5 - 36 tháng)
    // Camera trượt sang trái vào thẳng phòng Nhà trẻ ở giữa, tránh biển hiệu cổng
    cam: { x: -1.0, y: 2.8, z: 5.2 },
    look: { x: -1.0, y: 1.3, z: -2.5 },
    floor2Lift: 1.0,
    roofLift: 0.0,
    gateOpen: 1.0,
    activeLight: 'nhaTre'
  },
  4: {
    // Chặng 4: Lớp Mẫu giáo bé (3 - 4 tuổi)
    // Camera tiếp tục trượt sang trái thẳng vào lớp Mẫu giáo bé
    cam: { x: -6.0, y: 2.8, z: 5.2 },
    look: { x: -6.0, y: 1.3, z: -2.5 },
    floor2Lift: 1.0,
    roofLift: 0.0,
    gateOpen: 1.0,
    activeLight: 'mauGiaoBe'
  },
  5: {
    // Chặng 5: Sân chơi chính rộn ràng (Ngoài cùng bên trái)
    // Mở rộng góc nhìn toàn sân cỏ, mái che vòm cao, xích đu, cầu trượt
    cam: { x: -12.5, y: 5.6, z: 11.5 },
    look: { x: -12.5, y: 1.8, z: 0.0 },
    floor2Lift: 1.0,
    roofLift: 0.0,
    gateOpen: 1.0,
    activeLight: null
  },
  6: {
    // Chặng 6: Lên Cầu thang Hoa Sen -> Lầu 2: Lớp Mẫu giáo nhỡ (4 - 5 tuổi)
    // Lầu 2 hạ về vị trí, Mái lầu 2 mở ra, camera focus sang bên phải cầu thang
    cam: { x: 10.0, y: 7.2, z: 7.2 },
    look: { x: 10.0, y: 4.8, z: -1.5 },
    floor2Lift: 0.0,  // Lầu 2 hạ xuống
    roofLift: 1.0,    // Mái Lầu 2 nhấc lên để quan sát bên trong
    gateOpen: 0.6,
    activeLight: 'mauGiaoNho'
  },
  7: {
    // Chặng 7: Lầu 2: Lớp Mẫu giáo lớn (5 - 6 tuổi)
    // Góc nhìn chếch nhẹ tránh cột ban công, nhìn rõ bảng chữ cái và bàn học
    cam: { x: 1.5, y: 7.2, z: 7.0 },
    look: { x: 0.5, y: 4.8, z: -1.5 },
    floor2Lift: 0.0,
    roofLift: 1.0,
    gateOpen: 0.6,
    activeLight: 'mauGiaoLon'
  },
  8: {
    // Chặng 8: Kết thúc chuyến tham quan (Toàn cảnh ấm cúng)
    // Mái khép lại, camera lùi ra toàn cảnh lung linh
    cam: { x: 1.5, y: 8.5, z: 23.0 },
    look: { x: 1.5, y: 3.0, z: 0.0 },
    floor2Lift: 0.0,
    roofLift: 0.0,
    gateOpen: 0.35,
    activeLight: null
  }
};

export function initTimeline(scene3d, onStepChange) {
  if (!gsap || !ScrollTrigger) {
    console.warn("GSAP hoặc ScrollTrigger chưa được tải!");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Đối tượng trung gian để GSAP animate mượt mà
  const animState = {
    camX: cameraStops[1].cam.x,
    camY: cameraStops[1].cam.y,
    camZ: cameraStops[1].cam.z,
    lookX: cameraStops[1].look.x,
    lookY: cameraStops[1].look.y,
    lookZ: cameraStops[1].look.z,
    floor2Lift: cameraStops[1].floor2Lift,
    roofLift: cameraStops[1].roofLift,
    gateOpen: cameraStops[1].gateOpen
  };

  // Hàm chuyển đổi camera mượt mà sang chặng đích
  function transitionToStop(stepNum, duration = 1.2) {
    const config = cameraStops[stepNum];
    if (!config) return;

    gsap.killTweensOf(animState);

    gsap.to(animState, {
      camX: config.cam.x,
      camY: config.cam.y,
      camZ: config.cam.z,
      lookX: config.look.x,
      lookY: config.look.y,
      lookZ: config.look.z,
      floor2Lift: config.floor2Lift,
      roofLift: config.roofLift,
      gateOpen: config.gateOpen,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        scene3d.setCameraTarget(
          animState.camX, animState.camY, animState.camZ,
          animState.lookX, animState.lookY, animState.lookZ
        );
        scene3d.setFloor2Lift(animState.floor2Lift);
        scene3d.setRoofLift(animState.roofLift);
        scene3d.setGateOpen(animState.gateOpen);
      }
    });

    scene3d.highlightRoomLight(config.activeLight);

    if (typeof onStepChange === 'function') {
      onStepChange(stepNum);
    }
  }

  // Khởi tạo ScrollTrigger cho từng thẻ nội dung .story-step
  const steps = document.querySelectorAll('.story-step');

  steps.forEach((stepEl, idx) => {
    const stepNum = idx + 1;

    ScrollTrigger.create({
      trigger: stepEl,
      start: "top 60%",
      end: "bottom 60%",
      onEnter: () => transitionToStop(stepNum),
      onEnterBack: () => transitionToStop(stepNum)
    });
  });

  // Hỗ trợ nhảy mượt khi bấm vào Pill Stepper
  return {
    goToStep: (stepNum) => {
      const targetEl = document.querySelector(`.story-step[data-step="${stepNum}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        transitionToStop(stepNum);
      }
    }
  };
}
