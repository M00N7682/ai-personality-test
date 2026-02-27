/**
 * 질문 데이터 + 셀프체크 로직
 * 4축 MBTI 기반: E/I, S/N, T/F, J/P
 * 총 24문항
 */

const SELFCHECK_QUESTIONS = [
  // --- 사고축 (thinking: T/F) ---
  {
    id: 'thinking',
    question: '나는 어떤 타입이라고 생각해요?',
    options: [
      { label: '머리가 먼저 움직이는 이성적 타입', value: 'T', axis: 'thinking', score: 80 },
      { label: '마음이 먼저 움직이는 감성적 타입', value: 'F', axis: 'thinking', score: -80 },
      { label: '때에 따라 다른 균형 타입', value: 'B', axis: 'thinking', score: 0 }
    ]
  },
  {
    id: 'decision',
    question: '중요한 결정을 내릴 때?',
    options: [
      { label: '장단점을 꼼꼼히 비교하고 결정', value: 'analyze', axis: 'thinking', score: 60, secondaryAxis: 'sensing', secondaryScore: 30 },
      { label: '직감이 이끄는 대로 결정', value: 'intuition', axis: 'thinking', score: -60, secondaryAxis: 'sensing', secondaryScore: -40 },
      { label: '주변 사람들 의견을 많이 들어봄', value: 'consult', axis: 'energy', score: 40 },
      { label: '일단 해보고 아니면 바꿈', value: 'trial', axis: 'thinking', score: -20, secondaryAxis: 'judging', secondaryScore: -40 }
    ]
  },
  {
    id: 'conflict',
    question: '친구와 의견이 다를 때?',
    options: [
      { label: '내 논리를 설명해서 설득하려 함', value: 'persuade', axis: 'thinking', score: 50 },
      { label: '상대 기분을 먼저 살핌', value: 'empathy', axis: 'thinking', score: -50 },
      { label: '일단 맞춰주고 나중에 생각', value: 'yield', axis: 'thinking', score: -30 },
      { label: '각자 다를 수 있다고 넘김', value: 'accept', axis: 'energy', score: -20 }
    ]
  },
  {
    id: 'compliment',
    question: '칭찬받을 때 가장 기분 좋은 말?',
    options: [
      { label: '"진짜 똑똑하다"', value: 'smart', axis: 'thinking', score: 40 },
      { label: '"같이 있으면 편해"', value: 'comfort', axis: 'thinking', score: -40 },
      { label: '"넌 진짜 재밌어"', value: 'fun', axis: 'energy', score: 50 },
      { label: '"넌 믿을 수 있어"', value: 'trust', axis: 'thinking', score: 20 }
    ]
  },
  {
    id: 'movie',
    question: '영화 볼 때 끌리는 장르는?',
    options: [
      { label: '추리/스릴러 (반전이 좋아)', value: 'thriller', axis: 'thinking', score: 45, secondaryAxis: 'sensing', secondaryScore: -30 },
      { label: '로맨스/드라마 (감정이입)', value: 'romance', axis: 'thinking', score: -50, secondaryAxis: 'sensing', secondaryScore: 20 },
      { label: '다큐/논픽션 (배우는 게 좋아)', value: 'docu', axis: 'thinking', score: 55, secondaryAxis: 'sensing', secondaryScore: 35 },
      { label: '코미디/예능 (웃기면 장땡)', value: 'comedy', axis: 'energy', score: 30 }
    ]
  },
  {
    id: 'argument',
    question: '논쟁에서 가장 중요한 건?',
    options: [
      { label: '사실과 근거', value: 'facts', axis: 'thinking', score: 55 },
      { label: '상대방의 감정', value: 'feelings', axis: 'thinking', score: -55 },
      { label: '결론을 빨리 내는 것', value: 'resolve', axis: 'thinking', score: 25 },
      { label: '서로 이해하는 것', value: 'understand', axis: 'thinking', score: -30 }
    ]
  },
  {
    id: 'mistake',
    question: '실수했을 때 먼저 드는 생각은?',
    options: [
      { label: '원인이 뭐였지? 분석부터', value: 'analyze', axis: 'thinking', score: 50 },
      { label: '아 진짜 속상하다...', value: 'sad', axis: 'thinking', score: -50 },
      { label: '어떻게 수습하지?', value: 'fix', axis: 'thinking', score: 30 },
      { label: '누가 봤을까 걱정', value: 'worry', axis: 'energy', score: 20 }
    ]
  },
  {
    id: 'advice',
    question: '친구가 고민 상담을 해오면?',
    options: [
      { label: '해결책을 같이 찾아줌', value: 'solve', axis: 'thinking', score: 50 },
      { label: '일단 공감하고 들어줌', value: 'listen', axis: 'thinking', score: -50 },
      { label: '"그럴 수 있지" 하고 편하게 해줌', value: 'comfort', axis: 'thinking', score: -25 },
      { label: '비슷한 내 경험을 얘기해줌', value: 'share', axis: 'energy', score: 30 }
    ]
  },
  {
    id: 'plan',
    question: '여행 계획은?',
    options: [
      { label: '시간대별로 꼼꼼하게 짬', value: 'detail', axis: 'thinking', score: 45, secondaryAxis: 'judging', secondaryScore: 60 },
      { label: '가서 느낌 오는 대로', value: 'freeflow', axis: 'thinking', score: -45, secondaryAxis: 'judging', secondaryScore: -60 },
      { label: '맛집이랑 핵심만 정하고 나머진 자유', value: 'semi', axis: 'thinking', score: 10, secondaryAxis: 'judging', secondaryScore: 10 },
      { label: '누가 짜주면 따라감', value: 'follow', axis: 'energy', score: -15, secondaryAxis: 'judging', secondaryScore: -20 }
    ]
  },
  // --- 에너지축 (energy: E/I) ---
  {
    id: 'social',
    question: '모임에서 나는 보통?',
    options: [
      { label: '분위기를 이끄는 편', value: 'lead', axis: 'energy', score: 80 },
      { label: '리액션으로 분위기에 기여하는 편', value: 'react', axis: 'energy', score: 40 },
      { label: '조용히 관찰하는 편', value: 'observe', axis: 'energy', score: -60 },
      { label: '소수랑 깊은 대화하는 편', value: 'deep', axis: 'energy', score: -30 }
    ]
  },
  {
    id: 'stress',
    question: '스트레스 받으면?',
    options: [
      { label: '혼자만의 시간으로 해결', value: 'alone', axis: 'energy', score: -70 },
      { label: '누군가에게 얘기하면서 해결', value: 'talk', axis: 'energy', score: 60 },
      { label: '몸을 움직이거나 뭔가 하면서 해결', value: 'action', axis: 'energy', score: 30 },
      { label: '일단 잊으려고 딴 걸 함', value: 'avoid', axis: 'energy', score: -10 }
    ]
  },
  {
    id: 'weekend',
    question: '이상적인 주말은?',
    options: [
      { label: '친구들이랑 맛집, 카페 투어', value: 'social', axis: 'energy', score: 70 },
      { label: '혼자 넷플릭스 or 게임 몰입', value: 'solo', axis: 'energy', score: -70 },
      { label: '소수 친한 친구랑 조용히', value: 'small', axis: 'energy', score: -20 },
      { label: '새로운 경험이나 장소 탐험', value: 'explore', axis: 'energy', score: 50 }
    ]
  },
  {
    id: 'anger',
    question: '화가 나면 어떤 편이에요?',
    options: [
      { label: '속으로 삭이다가 정리되면 말함', value: 'suppress', axis: 'energy', score: -50 },
      { label: '바로 표현하는 편', value: 'express', axis: 'energy', score: 60 },
      { label: '논리적으로 왜 화났는지 설명', value: 'logic', axis: 'thinking', score: 50 },
      { label: '일단 그 자리를 피함', value: 'escape', axis: 'energy', score: -40 }
    ]
  },
  {
    id: 'phone',
    question: '전화 vs 문자?',
    options: [
      { label: '전화가 편함, 빨리 끝나잖아', value: 'call', axis: 'energy', score: 55 },
      { label: '문자가 편함, 생각 정리해서 보내니까', value: 'text', axis: 'energy', score: -55 },
      { label: '친한 사람은 전화, 나머진 문자', value: 'depends', axis: 'energy', score: -10 },
      { label: '가능하면 만나서 얘기', value: 'face', axis: 'energy', score: 70 }
    ]
  },
  {
    id: 'energy',
    question: '에너지가 충전되는 순간은?',
    options: [
      { label: '신나는 파티나 모임 다녀온 후', value: 'party', axis: 'energy', score: 70 },
      { label: '조용히 혼자 있는 시간', value: 'alone', axis: 'energy', score: -70 },
      { label: '좋아하는 사람과 1:1 대화', value: 'deep', axis: 'energy', score: -20 },
      { label: '새로운 사람들 만났을 때', value: 'newpeople', axis: 'energy', score: 50 }
    ]
  },
  {
    id: 'newgroup',
    question: '처음 보는 사람들과의 모임에서?',
    options: [
      { label: '먼저 말 걸고 분위기 만듦', value: 'initiate', axis: 'energy', score: 70 },
      { label: '누가 말 걸어주면 반갑게 대화', value: 'respond', axis: 'energy', score: 20 },
      { label: '옆에 한 명이랑 깊게 얘기', value: 'one', axis: 'energy', score: -30 },
      { label: '관찰하다가 필요하면 끼어듦', value: 'wait', axis: 'energy', score: -50 }
    ]
  },
  {
    id: 'sns',
    question: 'SNS 스타일은?',
    options: [
      { label: '일상 자주 올리고 소통 많이', value: 'active', axis: 'energy', score: 60 },
      { label: '가끔 올리지만 댓글은 열심히', value: 'moderate', axis: 'energy', score: 20 },
      { label: '거의 안 올리고 눈팅 위주', value: 'lurk', axis: 'energy', score: -50 },
      { label: '계정 자체가 없거나 안 씀', value: 'none', axis: 'energy', score: -40 }
    ]
  },
  {
    id: 'tired',
    question: '지칠 때 하고 싶은 건?',
    options: [
      { label: '아무도 안 만나고 쉬기', value: 'rest', axis: 'energy', score: -65 },
      { label: '친한 친구한테 연락하기', value: 'call', axis: 'energy', score: 45 },
      { label: '밖에 나가서 산책이라도', value: 'walk', axis: 'energy', score: 15 },
      { label: '사람 많은 카페에서 멍 때리기', value: 'cafe', axis: 'energy', score: 30 }
    ]
  },
  // --- 감각축 (sensing: S/N) ---
  {
    id: 'info',
    question: '새로운 정보를 받아들일 때?',
    options: [
      { label: '구체적인 사실과 데이터가 중요', value: 'facts', axis: 'sensing', score: 60 },
      { label: '전체적인 흐름과 의미가 중요', value: 'meaning', axis: 'sensing', score: -60 },
      { label: '직접 경험해봐야 이해됨', value: 'experience', axis: 'sensing', score: 40 },
      { label: '패턴이나 가능성을 먼저 봄', value: 'pattern', axis: 'sensing', score: -45 }
    ]
  },
  {
    id: 'conversation',
    question: '대화할 때 나는?',
    options: [
      { label: '실제 있었던 일 위주로 얘기', value: 'real', axis: 'sensing', score: 55 },
      { label: '아이디어나 가능성 얘기를 좋아함', value: 'idea', axis: 'sensing', score: -55 },
      { label: '구체적인 디테일을 잘 기억', value: 'detail', axis: 'sensing', score: 45 },
      { label: '비유나 상징적 표현을 자주 씀', value: 'metaphor', axis: 'sensing', score: -50 }
    ]
  },
  {
    id: 'project',
    question: '새 프로젝트를 시작할 때?',
    options: [
      { label: '검증된 방법으로 안전하게', value: 'proven', axis: 'sensing', score: 50 },
      { label: '새로운 방식으로 도전!', value: 'new', axis: 'sensing', score: -50 },
      { label: '현실적으로 가능한 것부터 체크', value: 'realistic', axis: 'sensing', score: 40 },
      { label: '큰 그림부터 그리고 시작', value: 'bigpicture', axis: 'sensing', score: -45 }
    ]
  },
  // --- 판단축 (judging: J/P) ---
  {
    id: 'cancel',
    question: '갑자기 약속이 취소되면?',
    options: [
      { label: '아까운데... 다른 계획을 세움', value: 'replan', axis: 'judging', score: 50 },
      { label: '오예! 자유시간 생겼다!', value: 'free', axis: 'judging', score: -60 },
      { label: '짜증남, 계획이 틀어졌잖아', value: 'annoyed', axis: 'judging', score: 65 },
      { label: '뭐 어때, 그때그때 알아서', value: 'whatever', axis: 'judging', score: -45 }
    ]
  },
  {
    id: 'todo',
    question: '할 일 목록(to-do list)에 대해?',
    options: [
      { label: '매일 쓰고 하나씩 체크하는 맛!', value: 'daily', axis: 'judging', score: 70 },
      { label: '머릿속에 대충 있음', value: 'mental', axis: 'judging', score: -30 },
      { label: '만들긴 하는데 잘 안 봄', value: 'make_ignore', axis: 'judging', score: 15 },
      { label: '리스트 없이도 잘 살아감', value: 'none', axis: 'judging', score: -55 }
    ]
  },
  {
    id: 'deadline',
    question: '마감이 다가오면?',
    options: [
      { label: '이미 끝내놨지 뭐', value: 'early', axis: 'judging', score: 70 },
      { label: '계획대로 착착 진행 중', value: 'ontrack', axis: 'judging', score: 45 },
      { label: '마감 직전에 폭발적 집중력 발휘', value: 'lastminute', axis: 'judging', score: -55 },
      { label: '마감? 유연하게 조정하면 되지', value: 'flexible', axis: 'judging', score: -50 }
    ]
  }
];

const ESSAY_QUESTIONS = [
  {
    id: 'thoughts',
    question: '요즘 가장 많이 하는 생각이 뭐예요?\n자유롭게 적어주세요.',
    purpose: '현재 관심사, 사고 패턴, 문장 구조 파악'
  },
  {
    id: 'emotion',
    question: '최근에 기분이 확 좋았거나\n확 안 좋았던 순간이 있어요?',
    purpose: '감정 표현 방식, 감정의 깊이, 구체성 파악'
  },
  {
    id: 'identity',
    question: '친한 친구가 나를 한 문장으로\n소개한다면 뭐라고 할 것 같아요?',
    purpose: '타인 시점의 자기 인식, 관계에서의 역할'
  }
];

/**
 * 셀프체크 결과에서 예상 MBTI 유형을 계산
 * returns { thinkingScore, energyScore, sensingScore, judgingScore, selfType }
 * selfType: 4글자 MBTI 코드 (예: "ENTJ")
 */
function calculateSelfType(answers) {
  let thinkingScore = 0;
  let energyScore = 0;
  let sensingScore = 0;
  let judgingScore = 0;

  for (const q of SELFCHECK_QUESTIONS) {
    const answer = answers[q.id];
    if (!answer) continue;
    const option = q.options.find(o => o.value === answer);
    if (!option) continue;

    // 주축 점수
    if (option.axis === 'thinking') {
      thinkingScore += option.score;
    } else if (option.axis === 'energy') {
      energyScore += option.score;
    } else if (option.axis === 'sensing') {
      sensingScore += option.score;
    } else if (option.axis === 'judging') {
      judgingScore += option.score;
    }

    // 보조축 점수 (이중 축 기여)
    if (option.secondaryAxis && option.secondaryScore) {
      if (option.secondaryAxis === 'sensing') {
        sensingScore += option.secondaryScore;
      } else if (option.secondaryAxis === 'judging') {
        judgingScore += option.secondaryScore;
      }
    }
  }

  // 정규화: 각 축의 질문 수에 따라 -100~100 범위로 스케일링
  const axisQuestionCount = (axis) => {
    return SELFCHECK_QUESTIONS.filter(q =>
      q.options.some(o => o.axis === axis) ||
      q.options.some(o => o.secondaryAxis === axis)
    ).length || 1;
  };

  thinkingScore = Math.max(-100, Math.min(100, Math.round(thinkingScore / axisQuestionCount('thinking') * 2)));
  energyScore = Math.max(-100, Math.min(100, Math.round(energyScore / axisQuestionCount('energy') * 2)));
  sensingScore = Math.max(-100, Math.min(100, Math.round(sensingScore / axisQuestionCount('sensing') * 2)));
  judgingScore = Math.max(-100, Math.min(100, Math.round(judgingScore / axisQuestionCount('judging') * 2)));

  // 4글자 MBTI 코드 결정
  const e_i = energyScore >= 0 ? 'E' : 'I';
  const s_n = sensingScore >= 0 ? 'S' : 'N';
  const t_f = thinkingScore >= 0 ? 'T' : 'F';
  const j_p = judgingScore >= 0 ? 'J' : 'P';
  const selfType = e_i + s_n + t_f + j_p;

  return { thinkingScore, energyScore, sensingScore, judgingScore, selfType };
}
