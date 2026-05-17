// SM-2 Spaced Repetition Algorithm
// Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
//
// Standard SM-2 intervals:
//   I(1) = 1 day
//   I(2) = 6 days
//   I(n) = I(n-1) * EF  (for n > 2)
//
// EF is only modified on quality >= 3.
// On quality < 3, item resets to I(1)=1 with EF unchanged.

function calculateNextReview(word, quality) {
  // quality: 0-5
  // 0 = complete blackout, 5 = perfect recall
  let { easeFactor, interval, repetitions } = word;
  const q = Math.max(0, Math.min(5, quality));

  if (q >= 3) {
    // Correct response — apply SM-2 intervals
    if (repetitions === 0) {
      interval = 1;            // I(1) = 1 day
    } else if (repetitions === 1) {
      interval = 6;            // I(2) = 6 days
    } else {
      interval = Math.round(interval * easeFactor);  // I(n) = I(n-1) * EF
    }
    repetitions += 1;

    // Update ease factor only on success
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
  } else {
    // Incorrect response — reset without changing EF
    repetitions = 0;
    interval = 1;
  }

  // Calculate next review date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  const nextReview = nextDate.toISOString().split("T")[0];

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    nextReview,
    lastReview: new Date().toISOString().split("T")[0],
    lastQuality: q
  };
}

// Get quality label for display
function getQualityLabel(quality) {
  const labels = {
    0: "完全忘记 😵",
    1: "有印象但想不起来 😣",
    2: "勉强记得一部分 🤔",
    3: "基本记得，稍有犹豫 🙂",
    4: "记得很清楚，很顺畅 😊",
    5: "完美！滚瓜烂熟 🎉"
  };
  return labels[quality] || "";
}

// Get interval text for display
function getIntervalText(interval) {
  if (interval === 0) return "今天";
  if (interval === 1) return "1 天后";
  if (interval < 7) return `${interval} 天后`;
  if (interval < 30) return `${Math.floor(interval / 7)} 周后`;
  if (interval < 365) return `${Math.floor(interval / 30)} 个月后`;
  return `${Math.floor(interval / 365)} 年后`;
}
