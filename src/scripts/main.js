'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  const resolveCallback = () => resolve('Second promise was resolved');

  document.addEventListener('click', resolveCallback);
  document.addEventListener('contextmenu', resolveCallback);
});

const thirdPromise = new Promise((resolve, reject) => {
  const resolveCallback = () => resolve('Third promise was resolved');
  let [leftClicked, rightClicked] = [false, false];

  document.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked) {
      resolveCallback();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked) {
      resolveCallback();
    }
  });
});

const resolvedCallback = (message) => {
  const notification = document.createElement('div');

  notification.dataset['qa'] = 'notification';

  notification.classList = 'success';
  notification.innerText = message;
  document.body.append(notification);
};

const rejectedCallback = (message) => {
  const notification = document.createElement('div');

  notification.dataset['qa'] = 'notification';
  notification.classList = 'error';
  notification.innerText = message;
  document.body.append(notification);
};

firstPromise.then(resolvedCallback).catch(rejectedCallback);
secondPromise.then(resolvedCallback).catch(rejectedCallback);
thirdPromise.then(resolvedCallback).catch(rejectedCallback);
