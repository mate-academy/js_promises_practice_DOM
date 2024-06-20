'use strict';

const body = document.querySelector('body');

let clickRight = 0;
let clickLeft = 0;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clickLeft++;
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Timeout occurred'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clickLeft++;
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    clickRight++;

    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (clickRight > 0 && clickLeft > 0) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (clickRight > 0 && clickLeft > 0) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    body.appendChild(createfirstPromiseResolve());
  })
  .catch(() => {
    body.appendChild(createfirstPromiseReject());
  });

secondPromise.then(() => {
  body.appendChild(createsecondPromiseResolve());
});

thirdPromise.then(() => {
  body.appendChild(createthirdPromiseResolve());
});

function createfirstPromiseResolve() {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('message');
  el.classList.add('success');
  el.textContent = 'First promise was resolved';

  return el;
}

function createfirstPromiseReject() {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('message');
  el.classList.add('error');
  el.textContent = 'First promise was rejected';

  return el;
}

function createsecondPromiseResolve() {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('message');
  el.classList.add('success');
  el.textContent = 'Second promise was resolved';

  return el;
}

function createthirdPromiseResolve() {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('message');
  el.classList.add('success');
  el.textContent = 'Third promise was resolved';

  return el;
}
