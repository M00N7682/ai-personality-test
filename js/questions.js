/**
 * 질문 데이터 + 셀프체크 로직
 */

const SELFCHECK_QUESTIONS = [
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
 * 셀프체크 결과에서 예상 유형을 계산
 * returns { thinkingScore, energyScore, selfType }
 */
function calculateSelfType(answers) {
  let thinkingScore = 0;
  let energyScore = 0;

  for (const q of SELFCHECK_QUESTIONS) {
    const answer = answers[q.id];
    if (!answer) continue;
    const option = q.options.find(o => o.value === answer);
    if (!option) continue;

    if (option.axis === 'thinking') {
      thinkingScore += option.score;
    } else if (option.axis === 'energy') {
      energyScore += option.score;
    }
  }

  // 클램핑
  thinkingScore = Math.max(-100, Math.min(100, thinkingScore));
  energyScore = Math.max(-100, Math.min(100, energyScore));

  const isT = thinkingScore >= 0;
  const isE = energyScore >= 0;

  let selfType;
  if (isT && isE) selfType = 'TE';
  else if (isT && !isE) selfType = 'TI';
  else if (!isT && isE) selfType = 'FE';
  else selfType = 'FI';

  return { thinkingScore, energyScore, selfType };
}
