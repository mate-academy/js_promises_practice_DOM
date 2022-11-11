'use strict';

const body = document.querySelector('body');
const success = 'success';
const warning = 'warning';

const firstPromise = new Promise((resolve, reject) => {
  const click = 'click';

  body.addEventListener(click, () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const clickRight = 'contextmenu';
  const click = 'click';

  body.addEventListener('mousedown', () => {
    if (click && clickRight) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  let clickLeft = false;
  let clickRight = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clickLeft = true;
    }

    if (e.button === 2) {
      clickRight = true;
    }

    if (clickLeft === true && clickRight === true) {
      resolve('Third promise was resolved');
    }
  });
});

function massagePromise(message, claasMessage) {
  const massege = document.createElement('div');

  massege.classList = claasMessage;
  massege.setAttribute('data-qa', 'notification');
  massege.textContent = message;
  body.append(massege);
}

firstPromise
  .then((text) => {
    massagePromise(text, success);
  })
  .catch((text) => {
    massagePromise(text, warning);
  });

secondPromise
  .then((text) => {
    massagePromise(text, success);
  });

thirdPromise
  .then((text) => {
    massagePromise(text, success);
  });
