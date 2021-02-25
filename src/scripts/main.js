'use strict';

const body = document.querySelector('body');

const showMessage = (type, description) => {
  const container = document.createElement('div');

  // container.className = `${type}`;
  container.classList.add(type);
  container.setAttribute('data-qa', 'notification');
  container.innerHTML = `${description + ' '}`;
  body.append(container);
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mousedown', (e) => {
    if (e) {
      resolve('First promise was resolved');
    };
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

let leftButtonDown = false;
let rightButtonDown = false;

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonDown = true;
    }

    if (e.button === 2) {
      rightButtonDown = true;
    }

    if (leftButtonDown && rightButtonDown) {
      resolve('Third promise was resolved');
    };
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButtonDown = false;
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (leftButtonDown && rightButtonDown) {
      e.preventDefault();
    }
    rightButtonDown = false;
  });
});

promise1.then((description) => {
  showMessage('success', description);
}).catch((description) => {
  showMessage('warning', description);
});

promise2.then((description) => {
  showMessage('success', description);
});

promise3.then((description) => {
  showMessage('success', description);
});
