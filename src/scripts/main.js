'use strict';

const body = document.body;

function createNotification(message, classValue) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.innerText = message;
  notification.classList = classValue;
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

function waitFor(evnt, number) {
  return new Promise((resolve) => {
    document.addEventListener(evnt, () => {
      resolve(`${number} promise was resolved`);
    });
  });
}

firstPromise
  .catch(error => {
    createNotification(error, 'warning');
  })
  .then(result => {
    createNotification(result, 'success');

    const secondPromise = Promise.race(
      [waitFor('click', 'Second'),
        waitFor('contextmenu', 'Second')]);

    return secondPromise;
  })
  .then((result2) => {
    createNotification(result2, 'success');

    const thirdPromise = Promise.all(
      [waitFor('click', 'Third'),
        waitFor('contextmenu', 'Third')]);

    return thirdPromise;
  })
  .then((result3) => {
    createNotification(result3, 'success');
  });
