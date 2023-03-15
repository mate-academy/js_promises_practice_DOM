'use strict';

const doc = document.querySelector('html');

doc.isClicked = false;

const pushNotification = (posTop, posRight, title, description, type) => {
  const body = document.querySelector('body');

  const notifification = document.createElement('div');
  const h2 = document.createElement('h2');

  notifification.dataset.qa = 'notification';
  notifification.append(h2);
  h2.textContent = title;
  h2.className = 'title';

  const p = document.createElement('p');

  p.textContent = description;
  notifification.append(p);
  notifification.style.top = posTop + 'px';
  notifification.style.right = posRight + 'px';
  notifification.dataset.qa = 'notification';

  notifification.className = `notification + ${type}`;

  body.append(notifification);

};

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('pointerdown', () => {
    if (event.button === 0) {
      doc.isClicked = true;

      return resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (doc.isClicked === false) {
      return reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise.then((res) => pushNotification(30, 20, res,
  'Message example.\n '
+ 'Notification should contain title and description.', 'success'))
  .catch((res) => pushNotification(30, 20, res,
    'Message example.\n '
+ 'Notification should contain title and description.', 'error'));

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('pointerdown', () => {
    return resolve('Second promise was resolved');
  });
});

secondPromise.then((res) => pushNotification(180, 20, res,
  'Message example.\n '
  + 'Notification should contain title and description.', 'success'));

function waitForClick(buttonNumber) {
  return new Promise(resolve => {
    doc.addEventListener('pointerdown', () => {
      if (event.button === buttonNumber) {
        resolve('Third promise was resolved');
      }
    });
  });
}

const leftClick = waitForClick(0);
const rigthClick = waitForClick(2);

leftClick.then(() => rigthClick)
  .then((res) => pushNotification(30, 340, res,
    'Message example.\n '
  + 'Notification should contain title and description.', 'success'));
