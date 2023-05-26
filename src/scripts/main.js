'use strict';

const showNotification = (inputMessage) => {
  const message = document.createElement('div');
  const isError = inputMessage instanceof Error;

  message.classList.add(
    `${isError ? 'warning' : 'success'}`
  );
  message.setAttribute('data-qa', 'notification');

  message.innerHTML
    = isError ? String(inputMessage).replace('Error: ', '') : inputMessage;

  document.body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

firstPromise
  .then(success => {
    showNotification(success);
  })
  .catch(error => {
    showNotification(error);
  });

secondPromise
  .then(success => {
    showNotification(success);
  })
  .catch(error => {
    showNotification(error);
  });

const thirdPromise = Promise.all([
  new Promise((resolve, reject) =>
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    })
  ),
  new Promise((resolve, reject) =>
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    })
  ),
]);

thirdPromise
  .then(success => showNotification(success[0]))
  .catch(error => showNotification(error));
