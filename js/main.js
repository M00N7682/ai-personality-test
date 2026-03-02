/**
 * 연애.zip 메인 페이지
 * 테스트 카드 렌더링, 탭 필터, 참여자 수 카운터
 */

const TESTS = [
  {
    id: 'animal-type',
    title: '상대방이 보는 나',
    subtitle: '연애 동물 유형 테스트',
    emoji: '🐱',
    color: '#FF6B9D',
    thumbnail: '/assets/thumbnails/animal-type.png',
    participants: 15200,
    duration: '2분',
    isNew: false,
    isHot: true,
    ready: true,
    url: '/tests/animal-type/'
  },
  {
    id: 'jeongbyeong',
    title: '정병력 사전 진단',
    subtitle: '썸남/썸녀 정병 위험도',
    emoji: '🚨',
    color: '#EF4444',
    thumbnail: '/assets/thumbnails/jeongbyeong.png',
    participants: 13800,
    duration: '3분',
    isNew: false,
    isHot: true,
    ready: true,
    url: '/tests/jeongbyeong/'
  },
  {
    id: 'crush-or-some',
    title: '짝사랑 vs 썸',
    subtitle: 'AI가 냉정하게 판정',
    emoji: '🤖',
    color: '#60A5FA',
    thumbnail: '/assets/thumbnails/crush-or-some.png',
    participants: 11500,
    duration: '2분',
    isNew: true,
    isHot: false,
    ready: true,
    url: '/tests/crush-or-some/'
  },
  {
    id: 'worst-type',
    title: '최악의 연애 유형',
    subtitle: '토너먼트로 찾는 내 지뢰',
    emoji: '💣',
    color: '#F97316',
    thumbnail: '/assets/thumbnails/worst-type.png',
    participants: 10200,
    duration: '2분',
    isNew: true,
    isHot: false,
    ready: true,
    url: '/tests/worst-type/'
  },
  {
    id: 'saju-job',
    title: '점성술 연애운',
    subtitle: '생년월일시로 보는 연애 운명',
    emoji: '🔮',
    color: '#8B5CF6',
    thumbnail: '/assets/thumbnails/saju-job.png',
    participants: 9800,
    duration: '1분',
    isNew: true,
    isHot: true,
    ready: true,
    url: '/tests/saju-job/'
  },
  {
    id: 'zodiac-love',
    title: '별자리 연애운',
    subtitle: '올해 나의 연애 운세',
    emoji: '⭐',
    color: '#FBBF24',
    thumbnail: '/assets/thumbnails/zodiac-love.png',
    participants: 8500,
    duration: '1분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/zodiac-love/'
  },
  {
    id: 'obsession',
    title: '연애 집착도',
    subtitle: '나의 집착 레벨 측정',
    emoji: '👀',
    color: '#EC4899',
    thumbnail: '/assets/thumbnails/obsession.png',
    participants: 7800,
    duration: '3분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/obsession/'
  },
  {
    id: 'movie-heroine',
    title: '로맨스 여주인공',
    subtitle: '내 연애가 영화라면?',
    emoji: '🎬',
    color: '#A78BFA',
    thumbnail: '/assets/thumbnails/movie-heroine.png',
    participants: 7200,
    duration: '2분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/movie-heroine/'
  },
  {
    id: 'love-temp',
    title: '연애 온도 테스트',
    subtitle: '나의 연애 온도는 몇 도?',
    emoji: '🌡️',
    color: '#FB923C',
    thumbnail: '/assets/thumbnails/love-temp.png',
    participants: 6500,
    duration: '1분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/love-temp/'
  },
  {
    id: 'attraction-type',
    title: '끌리는 유형 분석',
    subtitle: '무의식이 원하는 이상형',
    emoji: '💘',
    color: '#F472B6',
    thumbnail: '/assets/thumbnails/attraction-type.png',
    participants: 6100,
    duration: '3분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/attraction-type/'
  },
  {
    id: 'why-fail',
    title: '연애 망하는 이유',
    subtitle: '반복되는 실패 원인 진단',
    emoji: '💔',
    color: '#6B7280',
    thumbnail: '/assets/thumbnails/why-fail.png',
    participants: 5800,
    duration: '3분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/why-fail/'
  },
  {
    id: 'future-scenario',
    title: '미래 연애 시나리오',
    subtitle: '6개월 뒤 나의 연애는?',
    emoji: '🔮',
    color: '#C084FC',
    thumbnail: '/assets/thumbnails/future-scenario.png',
    participants: 5200,
    duration: '2분',
    isNew: true,
    isHot: false,
    ready: true,
    url: '/tests/future-scenario/'
  },
  {
    id: 'flirting',
    title: '플러팅 능력 테스트',
    subtitle: '나의 플러팅 등급은?',
    emoji: '😘',
    color: '#FF6B9D',
    thumbnail: '/assets/thumbnails/flirting.png',
    participants: 4800,
    duration: '2분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/flirting/'
  },
  {
    id: 'needed-lover',
    title: '필요한 연인 유형',
    subtitle: '원하는 것 ≠ 필요한 것',
    emoji: '🧩',
    color: '#34D399',
    participants: 4200,
    duration: '3분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/needed-lover/'
  },
  {
    id: 'dog-type',
    title: '강아지 유형 테스트',
    subtitle: '연애할 때 나는 어떤 강아지?',
    emoji: '🐶',
    color: '#FBBF24',
    thumbnail: '/assets/thumbnails/dog-type.png',
    participants: 3800,
    duration: '2분',
    isNew: false,
    isHot: false,
    ready: true,
    url: '/tests/dog-type/'
  }
];

/**
 * 참여자 수 포맷팅 (1.2만, 8.5천 등)
 */
function formatParticipants(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
  }
  return num.toString();
}

/**
 * 로컬스토리지 기반 참여자 수 (매일 조금씩 증가)
 */
function getParticipantCount(testId, base) {
  const key = `participants_${testId}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    const data = JSON.parse(stored);
    const daysSince = Math.floor((Date.now() - data.timestamp) / (1000 * 60 * 60 * 24));
    if (daysSince > 0) {
      const growth = Math.floor(Math.random() * 50 + 20) * daysSince;
      data.count += growth;
      data.timestamp = Date.now();
      localStorage.setItem(key, JSON.stringify(data));
    }
    return data.count;
  }

  const jitter = Math.floor(Math.random() * 200 - 100);
  const count = base + jitter;
  localStorage.setItem(key, JSON.stringify({ count, timestamp: Date.now() }));
  return count;
}

/**
 * 테스트 카드 HTML 생성
 */
function createCardHTML(test) {
  const count = getParticipantCount(test.id, test.participants);
  const formattedCount = formatParticipants(count);

  let badge = '';
  if (!test.ready) {
    badge = '<span class="badge badge-soon">준비중</span>';
  } else if (test.isHot) {
    badge = '<span class="badge badge-hot">HOT</span>';
  } else if (test.isNew) {
    badge = '<span class="badge badge-new">NEW</span>';
  }

  const disabledClass = test.ready ? '' : ' disabled';
  const tag = test.ready ? 'a' : 'div';
  const href = test.ready ? ` href="${test.url}"` : '';

  const visual = test.thumbnail
    ? `<img class="card-thumbnail" src="${test.thumbnail}" alt="${test.title}" loading="lazy">`
    : `<div class="card-accent" style="background:${test.color}"></div>`;

  return `
    <${tag} class="test-card${disabledClass}"${href} data-id="${test.id}">
      ${badge}
      ${visual}
      <div class="card-title">${test.title}</div>
      <div class="card-subtitle">${test.subtitle}</div>
      <div class="card-meta">
        <span>${formattedCount}명 참여</span>
        <span>${test.duration}</span>
      </div>
    </${tag}>
  `;
}

/**
 * 카드 그리드 렌더링
 */
function renderCards(filter) {
  const grid = document.getElementById('card-grid');
  let filtered;

  switch (filter) {
    case 'hot':
      filtered = TESTS.filter(t => t.isHot);
      break;
    case 'new':
      filtered = TESTS.filter(t => t.isNew);
      break;
    default:
      filtered = TESTS;
  }

  grid.innerHTML = filtered.map(createCardHTML).join('');
}

/**
 * 탭 필터 초기화
 */
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCards(tab.dataset.filter);
    });
  });
}

/**
 * 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  renderCards('all');
  initTabs();
});
