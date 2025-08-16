'use strict';

// Перший проміс
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

// Другий проміс
const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

// Третій проміс
const thirdPromise = new Promise((resolve) => {
  let countLeft = 0;
  let countRight = 0;

  document.addEventListener('click', () => {
    countLeft++;

    if (countLeft > 0 && countRight > 0) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    countRight++;

    if (countLeft > 0 && countRight > 0) {
      resolve('Third promise was resolved');
    }
  });
});

// Функція для відображення повідомлення
function showMessage(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(message instanceof Error ? 'error' : 'success');
  div.textContent = message;
  document.body.appendChild(div);
}

// Обробка промісів
firstPromise.then(showMessage).catch(showMessage);
secondPromise.then(showMessage).catch(showMessage);
thirdPromise.then(showMessage).catch(showMessage);
