/**
 * 분석 엔진
 * - 유형 판별 (8유형)
 * - 점수 계산
 * - 감정 DNA 산출
 * - 셀프 갭 분석
 */

const TYPE_INFO = {
  TE: {
    name: '전략적 리더', emoji: '♟️', desc: '머리 좋은데 말도 잘하는 사람', subKey: 'active',
    detail: '당신은 복잡한 상황에서도 냉정하게 판단을 내릴 수 있는 사람입니다. 주변 사람들이 혼란에 빠져 있을 때, 당신은 이미 머릿속에서 3가지 시나리오를 돌리고 있죠. 그런데 더 놀라운 건, 그 계산을 남들이 알아듣게 설명할 수 있다는 겁니다. "전략을 세우는 건 많은 사람이 하지만, 그걸 실행시키는 건 당신 같은 사람"이라고 AI들이 입을 모았습니다.',
    funFact: '회의에서 조용히 듣고 있다가 마지막에 한마디로 결론 내는 타입. 주변에서 "너 없으면 이거 어떻게 했어?"라는 말 자주 듣습니다.',
    warning: '가끔 너무 효율만 따지다가 주변 사람 마음을 놓칠 수 있어요. 모든 관계가 전략으로 풀리는 건 아니랍니다.',
    bestMatch: '감성 몽상가 🌙',
    worstMatch: '즉흥적 실행가 ⚡'
  },
  TI: {
    name: '조용한 해결사', emoji: '🧊', desc: '말은 없지만 다 알고 있는 사람', subKey: 'observe',
    detail: '당신은 말 수가 적지만, 그 적은 말 한마디에 무게가 실리는 사람입니다. 모임에서 한 시간 동안 조용히 듣다가 "근데 그거 이렇게 하면 안 돼?"라고 한마디 하면 모두가 "아..." 하고 고개를 끄덕이죠. 당신의 침묵은 무관심이 아니라, 가장 효율적인 답을 찾는 과정입니다.',
    funFact: '카톡 단체방에서 읽씹이 가장 많지만, 정작 중요한 순간에 핵심 한줄을 남기는 사람. 사람들이 당신의 의견을 무의식적으로 기다립니다.',
    warning: '혼자 다 해결하려다가 번아웃 올 수 있어요. "도와줘"라는 말도 능력입니다. 진짜로요.',
    bestMatch: '열정 에너자이저 🔥',
    worstMatch: '매력적 이야기꾼 🎭'
  },
  FE: {
    name: '열정 에너자이저', emoji: '🔥', desc: '감정이 풍부하고 에너지가 넘치는 사람', subKey: 'passion',
    detail: '당신이 방에 들어가면 공기가 바뀝니다. 진짜로요. 당신의 감정은 전염력이 있어서, 신나면 주변도 신나고, 슬프면 주변도 슬퍼지죠. 그런데 그게 부담이 아니라 매력인 이유는, 당신의 감정이 진심이기 때문입니다. 가식 없이 솔직하게 감정을 표현하는 당신 곁에서 사람들은 "나도 솔직해져도 되겠다"고 느낍니다.',
    funFact: '카톡에서 이모티콘 사용량 상위 1%. "ㅋㅋㅋ" 한 번 보낸 적이 없고 항상 "ㅋㅋㅋㅋㅋㅋㅋ" 이상. 감정에 미니멀리즘이 없는 사람.',
    warning: '에너지가 넘치는 만큼 감정 소모도 큽니다. 가끔은 혼자만의 시간도 필요해요. 충전 없이 계속 방전만 하면 당신도 지칩니다.',
    bestMatch: '조용한 해결사 🧊',
    worstMatch: '날카로운 관찰자 🔍'
  },
  FI: {
    name: '감성 몽상가', emoji: '🌙', desc: '내면 세계가 풍부한 감성파', subKey: 'dream',
    detail: '당신의 머릿속에는 작은 우주가 있습니다. 버스 창밖을 보면서 단편 소설 한 편을 구상하고, 비 오는 날에는 왠지 모를 아련함에 빠지죠. 남들이 그냥 지나치는 순간들에서 당신은 의미를 발견합니다. "별거 아닌 것"에서 아름다움을 느끼는 능력 — 그게 당신의 초능력이에요.',
    funFact: '비 오는 날 창가 카페 → 감성 충전 완료. 플레이리스트에 "새벽감성" "혼자듣기좋은" 같은 플레이리스트가 5개 이상. 노래 가사에 진심으로 공감해서 운 적 있습니다.',
    warning: '현실과 이상의 갭에서 가끔 괴로울 수 있어요. 당신의 풍부한 감성은 축복이지만, 가끔은 "충분히 괜찮다"고 자신에게 말해주세요.',
    bestMatch: '전략적 리더 ♟️',
    worstMatch: '즉흥적 실행가 ⚡'
  },
  TE2: {
    name: '즉흥적 실행가', emoji: '⚡', desc: '생각보다 일단 해보는 타입', subKey: 'action',
    detail: '다른 사람들이 PPT 만들고, 회의하고, 검토받는 동안 당신은 이미 프로토타입을 완성했습니다. "일단 해보고 고치자"가 당신의 인생 모토. 실패를 두려워하지 않는 게 아니라, 실패보다 "안 해본 것"을 더 두려워하는 거죠. 그리고 놀랍게도 당신의 "일단 해보기"는 의외로 자주 맞습니다.',
    funFact: '"이거 해볼까?" 라고 말한 지 5분 만에 이미 시작하고 있는 사람. 주변에서 "너 진짜 빠르다"라는 말을 인사처럼 듣습니다. 고민하는 시간이 아까운 타입.',
    warning: '가끔 브레이크 없는 자동차처럼 달릴 때가 있어요. 실행력은 최고의 무기지만, 방향이 틀리면 빠르게 잘못된 곳에 도착합니다. 5분만 생각해보세요.',
    bestMatch: '감성 몽상가 🌙',
    worstMatch: '조용한 해결사 🧊'
  },
  TI2: {
    name: '날카로운 관찰자', emoji: '🔍', desc: '조용히 보다가 핵심을 짚는 사람', subKey: 'sharp',
    detail: '당신은 인간 CCTV입니다. 모임에서 누가 불편해하는지, 누가 진심이 아닌지, 누가 누굴 좋아하는지 — 다 보입니다. 그런데 그걸 대놓고 말하지 않죠. 필요한 순간이 올 때까지 조용히 저장해두다가, 딱 그 순간에 "혹시 이거 아니야?"라고 핵심을 찌릅니다. 주변에서는 "너 프로파일러야?" 소리 들어봤을 겁니다.',
    funFact: '사람들의 표정 변화, 말투 변화를 무의식적으로 캐치합니다. "너 오늘 뭔가 있지?" 를 상대방이 말하기 전에 먼저 물어보는 타입. 미스터리 소설이나 추리물을 좋아할 확률 높음.',
    warning: '너무 많이 보이면 피곤할 수 있어요. 모든 것을 분석하지 않아도 됩니다. 가끔은 "보여도 넘기기"도 필요합니다.',
    bestMatch: '매력적 이야기꾼 🎭',
    worstMatch: '열정 에너자이저 🔥'
  },
  FE2: {
    name: '매력적 이야기꾼', emoji: '🎭', desc: '사람을 끌어들이는 매력 보유자', subKey: 'charm',
    detail: '당신에게는 이상한 능력이 있습니다. 편의점에서 삼각김밥 고른 이야기도 당신이 하면 넷플릭스 시리즈가 됩니다. 사람들이 당신 이야기에 빠져드는 이유는 화려한 언변이 아니라, 진심이 묻어나기 때문이에요. 당신은 경험을 "이야기"로 바꾸는 연금술사이고, 그 과정에서 사람들의 마음까지 열어버립니다.',
    funFact: '"아 그거 있잖아—" 로 시작하면 주변 사람들이 자세를 고쳐 앉습니다. 인스타 스토리 조회수 상위권. 짧은 글에도 서사를 집어넣는 타고난 콘텐츠 크리에이터.',
    warning: '모든 사람에게 에너지를 쏟다 보면 정작 자기 이야기를 할 상대가 없을 수 있어요. 당신의 이야기를 들어줄 사람도 필요합니다.',
    bestMatch: '날카로운 관찰자 🔍',
    worstMatch: '조용한 해결사 🧊'
  },
  FI2: {
    name: '깊은 공감러', emoji: '🌊', desc: '남의 감정을 잘 읽는 조용한 위로자', subKey: 'empathy',
    detail: '당신은 사람의 마음에 와이파이가 연결된 사람입니다. 친구가 "나 괜찮아"라고 말해도 목소리 떨림 0.5초만에 "아닌 거 다 아는데?"라고 할 수 있죠. 많은 말이 필요 없는 위로를 할 줄 아는 사람. 당신이 옆에 앉아서 조용히 같이 있어주는 것만으로도 상대방은 울컥합니다.',
    funFact: '친구들의 고민 상담 1순위. "너한테만 말하는 건데..." 를 가장 많이 듣는 사람. 남의 고민을 들으면서 같이 우는 경우 종종 있음. 공감 능력 때문에 슬픈 영화는 극장에서 볼 수가 없습니다.',
    warning: '다른 사람의 감정을 너무 흡수하면 자기 감정이 고갈됩니다. 남을 돌보기 전에 자기 자신에게 "너는 괜찮아?"라고 먼저 물어봐 주세요.',
    bestMatch: '즉흥적 실행가 ⚡',
    worstMatch: '전략적 리더 ♟️'
  }
};

/**
 * 메인 분석 함수
 * @param {Object} selfCheckAnswers - 셀프체크 답변
 * @param {string[]} essayTexts - 주관식 답변 3개
 * @returns {Object} 분석 결과
 */
function analyzePersonality(selfCheckAnswers, essayTexts) {
  // 1. 셀프체크 기본 점수
  const selfResult = calculateSelfType(selfCheckAnswers);

  // 2. 주관식 텍스트 합치기 + 키워드 추출 (에세이별 개별 분석 포함)
  const combinedText = essayTexts.join(' ');
  const kwResult = extractKeywords(combinedText, essayTexts);

  // 3. 사고축 점수 계산 (T vs F: -100 ~ +100)
  // 셀프체크 Q1 가중치: 40%
  // 주관식 감정어 비율: 40%
  // 주관식 논리어 비율: 20%
  const emotionRatio = kwResult.totalMatched > 0
    ? kwResult.emotionCount / kwResult.totalMatched
    : 0.5;
  const logicRatio = kwResult.totalMatched > 0
    ? kwResult.logicCount / kwResult.totalMatched
    : 0.5;

  // 감정어 많으면 F(-) 방향, 논리어 많으면 T(+) 방향
  const emotionScore = (logicRatio - emotionRatio) * 200; // -200 ~ +200 범위를 -100~100으로
  const selfThinkingComponent = selfResult.thinkingScore * 0.4;
  const emotionComponent = Math.max(-100, Math.min(100, emotionScore)) * 0.4;
  const logicComponent = (logicRatio > emotionRatio ? 50 : -50) * 0.2;
  let thinkingFinal = selfThinkingComponent + emotionComponent + logicComponent;
  thinkingFinal = Math.max(-100, Math.min(100, thinkingFinal));

  // 4. 에너지축 점수 계산 (E vs I: -100 ~ +100)
  // 셀프체크 Q2 가중치: 40%
  // 셀프체크 Q3 가중치: 30%
  // 주관식 글자수/문장 비율: 30%
  const q2Option = SELFCHECK_QUESTIONS[1].options.find(o => o.value === selfCheckAnswers.social);
  const q3Option = SELFCHECK_QUESTIONS[2].options.find(o => o.value === selfCheckAnswers.stress);
  const q2Score = q2Option ? q2Option.score : 0;
  const q3Score = q3Option ? q3Option.score : 0;

  // 글자수 기반: 평균 200자 기준, 많이 쓸수록 외향
  const avgCharsPerEssay = kwResult.charCount / 3;
  const verbosityScore = Math.max(-80, Math.min(80, (avgCharsPerEssay - 200) * 0.4));

  const energyFromSocial = kwResult.socialExtrovert - kwResult.socialIntrovert;
  const socialBonus = Math.max(-30, Math.min(30, energyFromSocial * 10));

  let energyFinal = (q2Score * 0.4) + (q3Score * 0.3) + ((verbosityScore + socialBonus) * 0.3);
  energyFinal = Math.max(-100, Math.min(100, energyFinal));

  // 5. 8유형 결정 (서브타입 분기)
  const isT = thinkingFinal >= 0;
  const isE = energyFinal >= 0;

  let finalType;
  if (isT && isE) {
    // TE vs TE2 (즉흥적 실행가): 행동어가 많으면 TE2
    finalType = selfCheckAnswers.stress === 'action' || verbosityScore > 30 ? 'TE2' : 'TE';
  } else if (isT && !isE) {
    // TI vs TI2 (날카로운 관찰자): 관찰 선택 or 논리어 많으면 TI2
    finalType = selfCheckAnswers.social === 'observe' || logicRatio > 0.3 ? 'TI2' : 'TI';
  } else if (!isT && isE) {
    // FE vs FE2 (매력적 이야기꾼): 관계어 많으면 FE2
    finalType = kwResult.socialExtrovert > 3 || selfCheckAnswers.social === 'lead' ? 'FE2' : 'FE';
  } else {
    // FI vs FI2 (깊은 공감러): 관계어+감정어 많으면 FI2
    finalType = kwResult.emotionCount > 5 && selfCheckAnswers.social === 'deep' ? 'FI2' : 'FI';
  }

  // 6. 감정 DNA 계산
  const dna = calculateDNA(kwResult.dna);

  // 7. 셀프 갭 계산
  const selfType = selfResult.selfType;
  const baseType = finalType.replace('2', '');
  const gapLevel = calculateGap(selfType, baseType);

  // 8. 대표 키워드
  const mainKeyword = kwResult.topKeywords[0] || '생각';

  // 9. 텍스트 통계
  const textStats = {
    exclamationCount: kwResult.exclamationCount,
    questionCount: kwResult.questionCount,
    emojiCount: kwResult.emojiCount,
    charCount: kwResult.charCount,
    sentenceCount: kwResult.sentenceCount
  };

  // 10. 딥 패턴 추출
  const deepPatterns = extractDeepPatterns(essayTexts, kwResult);

  return {
    finalType,
    typeInfo: TYPE_INFO[finalType],
    selfType,
    selfTypeInfo: TYPE_INFO[selfType] || TYPE_INFO.TE,
    thinkingScore: Math.round(thinkingFinal),
    energyScore: Math.round(energyFinal),
    dna,
    gapLevel, // 'match', 'slight', 'big'
    mainKeyword,
    textStats,
    topKeywords: kwResult.topKeywords,
    deepPatterns,
    keywordDetails: kwResult.matchedDetails,
    perEssayAnalysis: kwResult.perEssay
  };
}

/**
 * 감정 DNA 계산 (상위 3개 반환)
 */
function calculateDNA(rawDna) {
  const total = Object.values(rawDna).reduce((a, b) => a + b, 0) || 1;
  const dnaList = Object.entries(rawDna).map(([name, count]) => ({
    name,
    score: Math.round((count / total) * 100)
  }));

  // 최소 점수 보장 (전부 0이면 랜덤 배분)
  if (total <= 1) {
    const defaults = [
      { name: '호기심', score: 65 },
      { name: '차분함', score: 52 },
      { name: '감성', score: 48 },
      { name: '따뜻함', score: 40 },
      { name: '열정', score: 35 },
      { name: '유머', score: 30 }
    ];
    // 약간의 랜덤성 추가
    return defaults.map(d => ({
      ...d,
      score: d.score + Math.floor(Math.random() * 20 - 10)
    })).sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // 점수 스케일링 (30~95% 범위로)
  const maxScore = Math.max(...dnaList.map(d => d.score));
  const scaled = dnaList.map(d => ({
    ...d,
    score: Math.max(25, Math.min(95, Math.round((d.score / (maxScore || 1)) * 85 + 10)))
  }));

  return scaled.sort((a, b) => b.score - a.score).slice(0, 3);
}

/**
 * 딥 패턴 추출 (LLM 프롬프트 + 클라이언트 폴백 양쪽에 활용)
 * @param {string[]} essayTexts - 주관식 답변 3개
 * @param {Object} kwResult - extractKeywords() 결과
 * @returns {Object} 딥 패턴 데이터
 */
function extractDeepPatterns(essayTexts, kwResult) {
  const combinedText = essayTexts.join(' ');

  // 1. 문장 분리 (마침표, 느낌표, 물음표, 줄바꿈 기준)
  const allSentences = combinedText
    .split(/[.!?\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // 2. 대표 문장 3개 (키워드 밀도 높은 20~80자 문장)
  const topQuotes = _selectTopQuotes(allSentences, kwResult);

  // 3. 문장 통계
  const sentenceLengths = allSentences.map(s => s.length);
  const avgSentenceLength = sentenceLengths.length > 0
    ? Math.round(sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length)
    : 0;
  const sentenceLengthVariance = sentenceLengths.length > 1
    ? Math.round(sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgSentenceLength, 2), 0) / sentenceLengths.length)
    : 0;

  // 4. 자기 언급 비율
  const selfWords = (combinedText.match(/나는|나의|내가|저는|저의|제가|내 |나 /g) || []).length;
  const totalWords = combinedText.split(/\s+/).filter(w => w.length > 0).length || 1;
  const selfMentionRatio = Math.round((selfWords / totalWords) * 100);

  // 5. 타인 언급 비율
  const otherWords = (combinedText.match(/친구|사람들|누가|다른 사람|주변|동료|선배|후배/g) || []).length;
  const otherMentionRatio = Math.round((otherWords / totalWords) * 100);

  // 6. 문체 특징
  const ellipsisCount = (combinedText.match(/\.{3}|…/g) || []).length;
  const conditionalCount = (combinedText.match(/만약|~면|라면|한다면|했다면|다면|경우에|때문에/g) || []).length;
  const negativeCount = (combinedText.match(/않|못|안 |없|아니|싫|거부|반대/g) || []).length;

  // 어휘 다양성 (고유 2자 이상 단어 / 전체 단어)
  const words = combinedText.replace(/[^가-힣a-zA-Z\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
  const uniqueWords = new Set(words);
  const vocabularyDiversity = words.length > 0
    ? Math.round((uniqueWords.size / words.length) * 100)
    : 0;

  // 7. 에세이별 길이 추이
  const essayLengths = essayTexts.map(t => t.length);
  let lengthTrend = 'stable';
  if (essayLengths.length >= 3) {
    if (essayLengths[2] > essayLengths[0] * 1.2) lengthTrend = 'increasing';
    else if (essayLengths[2] < essayLengths[0] * 0.8) lengthTrend = 'decreasing';
  }

  // 8. 가장 긴 문장
  const longestSentence = allSentences.reduce(
    (longest, s) => s.length > longest.length ? s : longest, ''
  );

  return {
    topQuotes,
    sentenceCount: allSentences.length,
    avgSentenceLength,
    sentenceLengthVariance,
    selfMentionRatio,
    otherMentionRatio,
    ellipsisCount,
    conditionalCount,
    negativeCount,
    vocabularyDiversity,
    essayLengths,
    lengthTrend,
    longestSentence: longestSentence.length > 80
      ? longestSentence.slice(0, 77) + '...'
      : longestSentence,
    charCount: combinedText.length,
    emotionCount: kwResult.emotionCount,
    logicCount: kwResult.logicCount,
    questionCount: kwResult.questionCount
  };
}

/**
 * 키워드 밀도 높은 20~80자 대표 문장 3개 선별
 */
function _selectTopQuotes(sentences, kwResult) {
  // 모든 키워드 목록 만들기
  const allKeywords = [];
  for (const cat of Object.values(KEYWORDS)) {
    for (const subcat of Object.values(cat)) {
      if (Array.isArray(subcat)) {
        allKeywords.push(...subcat);
      }
    }
  }

  // 문장별 키워드 밀도 계산 (20~80자 필터)
  const scored = sentences
    .filter(s => s.length >= 20 && s.length <= 80)
    .map(s => {
      let density = 0;
      for (const kw of allKeywords) {
        if (s.includes(kw)) density++;
      }
      return { text: s, density };
    })
    .sort((a, b) => b.density - a.density);

  // 상위 3개, 중복 방지 (너무 비슷한 문장 제외)
  const selected = [];
  for (const item of scored) {
    if (selected.length >= 3) break;
    const isDuplicate = selected.some(s =>
      s.text.includes(item.text.slice(0, 10)) || item.text.includes(s.text.slice(0, 10))
    );
    if (!isDuplicate) {
      selected.push(item);
    }
  }

  // 3개 미만이면 길이 제한 완화해서 추가
  if (selected.length < 3) {
    const fallback = sentences
      .filter(s => s.length >= 10 && !selected.some(sel => sel.text === s))
      .slice(0, 3 - selected.length)
      .map(s => ({
        text: s.length > 80 ? s.slice(0, 77) + '...' : s,
        density: 0
      }));
    selected.push(...fallback);
  }

  return selected.map(s => s.text);
}

/**
 * 셀프 갭 레벨 계산
 */
function calculateGap(selfType, finalBaseType) {
  if (selfType === finalBaseType) return 'match';

  // 축 하나만 다르면 slight
  const sameThinking = selfType[0] === finalBaseType[0];
  const sameEnergy = selfType[1] === finalBaseType[1];
  if (sameThinking || sameEnergy) return 'slight';

  // 둘 다 다르면 big
  return 'big';
}
