'use strict';

const body = document.querySelector('body');

const handleResult = (someText) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  if (someText.includes('resolved')) {
    notification.className = 'success';
  } else {
    notification.className = 'error';
  }
  notification.innerText = someText;
  body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((message) => {
    return handleResult(message);
  })
  .catch((error) => {
    return handleResult(error.message);
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  return handleResult(message);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const checkClicks = () => {
    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  };

  body.addEventListener('click', () => {
    leftClick = true;
    checkClicks();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    checkClicks();
  });
});

thirdPromise.then((message) => {
  return handleResult(message);
});
