'use strict';

const success = 'rgba(10, 189, 0, 0.3)';
const error = 'rgba(253, 0, 0, 0.3)';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject();
  }, 3000);
});

promise1
  .then(() => pushNotification(10, 10, 'Success',
    'First promise was resolved', success))
  .catch(() => pushNotification(10, 10, 'Warning',
    'First promise was rejected', error));

const promise2 = new Promise((resolve) => {
  document.addEventListener('contextmenu', (anEvent) => {
    anEvent.preventDefault();

    resolve();
  });

  document.addEventListener('click', () => {
    resolve();
  });
});

promise2
  .then(() => pushNotification(150, 10, 'Success',
    'Second promise was resolved', success));

const promise3 = new Promise((resolve, reject) => {
  const condition = {
    first: false,
    second: false,
  };

  document.addEventListener('contextmenu', (anEvent) => {
    anEvent.preventDefault();
    condition.first = true;

    if (condition.first && condition.second) {
      resolve();
    }
  });

  document.addEventListener('click', () => {
    condition.second = true;

    if (condition.first && condition.second) {
      resolve();
    }
  });
});

promise3
  .then(() => pushNotification(310, 10, 'Success',
    'Third promise was resolved', success));

function pushNotification(posTop, posRight, title, description, backg) {
  const notif = document.createElement('div');

  notif.style = `
    position: absolute;
    width: 300px;
    min-height: 100px;
    padding: 0 16px;
    box-sizing: border-box;
    border-radius: 10px;
    top: 10px;
    right: 10px;
  `;

  notif.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;

  notif.className = `${title.toLowerCase()}`;
  notif.setAttribute('data-qa', 'notification');
  notif.style.background = `${backg}`;
  notif.style.top = `${posTop}px`;
  notif.style.right = `${posRight}px`;
  document.body.append(notif);
};
