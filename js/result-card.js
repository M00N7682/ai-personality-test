/**
 * 결과 카드 생성 + html2canvas 이미지 생성
 */

const ResultCard = {
  /**
   * 결과 카드 DOM 업데이트
   */
  render(analysisResult, userName) {
    const { finalType, typeInfo, selfType, selfTypeInfo, dna, gapLevel } = analysisResult;

    // 이름
    document.getElementById('result-name').textContent = userName;

    // 셀프 유형 vs AI 유형 비교
    document.getElementById('self-emoji').textContent = selfTypeInfo.emoji;
    document.getElementById('self-type').textContent = selfTypeInfo.name;
    document.getElementById('ai-emoji').textContent = typeInfo.emoji;
    document.getElementById('ai-type').textContent = typeInfo.name;

    // 갭에 따른 한줄 코멘트
    const quotes = {
      match: `"스스로를 정확히 아는 사람. ${typeInfo.desc}"`,
      slight: `"약간의 차이가 매력이 됩니다. ${typeInfo.desc}"`,
      big: `"반전 매력의 소유자! 겉과 속이 다른 매력, ${typeInfo.desc}"`
    };
    document.getElementById('result-quote').textContent = quotes[gapLevel] || quotes.match;

    // 감정 DNA 바 렌더링
    const dnaContainer = document.getElementById('dna-bars');
    dnaContainer.innerHTML = '';
    dna.forEach((d, i) => {
      const row = document.createElement('div');
      row.className = 'dna-row';
      row.innerHTML = `
        <span class="dna-label">${d.name}</span>
        <div class="dna-bar">
          <div class="dna-bar-fill bar-${i + 1}" style="width: 0%"></div>
        </div>
        <span class="dna-value">${d.score}%</span>
      `;
      dnaContainer.appendChild(row);
    });

    // DNA 바 애니메이션 (지연)
    setTimeout(() => {
      const fills = dnaContainer.querySelectorAll('.dna-bar-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = dna[i].score + '%';
        }, i * 200);
      });
    }, 500);

    // 유형 상세 설명
    document.getElementById('detail-emoji').textContent = typeInfo.emoji;
    document.getElementById('detail-title').textContent = `${typeInfo.name} ${typeInfo.emoji}`;
    document.getElementById('detail-text').textContent = typeInfo.detail;

    // 재미있는 사실
    document.getElementById('funfact-text').textContent = typeInfo.funFact;

    // 조언
    document.getElementById('warning-text').textContent = typeInfo.warning;

    // 궁합
    document.getElementById('best-match').textContent = typeInfo.bestMatch;
    document.getElementById('worst-match').textContent = typeInfo.worstMatch;

    // 전체 유형 맵
    this._renderTypeMap(finalType);
  },

  /**
   * 전체 유형 맵 렌더링
   */
  _renderTypeMap(currentType) {
    const grid = document.getElementById('typemap-grid');
    grid.innerHTML = '';

    // 2x2 기본 매트릭스 + 서브타입 = 8개를 4열 2행으로 배치
    // 상단: 외향(E) — FE, FE2, TE, TE2
    // 하단: 내향(I) — FI, FI2, TI, TI2
    const layout = [
      ['FE', 'FE2', 'TE', 'TE2'],
      ['FI', 'FI2', 'TI', 'TI2']
    ];

    // 4열 그리드로 변경
    grid.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';

    layout.forEach(row => {
      row.forEach(typeKey => {
        const info = this._getTypeInfo(typeKey);
        if (!info) return;

        const cell = document.createElement('div');
        cell.className = 'typemap-cell';
        if (typeKey === currentType) {
          cell.classList.add('current-type');
        }
        cell.innerHTML = `
          <div class="typemap-emoji">${info.emoji}</div>
          <div class="typemap-name">${info.name}</div>
          <div class="typemap-you">YOU</div>
        `;
        grid.appendChild(cell);
      });
    });
  },

  /**
   * TYPE_INFO 가져오기 (analyzer.js의 전역 변수 참조)
   */
  _getTypeInfo(typeKey) {
    // TYPE_INFO는 analyzer.js에서 전역으로 선언됨
    if (typeof TYPE_INFO !== 'undefined' && TYPE_INFO[typeKey]) {
      return TYPE_INFO[typeKey];
    }
    return null;
  },

  /**
   * html2canvas로 이미지 생성
   */
  async generateImage() {
    const card = document.getElementById('result-card');

    // 캡쳐용 클론 생성
    const captureWrap = document.createElement('div');
    captureWrap.className = 'capture-card';
    captureWrap.appendChild(card.cloneNode(true));
    document.body.appendChild(captureWrap);

    // DNA 바 width 설정 (클론에도 적용)
    const originalBars = card.querySelectorAll('.dna-bar-fill');
    const cloneBars = captureWrap.querySelectorAll('.dna-bar-fill');
    originalBars.forEach((bar, i) => {
      if (cloneBars[i]) {
        cloneBars[i].style.width = bar.style.width;
      }
    });

    try {
      const canvas = await html2canvas(captureWrap, {
        backgroundColor: '#0a0a14',
        scale: 2,
        useCORS: true,
        logging: false,
        width: 1080,
        height: 1350,
      });

      document.body.removeChild(captureWrap);
      return canvas;
    } catch (err) {
      console.error('html2canvas error:', err);
      document.body.removeChild(captureWrap);
      return null;
    }
  },

  /**
   * 캔버스를 Blob으로 변환
   */
  canvasToBlob(canvas) {
    return new Promise(resolve => {
      canvas.toBlob(blob => resolve(blob), 'image/png');
    });
  }
};
