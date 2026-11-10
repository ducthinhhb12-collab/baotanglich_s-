const fs = require('fs');
const path = require('path');
const target = path.resolve(__dirname, '../src/components/Museum3D/MuseumZoneArchitecture.ts');
let code = fs.readFileSync(target, 'utf8');

const decalCode = `
/**
 * Tạo decal mũi tên chỉ hướng trên sàn (Floor Guide Decal)
 */
export function createFloorGuideDecal(
  stepNumber: number,
  label: string,
  px: number,
  pz: number,
  rotY: number = 0
): THREE.Group {
  const decalGroup = new THREE.Group();
  decalGroup.position.set(px, 0.008, pz);
  decalGroup.rotation.y = rotY;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 256);

    // Mũi tên chỉ hướng vàng rực
    ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
    ctx.beginPath();
    ctx.moveTo(256, 30);
    ctx.lineTo(360, 130);
    ctx.lineTo(290, 130);
    ctx.lineTo(290, 220);
    ctx.lineTo(222, 220);
    ctx.lineTo(222, 130);
    ctx.lineTo(152, 130);
    ctx.closePath();
    ctx.fill();

    // Vòng tròn số thứ tự
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.arc(256, 170, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(stepNumber), 256, 170);
  }

  const tex = new THREE.CanvasTexture(canvas);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.8),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.85 })
  );
  mesh.rotation.x = -Math.PI / 2;
  decalGroup.add(mesh);

  return decalGroup;
}
`;

code += decalCode;
fs.writeFileSync(target, code, 'utf8');
console.log('✅ Đã thêm createFloorGuideDecal vào MuseumZoneArchitecture.ts');
