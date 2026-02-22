/**
 * 공유 기능
 * - 카카오톡 (SDK)
 * - 트위터 (Intent URL)
 * - 이미지 다운로드 (인스타용)
 * - 링크 복사
 */

const Share = {
  siteUrl: 'https://ai-personality-test.kr',
  resultData: null,

  /**
   * 초기 설정
   */
  init(resultData) {
    this.resultData = resultData;
  },

  /**
   * 카카오톡 공유
   */
  shareKakao() {
    // Kakao SDK가 없으면 링크 복사 fallback
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized?.()) {
      this.copyLink();
      showToast('카카오톡 SDK가 준비되지 않아 링크를 복사했습니다.');
      return;
    }

    const { typeInfo } = this.resultData;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'AI 토론회: 나의 성격 분석',
        description: `${typeInfo.emoji} ${typeInfo.name} - ${typeInfo.desc}`,
        imageUrl: this.siteUrl + '/assets/og-image.png',
        link: {
          mobileWebUrl: this.siteUrl,
          webUrl: this.siteUrl
        }
      },
      buttons: [
        {
          title: '나도 해보기',
          link: {
            mobileWebUrl: this.siteUrl,
            webUrl: this.siteUrl
          }
        }
      ]
    });
  },

  /**
   * 트위터 공유
   */
  shareTwitter() {
    const { typeInfo } = this.resultData;
    const text = `AI 3인방이 분석한 내 성격: ${typeInfo.emoji} ${typeInfo.name}\n${typeInfo.desc}\n\n너도 해봐!`;
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
