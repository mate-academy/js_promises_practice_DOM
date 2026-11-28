'use strict';

function showNotification(message, className) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(className);
  notification.textContent = message;

  document.body.append(notification);
}

const onSuccess = (message) => showNotification(message, 'success');
const onError = (error) => {
  const message = error instanceof Error ? error.message : error;

  showNotification(message, 'error');
};

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
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

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBothClicked = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;
      checkBothClicked();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClicked = true;
      checkBothClicked();
    },
    { once: true },
  );
});

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess).catch(onError);
thirdPromise.then(onSuccess).catch(onError);
