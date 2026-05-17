// localStorage read/write layer for the word review app

const STORAGE_KEY = "english_word_review";

// Check localStorage availability
function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isStorageAvailable()) {
  alert('⚠️ 浏览器不支持本地存储，请检查浏览器设置。\n\n数据将无法保存！');
}

function getDefaultData() {
  const today = new Date().toISOString().split("T")[0];
  const words = {};
  if (typeof BUILTIN_WORDS === 'undefined') {
    console.error('❌ BUILTIN_WORDS not defined! wordbank.js may have failed to load.');
    return { words: {}, checkins: {}, settings: { dailyGoal: 0, fontSize: "medium", theme: "warm" } };
  }
  BUILTIN_WORDS.forEach(w => {
    words[w.id] = {
      ...w,
      isBuiltin: true,
      enabled: true,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: today,
      lastReview: null,
      lastQuality: null,
      createdAt: today,
      relatedWords: { synonymsA: [], antonymsA: [], synonymsB: [], antonymsB: [] }
    };
  });
  console.log('📚 Initialized ' + Object.keys(words).length + ' built-in words');
  return { words, checkins: {}, settings: { dailyGoal: 0, fontSize: "medium", theme: "warm" } };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      console.log('📦 No saved data, initializing defaults');
      const def = getDefaultData();
      saveData(def);
      return def;
    }
    const data = JSON.parse(raw);
    if (!data.words || typeof data.words !== 'object') data.words = {};
    if (!data.checkins || typeof data.checkins !== 'object') data.checkins = {};
    if (!data.settings || typeof data.settings !== 'object') {
      data.settings = { dailyGoal: 0, fontSize: "medium", theme: "warm" };
    }
    return data;
  } catch (e) {
    console.error('❌ Failed to load data, resetting:', e);
    const def = getDefaultData();
    saveData(def);
    return def;
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('💾 Data saved,', Object.keys(data.words || {}).length, 'words');
  } catch (e) {
    console.error('❌ Failed to save data:', e);
    alert('保存失败！可能是存储空间不足。请尝试导出数据备份后清理浏览器数据。');
  }
}

// ---- Word CRUD ----

function getWords() {
  return loadData().words;
}

function getWord(id) {
  const data = loadData();
  return data.words[id] || null;
}

function addWord(word) {
  const data = loadData();
  const id = (word.wordA + "_" + word.wordB).toLowerCase().replace(/\s+/g, "_").replace(/['']/g, "");
  if (data.words[id]) {
    // Already exists - if disabled, re-enable it and update
    const existing = data.words[id];
    if (!existing.enabled) {
      existing.enabled = true;
      saveData(data);
      return id;
    }
    return null; // truly duplicate
  }
  const today = new Date().toISOString().split("T")[0];
  data.words[id] = {
    ...word,
    id,
    isBuiltin: false,
    enabled: true,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: today,
    lastReview: null,
    lastQuality: null,
    createdAt: today,
    relatedWords: word.relatedWords || { synonymsA: [], antonymsA: [], synonymsB: [], antonymsB: [] }
  };
  saveData(data);
  return id;
}

function updateWord(id, updates) {
  const data = loadData();
  if (!data.words[id]) return false;
  data.words[id] = { ...data.words[id], ...updates };
  saveData(data);
  return true;
}

function deleteWord(id) {
  const data = loadData();
  if (!data.words[id] || data.words[id].isBuiltin) return false;
  delete data.words[id];
  saveData(data);
  return true;
}

function toggleWord(id) {
  const data = loadData();
  if (!data.words[id]) return false;
  data.words[id].enabled = !data.words[id].enabled;
  saveData(data);
  return true;
}

// ---- Checkins ----

function getCheckins() {
  return loadData().checkins;
}

function addCheckin(date, count) {
  const data = loadData();
  data.checkins[date] = { completed: true, reviewedCount: count };
  saveData(data);
}

function getStreak() {
  const checkins = loadData().checkins;
  let streak = 0;
  const d = new Date();
  // Check today first
  const today = d.toISOString().split("T")[0];
  if (checkins[today] && checkins[today].completed) {
    streak = 1;
  } else {
    // Check yesterday
    d.setDate(d.getDate() - 1);
    const yesterday = d.toISOString().split("T")[0];
    if (checkins[yesterday] && checkins[yesterday].completed) {
      d.setDate(d.getDate() - 1);
      streak = 1;
      while (true) {
        const dateStr = d.toISOString().split("T")[0];
        if (checkins[dateStr] && checkins[dateStr].completed) {
          streak++;
          d.setDate(d.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    }
    return 0;
  }
  // Continue going back from yesterday
  d.setDate(d.getDate() - 1);
  while (true) {
    const dateStr = d.toISOString().split("T")[0];
    if (checkins[dateStr] && checkins[dateStr].completed) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// ---- Settings ----

function getSettings() {
  return loadData().settings;
}

function updateSettings(settings) {
  const data = loadData();
  data.settings = { ...data.settings, ...settings };
  saveData(data);
}

// ---- Import / Export ----

function exportData() {
  return JSON.stringify(loadData(), null, 2);
}

function importData(jsonStr) {
  try {
    const imported = JSON.parse(jsonStr);
    if (!imported.words || typeof imported.words !== "object") {
      return { success: false, message: "数据格式不正确：缺少单词数据" };
    }
    const current = loadData();
    // Merge: imported words overwrite existing ones with same id
    const mergedWords = { ...current.words, ...imported.words };
    const mergedCheckins = { ...current.checkins, ...(imported.checkins || {}) };
    const mergedSettings = { ...current.settings, ...(imported.settings || {}) };
    saveData({ words: mergedWords, checkins: mergedCheckins, settings: mergedSettings });
    return { success: true, message: `导入成功！共 ${Object.keys(mergedWords).length} 组单词` };
  } catch (e) {
    return { success: false, message: "JSON 解析失败，请检查文件格式" };
  }
}

function resetData() {
  saveData(getDefaultData());
}

// ---- Review helpers ----

function getDueWords() {
  const data = loadData();
  const today = new Date().toISOString().split("T")[0];
  const due = [];
  for (const id in data.words) {
    const w = data.words[id];
    if (w.enabled && w.nextReview <= today) {
      due.push(w);
    }
  }
  return due;
}

function getTotalStats() {
  const data = loadData();
  const words = data.words;
  let total = 0, mastered = 0, learning = 0, newWords = 0;
  for (const id in words) {
    const w = words[id];
    if (!w.enabled) continue;
    total++;
    if (w.repetitions === 0) newWords++;
    else if (w.interval >= 21) mastered++;
    else learning++;
  }
  return { total, mastered, learning, newWords };
}
