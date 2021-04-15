'use strict';

const createMessage = (className, content) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div
      data-qa="notification"
      class="${className}"
    >
      ${content}
    </div>
  `);
};

const clickPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });
});

const contextPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      e.preventDefault();
      resolve();
    }
  });
});

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0
      || e.button === 1
      || e.button === 2
    ) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 3000);
})
  .then(() => {
    createMessage('success first message', 'First promise was resolved');
  })
  .catch(() => {
    createMessage('warning first message', 'First promise was rejected');
  });

new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      e.preventDefault();
      resolve();
    }
  });
})
  .then(() => {
    createMessage('success second message', 'Second promise was resolved');
  });

Promise.all([clickPromise, contextPromise])
  .then(() => {
    createMessage('success third message', 'Third promise was resolved');
  });
