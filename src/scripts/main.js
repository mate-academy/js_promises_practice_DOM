'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(message => {
    createMessage('success', message);
  })
  .catch(err => {
    createMessage('warning', err.message);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then(message => {
    createMessage('success', message);
  });

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Third promise was resolved');
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    reject(new Error('Third promise was resolved'));
  });
});

thirdPromise
  .then(message => {
    return new Promise((resolve, reject) => {
      document.addEventListener('contextmenu', (clickEvent) => {
        clickEvent.preventDefault();
        resolve(message);
      });
    });
  })
  .catch(err => {
    return new Promise((resolve, reject) => {
      document.addEventListener('click', () => {
        resolve(err.message);
      });
    });
  })
  .then(message => {
    createMessage('success', message);
  });

function createMessage(type, text) {
  const div = document.createElement('div');

  div.innerText = text;
  div.className = `message ${type}`;
  div.dataset.qa = 'notification';

  document.body.append(div);
};
