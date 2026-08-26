'use strict';

const p1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (clickEvent) => {
    if (clickEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const p2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (clickEvent2) => {
    if (clickEvent2.button === 0 || clickEvent2.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const p3 = new Promise((resolve, reject) => {
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

p1.then((info) => {
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

p2.then((info) => {
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

p3.then((info) => {
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
