const Anthropic = require('@anthropic-ai/sdk');

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
  const { userName, essayTexts, essayQuestions, analysisResult, deepPatterns } = data;

  const typeInfo = analysisResult.typeInfo;
  const selfTypeInfo = analysisResult.selfTypeInfo;
  const gapLevel = analysisResult.gapLevel;
  const dp = deepPatterns || {};

  let prompt = `## 사용자 정보
- 이름: ${userName}
- 셀프 진단 유형: ${selfTypeInfo.name} ${selfTypeInfo.emoji} (본인이 생각하는 자기 유형)
- AI 분석 유형: ${typeInfo.name} ${typeInfo.emoji} (에세이 분석 결과)
- 갭 레벨: ${gapLevel} (match=일치, slight=약간 다름, big=크게 다름)

## 분석 데이터
- 사고축 점수: ${analysisResult.thinkingScore} (양수=논리적, 음수=감성적)
- 에너지축 점수: ${analysisResult.energyScore} (양수=외향적, 음수=내향적)
- 대표 키워드: ${analysisResult.mainKeyword}
- 상위 키워드: ${(analysisResult.topKeywords || []).join(', ')}
- 감정 DNA: ${(analysisResult.dna || []).map(d => `${d.name}(${d.score}%)`).join(', ')}
`;

  if (dp) {
    prompt += `
## 딥 패턴
- 전체 글자수: ${dp.charCount || 0}자
- 문장수: ${dp.sentenceCount || 0}개
- 평균 문장 길이: ${dp.avgSentenceLength || 0}자
- 감정단어: ${dp.emotionCount || 0}개, 논리단어: ${dp.logicCount || 0}개
- 자기 언급 비율: ${dp.selfMentionRatio || 0}%
- 타인 언급 비율: ${dp.otherMentionRatio || 0}%
- 어휘 다양성: ${dp.vocabularyDiversity || 0}%
- 말줄임표: ${dp.ellipsisCount || 0}개, 물음표: ${dp.questionCount || 0}개
- 에세이 길이 추이: ${dp.lengthTrend || 'stable'}
`;
    if (dp.topQuotes && dp.topQuotes.length > 0) {
      prompt += `- 대표 문장: "${dp.topQuotes.join('", "')}"
`;
    }
  }

  prompt += `
## 에세이 전문
`;
  if (essayQuestions && essayTexts) {
    essayTexts.forEach((text, i) => {
      const q = essayQuestions[i] || {};
      prompt += `
### 질문 ${i + 1}: ${q.question || ''}
${text}
`;
    });
  }

  prompt += `
## 유형 설명
${typeInfo.name}: ${typeInfo.desc}

## 지시
위 데이터를 바탕으로, 3 AI 캐릭터가 이 사용자의 성격을 토론하는 대사를 생성하세요.
- 갭 레벨이 '${gapLevel}'이므로 ${gapLevel === 'match' ? '셀프 진단과 일치한다는 점을 칭찬하며 분석' : gapLevel === 'slight' ? '약간의 불일치를 흥미롭게 짚으며 분석' : '큰 반전을 드라마틱하게 전달하며 분석'}하세요.
- 반드시 사용자의 실제 글에서 구체적 표현을 인용하세요 (예: "글에서 '...'라고 쓰셨는데").
- 유형 설명의 핵심을 대사에 자연스럽게 녹이세요.`;

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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'API key not configured' });
  }

  try {
    const { userName, essayTexts, essayQuestions, analysisResult, deepPatterns } = req.body;

    if (!userName || !essayTexts || !analysisResult) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const client = new Anthropic({ apiKey });

    const userPrompt = buildUserPrompt({
      userName,
      essayTexts,
      essayQuestions,
      analysisResult,
      deepPatterns
    });

    const message = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    });

    const responseText = message.content[0].text.trim();

    // JSON 파싱 시도
    let dialogue;
    try {
      // JSON 블록이 ```json ... ``` 으로 감싸져 있을 수 있음
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      dialogue = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr.message, 'Response:', responseText.slice(0, 200));
      return res.status(500).json({ success: false, error: 'Invalid LLM response format' });
    }

    // 형식 검증
    if (!dialogue.lines || !Array.isArray(dialogue.lines) || dialogue.lines.length < 5) {
      return res.status(500).json({ success: false, error: 'Invalid dialogue format' });
    }

    // 각 줄에 필수 필드 확인
    for (const line of dialogue.lines) {
      if (!line.ai || !line.text) {
        return res.status(500).json({ success: false, error: 'Invalid line format' });
      }
    }

    return res.status(200).json({ success: true, dialogue });

  } catch (err) {
    console.error('API error:', err.message);
    return res.status(500).json({ success: false, error: 'LLM request failed' });
  }
};
