'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const idTime = setTimeout(() => {
    const message = 'First promise was rejected';

    reject(new Error(message));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearTimeout(idTime);
  });
});

firstPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    document.body.appendChild(div);
  },
  (err) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = err.message;
    document.body.appendChild(div);
  },
);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;

  document.body.appendChild(div);
});

const thirdPromise = new Promise((resolve) => {
  let countEvent = 0;

  document.addEventListener(
    'click',
    () => {
      countEvent++;

      if (countEvent === 2) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      countEvent++;

      if (countEvent === 2) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;

  document.body.appendChild(div);
});
