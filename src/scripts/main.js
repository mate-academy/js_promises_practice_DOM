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
    reject(addNotification('First promise was rejected', 'warning'));
  }, 3000);

  body.addEventListener('click', () => {
    clearTimeout(delay);

    resolve(addNotification('First promise was resolved', 'success'));

    firstClick = true;
  });
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('contextmenu', e => {
    e.preventDefault();

    resolve(addNotification('Second promise was resolved', 'success'));

    secondClick = true;
  });
});

const thirdPromise = new Promise(resolve => {
  body.addEventListener('click', e => {
    if (firstClick === true && secondClick === true) {
      resolve(addNotification('Third promise was resolved', 'success'));
    }
  });
});

firstPromise
  .then()
  .catch();

secondPromise.then();

thirdPromise.then();
