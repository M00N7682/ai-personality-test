/**
 * 사주로 직업 봐주기 - 커스텀 엔진
 * 연애.zip
 */
(function () {
  const config = window.SAJU_CONFIG;
  const sijuOptions = window.SIJU_OPTIONS;
  const results = window.SAJU_RESULTS;
  const app = document.getElementById('app');

  let selectedYear = null;
  let selectedMonth = null;
  let selectedDay = null;
  let selectedTime = -1; // -1 = not selected, 0-11 = siju index, 12 = unknown
  let selectedGender = -1; // 0 = male, 1 = female

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

  /* ========== Calculation ========== */
  function calculateResult() {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const day = parseInt(selectedDay);
    const timeIdx = selectedTime === 12 ? 6 : selectedTime; // unknown defaults to 6 (午)
    const genderIdx = selectedGender;

    const hash = (year + month * 3 + day * 7 + timeIdx * 11 + genderIdx * 5) % results.length;
    return results[Math.abs(hash)];
  }

  function calculateElements(result) {
    // Use the pre-defined elements from the result data
    return {
      wood: result.elements[0],
      fire: result.elements[1],
      earth: result.elements[2],
      metal: result.elements[3],
      water: result.elements[4]
    };
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
      renderInput();
    });
  }

  /* ========== Input Screen ========== */
  function renderInput() {
    // Generate year options 1990-2010
    let yearOpts = '<option value="" disabled selected>년도</option>';
    for (let y = 2010; y >= 1990; y--) {
      yearOpts += `<option value="${y}">${y}년</option>`;
    }

    let monthOpts = '<option value="" disabled selected>월</option>';
    for (let m = 1; m <= 12; m++) {
      monthOpts += `<option value="${m}">${m}월</option>`;
    }

    let dayOpts = '<option value="" disabled selected>일</option>';
    for (let d = 1; d <= 31; d++) {
      dayOpts += `<option value="${d}">${d}일</option>`;
    }

    const sijuHTML = sijuOptions.map(s =>
      `<button class="siju-btn" data-idx="${s.index}">
        <span class="siju-hanja">${s.hanja}</span>
        <span class="siju-time">${s.time}</span>
      </button>`
    ).join('');

    app.innerHTML = `
      <div class="test-screen input-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <h2 class="input-title">생년월일을 알려주세요</h2>
        <p class="input-subtitle">사주팔자를 분석할게요</p>

        <div class="input-group">
          <span class="input-label">생년월일</span>
          <div class="date-selects">
            <select id="sel-year" class="placeholder">${yearOpts}</select>
            <select id="sel-month" class="placeholder">${monthOpts}</select>
            <select id="sel-day" class="placeholder">${dayOpts}</select>
          </div>
        </div>

        <div class="input-group">
          <div class="siju-label">
            <span class="input-label">태어난 시간</span>
            <button class="siju-unknown-btn" id="btn-unknown">모름</button>
          </div>
          <div class="siju-grid" id="siju-grid">
            ${sijuHTML}
          </div>
        </div>

        <div class="input-group">
          <span class="input-label">성별</span>
          <div class="gender-btns">
            <button class="gender-btn" data-gender="0">남자</button>
            <button class="gender-btn" data-gender="1">여자</button>
          </div>
        </div>

        <button class="btn-analyze" id="btn-analyze">사주 분석하기</button>
      </div>
    `;

    // Date select handlers
    const selYear = document.getElementById('sel-year');
    const selMonth = document.getElementById('sel-month');
    const selDay = document.getElementById('sel-day');

    [selYear, selMonth, selDay].forEach(sel => {
      sel.addEventListener('change', () => {
        sel.classList.remove('placeholder');
      });
    });

    selYear.addEventListener('change', () => { selectedYear = selYear.value; checkReady(); });
    selMonth.addEventListener('change', () => { selectedMonth = selMonth.value; checkReady(); });
    selDay.addEventListener('change', () => { selectedDay = selDay.value; checkReady(); });

    // Siju handlers
    document.querySelectorAll('.siju-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.siju-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('btn-unknown').classList.remove('active');
        btn.classList.add('selected');
        selectedTime = parseInt(btn.dataset.idx);
        checkReady();
      });
    });

    document.getElementById('btn-unknown').addEventListener('click', () => {
      document.querySelectorAll('.siju-btn').forEach(b => b.classList.remove('selected'));
      const unknownBtn = document.getElementById('btn-unknown');
      unknownBtn.classList.add('active');
      selectedTime = 12;
      checkReady();
    });

    // Gender handlers
    document.querySelectorAll('.gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedGender = parseInt(btn.dataset.gender);
        checkReady();
      });
    });

    // Analyze button
    document.getElementById('btn-analyze').addEventListener('click', () => {
      renderLoading();
    });
  }

  function checkReady() {
    const btn = document.getElementById('btn-analyze');
    if (selectedYear && selectedMonth && selectedDay && selectedTime >= 0 && selectedGender >= 0) {
      btn.classList.add('ready');
    } else {
      btn.classList.remove('ready');
    }
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
      renderResult();
    }, 2800);
  }

  /* ========== Result Screen ========== */
  function renderResult() {
    const r = calculateResult();
    const elements = calculateElements(r);

    const ohengData = [
      { name: '목(木)', cls: 'wood', value: elements.wood },
      { name: '화(火)', cls: 'fire', value: elements.fire },
      { name: '토(土)', cls: 'earth', value: elements.earth },
      { name: '금(金)', cls: 'metal', value: elements.metal },
      { name: '수(水)', cls: 'water', value: elements.water }
    ];

    const ohengHTML = ohengData.map(o => `
      <div class="oheng-row">
        <span class="oheng-label">${o.name}</span>
        <div class="oheng-bar-bg">
          <div class="oheng-bar-fill ${o.cls}" data-value="${o.value}"></div>
        </div>
        <span class="oheng-value">${o.value}%</span>
      </div>
    `).join('');

    const jobsHTML = r.jobs.map((j, i) => `
      <li><span class="job-rank">${i + 1}순위</span>${j}</li>
    `).join('');

    const avoidHTML = r.avoidJobs.map(j => `<span class="avoid-tag">${j}</span>`).join('');

    const keywordsHTML = r.keywords.map(k => `<span class="result-tag">#${k}</span>`).join('');

    app.innerHTML = `
      <div class="test-screen result-screen">
        <a href="/" class="back-home">
          <span class="bh-accent">연애</span><span class="bh-zip">.zip</span>
        </a>

        <div class="result-card" id="result-card">
          <div class="result-card-inner">
            <h2 class="result-name">${r.name}</h2>
            <p class="result-desc">${r.description}</p>
            <div class="result-tags">${keywordsHTML}</div>
            <div class="result-footer">연애.zip | 사주 직업 분석</div>
          </div>
        </div>

        <div class="result-detail">
          <div class="detail-section">
            <h3>오행 분석</h3>
            <div class="oheng-chart">${ohengHTML}</div>
          </div>

          <div class="detail-section">
            <h3>타고난 기질</h3>
            <div class="result-tags" style="justify-content:flex-start">${keywordsHTML}</div>
          </div>

          <div class="detail-section">
            <h3>어울리는 직업 TOP 5</h3>
            <ul class="jobs-list">${jobsHTML}</ul>
          </div>

          <div class="detail-section">
            <h3>피해야 할 직업 유형</h3>
            <div class="avoid-jobs">${avoidHTML}</div>
          </div>

          <div class="detail-section">
            <h3>올해의 직업운</h3>
            <div class="forecast-box">
              <p class="forecast-year">2026년</p>
              <p class="forecast-text">${r.yearForecast}</p>
            </div>
          </div>

          <div class="detail-section">
            <h3>같은 사주 유명인</h3>
            <div class="celebrity-box">
              <span class="celebrity-icon">★</span>
              <div class="celebrity-info">
                <span class="celebrity-name">${r.celebrity}</span>
                <span class="celebrity-desc">${r.celebrityDesc}</span>
              </div>
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

    // Animate oheng bars
    setTimeout(() => {
      document.querySelectorAll('.oheng-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.value + '%';
      });
    }, 100);

    // Share handlers
    document.getElementById('btn-share').addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: config.title + ' - 연애.zip',
            text: `나의 사주 직업 유형: ${r.name}`,
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
      selectedYear = null;
      selectedMonth = null;
      selectedDay = null;
      selectedTime = -1;
      selectedGender = -1;
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
