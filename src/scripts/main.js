'use strict';

const body = document.querySelector('body');

const pushNotification = (number, stat, type) => {
  const notification = document.createElement('div');

  notification.classList.add('notification', type);
  notification.dataset.qa = 'notification';

  notification.innerHTML = `
    <p>${number} promise was ${stat}</p>
  `;

  body.append(notification);
};

const success1 = () => {
  pushNotification('First', 'resolved', 'success');
};

const error1 = () => {
  pushNotification('First', 'rejected', 'warning');
};

const success2 = () => {
  pushNotification('Second', 'resolved', 'success');
};

const success3 = () => {
  pushNotification('Third', 'resolved', 'success');
};

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(error1), 3000);
});

promise1
  .then(success1)
  .catch(error1);

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

promise2
  .then(success2);

const promise3 = new Promise((resolve) => {
  let x = -1;
  let y = -1;

  body.addEventListener('mousedown', (e) => {
    const left = e.button === 0;
    const right = e.button === 2;

    if (left) {
      x = 1;
    }

    if (right) {
      y = 1;
    }

    if (x === 1 && y === 1) {
      resolve();
    }
  });
});

promise3
  .then(success3);
