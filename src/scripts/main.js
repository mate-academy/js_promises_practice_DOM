'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = () => {
    reject(new Error('First promise was rejected'));
  };

  document.addEventListener('click', () => {
    resolve();
    clearTimeout(timerId);
  });

  setTimeout(timerId, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise(resolve => {
  let isClickedLeft = false;
  let isClickedRight = false;

  document.addEventListener('click', () => {
    isClickedLeft = true;

    // Проверяем условие при каждом клике
    if (isClickedLeft && isClickedRight) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isClickedRight = true;

    if (isClickedLeft && isClickedRight) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('success');
    message.innerText = 'First promise was resolved';

    document.body.append(message);
  })
  .catch(() => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('warning');
    message.innerText = 'First promise was rejected';

    document.body.append(message);
  });

secondPromise
  .then(() => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('success');
    message.innerText = 'Second promise was resolved';

    document.body.append(message);
  });

thirdPromise
  .then(() => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('success');
    message.innerText = 'Third promise was resolved';

    document.body.append(message);
  });
