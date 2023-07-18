'use strict';

const notifications = {
  firstResolve: 'First promise was resolved',
  firstReject: 'First promise was rejected',
  secondResolve: 'Second promise was resolved',
  thirdResolve: 'Third promise was resolved',
};

const notificationMessage = (message) => (`
  <div data-qa="notification" class="notification">
    ${message}
  </div>
`);

const body = document.querySelector('body');

let leftClick = false;
let rightClick = false;

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClick = true;

    resolve(notificationMessage(notifications.firstResolve));
  });

  setTimeout(() => {
    reject(notificationMessage(notifications.firstReject));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    leftClick = true;

    resolve(notificationMessage(notifications.secondResolve));
  });

  // eslint-disable-next-line no-shadow
  body.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    rightClick = true;

    resolve(notificationMessage(notifications.secondResolve));
  });
});

const promise3 = new Promise((resolve) => {
  const checkClicks = () => {
    if (leftClick && rightClick) {
      resolve(notificationMessage(notifications.thirdResolve));
    }
  };

  body.addEventListener('click', checkClicks);
  body.addEventListener('contextmenu', checkClicks);
});

promise1
  .then(res => {
    body.innerHTML += res;
  })
  .catch(err => {
    body.innerHTML += err;
  });

promise2
  .then(res => {
    body.innerHTML += res;
  });

promise3
  .then(res => {
    body.innerHTML += res;
  });
