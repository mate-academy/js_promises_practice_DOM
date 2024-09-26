'use strict';

const success = (result) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.dataset.qa = 'notification';
  message.innerText = result;
  document.body.append(message);
};

const error = (result) => {
  const message = document.createElement('div');

  message.className = 'warning';
  message.dataset.qa = 'notification';
  message.innerText = result;
  document.body.append(message);
};

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
})
  .then(success)
  .catch(error);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
})
  .then(success)
  .catch(error);

const thirdPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Third promise was resolved');
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    resolve('Third promise was resolved');
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
})
  .then(success)
  .catch(error);

secondPromise.catch(error);
thirdPromise.catch(error);
