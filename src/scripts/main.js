'use strict';

document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

function resultMessage(result, value) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.className = result;

  message.textContent = result === 'success'
    ? `${value} promise was resolved`
    : `${value} promise was rejected`;

  document.body.append(message);
}

function leftMouseButtonClicked() {
  return new Promise(resolve => {
    document.addEventListener('mousedown', e => {
      if (e.button === 0) {
        resolve('success');
      }
    });
  });
}

function rightMouseButtonClicked() {
  return new Promise(resolve => {
    document.addEventListener('mousedown', e => {
      if (e.button === 2) {
        resolve('success');
      }
    });
  });
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    resolve('success');
  });

  setTimeout(() => {
    reject(new Error('warning'));
  }, 3000);
});

const promise2 = Promise.race(
  [leftMouseButtonClicked(), rightMouseButtonClicked()]
);

const promise3 = Promise.all(
  [leftMouseButtonClicked(), rightMouseButtonClicked()]
);

promise1
  .then(result => resultMessage(result, 'First'))
  .catch(error => resultMessage(error, 'First'));

promise2
  .then(result => resultMessage(result, 'Second'));

promise3
  .then(result => resultMessage(result[0], 'Third'));
