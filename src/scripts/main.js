'use strict';

function createNotification(messageString, classString) {
  const message = document.createElement('div');

  message.classList.add(classString);
  message.dataset.qa = 'notification';

  message.innerText = messageString;

  return message;
}

function firstPromise() {
  const resolve = (resolved, rejected) => {
    document.addEventListener('click', () => {
      resolved('First promise was resolved');
    });

    setTimeout(() => {
      rejected('First promise was rejected');
    }, 3000);
  };

  return new Promise(resolve);
}

function secondPromise() {
  const resolve = (resolved) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolved('Second promise was resolved');
      }
    });
  };

  return new Promise(resolve);
}

function thirdPromise() {
  let result = 0;

  const resolve = (resolved) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        result++;
      }

      if (result === 2) {
        resolved('Third promise was resolved');
      }
    });
  };

  return new Promise(resolve);
}

firstPromise()
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  })
  .catch(error => {
    document.body.append(createNotification(error, 'warning'));
  });

secondPromise()
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  });

thirdPromise()
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  });
