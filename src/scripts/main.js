'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', resolve);
  setTimeout(reject, 3000);
});
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', resolve);
  document.addEventListener('contextmenu', resolve);
});

function waitForEvent(target, e) {
  return new Promise((resolve) => {
    target.addEventListener(e, resolve, { once: true });
  });
}

const createMessage = (text, isError) => {
  const box = document.createElement('div');

  box.dataset.qa = 'notification';

  if (isError) {
    box.classList.add('error');
  } else {
    box.classList.add('success');
  }

  box.textContent = text;
  body.appendChild(box);
};

const leftClick = waitForEvent(document, 'click');
const rightClick = waitForEvent(document, 'contextmenu');

Promise.all([leftClick, rightClick]).then(() => {
  createMessage('Third promise was resolved');
});

firstPromise
  .then(() => createMessage('First promise was resolved'))
  .catch(() => createMessage('First promise was rejected', true));

secondPromise.then(() => createMessage('Second promise was resolved'));
