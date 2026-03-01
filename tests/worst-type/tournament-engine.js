/**
 * 최악의 연애 유형 토너먼트 엔진
 * 연애.zip - Custom tournament bracket engine
 */
(function () {
  const config = window.TOURNAMENT_CONFIG;
  const candidates = window.CANDIDATES;
  const initialMatchups = window.INITIAL_MATCHUPS;
  const allResults = window.RESULTS;
  const app = document.getElementById('app');

  /* ========== Tournament State ========== */
  let rounds = [];        // array of round arrays, each containing matchups
  let currentRound = 0;   // 0 = 16강, 1 = 8강, 2 = 4강, 3 = 결승
  let currentMatch = 0;   // which match within the round
  let winners = [];        // winners advancing to next round
  let journey = [];        // tracks the finalist's path
  let totalMatches = 0;    // total matches across all rounds
  let completedMatches = 0;

  const ROUND_NAMES = ['16강', '8강', '4강', '결승'];
  const ROUND_MATCH_COUNTS = [8, 4, 2, 1]; // matches per round

  /* ========== Init ========== */
  function init() {
    renderStart();
  }

  /* ========== Helpers ========== */
  function formatCount(num) {
    if (num >= 10000) return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
    return num.toString();
  }

  function getStoredCount() {
    const key = 'participants_' + config.id;
    var stored = localStorage.getItem(key);
    if (stored) {
      var data = JSON.parse(stored);
      var days = Math.floor((Date.now() - data.timestamp) / 86400000);
      if (days > 0) {
        data.count += Math.floor(Math.random() * 50 + 20) * days;
        data.timestamp = Date.now();
        localStorage.setItem(key, JSON.stringify(data));
      }
      return data.count;
    }
    var count = config.participants + Math.floor(Math.random() * 200 - 100);
    localStorage.setItem(key, JSON.stringify({ count: count, timestamp: Date.now() }));
    return count;
  }

  function incrementCount() {
    var key = 'participants_' + config.id;
    var stored = localStorage.getItem(key);
    if (stored) {
      var data = JSON.parse(stored);
      data.count++;
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 300);
    }, 2000);
  }

  /* ========== Start Screen ========== */
  function renderStart() {
    var count = getStoredCount();
    app.innerHTML =
      '<div class="test-screen start-screen">' +
        '<a href="/" class="back-home">' +
          '<span class="bh-accent">\uC5F0\uC560</span><span class="bh-zip">.zip</span>' +
        '</a>' +
        '<h1 class="start-title">' + config.title + '</h1>' +
        '<p class="start-subtitle">' + config.subtitle + '</p>' +
        '<div class="start-meta">' +
          '<span>' + formatCount(count) + '\uBA85 \uCC38\uC5EC</span>' +
          '<span>' + (config.duration || '2\uBD84') + '</span>' +
        '</div>' +
        '<button class="btn-start" id="btn-start">\uC2DC\uC791\uD558\uAE30</button>' +
      '</div>';

    document.getElementById('btn-start').addEventListener('click', function () {
      incrementCount();
      startTournament();
    });
  }

  /* ========== Tournament Setup ========== */
  function startTournament() {
    // Reset state
    currentRound = 0;
    currentMatch = 0;
    winners = [];
    journey = [];
    completedMatches = 0;
    totalMatches = ROUND_MATCH_COUNTS.reduce(function (a, b) { return a + b; }, 0); // 15

    // Build first round from initial matchups
    rounds = [];
    var firstRound = [];
    for (var i = 0; i < initialMatchups.length; i++) {
      firstRound.push({
        a: candidates[initialMatchups[i][0]],
        b: candidates[initialMatchups[i][1]]
      });
    }
    rounds.push(firstRound);

    renderMatch();
  }

  /* ========== Bracket Progress ========== */
  function buildBracketDots() {
    var html = '<div class="bracket-progress">';
    for (var r = 0; r < ROUND_MATCH_COUNTS.length; r++) {
      if (r > 0) html += '<div class="bracket-separator"></div>';
      for (var m = 0; m < ROUND_MATCH_COUNTS[r]; m++) {
        var cls = 'bracket-dot';
        if (r < currentRound || (r === currentRound && m < currentMatch)) {
          cls += ' done';
        } else if (r === currentRound && m === currentMatch) {
          cls += ' current';
        }
        html += '<div class="' + cls + '"></div>';
      }
    }
    html += '</div>';
    return html;
  }

  /* ========== Match Screen ========== */
  function renderMatch() {
    var round = rounds[currentRound];
    var match = round[currentMatch];
    var roundName = ROUND_NAMES[currentRound];
    var matchNum = currentMatch + 1;
    var matchTotal = round.length;
    var pct = (completedMatches / totalMatches) * 100;

    app.innerHTML =
      '<div class="test-screen tournament-screen">' +
        '<a href="/" class="back-home">' +
          '<span class="bh-accent">\uC5F0\uC560</span><span class="bh-zip">.zip</span>' +
        '</a>' +
        '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
        buildBracketDots() +
        '<div class="round-header">' +
          '<div class="round-badge">' +
            roundName +
          '</div>' +
          '<div class="round-counter">' + matchNum + ' / ' + matchTotal + '</div>' +
        '</div>' +
        '<p class="vs-prompt">\uC774 \uC911 \uB354 \uC2EB\uC740 \uAC74?</p>' +
        '<div class="vs-container">' +
          '<div class="vs-card" data-pick="a" id="card-a">' +
            '<div class="vs-card-label">' + match.a.label + '</div>' +
            '<div class="vs-card-desc">' + match.a.desc + '</div>' +
          '</div>' +
          '<div class="vs-divider">VS</div>' +
          '<div class="vs-card" data-pick="b" id="card-b">' +
            '<div class="vs-card-label">' + match.b.label + '</div>' +
            '<div class="vs-card-desc">' + match.b.desc + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Animate cards in
    setTimeout(function () {
      var cardA = document.getElementById('card-a');
      var cardB = document.getElementById('card-b');
      if (cardA) cardA.classList.add('visible');
      setTimeout(function () {
        if (cardB) cardB.classList.add('visible');
      }, 120);
    }, 50);

    // Attach click handlers
    var cards = document.querySelectorAll('.vs-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        handlePick(card.dataset.pick);
      });
    });
  }

  /* ========== Handle Pick ========== */
  function handlePick(pick) {
    var round = rounds[currentRound];
    var match = round[currentMatch];
    var winner = pick === 'a' ? match.a : match.b;
    var loser = pick === 'a' ? match.b : match.a;

    // Animate selection
    var selectedCard = document.getElementById('card-' + pick);
    var otherCard = document.getElementById('card-' + (pick === 'a' ? 'b' : 'a'));
    if (selectedCard) selectedCard.classList.add('selected');
    if (otherCard) otherCard.classList.add('eliminated');

    // Disable further clicks
    document.querySelectorAll('.vs-card').forEach(function (c) {
      c.style.pointerEvents = 'none';
    });

    // Store winner
    winners.push(winner);
    completedMatches++;

    // Track journey
    journey.push({
      round: ROUND_NAMES[currentRound],
      winner: winner.label,
      loser: loser.label
    });

    setTimeout(function () {
      currentMatch++;
      if (currentMatch >= round.length) {
        // Round complete - advance
        if (currentRound >= 3) {
          // Tournament complete - winner is the WORST type
          renderLoading(winner);
          return;
        }

        // Build next round from winners
        var nextRound = [];
        for (var i = 0; i < winners.length; i += 2) {
          nextRound.push({ a: winners[i], b: winners[i + 1] });
        }
        rounds.push(nextRound);
        winners = [];
        currentRound++;
        currentMatch = 0;

        // Show round transition
        renderRoundTransition(function () {
          renderMatch();
        });
      } else {
        renderMatch();
      }
    }, 450);
  }

  /* ========== Round Transition ========== */
  function renderRoundTransition(callback) {
    var roundName = ROUND_NAMES[currentRound];
    var matchCount = ROUND_MATCH_COUNTS[currentRound];

    app.innerHTML =
      '<div class="test-screen loading-screen">' +
        '<p class="loading-text" style="font-size:22px; font-weight:800;">' + roundName + ' \uC9C4\uCD9C!</p>' +
        '<p class="loading-text" style="font-size:14px; margin-top:-12px;">' + matchCount + '\uAC1C\uC758 \uB300\uACB0\uC774 \uB0A8\uC558\uC5B4\uC694</p>' +
      '</div>';

    setTimeout(callback, 1200);
  }

  /* ========== Loading Screen ========== */
  function renderLoading(finalist) {
    var msgs = config.loadingMessages || [
      '\uD1A0\uB108\uBA3C\uD2B8 \uACB0\uACFC\uB97C \uC9D1\uACC4\uD558\uB294 \uC911...',
      '\uB108\uC758 \uC9C0\uB8B0\uB97C \uBD84\uC11D\uD558\uACE0 \uC788\uC5B4...',
      '\uCD5C\uC545\uC758 \uC720\uD615\uC744 \uD655\uC815\uD558\uB294 \uC911...',
      '\uAC70\uC758 \uB2E4 \uB410\uC5B4!'
    ];

    app.innerHTML =
      '<div class="test-screen loading-screen">' +
        '<div class="loading-spinner"></div>' +
        '<p class="loading-text">' + msgs[0] + '</p>' +
        '<div class="loading-bar-container"><div class="loading-bar-fill" id="lb"></div></div>' +
      '</div>';

    var bar = document.getElementById('lb');
    var txt = document.querySelector('.loading-text');
    var mi = 0;
    var iv = setInterval(function () {
      mi = (mi + 1) % msgs.length;
      if (txt) txt.textContent = msgs[mi];
    }, 650);

    requestAnimationFrame(function () {
      if (bar) bar.style.width = '100%';
    });

    setTimeout(function () {
      clearInterval(iv);
      showResult(finalist);
    }, 2500);
  }

  /* ========== Result ========== */
  function showResult(finalist) {
    var r = allResults[finalist.id];
    if (!r) {
      // Fallback
      r = {
        name: finalist.label,
        emoji: '\uD83D\uDCA3',
        description: '\uC774 \uC720\uD615\uC774 \uB2F9\uC2E0\uC758 \uCD5C\uC545\uC758 \uC5F0\uC560 \uC720\uD615\uC785\uB2C8\uB2E4!',
        detail: '',
        traits: [],
        strengths: [],
        weaknesses: [],
        good: '',
        bad: ''
      };
    }

    renderResult(r, finalist);
  }

  function renderResult(r, finalist) {
    // Build strengths
    var strengthsHTML = '';
    if (r.strengths && r.strengths.length) {
      strengthsHTML =
        '<div class="detail-section">' +
          '<h3>\uB2F9\uC2E0\uC758 \uC5F0\uC560 \uAC15\uC810</h3>' +
          '<ul>' + r.strengths.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
        '</div>';
    }

    // Build weaknesses
    var weaknessesHTML = '';
    if (r.weaknesses && r.weaknesses.length) {
      weaknessesHTML =
        '<div class="detail-section">' +
          '<h3>\uC774\uAC74 \uC870\uC2EC!</h3>' +
          '<ul>' + r.weaknesses.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul>' +
        '</div>';
    }

    // Compatibility
    var compatHTML = '';
    if (r.good || r.bad) {
      compatHTML =
        '<div class="detail-section compatibility-section">' +
          (r.good ? '<div class="compat-item good"><span class="compat-label">\uC758\uC678\uB85C \uAD1C\uCC2E\uC740</span><span class="compat-value">' + r.good + '</span></div>' : '') +
          (r.bad ? '<div class="compat-item bad"><span class="compat-label">\uC774\uAC83\uB3C4 \uC2EB\uC5B4</span><span class="compat-value">' + r.bad + '</span></div>' : '') +
        '</div>';
    }

    // Journey replay
    var journeyHTML = '';
    if (journey.length > 0) {
      // Filter journey to only show matches the finalist won
      var finalistJourney = journey.filter(function (j) { return j.winner === finalist.label; });
      if (finalistJourney.length > 0) {
        journeyHTML =
          '<div class="journey-section">' +
            '<h3>\uD1A0\uB108\uBA3C\uD2B8 \uACBD\uB85C</h3>' +
            '<div class="journey-path">' +
              finalistJourney.map(function (j) {
                return '<div class="journey-step">' +
                  '<span class="step-round">' + j.round + '</span>' +
                  '<span class="step-beat">' + j.winner + '</span>' +
                  '<span class="step-arrow">\u276F</span>' +
                  '<span style="color:var(--text-muted);text-decoration:line-through;">' + j.loser + '</span>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>';
      }
    }

    app.innerHTML =
      '<div class="test-screen result-screen">' +
        '<a href="/" class="back-home">' +
          '<span class="bh-accent">\uC5F0\uC560</span><span class="bh-zip">.zip</span>' +
        '</a>' +

        '<div class="result-card" id="result-card">' +
          '<div class="result-card-inner">' +
            '<div class="result-label">\uB098\uC758 \uCD5C\uC545\uC758 \uC5F0\uC560 \uC720\uD615</div>' +
            '<h2 class="result-name">' + r.name + '</h2>' +
            '<p class="result-desc">' + r.description + '</p>' +
            '<div class="result-tags">' +
              r.traits.map(function (t) { return '<span class="result-tag">#' + t + '</span>'; }).join('') +
            '</div>' +
            '<div class="result-footer">\uC5F0\uC560.zip</div>' +
          '</div>' +
        '</div>' +

        '<div class="result-detail">' +
          '<div class="detail-section">' +
            '<h3>\uC0C1\uC138 \uBD84\uC11D</h3>' +
            '<p>' + r.detail + '</p>' +
          '</div>' +
          strengthsHTML +
          weaknessesHTML +
          compatHTML +
          journeyHTML +
        '</div>' +

        '<div class="share-buttons">' +
          '<button class="share-btn" id="btn-share">\uACF5\uC720</button>' +
          '<button class="share-btn" id="btn-download">\uC800\uC7A5</button>' +
          '<button class="share-btn" id="btn-copy">\uB9C1\uD06C</button>' +
        '</div>' +

        '<a href="/" class="btn-home">\uB2E4\uB978 \uD14C\uC2A4\uD2B8 \uD574\uBCF4\uAE30</a>' +
        '<button class="btn-retry" id="btn-retry">\uB2E4\uC2DC \uD558\uAE30</button>' +
      '</div>';

    window.scrollTo(0, 0);
    bindResultActions(r);
  }

  /* ========== Result Actions ========== */
  function bindResultActions(r) {
    // Share
    var btnShare = document.getElementById('btn-share');
    if (btnShare) {
      btnShare.addEventListener('click', function () {
        if (navigator.share) {
          navigator.share({
            title: config.title + ' - \uC5F0\uC560.zip',
            text: '\uB098\uC758 \uCD5C\uC545\uC758 \uC5F0\uC560 \uC720\uD615: ' + r.name,
            url: location.href
          }).catch(function () { /* cancelled */ });
        } else {
          copyLink();
        }
      });
    }

    // Download
    var btnDownload = document.getElementById('btn-download');
    if (btnDownload) {
      btnDownload.addEventListener('click', function () {
        var card = document.getElementById('result-card');
        if (typeof html2canvas !== 'undefined' && card) {
          html2canvas(card, {
            scale: 2,
            useCORS: true,
            backgroundColor: null
          }).then(function (canvas) {
            var a = document.createElement('a');
            a.download = config.id + '-result.png';
            a.href = canvas.toDataURL();
            a.click();
          });
        }
      });
    }

    // Copy link
    var btnCopy = document.getElementById('btn-copy');
    if (btnCopy) {
      btnCopy.addEventListener('click', copyLink);
    }

    // Retry
    var btnRetry = document.getElementById('btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', function () {
        currentRound = 0;
        currentMatch = 0;
        winners = [];
        journey = [];
        completedMatches = 0;
        rounds = [];
        renderStart();
        window.scrollTo(0, 0);
      });
    }
  }

  function copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href).then(function () {
        showToast('\uB9C1\uD06C\uAC00 \uBCF5\uC0AC\uB418\uC5C8\uC5B4\uC694!');
      });
    } else {
      // Fallback
      var ta = document.createElement('textarea');
      ta.value = location.href;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('\uB9C1\uD06C\uAC00 \uBCF5\uC0AC\uB418\uC5C8\uC5B4\uC694!');
    }
  }

  /* ========== Boot ========== */
  document.addEventListener('DOMContentLoaded', init);
})();
