const OpenAI = require('openai');

const SYSTEM_PROMPT = `당신은 AI 성격 분석 토론회의 진행자입니다. 3명의 AI 캐릭터가 사용자의 에세이를 분석하고 토론하는 대사를 생성합니다.

## 캐릭터 규칙

### ChatGPT (chatgpt)
- 정중한 말투로 팩폭 (날카로운 분석을 공손하게 전달)
- 실제 데이터/패턴을 인용하며 분석
- "~하셨는데요", "~라는 뜻이에요" 식 존댓말
- 사용자의 실제 문장에서 구체적 근거를 찾아 인용

### Gemini (gemini)
- 오버 리액션, 과도한 감탄사
- 이모지 남발 (매 대사 1-3개)
- 가끔 웃기게 과장된 확률/통계 언급 (하지만 실제 통계도 섞기)
- "이건 대박!", "소름 돋았어요!" 식 흥분

### Claude (claude)
- 건조한 츳코미 (짧고 냉정한 한줄 반응)
- Gemini의 과장을 정정하는 역할
- 앞의 둘을 정리하고 핵심을 짚음
- 마지막에 따뜻한 조언이나 의외의 공감

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력합니다.

{
  "lines": [
    { "ai": "chatgpt", "text": "..." },
    { "ai": "gemini", "text": "..." },
    { "ai": "claude", "text": "..." },
    { "ai": "chatgpt", "text": "..." },
    { "ai": "gemini", "text": "..." },
    { "ai": "claude", "text": "..." },
    { "ai": "conclusion", "text": "..." }
  ]
}

## 핵심 규칙
1. 정확히 7줄: chatgpt, gemini, claude, chatgpt, gemini, claude, conclusion 순서
2. 사용자의 실제 글에서 구체적 표현을 인용하여 "이 사람만을 위한" 분석임을 느끼게 할 것
3. 각 대사는 2-4문장 (너무 길지 않게)
4. conclusion은 이모지 + 유형명 + 핵심 요약 + AI 3인방 판정 형식
5. 한국어로 작성
6. JSON 외의 텍스트 출력 금지`;

function buildUserPrompt(data) {
  const { userName, essayTexts, essayQuestions, analysisResult, selfCheckAnswers, deepPatterns } = data;

  const typeInfo = analysisResult.typeInfo;
  const selfTypeInfo = analysisResult.selfTypeInfo;
  const gapLevel = analysisResult.gapLevel;
  const dp = deepPatterns || {};

  let prompt = `## 사용자: ${userName}
- 셀프 진단: ${selfTypeInfo.name} ${selfTypeInfo.emoji}
- AI 분석 결과: ${typeInfo.name} ${typeInfo.emoji} — ${typeInfo.desc}
- 갭: ${gapLevel} (match=일치, slight=약간 다름, big=크게 다름)

## 객관식 응답 (핵심 데이터)
- 사고축: ${analysisResult.thinkingScore} (양수=논리, 음수=감성)
- 에너지축: ${analysisResult.energyScore} (양수=외향, 음수=내향)
- 감정 DNA: ${(analysisResult.dna || []).map(d => `${d.name} ${d.score}%`).join(', ')}
- 키워드: ${(analysisResult.topKeywords || []).join(', ')}
`;

  // 셀프체크 개별 응답 포함
  if (selfCheckAnswers) {
    prompt += `\n## 셀프체크 선택지\n`;
    for (const [qId, answer] of Object.entries(selfCheckAnswers)) {
      prompt += `- ${qId}: ${answer}\n`;
    }
  }

  // 에세이 원문 (LLM이 직접 읽고 자연스럽게 인용)
  if (essayQuestions && essayTexts) {
    prompt += `\n## 주관식 답변\n`;
    essayTexts.forEach((text, i) => {
      const q = essayQuestions[i] || {};
      prompt += `Q${i + 1}. ${q.question || ''}\n→ ${text}\n\n`;
    });
  }

  prompt += `## 지시
객관식 데이터 + 주관식 답변을 근거로 토론하세요.
- 주관식에서 인상적인 표현을 자연스럽게 인용하세요.
- 갭이 '${gapLevel}'이므로 ${gapLevel === 'match' ? '일치를 칭찬하며' : gapLevel === 'slight' ? '약간의 불일치를 흥미롭게 짚으며' : '큰 반전을 드라마틱하게'} 분석.`;

  return prompt;
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'API key not configured' });
  }

  try {
    const { userName, selfCheckAnswers, essayTexts, essayQuestions, analysisResult, deepPatterns } = req.body;

    if (!userName || !analysisResult) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const client = new OpenAI({ apiKey });

    const userPrompt = buildUserPrompt({
      userName,
      selfCheckAnswers,
      essayTexts,
      essayQuestions,
      analysisResult,
      deepPatterns
    });

    const completion = await client.chat.completions.create({
      model: 'gpt-5-mini',
      max_completion_tokens: 4000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ]
    });

    const responseText = (completion.choices[0].message.content || '').trim();

    if (!responseText) {
      return res.status(500).json({ success: false, error: 'Empty LLM response, finish_reason: ' + completion.choices[0].finish_reason });
    }

    // JSON 파싱
    let dialogue;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      dialogue = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr.message, 'Response:', responseText.slice(0, 200));
      return res.status(500).json({ success: false, error: 'Parse error: ' + parseErr.message + ' | Response: ' + responseText.slice(0, 100) });
    }

    // 형식 검증
    if (!dialogue.lines || !Array.isArray(dialogue.lines) || dialogue.lines.length < 5) {
      return res.status(500).json({ success: false, error: 'Invalid dialogue format' });
    }

    for (const line of dialogue.lines) {
      if (!line.ai || !line.text) {
        return res.status(500).json({ success: false, error: 'Invalid line format' });
      }
    }

    return res.status(200).json({ success: true, dialogue });

  } catch (err) {
    console.error('API error:', err.message, err.stack);
    return res.status(500).json({ success: false, error: 'LLM request failed: ' + err.message });
  }
};
