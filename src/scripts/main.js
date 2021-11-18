'use strict';

const handleSuccess = (result) => {
  const successNotification = document.createElement('notification');

  successNotification.dataset.qa = 'notification';
  successNotification.className = 'success';
  successNotification.innerText = result;

  document.body.append(successNotification);
};

const handleRejection = (error) => {
  const warningNotification = document.createElement('notification');

  warningNotification.dataset.qa = 'notification';
  warningNotification.className = 'warning';
  warningNotification.innerText = error;

  document.body.append(warningNotification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected⚠️'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  }),
]).then(() => 'Third promise was resolved');

firstPromise.then(handleSuccess, handleRejection);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
