/**
 * 연애.zip 공용 테스트 엔진
 * data.js에서 TEST_CONFIG, QUESTIONS, RESULTS를 읽어 퀴즈 플로우를 렌더링
 */
(function () {
  const config = window.TEST_CONFIG;
  const questions = window.QUESTIONS;
  const allResults = window.RESULTS;
  const app = document.getElementById('app');

  let currentQ = 0;
  let scores = {};

  /* ========== Init ========== */
  function init() {
    for (const q of questions) {
      for (const opt of q.options) {
        for (const key of Object.keys(opt.scores)) {
          scores[key] = scores[key] || 0;
        }
      }
    }
    renderStart();
  }

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
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, 2000);
  }

  /* ========== Start Screen ========== */
  function renderStart() {
    const count = getStoredCount();
    app.innerHTML = `
      <div class="test-screen start-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>
        <div class="start-emoji">${config.emoji}</div>
        <h1 class="start-title">${config.title}</h1>
        <p class="start-subtitle">${config.subtitle}</p>
        <div class="start-meta">
          <span>${formatCount(count)}명 참여</span>
          <span>${config.duration || '2분'}</span>
        </div>
        <button class="btn-start" id="btn-start">시작하기</button>
      </div>
    `;
    document.getElementById('btn-start').addEventListener('click', () => {
      incrementCount();
      currentQ = 0;
      renderQuestion();
    });
  }

  /* ========== Question Screen ========== */
  function renderQuestion() {
    const q = questions[currentQ];
    const pct = (currentQ / questions.length) * 100;

    app.innerHTML = `
      <div class="test-screen question-screen">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="question-count">${currentQ + 1} / ${questions.length}</div>
        <h2 class="question-text">${q.question}</h2>
        <div class="options-container">
          ${q.options.map((o, i) => `<button class="option-btn" data-idx="${i}">${o.text}</button>`).join('')}
        </div>
      </div>
    `;

    setTimeout(() => {
      document.querySelectorAll('.option-btn').forEach((btn, i) => {
        setTimeout(() => btn.classList.add('visible'), i * 80);
        btn.addEventListener('click', () => selectOption(i));
      });
    }, 50);
  }

  function selectOption(idx) {
    const q = questions[currentQ];
    const opt = q.options[idx];

    for (const [k, v] of Object.entries(opt.scores)) {
      scores[k] = (scores[k] || 0) + v;
    }

    const btn = document.querySelector(`[data-idx="${idx}"]`);
    btn.classList.add('selected');
    document.querySelectorAll('.option-btn').forEach(b => (b.style.pointerEvents = 'none'));

    setTimeout(() => {
      currentQ++;
      if (currentQ < questions.length) {
        renderQuestion();
      } else {
        renderLoading();
      }
    }, 350);
  }

  /* ========== Loading Screen ========== */
  function renderLoading() {
    const msgs = config.loadingMessages || [
      '답변을 분석하고 있어요...',
      '성격 유형을 파악하는 중...',
      '거의 다 됐어요!',
    ];

    app.innerHTML = `
      <div class="test-screen loading-screen">
        <div class="loading-emoji">${config.emoji}</div>
        <p class="loading-text">${msgs[0]}</p>
        <div class="loading-bar-container"><div class="loading-bar-fill" id="lb"></div></div>
      </div>
    `;

    const bar = document.getElementById('lb');
    const txt = document.querySelector('.loading-text');
    let mi = 0;
    const iv = setInterval(() => {
      mi = (mi + 1) % msgs.length;
      txt.textContent = msgs[mi];
    }, 750);

    requestAnimationFrame(() => (bar.style.width = '100%'));

    setTimeout(() => {
      clearInterval(iv);
      showResult();
    }, 2200);
  }

  /* ========== Result ========== */
  function showResult() {
    let result;

    if (typeof window.getResult === 'function') {
      result = window.getResult(scores);
    } else {
      let maxKey = null;
      let maxVal = -Infinity;
      for (const [k, v] of Object.entries(scores)) {
        if (v > maxVal) { maxVal = v; maxKey = k; }
      }
      result = { key: maxKey, ...allResults[maxKey] };
    }

    renderResult(result);
  }

  function renderResult(r) {
    const strengthsHTML = r.strengths
      ? `<div class="detail-section"><h3>이런 점이 매력적이에요</h3><ul>${r.strengths.map(s => `<li>${s}</li>`).join('')}</ul></div>`
      : '';

    const weaknessesHTML = r.weaknesses
      ? `<div class="detail-section"><h3>주의할 점</h3><ul>${r.weaknesses.map(w => `<li>${w}</li>`).join('')}</ul></div>`
      : '';

    const compatHTML = r.good
      ? `<div class="detail-section compatibility-section">
           <div class="compat-item good"><span class="compat-label">찰떡궁합</span><span class="compat-value">${r.good}</span></div>
           <div class="compat-item bad"><span class="compat-label">환장콤비</span><span class="compat-value">${r.bad}</span></div>
         </div>`
      : '';

    app.innerHTML = `
      <div class="test-screen result-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <div class="result-card" id="result-card">
          <div class="result-card-inner">
            <div class="result-emoji">${r.emoji}</div>
            <h2 class="result-name">${r.name}</h2>
            <p class="result-desc">${r.description}</p>
            <div class="result-tags">${r.traits.map(t => `<span class="result-tag">#${t}</span>`).join('')}</div>
            <div class="result-footer">연애.zip</div>
          </div>
        </div>

        <div class="result-detail">
          <div class="detail-section"><h3>상세 분석</h3><p>${r.detail}</p></div>
          ${strengthsHTML}
          ${weaknessesHTML}
          ${compatHTML}
        </div>

        <div class="share-buttons">
          <button class="share-btn" id="btn-share">📤 공유</button>
          <button class="share-btn" id="btn-download">📷 저장</button>
          <button class="share-btn" id="btn-copy">🔗 링크</button>
        </div>

        <a href="/" class="btn-home">다른 테스트 해보기</a>
        <button class="btn-retry" id="btn-retry">다시 하기</button>
      </div>
    `;

    document.getElementById('btn-share').addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: config.title + ' - 연애.zip', text: `나의 결과: ${r.name}`, url: location.href });
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
      currentQ = 0;
      for (const k of Object.keys(scores)) scores[k] = 0;
      renderStart();
      window.scrollTo(0, 0);
    });
  }

  function copyToClip() {
    navigator.clipboard.writeText(location.href).then(() => showToast('링크가 복사되었어요!'));
  }

  /* ========== Boot ========== */
  document.addEventListener('DOMContentLoaded', init);
})();
