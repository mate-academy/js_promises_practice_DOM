'use strict';

const WAIT = 3000;
const body = document.body;

function createElemPromise(result) {
  const elem = document.createElement('div');

  elem.setAttribute('data-qa', 'notification');

  if (result) {
    elem.className = result;
  }

  return elem;
}

const elemFirstPromise = createElemPromise();
const elemSecondPromise = createElemPromise('success');
const elemThirdPromise = createElemPromise('success');

const firstPromise = new Promise((resolve, reject) => {
  function clickHandler() {
    clearTimeout(timer);
    resolve();
  }

  const timer = setTimeout(() => {
    body.removeEventListener('click', clickHandler);
    reject(new Error());
  }, WAIT);

  body.addEventListener('click', clickHandler);
});

firstPromise.then(
  () => {
    elemFirstPromise.className = 'success';
    elemFirstPromise.textContent = 'First promise was resolved';
    body.append(elemFirstPromise);
  },

  () => {
    elemFirstPromise.className = 'error';
    elemFirstPromise.textContent = 'First promise was rejected';
    body.append(elemFirstPromise);
  },
);

function createPromiseOnClick(typeClick) {
  return new Promise((resolve) => {
    body.addEventListener(typeClick, () => {
      resolve();
    });
  });
}

const promiseLeftClick = createPromiseOnClick('click');
const promiseRightClick = createPromiseOnClick('contextmenu');

const secondPromise = Promise.any([promiseLeftClick, promiseRightClick]);

secondPromise.then(() => {
  elemSecondPromise.textContent = 'Second promise was resolved';
  body.append(elemSecondPromise);
});

const thirdPromise = Promise.all([promiseLeftClick, promiseRightClick]);

thirdPromise.then(() => {
  elemThirdPromise.textContent = 'Third promise was resolved';
  body.append(elemThirdPromise);
});
