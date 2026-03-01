/**
 * 공유 기능
 * - 네이티브 공유 (Web Share API)
 * - 트위터 (Intent URL)
 * - 이미지 다운로드 (인스타용)
 * - 링크 복사
 */

const Share = {
  siteUrl: 'https://ai-debate.ddstudio.co.kr',
  resultData: null,

  /**
   * 초기 설정
   */
  init(resultData) {
    this.resultData = resultData;
  },

  /**
   * 네이티브 공유 (Web Share API)
   */
  async shareNative() {
    const { typeInfo, mbtiCode, finalType } = this.resultData;
    const code = mbtiCode || finalType || '';
    const shareData = {
      title: 'AI 토론회: 나의 성격 분석',
      text: `${typeInfo.emoji} ${code} ${typeInfo.name} - ${typeInfo.desc}\n\nAI 3인방이 분석하는 내 성격, 너도 해봐!`,
      url: this.siteUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // 사용자가 공유 취소한 경우 무시
        if (err.name !== 'AbortError') {
          this.copyLink();
        }
      }
    } else {
      // Web Share API 미지원 브라우저 → 링크 복사 fallback
      this.copyLink();
    }
  },

  /**
   * 트위터 공유
   */
  shareTwitter() {
    const { typeInfo, mbtiCode, finalType } = this.resultData;
    const code = mbtiCode || finalType || '';
    const text = `AI 3인방이 분석한 내 성격: ${typeInfo.emoji} ${code} ${typeInfo.name}\n${typeInfo.desc}\n\n너도 해봐!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.siteUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  /**
   * 이미지 다운로드 (인스타용)
   */
  async downloadImage() {
    showToast('이미지 생성 중...');

    const canvas = await ResultCard.generateImage();
    if (!canvas) {
      showToast('이미지 생성에 실패했습니다.');
      return;
    }

    const link = document.createElement('a');
    link.download = 'ai-personality-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast('이미지가 저장되었습니다!');
  },

  /**
   * 링크 복사
   */
  async copyLink() {
    try {
      await navigator.clipboard.writeText(this.siteUrl);
      showToast('링크가 복사되었습니다!');
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = this.siteUrl;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('링크가 복사되었습니다!');
    }
  }
};

/**
 * 토스트 메시지 표시
 */
function showToast(message) {
  // 기존 토스트 제거
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
