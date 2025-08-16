'use strict';

// Перший проміс
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button !== 0) {
        return;
      }
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
  let clickLeft = false;
  let clickRight = false;
  let resolved = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clickLeft = true;
    }

    if (clickLeft && clickRight && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      clickRight = true;
    }

    if (clickLeft && clickRight && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
    }
  });
});

// Функція для відображення повідомлення
function showMessage(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (message instanceof Error) {
    div.classList.add('error');
    div.textContent = message.message;
  } else {
    div.classList.add('success');
    div.textContent = message;
  }
  document.body.appendChild(div);
}

// Обробка промісів
firstPromise.then(showMessage).catch(showMessage);
secondPromise.then(showMessage).catch(showMessage);
thirdPromise.then(showMessage).catch(showMessage);
