'use strict';

const bodyEl = document.body;

const firstPromise = new Promise((resolve, reject) => {
  let isFinished = false;

  bodyEl.addEventListener('click', () => {
    if (isFinished) {
      return;
    }

    isFinished = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (isFinished) {
      return;
    }

    isFinished = true;
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => {
    const divEl = document.createElement('div');

    divEl.classList.add('success');
    divEl.setAttribute('data-qa', 'notification');
    divEl.textContent = result;
    bodyEl.append(divEl);
  })
  .catch((error) => {
    const divEl = document.createElement('div');

    divEl.classList.add('error');
    divEl.setAttribute('data-qa', 'notification');
    divEl.textContent = error.message;
    bodyEl.append(divEl);
  });

const secondPromise = new Promise((resolve) => {
  let isFinished = false;

  bodyEl.addEventListener('click', (e) => {
    if (isFinished) {
      return;
    }
    isFinished = true;
    resolve('Second promise was resolved');
  });

  bodyEl.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (isFinished) {
      return;
    }
    isFinished = true;
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((result) => {
    const divEl = document.createElement('div');

    divEl.classList.add('success');
    divEl.setAttribute('data-qa', 'notification');
    divEl.textContent = result;
    bodyEl.append(divEl);
  })
  .catch();

const thirdPromise = new Promise((resolve) => {
  let hasLeft = false;
  let hasRight = false;

  bodyEl.addEventListener('click', () => {
    hasLeft = true;

    if (hasLeft && hasRight) {
      resolve('Third promise was resolved');
    }
  });

  bodyEl.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    hasRight = true;

    if (hasLeft && hasRight) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((result) => {
    const divEl = document.createElement('div');

    divEl.classList.add('success');
    divEl.setAttribute('data-qa', 'notification');
    divEl.textContent = result;
    bodyEl.append(divEl);
  })
  .catch();
