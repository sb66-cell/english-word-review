// File import parser — supports CSV and JSON only
// No external dependencies required

function parseCSV(text) {
  // Remove BOM if present
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];

  // Auto-detect delimiter: check first line for tab, semicolon, or comma
  const firstLine = lines[0];
  let delimiter = ',';
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const semiCount = (firstLine.match(/;/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  if (tabCount > commaCount && tabCount > semiCount) delimiter = '\t';
  else if (semiCount > commaCount) delimiter = ';';

  console.log('📄 CSV delimiter detected:', delimiter === '\t' ? 'TAB' : delimiter === ';' ? 'semicolon' : 'comma');

  const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i], delimiter);
    if (cols.length === 0) continue;
    // Pad cols to match headers length
    while (cols.length < headers.length) cols.push('');
    const row = {};
    headers.forEach((h, idx) => { row[h] = (cols[idx] || '').trim().replace(/^"|"$/g, ''); });
    results.push(row);
  }
  return results;
}

function parseCSVLine(line, delimiter) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === delimiter && !inQuotes) { result.push(current); current = ''; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

function parseFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext === 'json') return parseJSONFile(file);
  if (ext === 'csv') return parseCSVFile(file);
  throw new Error('不支持的文件格式：.' + ext + '（仅支持 .csv 和 .json）');
}

function parseJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) { resolve(data); }
        else if (data.words && typeof data.words === 'object') {
          resolve(Object.values(data.words));
        } else { reject(new Error('JSON 格式不正确：需要单词数组，或包含 words 字段的对象')); }
      } catch (err) { reject(new Error('JSON 解析失败，请检查文件是否为合法 JSON')); }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
}

function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = parseCSV(e.target.result);
      if (rows.length === 0) {
        reject(new Error('CSV 文件为空或格式不正确'));
        return;
      }
      resolve(rows);
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
}

// Convert imported rows to word pair format
// Supports both English and Chinese column headers
function convertToWordPairs(rows) {
  const converted = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const wordA = findField(row, ['wordA', 'worda', 'word_a', '单词A', '单词a']);
    const wordB = findField(row, ['wordB', 'wordb', 'word_b', '单词B', '单词b']);
    if (!wordA || !wordB) continue;

    converted.push({
      wordA: String(wordA).trim(),
      wordB: String(wordB).trim(),
      meaningA: String(findField(row, ['meaningA', 'meaninga', 'meaning_a', '释义A', '释义a']) || '').trim(),
      meaningB: String(findField(row, ['meaningB', 'meaningb', 'meaning_b', '释义B', '释义b']) || '').trim(),
      exampleA: String(findField(row, ['exampleA', 'examplea', 'example_a', '例句A', '例句a']) || '').trim(),
      exampleB: String(findField(row, ['exampleB', 'exampleb', 'example_b', '例句B', '例句b']) || '').trim(),
      tip: String(findField(row, ['tip', '辨析', '记忆技巧', '区分']) || '').trim(),
      tags: parseTags(findField(row, ['tags', '标签', '分类', 'tag']) || ''),
      difficulty: mapDifficulty(findField(row, ['difficulty', '难度']) || '中等')
    });
  }
  return converted;
}

function findField(row, names) {
  for (const name of names) {
    if (row[name] !== undefined && row[name] !== null && String(row[name]).trim() !== '') {
      return row[name];
    }
  }
  return '';
}

function parseTags(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    return val.split(/[,，;；\s]+/).filter(Boolean);
  }
  return [];
}

function mapDifficulty(val) {
  const v = String(val).toLowerCase();
  if (v.includes('简单') || v.includes('easy') || v === '⭐' || v === '1') return '简单';
  if (v.includes('困难') || v.includes('hard') || v === '⭐⭐⭐' || v === '3') return '困难';
  return '中等';
}

// Download CSV template
function downloadCSVTemplate() {
  const headers = ['单词A', '单词B', '释义A', '释义B', '例句A', '例句B', '辨析', '标签', '难度'];
  const example = [
    'affect', 'effect', '影响；感动（动词）', '效果；影响（名词）',
    'The weather affects my mood.', 'The effect was immediate.',
    'affect是动词，effect是名词', '拼写易混', '中等'
  ];
  const csvContent = '﻿' + headers.join(',') + '\n' + example.map(c => '"' + c + '"').join(',');
  downloadFile(csvContent, '单词导入模板.csv', 'text/csv;charset=utf-8');
}

// Download JSON template
function downloadJSONTemplate() {
  const template = [
    {
      wordA: 'affect',
      wordB: 'effect',
      meaningA: '影响；感动（动词）',
      meaningB: '效果；影响（名词）',
      exampleA: 'The weather affects my mood.',
      exampleB: 'The effect was immediate.',
      tip: 'affect是动词，effect是名词',
      tags: ['拼写易混'],
      difficulty: '中等'
    }
  ];
  downloadFile(JSON.stringify(template, null, 2), '单词导入模板.json', 'application/json');
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
