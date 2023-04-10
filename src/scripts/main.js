'use strict';

const promiseNumber = (promiseName) => {
  const result = promiseName.split('P').join(' p');

  return result[0].toUpperCase() + result.slice(1);
};

const message = (type, promiseName) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  if (type === 'success') {
    notification.classList = 'success';
    notification.textContent = promiseNumber(promiseName) + ' was resolved';

    return document.body.appendChild(notification);
  } else if (type === 'error') {
    notification.classList = 'warning';
    notification.textContent = promiseNumber(promiseName) + ' was rejected';

    return document.body.appendChild(notification);
  }
};

const firstPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  body.addEventListener('mousedown', function(e) {
    event.preventDefault();

    switch (e.buttons) {
      case 1:
        resolve();
        break;
    };
  });

  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  body.addEventListener('mousedown', function(e) {
    event.preventDefault();

    switch (e.buttons) {
      case 1:
      case 2:
        resolve();
        break;
    };
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  body.addEventListener('mousedown', function(e) {
    event.preventDefault();

    switch (e.buttons) {
      case 2:
        resolve();
        break;
    };
  });
});

firstPromise.then(() => {
  message('success', 'firstPromise');
}).catch(() => {
  message('error', 'firstPromise');
});

secondPromise.then(() => {
  message('success', 'secondPromise');
});

Promise.all([firstPromise, secondPromise, thirdPromise]).then(() => {
  message('success', 'thirdPromise');
});
