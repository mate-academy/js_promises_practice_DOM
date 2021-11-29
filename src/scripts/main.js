'use strict';

const body = document.body;

function resolvedNotification(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.className = 'success';

  body.append(div);
}

function rejectedNotification(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.className = 'warning';

  body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

promise1.then(resolvedNotification, rejectedNotification);

const promise2 = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

promise2.then(resolvedNotification);

const promise3 = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  }),
]).then(() => 'Third promise was resolved');

promise3.then(resolvedNotification);
