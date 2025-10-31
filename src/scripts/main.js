'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', onClick);

  const timer = setTimeout(() => {
    reject('First promise was rejected');
    document.removeEventListener('click', onClick);
  }, 3000);

  function onClick() {
    resolve('First promise was resolved');
    clearTimeout(timer);
    document.removeEventListener('click', onClick);
  }
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
    leftClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
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
    console.log(message);

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
