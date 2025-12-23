'use strict';

function startTimer(miliSecondsLeft) {
  const timer = document.createElement('h2');

  timer.textContent = `Seconds left ${miliSecondsLeft / 1000}`;
  document.body.append(timer);

  const interval = setInterval(() => {
    // eslint-disable-next-line no-param-reassign
    miliSecondsLeft -= 1000;
    timer.textContent = `Seconds left ${miliSecondsLeft / 1000}`;

    if (miliSecondsLeft <= 0) {
      clearInterval(interval);
      timer.remove();
    }
  }, 1000);
}

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  document.addEventListener('click', () => {
    isResolved = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isResolved) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

firstPromise
  .then((messag) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.className = 'success';
    message.textContent = messag;
    document.body.append(message);
  })
  .catch((messag) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.className = 'error';
    message.textContent = messag;
    document.body.append(message);
  });

startTimer(3000);

const secondPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  document.addEventListener('click', () => {
    if (!isResolved) {
      isResolved = true;
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (!isResolved) {
      isResolved = true;
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((messag) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.className = 'success';
    message.textContent = messag;
    document.body.append(message);
  })
  .catch((messag) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.className = 'error';
    message.textContent = messag;
    document.body.append(message);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((messag) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.className = 'success';
    message.textContent = messag;
    document.body.append(message);
  })
  .catch((messag) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.className = 'error';
    message.textContent = messag;
    document.body.append(message);
  });
