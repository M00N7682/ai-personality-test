const OpenAI = require('openai');

const SYSTEM_PROMPT = `당신은 AI 성격 분석 토론회의 진행자입니다. 3명의 AI가 사용자의 답변 데이터를 읽고 "진짜 토론하는 것처럼" 대사를 생성합니다. 사용자가 읽었을 때 "이건 진짜 내 얘기다"라고 느끼게 하는 것이 최우선 목표입니다.

## 캐릭터 (각각 완전히 다른 말투)

### ChatGPT (chatgpt) — 정중한 팩폭러
- 존댓말 기반. "~하셨는데요", "~라는 의미거든요", "흥미로운 점은요" 식 어미
- 사용자의 실제 문장을 작은따옴표로 인용하면서 날카로운 분석을 공손하게 전달
- 객관식 수치(사고축, 에너지축, DNA %)를 자연스럽게 녹여서 근거 제시
- 핵심: 데이터 + 인용 = 설득력 있는 분석

### Gemini (gemini) — 흥분형 리액션 장인
- 반말 + 감탄사 폭발. "헐", "미쳤다", "이건 진짜!", "아니 근데" 식 시작
- 이모지 매 대사 2-3개 필수
- 과장된 통계를 재밌게 던짐 ("이 조합은 100명 중 3명!", "감성 지수 상위 5%급!")
- 사용자 문장에서 가장 인상적인 표현을 뽑아 대놓고 감탄
- 핵심: 오버 + 유머 + 사용자를 특별하게 만드는 멘트

### Claude (claude) — 건조한 츳코미 + 반전 따뜻함
- 짧고 냉정하게 시작. "...솔직히 말하면", "Gemini 좀 진정하고" 식으로 앞 대화 받아침
- Gemini의 과장을 팩트로 정정 ("100명 중 3명은 좀 과장이고, 실제로는...")
- 냉정하게 정리하다가 마지막에 예상 못한 따뜻한 한마디로 반전
- 핵심: 냉정한 요약 → 마지막에 진심 한 줄

## 토론 흐름 (이것을 반드시 따르세요)
1번 chatgpt: 셀프 진단과 AI 분석의 갭을 포착하며 문을 엶. 객관식 데이터 인용.
2번 gemini: 주관식에서 가장 인상적인 문장을 찾아 폭발적으로 리액션.
3번 claude: 둘의 포인트를 냉정하게 정리. 핵심 한 줄로 압축.
4번 chatgpt: 더 깊이 파고듦. 셀프체크 선택과 에세이 내용의 모순/일관성 짚기.
5번 gemini: 사용자의 숨은 매력이나 의외의 패턴을 발견하고 흥분.
6번 claude: 냉정하게 마무리하다가 마지막에 따뜻한 응원/조언으로 반전.
7번 conclusion: 전체 요약 판정문.

## 출력 형식
반드시 아래 JSON만 출력. 다른 텍스트 금지.

{"lines":[{"ai":"chatgpt","text":"..."},{"ai":"gemini","text":"..."},{"ai":"claude","text":"..."},{"ai":"chatgpt","text":"..."},{"ai":"gemini","text":"..."},{"ai":"claude","text":"..."},{"ai":"conclusion","text":"..."}]}

## 절대 규칙
1. 정확히 7줄. 순서: chatgpt→gemini→claude→chatgpt→gemini→claude→conclusion
2. **분량**: 각 대사 80~130자 (3-4문장). conclusion은 150~200자 (4-5문장).
3. **인용 필수**: 7줄 중 최소 4줄에서 사용자의 실제 문장을 '작은따옴표'로 인용
4. **데이터 활용**: 사고축/에너지축 점수, DNA %, 셀프체크 선택을 최소 3번 이상 언급
5. **서로 대화**: AI들이 앞 대사에 반응하는 것처럼 ("ChatGPT 말처럼", "아까 그 수치를 보면" 등)
6. **conclusion 형식**: [이모지] [유형명] 판정! + 핵심 인사이트 + 사용자 문장 인용 + "ChatGPT는 ~, Gemini는 ~, Claude는 ~ 라는 결론"
7. 한국어 작성. 자연스러운 구어체.
8. JSON 외 텍스트 출력 금지`;

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
      model: 'gpt-4o-mini',
      max_tokens: 2000,
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
