// Search page logic

let activeTag = 'all';
let activeDifficulty = 'all';
let activeStatus = 'all';

(function init() {
  bindSearchFilters();
  doSearch();
})();

function bindSearchFilters() {
  // Tag filters
  document.querySelectorAll('#tag-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      document.querySelectorAll('#tag-filters .filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      activeTag = this.dataset.tag;
      doSearch();
    });
  });

  // Difficulty filters
  document.querySelectorAll('#difficulty-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      document.querySelectorAll('#difficulty-filters .filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      activeDifficulty = this.dataset.difficulty;
      doSearch();
    });
  });

  // Status filters
  document.querySelectorAll('#status-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      document.querySelectorAll('#status-filters .filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      activeStatus = this.dataset.status;
      doSearch();
    });
  });
}

function doSearch() {
  const query = (document.getElementById('search-input').value || '').toLowerCase().trim();
  const allWords = Object.values(getWords()).filter(w => w.enabled);

  let filtered = allWords;

  // Tag filter
  if (activeTag !== 'all') {
    filtered = filtered.filter(w => w.tags && w.tags.includes(activeTag));
  }

  // Difficulty filter
  if (activeDifficulty !== 'all') {
    filtered = filtered.filter(w => w.difficulty === activeDifficulty);
  }

  // Status filter
  if (activeStatus !== 'all') {
    filtered = filtered.filter(w => {
      if (activeStatus === 'mastered') return w.interval >= 21;
      if (activeStatus === 'learning') return w.repetitions > 0 && w.interval < 21;
      if (activeStatus === 'new') return w.repetitions === 0;
      return true;
    });
  }

  // Keyword search
  if (query) {
    filtered = filtered.filter(w => {
      const searchStr = [
        w.wordA, w.wordB, w.meaningA, w.meaningB,
        w.exampleA, w.exampleB, w.tip,
        (w.tags || []).join(' ')
      ].join(' ').toLowerCase();
      return searchStr.includes(query);
    });
  }

  document.getElementById('result-count').textContent = filtered.length;

  const container = document.getElementById('search-results');
  const empty = document.getElementById('search-empty');

  if (filtered.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  container.innerHTML = filtered.map(w => `
    <div class="card" style="margin-bottom:14px; cursor:pointer;" onclick="showDetail('${w.id}')">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
        <div style="flex:1;">
          <strong style="font-size:1.15rem;">${w.wordA}</strong>
          <span style="color:var(--color-peach); margin:0 6px;">vs</span>
          <strong style="font-size:1.15rem;">${w.wordB}</strong>
          <span class="difficulty difficulty-${w.difficulty === '简单' ? 'easy' : w.difficulty === '中等' ? 'medium' : 'hard'}" style="margin-left:8px;">${w.difficulty}</span>
        </div>
        <div style="display:flex; gap:4px;">
          <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();speakWord('${w.wordA}')">🔊</button>
          <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();speakWord('${w.wordB}')">🔊</button>
        </div>
      </div>
      <div style="margin-top:6px; font-size:0.9rem; color:var(--color-text-light);">
        <span>${w.meaningA}</span> <span style="color:var(--color-coral);">|</span> <span>${w.meaningB}</span>
      </div>
      <div style="margin-top:6px;">
        ${(w.tags || []).map(t => `<span class="tag tag-${t === '拼写易混' ? 'spelling' : t === '同音易混' ? 'homophone' : 'usage'}">${t}</span>`).join(' ')}
        <small style="color:var(--color-text-light); margin-left:8px;">下次复习：${w.nextReview || '今天'} | 复习次数：${w.repetitions}</small>
      </div>
    </div>
  `).join('');
}

async function showDetail(id) {
  const word = getWord(id);
  if (!word) return;

  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('detail-content');

  content.innerHTML = `
    <h2>${word.wordA} vs ${word.wordB}</h2>
    <div style="margin:12px 0;">
      <span class="difficulty difficulty-${word.difficulty === '简单' ? 'easy' : word.difficulty === '中等' ? 'medium' : 'hard'}">${word.difficulty}</span>
      ${(word.tags || []).map(t => `<span class="tag tag-${t === '拼写易混' ? 'spelling' : t === '同音易混' ? 'homophone' : 'usage'}">${t}</span>`).join(' ')}
    </div>

    <div class="card" style="margin:12px 0; padding:16px;">
      <p><strong>${word.wordA}:</strong> ${word.meaningA}</p>
      <p style="color:var(--color-text-light); font-style:italic;">📖 ${word.exampleA}</p>
      <button class="btn btn-sm btn-outline" style="margin-top:6px;" onclick="speakWord('${word.wordA}')">🔊 朗读</button>
      <button class="btn btn-sm btn-outline" style="margin-top:6px;" onclick="event.stopPropagation();expandAndShow('${word.wordA}', 'expand-a')">🔗 拓展关联词</button>
      <div id="expand-a"></div>
    </div>

    <div class="card" style="margin:12px 0; padding:16px;">
      <p><strong>${word.wordB}:</strong> ${word.meaningB}</p>
      <p style="color:var(--color-text-light); font-style:italic;">📖 ${word.exampleB}</p>
      <button class="btn btn-sm btn-outline" style="margin-top:6px;" onclick="speakWord('${word.wordB}')">🔊 朗读</button>
      <button class="btn btn-sm btn-outline" style="margin-top:6px;" onclick="event.stopPropagation();expandAndShow('${word.wordB}', 'expand-b')">🔗 拓展关联词</button>
      <div id="expand-b"></div>
    </div>

    ${word.tip ? `
    <div class="tip-box" style="margin:12px 0;">
      💡 <strong>辨析技巧：</strong>${word.tip}
    </div>` : ''}

    <div style="margin:12px 0; font-size:0.85rem; color:var(--color-text-light);">
      <p>📅 下次复习：${word.nextReview || '今天'} | 🔄 复习次数：${word.repetitions} | 📈 间隔：${word.interval} 天</p>
    </div>

    <div style="text-align:right;">
      <a href="manage.html" class="btn btn-sm btn-outline" onclick="localStorage.setItem('edit_word_id','${word.id}')">✏️ 编辑</a>
      <button class="btn btn-sm btn-outline" onclick="document.getElementById('detail-modal').style.display='none'">关闭</button>
    </div>
  `;

  modal.style.display = 'flex';
}

async function expandAndShow(word, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<p style="font-size:0.85rem; color:var(--color-text-light);">⏳ 正在查询关联词汇...</p>';

  try {
    const result = await expandWord(word);

    let html = '';
    if (result.phonetic) {
      html += `<p style="font-size:0.85rem;"><strong>音标：</strong>${result.phonetic}</p>`;
    }
    if (result.definition) {
      html += `<p style="font-size:0.85rem;"><strong>释义：</strong>${result.definition}</p>`;
    }
    if (result.synonyms.length > 0) {
      html += `<p style="font-size:0.85rem; margin-top:6px;"><strong>近义词：</strong></p>
        <div class="related-words">${result.synonyms.map(s => `<span class="related-word-pill">${s}</span>`).join('')}</div>`;
    }
    if (result.antonyms.length > 0) {
      html += `<p style="font-size:0.85rem; margin-top:6px;"><strong>反义词：</strong></p>
        <div class="related-words">${result.antonyms.map(s => `<span class="related-word-pill">${s}</span>`).join('')}</div>`;
    }
    if (result.related.length > 0) {
      html += `<p style="font-size:0.85rem; margin-top:6px;"><strong>相关联想词：</strong></p>
        <div class="related-words">${result.related.map(s => `<span class="related-word-pill">${s}</span>`).join('')}</div>`;
    }
    if (!html) {
      html = '<p style="font-size:0.85rem; color:var(--color-text-light);">未找到关联词汇</p>';
    }
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<p style="font-size:0.85rem; color:#C62828;">查询失败，请检查网络连接</p>';
  }
}
