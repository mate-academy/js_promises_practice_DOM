'use strict';

function createNotification(result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${result[0]}">
      ${result[1]}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  const failure = ['error', 'First promise was rejected'];

  document.body.addEventListener('click', () => {
    resolve(['success', 'First promise was resolved']);
  });

  setTimeout(() => {
    reject(failure);
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.body.addEventListener('mousedown', () => {
    resolve(['success', 'Second promise was resolved']);
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve(['success', 'Third promise was resolved']);
    }
  });
});

firstPromise
  .then(createNotification)
  .catch(createNotification);

secondPromise
  .then(createNotification);

thirdPromise
  .then(createNotification);
