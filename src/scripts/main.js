'use strict';

const body = document.querySelector('body');

function addContainer() {
  body.insertAdjacentHTML('afterbegin', `
    <div class="messages">
    </div>
  `);
};

function addMessage(className, message) {
  const block = document.querySelector('.messages');

  block.insertAdjacentHTML('beforeend', `
    <p data-qa="notification" class="${className}">
      ${message}
    </p>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    addContainer();
    addMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    addContainer();
    addMessage('warning', 'First promise was rejected');
  });

const secondPromise = new Promise(resolve => {
  body.addEventListener('mouseup', (e) => {
    if (e.button !== 1) {
      resolve();
    };
  });
});

secondPromise
  .then(() => {
    addMessage('success', 'Second promise was resolved');
  });

const thirdPromise = new Promise(resolve => {
  body.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve();
    };
  });
});

const fourthPromise = new Promise(resolve => {
  body.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      resolve();
    };
  });
});

Promise.all([thirdPromise, fourthPromise]).then(() => {
  addMessage('success', 'Third promise was resolved');
});
