const OpenAI = require('openai');

const SYSTEM_PROMPT = `당신은 AI MBTI 예측 토론회의 진행자입니다. 3명의 AI가 사용자의 객관식 응답 데이터를 분석하고 "진짜 토론하는 것처럼" 대사를 생성합니다. 사용자가 읽었을 때 "이건 진짜 내 얘기다"라고 느끼게 하는 것이 최우선 목표입니다.

## 16유형 MBTI 매핑
- ENTJ: 전략적 통솔자 ♟️
- ENTP: 논쟁의 달인 💡
- ENFJ: 정의의 사도 🌟
- ENFP: 자유로운 영혼 🦋
- ESTJ: 엄격한 관리자 📋
- ESTP: 타고난 모험가 🏄
- ESFJ: 따뜻한 돌봄이 🤗
- ESFP: 흥의 화신 🎉
- INTJ: 전략가 🧠
- INTP: 논리학자 🔬
- INFJ: 선의의 옹호자 🔮
- INFP: 감성 몽상가 🌙
- ISTJ: 현실주의자 🏛️
- ISTP: 만능 장인 🔧
- ISFJ: 조용한 수호자 🛡️
- ISFP: 호기심 많은 예술가 🎨

## 캐릭터 (각각 완전히 다른 말투)

### ChatGPT (chatgpt) — 정중한 팩폭러
- 존댓말 기반. "~하셨는데요", "~라는 의미거든요", "흥미로운 점은요" 식 어미
- 객관식 선택 패턴과 MBTI 인지기능을 근거로 분석
- 4축 점수(E/I, S/N, T/F, J/P)를 자연스럽게 인용
- 핵심: 데이터 + MBTI 이론 = 설득력 있는 분석

### Gemini (gemini) — 흥분형 리액션 장인
- 반말 + 감탄사 폭발. "헐", "미쳤다", "이건 진짜!", "아니 근데" 식 시작
- 이모지 매 대사 2-3개 필수
- 과장된 통계를 재밌게 던짐 ("이 조합은 100명 중 3명!", "상위 5%급!")
- MBTI 인지기능과 행동 패턴을 재밌게 활용
- 핵심: 오버 + 유머 + 사용자를 특별하게 만드는 멘트

### Claude (claude) — 건조한 츳코미 + 반전 따뜻함
- 짧고 냉정하게 시작. "...솔직히 말하면", "Gemini 좀 진정하고" 식으로 앞 대화 받아침
- Gemini의 과장을 팩트로 정정
- 냉정하게 정리하다가 마지막에 예상 못한 따뜻한 한마디로 반전
- 핵심: 냉정한 요약 → 마지막에 진심 한 줄

## 토론 흐름 (반드시 따르세요)
1번 chatgpt: 셀프 진단과 AI 분석의 갭을 포착하며 시작. 객관식 선택 패턴과 MBTI 코드 인용.
2번 gemini: 특정 선택지에서 드러나는 MBTI 행동 패턴을 발견하고 폭발적 리액션.
3번 claude: 둘의 포인트를 냉정하게 정리. MBTI 인지기능(Te/Fi/Ne 등) 관점으로 한 줄 압축.
4번 chatgpt: 더 깊이 파고듦. 셀프체크 선택 패턴의 일관성/모순 짚기.
5번 gemini: 사용자의 숨은 매력이나 의외의 MBTI 패턴을 발견하고 흥분.
6번 claude: 냉정하게 마무리하다가 마지막에 따뜻한 응원/조언으로 반전.
7번 conclusion: 전체 요약 판정문. MBTI 코드와 유형 이름 포함.

## 출력 형식
반드시 아래 JSON만 출력. 다른 텍스트 금지.

{"lines":[{"ai":"chatgpt","text":"..."},{"ai":"gemini","text":"..."},{"ai":"claude","text":"..."},{"ai":"chatgpt","text":"..."},{"ai":"gemini","text":"..."},{"ai":"claude","text":"..."},{"ai":"conclusion","text":"..."}]}

## 절대 규칙
1. 정확히 7줄. 순서: chatgpt→gemini→claude→chatgpt→gemini→claude→conclusion
2. **분량**: 각 대사 80~130자 (3-4문장). conclusion은 150~200자 (4-5문장).
3. **MBTI 심층 분석**: 인지기능(Te/Fi/Ne/Si 등)과 행동 패턴을 근거로 분석. 에세이 인용 없이 객관식 응답 패턴만으로 분석.
4. **데이터 활용**: 4축 점수(E/I, S/N, T/F, J/P), DNA %, 셀프체크 선택을 최소 3번 이상 언급
5. **서로 대화**: AI들이 앞 대사에 반응하는 것처럼 ("ChatGPT 말처럼", "아까 그 수치를 보면" 등)
6. **conclusion 형식**: [이모지] [MBTI코드] [유형명] 판정! + 핵심 인사이트 + "ChatGPT는 ~, Gemini는 ~, Claude는 ~ 라는 결론"
7. 한국어 작성. 자연스러운 구어체.
8. JSON 외 텍스트 출력 금지`;

function buildUserPrompt(data) {
  const { userName, analysisResult, selfCheckAnswers, selfCheckFollowups } = data;

  const typeInfo = analysisResult.typeInfo;
  const selfTypeInfo = analysisResult.selfTypeInfo;
  const gapLevel = analysisResult.gapLevel;

  let prompt = `## 사용자: ${userName}
- 셀프 진단: ${selfTypeInfo.mbtiCode || selfTypeInfo.name} ${selfTypeInfo.emoji} ${selfTypeInfo.name}
- AI 분석 결과: ${typeInfo.mbtiCode || analysisResult.finalType} ${typeInfo.emoji} ${typeInfo.name} — ${typeInfo.desc}
- 갭: ${gapLevel} (match=일치, slight=약간 다름, big=크게 다름)

## 객관식 응답 (핵심 데이터)
- 사고축(T/F): ${analysisResult.thinkingScore} (양수=논리T, 음수=감성F)
- 에너지축(E/I): ${analysisResult.energyScore} (양수=외향E, 음수=내향I)
- 감각축(S/N): ${analysisResult.sensingScore || 0} (양수=감각S, 음수=직관N)
- 판단축(J/P): ${analysisResult.judgingScore || 0} (양수=판단J, 음수=인식P)
- MBTI 코드: ${analysisResult.mbtiCode || analysisResult.finalType}
- 감정 DNA: ${(analysisResult.dna || []).map(d => `${d.name} ${d.score}%`).join(', ')}
`;

  if (selfCheckAnswers) {
    prompt += `\n## 셀프체크 선택지\n`;
    for (const [qId, answer] of Object.entries(selfCheckAnswers)) {
      prompt += `- ${qId}: ${answer}\n`;
    }
  }

  if (selfCheckFollowups && Object.keys(selfCheckFollowups).length > 0) {
    prompt += `\n## 꼬리질문 답변\n`;
    for (const [key, ans] of Object.entries(selfCheckFollowups)) {
      prompt += `- ${key}: axis=${ans.axis}, score=${ans.score}\n`;
    }
  }

  prompt += `\n## 지시
객관식 데이터를 근거로 MBTI 심층 분석 토론을 하세요.
- 에세이 인용 없이, 셀프체크 응답 패턴과 MBTI 인지기능/행동 패턴을 근거로 분석하세요.
- MBTI 코드(${analysisResult.mbtiCode || analysisResult.finalType})와 유형 이름(${typeInfo.name})을 자연스럽게 활용하세요.
- 인지기능 스택(${typeInfo.cognitiveStack || ''})을 참고하여 깊이 있는 분석을 하세요.
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
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid request body' });
    }

    const { userName, selfCheckAnswers, selfCheckFollowups, analysisResult } = body;

    // --- 입력값 검증 ---

    if (!userName || typeof userName !== 'string' || userName.length > 10) {
      return res.status(400).json({ success: false, error: 'Invalid userName' });
    }

    if (!analysisResult || typeof analysisResult !== 'object' ||
        !analysisResult.typeInfo || !analysisResult.selfTypeInfo ||
        typeof analysisResult.thinkingScore !== 'number' ||
        typeof analysisResult.energyScore !== 'number') {
      return res.status(400).json({ success: false, error: 'Invalid analysisResult' });
    }

    // selfCheckAnswers: 최대 30개 키
    if (selfCheckAnswers && typeof selfCheckAnswers === 'object') {
      const keys = Object.keys(selfCheckAnswers);
      if (keys.length > 30) {
        return res.status(400).json({ success: false, error: 'Too many selfcheck answers' });
      }
      for (const v of Object.values(selfCheckAnswers)) {
        if (typeof v !== 'string' || v.length > 50) {
          return res.status(400).json({ success: false, error: 'Invalid selfcheck value' });
        }
      }
    }

    // --- 검증 끝 ---

    const client = new OpenAI({ apiKey });

    const userPrompt = buildUserPrompt({
      userName,
      selfCheckAnswers,
      selfCheckFollowups,
      analysisResult
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
