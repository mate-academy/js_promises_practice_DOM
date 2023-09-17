'use strict';

function appendNotification(number, result) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  notification.className = `notification ${
    (result === 'success') ? 'success' : 'warning'
  }`;

  notification.classList.add(number.toLowerCase());

  notification.innerText = `${number} promise was ${
    (result === 'success') ? 'resolved' : 'rejected'
  }`;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const promiseNumber = 'First';

  document.addEventListener('click', () => {
    resolve(promiseNumber);
  });

  setTimeout(() => reject(promiseNumber), 3000);
});

const secondPromise = Promise.race([
  new Promise(resolve => {
    const promiseNumber = 'Second';

    document.addEventListener('click', () => {
      resolve(promiseNumber);
    });
  }),

  new Promise(resolve => {
    const promiseNumber = 'Second';

    document.addEventListener('contextmenu', () => {
      resolve(promiseNumber);
    });
  }),
]);

const thirdPromise = Promise.all([
  new Promise(resolve => {
    const promiseNumber = 'Third';

    document.addEventListener('click', () => {
      resolve(promiseNumber);
    });
  }),

  new Promise(resolve => {
    const promiseNumber = 'Third';

    document.addEventListener('contextmenu', () => {
      resolve(promiseNumber);
    });
  }),
]);

firstPromise
  .then(promiseNumber => appendNotification(promiseNumber, 'success'))
  .catch(promiseNumber => appendNotification(promiseNumber, 'error'));

secondPromise
  .then(promiseNumber => appendNotification(promiseNumber, 'success'))
  .catch(promiseNumber => appendNotification(promiseNumber, 'error'));

thirdPromise
  .then(promiseNumber => appendNotification(promiseNumber[0], 'success'))
  .catch(promiseNumber => appendNotification(promiseNumber[0], 'error'));
