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
  let leftButtonClicked = false;
  let rightButtonClicked = false;

  const resolve = (resolved) => {
    document.addEventListener('mousedown', e => {
      switch (e.button) {
        case 0:
          leftButtonClicked = true;
          break;
        case 2:
          rightButtonClicked = true;
          break;
      }

      if (leftButtonClicked && rightButtonClicked) {
        resolved('Third promise was resolved');
      }
    });
  };

  return new Promise(resolve);
}

thirdPromise()
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  });

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
