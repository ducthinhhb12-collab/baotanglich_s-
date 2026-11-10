const fs = require('fs');

const dataFile = 'c:/Users/ADMIN/Pictures/BaoTangLichSuSo_3D_SanSangChay/museum-data.json';
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const newApBacMedia = [
  {
    id: 'apbac-media-nara-m113',
    title: 'Đội hình Thiết xa vận M113 bị bẻ gãy tại Ấp Bắc (Tư liệu NARA 1963)',
    url: './media/khu3/M113_Armored_Squadron_1963.jpg',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  },
  {
    id: 'apbac-media-battlefield-wide',
    title: 'Toàn cảnh trực thăng Mỹ bị bắn rơi trên đồng lúa Ấp Bắc (02/01/1963)',
    url: './media/khu3/Battlefield_at_Ap_Bac.jpg',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  },
  {
    id: 'apbac-media-ch21-wreck',
    title: 'Xác trực thăng CH-21 Shawnee bị bắn rơi tại mặt trận Ấp Bắc',
    url: './media/khu3/Chopper_wreck_at_Ap_Bac_LF.jpg',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  },
  {
    id: 'apbac-media-downed-choppers-close',
    title: 'Cận cảnh các máy bay trực thăng Mỹ bị hạ gục ngày 03/01/1963 tại Ấp Bắc',
    url: './media/khu3/Downed_Choppers__3_January_1963.jpg',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  },
  {
    id: 'apbac-media-downed-choppers-wide',
    title: 'Trận địa trực thăng Mỹ bốc cháy trên cánh đồng Ấp Bắc',
    url: './media/khu3/Downed_choppers_at_Ap_Bac_wide.jpg',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  },
  {
    id: 'apbac-media-map',
    title: 'Bản đồ sơ đồ tác chiến trận đánh Ấp Bắc của Bộ chỉ huy quân sự Mỹ',
    url: './media/khu3/Map_of_Ap_Bac.png',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  },
  {
    id: 'apbac-media-stamp',
    title: 'Bộ tem bưu chính kỷ niệm Chiến thắng Ấp Bắc lịch sử',
    url: './media/khu3/Vietnam_stamp__Battle_of__p_B_c.jpg',
    type: 'image',
    category: 'ap_bac',
    zone: 'khu3',
    year: '1963',
    period: '1961-1965',
    verified: true,
    isVerified: true,
    isVerifiedSource: true
  }
];

if (!data.mediaLibrary) data.mediaLibrary = [];
let addedCount = 0;
for (const item of newApBacMedia) {
  const existing = data.mediaLibrary.find(m => m.url === item.url || m.id === item.id);
  if (!existing) {
    data.mediaLibrary.push(item);
    addedCount++;
  }
}

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`Added ${addedCount} new Ap Bac media items to museum-data.json. Total media: ${data.mediaLibrary.length}`);

// Also copy museum-data.json to Downloads
const destData = 'c:/Users/ADMIN/Downloads/quasinhnhat/BaoTangLichSuSo_3D_SanSangChay/museum-data.json';
fs.writeFileSync(destData, JSON.stringify(data, null, 2), 'utf8');
console.log(`Synchronized museum-data.json to Downloads`);
