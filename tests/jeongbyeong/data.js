/* ========== 정병력 사전 진단 - 썸남/썸녀 정병 위험도 ========== */

window.TEST_CONFIG = {
  id: 'jeongbyeong',
  title: '정병력 사전 진단',
  subtitle: '썸남/썸녀 정병 위험도',
  emoji: '🚨',
  participants: 13800,
  duration: '3분',
  loadingMessages: [
    '정병 지수를 측정하는 중... 🔬',
    '위험 신호를 분석하고 있어요... 🚩',
    '진단서 작성 거의 완료! 📋',
  ],
};

window.QUESTIONS = [
  {
    question: '그 사람의 평소 연락 빈도는?',
    options: [
      { text: '적당히 하루 1~2번, 센스 있게', scores: { jeongbyeong: 1 } },
      { text: '수시로 연락 옴, 뭐 하냐고 계속 물어봄', scores: { jeongbyeong: 3 } },
      { text: '새벽 3시에도 "자?" 하고 옴', scores: { jeongbyeong: 5 } },
      { text: '내가 먼저 해야만 답장 옴 (근데 읽자마자 바로 옴)', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '읽씹했을 때 그 사람 반응은?',
    options: [
      { text: '아무 일 없다는 듯 다음에 또 연락함', scores: { jeongbyeong: 1 } },
      { text: '"바빠?" "뭐 해?" "화났어?" 연달아 옴', scores: { jeongbyeong: 4 } },
      { text: '카톡, 인스타 DM, 전화까지 총동원함', scores: { jeongbyeong: 5 } },
      { text: '갑자기 의미심장한 인스타 스토리 올림', scores: { jeongbyeong: 3 } },
    ],
  },
  {
    question: '약속 잡는 스타일은?',
    options: [
      { text: '"이번 주말에 시간 돼?" 자연스럽게', scores: { jeongbyeong: 1 } },
      { text: '"내일 만나자, 모레도 만나자, 평일도 만나자"', scores: { jeongbyeong: 4 } },
      { text: '약속 잡고 갑자기 취소, 그리고 미안해 폭격', scores: { jeongbyeong: 5 } },
      { text: '만나자는 말 없다가 갑자기 "지금 어디야? 나가 있어?"', scores: { jeongbyeong: 3 } },
    ],
  },
  {
    question: '그 사람 SNS 활동은?',
    options: [
      { text: '적당히 올리고 적당히 반응함', scores: { jeongbyeong: 1 } },
      { text: '내 게시물에 좋아요+댓글+DM 트리플 콤보', scores: { jeongbyeong: 3 } },
      { text: '내 팔로워 목록을 외우고 있음', scores: { jeongbyeong: 5 } },
      { text: '내가 누구 게시물에 좋아요 눌렀는지 다 체크함', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '다른 이성과 대화하는 걸\n봤을 때 반응은?',
    options: [
      { text: '"친구야?" 하고 자연스럽게 넘어감', scores: { jeongbyeong: 1 } },
      { text: '표정이 굳고 하루 종일 말수가 줄어듦', scores: { jeongbyeong: 3 } },
      { text: '"그 사람 누구야? 자주 만나? 번호 삭제해"', scores: { jeongbyeong: 5 } },
      { text: '아무 말 없다가 나중에 그 사람 인스타를 찾아냄', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '전 애인 관련 반응은?',
    options: [
      { text: '과거는 과거, 크게 신경 안 씀', scores: { jeongbyeong: 1 } },
      { text: '은근히 자주 물어봄 "전 애인은 어떤 사람이었어?"', scores: { jeongbyeong: 3 } },
      { text: '전 애인 인스타를 이미 다 뒤져봤음', scores: { jeongbyeong: 5 } },
      { text: '"전 애인이랑 가던 카페는 우리 가지 말자"', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '늦게 답장했더니 하는 말은?',
    options: [
      { text: '"ㅋㅋ 바빴구나~"', scores: { jeongbyeong: 1 } },
      { text: '"몇 시간이나 지났는데 이제 보는 거야?"', scores: { jeongbyeong: 3 } },
      { text: '"누구랑 있었어? 솔직히 말해"', scores: { jeongbyeong: 5 } },
      { text: '답장 안 하고 나한테도 읽씹으로 복수함', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '만날 때 핸드폰 사용에\n대한 반응은?',
    options: [
      { text: '각자 폰 보면서 편하게 있음', scores: { jeongbyeong: 1 } },
      { text: '"누구한테 카톡 왔어?" 하고 슬쩍 봄', scores: { jeongbyeong: 3 } },
      { text: '"폰 좀 보여줘" 또는 잠금 비밀번호를 알고 싶어함', scores: { jeongbyeong: 5 } },
      { text: '내가 폰 볼 때마다 한숨 쉬거나 눈치줌', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '감정 표현 스타일은?',
    options: [
      { text: '좋을 때 좋다, 슬플 때 슬프다, 건강한 표현', scores: { jeongbyeong: 1 } },
      { text: '"너 없으면 나 어떡해..." 의존적 발언 자주 함', scores: { jeongbyeong: 4 } },
      { text: '화나면 연락 끊었다가 새벽에 장문 카톡 보냄', scores: { jeongbyeong: 5 } },
      { text: '기분 좋다가 갑자기 삐지고, 이유를 안 알려줌', scores: { jeongbyeong: 3 } },
    ],
  },
  {
    question: '헤어지자고 하면\n예상 반응은?',
    options: [
      { text: '슬프지만 존중하고 정리하려 함', scores: { jeongbyeong: 1 } },
      { text: '"다시 생각해봐" 며칠간 설득 모드', scores: { jeongbyeong: 3 } },
      { text: '"나 없이 못 살 거야" + 공통 지인 총동원', scores: { jeongbyeong: 5 } },
      { text: '갑자기 태도 180도 변해서 잘해줌', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '그 사람의 이상한 버릇이 있다면?',
    options: [
      { text: '딱히 이상한 건 없음, 정상인임', scores: { jeongbyeong: 1 } },
      { text: '카톡 프사 바뀌면 바로 알아채고 물어봄', scores: { jeongbyeong: 3 } },
      { text: '내 위치를 대략적으로 파악하고 있음 (어떻게?)', scores: { jeongbyeong: 5 } },
      { text: '내 친구들 이름과 관계도를 전부 외우고 있음', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '둘이 싸웠을 때 화해 방식은?',
    options: [
      { text: '서로 시간 갖고 대화로 풀어감', scores: { jeongbyeong: 1 } },
      { text: '5분도 안 돼서 "미안해" 연타 폭격', scores: { jeongbyeong: 3 } },
      { text: '울면서 전화하거나 갑자기 찾아옴', scores: { jeongbyeong: 5 } },
      { text: '냉전하다가 갑자기 선물 공세', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '나한테 하는 말 중\n이상한 거 있다면?',
    options: [
      { text: '특별히 이상한 말은 없음', scores: { jeongbyeong: 1 } },
      { text: '"너 말고 다른 사람 만나면 나 죽어" (농담이겠지?)', scores: { jeongbyeong: 5 } },
      { text: '"아까 인스타 접속했던데 왜 답장 안 했어?"', scores: { jeongbyeong: 4 } },
      { text: '"우리 커플 앱 깔까?" (사귄 지 일주일)', scores: { jeongbyeong: 3 } },
    ],
  },
  {
    question: '친구들이 그 사람에 대해\n뭐라고 하던가?',
    options: [
      { text: '"괜찮은 사람인 것 같아~"', scores: { jeongbyeong: 1 } },
      { text: '"좀... 집착 아니야? ㅋㅋ"', scores: { jeongbyeong: 3 } },
      { text: '"야 그거 레드플래그인데?"', scores: { jeongbyeong: 5 } },
      { text: '"그 사람 너한테 진심이긴 한데... 좀 무섭다"', scores: { jeongbyeong: 4 } },
    ],
  },
  {
    question: '최종 질문! 직감적으로\n그 사람은 어떤 느낌이야?',
    options: [
      { text: '편하고 안전한 사람, 믿음직해', scores: { jeongbyeong: 1 } },
      { text: '좋긴 한데 가끔 좀 과하다 싶음', scores: { jeongbyeong: 3 } },
      { text: '설레긴 하는데 뭔가 불안함이 있음', scores: { jeongbyeong: 4 } },
      { text: '솔직히 좀 무서울 때가 있음', scores: { jeongbyeong: 5 } },
    ],
  },
];

window.RESULTS = {
  safe: {
    name: '🟢 안전 등급',
    emoji: '🟢',
    description: '축하합니다, 정상인입니다. 이 정도면 연애해도 됩니다.',
    detail: '정병 위험도 거의 제로! 이 사람은 건강한 연애를 할 줄 아는 성숙한 사람이에요. 적당한 거리감을 유지할 줄 알고, 상대방의 개인 공간을 존중해요. 감정 표현도 적절하고, 혼자만의 시간도 즐길 줄 알아요. 솔직히 요즘 세상에 이런 사람 찾기 어렵습니다. 꽉 잡으세요.',
    traits: ['정상인', '건강한_연애', '존중의_아이콘'],
    strengths: [
      '감정 기복 없이 안정적인 연애가 가능해요',
      '서로의 개인 시간을 존중할 줄 알아요',
      '소통이 건강하고 성숙해요',
    ],
    weaknesses: [
      '너무 쿨해서 가끔 관심 없는 건가 싶을 수도',
      '자기 감정에 솔직하지 않을 수 있어요',
      '재미없다고 느낄 수도... (그만큼 평화로운 거임)',
    ],
    good: '같은 안전 등급 🟢',
    bad: '종합병원 ⚫',
  },
  attention: {
    name: '🟡 관심종자',
    emoji: '🟡',
    description: '관심이 좀 많을 뿐... 아직은 귀여운 수준입니다.',
    detail: '정병이라기보다는 관심이 좀 많은 거예요! 상대방을 좋아하는 마음이 커서 이것저것 확인하고 싶은 마음이 있지만, 아직 통제 가능한 범위 안에 있어요. 좋아하면 티가 확 나는 타입이라 솔직하고 귀여운 면이 있어요. 다만 지금부터 잘 관리해야 다음 단계로 진화하지 않아요!',
    traits: ['관심_폭발', '귀여운_수준', '아직_세이프'],
    strengths: [
      '관심이 많다는 건 그만큼 좋아한다는 뜻이에요',
      '표현력이 좋아서 연애할 때 외롭지 않아요',
      '기념일이나 중요한 날 절대 안 까먹어요',
    ],
    weaknesses: [
      '관심이 과하면 부담이 될 수 있어요',
      '상대방 일거수일투족을 체크하려는 경향이 살짝',
      '답장 속도에 민감할 수 있어요',
    ],
    good: '안전 등급 🟢',
    bad: '감정 폭탄 🔴',
  },
  anxious: {
    name: '🟠 불안형 집착러',
    emoji: '🟠',
    description: '혼자 카톡 프사 확대하는 중. 불안이 집착을 부르고 있어요.',
    detail: '이 사람은 근본적으로 불안함이 크기 때문에 상대방에게 집착하는 모습을 보여요. "나를 진짜 좋아하는 걸까?", "다른 사람한테 가면 어쩌지?" 같은 생각이 머릿속을 떠나지 않아요. 본인도 이런 자신이 싫지만 멈출 수가 없어요. 사랑이 부족해서가 아니라, 확인이 필요한 거예요. 충분한 안심과 꾸준한 표현이 있으면 많이 나아질 수 있어요.',
    traits: ['불안형_애착', '확인_중독', '프사_확대_전문'],
    strengths: [
      '한 번 좋아하면 진짜 끝까지 좋아해요',
      '상대를 절대 소홀히 하지 않아요',
      '감정이 깊고 진지해요',
    ],
    weaknesses: [
      '혼자 불안해하다가 상대방까지 지치게 할 수 있어요',
      '확인 욕구가 강해서 피로감을 줄 수 있어요',
      '사소한 변화에도 크게 반응할 수 있어요',
    ],
    good: '관심종자 🟡',
    bad: '전략가 🟣',
  },
  'emotional-bomb': {
    name: '🔴 감정 폭탄',
    emoji: '🔴',
    description: '읽씹 = 이별 통보로 해석. 감정의 롤러코스터에 탑승하셨습니다.',
    detail: '위험합니다. 이 사람은 감정의 진폭이 매우 크고, 작은 일에도 극단적으로 반응할 수 있어요. 읽씹 한 번에 "나 버린 거야?"가 되고, 늦은 답장 한 번에 "다른 사람 만나는 거지?"가 돼요. 사랑이 넘치는 건 좋지만, 그 사랑이 상대방을 질식시킬 수 있어요. 연애하기 전에 충분한 대화와 경계 설정이 필요해요.',
    traits: ['감정_롤러코스터', '읽씹_공포증', '폭풍_전야'],
    strengths: [
      '감정이 솔직해서 오히려 속 시원한 면이 있어요',
      '사랑할 때 온 힘을 다해요, 진심 200%',
      '절대 무관심하지 않아서 사랑받는 느낌이 확실해요',
    ],
    weaknesses: [
      '감정 기복이 심해서 상대방이 눈치를 많이 봐야 해요',
      '사소한 것에 크게 상처받을 수 있어요',
      '관계가 불안정해질 수 있어요',
    ],
    good: '관심종자 🟡',
    bad: '안전 등급 🟢',
  },
  strategist: {
    name: '🟣 전략가',
    emoji: '🟣',
    description: '밀당 고수, 의도적 정병. 계산된 애정 결핍 유발범입니다.',
    detail: '이 사람은 좀 다른 유형이에요. 무의식적 집착이 아니라 "의도적"으로 상대방의 감정을 흔들어요. 갑자기 연락을 끊었다가 아무렇지 않게 돌아오고, 밀었다가 확 당기는 전략을 쓰죠. 본인은 여유로운 척하지만 속으로는 상대방의 모든 반응을 계산하고 있어요. 매력적이지만 위험한 타입. 이 사람이랑 연애하면 멘탈이 강해지거나 부서지거나 둘 중 하나예요.',
    traits: ['밀당_고수', '계산된_어장', '심리전_달인'],
    strengths: [
      '연애 초반 설렘을 극대화시켜줘요',
      '자기 관리를 잘해서 매력적이에요',
      '지루할 틈이 없어요 (좋은 의미인지는...)',
    ],
    weaknesses: [
      '진심인지 게임인지 구분이 안 돼요',
      '상대방 멘탈이 강해야 버텨요',
      '장기적으로 신뢰 형성이 어려울 수 있어요',
    ],
    good: '전략가 🟣 (서로 밀당하다 불 붙음)',
    bad: '불안형 집착러 🟠',
  },
  hospital: {
    name: '⚫ 종합병원',
    emoji: '⚫',
    description: '도망쳐. 진짜로. 지금 당장.',
    detail: '여기까지 오셨다면 심각합니다. 이 사람은 정병의 끝판왕이에요. 연락 확인, SNS 스토킹, 위치 추적, 전 애인 조사까지... 사랑이라는 이름 아래 모든 것을 정당화하려 해요. 본인은 "다 널 사랑하니까"라고 하지만, 이건 사랑이 아니라 집착이에요. 당장 주변 사람들과 상의하고, 필요하다면 거리를 두세요. 당신의 안전이 최우선입니다.',
    traits: ['집착_그자체', '정병_종합선물세트', '도망쳐_제발'],
    strengths: [
      '...나를 진짜 좋아하긴 하는 것 같아요 (그게 문제)',
      '절대 안 잊어버려요 (모든 걸 기억해요... 전부...)',
      '헌신적이에요 (본인 기준에서는)',
    ],
    weaknesses: [
      '상대방의 자유와 개인 공간이 없어져요',
      '관계가 불건강해질 확률이 매우 높아요',
      '심하면 일상생활에 지장이 올 수 있어요',
    ],
    good: '없음 (치료 먼저 받으세요)',
    bad: '안전 등급 🟢 (도망가세요)',
  },
};

/* ========== 점수 합산 → 등급 판정 커스텀 로직 ========== */
window.getResult = function (scores) {
  var total = scores.jeongbyeong || 0;
  var key;

  if (total <= 20) {
    key = 'safe';
  } else if (total <= 30) {
    key = 'attention';
  } else if (total <= 40) {
    key = 'anxious';
  } else if (total <= 50) {
    key = 'emotional-bomb';
  } else if (total <= 60) {
    key = 'strategist';
  } else {
    key = 'hospital';
  }

  var result = window.RESULTS[key];
  return {
    key: key,
    name: result.name,
    emoji: result.emoji,
    description: result.description,
    detail: result.detail,
    traits: result.traits,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    good: result.good,
    bad: result.bad,
  };
};
