'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(Error);
  }, 3000);

  document.body.addEventListener('click', (e) => {
    clearTimeout(timeout);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let LPM = false;
let PPM = false;

const promise3 = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    LPM = true;

    if (LPM && PPM) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    PPM = true;

    if (LPM && PPM) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(() => {
  const message = document.createElement('div');

  message.className = 'success';
  message.setAttribute('data-qa', 'notification');
  message.textContent = 'First promise was resolved';
  document.body.appendChild(message);
}).catch(() => {
  const message = document.createElement('div');

  message.className = 'warning';
  message.setAttribute('data-qa', 'notification');
  message.textContent = 'First promise was rejected';
  document.body.appendChild(message);
});

promise2.then(() => {
  const message = document.createElement('div');

  message.className = 'success';
  message.setAttribute('data-qa', 'notification');
  message.textContent = 'Second promise was resolved';
  document.body.appendChild(message);
}).catch(() => {
  const message = document.createElement('div');

  message.className = 'warning';
  message.setAttribute('data-qa', 'notification');
  message.textContent = 'Second promise was rejected';
  document.body.appendChild(message);
});

promise3.then(() => {
  const message = document.createElement('div');

  message.className = 'success';
  message.setAttribute('data-qa', 'notification');
  message.textContent = 'Third promise was resolved';
  document.body.appendChild(message);
}).catch(() => {
  const message = document.createElement('div');

  message.className = 'warning';
  message.setAttribute('data-qa', 'notification');
  message.textContent = 'Third promise was rejected';
  document.body.appendChild(message);
});
