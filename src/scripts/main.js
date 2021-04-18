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

first.then((firstNot) => {
  notification(firstNot);

  const second = secondPromise();

  return second;
})
  .catch(error => {
    notification(error);

    const second = secondPromise();

    return second;
  })
  .then(secondNot => {
    notification(secondNot);

    const third = thirdPromise();

    return third;
  })
  .then(thirdNot => {
    if (thirdNot === 'rclick') {
      return new Promise((resolve) => {
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          resolve('success3');
        });
      });
    } else if (thirdNot === 'lclick') {
      return new Promise((resolve) => {
        document.addEventListener('click', () => {
          resolve('success3');
        });
      });
    }
  })
  .then(notification);
