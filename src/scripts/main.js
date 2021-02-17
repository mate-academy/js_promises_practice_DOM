'use strict';

function notification(bool, message) {
  const div = document.createElement('div');
  const p = document.createElement('p');

  p.innerText = message;

  div.append(p);
  div.setAttribute('data-qa', 'notification');

  if (bool) {
    div.classList.add('success');
    document.body.append(div);
  } else {
    div.classList.add('warning');
    document.body.append(div);
  }
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then((res) => notification(true, res))
  .catch((error) => notification(false, error));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(res => notification(true, res));

const thirdPromise = new Promise((resolve, reject) => {
  let arr = [0, 2];

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      arr = arr.filter((x) => x !== e.button);
    }

    if (e.button === 2) {
      arr = arr.filter((x) => x !== e.button);
    }

    if (arr.length === 0) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((res) => notification(true, res));
