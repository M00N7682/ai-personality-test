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
      { text: '나도 일부러 다른 사람이랑 찍은 사진 올려서 반응 봄', scores: { obsession: 4 } },
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
      { text: '나한테는 왜 그렇게 안 웃어주냐고 넌지시 말함', scores: { obsession: 3 } },
      { text: '왜 나한텐 그렇게 안 웃어? 하고 따짐', scores: { obsession: 4 } },
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
      { text: '은근슬쩍 "그 사람 아는 사이야?" 하고 떠봄', scores: { obsession: 3 } },
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
      { text: '혹시 나 말고 다른 사람 만나는 건 아닌지 궁금해짐', scores: { obsession: 3 } },
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
      { text: '그 시간에 접속한 이유를 은근히 다음 날 물어봄', scores: { obsession: 3 } },
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
      { text: '같이 간 친구한테 DM 보내서 슬쩍 안부 물어봄', scores: { obsession: 3 } },
      { text: '친구한테 연락해서 상황 파악 시도', scores: { obsession: 4 } },
      { text: '최악의 시나리오 상상하며 전화 폭격', scores: { obsession: 5 } },
    ],
  },
];

window.RESULTS = {
  cool: {
    name: '쿨내진동',
    emoji: '\uD83D\uDE0E',
    description: '너 사실 연애하면서 혼자 있는 기분 꽤 좋아하는 사람이야. 근데 그 쿨함의 정체, 진짜 여유인지 아니면 상처받기 싫어서 미리 거리 두는 건지 한번 생각해봐.',
    detail: '너는 연인이 이성 친구 만나도, 답장이 늦어도, 새벽에 접속 중이어도 진짜 아무렇지 않은 타입이야. 근데 이게 진짜 신뢰에서 오는 쿨함이면 좋겠는데, 솔직히 말하면 "깊이 빠지면 나만 손해"라는 방어기제가 깔려있는 경우가 많아. 과거에 마음 줬다가 크게 데인 적 있거나, 원래 감정 표현 자체가 낯선 환경에서 자란 거 아니야? 상대 입장에선 네가 "나한테 관심이 없나?" 하고 불안 루프 돌고 있을 확률 높아. 읽씹당해도 아무 말 안 하는 너를 보면서, 상대는 오히려 네 관심을 끌려고 일부러 답장을 늦춰보기도 해. 그리고 너 진짜 아무렇지도 않아서 그 작전이 통하지도 않지. 재밌는 건 네가 관계에서 진짜 필요한 순간에도 "괜찮아"를 먼저 말하는 사람이라는 거야 -- 그 괜찮다가 진짜인 건지 스스로한테 물어본 적 있어?',
    traits: ['자유영혼', '독립적', '쿨내폭발'],
    strengths: [
      '연인이 친구 약속 잡을 때 눈치 안 줘서 상대가 숨통이 트여함',
      '싸울 일 자체가 적어서 주변에서 "너네 진짜 안 싸우냐"는 소리 들음',
      '감정에 휘둘려서 새벽 감성 장문 카톡 같은 건 절대 안 보냄',
    ],
    weaknesses: [
      '상대가 힘든 일 있어서 돌려 말해도 "그래? 힘들겠다 ㅠ" 한 줄로 끝내버림',
      '기념일을 깜빡해도 별로 미안하지 않아서 상대 속이 터짐',
      '상대가 결국 "나 좋아하긴 해?" 하고 확인받으려는 질문을 하게 만듦',
    ],
    good: '공식 집착러',
    bad: '집착 보스',
  },
  healthy: {
    name: '건강한 관심',
    emoji: '\uD83D\uDC9A',
    description: '너는 "좋아하면 이 정도는 당연한 거 아냐?"의 기준이 진짜 적절한 희귀한 사람이야. 근데 그 균형, 노력해서 유지하는 거잖아 -- 참고 있는 게 쌓이고 있는 건 아닌지 확인해봐.',
    detail: '연인이 이성 친구 만나면 "누구?" 정도 물어보고 끝, 카톡 늦으면 궁금하지만 기다릴 줄 아는 너. 겉보기엔 완벽한 연인인데, 사실 이 밸런스의 비밀은 네가 은근히 참을성이 강해서야. 궁금한 거 10개 중에 7개는 삼키고 3개만 물어보는 거거든. 문제는 그 삼킨 7개가 어디로 가냐는 거야. 보통 혼자 뇌내 시뮬레이션 돌리면서 "아 이건 내가 예민한 거지" 하고 스스로 설득하잖아. 상대 입장에서 너는 "부담 없고 편한 연인"인데, 가끔 네가 갑자기 폭발하면 "갑자기 왜 그래?"라는 반응이 나와. 그게 갑자기가 아니라 원래 쌓여있던 건데, 평소에 너무 잘 숨기니까 상대가 모르는 거야. 솔직히 너 가끔 "나만 이렇게 맞춰주는 거 아냐?" 하는 생각 들 때 있지?',
    traits: ['밸런스킹', '안정적', '신뢰형'],
    strengths: [
      '연인한테 "너는 진짜 편하다"는 말을 제일 많이 듣는 타입임',
      '궁금해도 참고 기다릴 줄 알아서 쓸데없는 다툼이 거의 없음',
      '상대 친구들한테도 "너네 oo 진짜 좋은 사람이다"라는 평가를 받음',
    ],
    weaknesses: [
      '참다 참다 터지면 상대가 전혀 예상 못 해서 충격이 두 배가 됨',
      '"나는 이만큼 맞춰주는데 왜 너는 안 해?"라는 내적 점수판이 있음',
      '합리적으로만 대화하려다가 상대가 "감정이 없는 사람 같아"라고 느낄 때 있음',
    ],
    good: '은근 집착러',
    bad: '집착 보스',
  },
  secret: {
    name: '은근 집착러',
    emoji: '\uD83D\uDD75\uFE0F',
    description: '겉으로는 "나 그런 거 신경 안 써~" 하면서 화장실에서 인스타 팔로워 목록 뒤지고 있는 사람, 너 맞지? 쿨한 척이 직업인 너의 이중생활, 생각보다 다 들켜있어.',
    detail: '너는 절대 대놓고 "누구랑 있었어?"라고 안 물어봐. 그 대신 인스타 스토리 조회수, 카톡 프로필 변경 시간, 좋아요 목록을 은밀하게 수사하지. 이게 왜 이러냐면, 직접 물어보는 순간 "집착하는 사람"이 되는 게 자존심이 허락을 안 하는 거야. 그래서 혼자 탐정놀이 하면서 "팩트 확인"을 하고, 다 알아낸 다음에도 모른 척해. 카톡 읽씹당하면 괜히 인스타 스토리를 올려서 "나도 잘 놀고 있음"을 어필하고, 상대가 이성 팔로우하면 그 계정 프로필 사진까지 확대해서 본 적 있잖아. 상대 입장에서 너는 쿨한 줄 알았는데, 가끔 네가 "그때 그 사람이랑 갔던 카페..."라고 무심하게 던지는 말에 소름 끼칠 때가 있어. 솔직히 너도 알지? 이 몰래 확인하는 시간에 차라리 직접 물어보는 게 100배 편하다는 거.',
    traits: ['몰래확인', '겉쿨속집착', '프로파일러'],
    strengths: [
      '관찰력이 FBI급이라 상대가 머리 자른 것도 0.5초 만에 알아챔',
      '대놓고 추궁 안 해서 상대가 "얘는 쿨하네" 하고 안심함',
      '정보 수집 능력이 뛰어나서 서프라이즈 이벤트 같은 건 기가 막히게 함',
    ],
    weaknesses: [
      '혼자 뇌내 추리소설 쓰다가 없는 사실까지 만들어내서 자기가 상처받음',
      '"그때 네 인스타에..." 하다가 스토킹한 게 들켜서 더 민망해진 적 있음',
      '직접 물어보면 1분이면 끝날 걸 혼자 3시간 동안 SNS 파면서 고통받음',
    ],
    good: '건강한 관심',
    bad: '쿨내진동',
  },
  official: {
    name: '공식 집착러',
    emoji: '\uD83D\uDE33',
    description: '읽씹 3분이면 심장이 쿵, 5분이면 "혹시 사고?" 10분이면 시나리오 3편 완성이야. 근데 알아? 네 집착의 진짜 뿌리는 "사랑"이 아니라 "나를 떠날까 봐"라는 공포야.',
    detail: '너는 연인이 30분만 연락 없어도 뇌에서 자동으로 최악의 시나리오가 재생되는 사람이야. "바쁜가 보다"라는 합리적인 생각은 3초면 끝나고, 그 다음부턴 "혹시 다른 사람이랑?", "나한테 식은 건가?" 같은 불안이 폭주해. 이 패턴이 생긴 이유는 과거에 "괜찮을 줄 알았는데 갑자기 떠나버린" 경험이 있거나, 어릴 때부터 확인받지 못한 사랑의 빈자리가 있기 때문이야. 그래서 연락 = 애정이라는 공식이 머릿속에 박혀있어. 상대 입장에선 처음엔 "이렇게까지 좋아해주다니 감동"이었는데, 시간이 지나면 카톡 답장을 의무처럼 느끼기 시작해. 너도 알아 사실. "또 확인하고 있는 나" 가 싫을 때가 있잖아. 자기혐오까지 가는 건 너도 이게 과하다는 걸 본능적으로 알고 있기 때문이야. 그 자각이 있다는 게 진짜 중요한 거야.',
    traits: ['읽씹공포증', '연락중독', '소유욕'],
    strengths: [
      '기념일, 며칠 전 대화 내용, 상대가 좋아하는 음식까지 전부 기억해서 감동 줌',
      '상대가 아프거나 힘들 때 제일 먼저 달려가는 사람이 항상 너임',
      '연애에 진심이라 상대가 "이 사람은 나를 진짜 좋아하는구나" 확신할 수 있음',
    ],
    weaknesses: [
      '답장 안 오면 괜히 인스타 스토리 올려서 "나 여기 있어" 어필하게 됨',
      '"지금 뭐해?" 카톡을 하루에 5번 이상 보내면서 그게 확인이 아니라 대화라고 합리화함',
      '상대가 개인 시간 가지겠다고 하면 "나랑 있는 게 싫어?"로 변환해서 받아들임',
    ],
    good: '쿨내진동',
    bad: '쿨내진동',
  },
  boss: {
    name: '집착 보스',
    emoji: '\uD83D\uDD25',
    description: '너는 사랑하는 사람을 유리병 안에 넣어두고 싶은 사람이야. 근데 그 유리병, 너를 가두고 있는 것도 같은 거라는 걸 알아?',
    detail: '솔직히 말할게. 너는 연인의 카톡 목록, 통화 기록, 인스타 좋아요 목록, 팔로워 변동까지 전부 파악하고 있고, 그걸 머릿속 데이터베이스에 저장해둬. "3일 전에 팔로우한 그 계정 누구야?" 같은 말이 입에서 자연스럽게 나오는 수준이야. 이 패턴은 단순히 사랑이 커서가 아니야. "이 사람마저 나를 버리면 어떡하지"라는 깊은 공포가 핵심이야. 어쩌면 네가 집착하는 건 상대가 아니라, "누군가가 나를 절대 떠나지 않는다는 확신" 그 자체야. 상대방은 이미 감시당하는 느낌을 받고 있어. 처음엔 "이렇게까지 좋아해주는 사람 처음이야" 했는데, 지금은 폰 볼 때마다 긴장하고 있을 확률 높아. 제일 무서운 건 뭔지 알아? 네가 두려워하는 "떠남"을 네 집착이 직접 만들어내고 있다는 거야. 근데 이 글 읽으면서 찔리고 있다는 건, 네 안에 바꾸고 싶은 마음이 이미 있다는 뜻이야.',
    traits: ['GPS추적러', '통제형', '풀소유욕'],
    strengths: [
      '상대를 향한 진심은 누구보다 뜨거워서, 진심이 통할 때의 깊이가 남다름',
      '연인한테 올인하는 집중력이 있어서 상대가 "세상에서 제일 특별한 사람" 느낌을 받음',
      '관계에 위기가 오면 절대 먼저 포기 안 하고 끝까지 매달리는 끈기가 있음',
    ],
    weaknesses: [
      '상대 폰에 모르는 번호 있으면 그 번호 검색해보거나, 직접 전화해볼까 고민한 적 있음',
      '연인이 혼자 시간 보내겠다고 하면 "그 시간에 누구 만나는 거 아냐?"부터 떠오름',
      '"너 아니면 안 돼"라는 말이 사랑 고백이 아니라 협박처럼 들릴 수 있다는 걸 인지해야 함',
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
