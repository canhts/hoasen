/**
 * ===================================================================
 * KHỞI TẠO THREE.JS SCENE, ÁNH SÁNG, CAMERA & VÒNG LẶP 60FPS
 * ===================================================================
 * - Renderer tối ưu WebGL với bóng mềm & tone mapping ấm áp
 * - Hệ thống ánh sáng ban ngày tự nhiên (HemisphereLight + DirectionalLight)
 * - Quản lý camera mượt mà có damping
 * - Parallax chuột nhẹ nhàng trên desktop
 * - Điều khiển mở tầng (Cutaway) và bật tắt đèn từng phòng
 */

import { initMaterials } from './scene/materials.js';
import { buildExterior } from './scene/exterior.js';
import { buildGroundFloor } from './scene/groundFloor.js';
import { buildSecondFloor } from './scene/secondFloor.js';

const THREE = window.THREE;

export class Scene3D {
  constructor(containerElement) {
    this.container = containerElement;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // Trạng thái camera mục tiêu và hiện tại
    this.cameraPos = new THREE.Vector3(1.8, 6.8, 19.5);
    this.targetCameraPos = new THREE.Vector3(1.8, 6.8, 19.5);

    this.lookAtPos = new THREE.Vector3(2.2, 3.2, 3.5);
    this.targetLookAtPos = new THREE.Vector3(2.2, 3.2, 3.5);

    // Parallax chuột
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };

    this.init();
  }

  init() {
    // 1. Tạo Scene
    this.scene = new THREE.Scene();
    // Màu nền kem êm dịu, hòa cùng giao diện web
    this.scene.background = new THREE.Color(0xFFFDF9);
    this.scene.fog = new THREE.FogExp2(0xFFFDF9, 0.012);

    // 2. Tạo Camera
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 200);
    this.camera.position.copy(this.cameraPos);
    this.camera.lookAt(this.lookAtPos);

    // 3. Tạo WebGLRenderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Ánh sáng ấm áp ban ngày (Daylight Warm Lighting)
    this.setupLighting();

    // 5. Xây dựng mô hình 3D từ các module
    this.materials = initMaterials();
    this.exterior = buildExterior(this.scene, this.materials);
    this.groundFloor = buildGroundFloor(this.scene, this.materials);
    this.secondFloor = buildSecondFloor(this.scene, this.materials);

    // Gom đèn các phòng để điều khiển
    this.allRoomLights = {
      ...this.groundFloor.userData.roomLights,
      ...this.secondFloor.userData.roomLights
    };

    // 6. Lắng nghe sự kiện Resize & Parallax chuột
    this.setupEventListeners();

    // 7. Vòng lặp render
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Ánh sáng bầu trời tự nhiên
    const hemiLight = new THREE.HemisphereLight(0xFFF7ED, 0xD1E7DD, 0.85);
    hemiLight.position.set(0, 30, 0);
    this.scene.add(hemiLight);

    // Ánh nắng mặt trời tạo bóng mềm
    this.sunLight = new THREE.DirectionalLight(0xFFF4E6, 1.25);
    this.sunLight.position.set(16, 26, 20);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 70;
    this.sunLight.shadow.camera.left = -22;
    this.sunLight.shadow.camera.right = 22;
    this.sunLight.shadow.camera.top = 22;
    this.sunLight.shadow.camera.bottom = -16;
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);

    // Đèn phụ dịu (fill light)
    const fillLight = new THREE.DirectionalLight(0xE0F2FE, 0.4);
    fillLight.position.set(-15, 12, -10);
    this.scene.add(fillLight);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    });

    // Parallax chuột nhẹ nhàng trên desktop
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      this.targetMouse.x = nx * 0.8;
      this.targetMouse.y = ny * 0.5;
    });
  }

  // --- HÀM ĐIỀU KHIỂN CUTAWAY & NỘI THẤT (ĐƯỢC GỌI TỪ TIMELINE.JS) ---

  // Mở/đóng cánh cổng sắt
  setGateOpen(progress) {
    // progress từ 0 (hé 20 độ) đến 1 (mở rộng 85 độ)
    const angle = 0.35 + progress * 1.1;
    if (this.exterior.userData.gateLeft) {
      this.exterior.userData.gateLeft.rotation.y = angle;
    }
    if (this.exterior.userData.gateRight) {
      this.exterior.userData.gateRight.rotation.y = -angle;
    }
  }

  // Nhấc Lầu 2 lên (Cutaway để xem Tầng trệt)
  setFloor2Lift(progress) {
    // progress từ 0 (vị trí bình thường y = 0) đến 1 (nhấc cao y = 8.5)
    if (this.secondFloor) {
      this.secondFloor.position.y = progress * 9.0;
      // Khi nhấc lên thì mờ dần để tập trung vào tầng trệt
      this.secondFloor.visible = progress < 0.98;
    }
  }

  // Nhấc Mái Lầu 2 lên (Cutaway để xem Lầu 2)
  setRoofLift(progress) {
    // progress từ 0 đến 1 (mái nhà nhấc lên 6.5 đơn vị)
    const roof = this.secondFloor.userData.roofGroup;
    if (roof) {
      roof.position.y = (3.6 + 3.2) + progress * 6.5;
      roof.visible = progress < 0.96;
    }
  }

  // Bật đèn phòng đang tham quan, giảm độ sáng các phòng khác
  highlightRoomLight(activeRoomName) {
    Object.keys(this.allRoomLights).forEach(name => {
      const light = this.allRoomLights[name];
      if (light) {
        if (name === activeRoomName) {
          light.intensity = 1.0;
          light.distance = 12;
        } else {
          light.intensity = 0.15;
          light.distance = 5;
        }
      }
    });
  }

  // Đặt vị trí mục tiêu cho Camera & LookAt
  setCameraTarget(posX, posY, posZ, lookX, lookY, lookZ) {
    this.targetCameraPos.set(posX, posY, posZ);
    this.targetLookAtPos.set(lookX, lookY, lookZ);
  }

  // Vòng lặp Render 60fps
  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Chuyển động sinh động tự nhiên
    // Mây trôi chậm rãi trên trời
    if (this.exterior.userData.cloudsGroup) {
      this.exterior.userData.cloudsGroup.position.x = (elapsedTime * 0.4) % 36 - 18;
    }

    // Mâm quay đồ chơi xoay chậm
    if (this.exterior.userData.carousel) {
      this.exterior.userData.carousel.rotation.y += 0.01;
    }

    // Tán cây đung đưa nhẹ theo gió
    if (this.exterior.userData.treeGroup) {
      this.exterior.userData.treeGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.03;
    }

    // 2. Parallax chuột mượt mà (chỉ cộng độ lệch nhỏ vào góc nhìn)
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // 3. Damping nội suy vị trí Camera
    this.cameraPos.lerp(this.targetCameraPos, 0.08);
    this.lookAtPos.lerp(this.targetLookAtPos, 0.08);

    // Áp dụng tọa độ camera kèm parallax nhẹ
    this.camera.position.set(
      this.cameraPos.x + this.mouse.x * 0.5,
      this.cameraPos.y + this.mouse.y * 0.3,
      this.cameraPos.z
    );

    this.camera.lookAt(
      this.lookAtPos.x + this.mouse.x * 0.2,
      this.lookAtPos.y,
      this.lookAtPos.z
    );

    this.renderer.render(this.scene, this.camera);
  }
}
