/* eslint-disable function-paren-newline */
'use strict';

const eventsType = ['contextmenu', 'click'];

const showNotification = (someData) => {
  const div = document.createElement('div');

  if (someData.success) {
    div.classList.add('success');
  }

  if (!someData.success) {
    div.classList.add('error');
  }

  div.setAttribute('data-qa', 'notification');
  div.textContent = someData.message;

  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(eventsType[1], () => {
    resolve({ success: true, message: 'First promise was resolved' });
  });

  setTimeout(reject, 3000, {
    success: false,
    message: 'First promise was rejected',
  });
});

firstPromise
  .then((successData) => showNotification(successData))
  .catch((errorData) => showNotification(errorData));

const secondPromise = new Promise((resolve) => {
  eventsType.forEach((eventType) => {
    document.addEventListener(eventType, () => {
      resolve({ success: true, message: 'Second promise was resolved' });
    });
  });
});

secondPromise.then((successData) => showNotification(successData));

const thirdPromise = () => {
  const promise1 = new Promise((resolve) => {
    document.addEventListener(eventsType[0], () => {
      resolve({ success: true, message: 'Third promise was resolved' });
    });
  });

  const promise2 = new Promise((resolve) => {
    document.addEventListener(eventsType[1], () => {
      resolve({ success: true, message: 'Third promise was resolved' });
    });
  });

  Promise.all([promise1, promise2]).then((successData) =>
    showNotification(successData[0]),
  );
};

thirdPromise();
