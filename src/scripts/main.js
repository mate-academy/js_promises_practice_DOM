'use strict';

const successMessage = 'promise was resolved';
const errorMessage = 'promise was rejected';

const firstPromise = new Promise((resolve, reject) => {
  const handleDocumentClick = () => {
    document.removeEventListener('click', handleDocumentClick);
    clearTimeout(timeoutId);
    resolve(`First ${successMessage}`);
  };

  document.addEventListener('click', handleDocumentClick);

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', handleDocumentClick);

    const error = new Error(`First ${errorMessage}`);

    reject(error);
  }, 3000);
});

const secondPromise = Promise.race([
  new Promise(resolve => {
    const handleLeftClick = () => {
      document.removeEventListener('click', handleLeftClick);
      resolve(`Second ${successMessage}`);
    };

    document.addEventListener('click', handleLeftClick);
  }),

  new Promise(resolve => {
    const handleRightClick = (e) => {
      e.preventDefault();
      document.removeEventListener('contextmenu', handleRightClick);
      resolve(`Second ${successMessage}`);
    };

    document.addEventListener('contextmenu', handleRightClick);
  }),
]);

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    const leftClickHandler = () => {
      document.removeEventListener('click', leftClickHandler);
      resolve('Left click');
    };

    document.addEventListener('click', leftClickHandler);
  }),
  new Promise((resolve) => {
    const rightClickHandler = (e) => {
      e.preventDefault();
      document.removeEventListener('contextmenu', rightClickHandler);
      resolve('Right click');
    };

    document.addEventListener('contextmenu', rightClickHandler);
  }),
]).then(() => `Third ${successMessage}`);

const handlePromise = (promise) => {
  return promise
    .then((message) => showNotification('success', message))
    .catch((message) => showNotification('warning', message));
};

const showNotification = (type, message) => {
  const notificationElement = document.createElement('div');

  notificationElement.textContent = message;
  notificationElement.className = `notification ${type}`;
  document.body.appendChild(notificationElement);
};

handlePromise(firstPromise)
  .then(() => handlePromise(secondPromise))
  .then(() => handlePromise(thirdPromise));
