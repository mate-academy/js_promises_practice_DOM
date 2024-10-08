'use strict';

let leftClick = false;
let rightClick = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!leftClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const pushNotification = (title, description, type) => {
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.innerHTML = `<h2 class="title">${title}</h2><p>${description}</p>`;
  notification.style.top = '430px';
  notification.style.right = '10px';
  document.body.append(notification);
  setTimeout(() => (notification.style.display = 'none'), 2000);
};

promise1.then(
  (result) => promiseHandler(result),
  (error) => promiseHandler(error.message),
);

promise2.then((result) => promiseHandler(result));
promise3.then((result) => promiseHandler(result));

function promiseHandler(res) {
  const success = res.includes('resolved');

  pushNotification(
    success ? 'Success' : 'Error',
    res,
    success ? 'success' : 'error',
  );
}
