'use strict';

const body = document.querySelector('body');

function addNotification(text, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.innerText = text;
  body.append(div);
}

let firstClick = false;
let secondClick = false;

const firstPromise = new Promise((resolve, reject) => {
  const delay = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  body.addEventListener('click', () => {
    clearTimeout(delay);

    resolve('First promise was resolved');

    firstClick = true;
  });
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('contextmenu', e => {
    e.preventDefault();

    resolve('Second promise was resolved');

    secondClick = true;
  });
});

const thirdPromise = new Promise(resolve => {
  body.addEventListener('click', e => {
    if (firstClick === true && secondClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    addNotification(result, 'success');
  })
  .catch(warning => {
    addNotification(warning, 'warning');
  });

secondPromise.then(result => {
  addNotification(result, 'success');
});

thirdPromise.then(result => {
  addNotification(result, 'success');
});
