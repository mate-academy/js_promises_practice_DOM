'use strict';

const createNotification = (message, statusMess) => {
  const div = document.createElement('div');

  div.className = `message ${statusMess}`;
  div.dataset.qa = 'notification';
  div.textContent = message;

  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((message) => {
    createNotification(message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  const handleResolve = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleResolve, { once: true });

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      handleResolve();
    },
    { once: true },
  );
});

secondPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((message) => {
    createNotification(message || 'Second promise was rejected', 'error');
  });

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('left click happened');
    },
    { once: true },
  );
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('right click happened');
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]);

thirdPromise
  .then(() => {
    createNotification('Third promise was resolved', 'success');
  })
  .catch(() => {
    createNotification('Third promise was rejected', 'error');
  });
