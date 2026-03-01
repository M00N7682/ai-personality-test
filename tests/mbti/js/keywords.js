/**
 * 키워드 사전 (약 400단어)
 * 카테고리: 감정어, 논리어, 관계어, 가치관어, 행동어
 * 감정 DNA용: 호기심, 따뜻함, 열정, 차분함, 유머, 감성
 */

const KEYWORDS = {
  // ===== 감정어 (감성 축 F 가중) =====
  emotion: {
    positive: [
      '행복', '기쁘', '즐거', '좋아', '사랑', '설레', '감동', '뿌듯',
      '신나', '웃기', '재밌', '흥미', '감사', '다행', '편안', '따뜻',
      '포근', '희망', '기대', '두근', '반가', '고마', '만족', '평화',
      '황홀', '짜릿', '벅차', '충만', '감격', '환희'
    ],
    negative: [
      '슬프', '우울', '외로', '힘들', '괴로', '불안', '걱정', '무서',
      '답답', '짜증', '화나', '속상', '서운', '아프', '지치', '피곤',
      '스트레스', '절망', '공허', '허무', '억울', '분노', '질투', '후회',
      '미안', '죄책감', '두렵', '막막', '초조', '긴장'
    ],
    intensity: [
      '너무', '진짜', '정말', '완전', '엄청', '미치', '극도', '최고',
      '최악', '대박', '실화', '역대', '미친', '개', '존나', 'ㅋㅋ',
      'ㅠㅠ', 'ㅎㅎ', '!!!', '???', '와', '헐'
    ]
  },

  // ===== 논리어 (이성 축 T 가중) =====
  logic: {
    analysis: [
      '생각', '판단', '분석', '이유', '원인', '결과', '논리', '근거',
      '효율', '합리', '객관', '체계', '구조', '전략', '계획', '목표',
      '방법', '과정', '시스템', '데이터', '통계', '확률', '비교', '평가'
    ],
    reasoning: [
      '왜냐하면', '따라서', '그러므로', '때문에', '결국', '결론',
      '만약', '가정', '경우', '조건', '기준', '원칙', '규칙', '법칙',
      '정의', '개념', '의미', '본질', '핵심', '요점'
    ],
    practical: [
      '실용', '현실', '실제', '구체', '명확', '정확', '확실', '분명',
      '증거', '사실', '진실', '거짓', '옳', '틀리', '맞', '아니'
    ]
  },

  // ===== 관계어 (외향/내향 축) =====
  social: {
    extrovert: [
      '친구', '사람들', '모임', '파티', '같이', '함께', '우리', '다같이',
      '만나', '놀러', '여행', '소통', '대화', '수다', '떠들', '웃음',
      '분위기', '에너지', '활기', '신나는', '재미있는', '어울리'
    ],
    introvert: [
      '혼자', '나만', '조용', '고요', '평온', '산책', '독서', '음악',
      '영화', '글쓰기', '생각', '묵상', '내면', '마음속', '깊이',
      '집중', '몰입', '사색', '관찰', '느긋', '여유', '쉬'
    ],
    relationship: [
      '가족', '연인', '남친', '여친', '엄마', '아빠', '형', '누나',
      '동생', '선배', '후배', '동료', '팀', '사이', '관계', '신뢰',
      '이해', '공감', '배려', '존중', '위로', '응원', '도움'
    ]
  },

  // ===== 가치관어 =====
  values: {
    growth: [
      '성장', '발전', '도전', '노력', '꿈', '미래', '목표', '열심',
      '최선', '포기', '의지', '결심', '각오', '변화', '시작', '끝',
      '완성', '성공', '실패', '경험', '배움', '깨달'
    ],
    freedom: [
      '자유', '독립', '개성', '나다운', '내 길', '선택', '결정',
      '소신', '주관', '취향', '개인', '프라이버시', '자율', '해방'
    ],
    stability: [
      '안정', '평화', '일상', '루틴', '반복', '익숙', '편안', '안전',
      '보장', '유지', '지속', '꾸준', '차근차근', '천천히', '단단'
    ]
  },

  // ===== 행동어 =====
  action: {
    active: [
      '달리', '뛰', '운동', '여행', '도전', '시도', '만들', '창작',
      '요리', '춤', '노래', '게임', '쇼핑', '카페', '맛집', '드라이브'
    ],
    passive: [
      '듣', '보', '읽', '감상', '느끼', '기다리', '참', '견디',
      '받아들이', '지켜보', '넘기', '흘리', '무시'
    ],
    creative: [
      '상상', '아이디어', '영감', '창의', '독특', '특별', '새로운',
      '다른', '신기', '궁금', '호기심', '탐구', '발견', '실험'
    ]
  },

  // ===== 감각어 (S/N축) =====
  sensing: {
    concrete: [
      '정확히', '구체적', '숫자', '사실', '현실', '실제', '데이터', '경험',
      '직접', '눈으로', '손으로', '만져', '확인', '증거', '세부', '디테일'
    ],
    abstract: [
      '가능성', '상상', '미래', '패턴', '의미', '비유', '상징', '영감',
      '직감', '아이디어', '혁신', '창조', '비전', '통찰', '본질', '철학'
    ]
  },

  // ===== 판단어 (J/P축) =====
  judging: {
    structured: [
      '계획', '일정', '정리', '체계', '순서', '규칙', '마감', '완료',
      '준비', '목록', '단계', '기한', '약속', '루틴', '스케줄', '정해진'
    ],
    flexible: [
      '즉흥', '자유', '유연', '적응', '변화', '느긋', '여유', '흘러가는',
      '그때그때', '기분따라', '열린', '다양', '탐색', '자발적', '모험', '즐기'
    ]
  }
};

/**
 * 감정 DNA 키워드 매핑
 * 각 DNA 카테고리에 매핑되는 키워드들
 */
const DNA_KEYWORDS = {
  호기심: [
    '궁금', '신기', '왜', '어떻게', '탐구', '발견', '알고싶', '관심',
    '흥미', '호기심', '새로운', '처음', '독특', '신비', '실험', '모험',
    '배우', '공부', '연구', '조사', '탐색', '찾', '깊이', '파고',
    '이해', '질문', '의문', '궁금증', '놀라', '신선'
  ],
  따뜻함: [
    '사랑', '감사', '고마', '따뜻', '포근', '다정', '친절', '배려',
    '위로', '응원', '도움', '나누', '봉사', '돌봄', '보살', '안아',
    '미소', '다독', '격려', '챙기', '마음', '진심', '정성', '소중',
    '가족', '엄마', '아빠', '할머니', '할아버지', '아이'
  ],
  열정: [
    '열정', '도전', '목표', '꿈', '성장', '노력', '최선', '열심',
    '간절', '의지', '각오', '불태우', '뜨거', '강렬', '폭발', '미친듯이',
    '전력', '달려', '포기하지', '끝까지', '반드시', '기필코', '성공',
    '완벽', '압도', '파이팅', '화이팅', '힘내', '이겨', '극복'
  ],
  차분함: [
    '차분', '조용', '평화', '고요', '잔잔', '느긋', '여유', '천천히',
    '가만히', '편안', '안정', '무난', '담담', '덤덤', '침착', '냉정',
    '이성', '논리', '객관', '분석', '판단', '관찰', '지켜보', '기다리',
    '참', '인내', '끈기', '묵묵', '꾸준', '차근차근'
  ],
  유머: [
    '웃기', '재밌', 'ㅋㅋ', 'ㅎㅎ', 'ㅋ', '하하', '호호', '농담',
    '유머', '개그', '장난', '놀리', '웃음', '빵터', '코미디', '병맛',
    '드립', '짤', '밈', '센스', '위트', '재치', '엉뚱', '황당',
    '어이없', '기가막히', '대박', '실화', 'ㅋㅋㅋ', 'ㅎㅎㅎ'
  ],
  감성: [
    '감성', '감동', '눈물', '울', '뭉클', '찡', '서정', '아름다',
    '예쁘', '로맨틱', '낭만', '추억', '그리', '옛날', '향수', '노을',
    '달', '별', '바다', '하늘', '바람', '비', '꽃', '봄',
    '가을', '밤', '새벽', '음악', '노래', '시'
  ]
};

/**
 * 텍스트에서 키워드를 추출하고 카테고리별 빈도를 계산
 * @param {string} text - 분석할 텍스트 (합산 또는 개별 에세이)
 * @param {string[]} [essayTexts] - 에세이별 개별 분석용 (옵션)
 * @returns {Object} 키워드 분석 결과
 */
function extractKeywords(text, essayTexts) {
  const result = {
    emotionCount: 0,
    logicCount: 0,
    socialExtrovert: 0,
    socialIntrovert: 0,
    sensingCount: 0,
    intuitionCount: 0,
    judgingCount: 0,
    perceivingCount: 0,
    totalMatched: 0,
    topKeywords: [],
    dna: { 호기심: 0, 따뜻함: 0, 열정: 0, 차분함: 0, 유머: 0, 감성: 0 },
    exclamationCount: (text.match(/!/g) || []).length,
    questionCount: (text.match(/\?/g) || []).length,
    emojiCount: (text.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length,
    sentenceCount: text.split(/[.!?\n]+/).filter(s => s.trim().length > 0).length,
    charCount: text.length,
    matchedDetails: {},  // 매칭된 키워드 전체 목록 + 출현 횟수
    perEssay: []         // 에세이별 개별 분석
  };

  const matchedKeywords = {};

  // 감정어 매칭
  for (const subcat of Object.values(KEYWORDS.emotion)) {
    for (const kw of subcat) {
      if (text.includes(kw)) {
        const count = text.split(kw).length - 1;
        result.emotionCount++;
        result.totalMatched++;
        matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
        result.matchedDetails[kw] = { category: 'emotion', count };
      }
    }
  }

  // 논리어 매칭
  for (const subcat of Object.values(KEYWORDS.logic)) {
    for (const kw of subcat) {
      if (text.includes(kw)) {
        const count = text.split(kw).length - 1;
        result.logicCount++;
        result.totalMatched++;
        matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
        result.matchedDetails[kw] = { category: 'logic', count };
      }
    }
  }

  // 관계어 매칭
  for (const kw of KEYWORDS.social.extrovert) {
    if (text.includes(kw)) {
      const count = text.split(kw).length - 1;
      result.socialExtrovert++;
      result.totalMatched++;
      matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
      result.matchedDetails[kw] = { category: 'social.extrovert', count };
    }
  }
  for (const kw of KEYWORDS.social.introvert) {
    if (text.includes(kw)) {
      const count = text.split(kw).length - 1;
      result.socialIntrovert++;
      result.totalMatched++;
      matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
      result.matchedDetails[kw] = { category: 'social.introvert', count };
    }
  }

  // 감각어 매칭 (S/N축)
  if (KEYWORDS.sensing) {
    for (const kw of (KEYWORDS.sensing.concrete || [])) {
      if (text.includes(kw)) {
        const count = text.split(kw).length - 1;
        result.sensingCount++;
        result.totalMatched++;
        matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
        result.matchedDetails[kw] = { category: 'sensing.concrete', count };
      }
    }
    for (const kw of (KEYWORDS.sensing.abstract || [])) {
      if (text.includes(kw)) {
        const count = text.split(kw).length - 1;
        result.intuitionCount++;
        result.totalMatched++;
        matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
        result.matchedDetails[kw] = { category: 'sensing.abstract', count };
      }
    }
  }

  // 판단어 매칭 (J/P축)
  if (KEYWORDS.judging) {
    for (const kw of (KEYWORDS.judging.structured || [])) {
      if (text.includes(kw)) {
        const count = text.split(kw).length - 1;
        result.judgingCount++;
        result.totalMatched++;
        matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
        result.matchedDetails[kw] = { category: 'judging.structured', count };
      }
    }
    for (const kw of (KEYWORDS.judging.flexible || [])) {
      if (text.includes(kw)) {
        const count = text.split(kw).length - 1;
        result.perceivingCount++;
        result.totalMatched++;
        matchedKeywords[kw] = (matchedKeywords[kw] || 0) + count;
        result.matchedDetails[kw] = { category: 'judging.flexible', count };
      }
    }
  }

  // DNA 키워드 매칭
  for (const [dnaName, dnaKws] of Object.entries(DNA_KEYWORDS)) {
    for (const kw of dnaKws) {
      if (text.includes(kw)) {
        result.dna[dnaName] += (text.split(kw).length - 1);
      }
    }
  }

  // 상위 키워드 추출
  const sorted = Object.entries(matchedKeywords).sort((a, b) => b[1] - a[1]);
  result.topKeywords = sorted.slice(0, 5).map(([kw]) => kw);

  // fallback: 매칭 실패 시 가장 긴 단어를 추출
  if (result.topKeywords.length === 0) {
    const words = text.replace(/[^가-힣a-zA-Z\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
    const longestWord = words.sort((a, b) => b.length - a.length)[0];
    if (longestWord) {
      result.topKeywords = [longestWord];
    }
  }

  // 에세이별 개별 분석
  if (essayTexts && essayTexts.length > 0) {
    result.perEssay = essayTexts.map((essayText, idx) => {
      let emotionCount = 0, logicCount = 0, socialCount = 0;
      const essayMatched = {};

      for (const subcat of Object.values(KEYWORDS.emotion)) {
        for (const kw of subcat) {
          if (essayText.includes(kw)) {
            emotionCount++;
            essayMatched[kw] = (essayMatched[kw] || 0) + (essayText.split(kw).length - 1);
          }
        }
      }
      for (const subcat of Object.values(KEYWORDS.logic)) {
        for (const kw of subcat) {
          if (essayText.includes(kw)) {
            logicCount++;
            essayMatched[kw] = (essayMatched[kw] || 0) + (essayText.split(kw).length - 1);
          }
        }
      }
      for (const kw of [...KEYWORDS.social.extrovert, ...KEYWORDS.social.introvert]) {
        if (essayText.includes(kw)) {
          socialCount++;
          essayMatched[kw] = (essayMatched[kw] || 0) + (essayText.split(kw).length - 1);
        }
      }

      return {
        index: idx,
        charCount: essayText.length,
        emotionCount,
        logicCount,
        socialCount,
        topKeywords: Object.entries(essayMatched).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([kw]) => kw)
      };
    });
  }

  return result;
}
