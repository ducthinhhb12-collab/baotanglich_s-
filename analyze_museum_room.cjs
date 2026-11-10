const fs = require('fs');
const path = require('path');

const roomPath = path.resolve(__dirname, '../src/components/Museum3D/MuseumRoom3D.tsx');
const content = fs.readFileSync(roomPath, 'utf8');
const lines = content.split('\n');

for (let i = 1438; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('// ===') || line.includes('// ---') || line.includes('function ') || line.includes('const build') || line.includes('useEffect') || line.includes('return (') || line.includes('LessonQuizModal') || line.includes('ScriptedTourHUD')) {
    console.log(`Line ${i + 1}: ${line.trim().slice(0, 80)}`);
  }
}
