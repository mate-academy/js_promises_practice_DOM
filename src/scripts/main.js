'use strict';

function massage(text, promiseStatus) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.innerText = text;
  notification.className = promiseStatus;
  document.body.append(notification);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });

  document.addEventListener('click', (e) => {
    resolve();
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e1) => {
    document.addEventListener('click', (e2) => {
      resolve();
    });
  });

  document.addEventListener('click', (e2) => {
    document.addEventListener('contextmenu', (e1) => {
      resolve();
    });
  });
});

promise1
  .then(() => {
    massage('First promise was resolved', 'success');
  })
  .catch(() => {
    massage('First promise was rejected', 'error');
  });

promise2.then(() => {
  massage('Second promise was resolved', 'success');
});

promise3.then(() => {
  massage('Third promise was resolved', 'success');
});
