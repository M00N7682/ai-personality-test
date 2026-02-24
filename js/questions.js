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
  },
  {
    id: 'decision',
    question: '중요한 결정을 내릴 때?',
    options: [
      { label: '장단점을 꼼꼼히 비교하고 결정', value: 'analyze', axis: 'thinking', score: 60 },
      { label: '직감이 이끄는 대로 결정', value: 'intuition', axis: 'thinking', score: -60 },
      { label: '주변 사람들 의견을 많이 들어봄', value: 'consult', axis: 'energy', score: 40 },
      { label: '일단 해보고 아니면 바꿈', value: 'trial', axis: 'thinking', score: -20 }
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
    id: 'anger',
    question: '화가 나면 어떤 편이에요?',
    options: [
      { label: '속으로 삭이다가 정리되면 말함', value: 'suppress', axis: 'energy', score: -50 },
      { label: '바로 표현하는 편', value: 'express', axis: 'energy', score: 60 },
      { label: '논리적으로 왜 화났는지 설명', value: 'logic', axis: 'thinking', score: 50 },
      { label: '일단 그 자리를 피함', value: 'escape', axis: 'energy', score: -40 }
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
