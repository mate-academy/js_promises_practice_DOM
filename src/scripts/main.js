'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  let isResolved = false;

  const resolveOnce = (message) => {
    if (!isResolved) {
      isResolved = true;
      resolve(message);
    }
  };

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolveOnce('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      e.preventDefault();
      resolveOnce('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  let isResolved = false;

  const resolveOnce = (message) => {
    if (!isResolved) {
      isResolved = true;
      resolve(message);
    }
  };

  const checkCompletion = () => {
    if (leftClicked && rightClicked) {
      resolveOnce('Third promise was resolved');
    }
  };

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkCompletion();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      rightClicked = true;
      checkCompletion();
    }
  });
});

const successMes = (mes) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.dataset.qa = 'notification';
  div.textContent = mes;
  document.body.appendChild(div);
};

const errorMes = (err) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.dataset.qa = 'notification';
  div.textContent = err;
  document.body.appendChild(div);
};

firstPromise.then(successMes).catch(errorMes);
secondPromise.then(successMes);
thirdPromise.then(successMes);
