'use strict';

const wrapper = document.createElement('div');

wrapper.className = 'wrapper';
document.body.append(wrapper);

function creatingMessage(message, className) {
  const p = document.createElement('div');

  p.className = 'message';
  p.classList.add(className);
  p.dataset.qa = 'notification';
  p.textContent = message;
  wrapper.append(p);
};

const firstPromis = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromis
  .then(data => creatingMessage(data, 'success'))
  .catch(err => creatingMessage(err, 'warning'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(data => creatingMessage(data, 'success'));

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    };

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(data => creatingMessage(data, 'success'));
