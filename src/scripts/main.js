'use strict';

function addMessage(type, text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(type);
  message.innerText = text;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    };

    if (e.button === 2) {
      right = true;
    };

    if (left && right) {
      resolve('Third promise was resolved');
    };
  });
});

firstPromise
  .then(
    (data) => {
      addMessage('.success', data);
    }
  )
  .catch(
    (error) => {
      addMessage('.error', error);
    }
  );

secondPromise
  .then(
    (data) => {
      addMessage('.success', data);
    }
  );

thirdPromise
  .then(
    (data) => {
      addMessage('.success', data);
    }
  );
