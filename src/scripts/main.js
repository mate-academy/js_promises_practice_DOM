'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', click);
  }, 3000);

  const click = document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearTimeout(timer);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    rightClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    leftClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });

  if (leftClick === true && rightClick === true) {
    resolve('Third promise was resolved');
  }
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;

    document.body.appendChild(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = message;

    document.body.appendChild(div);
  });

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;

    document.body.appendChild(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = message;

    document.body.appendChild(div);
  });

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;

    document.body.appendChild(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = message;

    document.body.appendChild(div);
  });
