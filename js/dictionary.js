// Dictionary API integration for expanding related words
// Uses: Free Dictionary API + Datamuse API

const DICT_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DATAMUSE_API = 'https://api.datamuse.com/words';

// Cache to avoid repeated API calls
const expansionCache = {};

async function expandWord(word) {
  const key = word.toLowerCase().trim();
  if (expansionCache[key]) return expansionCache[key];

  const result = { synonyms: [], antonyms: [], related: [], definition: '', phonetic: '' };

  try {
    // Fetch from Datamuse in parallel
    const [synRes, antRes, relRes] = await Promise.all([
      fetch(`${DATAMUSE_API}?rel_syn=${encodeURIComponent(key)}&max=8`).then(r => r.json()).catch(() => []),
      fetch(`${DATAMUSE_API}?rel_ant=${encodeURIComponent(key)}&max=8`).then(r => r.json()).catch(() => []),
      fetch(`${DATAMUSE_API}?ml=${encodeURIComponent(key)}&max=10`).then(r => r.json()).catch(() => [])
    ]);

    result.synonyms = synRes.map(w => w.word);
    result.antonyms = antRes.map(w => w.word);
    result.related = relRes.filter(w => w.word.toLowerCase() !== key).map(w => w.word).slice(0, 8);

    // Fetch definition + phonetics from Free Dictionary API
    try {
      const defRes = await fetch(DICT_API + encodeURIComponent(key));
      if (defRes.ok) {
        const data = await defRes.json();
        if (data && data[0]) {
          const entry = data[0];
          // Phonetic
          const phonetic = entry.phonetics?.find(p => p.text) || entry.phonetics?.[0];
          if (phonetic?.text) result.phonetic = phonetic.text;

          // Definition
          const meanings = entry.meanings || [];
          const defs = [];
          for (const m of meanings) {
            for (const d of (m.definitions || []).slice(0, 2)) {
              defs.push(`(${m.partOfSpeech}) ${d.definition}`);
            }
          }
          result.definition = defs.slice(0, 3).join('; ');
        }
      }
    } catch (e) {
      // Silently fail for definition
    }
  } catch (e) {
    console.warn('Dictionary API error:', e);
  }

  expansionCache[key] = result;
  return result;
}

async function expandWordPair(wordA, wordB) {
  const [dataA, dataB] = await Promise.all([expandWord(wordA), expandWord(wordB)]);
  return { wordA: dataA, wordB: dataB };
}

function clearExpansionCache() {
  for (const k in expansionCache) delete expansionCache[k];
}
