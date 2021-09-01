'use strict';

const createNotification = (messege, classList) => {
  const element = document.createElement('div');

  element.textContent = messege;
  element.classList.add('success', classList);
  document.body.append(element);
};

const firstPromise = () => {
  const resolver = (resolve, reject) => {
    document.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      reject();
    }, 3000);
  };

  return new Promise(resolver);
};

firstPromise()
  .then(() => {
    createNotification('First promise was resolved');
  })
  .catch(() => {
    createNotification('First promise was rejected', 'warning');
  });

const secondPromise = () => {
  const resolver = (resolve) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
};

secondPromise()
  .then(() => {
    createNotification('Second promise was resolved', 'second-message');
  });

const thirdPromise = () => {
  const resolver = (resolve) => {
    let leftButton = false;
    let rightButton = false;

    document.addEventListener('mouseup', (e) => {
      switch (e.button) {
        case 0: leftButton = true;
          break;

        case 2: rightButton = true;
          break;
      }

      if (leftButton && rightButton) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
};

thirdPromise()
  .then(() => {
    createNotification('Third promise was resolved', 'third-message');
  });
