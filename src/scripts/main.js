'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

function createNotification(data, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = data;
  document.body.append(div);
}

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClick;
  let isRightClick;

  function checkBothClicks() {
    if (isLeftClick && isRightClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    isLeftClick = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', () => {
    isRightClick = true;
    checkBothClicks();
  });
});

firstPromise
  .then((data) => createNotification(data, 'success'))
  .catch((data) => createNotification(data.message, 'error'));
secondPromise.then((data) => createNotification(data, 'success'));
thirdPromise.then((data) => createNotification(data, 'success'));
