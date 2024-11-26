'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((data) => {
    createNotification('success', data);
  })
  .catch((data) => {
    createNotification('error', data);
  });

const secondPromise = new Promise((resolve) => {
  const onClick = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

secondPromise
  .then((data) => {
    createNotification('success', data);
  })
  .catch((data) => {
    createNotification('error', data);
  });

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  const checkBothClicks = () => {
    if (rightClick && leftClick) {
      resolve(`Third promise was resolved only after
 both left and right clicks happened`);
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    checkBothClicks();
  });
});

thirdPromise
  .then((data) => {
    createNotification('success', data);
  })
  .catch((data) => {
    createNotification('error', data);
  });

function createNotification(clas, text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = clas;
  div.textContent = text;
  document.body.appendChild(div); // Додаємо елемент до DOM
}
