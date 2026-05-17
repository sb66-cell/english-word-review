// Review page logic

let reviewQueue = [];
let currentIndex = 0;
let isFlipped = false;
let reviewedToday = 0;

// Initialize
(function init() {
  const dueWords = getDueWords();
  document.getElementById('due-total').textContent = dueWords.length;

  if (dueWords.length === 0) {
    document.getElementById('pre-review-message').textContent = '✨ 太棒了！暂时没有需要复习的单词~ 去添加一些新词吧！';
    document.getElementById('btn-start').textContent = '➕ 去添加单词';
    document.getElementById('btn-start').onclick = function() { window.location.href = 'manage.html'; };
  }
})();

function startReview() {
  reviewQueue = getDueWords();
  // Shuffle
  for (let i = reviewQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reviewQueue[i], reviewQueue[j]] = [reviewQueue[j], reviewQueue[i]];
  }

  if (reviewQueue.length === 0) {
    window.location.href = 'manage.html';
    return;
  }

  currentIndex = 0;
  reviewedToday = 0;
  isFlipped = false;
  document.getElementById('pre-review').style.display = 'none';
  document.getElementById('review-state').style.display = 'block';
  document.getElementById('completion-state').style.display = 'none';
  showCard();
}

function showCard() {
  if (currentIndex >= reviewQueue.length) {
    finishReview();
    return;
  }

  const word = reviewQueue[currentIndex];
  isFlipped = false;
  const card = document.getElementById('flashcard');
  card.classList.remove('flipped');
  document.getElementById('rating-area').style.display = 'none';

  document.getElementById('word-a').textContent = word.wordA;
  document.getElementById('word-b').textContent = word.wordB;

  // Build back content
  const backHtml = `
    <div class="word-pair" style="font-size:1.4rem;">
      <span>${word.wordA}</span>
      <span class="word-divider">—</span>
      <span>${word.wordB}</span>
    </div>
    <div class="meaning"><strong>${word.wordA}:</strong> ${word.meaningA}</div>
    <div class="meaning"><strong>${word.wordB}:</strong> ${word.meaningB}</div>
    <div class="example">📖 ${word.exampleA}</div>
    <div class="example">📖 ${word.exampleB}</div>
    ${word.tip ? `<div class="tip-box">💡 ${word.tip}</div>` : ''}
    <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
      <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();speakWord('${word.wordA}')">🔊 ${word.wordA}</button>
      <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();speakWord('${word.wordB}')">🔊 ${word.wordB}</button>
    </div>
  `;
  document.getElementById('card-back-content').innerHTML = backHtml;

  // Progress
  updateProgress();
}

function flipCard() {
  if (currentIndex >= reviewQueue.length) return;
  const card = document.getElementById('flashcard');
  isFlipped = !isFlipped;
  if (isFlipped) {
    card.classList.add('flipped');
    document.getElementById('rating-area').style.display = 'block';
  } else {
    card.classList.remove('flipped');
    document.getElementById('rating-area').style.display = 'none';
  }
}

function rateCard(quality) {
  if (!isFlipped) return;

  const word = reviewQueue[currentIndex];
  const updates = calculateNextReview(word, quality);
  updateWord(word.id, updates);
  reviewedToday++;

  currentIndex++;
  showCard();
}

function updateProgress() {
  const done = currentIndex;
  const total = reviewQueue.length;
  document.getElementById('progress-text').textContent = `${done}/${total}`;
  document.getElementById('progress-fill').style.width = (total > 0 ? (done / total) * 100 : 0) + '%';
}

function pauseReview() {
  // Save current progress is already saved per card
  window.location.href = 'index.html';
}

function finishReview() {
  const today = new Date().toISOString().split("T")[0];
  addCheckin(today, reviewedToday);

  document.getElementById('review-state').style.display = 'none';
  document.getElementById('completion-state').style.display = 'block';
  document.getElementById('completion-msg').textContent = `你今天复习了 ${reviewedToday} 组易混词！`;
  document.getElementById('completion-stars').textContent = '⭐'.repeat(Math.min(reviewedToday, 10));

  // Confetti + pets celebration
  launchConfetti();
  if (window.petsCelebrate) { setTimeout(petsCelebrate, 500); }
}

function launchConfetti() {
  const colors = ['#FF8C69', '#FFB3B3', '#FFD54F', '#81C784', '#90CAF9', '#CE93D8', '#FFAB91'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = -(Math.random() * 40 + 10) + 'px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 10 + 6) + 'px';
      confetti.style.height = (Math.random() * 10 + 6) + 'px';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 40);
  }
}
