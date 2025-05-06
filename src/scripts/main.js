'use strict';

const pageDocument = document;
const body = document.body;

function firstPromise() {
  return new Promise((resolve, reject) => {
    const handler = (e) => {
      if (e.button === 0) {
        resolve('First promise was resolved');
      }
    };

    pageDocument.addEventListener('mousedown', handler);

    setTimeout(() => {
      reject(new Error());
      pageDocument.removeEventListener('mousedown', handler);
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    const handler = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        pageDocument.removeEventListener('mousedown', handler);
      }
    };

    pageDocument.addEventListener('mousedown', handler);
  });
}

function thirdPromise() {
  const buttonsClicked = [];

  return new Promise((resolve) => {
    function handler(e) {
      buttonsClicked.push(e.button);

      if (buttonsClicked.length === 2) {
        pageDocument.removeEventListener('mousedown', handler);
      }

      if (buttonsClicked.includes(0) && buttonsClicked.includes(2)) {
        resolve('Third promise was resolved');
      }
    }

    pageDocument.addEventListener('mousedown', handler);
  });
}

firstPromise()
  .then((value) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.textContent = value;
    body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.textContent = 'First promise was rejected';
    body.append(div);
  });

secondPromise().then((value) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = value;
  body.append(div);
});

thirdPromise().then((value) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = value;
  body.append(div);
});
