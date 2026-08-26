'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (clickEvent) => {
    if (clickEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (clickEvent2) => {
    if (clickEvent2.button === 0 || clickEvent2.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (clickEvent3) => {
    if (clickEvent3.button === 0) {
      leftClick = true;
    }

    if (clickEvent3.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((info) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = info;

  document.body.append(div);
}).catch((error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = error.message;

  document.body.append(div);
});

secondPromise.then((info) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = info;

  document.body.append(div);
}).catch((error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = error.message;

  document.body.append(div);
});

thirdPromise.then((info) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = info;

  document.body.append(div);
}).catch((error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = error.message;

  document.body.append(div);
});
