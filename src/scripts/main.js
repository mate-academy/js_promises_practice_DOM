'use strict';

const body = document.querySelector('body');

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('success1');
    });

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('warning1');
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve('success2');
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('success2');
    });
    // body.querySelector('[notification]').remove();
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve('rclick');
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('lclick');
    });
  });
}

function notification(style) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  switch (style) {
    case 'success1':
      div.className = 'success';
      div.textContent = 'First promise was resolved';
      break;

    case 'warning1':
      div.className = 'warning';
      div.textContent = 'First promise was rejected';
      break;
    case 'success2':
      div.textContent = 'Second promise was resolved';
      break;

    case 'success3':
      div.textContent = 'Third promise was resolved';
      break;
  }

  body.append(div);
}

const first = firstPromise();

first.then(notification, notification);

const second = secondPromise();

second.then(notification);

const third = thirdPromise();

third.then(click => {
  if (click === 'rclick') {
    return new Promise((resolve) => {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        resolve('success3');
      });
    });
  } else if (click === 'lclick') {
    return new Promise((resolve) => {
      document.addEventListener('click', () => {
        resolve('success3');
      });
    });
  }
}).then(notification);
