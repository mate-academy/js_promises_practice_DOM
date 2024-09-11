'use strict';

const pushNotification = (title, type) => {
  const message = document.createElement('div');
  const elementTitle = document.createElement('h2');

  elementTitle.innerHTML = title;
  message.setAttribute('class', type);
  message.setAttribute('data-qa', 'notification');
  document.body.append(message);
  message.append(elementTitle);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    pushNotification('First promise was resolved', 'success');
  })
  .catch(() => {
    pushNotification('First promise was rejected', 'error');
  });

secondPromise.then(() => {
  pushNotification('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  pushNotification('Third promise was resolved', 'success');
});
