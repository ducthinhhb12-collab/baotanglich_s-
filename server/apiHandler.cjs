const fs = require('fs');
const path = require('path');
const dns = require('dns');

// Tối ưu mạng trên Windows: ưu tiên IPv4 để không bị nghẽn DNS/IPv6 (giảm độ trễ từ 30s xuống 1.5s)
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

// Đọc và nạp biến môi trường từ file .env nếu có
function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
}

loadEnvFile();

// Nạp trước dữ liệu tóm tắt từ 3 tài liệu giáo án bài học
let docxContextSummary = '';
try {
  ['TIẾT 1-BÀI 8.txt', 'TIẾT 2-BÀI 8.txt', 'TIẾT 3-BÀI 8.txt'].forEach(f => {
    const p = path.resolve(process.cwd(), f);
    if (fs.existsSync(p)) {
      const txt = fs.readFileSync(p, 'utf8');
      docxContextSummary += `\n--- NỘI DUNG TỪ ${f} ---\n` + txt.slice(0, 5000);
    }
  });
} catch (e) {
  console.warn('Không thể đọc file tóm tắt docx:', e.message);
}

// Trạng thái AI
function getAIStatus() {
  loadEnvFile();
  const apiKey = process.env.AI_API_KEY || '';
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const model = process.env.AI_MODEL || (provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini');

  const isConfigured = Boolean(apiKey && apiKey.trim() && !apiKey.includes('your_'));

  return {
    configured: isConfigured,
    provider: provider,
    model: model,
    message: isConfigured 
      ? `Đã cấu hình dịch vụ AI (${provider.toUpperCase()})` 
      : 'Chưa cấu hình API AI. Vui lòng thêm AI_API_KEY vào file .env.'
  };
}

// Xử lý câu hỏi và gọi AI
async function handleChatRequest(body) {
  loadEnvFile();
  const { message, context } = body;
  const status = getAIStatus();

  if (!status.configured) {
    return {
      speechText: 'Hệ thống AI chưa được cấu hình khóa API (AI_API_KEY). Vui lòng tạo file .env từ .env.example và điền khóa API (Google Gemini hoặc OpenAI) để kích hoạt trí tuệ nhân tạo tương tác thực sự.',
      emotion: 'solemn',
      animationState: 'ERROR',
      gesture: 'bow',
      duration: 5,
      sourceReferences: ['Tài liệu hướng dẫn cấu hình'],
      configured: false
    };
  }

  const apiKey = process.env.AI_API_KEY;
  const provider = status.provider;
  const model = status.model;

  // Xây dựng ngữ cảnh RAG
  const currentRoomName = context?.roomName || 'Bảo tàng Lịch sử số';
  const currentYear = context?.currentYear ? `Năm ${context.currentYear}` : '';
  const selectedArtifact = context?.selectedArtifact;

  let artifactContext = '';
  if (selectedArtifact) {
    artifactContext = `\nHọc sinh đang xem hiện vật: "${selectedArtifact.title}" (${selectedArtifact.year || ''}).
Mô tả: ${selectedArtifact.shortDescription || ''}
Nội dung chi tiết: ${selectedArtifact.historicalContent || ''}
Nguồn: ${selectedArtifact.source?.originalDocRef || selectedArtifact.source?.title || 'Giáo án Bài 8'}\n`;
  }

  const systemInstruction = `Bạn là Cô Hướng Dẫn Viên 3D mặc áo dài truyền thống tại "BẢO TÀNG LỊCH SỬ SỐ (1954–1975)" - Bài 8 Lịch sử 12: Cuộc kháng chiến chống Mỹ, cứu nước.
Phong cách giao tiếp:
- Thân thiện, trang trọng, truyền cảm, tự hào dân tộc, chuẩn mực sư phạm dành cho học sinh phổ thông.
- Trả lời bằng tiếng Việt chuẩn xác có dấu.
- Dựa trên tư liệu giáo án lịch sử chính khóa sau đây:
${docxContextSummary.slice(0, 4000)}

Ngữ cảnh hiện tại của khách:
- Vị trí: ${currentRoomName} ${currentYear}
${artifactContext}

Quy tắc bắt buộc:
1. Bám sát nội dung và phân kỳ lịch sử của giáo án (Tiết 1: 1954-1965; Tiết 2: 1965-1973; Tiết 3: 1973-1975).
2. Tuyệt đối KHÔNG tự bịa ngày tháng, sự kiện, con số hoặc lời trích dẫn không có trong tư liệu.
3. Nếu khách hỏi sự kiện trong năm mà tư liệu bài học không có chi tiết cụ thể, hãy nêu rõ: "Tư liệu bài học hiện chưa đủ để xác nhận sự kiện nổi bật riêng trong năm này" rồi giải thích bối cảnh chung của giai đoạn đó.
4. Trả lời dưới định dạng JSON DUY NHẤT (không bọc trong markdown \`\`\`json) theo schema sau:
{
  "speechText": "Câu trả lời của hướng dẫn viên (ngắn gọn, cô đọng 2-4 câu để đọc bằng giọng nói)",
  "emotion": "neutral | happy | solemn | inspired",
  "animationState": "IDLE | GREETING | LISTENING | THINKING | SPEAKING | EXPLAINING | POINTING | WALKING | TURNING | FAREWELL | ERROR",
  "gesture": "none | bow | open_hands | point_artifact | think | wave",
  "targetObjectId": "${selectedArtifact?.id || ''}",
  "duration": 5,
  "sourceReferences": ["TIẾT 1-BÀI 8.docx"]
}`;

  try {
    let rawResponseText = '';

    if (provider === 'gemini') {
      const payload = {
        contents: [
          {
            parts: [
              { text: systemInstruction },
              { text: `Câu hỏi của khách tham quan: "${message}"` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 350
        }
      };

      const candidateModels = [
        model || 'gemini-3.8-flash',
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-lite-latest'
      ];
      const uniqueModels = [...new Set(candidateModels.filter(Boolean))];

      let resp = null;
      let usedModel = model;
      let lastStatus = 200;
      let lastErrText = '';

      for (const m of uniqueModels) {
        usedModel = m;
        const curEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
        try {
          resp = await fetch(curEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(3500)
          });
          if (resp.ok) break;
          lastStatus = resp.status;
          lastErrText = await resp.text();
          if (resp.status !== 404 && resp.status !== 400 && resp.status !== 429 && resp.status !== 503) break;
          console.warn(`Model ${m} trả về HTTP ${resp.status}, tự động chuyển sang model siêu tốc kế tiếp...`);
        } catch (fetchErr) {
          console.warn(`Timeout hoặc lỗi kết nối tới ${m} (${fetchErr.message}), chuyển sang model kế tiếp...`);
        }
      }

      if (!resp || !resp.ok) {
        if (lastStatus === 429) {
          throw new Error(`Tài khoản API Google Gemini đã vượt quá hạn ngạch (429 Rate Limit/Quota Exceeded). Vui lòng thử lại sau giây lát.`);
        }
        console.error('Lỗi Gemini API:', lastStatus, lastErrText);
        throw new Error(`Gemini API lỗi (${lastStatus || 500})`);
      }

      const resJson = await resp.json();
      rawResponseText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    } else {
      // OpenAI API
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const payload = {
        model: model,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      };

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errText = await resp.text();
        console.error('Lỗi OpenAI API:', resp.status, errText);
        throw new Error(`OpenAI API lỗi (${resp.status})`);
      }

      const resJson = await resp.json();
      rawResponseText = resJson.choices?.[0]?.message?.content || '{}';
    }

    // Làm sạch và kiểm tra schema
    let cleaned = rawResponseText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(cleaned);

    // Allowlist animation states
    const ALLOWED_STATES = [
      'IDLE', 'GREETING', 'LISTENING', 'THINKING', 
      'SPEAKING', 'EXPLAINING', 'POINTING', 'WALKING', 
      'TURNING', 'FAREWELL', 'ERROR'
    ];
    const ALLOWED_GESTURES = ['none', 'bow', 'open_hands', 'point_artifact', 'think', 'wave'];

    return {
      speechText: parsed.speechText || 'Cảm ơn quý khách đã đặt câu hỏi về lịch sử giai đoạn 1954–1975.',
      emotion: parsed.emotion || 'inspired',
      animationState: ALLOWED_STATES.includes(parsed.animationState) ? parsed.animationState : 'SPEAKING',
      gesture: ALLOWED_GESTURES.includes(parsed.gesture) ? parsed.gesture : 'open_hands',
      targetObjectId: parsed.targetObjectId || selectedArtifact?.id || '',
      duration: Math.max(1, Math.min(30, parsed.duration || 5)),
      sourceReferences: Array.isArray(parsed.sourceReferences) ? parsed.sourceReferences : ['Giáo án Bài 8'],
      configured: true
    };
  } catch (error) {
    console.error('Lỗi khi gọi API AI:', error.message);
    return {
      speechText: `Không thể kết nối dịch vụ AI: ${error.message}. Xin vui lòng kiểm tra lại mạng hoặc khóa API trong file .env.`,
      emotion: 'solemn',
      animationState: 'ERROR',
      gesture: 'bow',
      duration: 4,
      sourceReferences: ['Lỗi kết nối'],
      configured: true
    };
  }
}

module.exports = {
  getAIStatus,
  handleChatRequest
};
