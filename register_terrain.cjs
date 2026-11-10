const fs = require('fs');
const path = require('path');

const roomPath = path.resolve(__dirname, '../src/components/Museum3D/MuseumRoom3D.tsx');
let content = fs.readFileSync(roomPath, 'utf8');

const target = '    // Đăng ký tương tác click cho các mốc sự kiện trên sa bàn\n    diorama.interactiveMarkers.forEach(item => {';
const replacement = `    // Đăng ký tương tác click cho toàn bộ Sa bàn (nhấp vào sa bàn để chuyển góc nhìn cận cảnh 45 độ)
    if (diorama.terrainMesh) {
      interactiveObjects.current.push({
        mesh: diorama.terrainMesh,
        type: 'diorama-overview' as any,
        label: '🔍 Sa bàn lịch sử 3D: Nhấp để chuyển góc nhìn cận cảnh 45 độ'
      });
    }

    // Đăng ký tương tác click cho các mốc sự kiện trên sa bàn
    diorama.interactiveMarkers.forEach(item => {`;

content = content.replace(target, replacement);
fs.writeFileSync(roomPath, content, 'utf8');
console.log('✅ Đã đăng ký diorama.terrainMesh');
