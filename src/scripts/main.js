'use strict';

const createNotification = (messege, classList) => {
  const element = document.createElement('div');

  element.textContent = messege;
  element.classList.add('success', classList);
  document.body.append(element);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    const text = 'First promise was rejected';

    reject(text);
  }, 3000);
});

firstPromise
  .then(text => {
    createNotification(text);
  })
  .catch(error => {
    createNotification(error, 'warning');
  });

const secondPromise = new Promise(resolve => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(text => {
    createNotification(text, 'second-message');
  });

const thirdPromise = new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mouseup', (e) => {
    switch (e.button) {
      case 0: leftButton = true;
        break;

      case 2: rightButton = true;
        break;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((text) => {
    createNotification(text, 'third-message');
  });
