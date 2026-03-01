/* ========== 연애 집착도 테스트 ========== */

window.TEST_CONFIG = {
  id: 'obsession',
  title: '연애 집착도',
  subtitle: '나의 집착 레벨 측정',
  emoji: '\uD83D\uDC40',
  participants: 7800,
  duration: '3분',
  loadingMessages: [
    '집착 레벨을 측정하는 중...',
    '무의식 패턴을 분석하고 있어요...',
    '결과가 나왔어요!',
  ],
};

window.QUESTIONS = [
  {
    question: '연인이 이성 친구와 둘이 밥 먹는다고 하면?',
    options: [
      { text: '맛있는 거 먹어~ 하고 신경 안 씀', scores: { obsession: 1 } },
      { text: '누구랑? 정도만 물어보고 넘어감', scores: { obsession: 2 } },
      { text: '괜찮다고 하면서도 은근 카톡 확인함', scores: { obsession: 3 } },
      { text: '밥 먹는 동안 계속 연락이 오는지 체크', scores: { obsession: 4 } },
      { text: '인스타 위치 태그 뜨나 실시간 확인', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인의 핸드폰을 볼 수 있는 상황이면?',
    options: [
      { text: '관심 없음. 내 폰도 안 보는데', scores: { obsession: 1 } },
      { text: '살짝 궁금하지만 절대 안 봄', scores: { obsession: 2 } },
      { text: '잠금화면 알림 정도는 슬쩍 봄', scores: { obsession: 3 } },
      { text: '카톡 목록까지는 확인하고 싶음', scores: { obsession: 4 } },
      { text: '최근 통화 기록이랑 카톡 다 확인함', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 SNS에 나 없는 사진만 올리면?',
    options: [
      { text: '좋아요 누르고 끝. 예쁘니까~', scores: { obsession: 1 } },
      { text: '조금 서운하지만 뭐 그럴 수 있지', scores: { obsession: 2 } },
      { text: '왜 나는 안 올려? 하고 넌지시 물어봄', scores: { obsession: 3 } },
      { text: '좋아요 누른 사람들 한 명씩 확인함', scores: { obsession: 4 } },
      { text: '이성이 댓글 달면 누군지 프로필까지 조사', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 전 애인 얘기를 하면?',
    options: [
      { text: '과거일 뿐이지~ 쿨하게 들어줌', scores: { obsession: 1 } },
      { text: '살짝 신경 쓰이지만 티는 안 냄', scores: { obsession: 2 } },
      { text: '슬쩍 비교하면서 나한테 더 잘해주길 바람', scores: { obsession: 3 } },
      { text: '전 애인 SNS를 검색해봄', scores: { obsession: 4 } },
      { text: '전 애인 사진부터 스펙까지 전부 조사 완료', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 나 말고 다른 사람과 있을 때 더 웃는 것 같으면?',
    options: [
      { text: '사교적인 거겠지, 별 생각 없음', scores: { obsession: 1 } },
      { text: '조금 삐지지만 금방 풀림', scores: { obsession: 2 } },
      { text: '왜 나한텐 그렇게 안 웃어? 하고 따짐', scores: { obsession: 3 } },
      { text: '그 사람이 누군지 몰래 파악함', scores: { obsession: 4 } },
      { text: '그 사람이랑 연락하는지 확인하고 싶어짐', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인의 카톡 답장이 평소보다 1시간 늦으면?',
    options: [
      { text: '바쁜가 보다~ 나도 내 할 일 함', scores: { obsession: 1 } },
      { text: '뭐하나 궁금하지만 기다림', scores: { obsession: 2 } },
      { text: '접속 시간 확인하러 프로필 들어감', scores: { obsession: 3 } },
      { text: '왜 안 읽어? 하고 한 번 더 보냄', scores: { obsession: 4 } },
      { text: '3분마다 읽었는지 확인하고 전화까지 고민', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 동성 친구들이랑 놀러 간다고 하면?',
    options: [
      { text: '재밌게 놀아~ 진심으로 응원', scores: { obsession: 1 } },
      { text: '사진 보내줘~ 하고 가볍게 부탁', scores: { obsession: 2 } },
      { text: '누구누구 가는지 물어보고 정리함', scores: { obsession: 3 } },
      { text: '중간중간 연락 오는지 체크함', scores: { obsession: 4 } },
      { text: '진짜 동성 친구만 있는지 확인하고 싶음', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 나를 팔로우하는 이성의 게시물에 좋아요를 누르면?',
    options: [
      { text: '좋아요 하나로 뭘 그래~ 신경 안 씀', scores: { obsession: 1 } },
      { text: '약간 거슬리지만 넘어감', scores: { obsession: 2 } },
      { text: '그 사람 프로필 한번 구경함', scores: { obsession: 3 } },
      { text: '그 사람이랑 DM 하는 건 아닌지 의심됨', scores: { obsession: 4 } },
      { text: '좋아요 기록을 전부 뒤져서 패턴 분석함', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인과 함께인데 연인이 계속 폰을 보면?',
    options: [
      { text: '나도 내 폰 보면서 각자 시간 보냄', scores: { obsession: 1 } },
      { text: '재밌는 거 보여줘~ 하고 자연스럽게 대화', scores: { obsession: 2 } },
      { text: '누구랑 카톡하는지 슬쩍 보려고 함', scores: { obsession: 3 } },
      { text: '나한테 집중 안 하는 거 불만이라 말함', scores: { obsession: 4 } },
      { text: '화면에 뭐가 떠있는지 반사적으로 확인함', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 "오늘 바빠서 못 만나"라고 하면?',
    options: [
      { text: '알겠어~ 다음에 보자! 쿨하게 수락', scores: { obsession: 1 } },
      { text: '아쉽지만 이해하고, 자기 할 일 함', scores: { obsession: 2 } },
      { text: '뭐가 바쁜데? 하고 이유를 캐물음', scores: { obsession: 3 } },
      { text: '진짜 바쁜 건지 다른 약속인지 추리함', scores: { obsession: 4 } },
      { text: '인스타 스토리 올리나 밤새 감시함', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인의 카톡 프로필 사진이 바뀌면?',
    options: [
      { text: '새 사진 이쁘다~ 하고 끝', scores: { obsession: 1 } },
      { text: '어디서 찍은 거야? 가볍게 물어봄', scores: { obsession: 2 } },
      { text: '누가 찍어줬는지가 더 궁금함', scores: { obsession: 3 } },
      { text: '배경이 어딘지 분석해서 누구랑 갔는지 추리', scores: { obsession: 4 } },
      { text: '이전 프로필 사진을 캡처해두고 비교 분석', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 이성에게 친절하게 대하는 걸 보면?',
    options: [
      { text: '매너 좋은 사람이라 자랑스러움', scores: { obsession: 1 } },
      { text: '조금 질투나지만 내색 안 함', scores: { obsession: 2 } },
      { text: '나한테만 더 잘해주면 좋겠다고 말함', scores: { obsession: 3 } },
      { text: '그 이성한테 왜 그렇게까지 친절한 건지 따짐', scores: { obsession: 4 } },
      { text: '앞으로 그 사람이랑 만나지 말라고 함', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인이 새벽에 갑자기 접속 중이면?',
    options: [
      { text: '잠이 안 오나 보다~ 관심 없음', scores: { obsession: 1 } },
      { text: '나도 깨어있으면 연락해볼까? 정도', scores: { obsession: 2 } },
      { text: '누구랑 채팅하는 거지? 궁금해짐', scores: { obsession: 3 } },
      { text: '바로 카톡 보내서 뭐 하냐고 물어봄', scores: { obsession: 4 } },
      { text: '상대 접속 패턴을 기억해뒀다가 나중에 언급', scores: { obsession: 5 } },
    ],
  },
  {
    question: '연인의 과거 연애 사진이 SNS에 남아있으면?',
    options: [
      { text: '과거니까 상관없음. 안 봄', scores: { obsession: 1 } },
      { text: '살짝 불편하지만 지우라고까진 안 함', scores: { obsession: 2 } },
      { text: '슬쩍 지워달라고 넌지시 힌트줌', scores: { obsession: 3 } },
      { text: '확실하게 지워달라고 요청함', scores: { obsession: 4 } },
      { text: '사진 속 전 애인이 누군지 다 파악 완료함', scores: { obsession: 5 } },
    ],
  },
  {
    question: '여행 중 연인과 연락이 안 되면?',
    options: [
      { text: '여행 즐기느라 바쁘겠지~ 기다림', scores: { obsession: 1 } },
      { text: '하루 정도는 괜찮지만 좀 보고 싶음', scores: { obsession: 2 } },
      { text: '왜 연락이 안 되지? 불안해짐', scores: { obsession: 3 } },
      { text: '친구한테 연락해서 상황 파악 시도', scores: { obsession: 4 } },
      { text: '최악의 시나리오 상상하며 전화 폭격', scores: { obsession: 5 } },
    ],
  },
];

window.RESULTS = {
  cool: {
    name: '쿨내진동',
    emoji: '\uD83D\uDE0E',
    description: '집착? 그게 뭔데 먹는 건데? 당신은 연애에서도 자유로운 영혼입니다.',
    detail: '당신의 집착 유형은 "무관심형"에 가깝습니다. 연인의 행동에 크게 동요하지 않고, 각자의 시간을 존중하는 스타일이에요. 누가 봐도 쿨한 연인이지만, 가끔은 상대가 "나에게 관심이 없나?" 하고 불안해할 수 있어요. 연인이 실제로 느끼는 체감 집착도는 거의 0%에 가깝습니다. 관심을 적절히 표현해주는 것도 사랑의 일부라는 걸 기억하세요!',
    traits: ['자유영혼', '독립적', '쿨내폭발'],
    strengths: [
      '연인에게 건강한 개인 공간을 제공해요',
      '질투나 의심으로 관계를 소모하지 않아요',
      '감정적으로 안정되어 있어 관계가 편안해요',
    ],
    weaknesses: [
      '너무 무관심하면 상대가 외로움을 느낄 수 있어요',
      '가끔은 질투도 사랑의 표현이에요 - 적당한 관심 표현을 연습해보세요',
      '상대의 감정 신호를 놓치고 있진 않은지 체크해보세요',
    ],
    good: '공식 집착러',
    bad: '집착 보스',
  },
  healthy: {
    name: '건강한 관심',
    emoji: '\uD83D\uDC9A',
    description: '적당히 관심 주는 이상적인 연인. 당신의 관심은 부담이 아니라 사랑입니다.',
    detail: '당신의 집착 유형은 "안정형"입니다. 연인에 대한 관심과 개인 공간 존중 사이에서 균형을 잘 잡고 있어요. 궁금한 건 있지만 상대를 압박하지 않고, 믿음을 바탕으로 관계를 유지합니다. 연인이 실제로 느끼는 체감 집착도는 약 25~30% 수준으로, "관심받고 있구나"라고 느끼면서도 부담스럽지 않은 딱 좋은 정도예요. 이 밸런스를 유지하세요!',
    traits: ['밸런스킹', '안정적', '신뢰형'],
    strengths: [
      '관심과 자유 사이의 황금 비율을 알고 있어요',
      '상대를 신뢰하면서도 사랑을 잘 표현해요',
      '감정 기복 없이 안정적인 관계를 만들어가요',
    ],
    weaknesses: [
      '가끔 참는 게 쌓이면 한꺼번에 터질 수 있어요',
      '너무 이성적으로만 접근하면 감정적 교감이 부족할 수 있어요',
      '상대가 더 많은 관심을 원할 때 알아차리는 연습이 필요해요',
    ],
    good: '은근 집착러',
    bad: '집착 보스',
  },
  secret: {
    name: '은근 집착러',
    emoji: '\uD83D\uDD75\uFE0F',
    description: '안 그런 척하지만 인스타 접속시간 체크 중. 겉은 쿨, 속은 집착의 이중생활러입니다.',
    detail: '당신의 집착 유형은 "확인형"입니다. 겉으로는 쿨한 척하지만, 혼자 있을 때 연인의 SNS를 몰래 체크하고, 카톡 접속 시간을 슬쩍 확인하는 타입이에요. 직접 말하진 않지만 속으로는 궁금한 게 한가득! 연인이 실제로 느끼는 체감 집착도는 약 40% 수준이지만, 본인이 숨기고 있는 실제 집착도는 60%에 가깝습니다. 티가 안 난다고 생각하지만... 의외로 다 티나요.',
    traits: ['몰래확인', '겉쿨속집착', '프로파일러'],
    strengths: [
      '상대를 직접 압박하지 않아서 관계가 편안해 보여요',
      '관찰력이 뛰어나서 상대의 변화를 빨리 캐치해요',
      '표현은 절제하면서도 속으로 깊이 사랑하는 타입이에요',
    ],
    weaknesses: [
      '혼자 상상하고 혼자 상처받는 패턴을 조심하세요',
      '몰래 확인하는 습관이 신뢰를 해칠 수 있어요',
      '궁금한 건 직접 물어보는 게 건강한 소통이에요',
    ],
    good: '건강한 관심',
    bad: '쿨내진동',
  },
  official: {
    name: '공식 집착러',
    emoji: '\uD83D\uDE33',
    description: '읽씹 3분이면 심장이 철렁. 연락이 곧 애정의 척도인 당신입니다.',
    detail: '당신의 집착 유형은 "불안형 + 소유형"이 혼합된 형태입니다. 연인의 모든 행동이 신경 쓰이고, 연락이 조금만 늦어도 불안해지는 타입이에요. 이건 나쁜 게 아니라, 그만큼 상대를 깊이 사랑하고 있다는 뜻이기도 해요. 다만 연인이 실제로 느끼는 체감 집착도는 약 75% 수준으로, 가끔 숨이 막힌다고 느낄 수 있어요. 사랑의 표현 방법을 조금만 바꿔보면 관계가 훨씬 편안해질 거예요.',
    traits: ['읽씹공포증', '연락중독', '소유욕'],
    strengths: [
      '상대에 대한 사랑이 깊고 진심이에요',
      '연인의 작은 변화도 놓치지 않는 세심함이 있어요',
      '관계에 적극적으로 투자하는 열정이 있어요',
    ],
    weaknesses: [
      '상대에게 숨 쉴 틈을 주는 연습이 필요해요',
      '연락 빈도가 사랑의 크기는 아니라는 걸 기억하세요',
      '불안할 때 혼자 추리하지 말고 솔직하게 대화해보세요',
    ],
    good: '쿨내진동',
    bad: '쿨내진동',
  },
  boss: {
    name: '집착 보스',
    emoji: '\uD83D\uDD25',
    description: 'GPS 켜놓고 싶은 마음을 참는 중. 당신의 사랑은 강렬 그 자체입니다.',
    detail: '당신의 집착 유형은 "통제형"에 가깝습니다. 연인의 모든 것을 알고 싶고, 확인하고 싶고, 내 곁에 두고 싶은 강렬한 사랑을 하는 타입이에요. 이 열정은 진심에서 나오는 것이지만, 상대에게는 부담으로 느껴질 수 있어요. 연인이 실제로 느끼는 체감 집착도는 거의 100%로, "사랑받는다"보다 "감시당한다"에 가까울 수 있어요. 사랑은 잡으면 모래처럼 빠져나간다는 말, 꼭 기억하세요. 건강한 관계를 위해 자신의 불안을 먼저 돌보는 것이 중요합니다.',
    traits: ['GPS추적러', '통제형', '풀소유욕'],
    strengths: [
      '사랑에 대한 열정과 헌신이 남다르게 강해요',
      '상대를 최우선으로 생각하는 진심이 느껴져요',
      '관계에 올인하는 집중력이 대단해요',
    ],
    weaknesses: [
      '상대의 자유를 존중하는 연습이 시급해요',
      '집착이 사랑을 망칠 수 있다는 걸 인지해야 해요',
      '자기 자신에게 집중하는 시간을 반드시 가지세요',
    ],
    good: '공식 집착러',
    bad: '건강한 관심',
  },
};

window.getResult = function (scores) {
  var total = scores.obsession || 0;
  // 15 questions, each 1~5 points: min 15, max 75
  // Normalize to 0~100 scale
  var normalized = Math.round(((total - 15) / 60) * 100);
  if (normalized < 0) normalized = 0;
  if (normalized > 100) normalized = 100;

  var key;
  if (normalized <= 20) {
    key = 'cool';
  } else if (normalized <= 40) {
    key = 'healthy';
  } else if (normalized <= 60) {
    key = 'secret';
  } else if (normalized <= 80) {
    key = 'official';
  } else {
    key = 'boss';
  }

  var r = window.RESULTS[key];
  return {
    key: key,
    name: r.name,
    emoji: r.emoji,
    description: r.description,
    detail: r.detail,
    traits: r.traits,
    strengths: r.strengths,
    weaknesses: r.weaknesses,
    good: r.good,
    bad: r.bad,
  };
};
