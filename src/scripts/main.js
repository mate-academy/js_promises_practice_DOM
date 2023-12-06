'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then((result) => {
    message(result, 'success');
  })
  .catch((err) => {
    message(err, 'warning');
  })
  .then(() => {
    const promise2Left = new Promise((resolve) => {
      document.addEventListener('click', () => {
        resolve('Second promise left click was resolved');
      });
    });

    const promise2Right = new Promise((resolve) => {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        resolve('Second promise right click was resolved');
      });
    });

    return Promise.race([promise2Left, promise2Right]);
  })
  .then((result) => {
    message(result, 'success');
  })
  .then(() => {
    const promise3Left = new Promise((resolve) => {
      document.addEventListener('click', () => {
        resolve();
      });
    });

    const promise3Right = new Promise((resolve) => {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        resolve();
      });
    });

    return Promise.all([promise3Left, promise3Right]);
  })
  .then(() => {
    message('Third promise was resolved', 'success');
  });

function message(promMessage, type) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="${type}">${promMessage}</div>`,
  );
}
