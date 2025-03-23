'use strict';

const body = document.body;
const bodyWh = document.documentElement.clientWidth;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', (e) => {
    const clickPosition = e.clientX;
    const bodyLeft = bodyWh / 2;

    if (clickPosition < bodyLeft) {
      resolve('First promise was resolved');
    }
  })

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

});

firstPromise.catch((mess) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = mess;
  div.classList.add('error');

  document.body.append(div);
});

firstPromise.then((message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.classList.add('success');

  document.body.append(div);
});

/* ================================================= */

new Promise((resolve) => {
  body.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });
}).then((message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.classList.add('success');

  document.body.append(div);
});

/* ================================================= */

let lefT = false;
let rigtH = false;

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', (e) => {
    const leftBody = bodyWh / 2;
    const clickPos = e.clientX;

    if (
      (lefT === true && clickPos > leftBody) ||
      (rigtH === true && clickPos < leftBody)
    ) {
      resolve('Third promise was resolved');
    }

    if (clickPos > leftBody) {
      rigtH = true;
    }

    if (clickPos < leftBody) {
      lefT = true;
    }
  });
});

thirdPromise.then((lastValue) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = lastValue;
  div.classList.add('error');

  document.body.append(div);
});
