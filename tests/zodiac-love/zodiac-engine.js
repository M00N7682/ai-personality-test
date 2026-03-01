/**
 * 별자리로 연애운 진단 - 커스텀 엔진
 * 연애.zip
 */
(function () {
  const config = window.ZODIAC_CONFIG;
  const signs = window.ZODIAC_SIGNS;
  const elementCompat = window.ELEMENT_COMPAT;
  const soloData = window.ZODIAC_SOLO;
  const compatData = window.COMPAT_DATA;
  const app = document.getElementById('app');

  let mySign = -1;
  let partnerSign = -1; // -1 = not selected, 0-11 = sign, 12 = solo
  let currentStep = 1; // 1 = my sign, 2 = partner sign

  /* ========== Helpers ========== */
  function formatCount(num) {
    if (num >= 10000) return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
    return num.toString();
  }

  function getStoredCount() {
    const key = `participants_${config.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const data = JSON.parse(stored);
      const days = Math.floor((Date.now() - data.timestamp) / 86400000);
      if (days > 0) {
        data.count += Math.floor(Math.random() * 50 + 20) * days;
        data.timestamp = Date.now();
        localStorage.setItem(key, JSON.stringify(data));
      }
      return data.count;
    }
    const count = config.participants + Math.floor(Math.random() * 200 - 100);
    localStorage.setItem(key, JSON.stringify({ count, timestamp: Date.now() }));
    return count;
  }

  function incrementCount() {
    const key = `participants_${config.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const data = JSON.parse(stored);
      data.count++;
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ========== Compatibility Calculation ========== */
  function getCompatScore(sign1, sign2) {
    const el1 = signs[sign1].element;
    const el2 = signs[sign2].element;
    const key = el1 + '-' + el2;
    const type = elementCompat[key];

    // Base score from element compatibility
    let base;
    if (type === 'same') base = 85;
    else if (type === 'good') base = 75;
    else base = 52;

    // Add deterministic variation from sign pair
    const variation = ((sign1 * 7 + sign2 * 13) % 15) - 7;
    return Math.max(30, Math.min(98, base + variation));
  }

  function getCompatType(sign1, sign2) {
    const el1 = signs[sign1].element;
    const el2 = signs[sign2].element;
    if (el1 === el2) return 'same';
    const key = el1 + '-' + el2;
    return elementCompat[key];
  }

  function getCompatDetails(sign1, sign2) {
    const el1 = signs[sign1].element;
    const el2 = signs[sign2].element;
    const type = getCompatType(sign1, sign2);

    if (type === 'same') {
      return compatData.same[el1];
    } else if (type === 'good') {
      // Try both orderings
      const key1 = el1 + '-' + el2;
      const key2 = el2 + '-' + el1;
      return compatData.good[key1] || compatData.good[key2];
    } else {
      const key1 = el1 + '-' + el2;
      const key2 = el2 + '-' + el1;
      return compatData.challenge[key1] || compatData.challenge[key2];
    }
  }

  /* ========== Start Screen ========== */
  function renderStart() {
    const count = getStoredCount();
    app.innerHTML = `
      <div class="test-screen start-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>
        <h1 class="start-title">${config.title}</h1>
        <p class="start-subtitle">${config.subtitle}</p>
        <div class="start-meta">
          <span>${formatCount(count)}명 참여</span>
          <span>${config.duration}</span>
        </div>
        <button class="btn-start" id="btn-start">시작하기</button>
      </div>
    `;
    document.getElementById('btn-start').addEventListener('click', () => {
      incrementCount();
      currentStep = 1;
      mySign = -1;
      partnerSign = -1;
      renderMySign();
    });
  }

  /* ========== My Sign Selection ========== */
  function renderMySign() {
    const gridHTML = signs.map(s => `
      <div class="zodiac-card" data-id="${s.id}">
        <span class="zodiac-symbol">${s.symbol || ''}</span>
        <span class="zodiac-name">${s.name}</span>
        <span class="zodiac-date">${s.dates}</span>
      </div>
    `).join('');

    app.innerHTML = `
      <div class="test-screen select-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <div class="step-bar">
          <div class="step-dot active"></div>
          <div class="step-dot"></div>
        </div>

        <h2 class="select-title">내 별자리를 선택해주세요</h2>
        <p class="select-subtitle">생일에 해당하는 별자리를 골라주세요</p>

        <div class="zodiac-grid" id="zodiac-grid">
          ${gridHTML}
        </div>
      </div>
    `;

    document.querySelectorAll('.zodiac-card').forEach(card => {
      card.addEventListener('click', () => {
        mySign = parseInt(card.dataset.id);
        currentStep = 2;
        renderPartnerSign();
      });
    });
  }

  /* ========== Partner Sign Selection ========== */
  function renderPartnerSign() {
    const gridHTML = signs.map(s => `
      <div class="zodiac-card" data-id="${s.id}">
        <span class="zodiac-symbol">${s.symbol || ''}</span>
        <span class="zodiac-name">${s.name}</span>
        <span class="zodiac-date">${s.dates}</span>
      </div>
    `).join('');

    app.innerHTML = `
      <div class="test-screen select-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <div class="step-bar">
          <div class="step-dot active"></div>
          <div class="step-dot active"></div>
        </div>

        <h2 class="select-title">상대방의 별자리를 선택해주세요</h2>
        <p class="select-subtitle">짝사랑, 썸, 연인 모두 OK!</p>

        <div class="zodiac-grid" id="zodiac-grid">
          ${gridHTML}
        </div>

        <button class="solo-btn" id="btn-solo">나는 솔로 - 연애운만 볼래요</button>
      </div>
    `;

    document.querySelectorAll('.zodiac-card').forEach(card => {
      card.addEventListener('click', () => {
        partnerSign = parseInt(card.dataset.id);
        renderLoading();
      });
    });

    document.getElementById('btn-solo').addEventListener('click', () => {
      partnerSign = 12; // solo
      renderLoading();
    });
  }

  /* ========== Loading Screen ========== */
  function renderLoading() {
    const msgs = config.loadingMessages;

    app.innerHTML = `
      <div class="test-screen loading-screen">
        <div class="loading-spinner"></div>
        <p class="loading-text">${msgs[0]}</p>
        <div class="loading-bar-container"><div class="loading-bar-fill" id="lb"></div></div>
      </div>
    `;

    const bar = document.getElementById('lb');
    const txt = document.querySelector('.loading-text');
    let mi = 0;
    const iv = setInterval(() => {
      mi++;
      if (mi < msgs.length) {
        txt.textContent = msgs[mi];
      }
    }, 900);

    requestAnimationFrame(() => (bar.style.width = '100%'));

    setTimeout(() => {
      clearInterval(iv);
      if (partnerSign === 12) {
        renderSoloResult();
      } else {
        renderCoupleResult();
      }
    }, 2800);
  }

  /* ========== Solo Result ========== */
  function renderSoloResult() {
    const s = signs[mySign];
    const solo = soloData[mySign];

    const topSignsHTML = solo.topSigns.map((signIdx, rank) => {
      const ts = signs[signIdx];
      return `
        <div class="top-sign-card">
          <span class="top-sign-rank">${rank + 1}위</span>
          <span class="top-sign-name-accent">${ts.name}</span>
          <span class="top-sign-name">${ts.name}</span>
        </div>
      `;
    }).join('');

    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const maxScore = Math.max(...solo.monthlyScores);
    const monthlyHTML = solo.monthlyScores.map((score, i) => {
      const heightPct = Math.max(8, (score / 100) * 100);
      let cls = 'low';
      if (score >= 85) cls = 'high';
      else if (score >= 70) cls = 'medium';
      return `
        <div class="month-col">
          <div class="month-bar ${cls}" data-height="${heightPct}" style="height: 0%"></div>
          <span class="month-label">${monthNames[i]}</span>
        </div>
      `;
    }).join('');

    const tipsHTML = solo.tips.map((t, i) => `
      <li><span class="tip-num">${i + 1}</span>${t}</li>
    `).join('');

    const dashOffset = 314 - (314 * solo.loveScore / 100);

    app.innerHTML = `
      <div class="test-screen result-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <div class="result-card" id="result-card">
          <div class="result-card-inner">
            <h2 class="result-name">${s.name} 연애운</h2>
            <div class="love-score-wrap">
              <div class="love-score-circle">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color: var(--accent-pink)" />
                      <stop offset="100%" style="stop-color: var(--accent-purple)" />
                    </linearGradient>
                  </defs>
                  <circle class="track" cx="60" cy="60" r="50" />
                  <circle class="fill" cx="60" cy="60" r="50" data-offset="${dashOffset}" />
                </svg>
                <span class="love-score-number">${solo.loveScore}</span>
              </div>
              <p class="love-score-text">올해 연애운 점수</p>
            </div>
            <div class="result-footer">연애.zip | 별자리 연애운</div>
          </div>
        </div>

        <div class="result-detail">
          <div class="detail-section">
            <h3>월별 연애운</h3>
            <div class="monthly-chart">${monthlyHTML}</div>
          </div>

          <div class="detail-section">
            <h3>나에게 끌리는 별자리 TOP 3</h3>
            <div class="top-signs">${topSignsHTML}</div>
          </div>

          <div class="detail-section">
            <h3>올해 만날 인연의 특징</h3>
            <div class="destiny-box">
              <p class="destiny-text">${solo.destinyTraits}</p>
            </div>
          </div>

          <div class="detail-section">
            <h3>연애운을 올리는 행동</h3>
            <ul class="tips-list">${tipsHTML}</ul>
          </div>
        </div>

        <div class="share-buttons">
          <button class="share-btn" id="btn-share">공유</button>
          <button class="share-btn" id="btn-download">저장</button>
          <button class="share-btn" id="btn-copy">링크</button>
        </div>

        <a href="/" class="btn-home">다른 테스트 해보기</a>
        <button class="btn-retry" id="btn-retry">다시 하기</button>
      </div>
    `;

    animateResults();
    bindResultButtons(s.name + ' 연애운');
  }

  /* ========== Couple Result ========== */
  function renderCoupleResult() {
    const s1 = signs[mySign];
    const s2 = signs[partnerSign];
    const score = getCompatScore(mySign, partnerSign);
    const details = getCompatDetails(mySign, partnerSign);

    const heartFillPct = 100 - score;

    const goodHTML = details.goodPoints.map(p => `<li>${p}</li>`).join('');
    const badHTML = details.badPoints.map(p => `<li>${p}</li>`).join('');

    app.innerHTML = `
      <div class="test-screen result-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <div class="result-card" id="result-card">
          <div class="result-card-inner">
            <div class="compat-pair">
              <div class="compat-sign">
                <span class="compat-sign-label">${s1.name}</span>
                <span class="compat-sign-name">${s1.name}</span>
              </div>
              <span class="compat-x">&times;</span>
              <div class="compat-sign">
                <span class="compat-sign-label">${s2.name}</span>
                <span class="compat-sign-name">${s2.name}</span>
              </div>
            </div>
            <div class="compat-heart-wrap">
              <div class="compat-heart-bg">&hearts;</div>
              <div class="compat-heart-fill" data-fill="${heartFillPct}">&hearts;</div>
            </div>
            <span class="compat-score-num">${score}점</span>
            <span class="compat-score-label">궁합 점수</span>
            <p class="compat-summary">${details.summary}</p>
            <div class="result-footer">연애.zip | 별자리 궁합</div>
          </div>
        </div>

        <div class="result-detail">
          <div class="detail-section">
            <h3>상성 분석</h3>
            <div class="points-grid">
              <div class="points-col good">
                <h4>잘 맞는 점</h4>
                <ul>${goodHTML}</ul>
              </div>
              <div class="points-col bad">
                <h4>부딪히는 점</h4>
                <ul>${badHTML}</ul>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3>이 조합의 연애 패턴</h3>
            <div class="scenario-box">${details.scenario}</div>
          </div>

          <div class="detail-section">
            <h3>이 궁합을 최고로 만드는 방법</h3>
            <div class="destiny-box">
              <p class="destiny-text">${details.tip}</p>
            </div>
          </div>
        </div>

        <div class="share-buttons">
          <button class="share-btn" id="btn-share">공유</button>
          <button class="share-btn" id="btn-download">저장</button>
          <button class="share-btn" id="btn-copy">링크</button>
        </div>

        <a href="/" class="btn-home">다른 테스트 해보기</a>
        <button class="btn-retry" id="btn-retry">다시 하기</button>
      </div>
    `;

    animateResults();
    bindResultButtons(`${s1.name} x ${s2.name} 궁합`);
  }

  /* ========== Animations ========== */
  function animateResults() {
    setTimeout(() => {
      // Monthly bars
      document.querySelectorAll('.month-bar').forEach(bar => {
        bar.style.height = bar.dataset.height + '%';
      });

      // Score circle
      const circleFill = document.querySelector('.fill');
      if (circleFill) {
        circleFill.style.strokeDashoffset = circleFill.dataset.offset;
      }

      // Heart fill animation
      const heartFill = document.querySelector('.compat-heart-fill');
      if (heartFill) {
        const fillPct = heartFill.dataset.fill;
        heartFill.style.clipPath = `inset(${fillPct}% 0 0 0)`;
      }
    }, 200);
  }

  /* ========== Result Button Bindings ========== */
  function bindResultButtons(resultName) {
    document.getElementById('btn-share').addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: config.title + ' - 연애.zip',
            text: `나의 결과: ${resultName}`,
            url: location.href
          });
        } catch (e) { /* cancelled */ }
      } else {
        copyToClip();
      }
    });

    document.getElementById('btn-download').addEventListener('click', async () => {
      const card = document.getElementById('result-card');
      if (typeof html2canvas !== 'undefined') {
        const canvas = await html2canvas(card, { scale: 2, useCORS: true, backgroundColor: null });
        const a = document.createElement('a');
        a.download = config.id + '-result.png';
        a.href = canvas.toDataURL();
        a.click();
      }
    });

    document.getElementById('btn-copy').addEventListener('click', copyToClip);

    document.getElementById('btn-retry').addEventListener('click', () => {
      mySign = -1;
      partnerSign = -1;
      currentStep = 1;
      renderStart();
      window.scrollTo(0, 0);
    });
  }

  function copyToClip() {
    navigator.clipboard.writeText(location.href).then(() => showToast('링크가 복사되었어요!'));
  }

  /* ========== Boot ========== */
  document.addEventListener('DOMContentLoaded', renderStart);
})();
