'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

div.dataset.qa = 'notification';

let firstClick = false;
let secondClick = false;

const firstPromise = new Promise((resolve, reject) => {
  const delay = setTimeout(() => {
    div.classList.add('warning');
    div.innerText = 'First promise was rejected';
    body.append(div);

    reject(div.innerText);
  }, 3000);

  body.addEventListener('click', () => {
    clearTimeout(delay);
    div.classList.add('success');
    div.innerText = 'First promise was resolved';
    body.append(div);

    resolve(div.innerText);

    firstClick = true;
  });
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('contextmenu', e => {
    e.preventDefault();
    div.classList.add('success');
    div.innerText = 'Second promise was resolved';
    body.append(div);

    resolve(div.innerText);

    secondClick = true;
  });
});

const thirdPromise = new Promise(resolve => {
  body.addEventListener('click', e => {
    if (firstClick === true && secondClick === true) {
      div.classList.add('success');
      div.innerText = 'Third promise was resolved';
      body.append(div);

      resolve(div.innerText);
    }
  });
});

firstPromise
  .then()
  .catch();

secondPromise.then();

thirdPromise.then();
