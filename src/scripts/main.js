'use strict';

const container = document.createElement('div');

container.className = 'container';
document.body.append(container);

document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

const createNotification = (text, className) => {
  const element = document.createElement('div');

  element.textContent = text;
  element.className = className;
  element.dataset.qa = 'notification';
  container.append(element);
};

const firstPromice = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    ev.preventDefault();
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromice
  .then(resolve => createNotification(resolve, 'success'))
  .catch(reject => createNotification(reject, 'warning'))
  .then(() => {
    return new Promise((resolve, reject) => {
      document.addEventListener('mousedown', (ev) => {
        if (ev.button !== 1) {
          resolve('Second promise was resolved');
        }
      });
    });
  }).then(resolve => createNotification(resolve, 'success'))
  .then(() => {
    return new Promise((resolve, reject) => {
      let leftClick = false;
      let rightClick = false;

      document.addEventListener('mousedown', ev => {
        if (ev.button === 0) {
          leftClick = true;
        }

        if (ev.button === 2) {
          rightClick = true;
        }

        if (leftClick && rightClick) {
          resolve('Third promise was resolved');
        }
      });
    });
  }).then(resolve => createNotification(resolve, 'success'));
