'use strict';

const body = document.body;
const bodyWh = document.documentElement.clientWidth;

const firstPromise = new Promise((resolve, reject) => {
  body.onclick = (e) => {
    const clickPosition = e.clientX;
    const bodyLeft = bodyWh / 2;

    if (clickPosition < bodyLeft) {
      resolve();
    }
  };

  setTimeout(() => {
    reject(new Error);
  }, 3000);
});

firstPromise.catch( () => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'First promise was rejected';
  div.classList.add('error');

  document.body.append(div);
});

firstPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'First promise was resolved';
  div.classList.add('success');

  document.body.append(div);
});

/* ================================================= */

new Promise((resolve) => {
  body.addEventListener('click', (e) => {
    resolve();
  });
}).then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'Second promise was resolved';
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
      resolve();
    }

    if (clickPos > leftBody) {
      rigtH = true;
    }

    if (clickPos < leftBody) {
      lefT = true;
    }
  });
});

thirdPromise.then((res) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'Third promise was resolved';
  div.classList.add('error');

  document.body.append(div);
});
