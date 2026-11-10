const { execSync } = require('child_process');
const cwd = 'c:/Users/ADMIN/Pictures/BaoTangLichSuSo_3D_SanSangChay';

function run(cmd) {
  console.log('>', cmd);
  try {
    const out = execSync(cmd, { cwd, encoding: 'utf8' });
    console.log(out);
  } catch(e) {
    console.error('Error:', e.stdout || e.message);
  }
}

run('git config user.name "Tac Gia Bao Tang 3D"');
run('git config user.email "baotang3d@gmail.com"');
run('git add .');
run('git commit -m "Khoi tao Bao Tang Lich Su So 3D"');
run('git status');
