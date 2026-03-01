/**
 * AI 토론 애니메이션 시퀀스 컨트롤러
 */

const DebateAnimation = {
  container: null,
  lines: [],
  currentIndex: 0,
  onComplete: null,

  /**
   * 토론 애니메이션 시작
   */
  start(dialogueSet, containerEl, onComplete) {
    this.container = containerEl;
    this.lines = dialogueSet.lines;
    this.currentIndex = 0;
    this.onComplete = onComplete;
    this.container.innerHTML = '';
    this._showNext();
  },

  /**
   * 다음 메시지 표시
   */
  _showNext() {
    if (this.currentIndex >= this.lines.length) {
      if (this.onComplete) this.onComplete();
      return;
    }

    const line = this.lines[this.currentIndex];
    this.currentIndex++;

    if (line.ai === 'conclusion') {
      this._showConclusion(line.text);
      return;
    }

    // 타이핑 인디케이터 표시
    const typingEl = this._createTypingIndicator(line.ai);
    this.container.appendChild(typingEl);
    this._scrollToBottom();

    // 잠시 후 타이핑 인디케이터를 실제 메시지로 교체
    setTimeout(() => {
      typingEl.remove();
      const messageEl = this._createMessage(line.ai, line.text);
      this.container.appendChild(messageEl);

      // 메시지 등장 애니메이션
      requestAnimationFrame(() => {
        messageEl.classList.add('visible');
        this._scrollToBottom();
      });

      // 타이핑 효과
      const textEl = messageEl.querySelector('.chat-text');
      this._typeText(textEl, line.text, () => {
        // 다음 메시지로
        setTimeout(() => this._showNext(), 800);
      });
    }, 1200);
  },

  /**
   * 최종 결론 표시
   */
  _showConclusion(text) {
    const conclusionEl = document.createElement('div');
    conclusionEl.className = 'chat-conclusion';
    conclusionEl.innerHTML = `
      <p class="conclusion-label">최종 결론</p>
      <p class="conclusion-text"></p>
    `;
    this.container.appendChild(conclusionEl);

    setTimeout(() => {
      conclusionEl.classList.add('visible');
      this._scrollToBottom();

      const textEl = conclusionEl.querySelector('.conclusion-text');
      this._typeText(textEl, text, () => {
        if (this.onComplete) {
          setTimeout(() => this.onComplete(), 1000);
        }
      });
    }, 500);
  },

  /**
   * 채팅 메시지 DOM 생성
   */
  _createMessage(ai, text) {
    const div = document.createElement('div');
    div.className = 'chat-message';

    const avatarClass = ai;
    const nameClass = ai + '-name';
    const names = { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude' };

    div.innerHTML = `
      <div class="chat-avatar ${avatarClass}">
        <img src="assets/${ai}-avatar.png" alt="${names[ai]}">
      </div>
      <div class="chat-bubble">
        <p class="chat-name ${nameClass}">${names[ai]}</p>
        <p class="chat-text"></p>
      </div>
    `;

    return div;
  },

  /**
   * 타이핑 인디케이터 생성
   */
  _createTypingIndicator(ai) {
    const div = document.createElement('div');
    div.className = 'chat-message visible';

    const avatarClass = ai;
    const names = { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude' };

    div.innerHTML = `
      <div class="chat-avatar ${avatarClass}">
        <img src="assets/${ai}-avatar.png" alt="${names[ai]}">
      </div>
      <div class="chat-bubble">
        <p class="chat-name ${ai}-name">${names[ai]}</p>
        <div class="chat-typing">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;

    return div;
  },

  /**
   * 타이핑 효과 (글자 하나씩 추가)
   */
  _typeText(element, text, onComplete) {
    let i = 0;
    const speed = 35; // ms per character

    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        this._scrollToBottom();
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
  },

  /**
   * 자동 스크롤
   */
  _scrollToBottom() {
    const debateScreen = document.getElementById('screen-debate');
    if (debateScreen) {
      debateScreen.scrollTop = debateScreen.scrollHeight;
    }
  }
};
