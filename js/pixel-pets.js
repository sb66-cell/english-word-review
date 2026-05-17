// Cute Companion Pets — emoji-based with smooth animations
// 🐱 Cat (left) | 🐶 Dog (right) | 🐤 Bird (top-right)
console.log('🐱🐶🐤 Cute pets loading...');

(function() {
  var petsReady = false;

  function createPet(emoji, className, bubbleClass) {
    var el = document.createElement('div');
    el.className = 'cute-pet ' + className;
    el.textContent = emoji;
    el.title = '摸摸我~';
    document.body.appendChild(el);

    var bubble = document.createElement('div');
    bubble.className = 'pet-bubble ' + bubbleClass;
    bubble.id = bubbleClass;
    document.body.appendChild(bubble);

    return { el: el, bubble: bubble };
  }

  var cat = createPet('🐱', 'pet-cat', 'cat-bubble');
  var dog = createPet('🐶', 'pet-dog', 'dog-bubble');
  var bird = createPet('🐤', 'pet-bird', 'bird-bubble');

  petsReady = true;

  // Show speech bubble
  function speak(pet, text, duration) {
    if (!text) return;
    pet.bubble.textContent = text;
    pet.bubble.classList.add('show');
    clearTimeout(pet._speechTimer);
    pet._speechTimer = setTimeout(function() {
      pet.bubble.classList.remove('show');
    }, duration || 3500);
  }

  // --- Daily messages ---
  var catMessages = [
    '喵~ 又是元气满满的一天！☀️',
    '喵呜！我们一起背单词吧~ 📝',
    '呼噜呼噜... 你好认真呀！💚',
    '喵？这个词我也会了！😸',
    '休息一下摸摸我吧~ ✨',
    '喵~ 坚持就是胜利！💪',
    '今天的你比昨天更厉害！🌟',
    '喵呜~ 学习累了就看看我~ 🌿'
  ];

  var dogMessages = [
    '汪！冲冲冲！今天也要加油！🔥',
    '汪汪！这个单词我记住了！🎯',
    '呜~ 我也想学英语呢~ 📖',
    '汪！摇尾巴为你打气！💨',
    '嘿嘿~ 你好棒呀！⭐',
    '汪汪汪！每天都来学习吧！🌻',
    '呜汪！你是我见过最努力的人！🏆',
    '汪~ 休息是为了走更远的路~ 🍀'
  ];

  var birdMessages = [
    '叽叽！早起学习真棒！🌅',
    '啾~ 别忘了复习哦~ 📋',
    '叽！今天也来打卡吧！✅',
    '啾啾！知识就是力量！📚',
    '叽~ 飞过高山就像攻克难题！⛰️'
  ];

  // --- Greeting based on time of day ---
  function getTimeGreeting() {
    var h = new Date().getHours();
    if (h < 6) return { cat: '喵... 好晚了，早点休息~ 🌙', dog: '呼... 汪也要睡了... 😴', bird: null };
    if (h < 9) return { cat: '早安喵！新的一天！☀️', dog: '汪！早上好！精神满满！💪', bird: '叽叽！早安！🌅' };
    if (h < 12) return { cat: '上午好喵~ 学习好时光！📝', dog: '汪！上午适合背单词！🔥', bird: '啾！阳光真好~ ☀️' };
    if (h < 14) return { cat: '午安喵~ 吃完饭要复习哦！🍱', dog: '汪！吃饱了有力气学习！💨', bird: '叽！午休一会儿吧~ 😴' };
    if (h < 18) return { cat: '下午好喵！来杯茶继续~ 🍵', dog: '汪！下午也加油！🌻', bird: '啾啾！坚持就是胜利！✨' };
    if (h < 22) return { cat: '晚上好喵~ 回顾今天的单词！🌆', dog: '汪！晚上也别松懈！🎯', bird: null };
    return { cat: '夜深了喵~ 注意休息哦！🌙', dog: '汪... 明天再战！😴', bird: null };
  }

  // --- Random speak cycle ---
  function randomSpeak() {
    var r = Math.random();
    if (r < 0.35) {
      var msg = catMessages[Math.floor(Math.random() * catMessages.length)];
      speak(cat, msg, 3500);
    } else if (r < 0.65) {
      var msg = dogMessages[Math.floor(Math.random() * dogMessages.length)];
      speak(dog, msg, 3500);
    } else if (r < 0.8) {
      var msg = birdMessages[Math.floor(Math.random() * birdMessages.length)];
      speak(bird, msg, 3000);
    } else if (r < 0.9) {
      // Rare: cat and dog talk to each other
      speak(cat, '喵？我们的小主人好努力呀！😸', 3000);
      setTimeout(function() {
        speak(dog, '汪汪！是呀是呀！摇尾巴！🦮', 3000);
      }, 1500);
    }
    // 10% chance: all stay quiet
    scheduleNext();
  }

  function scheduleNext() {
    var delay = 20000 + Math.random() * 25000;
    setTimeout(randomSpeak, delay);
  }

  // --- Click to pat pets ---
  function onPat(pet, emoji) {
    pet.el.style.animation = 'none';
    pet.el.offsetHeight; // force reflow
    pet.el.style.animation = 'pet-pat 0.8s ease';
    setTimeout(function() {
      pet.el.style.animation = '';
    }, 800);

    // Spawn floating hearts
    spawnHearts(pet.el);

    // Speak when patted
    var patMessages = {
      'cat': ['喵呜~ 好舒服！😻', '呼噜呼噜~ 💤', '喵！再摸摸！🥰', '嘻嘻~ 好开心！💚'],
      'dog': ['汪汪！好开心！🦮', '呜~ 最喜欢被摸了！💕', '汪！再摸一下嘛！🐾', '嘿嘿嘿~ 摇尾巴！✨'],
      'bird': ['叽叽！好痒！😆', '啾~ 飞走啦！🕊️', '叽！别闹~ 在学习呢！📖']
    };
    var msgs = patMessages[emoji] || ['好开心！'];
    var msg = msgs[Math.floor(Math.random() * msgs.length)];
    speak(pet, msg, 2000);
  }

  cat.el.addEventListener('click', function() { onPat(cat, 'cat'); });
  dog.el.addEventListener('click', function() { onPat(dog, 'dog'); });
  bird.el.addEventListener('click', function() { onPat(bird, 'bird'); });

  // --- Spawn hearts ---
  function spawnHearts(targetEl) {
    var rect = targetEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top;
    var hearts = ['💚', '💕', '✨', '💖', '🌟', '💛', '💝'];
    for (var i = 0; i < 6; i++) {
      setTimeout(function() {
        var heart = document.createElement('div');
        heart.className = 'float-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (cx + (Math.random() - 0.5) * 80) + 'px';
        heart.style.top = (cy + Math.random() * 20) + 'px';
        heart.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
        document.body.appendChild(heart);
        setTimeout(function() { if (heart.parentNode) heart.remove(); }, 3000);
      }, i * 80);
    }
  }

  // --- Public: Celebrate (called from review.js) ---
  window.petsCelebrate = function() {
    if (!petsReady) return;

    // All 3 pets jump
    [cat, dog, bird].forEach(function(pet) {
      pet.el.style.animation = 'pet-celebrate 1.2s ease';
      setTimeout(function() {
        pet.el.style.animation = '';
      }, 1200);
    });

    // Celebration messages
    speak(cat, '喵呜！！太厉害了！！🎉✨', 4500);
    setTimeout(function() {
      speak(dog, '汪汪汪！！完美！！🏆💚', 4500);
    }, 600);
    setTimeout(function() {
      speak(bird, '叽叽！！撒花！！🌸🌟', 4000);
    }, 1200);

    // Lots of hearts
    setTimeout(function() { spawnHearts(cat.el); }, 300);
    setTimeout(function() { spawnHearts(dog.el); }, 800);
  };

  // --- Initial greeting ---
  setTimeout(function() {
    var greetings = getTimeGreeting();
    if (greetings.cat) speak(cat, greetings.cat, 4000);
    setTimeout(function() {
      if (greetings.dog) speak(dog, greetings.dog, 4000);
    }, 1200);
    setTimeout(function() {
      if (greetings.bird) speak(bird, greetings.bird, 3500);
    }, 2400);
  }, 2500);

  // Start random speak cycle
  scheduleNext();

  console.log('🐱 Cat ready | 🐶 Dog ready | 🐤 Bird ready');
})();
