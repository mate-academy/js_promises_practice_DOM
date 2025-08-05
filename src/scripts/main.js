'use strict';

const d = document;

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  d.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeOut);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      d.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  d.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const f = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked === true && rightClicked === true) {
      d.removeEventListener('mousedown', f);
      resolve();
    }
  };

  d.addEventListener('mousedown', f);
});

firstPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = 'First promise was resolved';
  document.body.appendChild(div);
});

firstPromise.catch(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = 'First promise was rejected';
  document.body.appendChild(div);
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = 'Second promise was resolved';
  document.body.appendChild(div);
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = 'Third promise was resolved';
  document.body.appendChild(div);
});
