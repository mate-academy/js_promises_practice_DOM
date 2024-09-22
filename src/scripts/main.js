'use strict';

const logo = document.querySelector('.logo');

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    resolve(() => {
      return 'First promise was resolved';
    });
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject(() => {
      return 'First promise was rejected';
    });
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    resolve(() => {
      return 'Second promise was resolved';
    });
  });

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve(() => {
      return 'Second promise was resolved';
    });
  });
});

const promise3 = new Promise((resolve, reject) => {
  let clickedLeft = false;
  let clickedRight = false;

  logo.addEventListener('click', (e) => {
    clickedLeft = true;

    if (clickedLeft && clickedRight) {
      resolve(() => {
        return 'Third promise was resolved';
      });
    }
  });

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    clickedRight = true;

    if (clickedLeft && clickedRight) {
      resolve(() => {
        return 'Third promise was resolved';
      });
    }
  });
});

const successHandler = (resolve) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.textContent = resolve();
  message.dataset.qa = 'notification';

  document.body.appendChild(message);
};

const errorHandler = (reject) => {
  const message = document.createElement('div');

  message.className = 'error';
  message.textContent = reject();
  message.dataset.qa = 'notification';

  document.body.appendChild(message);
};

promise1.then(successHandler).catch(errorHandler);
promise2.then(successHandler).catch(errorHandler);
promise3.then(successHandler).catch(errorHandler);
