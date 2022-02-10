'use strict';

function handler(text, cssClass) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList = cssClass;
  div.innerHTML = text;
  document.body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.documentElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

promise1
  .then(
    resolve => handler(resolve, 'success'),
    reject => handler(reject.message, 'warning'),
  );

const promise2 = new Promise((resolve) => {
  document.documentElement.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.documentElement.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});

promise2
  .then(resolve => handler(resolve, 'success'));

const promise3 = Promise.all([
  new Promise((resolve) => {
    document.documentElement.addEventListener('click', () => {
      resolve(`Third promise was resolved`);
    });
  }),
  new Promise((resolve) => {
    document.documentElement.addEventListener('contextmenu', () => {
      resolve(`Third promise was resolved`);
    });
  }),
]);

promise3
  .then(resolve => handler(resolve[0], 'success'));
