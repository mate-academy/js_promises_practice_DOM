'use strict';

const body = document.body;

function notification(position, state) {
  const message = document.createElement('div');

  message.classList.add(state);
  message.dataset.qa = 'notification';

  const result = state === 'success' ? 'resolved' : 'rejected';

  message.textContent = `${position} promise was ${result}`;

  body.appendChild(message);
}

const firstPromise = new Promise((resolve, reject) => {
  window.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => reject(new Error()), 3000);
});

firstPromise.then(() => {
  notification('First', 'success');
})
  .catch(() => {
    notification('First', 'warning');
  });

const secondPromise = new Promise((resolve) => {
  window.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => {
  notification('Second', 'success');
});

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  window.addEventListener('click', (e) => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  window.addEventListener('contextmenu', (e) => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(() => {
  notification('Third', 'success');
});
