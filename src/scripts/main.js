'use strict';

const body = document.body;

function notification(position, state) {
  const message = document.createElement('div');

  message.classList.add(state);
  message.dataset.qa = 'notification';

  let result;

  if (state === 'success') {
    result = 'resolved';
  } else if (state === 'warning') {
    result = 'rejected';
  }

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

const thirdPromise = new Promise((resolve, reject) => {
  window.addEventListener('click', (e) => {
    window.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      if (e.button === 0 && ev.button === 2) {
        resolve();
      }
    });
  });
});

thirdPromise.then(() => {
  notification('Third', 'success');
});
