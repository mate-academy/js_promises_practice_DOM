'use strict';

const body = document.querySelector('body');
const doc = document.querySelector('html');

const promise1 = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve('success');
  });

  setTimeout(() => reject(new Error('error').message), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve('success');
  });

  doc.addEventListener('contextmenu', () => {
    event.preventDefault();
    resolve('success');
  });
});

const promise3 = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    doc.addEventListener('contextmenu', () => {
      resolve('success');
    });
  });

  doc.addEventListener('contextmenu', () => {
    doc.addEventListener('click', () => {
      resolve('success');
    });
  });
});

const notifApender = (result, nameOfPromise) => {
  const notifResult = result === 'success'
    ? 'resolved'
    : 'rejected';
  const message = `
    <div data-qa="notification">
      ${nameOfPromise} promise was ${notifResult}
    </div>
  `;

  body.insertAdjacentHTML('afterbegin', message);
};

promise1
  .then(result => notifApender(result, 'First'))
  .catch(result => notifApender(result, 'First'));

promise2
  .then(result => notifApender(result, 'Second'));

promise3
  .then(result => notifApender(result, 'Third'));
