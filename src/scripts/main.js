'use strict';

// --- FIRST PROMISE: Гонка між кліком та таймаутом ---
const firstPromise = new Promise((resolve, reject) => {
  // 1. Створюємо таймер на 3 секунди.
  const timeoutId = setTimeout(() => {
    // Якщо за 3с проміс не виконався через клік, викликаємо reject.
    reject(new Error('First promise was rejected'));
  }, 3000);

  // Використовуємо назву обробника, що не конфліктує з іншими назвами
  const onFirstPromiseClick = (e) => {
    // 2. Перевіряємо на лівий клік (код 0).
    if (e.button === 0) {
      // 3. Скасовуємо таймер відхилення, бо успіх стався вчасно.
      clearTimeout(timeoutId);
      // 4. Видаляємо слухач, щоб не "засмічувати" пам'ять браузера.
      document.removeEventListener('click', onFirstPromiseClick);
      // 5. Виконуємо проміс успішно.
      resolve('First promise was resolved');
    }
  };

  // 6. Починаємо чекати на клік.
  document.addEventListener('click', onFirstPromiseClick);
});

// --- SECOND PROMISE: Реакція на будь-який перший клік ---
const secondPromise = new Promise((resolve) => {
  const onSecondPromiseClick = (e) => {
    // 1. Забороняємо стандартне контекстне меню браузера.
    e.preventDefault();
    // 2. Видаляємо обидва типи слухачів одночасно.
    document.removeEventListener('click', onSecondPromiseClick);
    document.removeEventListener('contextmenu', onSecondPromiseClick);
    // 3. Завершуємо проміс.
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', onSecondPromiseClick);
  document.addEventListener('contextmenu', onSecondPromiseClick);
});

// --- THIRD PROMISE: Очікування комбінації лівого та правого кліків ---
const thirdPromise = new Promise((resolve) => {
  let leftClickDone = false;
  let rightClickDone = false;

  // 1. Функція перевірки стану обох кліків.
  function checkClicks() {
    if (leftClickDone && rightClickDone) {
      // Текст повідомлення в точності відповідає очікуванням тестів.
      resolve('Third promise was resolved');
    }
  }

  const onLeftClick = (e) => {
    if (e.button === 0) {
      leftClickDone = true;
      document.removeEventListener('click', onLeftClick);
      checkClicks();
    }
  };

  const onRightClick = (e) => {
    if (e.button === 2) {
      e.preventDefault(); // Приховуємо меню браузера.
      rightClickDone = true;
      document.removeEventListener('contextmenu', onRightClick);
      checkClicks();
    }
  };

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

// --- ВІДОБРАЖЕННЯ РЕЗУЛЬТАТІВ В DOM (БЕЗ ДОПОМІЖНИХ ФУНКЦІЙ) ---

// Обробка 1-го промісу
firstPromise
  .then((msg) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('message', 'success');
    div.textContent = msg;
    document.body.appendChild(div);
  })
  .catch((err) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('message', 'error');
    div.textContent = err.message;
    document.body.appendChild(div);
  });

// Обробка 2-го промісу
secondPromise
  .then((msg) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('message', 'success');
    div.textContent = msg;
    document.body.appendChild(div);
  })
  .catch(() => {}); // Порожній catch для стабільності

// Обробка 3-го промісу
thirdPromise
  .then((msg) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('message', 'success');
    div.textContent = msg;
    document.body.appendChild(div);
  })
  .catch(() => {});
