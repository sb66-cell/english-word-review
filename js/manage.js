// Word management page logic
console.log('📝 manage.js loaded');

let currentFilter = 'all';

(function init() {
  try {
    console.log('🔧 Initializing manage page...');
    renderWordList();
    updateStats();
    bindFilters();
    console.log('✅ Manage page initialized');
  } catch (e) {
    console.error('❌ Init error:', e);
    alert('页面初始化出错：' + e.message + '\n请尝试清除浏览器数据后刷新。');
  }
})();

function renderWordList() {
  const words = getWords();
  const wordArray = Object.values(words);
  const container = document.getElementById('word-list');
  const empty = document.getElementById('empty-state');

  if (!container) { console.error('❌ word-list element not found'); return; }

  let filtered = wordArray;
  if (currentFilter !== 'all') {
    filtered = wordArray.filter(w => {
      if (['简单', '中等', '困难'].includes(currentFilter)) {
        return w.difficulty === currentFilter;
      }
      return w.tags && w.tags.includes(currentFilter);
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  const html = `
    <div style="overflow-x:auto;">
      <table class="word-table">
        <thead>
          <tr>
            <th>单词对</th>
            <th>释义</th>
            <th>标签</th>
            <th>难度</th>
            <th>下次复习</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(w => {
            const tagHtml = (w.tags || []).map(t => {
              const cls = t === '拼写易混' ? 'spelling' : t === '同音易混' ? 'homophone' : 'usage';
              return `<span class="tag tag-${cls}">${t}</span>`;
            }).join(' ');
            const diffCls = w.difficulty === '简单' ? 'easy' : w.difficulty === '中等' ? 'medium' : 'hard';
            const escapedId = w.id.replace(/'/g, "\\'");
            const escapedWordA = w.wordA.replace(/'/g, "\\'");
            const escapedWordB = w.wordB.replace(/'/g, "\\'");
            return `
            <tr style="${!w.enabled ? 'opacity:0.45;' : ''}">
              <td><strong>${escHtml(w.wordA)}</strong> vs <strong>${escHtml(w.wordB)}</strong>${w.isBuiltin ? ' <small style="color:var(--color-peach);">🔒</small>' : ''}</td>
              <td><small>${escHtml(w.meaningA || '')} / ${escHtml(w.meaningB || '')}</small></td>
              <td>${tagHtml}</td>
              <td><span class="difficulty difficulty-${diffCls}">${escHtml(w.difficulty || '')}</span></td>
              <td><small>${w.nextReview || '今天'}</small></td>
              <td>
                <label class="toggle">
                  <input type="checkbox" ${w.enabled ? 'checked' : ''} onchange="toggleWord('${escapedId}');renderWordList();">
                  <span class="toggle-track"></span>
                </label>
              </td>
              <td>
                <div class="actions">
                  <button class="btn btn-sm btn-outline" onclick="speakWord('${escapedWordA}')" title="朗读A">🔊</button>
                  <button class="btn btn-sm btn-outline" onclick="speakWord('${escapedWordB}')" title="朗读B">🔊</button>
                  <button class="btn btn-sm btn-outline" onclick="openEditModal('${escapedId}')">✏️</button>
                  ${!w.isBuiltin ? `<button class="btn btn-sm btn-outline" onclick="deleteWordConfirm('${escapedId}')" style="color:#C62828;">🗑</button>` : ''}
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  container.innerHTML = html;
}

// Simple HTML escaping to prevent XSS
function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function updateStats() {
  try {
    const stats = getTotalStats();
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-mastered').textContent = stats.mastered;
    document.getElementById('stat-learning').textContent = stats.learning;
    document.getElementById('stat-new').textContent = stats.newWords;
  } catch (e) {
    console.error('❌ updateStats error:', e);
  }
}

function bindFilters() {
  document.querySelectorAll('#filter-chips .filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      document.querySelectorAll('#filter-chips .filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderWordList();
    });
  });
}

// ---- Modal ----

function openAddModal() {
  console.log('📝 openAddModal called');
  try {
    document.getElementById('modal-title').textContent = '➕ 添加单词';
    document.getElementById('edit-id').value = '';
    document.getElementById('form-wordA').value = '';
    document.getElementById('form-wordB').value = '';
    document.getElementById('form-meaningA').value = '';
    document.getElementById('form-meaningB').value = '';
    document.getElementById('form-exampleA').value = '';
    document.getElementById('form-exampleB').value = '';
    document.getElementById('form-tip').value = '';
    const tagsSelect = document.getElementById('form-tags');
    for (const opt of tagsSelect.options) opt.selected = false;
    document.getElementById('form-difficulty').value = '中等';
    document.getElementById('word-modal').style.display = 'flex';
  } catch (e) {
    console.error('❌ openAddModal error:', e);
    alert('打开添加窗口失败：' + e.message);
  }
}

function openEditModal(id) {
  console.log('📝 openEditModal called with id:', id);
  try {
    const word = getWord(id);
    if (!word) { showToast('⚠️ 未找到该单词'); return; }
    document.getElementById('modal-title').textContent = '✏️ 编辑单词';
    document.getElementById('edit-id').value = id;
    document.getElementById('form-wordA').value = word.wordA || '';
    document.getElementById('form-wordB').value = word.wordB || '';
    document.getElementById('form-meaningA').value = word.meaningA || '';
    document.getElementById('form-meaningB').value = word.meaningB || '';
    document.getElementById('form-exampleA').value = word.exampleA || '';
    document.getElementById('form-exampleB').value = word.exampleB || '';
    document.getElementById('form-tip').value = word.tip || '';
    document.getElementById('form-difficulty').value = word.difficulty || '中等';

    const tagsSelect = document.getElementById('form-tags');
    for (const opt of tagsSelect.options) {
      opt.selected = word.tags && word.tags.includes(opt.value);
    }
    document.getElementById('word-modal').style.display = 'flex';
  } catch (e) {
    console.error('❌ openEditModal error:', e);
    alert('打开编辑窗口失败：' + e.message);
  }
}

function closeModal() {
  document.getElementById('word-modal').style.display = 'none';
}

function saveWord() {
  console.log('💾 saveWord called');
  try {
    const editId = document.getElementById('edit-id').value;
    const wordA = document.getElementById('form-wordA').value.trim();
    const wordB = document.getElementById('form-wordB').value.trim();

    if (!wordA || !wordB) {
      showToast('⚠️ 单词 A 和单词 B 不能为空');
      return;
    }

    const tagsSelect = document.getElementById('form-tags');
    const selectedTags = Array.from(tagsSelect.selectedOptions).map(o => o.value);

    const data = {
      wordA: wordA,
      wordB: wordB,
      meaningA: document.getElementById('form-meaningA').value.trim(),
      meaningB: document.getElementById('form-meaningB').value.trim(),
      exampleA: document.getElementById('form-exampleA').value.trim(),
      exampleB: document.getElementById('form-exampleB').value.trim(),
      tip: document.getElementById('form-tip').value.trim(),
      tags: selectedTags,
      difficulty: document.getElementById('form-difficulty').value
    };

    console.log('📦 Word data:', data);

    if (editId) {
      const ok = updateWord(editId, data);
      if (ok) {
        showToast('✅ 单词已更新');
        closeModal();
        renderWordList();
        updateStats();
      } else {
        showToast('⚠️ 更新失败，单词不存在');
      }
    } else {
      const result = addWord(data);
      console.log('📥 addWord result:', result);
      if (result) {
        showToast('✅ ' + wordA + ' vs ' + wordB + ' 已添加');
        closeModal();
        renderWordList();
        updateStats();
      } else {
        showToast('⚠️ 该单词对已存在，请勿重复添加');
      }
    }
  } catch (e) {
    console.error('❌ saveWord error:', e);
    alert('保存失败：' + e.message + '\n\n请检查浏览器是否支持 localStorage，或尝试刷新页面。');
  }
}

// ---- Delete ----

function deleteWordConfirm(id) {
  if (confirm('确定要删除这组单词吗？此操作不可撤销！')) {
    const ok = deleteWord(id);
    if (ok) {
      showToast('🗑 单词已删除');
      renderWordList();
      updateStats();
    } else {
      showToast('⚠️ 删除失败（内置词库不可删除）');
    }
  }
}

// ---- Import / Export ----

function exportWords() {
  try {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '易混词备份_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📤 导出成功');
  } catch (e) {
    console.error('❌ export error:', e);
    showToast('⚠️ 导出失败');
  }
}

async function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  console.log('📥 Import file:', file.name, 'size:', file.size);

  try {
    const rows = await parseFile(file);
    console.log('📊 Parsed rows:', rows.length, rows);

    if (!rows || rows.length === 0) {
      showImportResult('⚠️', '文件中没有识别到任何数据。\n\n请检查：\n1. 文件是否为空\n2. CSV 第一行是否为列名\n3. 是否下载了模板并按格式填写');
      event.target.value = '';
      return;
    }

    const pairs = convertToWordPairs(rows);
    console.log('🔄 Converted pairs:', pairs.length, pairs);

    if (pairs.length === 0) {
      const sampleKeys = Object.keys(rows[0] || {}).join('、');
      showImportResult('⚠️', `识别到 ${rows.length} 行数据，但无法解析出单词对。\n\n文件的列名：${sampleKeys || '无'}\n\n需要的列：单词A 和 单词B（或 wordA 和 wordB）\n\n💡 建议下载模板，按模板格式填写。`);
      event.target.value = '';
      return;
    }

    let imported = 0;
    let skipped = 0;
    for (const pair of pairs) {
      const result = addWord(pair);
      if (result) imported++;
      else skipped++;
    }

    let msg = `成功导入 ${imported} 组单词！`;
    if (skipped > 0) msg += `\n跳过 ${skipped} 组（词对已存在）。`;
    if (imported === 0 && skipped > 0) msg = `所有 ${skipped} 组单词已存在，无需重复导入。`;
    showImportResult(imported > 0 ? '✅' : 'ℹ️', msg);
    renderWordList();
    updateStats();
  } catch (err) {
    console.error('❌ Import error:', err);
    showImportResult('❌', '导入失败：' + (err.message || '未知错误') + '\n\n支持格式：.csv（用 Excel/WPS 另存为 CSV）或 .json\n如果是 .xlsx 文件，请先在 Excel 中「另存为」→ 选择 CSV 格式。');
  }
  event.target.value = '';
}

function showImportResult(icon, msg) {
  document.getElementById('import-icon').textContent = icon;
  document.getElementById('import-message').style.whiteSpace = 'pre-line';
  document.getElementById('import-message').textContent = msg;
  document.getElementById('import-modal').style.display = 'flex';
}

function closeImportModal() {
  document.getElementById('import-modal').style.display = 'none';
}

// ---- Template Help ----

function showTemplateHelp() {
  document.getElementById('template-modal').style.display = 'flex';
}

function closeTemplateModal() {
  document.getElementById('template-modal').style.display = 'none';
}

// ---- Toast ----

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 2500);
}

// Close modals on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});
