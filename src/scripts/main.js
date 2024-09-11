'use strict';

function buildNotification(className, text) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.className = className;
  newDiv.textContent = text;
  document.body.appendChild(newDiv);
}

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    const callback = () => resolve('First promise was resolved');

    document.addEventListener('click', callback);

    setTimeout(() => reject(new Error('First promise was rejected')), 3000);
  });
};

firstPromise()
  .then((mes) => buildNotification('success', mes))
  .catch((mes) => buildNotification('error', mes));

const secondPromise = () => {
  return new Promise((resolve, reject) => {
    const callback = () => resolve('Second promise was resolved');

    document.addEventListener('click', callback);
    document.addEventListener('contextmenu', callback);
  });
};

secondPromise().then((mes) => buildNotification('success', mes));

const thirdPromise = () => {
  return new Promise((resolve, reject) => {
    let isLeftClick = false;
    let isRightClick = false;

    const canResolve = () => {
      if (isLeftClick && isRightClick) {
        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('contextmenu', () => {
      isRightClick = true;
      canResolve();
    });

    document.addEventListener('click', () => {
      isLeftClick = true;
      canResolve();
    });
  });
};

thirdPromise().then((mes) => buildNotification('success', mes));
