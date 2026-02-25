/**
 * 메인 앱 컨트롤러
 * 화면 전환, 이벤트 바인딩, 플로우 관리
 */

const App = {
  // 상태
  userName: '',
  selfCheckAnswers: {},
  selfCheckIndex: 0,
  essayIndex: 0,
  essayTexts: ['', '', ''],
  analysisResult: null,
  llmPromise: null,  // LLM API 호출 Promise

  /**
   * 앱 초기화
   */
  init() {
    // Kakao SDK 초기화
    if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
      Kakao.init('cb962e3d93f14b48ecb6d1732593e02c');
    }

    this._bindEvents();
    // 시작 버튼 펄스 효과
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

    // 주관식 입력
    const essayInput = document.getElementById('essay-input');
    essayInput.addEventListener('input', () => {
      const len = essayInput.value.length;
      document.getElementById('essay-count').textContent = len;
      const status = document.getElementById('essay-char-status');
      const btn = document.getElementById('btn-essay-next');

      if (len >= 20) {
        status.textContent = '좋아요!';
        status.classList.add('met');
        btn.disabled = false;
      } else {
        status.textContent = `최소 20자 (${20 - len}자 남음)`;
        status.classList.remove('met');
        btn.disabled = true;
      }
    });

    document.getElementById('btn-essay-next').addEventListener('click', () => {
      this._nextEssay();
    });

    // 결과 보기
    document.getElementById('btn-show-result').addEventListener('click', () => {
      this._goToScreen('screen-result');
    });

    // 공유 버튼
    document.getElementById('btn-share-kakao').addEventListener('click', () => Share.shareKakao());
    document.getElementById('btn-share-twitter').addEventListener('click', () => Share.shareTwitter());
    document.getElementById('btn-download').addEventListener('click', () => Share.downloadImage());
    document.getElementById('btn-copy-link').addEventListener('click', () => Share.copyLink());

    // 토론 다시보기
    document.getElementById('btn-review-debate').addEventListener('click', () => {
      // 토론 화면으로 전환 (채팅 히스토리 유지, 결과 버튼 표시)
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

    const optionsEl = document.getElementById('selfcheck-options');
    optionsEl.innerHTML = '';
    optionsEl.classList.add('stagger-in');

    q.options.forEach(opt => {
      const card = document.createElement('button');
      card.className = 'option-card';
      card.textContent = opt.label;
      card.addEventListener('click', () => {
        this.selfCheckAnswers[q.id] = opt.value;

        // 선택 표시
        optionsEl.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // 다음 문항으로
        setTimeout(() => {
          this.selfCheckIndex++;
          if (this.selfCheckIndex < SELFCHECK_QUESTIONS.length) {
            optionsEl.classList.remove('stagger-in');
            void optionsEl.offsetWidth; // reflow
            this._renderSelfCheck();
          } else {
            this._startEssay();
          }
        }, 400);
      });
      optionsEl.appendChild(card);
    });
  },

  /**
   * 주관식 질문 시작
   */
  _startEssay() {
    this.essayIndex = 0;
    this.essayTexts = ['', '', ''];
    this._renderEssay();
    this._goToScreen('screen-essay');
  },

  /**
   * 주관식 문항 렌더링
   */
  _renderEssay() {
    const q = ESSAY_QUESTIONS[this.essayIndex];
    document.getElementById('essay-progress').textContent = `${this.essayIndex + 1} / ${ESSAY_QUESTIONS.length}`;
    document.getElementById('essay-question').textContent = q.question;

    const input = document.getElementById('essay-input');
    input.value = this.essayTexts[this.essayIndex] || '';
    input.dispatchEvent(new Event('input'));
    input.focus();

    document.getElementById('btn-essay-next').textContent =
      this.essayIndex < ESSAY_QUESTIONS.length - 1 ? '다음' : '분석 시작';
  },

  /**
   * 다음 주관식 문항 or 분석 시작
   */
  _nextEssay() {
    this.essayTexts[this.essayIndex] = document.getElementById('essay-input').value;
    this.essayIndex++;

    if (this.essayIndex < ESSAY_QUESTIONS.length) {
      this._renderEssay();
    } else {
      this._startAnalysis();
    }
  },

  /**
   * 분석 시작 (로딩 연출 + LLM 병렬 호출)
   */
  _startAnalysis() {
    this._goToScreen('screen-loading');

    // 1. 클라이언트 분석 즉시 실행
    this.analysisResult = analyzePersonality(this.selfCheckAnswers, this.essayTexts);

    // 2. LLM API 비동기 호출 (Promise 저장)
    this.llmPromise = this._fetchLLMDialogue().catch(err => {
      console.warn('LLM API failed, will use fallback:', err.message);
      return null;
    });

    // 3. 로딩 애니메이션
    const messages = [
      'ChatGPT가 당신의 글을 읽고 있습니다...',
      'ChatGPT가 패턴을 분석하고 있습니다...',
      'Gemini가 반론을 제기하고 있습니다...',
      'Claude가 정리 중입니다...',
      '최종 결론을 도출하고 있습니다...'
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

    // LLM 완료 감지
    this.llmPromise.then(() => { llmDone = true; }).catch(() => { llmDone = true; });

    // LLM 대기 중 순환 메시지
    const waitingMessages = [
      'AI들이 깊이 분석하고 있습니다...',
      '거의 다 왔습니다, 조금만 기다려주세요...',
      '맞춤형 분석을 생성하고 있습니다...',
      'AI 토론이 진행중입니다...'
    ];
    let waitIdx = 0;

    const advance = () => {
      if (step >= totalSteps) {
        // 기본 애니메이션 완료, LLM 대기 시작
        if (llmDone) {
          this._runAnalysis();
          return;
        }
        // LLM 아직 안 끝남 → 대기 메시지 순환
        loadingText.classList.add('switching');
        setTimeout(() => {
          loadingText.textContent = waitingMessages[waitIdx % waitingMessages.length];
          loadingText.classList.remove('switching');
          waitIdx++;
        }, 300);
        setTimeout(advance, 3000);
        return;
      }

      // 텍스트 전환 애니메이션
      loadingText.classList.add('switching');
      setTimeout(() => {
        loadingText.textContent = messages[step];
        loadingText.classList.remove('switching');
      }, 300);

      // 프로그레스 바
      loadingBar.style.width = ((step + 1) / totalSteps * 100) + '%';

      // 에이전트 상태 업데이트
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
      // LLM 이미 완료됐으면 빠르게, 아니면 기본 속도
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
        essayTexts: this.essayTexts,
        essayQuestions: ESSAY_QUESTIONS.map(q => ({ question: q.question })),
        analysisResult: this.analysisResult,
        deepPatterns: this.analysisResult.deepPatterns
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
    // analysisResult는 이미 _startAnalysis()에서 계산됨

    // LLM Promise 확인 (GPT-5-mini는 30~50초 걸릴 수 있으므로 충분히 대기)
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

    // 대사 세트 결정: LLM 성공 → LLM 대사, 실패 → 클라이언트 폴백
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
      `${this.userName}님의 글을 읽고 AI 3인방이 토론한 결과`;
    this._goToScreen('screen-debate');

    // 토론 애니메이션 시작
    const chatContainer = document.getElementById('chat-container');
    const debateFooter = document.getElementById('debate-footer');
    debateFooter.style.display = 'none';

    DebateAnimation.start(dialogueSet, chatContainer, () => {
      // 토론 완료 후 결과 보기 버튼 표시
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
    this.essayIndex = 0;
    this.essayTexts = ['', '', ''];
    this.analysisResult = null;
    this.llmPromise = null;

    // 입력 필드 초기화
    document.getElementById('input-name').value = '';
    document.getElementById('name-count').textContent = '0';
    document.getElementById('btn-name-next').disabled = true;
    document.getElementById('essay-input').value = '';
    document.getElementById('essay-count').textContent = '0';

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
