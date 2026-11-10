/**
 * =========================================================================
 * BẢO TÀNG LỊCH SỬ SỐ 3D - ĐỘI ẤP BẮC
 * HỆ THỐNG AI NHẬN DIỆN BÀN TAY ĐIỀU KHIỂN KHÔNG CẦN CHẠM
 * Tích hợp MediaPipe Tasks Vision (HandLandmarker) + Three.js Raycaster
 * =========================================================================
 */

(function () {
  'use strict';

  // Trạng thái hệ thống
  const State = {
    isRunning: false,
    isModelLoading: false,
    handLandmarker: null,
    stream: null,
    video: null,
    canvas: null,
    ctx: null,
    cursor: null,
    cursorRing: null,
    cursorDot: null,
    cursorLabel: null,
    cursorRipple: null,
    pipContainer: null,
    guideModal: null,
    statusBadge: null,
    gestureBadge: null,
    animFrameId: null,
    lastVideoTime: -1,

    // Tọa độ làm mượt (Exponential Moving Average)
    smoothX: window.innerWidth / 2,
    smoothY: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    // State machine cho cử chỉ PINCH
    isPinching: false,
    lastPinchTime: 0,
    pinchCooldown: 380, // ms giữa 2 lần click

    // State machine cho cử chỉ SWIPE
    lastSwipeTime: 0,
    swipeCooldown: 600, // ms giữa 2 lần vuốt
    xHistory: [],

    // Hover target hiện tại
    hoveredItem: null,
    hoveredElement: null,

    // Cài đặt vùng nhận diện (margin để người dùng không cần với tay ra tận viền)
    margin: 0.15,
    previewVisible: true
  };

  /**
   * Khởi tạo giao diện DOM (Con trỏ Hologram, Cửa sổ PiP, Nút điều khiển, Modal hướng dẫn)
   */
  function initDOM() {
    if (document.getElementById('ai-hand-controller-root')) return;

    const root = document.createElement('div');
    root.id = 'ai-hand-controller-root';
    root.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;font-family:"Be Vietnam Pro",sans-serif;';

    // 1. Con trỏ Hologram
    const cursor = document.createElement('div');
    cursor.id = 'ai-hand-cursor';
    cursor.style.cssText = `
      position: absolute;
      top: 0; left: 0;
      width: 44px; height: 44px;
      margin-top: -22px; margin-left: -22px;
      pointer-events: none;
      display: none;
      z-index: 100000;
      transition: transform 0.1s ease-out;
      transform: translate3d(-100px, -100px, 0);
    `;

    // Vòng tròn phát sáng ngoài
    const cursorRing = document.createElement('div');
    cursorRing.style.cssText = `
      width: 100%; height: 100%;
      border-radius: 50%;
      border: 2px solid #00f0ff;
      box-shadow: 0 0 20px #00f0ff, inset 0 0 10px rgba(0, 240, 255, 0.4);
      box-sizing: border-box;
      transition: all 0.15s ease;
      animation: cursorPulse 2s infinite ease-in-out;
    `;

    // Chấm laser trung tâm
    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
      position: absolute;
      top: 50%; left: 50%;
      width: 8px; height: 8px;
      margin-top: -4px; margin-left: -4px;
      border-radius: 50%;
      background: #00f0ff;
      box-shadow: 0 0 12px #ffffff;
      box-sizing: border-box;
    `;

    // Nhãn tooltip hiển thị đối tượng đang hover
    const cursorLabel = document.createElement('div');
    cursorLabel.style.cssText = `
      position: absolute;
      top: 52px; left: 50%;
      transform: translateX(-50%);
      background: rgba(4, 14, 34, 0.92);
      border: 1px solid #00f0ff;
      border-radius: 8px;
      padding: 4px 10px;
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.7);
      display: none;
      letter-spacing: 0.04em;
    `;

    // Sóng xung kích khi PINCH
    const cursorRipple = document.createElement('div');
    cursorRipple.style.cssText = `
      position: absolute;
      top: 50%; left: 50%;
      width: 10px; height: 10px;
      margin-top: -5px; margin-left: -5px;
      border-radius: 50%;
      border: 2px solid #38bdf8;
      opacity: 0;
      pointer-events: none;
    `;

    cursor.appendChild(cursorRing);
    cursor.appendChild(cursorDot);
    cursor.appendChild(cursorLabel);
    cursor.appendChild(cursorRipple);
    root.appendChild(cursor);

    // 2. Cửa sổ PiP xem trước Webcam (góc dưới phải)
    const pip = document.createElement('div');
    pip.id = 'ai-hand-pip';
    pip.style.cssText = `
      position: fixed;
      bottom: 20px; right: 20px;
      width: 220px; height: 165px;
      background: rgba(3, 10, 24, 0.94);
      border: 1.5px solid #00f0ff;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 240, 255, 0.35);
      overflow: hidden;
      display: none;
      flex-direction: column;
      pointer-events: auto;
      z-index: 99998;
      backdrop-filter: blur(10px);
    `;

    // Header của cửa sổ PiP
    const pipHeader = document.createElement('div');
    pipHeader.style.cssText = `
      padding: 6px 10px;
      background: linear-gradient(90deg, rgba(0, 240, 255, 0.2) 0%, rgba(4, 16, 36, 0.9) 100%);
      border-bottom: 1px solid rgba(0, 240, 255, 0.3);
      display: flex; align-items: center; justify-content: space-between;
      font-size: 11px; font-weight: 800; color: #00f0ff;
    `;
    pipHeader.innerHTML = `
      <span style="display:flex;align-items:center;gap:6px;">
        <span style="width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
        AI WEBCAM PREVIEW
      </span>
      <div style="display:flex;align-items:center;gap:6px;">
        <span id="ai-hand-gesture-badge" style="background:rgba(0,240,255,0.15);border:1px solid #00f0ff;border-radius:6px;padding:1px 6px;font-size:10px;color:#a5f3fc;">CHỜ</span>
        <button id="ai-hand-pip-close" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;font-size:13px;padding:0 3px;">✕</button>
      </div>
    `;

    // Vùng chứa Video & Canvas vẽ khung xương bàn tay
    const pipBody = document.createElement('div');
    pipBody.style.cssText = 'position:relative;width:100%;flex:1;background:#01040a;overflow:hidden;';

    const video = document.createElement('video');
    video.id = 'ai-hand-video';
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.style.cssText = `
      width: 100%; height: 100%;
      object-fit: cover;
      transform: scaleX(-1); /* Lật gương webcam */
      opacity: 0.85;
    `;

    const canvas = document.createElement('canvas');
    canvas.id = 'ai-hand-canvas';
    canvas.width = 220; canvas.height = 135;
    canvas.style.cssText = `
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
    `;

    pipBody.appendChild(video);
    pipBody.appendChild(canvas);
    pip.appendChild(pipHeader);
    pip.appendChild(pipBody);
    root.appendChild(pip);

    // 3. Modal hướng dẫn cử chỉ
    const guideModal = document.createElement('div');
    guideModal.id = 'ai-hand-guide-modal';
    guideModal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(3, 8, 20, 0.88); backdrop-filter: blur(12px);
      display: none; align-items: center; justify-content: center;
      padding: 16px; z-index: 100005; pointer-events: auto;
    `;

    guideModal.innerHTML = `
      <div style="width:100%;max-width:680px;background:linear-gradient(145deg,rgba(8,20,44,0.96) 0%,rgba(4,12,28,0.98) 100%);border:2px solid #00f0ff;border-radius:20px;box-shadow:0 0 45px rgba(0,240,255,0.4),0 30px 80px rgba(0,0,0,0.95);overflow:hidden;color:#f0fdfa;">
        <div style="padding:16px 22px;background:linear-gradient(90deg,rgba(0,240,255,0.2) 0%,rgba(6,24,52,0.8) 100%);border-bottom:1.5px solid rgba(0,240,255,0.4);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:24px;">🖐️</span>
            <div>
              <div style="font-size:11px;color:#38bdf8;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;">HỆ THỐNG AI NHẬN DIỆN BÀN TAY</div>
              <h3 style="margin:0;font-size:18px;color:#ffffff;font-weight:800;">HƯỚNG DẪN ĐIỀU KHIỂN KHÔNG CẦN CHẠM</h3>
            </div>
          </div>
          <button id="ai-guide-close-btn" style="width:34px;height:34px;border-radius:50%;background:rgba(0,240,255,0.12);border:1.5px solid #00f0ff;color:#00f0ff;cursor:pointer;font-size:16px;font-weight:800;">✕</button>
        </div>
        <div style="padding:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;">
          <!-- Card 1: Point -->
          <div style="background:rgba(4,16,36,0.85);border:1px solid rgba(0,240,255,0.3);border-radius:14px;padding:14px;display:flex;gap:12px;align-items:flex-start;">
            <div style="font-size:32px;background:rgba(0,240,255,0.12);border-radius:12px;padding:8px;border:1px solid #00f0ff;">☝️</div>
            <div>
              <div style="color:#00f0ff;font-weight:800;font-size:14px;">1. DI CHUYỂN CON TRỎ (POINT)</div>
              <div style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-top:4px;">Duỗi thẳng ngón trỏ, các ngón khác co tự nhiên. Di chuyển bàn tay để lướt con trỏ hologram trên sa bàn và hiện vật.</div>
            </div>
          </div>
          <!-- Card 2: Pinch -->
          <div style="background:rgba(4,16,36,0.85);border:1px solid rgba(0,240,255,0.3);border-radius:14px;padding:14px;display:flex;gap:12px;align-items:flex-start;">
            <div style="font-size:32px;background:rgba(0,240,255,0.12);border-radius:12px;padding:8px;border:1px solid #00f0ff;">🤏</div>
            <div>
              <div style="color:#38bdf8;font-weight:800;font-size:14px;">2. CHỌN / BẤM NÚT (PINCH)</div>
              <div style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-top:4px;">Chụm đầu ngón cái và ngón trỏ lại với nhau để chọn mốc lịch sử, mở tủ kính hiện vật hoặc bấm các nút điều khiển.</div>
            </div>
          </div>
          <!-- Card 3: Open Palm -->
          <div style="background:rgba(4,16,36,0.85);border:1px solid rgba(0,240,255,0.3);border-radius:14px;padding:14px;display:flex;gap:12px;align-items:flex-start;">
            <div style="font-size:32px;background:rgba(0,240,255,0.12);border-radius:12px;padding:8px;border:1px solid #00f0ff;">✋</div>
            <div>
              <div style="color:#34d399;font-weight:800;font-size:14px;">3. TẠM DỪNG (OPEN PALM)</div>
              <div style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-top:4px;">Xòe bàn tay để tạm dừng thao tác chọn, cho phép di chuyển an toàn mà không kích hoạt nhầm các nút.</div>
            </div>
          </div>
          <!-- Card 4: Swipe -->
          <div style="background:rgba(4,16,36,0.85);border:1px solid rgba(0,240,255,0.3);border-radius:14px;padding:14px;display:flex;gap:12px;align-items:flex-start;">
            <div style="font-size:32px;background:rgba(0,240,255,0.12);border-radius:12px;padding:8px;border:1px solid #00f0ff;">👋</div>
            <div>
              <div style="color:#fbbf24;font-weight:800;font-size:14px;">4. CHUYỂN ẢNH (SWIPE)</div>
              <div style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-top:4px;">Khi bảng Hologram đang mở, vuốt bàn tay sang trái hoặc phải để chuyển xem ảnh tư liệu trước / tiếp theo.</div>
            </div>
          </div>
        </div>
        <div style="padding:14px 22px;background:rgba(2,8,22,0.98);border-top:1px solid rgba(0,240,255,0.3);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:12px;color:#94a3b8;">💡 Đảm bảo webcam có ánh sáng rõ để nhận diện bàn tay tốt nhất.</span>
          <button id="ai-guide-ok-btn" style="padding:8px 22px;background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#ffffff;border:1px solid #38bdf8;border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;">ĐÃ HIỂU</button>
        </div>
      </div>
    `;
    root.appendChild(guideModal);

    // 4. Thanh điều khiển nổi góc trên (Floating Top Bar Button Pill)
    const controlPill = document.createElement('div');
    controlPill.id = 'ai-hand-control-pill';
    controlPill.style.cssText = `
      position: fixed;
      top: 14px; right: 280px;
      display: flex; align-items: center; gap: 8px;
      background: rgba(3, 10, 26, 0.92);
      border: 1.5px solid #00f0ff;
      border-radius: 24px;
      padding: 4px 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 240, 255, 0.3);
      z-index: 10000;
      pointer-events: auto;
      backdrop-filter: blur(8px);
    `;

    controlPill.innerHTML = `
      <button id="ai-hand-toggle-btn" style="
        display: flex; align-items: center; gap: 7px;
        background: transparent; border: none;
        color: #f0fdfa; font-size: 12px; font-weight: 800;
        cursor: pointer; padding: 4px 8px; border-radius: 16px;
        transition: all 0.2s ease;
      ">
        <span id="ai-hand-status-dot" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#94a3b8;box-shadow:0 0 6px #94a3b8;"></span>
        <span id="ai-hand-toggle-label">BẬT ĐIỀU KHIỂN TAY</span>
      </button>
      <div style="width:1px;height:18px;background:rgba(0,240,255,0.3);"></div>
      <button id="ai-hand-guide-btn" title="Hướng dẫn cử chỉ bàn tay" style="
        background: transparent; border: none;
        color: #38bdf8; font-size: 13px; font-weight: 800;
        cursor: pointer; padding: 4px 6px;
      ">❓ Hướng Dẫn</button>
    `;
    root.appendChild(controlPill);

    document.body.appendChild(root);

    // Lưu các tham chiếu
    State.cursor = cursor;
    State.cursorRing = cursorRing;
    State.cursorDot = cursorDot;
    State.cursorLabel = cursorLabel;
    State.cursorRipple = cursorRipple;
    State.pipContainer = pip;
    State.guideModal = guideModal;
    State.video = video;
    State.canvas = canvas;
    State.ctx = canvas.getContext('2d');
    State.statusBadge = document.getElementById('ai-hand-status-dot');
    State.gestureBadge = document.getElementById('ai-hand-gesture-badge');

    // Sự kiện nút bấm
    document.getElementById('ai-hand-toggle-btn').addEventListener('click', toggleCamera);
    document.getElementById('ai-hand-guide-btn').addEventListener('click', openGuideModal);
    document.getElementById('ai-guide-close-btn').addEventListener('click', closeGuideModal);
    document.getElementById('ai-guide-ok-btn').addEventListener('click', closeGuideModal);
    document.getElementById('ai-hand-pip-close').addEventListener('click', () => {
      State.pipContainer.style.display = 'none';
      State.previewVisible = false;
    });

    // Thêm animation CSS vào head
    if (!document.getElementById('ai-hand-animations')) {
      const style = document.createElement('style');
      style.id = 'ai-hand-animations';
      style.textContent = `
        @keyframes cursorPulse {
          0%, 100% { box-shadow: 0 0 16px #00f0ff, inset 0 0 8px rgba(0, 240, 255, 0.4); }
          50% { box-shadow: 0 0 28px #00f0ff, inset 0 0 14px rgba(0, 240, 255, 0.7); }
        }
        @keyframes pinchRipple {
          0% { width: 10px; height: 10px; margin-top: -5px; margin-left: -5px; opacity: 1; border-color: #38bdf8; }
          100% { width: 70px; height: 70px; margin-top: -35px; margin-left: -35px; opacity: 0; border-color: #00f0ff; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function openGuideModal() {
    if (State.guideModal) State.guideModal.style.display = 'flex';
  }

  function closeGuideModal() {
    if (State.guideModal) State.guideModal.style.display = 'none';
  }

  /**
   * Khởi tạo Model MediaPipe HandLandmarker
   */
  async function loadHandLandmarkerModel() {
    if (State.handLandmarker) return State.handLandmarker;
    if (State.isModelLoading) return null;

    State.isModelLoading = true;
    updateStatus('loading', 'ĐANG TẢI MODEL AI...');

    try {
      if (typeof window.Vision === 'undefined') {
        throw new Error('Chưa tìm thấy thư viện Vision. Đang thử tải lại vision_bundle.js...');
      }

      const { FilesetResolver, HandLandmarker } = window.Vision;

      // Cố gắng tải WASM từ thư mục local trước, nếu không được thì fallback CDN
      let vision = null;
      try {
        vision = await FilesetResolver.forVisionTasks('./assets/wasm');
      } catch (wasmErr) {
        console.warn('WASM local fallback sang CDN:', wasmErr);
        vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm');
      }

      // Đường dẫn model local
      const modelPath = './assets/models/hand_landmarker.task';

      // Khởi tạo HandLandmarker với GPU delegate (fallback CPU nếu GPU không hỗ trợ)
      try {
        State.handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: modelPath,
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
      } catch (gpuErr) {
        console.warn('Khởi tạo GPU thất bại, chuyển sang CPU:', gpuErr);
        State.handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: modelPath,
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
      }

      console.log('MediaPipe HandLandmarker đã sẵn sàng!');
      State.isModelLoading = false;
      return State.handLandmarker;
    } catch (err) {
      State.isModelLoading = false;
      console.error('Lỗi khởi tạo HandLandmarker:', err);
      updateStatus('error', 'LỖI TẢI MODEL AI');
      alert('Không thể tải model AI nhận diện bàn tay: ' + err.message);
      return null;
    }
  }

  /**
   * Bật Webcam & Bắt đầu nhận diện
   */
  async function startCamera() {
    if (State.isRunning) return;

    initDOM();
    updateStatus('loading', 'ĐANG XIN QUYỀN CAMERA...');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Trình duyệt không hỗ trợ truy cập Webcam (getUserMedia).');
      }

      // Xin quyền sử dụng webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      State.stream = stream;
      State.video.srcObject = stream;

      await new Promise((resolve) => {
        State.video.onloadedmetadata = () => {
          State.video.play().then(resolve);
        };
      });

      // Tải model nếu chưa có
      const landmarker = await loadHandLandmarkerModel();
      if (!landmarker) {
        stopCamera();
        return;
      }

      State.isRunning = true;
      State.cursor.style.display = 'block';
      State.pipContainer.style.display = 'flex';
      State.previewVisible = true;
      updateStatus('active', 'TẮT CAMERA');

      // Bắt đầu vòng lặp xử lý nhận diện
      runDetectionLoop();
    } catch (err) {
      console.error('Lỗi kết nối camera:', err);
      stopCamera();
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        alert('Trình duyệt đã từ chối quyền truy cập Camera. Vui lòng nhấn vào biểu tượng ổ khóa/camera trên thanh địa chỉ URL của trình duyệt để CẤP QUYỀN CAMERA cho trang web.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        alert('Không tìm thấy thiết bị Webcam trên máy tính của bạn. Vui lòng kết nối webcam và thử lại.');
      } else {
        alert('Lỗi khởi động Webcam: ' + err.message);
      }
    }
  }

  /**
   * Tắt Webcam & Giải phóng tài nguyên
   */
  function stopCamera() {
    State.isRunning = false;
    if (State.animFrameId) {
      cancelAnimationFrame(State.animFrameId);
      State.animFrameId = null;
    }

    if (State.stream) {
      State.stream.getTracks().forEach(track => track.stop());
      State.stream = null;
    }

    if (State.video) {
      State.video.srcObject = null;
    }

    if (State.cursor) State.cursor.style.display = 'none';
    if (State.pipContainer) State.pipContainer.style.display = 'none';

    updateStatus('idle', 'BẬT ĐIỀU KHIỂN TAY');
  }

  function toggleCamera() {
    if (State.isRunning) {
      stopCamera();
    } else {
      startCamera();
    }
  }

  function updateStatus(type, label) {
    const dot = document.getElementById('ai-hand-status-dot');
    const lbl = document.getElementById('ai-hand-toggle-label');
    if (!dot || !lbl) return;

    lbl.textContent = label;
    if (type === 'active') {
      dot.style.background = '#10b981';
      dot.style.boxShadow = '0 0 10px #10b981';
    } else if (type === 'loading') {
      dot.style.background = '#38bdf8';
      dot.style.boxShadow = '0 0 10px #38bdf8';
    } else if (type === 'error') {
      dot.style.background = '#ef4444';
      dot.style.boxShadow = '0 0 10px #ef4444';
    } else {
      dot.style.background = '#94a3b8';
      dot.style.boxShadow = '0 0 6px #94a3b8';
    }
  }

  /**
   * Khoảng cách Euclidean giữa 2 điểm
   */
  function dist(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = (p1.z || 0) - (p2.z || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Vòng lặp nhận diện cử chỉ bàn tay thời gian thực
   */
  function runDetectionLoop() {
    if (!State.isRunning) return;

    const video = State.video;
    if (video.currentTime !== State.lastVideoTime && video.readyState >= 2 && State.handLandmarker) {
      State.lastVideoTime = video.currentTime;
      const startTimeMs = performance.now();

      try {
        const results = State.handLandmarker.detectForVideo(video, startTimeMs);
        processHandResults(results);
      } catch (err) {
        console.warn('Lỗi xử lý frame MediaPipe:', err);
      }
    }

    State.animFrameId = requestAnimationFrame(runDetectionLoop);
  }

  /**
   * Xử lý kết quả nhận diện bàn tay
   */
  function processHandResults(results) {
    // Xóa canvas vẽ khung xương preview
    const ctx = State.ctx;
    const canvas = State.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!results || !results.landmarks || results.landmarks.length === 0) {
      if (State.gestureBadge) State.gestureBadge.textContent = 'KHÔNG THẤY TAY';
      if (State.cursorLabel) State.cursorLabel.style.display = 'none';
      return;
    }

    const landmarks = results.landmarks[0]; // Bàn tay chính
    drawHandSkeleton(ctx, landmarks, canvas.width, canvas.height);

    // 1. Tọa độ đầu ngón trỏ (Landmark 8)
    const indexTip = landmarks[8];
    const thumbTip = landmarks[4];
    const wrist = landmarks[0];
    const middleMcp = landmarks[9];

    // Lật gương (vì webcam mirror): x = 1 - indexTip.x
    const mirroredX = 1 - indexTip.x;
    const rawY = indexTip.y;

    // Chuẩn hóa theo vùng nhận diện active margin
    const m = State.margin;
    const clampedX = Math.max(0, Math.min(1, (mirroredX - m) / (1 - 2 * m)));
    const clampedY = Math.max(0, Math.min(1, (rawY - m) / (1 - 2 * m)));

    State.targetX = clampedX * window.innerWidth;
    State.targetY = clampedY * window.innerHeight;

    // Làm mượt con trỏ (Exponential Moving Average / Lerp 0.35)
    State.smoothX = State.smoothX * 0.65 + State.targetX * 0.35;
    State.smoothY = State.smoothY * 0.65 + State.targetY * 0.35;

    // Cập nhật vị trí con trỏ Hologram
    const cx = Math.round(State.smoothX);
    const cy = Math.round(State.smoothY);
    State.cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;

    // 2. Nhận diện cử chỉ (Gesture Recognition)
    const handScale = dist(wrist, middleMcp) || 0.2; // Kích thước bàn tay tham chiếu
    const pinchDist = dist(thumbTip, indexTip);
    const pinchRatio = pinchDist / handScale;

    // Kiểm tra Open Palm (xòe cả 5 ngón)
    const isPalm = checkIfOpenPalm(landmarks);

    // Kiểm tra Swipe (vận tốc ngang)
    checkSwipeGesture(wrist.x);

    let gestureName = 'POINT';

    if (isPalm) {
      gestureName = 'OPEN PALM';
      if (State.gestureBadge) State.gestureBadge.textContent = '✋ XÒE TAY';
      State.cursorRing.style.borderColor = '#34d399';
      State.cursorRing.style.boxShadow = '0 0 20px #34d399';
      State.isPinching = false;
    } else if (pinchRatio < 0.24) {
      // PINCH (Chụm ngón cái và ngón trỏ)
      gestureName = 'PINCH';
      if (State.gestureBadge) State.gestureBadge.textContent = '🤏 CHỤM TAY';
      State.cursorRing.style.borderColor = '#fbbf24';
      State.cursorRing.style.boxShadow = '0 0 30px #fbbf24';

      const now = performance.now();
      if (!State.isPinching && (now - State.lastPinchTime > State.pinchCooldown)) {
        State.isPinching = true;
        State.lastPinchTime = now;
        triggerPinchAction(cx, cy);
      }
    } else {
      // POINT (Ngón trỏ duỗi)
      gestureName = 'POINT';
      if (State.gestureBadge) State.gestureBadge.textContent = '☝️ TRỎ TAY';
      State.cursorRing.style.borderColor = '#00f0ff';
      State.cursorRing.style.boxShadow = '0 0 20px #00f0ff';

      if (pinchRatio > 0.35) {
        State.isPinching = false; // Reset chụm
      }
    }

    // 3. Thực hiện Three.js Raycasting & HTML element hover tại vị trí con trỏ
    performHoverRaycast(cx, cy);
  }

  /**
   * Kiểm tra xem cả 5 ngón tay có đang duỗi xòe không
   */
  function checkIfOpenPalm(lm) {
    const wrist = lm[0];
    const isIndexExtended = dist(lm[8], wrist) > dist(lm[6], wrist) * 1.15;
    const isMiddleExtended = dist(lm[12], wrist) > dist(lm[10], wrist) * 1.15;
    const isRingExtended = dist(lm[16], wrist) > dist(lm[14], wrist) * 1.15;
    const isPinkyExtended = dist(lm[20], wrist) > dist(lm[18], wrist) * 1.15;
    return isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended;
  }

  /**
   * Kiểm tra cử chỉ Vuốt (Swipe Left / Swipe Right) để chuyển ảnh
   */
  function checkSwipeGesture(currentX) {
    const now = performance.now();
    State.xHistory.push({ x: currentX, time: now });

    // Giữ lại 6 frame gần nhất
    if (State.xHistory.length > 6) State.xHistory.shift();
    if (State.xHistory.length < 4) return;

    if (now - State.lastSwipeTime < State.swipeCooldown) return;

    const first = State.xHistory[0];
    const last = State.xHistory[State.xHistory.length - 1];
    const dt = (last.time - first.time) / 1000;
    if (dt <= 0) return;

    // Vì camera lật gương: x di chuyển ngược lại
    const dx = last.x - first.x;
    const vx = dx / dt;

    if (Math.abs(vx) > 1.2) {
      State.lastSwipeTime = now;
      if (vx > 0) {
        // Vuốt sang trái (trên màn hình là tiếp theo)
        triggerSwipe('LEFT');
      } else {
        // Vuốt sang phải (trên màn hình là trước đó)
        triggerSwipe('RIGHT');
      }
    }
  }

  function triggerSwipe(direction) {
    if (State.gestureBadge) {
      State.gestureBadge.textContent = direction === 'LEFT' ? '👋 VUỐT TRÁI (KẾ TIẾP)' : '👋 VUỐT PHẢI (TRƯỚC)';
    }

    // Tìm nút Next hoặc Prev trong bảng Hologram đang mở
    const hologramHud = document.querySelector('.hologram-hud-enter');
    if (hologramHud) {
      const buttons = hologramHud.querySelectorAll('button');
      if (direction === 'LEFT') {
        // Next: nút có ký tự ▶ hoặc title chứa "tiếp"
        const nextBtn = Array.from(buttons).find(b => b.textContent.includes('▶') || (b.title && b.title.includes('kế')));
        if (nextBtn) nextBtn.click();
      } else {
        // Prev: nút có ký tự ◀ hoặc title chứa "trước"
        const prevBtn = Array.from(buttons).find(b => b.textContent.includes('◀') || (b.title && b.title.includes('trước')));
        if (prevBtn) prevBtn.click();
      }
    }
  }

  /**
   * Raycast tìm đối tượng hover dưới con trỏ
   */
  function performHoverRaycast(screenX, screenY) {
    State.hoveredItem = null;
    State.hoveredElement = null;

    // 1. Kiểm tra phần tử HTML UI trước
    const el = document.elementFromPoint(screenX, screenY);
    if (el && el !== State.cursor && !el.closest('#ai-hand-cursor') && !el.closest('#ai-hand-pip')) {
      const btn = el.closest('button, a, input, [role="button"]');
      if (btn) {
        State.hoveredElement = btn;
        showCursorTooltip(btn.innerText.trim() || btn.title || 'Nút Bấm');
        State.cursorRing.style.transform = 'scale(1.25)';
        return;
      }
    }

    // 2. Thử tương tác 3D trực tiếp qua hook __RAYCAST_HOVER__
    if (window.__RAYCAST_HOVER__) {
      const label = window.__RAYCAST_HOVER__(screenX, screenY);
      if (label) {
        State.hoveredItem = true;
        showCursorTooltip(label);
        State.cursorRing.style.transform = 'scale(1.35)';
        State.cursorRing.style.borderColor = '#fbbf24';
        return;
      }
    }

    // 3. Fallback raycast vào không gian Three.js 3D
    const interactables = window.__THREE_INTERACTABLES__;
    const camera = window.__THREE_CAMERA__;

    if (interactables && interactables.length > 0 && camera && typeof THREE !== 'undefined') {
      const raycaster = window.__AI_RAYCASTER__ || (window.__AI_RAYCASTER__ = new THREE.Raycaster());
      const ndcX = (screenX / window.innerWidth) * 2 - 1;
      const ndcY = -(screenY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);

      const meshes = interactables.map(item => item.mesh).filter(Boolean);
      const hits = raycaster.intersectObjects(meshes, true);

      if (hits.length > 0) {
        const hitMesh = hits[0].object;
        const found = interactables.find(item => item.mesh === hitMesh || (item.mesh.children && item.mesh.children.includes(hitMesh)));
        if (found) {
          State.hoveredItem = found;
          showCursorTooltip(found.label || found.dioramaMarker?.title || found.artifact?.title || 'Điểm tương tác 3D');
          State.cursorRing.style.transform = 'scale(1.35)';
          State.cursorRing.style.borderColor = '#fbbf24';
          return;
        }
      }
    }

    // Nếu không hover gì
    State.cursorRing.style.transform = 'scale(1)';
    if (State.cursorLabel) State.cursorLabel.style.display = 'none';
  }

  function showCursorTooltip(text) {
    if (!State.cursorLabel) return;
    State.cursorLabel.textContent = text.length > 32 ? text.slice(0, 30) + '...' : text;
    State.cursorLabel.style.display = 'block';
  }

  /**
   * Kích hoạt thao tác Click khi PINCH
   */
  function triggerPinchAction(screenX, screenY) {
    // Hiệu ứng sóng ripple
    if (State.cursorRipple) {
      State.cursorRipple.style.animation = 'none';
      void State.cursorRipple.offsetWidth;
      State.cursorRipple.style.animation = 'pinchRipple 0.4s ease-out forwards';
    }

    // 1. Nếu đang hover trên phần tử UI HTML
    if (State.hoveredElement) {
      State.hoveredElement.click();
      return;
    }

    // 2. Thử kích hoạt qua hook Three.js __RAYCAST_CLICK__
    if (window.__RAYCAST_CLICK__ && window.__RAYCAST_CLICK__(screenX, screenY)) {
      return;
    }

    // 3. Fallback: Nếu đang hover trên đối tượng 3D
    if (State.hoveredItem && typeof State.hoveredItem === 'object') {
      const item = State.hoveredItem;
      if (item.type === 'diorama-marker' && item.dioramaMarker) {
        if (window.__triggerHoloRipple && item.mesh) {
          window.__triggerHoloRipple(item.mesh.position.x, item.mesh.position.z);
        }
        if (window.__ON_OPEN_MARKER__) window.__ON_OPEN_MARKER__(item.dioramaMarker);
        return;
      } else if (item.type === 'console-audio') {
        if (window.__triggerHoloRipple) window.__triggerHoloRipple(-3.7, 9.5);
        if (window.__VOICEOVER__) {
          const m = window.__ACTIVE_HOLOGRAM_MARKER__ || (window.yp && window.yp["lesson-1"]?.eventMarkers[0]);
          if (m) window.__VOICEOVER__.playVoiceover(m.id);
        }
        return;
      } else if (item.type === 'console-media') {
        if (window.__triggerHoloRipple) window.__triggerHoloRipple(3.7, 9.5);
        if (window.__ON_OPEN_VIDEO__) {
          const m = window.__ACTIVE_HOLOGRAM_MARKER__ || (window.yp && window.yp["lesson-1"]?.eventMarkers[0]);
          if (m) window.__ON_OPEN_VIDEO__(m.id);
        }
        return;
      } else if (item.artifact && window.__ON_OPEN_ARTIFACT__) {
        window.__ON_OPEN_ARTIFACT__(item.artifact);
        return;
      }
    }

    // 4. Click tổng quát bằng document.elementFromPoint
    const el = document.elementFromPoint(screenX, screenY);
    if (el && typeof el.click === 'function') {
      el.click();
    }
  }

  /**
   * Vẽ khung xương 21 khớp bàn tay lên canvas preview
   */
  function drawHandSkeleton(ctx, lm, w, h) {
    const connections = [
      [0,1],[1,2],[2,3],[3,4],       // Ngón cái
      [0,5],[5,6],[6,7],[7,8],       // Ngón trỏ
      [5,9],[9,10],[10,11],[11,12],  // Ngón giữa
      [9,13],[13,14],[14,15],[15,16],// Ngón áp út
      [13,17],[17,18],[18,19],[19,20],// Ngón út
      [0,17]                         // Lòng bàn tay
    ];

    ctx.save();
    // Lật gương canvas để khớp với webcam mirror
    ctx.translate(w, 0);
    ctx.scale(-1, 1);

    // Vẽ đường nối các khớp
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.lineWidth = 2.5;
    for (const [i, j] of connections) {
      ctx.beginPath();
      ctx.moveTo(lm[i].x * w, lm[i].y * h);
      ctx.lineTo(lm[j].x * w, lm[j].y * h);
      ctx.stroke();
    }

    // Vẽ 21 điểm khớp
    for (let i = 0; i < lm.length; i++) {
      const p = lm[i];
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, i === 8 ? 5.5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = i === 8 ? '#38bdf8' : (i === 4 ? '#fbbf24' : '#10b981');
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.fill();
    }

    ctx.restore();
  }

  // Khởi tạo tự động khi trang tải xong
  window.addEventListener('DOMContentLoaded', () => {
    initDOM();
  });

  // Xuất API toàn cục
  window.AIHandController = {
    init: initDOM,
    toggleCamera,
    startCamera,
    stopCamera,
    openGuideModal,
    closeGuideModal,
    getState: () => ({ isRunning: State.isRunning, isPinching: State.isPinching })
  };

})();
