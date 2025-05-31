// #region Hero Block

const focusBtn = document.querySelector('.hero-button');
const overlay = document.getElementById('heroOverlay');
const subtitle = document.querySelector('.hero-subtitle');
const counter = document.getElementById('focusCount');

const BASE_COUNT = 10700;
const INCREMENT_PER_DAY = 40;
const STORAGE_KEY = 'focusCountData';

function loadFocusCount() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const lastUpdate = data.lastUpdate || Date.now();
  const storedCount = data.count || BASE_COUNT;

  const now = Date.now();
  const daysPassed = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
  const updatedCount = storedCount + daysPassed * INCREMENT_PER_DAY;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    count: updatedCount,
    lastUpdate: lastUpdate + daysPassed * 86400000
  }));

  return updatedCount;
}

function updateFocusCountDisplay(count) {
  counter.textContent = count;
}

let currentCount = loadFocusCount();
updateFocusCountDisplay(currentCount);

focusBtn.addEventListener('click', () => {
  overlay.classList.add('active');

  setTimeout(() => {
    overlay.classList.remove('active');
    subtitle.setAttribute('data-i18n', 'focus_success');
    loadLanguage(currentLang);
    focusBtn.style.backgroundColor = '#22c55e';
    focusBtn.disabled = true;

    currentCount++;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      count: currentCount,
      lastUpdate: JSON.parse(localStorage.getItem(STORAGE_KEY)).lastUpdate
    }));
    updateFocusCountDisplay(currentCount);
  }, 1200);
});

window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  hero.classList.add('visible');
});

// #endregion

// #region Availability Block

function startCountdown(durationInSeconds) {
  const timerElement = document.getElementById("timer");
  let remaining = durationInSeconds;

  const interval = setInterval(() => {
    const hours = String(Math.floor(remaining / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
    const seconds = String(remaining % 60).padStart(2, "0");

    timerElement.textContent = `${hours}:${minutes}:${seconds}`;

    if (remaining === 0) {
      clearInterval(interval);
    }

    remaining--;
  }, 1000);
}

startCountdown(3600);


// availability button
let totalUnits = 20;
let currentUnits = 2;

function updateUI() {
  const unitsLeftSpan = document.getElementById('units-left');
  const progressBar = document.getElementById('progress-bar');

  unitsLeftSpan.textContent = currentUnits;

  const percentage = (1 - currentUnits / totalUnits) * 100;
  progressBar.style.width = `${percentage}%`;
}

function simulateOrder() {
  const message = document.getElementById("sold-out-message");
  const button = document.querySelector('.availability__button');

  if (currentUnits > 0) {
    currentUnits--;
    updateUI();

    if (currentUnits === 0) {
    button.setAttribute('data-i18n', 'sold-out');
    button.textContent = translations['sold_out'];

      button.classList.add('unavailable');
    }
  } else if (button.classList.contains('unavailable')) {
    message.classList.add('visible');
    button.disabled = true;
    button.style.opacity = 0.6;
  } else {
  }
}

// #endregion

// #region Reviews Block

document.addEventListener("DOMContentLoaded", () => {
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2,
  });

  document.querySelectorAll('.testimonial').forEach(card => {
    testimonialObserver.observe(card);
  });

  const testimonialsList = document.querySelector('.testimonials__list');
  let isPaused = false;

  const elementsToClone = Array.from(testimonialsList.children);
  elementsToClone.forEach(el => {
    const clone = el.cloneNode(true);
    testimonialsList.appendChild(clone);
  });

  function autoScrollTestimonials() {
    if (!isPaused) {
      testimonialsList.scrollLeft += 1;

      if (testimonialsList.scrollLeft >= testimonialsList.scrollWidth / 2) {
        testimonialsList.scrollLeft = 0;
      }
    }
  }

  let scrollInterval = setInterval(autoScrollTestimonials, 20);

  testimonialsList.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  testimonialsList.addEventListener('mouseleave', () => {
    isPaused = false;
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2,
  });


  document.querySelectorAll('.testimonial').forEach(card => {
    testimonialObserver.observe(card);
  });

  const endText = document.getElementById('endText');
  if (endText) testimonialObserver.observe(endText);

  const testimonialsList = document.getElementById('carousel');
  let isPaused = false;

  const cards = Array.from(document.querySelectorAll('.testimonial'))
  .filter(el => !el.classList.contains('testimonial--end'));

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    testimonialsList.appendChild(clone);
  });

  function autoScrollTestimonials() {
    if (!isPaused) {
      testimonialsList.scrollLeft += 1;

      if (testimonialsList.scrollLeft >= testimonialsList.scrollWidth / 2) {
        testimonialsList.scrollLeft = 0;
      }
    }
  }

  testimonialsList.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  testimonialsList.addEventListener('mouseleave', () => {
    isPaused = false;
  });
});


// #endregion

// #region Gallery

const swiperContainer = document.querySelector('.swiper');

swiperContainer.addEventListener('mouseenter', () => {
  swiper.autoplay.stop();
});

swiperContainer.addEventListener('mouseleave', () => {
  swiper.autoplay.start();
});

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 800,
  // effect: 'fade',
  // fadeEffect: {
  //   crossFade: true
  // },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});

// #endregion

// #region Mini Test
const startBtn = document.getElementById('startFocusTest');
const statusBlock = document.getElementById('focusStatus');
const testBox = document.querySelector('.focus-test-box');

let startTime;
let hasClicked = false;

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startTest();
});

function startTest() {
  statusBlock.removeAttribute('data-i18n');
  statusBlock.textContent = '';
  statusBlock.className = 'focus-test__status';

  startBtn.disabled = true;
  hasClicked = false;

  startBtn.setAttribute('data-i18n', 'focus_test_waiting');
  loadLanguage(currentLang);

  const delay = 2000 + Math.random() * 4000;

  setTimeout(() => {
    statusBlock.setAttribute('data-i18n', 'focus_test_now');
    statusBlock.className = 'focus-test__status now';
    loadLanguage(currentLang);

    startTime = Date.now();

    const handler = () => {
      if (hasClicked) return;
      hasClicked = true;

      const reaction = (Date.now() - startTime) / 1000;

      if (reaction < 0.5) {
        statusBlock.setAttribute('data-i18n', 'focus_test_result_good');
        statusBlock.className = 'focus-test__status good';
      } else if (reaction < 1.0) {
        statusBlock.setAttribute('data-i18n', 'focus_test_result_medium');
        statusBlock.className = 'focus-test__status medium';
      } else {
        statusBlock.setAttribute('data-i18n', 'focus_test_result_bad');
        statusBlock.className = 'focus-test__status bad';
      }

      loadLanguage(currentLang);

      startBtn.disabled = false;
      startBtn.setAttribute('data-i18n', 'focus_test_retry');
      loadLanguage(currentLang);

      document.removeEventListener('click', handler);
      testBox.removeEventListener('click', handler);
    };

    document.addEventListener('click', handler);
    testBox.addEventListener('click', handler);
  }, delay);
}

// #endregion

// #region FAQ

document.querySelectorAll('.faq__question').forEach((btn) => {
  btn.addEventListener('click', () => {
    
    const currentItem = btn.closest('.faq__item');

    if (currentItem.classList.contains('active')) {
      currentItem.classList.remove('active');
      return;
    }

    document.querySelectorAll('.faq__item.active').forEach((item) => {
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
      item.classList.remove('active');
    });

    
    currentItem.classList.add('active');
  });
});


// #endregion

// #region Order
const successIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M5 13l4 4L19 7" />
</svg>`;

const errorIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M6 18L18 6M6 6l12 12" />
</svg>`;

const TOKEN = CONFIG.TOKEN;
const CHAT_ID = CONFIG.CHAT_ID;
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const form = document.getElementById('orderForm');
const messageBox = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const comment = this.comment.value.trim();
    const button = this.querySelector('button');

    messageBox.className = '';
    messageBox.textContent = '';
    button.disabled = true;
    button.textContent = translations['sending'];

    this.name.classList.remove('error');
    this.email.classList.remove('error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('error', translations['invalid_email']);
      this.email.classList.add('error');
      form.email.focus();
      resetButton();
      return;
    }

    const hasDigits = /\d/.test(name); 

    if (name === '') {
      showMessage('error', translations['empty_name']);
      this.name.classList.add('error');
      form.name.focus();
      resetButton();
      return;
    }

    if (hasDigits) {
      showMessage('error', translations['error_digits']);
      this.name.classList.add('error');
      form.name.focus();
      resetButton();
      return;
    }

    this.name.addEventListener('input', () => this.name.classList.remove('error'));
    this.email.addEventListener('input', () => this.email.classList.remove('error'));


    const message = `
🔮 Новый заказ фокуса:
👤 Имя: ${name}
📧 Email: ${email}
💬 Комментарий: ${comment || '—'}
`;

    fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    })
      .then((res) => {
        if (res.ok) {
          showMessage('success', translations['sent_success']);
          form.reset();
        } else {
          throw new Error('Ошибка сети');
        }
      })
      .catch(() => {
        showMessage('error', translations['send_error']);
      })
      .finally(() => {
        resetButton();
      });

    function resetButton() {
      button.disabled = false;
      button.textContent = translations['order_submit'];
    }
  });
}

function showMessage(type, text) {
  messageBox.innerHTML = `
    <span class="form-message__icon">${type === 'success' ? successIcon : errorIcon}</span>
    <span>${text}</span>
  `;

  messageBox.className = `form-message ${type} show`;
  setTimeout(() => {
    messageBox.classList.remove('show');
  }, 5000);
}

// #endregion

// #region Final Interactives

const scrollUpButton = document.getElementById('scrollUp');

window.addEventListener('scroll', () => {
  if (window.scrollY > 900) {
    scrollUpButton.classList.add('show');
  } else {
    scrollUpButton.classList.remove('show');
  }
});

scrollUpButton.addEventListener('click', () => {
  window.scrollTo({
    top:0,
    behavior: "smooth",
  });
});

const animatedElems = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElems.forEach(elem => observer.observe(elem));

// custom smooth scroll
function smoothScrollTo(targetSelector, duration = 1000) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // [0, 1]
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, startY + distance * ease);

    if (elapsed < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(scrollStep);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetSelector = link.getAttribute('href');
    if (targetSelector.length > 1) {
      smoothScrollTo(targetSelector, 1500);
    }
  });
});

// focus bar
let pendingFocus = 0;
let focusLevel = 62;
let lastActivityTime = Date.now();

const focusEl = document.getElementById('focusLevel');
const barFill = document.getElementById('focusBarFill');

window.addEventListener('scroll', () => {
  pendingFocus += 0.02;
  lastActivityTime = Date.now();
});

setInterval(() => {
  if (pendingFocus >= 1) {
    const toAdd = Math.floor(pendingFocus);
    updateFocus(toAdd);
    pendingFocus -= toAdd;
  }
}, 200);

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    updateFocus(1);
    lastActivityTime = Date.now();
  });
});

function testPassedSuccessfully() {
  updateFocus(10);
  lastActivityTime = Date.now();
}

setInterval(() => {
  const now = Date.now();
  if (now - lastActivityTime > 10000) {
    updateFocus(-1);
  }
}, 5000);

function updateFocus(delta) {
  focusLevel = Math.max(0, Math.min(100, focusLevel + delta));
  focusEl.textContent = Math.round(focusLevel) + '%';
  barFill.style.width = focusLevel + '%';
}

// #endregion

// #region languages 
const DEFAULT_LANG = 'en';
let currentLang = DEFAULT_LANG;
window.translations = {};

setTimeout(() => {
  langBtn.classList.add('hint');
}, 600);

async function loadLanguage(lang) {
  try {
    const res = await fetch(`./i18n/${lang}.json`);
    const data = await res.json();
    window.translations = data;
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = data[key];
        } else {
          el.innerHTML = data[key];
        }
      }
    });

    updateLangActive(lang);

    localStorage.setItem('lang', lang);

    updateDynamicTranslations();

  } catch (err) {
    console.error(`Ошибка при загрузке языка "${lang}":`, err);
  }
}

function updateLangActive(lang) {
  document.querySelectorAll('[data-lang-select]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang-select') === lang) {
      btn.classList.add('active');
    }
  });
}

function updateDynamicTranslations() {
  const focusBtn = document.querySelector('.hero-button');
  if (focusBtn && focusBtn.disabled) {
    focusBtn.textContent = translations['focus_activated'] || 'Activated!';
  }

  const orderBtn = document.querySelector('.availability__button');
  if (orderBtn && orderBtn.classList.contains('unavailable')) {
    orderBtn.textContent = translations['unavailable_text'] || 'Too late!';
  }

  const soldOutMessage = document.getElementById('sold-out-message');
  if (soldOutMessage && soldOutMessage.classList.contains('visible')) {
    soldOutMessage.textContent = translations['sold_out_message'] || 'Focus is unavailable.';
  }

  const submitBtn = document.querySelector('.order__form button[type="submit"]');
  if (submitBtn && !submitBtn.disabled) {
    submitBtn.textContent = translations['order_submit'] || 'Order focus';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
  loadLanguage(savedLang);

  document.querySelectorAll('[data-lang-select]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang-select');
      loadLanguage(lang);
    });
  });

  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-dropdown')) {
        langMenu.classList.remove('show');
      }
    });
  }
});
// #endregion
