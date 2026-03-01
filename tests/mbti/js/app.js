/**
 * 메인 앱 컨트롤러
 * 화면 전환, 이벤트 바인딩, 플로우 관리
 */

const App = {
  // 상태
  userName: '',
  selfCheckAnswers: {},
  selfCheckIndex: 0,
  selfCheckFollowups: {},  // 꼬리질문 답변 저장
  analysisResult: null,
  llmPromise: null,
  _commentTimeout: null,  // AI 코멘트 타이머

  /**
   * 앱 초기화
   */
  init() {
    this._bindEvents();
    document.getElementById('btn-start').classList.add('pulse');
  },

  /**
   * 이벤트 바인딩
   */
  _bindEvents() {
    // 시작 버튼
    document.getElementById('btn-start').addEventListener('click', () => {
      this._goToScreen('screen-name');
      document.getElementById('input-name').focus();
    });

    // 이름 입력
    const nameInput = document.getElementById('input-name');
    nameInput.addEventListener('input', () => {
      const val = nameInput.value.trim();
      document.getElementById('name-count').textContent = nameInput.value.length;
      document.getElementById('btn-name-next').disabled = val.length === 0;
    });

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && nameInput.value.trim().length > 0) {
        document.getElementById('btn-name-next').click();
      }
    });

    document.getElementById('btn-name-next').addEventListener('click', () => {
      this.userName = nameInput.value.trim();
      this._startSelfCheck();
    });

    // 결과 보기
    document.getElementById('btn-show-result').addEventListener('click', () => {
      this._goToScreen('screen-result');
    });

    // 공유 버튼
    document.getElementById('btn-share-native').addEventListener('click', () => Share.shareNative());
    document.getElementById('btn-share-twitter').addEventListener('click', () => Share.shareTwitter());
    document.getElementById('btn-download').addEventListener('click', () => Share.downloadImage());
    document.getElementById('btn-copy-link').addEventListener('click', () => Share.copyLink());

    // 토론 다시보기
    document.getElementById('btn-review-debate').addEventListener('click', () => {
      document.getElementById('debate-footer').style.display = 'block';
      this._goToScreen('screen-debate');
    });

    // 다시하기
    document.getElementById('btn-retry').addEventListener('click', () => {
      this._reset();
    });
  },

  /**
   * 화면 전환
   */
  _goToScreen(screenId) {
    const current = document.querySelector('.screen.active');
    const next = document.getElementById(screenId);

    if (current) {
      current.classList.add('fade-out');
      setTimeout(() => {
        current.classList.remove('active', 'fade-out');
        next.classList.add('active', 'fade-in');
        next.scrollTop = 0;
        window.scrollTo(0, 0);

        setTimeout(() => {
          next.classList.remove('fade-in');
        }, 400);
      }, 250);
    } else {
      next.classList.add('active');
    }
  },

  /**
   * 셀프 체크 시작
   */
  _startSelfCheck() {
    this.selfCheckIndex = 0;
    this.selfCheckAnswers = {};
    this.selfCheckFollowups = {};
    this._renderSelfCheck();
    this._goToScreen('screen-selfcheck');
  },

  /**
   * 셀프 체크 문항 렌더링
   */
  _renderSelfCheck() {
    const q = SELFCHECK_QUESTIONS[this.selfCheckIndex];
    document.getElementById('selfcheck-progress').textContent = `${this.selfCheckIndex + 1} / ${SELFCHECK_QUESTIONS.length}`;
    document.getElementById('selfcheck-question').textContent = q.question;

    // AI 코멘트/꼬리질문 영역 숨김
    document.getElementById('ai-comment-area').style.display = 'none';
    document.getElementById('followup-area').style.display = 'none';

    const optionsEl = document.getElementById('selfcheck-options');
    optionsEl.innerHTML = '';
    optionsEl.classList.add('stagger-in');
    optionsEl.style.pointerEvents = 'auto';

    q.options.forEach(opt => {
      const card = document.createElement('button');
      card.className = 'option-card';
      card.textContent = opt.label;
      card.addEventListener('click', () => {
        this.selfCheckAnswers[q.id] = opt.value;

        // 선택 표시
        optionsEl.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        optionsEl.style.pointerEvents = 'none';

        // AI 코멘트 표시
        this._showAIComment(q.id, opt.value);
      });
      optionsEl.appendChild(card);
    });
  },

  /**
   * AI 코멘트 표시 (타이핑 효과)
   */
  _showAIComment(questionId, optionValue) {
    const commentData = (typeof AI_COMMENTS !== 'undefined') && AI_COMMENTS[questionId] && AI_COMMENTS[questionId][optionValue];

    if (!commentData) {
      // 코멘트 데이터 없으면 바로 다음으로
      this._afterComment();
      return;
    }

    const area = document.getElementById('ai-comment-area');
    const avatar = document.getElementById('ai-comment-avatar');
    const textEl = document.getElementById('ai-comment-text');

    // 아바타 설정
    const avatarMap = {
      chatgpt: '/assets/chatgpt-avatar.png',
      gemini: '/assets/gemini-avatar.png',
      claude: '/assets/claude-avatar.png'
    };
    avatar.src = avatarMap[commentData.character] || avatarMap.chatgpt;
    avatar.alt = commentData.character;
    avatar.className = `ai-comment-avatar ${commentData.character}`;

    // 타이핑 효과
    textEl.textContent = '';
    area.style.display = 'flex';

    const fullText = commentData.text;
    let charIdx = 0;
    const typeSpeed = 20; // ms per character

    const typeInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        textEl.textContent += fullText[charIdx];
        charIdx++;
      } else {
        clearInterval(typeInterval);
        // 타이핑 완료 후 꼬리질문 체크
        this._checkFollowup();
      }
    }, typeSpeed);
  },

  /**
   * 꼬리질문 있는지 체크하고 표시
   */
  _checkFollowup() {
    const currentQ = SELFCHECK_QUESTIONS[this.selfCheckIndex];

    if (typeof FOLLOWUP_QUESTIONS === 'undefined') {
      this._scheduleNext();
      return;
    }

    // 현재 질문 이후 트리거되는 꼬리질문 찾기
    const followup = Object.entries(FOLLOWUP_QUESTIONS).find(
      ([key, fq]) => fq.triggerAfter === currentQ.id
    );

    if (followup) {
      const [fqKey, fqData] = followup;
      this._showFollowup(fqKey, fqData);
    } else {
      this._scheduleNext();
    }
  },

  /**
   * 꼬리질문 표시
   */
  _showFollowup(fqKey, fqData) {
    const area = document.getElementById('followup-area');
    const questionEl = document.getElementById('followup-question');
    const optionsEl = document.getElementById('followup-options');

    questionEl.textContent = fqData.question;
    optionsEl.innerHTML = '';

    fqData.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'followup-btn';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        // 답변 저장
        this.selfCheckFollowups[fqKey] = {
          axis: opt.axis,
          score: opt.score
        };

        // 선택 표시
        optionsEl.querySelectorAll('.followup-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // 다음으로
        setTimeout(() => {
          this._advanceToNext();
        }, 500);
      });
      optionsEl.appendChild(btn);
    });

    area.style.display = 'block';
  },

  /**
   * 꼬리질문 없을 때 자동 진행 예약
   */
  _scheduleNext() {
    this._commentTimeout = setTimeout(() => {
      this._advanceToNext();
    }, 1500);
  },

  /**
   * AI 코멘트 후 처리 (코멘트 데이터 없을 때)
   */
  _afterComment() {
    setTimeout(() => {
      this._advanceToNext();
    }, 400);
  },

  /**
   * 다음 문항으로 진행
   */
  _advanceToNext() {
    if (this._commentTimeout) {
      clearTimeout(this._commentTimeout);
      this._commentTimeout = null;
    }

    this.selfCheckIndex++;
    if (this.selfCheckIndex < SELFCHECK_QUESTIONS.length) {
      const optionsEl = document.getElementById('selfcheck-options');
      optionsEl.classList.remove('stagger-in');
      void optionsEl.offsetWidth; // reflow
      this._renderSelfCheck();
    } else {
      // 셀프체크 완료 → 바로 분석 시작
      this._startAnalysis();
    }
  },

  /**
   * 분석 시작 (로딩 연출 + LLM 병렬 호출)
   */
  _startAnalysis() {
    this._goToScreen('screen-loading');

    // 1. 클라이언트 분석 즉시 실행
    this.analysisResult = analyzePersonality(this.selfCheckAnswers, this.selfCheckFollowups);

    // 2. LLM API 비동기 호출 (Promise 저장)
    this.llmPromise = this._fetchLLMDialogue().catch(err => {
      console.warn('LLM API failed, will use fallback:', err.message);
      return null;
    });

    // 3. 로딩 애니메이션
    const messages = [
      'AI들이 당신의 응답을 분석하고 있습니다...',
      'ChatGPT가 MBTI 패턴을 찾고 있습니다...',
      'Gemini가 반론을 제기하고 있습니다...',
      'Claude가 정리 중입니다...',
      '최종 MBTI를 예측하고 있습니다...'
    ];

    const loadingText = document.getElementById('loading-text');
    const loadingBar = document.getElementById('loading-bar');
    const states = {
      chatgpt: document.getElementById('state-chatgpt'),
      gemini: document.getElementById('state-gemini'),
      claude: document.getElementById('state-claude')
    };
    const agents = {
      chatgpt: document.getElementById('agent-chatgpt'),
      gemini: document.getElementById('agent-gemini'),
      claude: document.getElementById('agent-claude')
    };

    let step = 0;
    const totalSteps = messages.length;
    let llmDone = false;

    this.llmPromise.then(() => { llmDone = true; }).catch(() => { llmDone = true; });

    const waitingMessages = [
      'AI들이 깊이 분석하고 있습니다...',
      '거의 다 왔습니다, 조금만 기다려주세요...',
      '맞춤형 MBTI 분석을 생성하고 있습니다...',
      'AI 토론이 진행중입니다...'
    ];
    let waitIdx = 0;

    const advance = () => {
      if (step >= totalSteps) {
        if (llmDone) {
          this._runAnalysis();
          return;
        }
        loadingText.classList.add('switching');
        setTimeout(() => {
          loadingText.textContent = waitingMessages[waitIdx % waitingMessages.length];
          loadingText.classList.remove('switching');
          waitIdx++;
        }, 300);
        setTimeout(advance, 3000);
        return;
      }

      loadingText.classList.add('switching');
      setTimeout(() => {
        loadingText.textContent = messages[step];
        loadingText.classList.remove('switching');
      }, 300);

      loadingBar.style.width = ((step + 1) / totalSteps * 100) + '%';

      if (step === 1) {
        states.chatgpt.textContent = '분석중...';
        agents.chatgpt.classList.add('active-agent');
      }
      if (step === 2) {
        states.chatgpt.textContent = '완료';
        agents.chatgpt.classList.remove('active-agent');
        agents.chatgpt.classList.add('done-agent');
        states.gemini.textContent = '분석중...';
        agents.gemini.classList.add('active-agent');
      }
      if (step === 3) {
        states.gemini.textContent = '완료';
        agents.gemini.classList.remove('active-agent');
        agents.gemini.classList.add('done-agent');
        states.claude.textContent = '정리중...';
        agents.claude.classList.add('active-agent');
      }
      if (step === 4) {
        states.claude.textContent = '완료';
        agents.claude.classList.remove('active-agent');
        agents.claude.classList.add('done-agent');
      }

      step++;
      const delay = (step >= 3 && llmDone) ? 600 : 1200;
      setTimeout(advance, delay);
    };

    advance();
  },

  /**
   * LLM API 호출
   */
  async _fetchLLMDialogue() {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: this.userName,
        selfCheckAnswers: this.selfCheckAnswers,
        selfCheckFollowups: this.selfCheckFollowups,
        analysisResult: this.analysisResult
      })
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    if (!data.success || !data.dialogue) {
      throw new Error('Invalid API response');
    }

    return data.dialogue;
  },

  /**
   * 실제 분석 실행 (LLM 결과 대기 후 폴백 처리)
   */
  async _runAnalysis() {
    let llmDialogue = null;
    if (this.llmPromise) {
      try {
        llmDialogue = await Promise.race([
          this.llmPromise,
          new Promise(resolve => setTimeout(() => resolve(null), 55000))
        ]);
      } catch (err) {
        console.warn('LLM fallback:', err.message);
      }
    }

    let dialogueSet;
    if (llmDialogue && llmDialogue.lines && llmDialogue.lines.length >= 5) {
      dialogueSet = llmDialogue;
      console.log('Using LLM-generated dialogue');
    } else {
      dialogueSet = getDialogueSet(this.analysisResult, this.userName);
      console.log('Using client-side fallback dialogue');
    }

    // 결과 카드 렌더링
    ResultCard.render(this.analysisResult, this.userName);

    // Share 초기화
    Share.init(this.analysisResult);

    // 토론 화면으로
    document.getElementById('debate-sub').textContent =
      `${this.userName}님의 응답을 분석한 AI 3인방의 MBTI 예측`;
    this._goToScreen('screen-debate');

    // 토론 애니메이션 시작
    const chatContainer = document.getElementById('chat-container');
    const debateFooter = document.getElementById('debate-footer');
    debateFooter.style.display = 'none';

    DebateAnimation.start(dialogueSet, chatContainer, () => {
      debateFooter.style.display = 'block';
    });
  },

  /**
   * 리셋 (다시하기)
   */
  _reset() {
    this.userName = '';
    this.selfCheckAnswers = {};
    this.selfCheckIndex = 0;
    this.selfCheckFollowups = {};
    this.analysisResult = null;
    this.llmPromise = null;

    // 입력 필드 초기화
    document.getElementById('input-name').value = '';
    document.getElementById('name-count').textContent = '0';
    document.getElementById('btn-name-next').disabled = true;

    // 로딩 화면 초기화
    document.getElementById('loading-bar').style.width = '0%';
    ['chatgpt', 'gemini', 'claude'].forEach(ai => {
      document.getElementById(`state-${ai}`).textContent = '대기중';
      document.getElementById(`agent-${ai}`).classList.remove('active-agent', 'done-agent');
    });

    // 시작 화면으로
    this._goToScreen('screen-start');
  }
};

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
