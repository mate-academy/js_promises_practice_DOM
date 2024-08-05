/* eslint-disable function-paren-newline */
'use strict';

const eventsType = ['contextmenu', 'click'];

const showSuccessNotification = (successText) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = successText;
  document.body.append(div);
};

const showErrorNotification = (errorText) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.setAttribute('data-qa', 'notification');
  div.textContent = errorText;
  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(eventsType[1], () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected ');
});

firstPromise
  .then((successText) => showSuccessNotification(successText))
  .catch((errorText) => showErrorNotification(errorText));

const secondPromise = new Promise((resolve) => {
  eventsType.forEach((eventType) => {
    document.addEventListener(eventType, () => {
      resolve('Second promise was resolved');
    });
  });
});

secondPromise.then((successText) => showSuccessNotification(successText));

const thirdPromise = () => {
  const promise1 = new Promise((resolve) => {
    document.addEventListener(eventsType[0], () => {
      resolve('Third promise was resolved');
    });
  });

  const promise2 = new Promise((resolve) => {
    document.addEventListener(eventsType[1], () => {
      resolve('Third promise was resolved');
    });
  });

  Promise.all([promise1, promise2]).then((successText) =>
    showSuccessNotification(successText),
  );
};

thirdPromise();
