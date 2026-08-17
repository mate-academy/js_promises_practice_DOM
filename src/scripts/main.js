'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  const statusCheck = function () {
    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;
    statusCheck();
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;
    statusCheck();
  });
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;

    document.body.append(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = 'First promise was rejected';

    document.body.append(div);
  });

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;

    document.body.append(div);
  })
  .catch(() => {});

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;

    document.body.append(div);
  })
  .catch(() => {});
