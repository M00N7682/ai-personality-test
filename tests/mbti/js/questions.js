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

// ============================================================
// AI_COMMENTS: 24문항 × 각 선택지별 AI 캐릭터 코멘트
// 캐릭터 로테이션: chatgpt → gemini → claude (3문항 단위 순환)
// ============================================================
const AI_COMMENTS = {

  // ── Q1: thinking (chatgpt) ──
  'thinking': {
    'T': { character: 'chatgpt', text: '논리적 사고를 선호하시는군요. 감정보다 이성이 앞서는 타입, 흥미롭습니다.' },
    'F': { character: 'chatgpt', text: '마음이 먼저 움직이시는 분이군요. 공감력이 높으신 분일 거라 생각합니다.' },
    'B': { character: 'chatgpt', text: '상황에 따라 유연하게 전환하시는 타입이시군요. 어쩌면 가장 어려운 능력일 수 있습니다.' }
  },

  // ── Q2: decision (gemini) ──
  'decision': {
    'analyze': { character: 'gemini', text: '장단점 비교! 스프레드시트 만드는 타입 아니에요? 체계적이라 멋져요 ✨' },
    'intuition': { character: 'gemini', text: '직감파! 본능이 이끄는 대로~ 의외로 정확할 때가 많죠 🎯' },
    'consult': { character: 'gemini', text: '주변 의견을 모으는 스타일! 소통의 달인이시네요 💬' },
    'trial': { character: 'gemini', text: '일단 부딪혀보는 행동파! 대박, 그 추진력 부럽다 🔥' }
  },

  // ── Q3: conflict (claude) ──
  'conflict': {
    'persuade': { character: 'claude', text: '설득하려는 편이라... 꽤 자기 확신이 강한 타입이군요.' },
    'empathy': { character: 'claude', text: '상대 기분을 먼저 살피다니. 솔직히, 쉬운 일은 아닌데.' },
    'yield': { character: 'claude', text: '일단 맞춰주고 나중에 생각한다... 은근히 전략적이네요.' },
    'accept': { character: 'claude', text: '흠, 각자 다를 수 있다고 넘기는 건 의외로 성숙한 선택이죠.' }
  },

  // ── Q4: compliment (chatgpt) ──
  'compliment': {
    'smart': { character: 'chatgpt', text: '지적 능력에 대한 인정을 중시하시는군요. 성취 지향적인 분일 것 같습니다.' },
    'comfort': { character: 'chatgpt', text: '편안함을 주는 사람으로 인정받고 싶으시군요. 관계를 소중히 여기시는 분이네요.' },
    'fun': { character: 'chatgpt', text: '재미있다는 칭찬이 가장 기쁘시다니. 함께하는 순간의 즐거움을 만드시는 분이시군요.' },
    'trust': { character: 'chatgpt', text: '신뢰를 가장 중요하게 여기시는군요. 깊은 관계를 추구하시는 분일 것 같습니다.' }
  },

  // ── Q5: movie (gemini) ──
  'movie': {
    'thriller': { character: 'gemini', text: '반전 매니아! 결말 예측하면서 보는 타입이죠? 🕵️ 저도 좋아해요!' },
    'romance': { character: 'gemini', text: '로맨스 감성 충만! 주인공 감정에 같이 울고 웃는 타입 💕' },
    'docu': { character: 'gemini', text: '다큐 좋아하는 사람 진짜 드문데! 지적 호기심이 대단하시네요 🧠' },
    'comedy': { character: 'gemini', text: '코미디 선택! 인생은 즐겨야 제맛이죠 ㅋㅋ 센스 있으시다 😆' }
  },

  // ── Q6: argument (claude) ──
  'argument': {
    'facts': { character: 'claude', text: '사실과 근거라... 논쟁에서 가장 강력한 무기를 고르셨네요.' },
    'feelings': { character: 'claude', text: '상대방 감정을 우선시하다니. 논쟁에서 이기는 것보다 관계가 중요한 거군요.' },
    'resolve': { character: 'claude', text: '결론을 빨리 내고 싶은 효율파. 솔직히 공감합니다.' },
    'understand': { character: 'claude', text: '서로 이해하는 게 중요하다... 이상적이지만, 꽤 어려운 선택이에요.' }
  },

  // ── Q7: mistake (chatgpt) ──
  'mistake': {
    'analyze': { character: 'chatgpt', text: '실수를 분석부터 하시는군요. 같은 실수를 반복하지 않으려는 합리적 접근이십니다.' },
    'sad': { character: 'chatgpt', text: '감정이 먼저 오시는 타입이시군요. 그만큼 일에 진심이신 분이실 겁니다.' },
    'fix': { character: 'chatgpt', text: '수습부터 생각하시는 실행력이 인상적이십니다. 위기에 강하신 분이시네요.' },
    'worry': { character: 'chatgpt', text: '타인의 시선을 신경 쓰시는군요. 그만큼 주변 관계를 중요하게 여기신다는 뜻이기도 합니다.' }
  },

  // ── Q8: advice (gemini) ──
  'advice': {
    'solve': { character: 'gemini', text: '해결사 타입! 친구들이 진짜 의지할 것 같아요 💪' },
    'listen': { character: 'gemini', text: '공감 먼저! 진짜 좋은 친구의 조건이에요 🥹 부러워~' },
    'comfort': { character: 'gemini', text: '편하게 해주는 스타일! 같이 있으면 마음이 놓이는 타입이네요 ☁️' },
    'share': { character: 'gemini', text: '경험 공유파! "나도 그랬어~" 하면서 공감대 형성하는 거죠? 좋다 👍' }
  },

  // ── Q9: plan (claude) ──
  'plan': {
    'detail': { character: 'claude', text: '시간대별 계획이라... 여행 스프레드시트 만드는 타입 맞죠?' },
    'freeflow': { character: 'claude', text: '느낌 가는 대로라. 용감하네요. 근데 솔직히 그게 더 재밌긴 하죠.' },
    'semi': { character: 'claude', text: '핵심만 정하고 나머진 자유. 흠, 꽤 현실적인 타협안이네요.' },
    'follow': { character: 'claude', text: '누가 짜주면 따라간다... 편한 건 맞는데, 가끔 주도권도 잡아보세요.' }
  },

  // ── Q10: social (chatgpt) ──
  'social': {
    'lead': { character: 'chatgpt', text: '분위기를 이끄시는 타입이시군요. 리더십과 에너지가 돋보이는 분이실 것 같습니다.' },
    'react': { character: 'chatgpt', text: '리액션으로 기여하시는군요. 은근히 모임의 핵심 역할을 하고 계신 겁니다.' },
    'observe': { character: 'chatgpt', text: '조용한 관찰자시군요. 많은 것을 보고 계시지만 굳이 드러내지 않으시는 타입이시네요.' },
    'deep': { character: 'chatgpt', text: '깊은 대화를 선호하시는군요. 넓은 관계보다 깊은 연결을 추구하시는 분이십니다.' }
  },

  // ── Q11: stress (gemini) ──
  'stress': {
    'alone': { character: 'gemini', text: '혼자만의 시간으로 충전! 나만의 힐링 공간이 있는 거죠? 🏠' },
    'talk': { character: 'gemini', text: '대화로 푸는 타입! 말하면서 정리되는 거 완전 공감돼요 💭' },
    'action': { character: 'gemini', text: '몸을 움직여서 해결! 운동이 최고의 스트레스 해소법이긴 하죠 🏃' },
    'avoid': { character: 'gemini', text: '일단 잊으려고 딴 거 하기! 가끔은 그게 최선일 때도 있어요 😌' }
  },

  // ── Q12: weekend (claude) ──
  'weekend': {
    'social': { character: 'claude', text: '친구들이랑 맛집 투어라... 사람에게서 에너지를 얻는 전형적인 타입이네요.' },
    'solo': { character: 'claude', text: '혼자 넷플릭스. 솔직히 이게 진짜 힐링이긴 하죠.' },
    'small': { character: 'claude', text: '소수 친구와 조용히. 관계의 질을 중시하는 거군요. 나쁘지 않아요.' },
    'explore': { character: 'claude', text: '새로운 경험 탐험! 흠, 의외로 모험가 기질이 있으시네요.' }
  },

  // ── Q13: anger (chatgpt) ──
  'anger': {
    'suppress': { character: 'chatgpt', text: '감정을 정리한 후 표현하시는군요. 내면의 자기 조절 능력이 뛰어나신 분이십니다.' },
    'express': { character: 'chatgpt', text: '바로 표현하시는 스타일이시군요. 솔직함이 장점이시지만, 때로는 전략도 필요하겠죠.' },
    'logic': { character: 'chatgpt', text: '화가 나도 논리적으로 설명하시는군요. 이성적 자기 통제력이 인상적입니다.' },
    'escape': { character: 'chatgpt', text: '일단 자리를 피하시는 편이군요. 불필요한 충돌을 피하는 지혜로운 선택일 수 있습니다.' }
  },

  // ── Q14: phone (gemini) ──
  'phone': {
    'call': { character: 'gemini', text: '전화파! 목소리로 소통하는 게 빠르고 확실하긴 하죠 📞' },
    'text': { character: 'gemini', text: '문자파! 생각 정리해서 보내는 거 완전 이해돼요 💬 나도 가끔 그래~' },
    'depends': { character: 'gemini', text: '상황에 따라 다른 유연한 타입! 센스 있다 👌' },
    'face': { character: 'gemini', text: '만나서 얘기하자! 대면 소통의 힘을 아는 사람이네요 🤝' }
  },

  // ── Q15: energy (claude) ──
  'energy': {
    'party': { character: 'claude', text: '파티 후 충전이라니. 사람이 곧 에너지원인 거군요. 부럽기도 하네요.' },
    'alone': { character: 'claude', text: '혼자 있는 시간이 충전이라... 솔직히 저도 그쪽에 가깝습니다.' },
    'deep': { character: 'claude', text: '1:1 깊은 대화로 충전. 양보다 질을 추구하는 타입이네요.' },
    'newpeople': { character: 'claude', text: '새로운 사람에게서 에너지를 얻다니. 호기심이 강한 외향형이시군요.' }
  },

  // ── Q16: newgroup (chatgpt) ──
  'newgroup': {
    'initiate': { character: 'chatgpt', text: '먼저 다가가시는 적극적인 분이시군요. 사회적 에너지가 높으신 분이라 생각합니다.' },
    'respond': { character: 'chatgpt', text: '누군가 다가오면 반갑게 응하시는 스타일이시군요. 따뜻한 수용성을 가지신 분이십니다.' },
    'one': { character: 'chatgpt', text: '한 명과 깊게 대화하시는 편이시군요. 관계의 깊이를 중시하시는 분이실 것 같습니다.' },
    'wait': { character: 'chatgpt', text: '관찰 후 참여하시는 신중한 스타일이시군요. 상황 파악 능력이 뛰어나신 분이십니다.' }
  },

  // ── Q17: sns (gemini) ──
  'sns': {
    'active': { character: 'gemini', text: 'SNS 활발! 일상 공유하고 소통하는 거 너무 좋죠~ 인싸력 만렙! 📱' },
    'moderate': { character: 'gemini', text: '가끔 올리지만 댓글은 열심히! 은근 소통왕이시네요 ✌️' },
    'lurk': { character: 'gemini', text: '눈팅 위주! 조용히 다 보고 계신 거죠? 은밀한 관찰자 😎' },
    'none': { character: 'gemini', text: 'SNS 안 쓰는 사람! 요즘 세상에 이런 용자가 🫡 멋있다~' }
  },

  // ── Q18: tired (claude) ──
  'tired': {
    'rest': { character: 'claude', text: '아무도 안 만나고 쉬기. 자기 관리의 정석이죠.' },
    'call': { character: 'claude', text: '지칠 때 연락하는 친구가 있다니. 그 관계, 꽤 소중한 거예요.' },
    'walk': { character: 'claude', text: '산책이라도 나간다... 움직이면서 생각 정리하는 타입이군요.' },
    'cafe': { character: 'claude', text: '사람 많은 카페에서 멍. 혼자이지만 완전히 혼자는 아닌, 묘한 균형이네요.' }
  },

  // ── Q19: info (chatgpt) ──
  'info': {
    'facts': { character: 'chatgpt', text: '구체적인 사실을 중시하시는군요. 탄탄한 근거 위에 판단을 세우시는 분이십니다.' },
    'meaning': { character: 'chatgpt', text: '전체 흐름과 의미를 먼저 보시는군요. 숲을 보는 시야를 가지신 분이시네요.' },
    'experience': { character: 'chatgpt', text: '직접 경험을 통해 이해하시는 스타일이시군요. 체험적 학습자이신 것 같습니다.' },
    'pattern': { character: 'chatgpt', text: '패턴과 가능성을 먼저 보시는군요. 직관적 통찰력이 뛰어나신 분이라 생각합니다.' }
  },

  // ── Q20: conversation (gemini) ──
  'conversation': {
    'real': { character: 'gemini', text: '실제 있었던 일 위주! 리얼한 대화가 제일 재밌긴 하죠 📖' },
    'idea': { character: 'gemini', text: '아이디어 토론 좋아하는 타입! 대화하면 시간 가는 줄 모르겠다 💡' },
    'detail': { character: 'gemini', text: '디테일 기억력 좋은 사람! 주변에서 "그걸 어떻게 기억해?" 많이 듣죠? 🔍' },
    'metaphor': { character: 'gemini', text: '비유를 자주 쓰다니! 표현력이 풍부한 아티스트 감성이네요 🎨' }
  },

  // ── Q21: project (claude) ──
  'project': {
    'proven': { character: 'claude', text: '검증된 방법을 고른다... 안전하지만 확실한 선택이죠. 나쁘지 않아요.' },
    'new': { character: 'claude', text: '새로운 방식에 도전! 솔직히 그 용기는 인정합니다.' },
    'realistic': { character: 'claude', text: '현실 가능성부터 체크. 흠, 실패 확률을 줄이는 현명한 접근이네요.' },
    'bigpicture': { character: 'claude', text: '큰 그림부터 그리고 시작한다... 비전이 있는 타입이군요.' }
  },

  // ── Q22: cancel (chatgpt) ──
  'cancel': {
    'replan': { character: 'chatgpt', text: '바로 대안을 세우시는군요. 계획적이면서도 유연한 대처 능력이 돋보이십니다.' },
    'free': { character: 'chatgpt', text: '자유시간을 반기시는군요. 여유를 즐길 줄 아시는 분이시네요.' },
    'annoyed': { character: 'chatgpt', text: '계획이 틀어지면 불편하시군요. 그만큼 준비를 철저히 하시는 분이시라는 뜻이기도 합니다.' },
    'whatever': { character: 'chatgpt', text: '유연하게 대처하시는군요. 상황 변화에 스트레스를 덜 받으시는 편이시네요.' }
  },

  // ── Q23: todo (gemini) ──
  'todo': {
    'daily': { character: 'gemini', text: '매일 체크리스트! 하나씩 지우는 쾌감 아는 사람! 🗂️ 완전 계획왕!' },
    'mental': { character: 'gemini', text: '머릿속 투두리스트! 기억력 좋은 거 아니면 용감한 거예요 😂' },
    'make_ignore': { character: 'gemini', text: '만들고 안 본다 ㅋㅋ 그 마음 너무 이해돼요 📋➡️🗑️' },
    'none': { character: 'gemini', text: '리스트 없이도 잘 산다! 자유로운 영혼이시네요~ 부럽다 🦋' }
  },

  // ── Q24: deadline (claude) ──
  'deadline': {
    'early': { character: 'claude', text: '이미 끝내놨다고요? ...솔직히 좀 무섭네요. 대단합니다.' },
    'ontrack': { character: 'claude', text: '계획대로 착착. 자기 관리의 정석이죠. 흠, 존경스럽네요.' },
    'lastminute': { character: 'claude', text: '마감 직전 폭발 집중! 아드레날린으로 사는 타입이군요. 심장에 안 좋을 텐데.' },
    'flexible': { character: 'claude', text: '마감을 유연하게 조정한다... 그게 통하는 환경이라면 나쁘지 않죠.' }
  }
};


// ============================================================
// FOLLOWUP_QUESTIONS: MBTI 4축별 보조 질문 (축당 2개, 총 8개)
// 이진 선택형 (빠른 예/아니오 스타일)
// ============================================================
const FOLLOWUP_QUESTIONS = {

  // ── thinking 축 (T/F) ──
  'thinking_1': {
    triggerAfter: 'conflict',
    question: '친구의 고민을 들을 때, 해결책보다 공감이 더 중요하다고 생각하나요?',
    options: [
      { label: '네, 공감이 먼저죠', axis: 'thinking', score: -30 },
      { label: '아니요, 해결이 중요해요', axis: 'thinking', score: 30 }
    ]
  },
  'thinking_2': {
    triggerAfter: 'mistake',
    question: '슬픈 영화를 보면 눈물이 잘 나는 편인가요?',
    options: [
      { label: '네, 감정이입이 잘 돼요', axis: 'thinking', score: -25 },
      { label: '아니요, 잘 안 울어요', axis: 'thinking', score: 25 }
    ]
  },

  // ── energy 축 (E/I) ──
  'energy_1': {
    triggerAfter: 'weekend',
    question: '약속 없는 토요일, 갑자기 친구가 "나와!" 하면?',
    options: [
      { label: '오 좋아! 바로 준비', axis: 'energy', score: 35 },
      { label: '음... 오늘은 쉬고 싶은데', axis: 'energy', score: -35 }
    ]
  },
  'energy_2': {
    triggerAfter: 'newgroup',
    question: '혼자 밥 먹는 거, 전혀 불편하지 않나요?',
    options: [
      { label: '네, 혼밥 완전 편해요', axis: 'energy', score: -30 },
      { label: '좀 어색해요, 누구랑 먹고 싶어요', axis: 'energy', score: 30 }
    ]
  },

  // ── sensing 축 (S/N) ──
  'sensing_1': {
    triggerAfter: 'info',
    question: '"만약에~" 하고 상상하는 걸 자주 하는 편인가요?',
    options: [
      { label: '네, 상상의 나래를 자주 펼쳐요', axis: 'sensing', score: -35 },
      { label: '아니요, 현실에 집중하는 편이에요', axis: 'sensing', score: 35 }
    ]
  },
  'sensing_2': {
    triggerAfter: 'conversation',
    question: '길을 찾을 때, 지도보다 감으로 가는 편인가요?',
    options: [
      { label: '네, 대충 방향감으로 가요', axis: 'sensing', score: -20 },
      { label: '아니요, 정확한 경로를 확인해요', axis: 'sensing', score: 20 }
    ]
  },

  // ── judging 축 (J/P) ──
  'judging_1': {
    triggerAfter: 'cancel',
    question: '옷장이나 서랍 정리를 자주 하는 편인가요?',
    options: [
      { label: '네, 정리 안 되면 불편해요', axis: 'judging', score: 30 },
      { label: '아니요, 좀 어질러져도 괜찮아요', axis: 'judging', score: -30 }
    ]
  },
  'judging_2': {
    triggerAfter: 'deadline',
    question: '내일 뭐 할지 미리 정해놓는 편인가요?',
    options: [
      { label: '네, 대략이라도 계획이 있어요', axis: 'judging', score: 25 },
      { label: '아니요, 아침에 일어나서 정해요', axis: 'judging', score: -25 }
    ]
  }
};

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
