'use strict';

const body = document.querySelector('body');

function createNotification(promise, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  if (type === 'resolve') {
    notification.className = 'success';
  } else if (type === 'reject') {
    notification.className = 'warning';
  }

  if (promise === 1) {
    notification.textContent = 'First promise was resolved';
  } else if (promise === 2) {
    notification.textContent = 'Second promise was resolved';
  } else {
    notification.textContent = 'Third promise was resolved';
  }

  if (promise === 1 && type === 'reject') {
    notification.textContent = 'First promise was rejected';
  }
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout((error) => {
    reject(error);
  }, 3000);
});

firstPromise
  .then(result => {
    createNotification(1, 'resolve');
  })
  .catch(() => {
    createNotification(1, 'reject');
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

secondPromise.then(result => {
  createNotification(2, 'resolve');
})
  .catch(() => {
    createNotification(2, 'reject');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

thirdPromise.then(result => {
  createNotification(3, 'resolve');
})
  .catch(() => {
    createNotification(3, 'reject');
  });
