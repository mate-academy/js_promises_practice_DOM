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

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => {
    addContainer();
    addMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    addContainer();
    addMessage('warning', 'First promise was rejected');
  });

const promise2 = new Promise(resolve => {
  body.addEventListener('mouseup', (e) => {
    if (e.button !== 1) {
      resolve();
    };
  });
});

promise2
  .then(() => {
    addMessage('success', 'Second promise was resolved');
  });

const promise3 = new Promise(resolve => {
  body.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve();
    };
  });
});

const promise4 = new Promise(resolve => {
  body.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      resolve();
    };
  });
});

Promise.all([promise3, promise4]).then(() => {
  addMessage('success', 'Third promise was resolved');
});
