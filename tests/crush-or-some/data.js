/* ========== 짝사랑 vs 썸 AI 진단 ========== */

window.TEST_CONFIG = {
  id: 'crush-or-some',
  title: '짝사랑 vs 썸',
  subtitle: 'AI가 냉정하게 판정',
  emoji: '\uD83E\uDD16',
  participants: 11500,
  duration: '2분',
  loadingMessages: [
    'AI가 상황을 분석하고 있어요...',
    '감정 데이터를 처리하는 중...',
    '냉정한 판정을 내리는 중...',
  ],
};

window.QUESTIONS = [
  {
    question: '둘이서만 만난 적 있어?',
    options: [
      { text: '한 번도 없어... 항상 단체로만', scores: { some: 1 } },
      { text: '단체에서 만나다가 둘이 남은 적은 있어', scores: { some: 2 } },
      { text: '1~2번 정도 둘이 만났어', scores: { some: 3 } },
      { text: '자주 둘이 만나! 약속도 잡아', scores: { some: 4 } },
    ],
  },
  {
    question: '연락은 주로 누가 먼저 해?',
    options: [
      { text: '항상 내가... 안 하면 연락 안 옴', scores: { some: 1 } },
      { text: '나 7 : 상대 3 정도?', scores: { some: 2 } },
      { text: '거의 반반인 것 같아', scores: { some: 3 } },
      { text: '상대가 먼저 할 때가 더 많아', scores: { some: 4 } },
    ],
  },
  {
    question: '상대가 나를 부르는 호칭은?',
    options: [
      { text: '이름+씨 또는 풀네임 (거리감 쩔어)', scores: { some: 1 } },
      { text: '그냥 이름 불러', scores: { some: 2 } },
      { text: '나만의 별명이 있어', scores: { some: 3 } },
      { text: '"야" 아니면 애칭 느낌으로 불러', scores: { some: 4 } },
    ],
  },
  {
    question: '상대 SNS에 내 흔적이 있어?',
    options: [
      { text: '전혀 없어. 서로 팔로우도 안 할 수도', scores: { some: 1 } },
      { text: '좋아요 정도는 가끔 눌러줘', scores: { some: 2 } },
      { text: '댓글도 달아주고 스토리 답장도 해', scores: { some: 3 } },
      { text: '함께 찍은 사진이 올라간 적 있어', scores: { some: 4 } },
    ],
  },
  {
    question: '눈이 마주치면 어떻게 돼?',
    options: [
      { text: '상대가 먼저 시선을 피해... (아파)', scores: { some: 1 } },
      { text: '서로 어색하게 웃다가 피해', scores: { some: 2 } },
      { text: '자연스럽게 눈 맞추고 대화해', scores: { some: 3 } },
      { text: '오래 쳐다보거나 장난스럽게 눈싸움해', scores: { some: 4 } },
    ],
  },
  {
    question: '공통 지인들은 너희 관계를 뭐라 해?',
    options: [
      { text: '아무도 모르거나 관심 없어', scores: { some: 1 } },
      { text: '"걔 너한테 관심 없는 것 같은데..."', scores: { some: 2 } },
      { text: '"좀 애매하긴 한데... 모르겠다"', scores: { some: 3 } },
      { text: '"걔 너 좋아하는 거 같은데?"', scores: { some: 4 } },
    ],
  },
  {
    question: '밤 늦게 연락이 오면?',
    options: [
      { text: '밤 늦게 연락이 온 적이 없어', scores: { some: 1 } },
      { text: '단톡에서만 가끔 대화할 뿐이야', scores: { some: 2 } },
      { text: '가끔 카톡이 와. "뭐 해?" 정도', scores: { some: 3 } },
      { text: '밤에 전화하거나 긴 대화를 자주 해', scores: { some: 4 } },
    ],
  },
  {
    question: '상대가 다른 이성과 친하게 지내면?',
    options: [
      { text: '아마 상대는 신경도 안 쓰겠지 (나만 질투)', scores: { some: 1 } },
      { text: '잘 모르겠어, 상대 반응을 본 적이 없어', scores: { some: 2 } },
      { text: '은근히 신경 쓰는 티를 내는 것 같아', scores: { some: 3 } },
      { text: '대놓고 질투하거나 삐져', scores: { some: 4 } },
    ],
  },
  {
    question: '대화할 때 리액션은 어때?',
    options: [
      { text: '건조해... 단답 위주야', scores: { some: 1 } },
      { text: '평범하게 대화는 하는데 특별한 건 없어', scores: { some: 2 } },
      { text: '리액션이 좋고 내 말에 관심을 보여줘', scores: { some: 3 } },
      { text: '과하게 웃어주거나 사소한 것도 기억해', scores: { some: 4 } },
    ],
  },
  {
    question: '약속 잡을 때 누가 주도해?',
    options: [
      { text: '내가 제안해도 잘 안 됨', scores: { some: 1 } },
      { text: '내가 제안하면 OK 정도', scores: { some: 2 } },
      { text: '서로 번갈아가며 제안하는 편', scores: { some: 3 } },
      { text: '상대가 먼저 "우리 언제 볼래?" 해', scores: { some: 4 } },
    ],
  },
  {
    question: '스킨십(가벼운 터치 포함) 수준은?',
    options: [
      { text: '일절 없어. 1미터 거리 유지', scores: { some: 1 } },
      { text: '실수로 손 닿으면 바로 피하는 느낌', scores: { some: 2 } },
      { text: '어깨 톡톡, 팔짱 등 자연스러운 접촉', scores: { some: 3 } },
      { text: '손잡기, 머리 쓰다듬기 등 스킨십 많아', scores: { some: 4 } },
    ],
  },
  {
    question: '상대에게 "좋아한다"는 느낌을 받은 적 있어?',
    options: [
      { text: '전혀... 내 착각인 것 같아', scores: { some: 1 } },
      { text: '가끔 "혹시?" 싶다가 아닌 것 같고', scores: { some: 2 } },
      { text: '특정 순간에 확실히 느낀 적 있어', scores: { some: 3 } },
      { text: '주변에서도 다 알 정도로 티가 나', scores: { some: 4 } },
    ],
  },
];

window.RESULTS = {};

window.getResult = function (scores) {
  var someScore = scores.some || 0;
  var maxScore = window.QUESTIONS.length * 4; // 48
  var pct = Math.round((someScore / maxScore) * 100);

  // 결정적 답변 분석 포인트 (랜덤으로 3개 선택)
  var analysisPoints = {
    low: [
      '연락 패턴에서 일방적인 흐름이 감지됩니다',
      '스킨십 데이터가 거의 0에 수렴합니다',
      '상대의 리액션 수치가 기준치 이하입니다',
      '약속 주도권이 한쪽으로 쏠려 있습니다',
      '주변인 평가 지표가 부정적입니다',
    ],
    mid: [
      '연락 빈도는 있으나 주도권이 불균형합니다',
      '눈맞춤 패턴에서 미세한 호감 신호가 있습니다',
      'SNS 인터랙션에서 관심의 흔적이 포착됩니다',
      '대화 리액션 수치가 평균 이상입니다',
      '질투 반응 데이터가 불확실합니다',
    ],
    high: [
      '쌍방 연락 패턴이 확인됩니다',
      '스킨십 빈도가 "그냥 친구" 기준을 초과합니다',
      '상대의 질투 반응이 유의미합니다',
      '약속 주도권이 상대 쪽에서도 발생합니다',
      '주변인 증언이 호감을 지지합니다',
    ],
    max: [
      '모든 호감 지표가 임계치를 돌파했습니다',
      '스킨십+연락+질투 3종 콤보가 확인됩니다',
      '상대의 행동 패턴은 "좋아하는 사람"과 일치합니다',
      '이 수준이면 본인만 모르는 겁니다',
      '고백 타이밍 분석 결과: 지금이 최적입니다',
    ],
  };

  function pick3(arr) {
    var shuffled = arr.slice().sort(function () { return 0.5 - Math.random(); });
    return shuffled.slice(0, 3);
  }

  if (pct <= 30) {
    var fakeProb = Math.floor(Math.random() * 8) + 5;
    return {
      name: 'AI 판정: 짝사랑',
      emoji: '\uD83D\uDC94',
      description: '현재 감정 흐름: 일방통행\n썸 확률 ' + pct + '%',
      detail: '[AI 분석 보고서]\n\n' +
        '입력된 12개 응답을 종합 분석한 결과, 현재 관계는 "짝사랑" 단계로 판정됩니다. ' +
        '상대방의 관심 지표가 전반적으로 낮으며, 감정의 방향이 한쪽으로 치우쳐 있습니다.\n\n' +
        '[ 결정적 근거 ]\n' +
        pick3(analysisPoints.low).map(function (p) { return '\u2022 ' + p; }).join('\n') +
        '\n\n[ 다음 스텝 ]\n' +
        '지금은 거리를 살짝 두고 상대의 반응 변화를 관찰하세요. ' +
        '연락 빈도를 줄였을 때 상대가 먼저 연락한다면 가능성이 있습니다. ' +
        '3주 안에 변화가 없다면, 새로운 인연에 에너지를 투자하는 것을 권장합니다.\n\n' +
        '[ 통계 ]\n이 조합에서 실제로 사귀게 된 확률: ' + fakeProb + '%',
      traits: ['일방통행', '단독감정', '안타까움'],
      strengths: [
        '상대를 진심으로 좋아하는 마음이 있다',
        '혼자서도 관계를 유지하려는 노력이 보인다',
        '감정에 솔직한 편이다',
      ],
      weaknesses: [
        '상대의 관심 신호가 매우 부족하다',
        '감정 소모가 크고 지속 가능성이 낮다',
        '객관적 시각이 필요한 상황이다',
      ],
    };
  }

  if (pct <= 60) {
    var fakeProb = Math.floor(Math.random() * 15) + 25;
    return {
      name: 'AI 판정: 애매한 썸',
      emoji: '\uD83E\uDD14',
      description: '현재 감정 흐름: 안개 속 운전 중\n썸 확률 ' + pct + '%',
      detail: '[AI 분석 보고서]\n\n' +
        '입력된 12개 응답을 종합 분석한 결과, 현재 관계는 "애매한 썸" 단계로 판정됩니다. ' +
        '일부 호감 신호가 감지되나, 확신할 수 있는 수준은 아닙니다. ' +
        '상대의 태도가 호의와 예의 사이 어딘가에 위치합니다.\n\n' +
        '[ 결정적 근거 ]\n' +
        pick3(analysisPoints.mid).map(function (p) { return '\u2022 ' + p; }).join('\n') +
        '\n\n[ 다음 스텝 ]\n' +
        '결정적인 신호를 만들어 보세요. ' +
        '둘만의 약속을 제안하거나, 평소보다 살짝 진한 농담을 던져보세요. ' +
        '상대의 반응이 긍정적이면 단계를 올릴 타이밍입니다. ' +
        '3번의 시도 후에도 반응이 미지근하면 정리를 고려하세요.\n\n' +
        '[ 통계 ]\n이 조합에서 실제로 사귀게 된 확률: ' + fakeProb + '%',
      traits: ['안개속', '미묘한신호', '해석불가'],
      strengths: [
        '완전 무관심은 아니다 - 가능성은 있다',
        '대화와 연락이 어느 정도 유지되고 있다',
        '상대도 약간의 관심을 보이는 순간이 있다',
      ],
      weaknesses: [
        '상대의 호감이 "친절"인지 "관심"인지 불분명하다',
        '한쪽이 더 노력하는 불균형이 존재한다',
        '이대로 흐지부지될 가능성이 높다',
      ],
    };
  }

  if (pct <= 85) {
    var fakeProb = Math.floor(Math.random() * 15) + 55;
    return {
      name: 'AI 판정: 진짜 썸',
      emoji: '\uD83D\uDE0F',
      description: '현재 감정 흐름: 쌍방 주파수 감지\n썸 확률 ' + pct + '%',
      detail: '[AI 분석 보고서]\n\n' +
        '입력된 12개 응답을 종합 분석한 결과, 현재 관계는 "진짜 썸" 단계로 판정됩니다. ' +
        '상대방의 호감 지표가 복수의 영역에서 양성 반응을 보이고 있으며, ' +
        '감정의 방향이 쌍방으로 확인됩니다.\n\n' +
        '[ 결정적 근거 ]\n' +
        pick3(analysisPoints.high).map(function (p) { return '\u2022 ' + p; }).join('\n') +
        '\n\n[ 다음 스텝 ]\n' +
        '지금이 관계를 한 단계 올릴 타이밍입니다. ' +
        '"우리 무슨 사이야?"라는 직접적인 대화를 시도해 보세요. ' +
        '혹은 분위기 좋은 장소에서 둘만의 시간을 만들어 보세요. ' +
        '이 단계에서 너무 오래 머무르면 오히려 식을 수 있습니다.\n\n' +
        '[ 통계 ]\n이 조합에서 실제로 사귀게 된 확률: ' + fakeProb + '%',
      traits: ['쌍방감정', '밀당중', '거의확정'],
      strengths: [
        '상대도 분명히 관심을 보이고 있다',
        '연락과 만남의 밸런스가 잡혀 있다',
        '주변 사람들도 "둘이 사귀는 거 아니야?" 분위기',
      ],
      weaknesses: [
        '아직 공식적인 관계 정의가 없다',
        '썸 기간이 길어지면 자연소멸 위험이 있다',
        '서로 고백을 기다리며 눈치만 보는 중',
      ],
    };
  }

  // 86~100%
  var fakeProb = Math.floor(Math.random() * 10) + 85;
  return {
    name: 'AI 판정: 거의 연인',
    emoji: '\uD83D\uDC95',
    description: '현재 감정 흐름: 사실상 커플\n썸 확률 ' + pct + '%',
    detail: '[AI 분석 보고서]\n\n' +
      '입력된 12개 응답을 종합 분석한 결과, 현재 관계는 "거의 연인" 단계로 판정됩니다. ' +
      '호감 지표가 모든 영역에서 최상위 수준이며, ' +
      '사실상 연인 관계와 동일한 패턴이 감지됩니다.\n\n' +
      '[ 결정적 근거 ]\n' +
      pick3(analysisPoints.max).map(function (p) { return '\u2022 ' + p; }).join('\n') +
      '\n\n[ 다음 스텝 ]\n' +
      '솔직히 고백만 안 했을 뿐, 이미 연인입니다. ' +
      '상대도 같은 마음일 확률이 매우 높으니 용기를 내세요. ' +
      '"우리 사귀자"보다 "우리 사귀는 거지?"가 더 자연스러울 수 있어요. ' +
      '타이밍을 놓치면 후회합니다.\n\n' +
      '[ 통계 ]\n이 조합에서 실제로 사귀게 된 확률: ' + fakeProb + '%',
    traits: ['사실상커플', '고백만남음', '양방향확정'],
    strengths: [
      '모든 호감 지표가 최상위 수준이다',
      '주변에서도 이미 커플로 인식하고 있다',
      '스킨십과 연락 모두 쌍방으로 활발하다',
    ],
    weaknesses: [
      '관계 정의를 미루면 틀어질 수 있다',
      '"고백 타이밍" 핑계로 시간만 흘리는 중',
      '확실히 하지 않으면 제3자가 끼어들 수 있다',
    ],
  };
};
