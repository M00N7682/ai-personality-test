/* ========== 나의 연애 온도 테스트 ========== */

window.TEST_CONFIG = {
  id: 'love-temp',
  title: '연애 온도 테스트',
  subtitle: '나의 연애 온도는 몇 도?',
  emoji: '\uD83C\uDF21\uFE0F',
  participants: 6500,
  duration: '1분',
  loadingMessages: [
    '연애 온도를 측정하는 중...',
    '감정 체온계를 분석하고 있어요...',
    '거의 다 됐어요!',
  ],
};

window.QUESTIONS = [
  {
    question: '요즘 연애하고 싶은 정도는?',
    options: [
      { text: '1도 없음. 혼자가 너무 좋아', scores: { temp: 1 } },
      { text: '가끔 외로울 때만 살짝', scores: { temp: 2 } },
      { text: '괜찮은 사람 있으면 해보고 싶어', scores: { temp: 3 } },
      { text: '당장이라도 하고 싶어 미치겠어', scores: { temp: 4 } },
    ],
  },
  {
    question: '마지막으로 누군가에게 설렌 게 언제야?',
    options: [
      { text: '설렘이 뭐지... 기억이 안 나', scores: { temp: 1 } },
      { text: '몇 달 전? 반년 전?', scores: { temp: 2 } },
      { text: '지난주에 괜찮은 사람 봤어', scores: { temp: 3 } },
      { text: '어제... 아니 오늘도 설레는 중', scores: { temp: 4 } },
    ],
  },
  {
    question: '이상형이 눈앞에 딱 나타나면?',
    options: [
      { text: '귀찮... 그냥 지나감', scores: { temp: 1 } },
      { text: '일단 관찰은 해봄', scores: { temp: 2 } },
      { text: '어? 괜찮은데? (심박수 약간 상승)', scores: { temp: 3 } },
      { text: '심장 폭발. 바로 말 걸 방법 고민함', scores: { temp: 4 } },
    ],
  },
  {
    question: '로맨스 영화나 드라마 보면?',
    options: [
      { text: '꺼. 관심 없어', scores: { temp: 1 } },
      { text: '현실은 다르지... 하고 냉소함', scores: { temp: 2 } },
      { text: '재밌게 보면서 은근 몰입함', scores: { temp: 3 } },
      { text: '"나도 저런 연애 하고 싶다" 눈물 글썽', scores: { temp: 4 } },
    ],
  },
  {
    question: '친구가 연인이랑 통화하는 걸 보면?',
    options: [
      { text: '별 감흥 없어. 그냥 폰 봄', scores: { temp: 1 } },
      { text: '좋겠다~ 하고 말아', scores: { temp: 2 } },
      { text: '부럽다... 나도 저런 사람 생기면 좋겠다', scores: { temp: 3 } },
      { text: '극심한 부러움 + 당장 소개팅 잡아달라고 함', scores: { temp: 4 } },
    ],
  },
  {
    question: '이성한테 좋은 말 들으면?',
    options: [
      { text: '아 그래요? 하고 넘김', scores: { temp: 1 } },
      { text: '기분은 좋은데 티는 안 냄', scores: { temp: 2 } },
      { text: '하루종일 그 말 되새기면서 혼자 웃음', scores: { temp: 3 } },
      { text: '바로 프사 바꾸고 연락 기다림', scores: { temp: 4 } },
    ],
  },
  {
    question: '소개팅이나 미팅 제안이 들어오면?',
    options: [
      { text: '거절. 시간 낭비 싫어', scores: { temp: 1 } },
      { text: '사진 먼저 보여줘... (까다로운 편)', scores: { temp: 2 } },
      { text: '오 한번 나가볼까? 기대 반 걱정 반', scores: { temp: 3 } },
      { text: '"언제?! 어디?!" 즉시 수락', scores: { temp: 4 } },
    ],
  },
  {
    question: '자기 전에 주로 무슨 생각 해?',
    options: [
      { text: '내일 할 일 / 유튜브 뭐 볼지', scores: { temp: 1 } },
      { text: '특별히 없음. 그냥 잠', scores: { temp: 2 } },
      { text: '가끔 이상형 상상하면서 잠듦', scores: { temp: 3 } },
      { text: '매일 밤 연애 시뮬레이션 돌림', scores: { temp: 4 } },
    ],
  },
  {
    question: '길에서 커플을 보면?',
    options: [
      { text: '눈에 안 들어옴. 무관심', scores: { temp: 1 } },
      { text: '그냥 스쳐 지나감', scores: { temp: 2 } },
      { text: '은근 쳐다보면서 부럽다고 느낌', scores: { temp: 3 } },
      { text: '"저것도 사람인데 왜 나만 솔로지?" 현타', scores: { temp: 4 } },
    ],
  },
  {
    question: '지금 이 테스트를 하는 이유는?',
    options: [
      { text: '그냥 심심해서. 연애에 관심 없음', scores: { temp: 1 } },
      { text: '재미있을 것 같아서 가볍게', scores: { temp: 2 } },
      { text: '요즘 연애 생각이 나서... 내 상태가 궁금해', scores: { temp: 3 } },
      { text: '너무 연애하고 싶어서 뭐라도 하는 중', scores: { temp: 4 } },
    ],
  },
];

window.RESULTS = {};

window.getResult = function (scores) {
  var tempScore = scores.temp || 0;
  var maxScore = window.QUESTIONS.length * 4; // 40
  var minScore = window.QUESTIONS.length * 1; // 10

  // 10~40 점수를 -20~100 온도 범위로 변환
  var temperature = Math.round(((tempScore - minScore) / (maxScore - minScore)) * 120 - 20);
  temperature = Math.max(-20, Math.min(100, temperature));

  var tempDisplay = temperature + '\u00B0C';

  // 3개월 뒤 예측 온도 (현재 온도 기반 약간의 변동)
  var futureTemp;
  if (temperature <= 0) {
    futureTemp = temperature + Math.floor(Math.random() * 15) + 5;
  } else if (temperature <= 40) {
    futureTemp = temperature + Math.floor(Math.random() * 20) - 5;
  } else if (temperature <= 60) {
    futureTemp = temperature + Math.floor(Math.random() * 20) - 10;
  } else {
    futureTemp = temperature - Math.floor(Math.random() * 15) + 5;
  }
  futureTemp = Math.max(-20, Math.min(100, futureTemp));

  if (temperature <= 0) {
    return {
      name: '\uD83E\uDD76 연애 동결',
      emoji: '\uD83E\uDD76',
      description: '당신의 연애 온도: ' + tempDisplay + '\n"사랑? 그게 나라 이름이야?"',
      detail: '[ 온도 분석 ]\n' +
        '현재 연애 온도 ' + tempDisplay + '로, 완전한 동결 상태입니다. ' +
        '연애 세포가 동면에 들어간 지 꽤 된 것 같네요. ' +
        '이성에 대한 관심이 거의 제로에 가깝고, 혼자만의 시간이 훨씬 소중한 상태예요.\n\n' +
        '[ 3개월 뒤 예상 온도: ' + futureTemp + '\u00B0C ]\n' +
        '급격한 변화는 없을 것으로 보이지만, 예상치 못한 만남이 온도를 확 올릴 수 있어요.\n\n' +
        '[ 온도 올리는 행동 ]\n' +
        '\u2022 새로운 모임이나 동아리에 가입해 보세요\n' +
        '\u2022 로맨스 웹툰이나 드라마를 하나만 정주행해 보세요\n' +
        '\u2022 친구의 소개팅 제안에 한 번쯤 OK 해보세요\n\n' +
        '[ 온도 내리는 행동 (지금 하고 있는 것) ]\n' +
        '\u2022 집 밖에 안 나가기\n' +
        '\u2022 "연애 귀찮아"를 매일 외치기\n' +
        '\u2022 모든 이성을 "그냥 사람"으로 분류하기',
      traits: ['연애빙하기', '솔로마스터', '자발적동결'],
      strengths: [
        '혼자서도 완벽하게 행복한 사람',
        '연애에 휘둘리지 않는 강한 멘탈',
        '자기 자신에게 집중하는 시간이 많다',
      ],
      weaknesses: [
        '좋은 인연이 와도 놓칠 수 있다',
        '감정 표현이 서툴어질 수 있다',
        '주변에서 걱정하기 시작한다',
      ],
    };
  }

  if (temperature <= 20) {
    return {
      name: '\uD83D\uDE10 미지근',
      emoji: '\uD83D\uDE10',
      description: '당신의 연애 온도: ' + tempDisplay + '\n"연애 안 해도 살 만한데..."',
      detail: '[ 온도 분석 ]\n' +
        '현재 연애 온도 ' + tempDisplay + '로, 미지근한 상태입니다. ' +
        '연애에 완전히 관심이 없는 건 아니지만, 적극적으로 나서고 싶지는 않은 온도예요. ' +
        '"괜찮은 사람 있으면 뭐..." 정도의 마인드입니다.\n\n' +
        '[ 3개월 뒤 예상 온도: ' + futureTemp + '\u00B0C ]\n' +
        '현 상태 유지가 예상되지만, 매력적인 사람이 나타나면 급상승할 수 있어요.\n\n' +
        '[ 온도 올리는 행동 ]\n' +
        '\u2022 혼자가 아닌 그룹 활동을 늘려보세요\n' +
        '\u2022 SNS에서 관심 가는 사람에게 먼저 DM을 보내보세요\n' +
        '\u2022 셀프 꾸미기에 투자해 자신감을 올려보세요\n\n' +
        '[ 온도 내리는 행동 (지금 하고 있는 것) ]\n' +
        '\u2022 "나중에" "언젠가"만 반복하기\n' +
        '\u2022 관심이 생겨도 먼저 말 안 걸기\n' +
        '\u2022 혼자 있는 게 편하다고 합리화하기',
      traits: ['무관심모드', '여유로운솔로', '느긋한대기'],
      strengths: [
        '조급하지 않아서 좋은 선택을 할 수 있다',
        '연애에 올인하지 않는 건강한 밸런스',
        '자기 생활이 탄탄하게 자리 잡혀 있다',
      ],
      weaknesses: [
        '좋은 타이밍을 놓치기 쉽다',
        '상대방이 관심 없다고 오해할 수 있다',
        '행동력이 부족한 편이다',
      ],
    };
  }

  if (temperature <= 40) {
    return {
      name: '\uD83D\uDE0A 따뜻',
      emoji: '\uD83D\uDE0A',
      description: '당신의 연애 온도: ' + tempDisplay + '\n"좋은 사람 있으면 해볼 의향 있음"',
      detail: '[ 온도 분석 ]\n' +
        '현재 연애 온도 ' + tempDisplay + '로, 따뜻한 상태입니다. ' +
        '연애에 대한 마음이 자연스럽게 열려 있는 건강한 온도예요. ' +
        '억지로 연애하려고 하지 않으면서도, 좋은 사람이 나타나면 기꺼이 마음을 열 준비가 되어 있어요.\n\n' +
        '[ 3개월 뒤 예상 온도: ' + futureTemp + '\u00B0C ]\n' +
        '만남의 빈도에 따라 상승 가능성이 높아요. 봄이 오면 더 올라갈 수도!\n\n' +
        '[ 온도 올리는 행동 ]\n' +
        '\u2022 마음에 드는 사람에게 적극적으로 다가가 보세요\n' +
        '\u2022 소개팅이나 미팅 기회를 놓치지 마세요\n' +
        '\u2022 연애 관련 대화를 친구들과 자주 해보세요\n\n' +
        '[ 온도 내리는 행동 ]\n' +
        '\u2022 "인연이면 알아서 오겠지" 마인드\n' +
        '\u2022 이상형 기준을 너무 높게 잡기\n' +
        '\u2022 새로운 만남의 자리를 피하기',
      traits: ['자연스러운오픈', '건강한관심', '여유있는설렘'],
      strengths: [
        '연애에 대해 건강한 태도를 가지고 있다',
        '감정에 휘둘리지 않으면서 열린 마음이다',
        '좋은 관계를 만들 준비가 되어 있다',
      ],
      weaknesses: [
        '너무 수동적으로 기다릴 수 있다',
        '기준이 높아서 선택지가 좁아질 수 있다',
        '관심이 있어도 표현이 약한 편이다',
      ],
    };
  }

  if (temperature <= 60) {
    return {
      name: '\uD83D\uDD25 뜨거움',
      emoji: '\uD83D\uDD25',
      description: '당신의 연애 온도: ' + tempDisplay + '\n"연애세포 활성화 상태"',
      detail: '[ 온도 분석 ]\n' +
        '현재 연애 온도 ' + tempDisplay + '로, 뜨거운 상태입니다. ' +
        '연애 세포가 완전히 깨어나서 활발하게 활동 중이에요! ' +
        '이성에 대한 관심도 높고, 설레는 마음을 자주 느끼고 있어요. ' +
        '이 온도라면 좋은 인연을 만났을 때 바로 시작할 수 있는 상태!\n\n' +
        '[ 3개월 뒤 예상 온도: ' + futureTemp + '\u00B0C ]\n' +
        '연애에 성공하면 안정적으로 유지, 실패하면 약간 떨어질 수 있어요.\n\n' +
        '[ 온도 올리는 행동 ]\n' +
        '\u2022 마음에 드는 사람이 있다면 고백 타이밍을 잡아보세요\n' +
        '\u2022 자신감을 가지고 적극적으로 어필하세요\n' +
        '\u2022 연애 감도가 높은 지금, 다양한 사람을 만나보세요\n\n' +
        '[ 온도 내리는 행동 ]\n' +
        '\u2022 고백 타이밍을 계속 미루기\n' +
        '\u2022 혼자만의 상상에 빠져 행동하지 않기\n' +
        '\u2022 이전 연애 트라우마에 발목 잡히기',
      traits: ['연애세포활성', '적극적관심', '설렘폭주'],
      strengths: [
        '연애에 대한 에너지가 넘친다',
        '상대에게 매력적으로 보일 확률이 높다',
        '좋은 기회를 놓치지 않는 적극성이 있다',
      ],
      weaknesses: [
        '감정에 급하게 빠질 수 있다',
        '상대를 제대로 파악하기 전에 올인할 수 있다',
        '연애에 너무 몰두해서 다른 것을 놓칠 수 있다',
      ],
    };
  }

  if (temperature <= 80) {
    return {
      name: '\uD83D\uDCA5 과열',
      emoji: '\uD83D\uDCA5',
      description: '당신의 연애 온도: ' + tempDisplay + '\n"당장 연애 안 하면 큰일 날 것 같은 상태"',
      detail: '[ 온도 분석 ]\n' +
        '현재 연애 온도 ' + tempDisplay + '로, 과열 상태입니다. ' +
        '연애에 대한 갈망이 최고조에 달한 상태예요! ' +
        '이성만 보면 두근거리고, SNS에서 커플 사진 보면 한숨이 나오죠. ' +
        '에너지가 넘치는 건 좋지만, 판단력은 조금 흐려질 수 있는 온도예요.\n\n' +
        '[ 3개월 뒤 예상 온도: ' + futureTemp + '\u00B0C ]\n' +
        '누군가를 만나면 급속 안정화, 못 만나면 폭발 직전까지 갈 수 있어요.\n\n' +
        '[ 온도 올리는 행동 (이미 충분히 높아요!) ]\n' +
        '\u2022 솔직히 지금은 올릴 필요 없어요\n' +
        '\u2022 대신 이 에너지를 자기 발전에 투자해 보세요\n' +
        '\u2022 운동, 취미, 외모 관리 등 매력 UP!\n\n' +
        '[ 온도 적당히 내리는 행동 (추천) ]\n' +
        '\u2022 연애만이 행복의 전부가 아님을 기억하기\n' +
        '\u2022 조건보다 느낌에 집중해서 사람 만나기\n' +
        '\u2022 혼자서도 즐거운 취미를 하나 만들기',
      traits: ['과열주의보', '연애갈망MAX', '즉시연애가능'],
      strengths: [
        '연애에 대한 준비와 의지가 최상이다',
        '상대에게 뜨겁게 다가갈 수 있는 열정이 있다',
        '적극적이라 기회를 빠르게 잡을 수 있다',
      ],
      weaknesses: [
        '상대를 제대로 보지 못하고 빠질 수 있다',
        '외로움에 급한 선택을 할 수 있다',
        '감정이 과하면 상대가 부담을 느낄 수 있다',
      ],
    };
  }

  // 81~100
  return {
    name: '\uD83C\uDF0B 폭발',
    emoji: '\uD83C\uDF0B',
    description: '당신의 연애 온도: ' + tempDisplay + '\n"모든 이성이 다 좋아 보이는 위험 구간"',
    detail: '[ 온도 분석 ]\n' +
      '현재 연애 온도 ' + tempDisplay + '로, 폭발 상태입니다!! ' +
      '연애 욕구가 화산처럼 분출하고 있어요. ' +
      '솔직히 지금 눈에 보이는 이성 중 절반은 괜찮아 보이죠? ' +
      '이건 진심이 아니라 온도가 만든 착각일 수 있어요. 잠깐 심호흡하세요!\n\n' +
      '[ 3개월 뒤 예상 온도: ' + futureTemp + '\u00B0C ]\n' +
      '이 온도는 오래 지속되기 어려워요. 자연스럽게 내려오거나, 연애를 시작하게 될 거예요.\n\n' +
      '[ 온도 올리는 행동 (금지!!) ]\n' +
      '\u2022 이미 최대치입니다. 더 올리면 위험해요\n' +
      '\u2022 감정에 휩쓸려 아무나 만나지 마세요\n' +
      '\u2022 "외로워서"가 아닌 "좋아서" 만나야 해요\n\n' +
      '[ 온도 내리는 행동 (강력 추천) ]\n' +
      '\u2022 친구들과 신나게 놀면서 외로움 해소하기\n' +
      '\u2022 자기 발전에 에너지를 쏟아보세요\n' +
      '\u2022 정말 마음에 드는 한 사람만 집중하기',
    traits: ['연애폭발직전', '감정화산', '위험구간'],
    strengths: [
      '연애에 대한 열정만큼은 누구보다 강하다',
      '상대에게 뜨거운 관심을 줄 수 있다',
      '행동력이 엄청나서 기회를 무조건 잡는다',
    ],
    weaknesses: [
      '감정적 판단으로 잘못된 선택을 할 수 있다',
      '아무나 좋아 보이는 착각에 빠질 수 있다',
      '상대에게 부담을 줄 수 있는 과한 에너지',
    ],
  };
};
