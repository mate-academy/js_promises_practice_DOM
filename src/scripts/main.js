'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const clickDoc = document;

  clickDoc.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickDoc = document;

  clickDoc.addEventListener('click', () => {
    resolve();
  });

  clickDoc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  const clickDoc = document;
  let hasRightClick = false;
  let hasLeftClick = false;

  clickDoc.addEventListener('click', () => {
    hasLeftClick = true;

    if (hasLeftClick && hasRightClick) {
      resolve();
    }
  });

  clickDoc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    hasRightClick = true;

    if (hasLeftClick && hasRightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('success');
    notification.textContent = 'First promise was resolved';
    document.body.appendChild(notification);
  })
  .catch(() => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('error');
    notification.textContent = 'First promise was rejected';
    document.body.appendChild(notification);
  });

secondPromise.then(() => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = 'Second promise was resolved';
  document.body.appendChild(notification);
});

thirdPromise.then(() => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = 'Third promise was resolved';
  document.body.appendChild(notification);
});
