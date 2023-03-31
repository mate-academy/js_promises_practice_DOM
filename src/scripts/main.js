'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('success');
  });

  setTimeout(reject, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('success');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('success');
  });
});

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rigthClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve();
  });
});

const promise3 = Promise.all([leftClick, rigthClick]);

promise1
  .then((res) => {
    createMessage('First promise was resolved', res);
  })
  .catch(createMessage);

promise2
  .then((res) => {
    createMessage('Second promise was resolved', res);
  });

promise3
  .then((res) => {
    createMessage('Third promise was resolved', res);
  });

function createMessage(text = 'First promise was rejected', type = 'warning') {
  body.insertAdjacentHTML(
    'beforeend',
    `
    <div data-qa='notification' class='${type}'>
      ${text}
    </div>
  `
  );
};
