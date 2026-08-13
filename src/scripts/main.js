'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const successMessage = document.createElement('div');

    successMessage.dataset.qa = 'notification';
    successMessage.classList.add('success');
    successMessage.textContent = 'First promise was resolved';

    document.body.appendChild(successMessage);
  })
  .catch(() => {
    const errorMessage = document.createElement('div');

    errorMessage.dataset.qa = 'notification';
    errorMessage.classList.add('error');
    errorMessage.textContent = 'First promise was rejected';

    document.body.appendChild(errorMessage);
  });

secondPromise.then(() => {
  const successMessage = document.createElement('div');

  successMessage.dataset.qa = 'notification';
  successMessage.classList.add('success');
  successMessage.textContent = 'Second promise was resolved';

  document.body.appendChild(successMessage);
});

thirdPromise.then(() => {
  const successMessage = document.createElement('div');

  successMessage.dataset.qa = 'notification';
  successMessage.classList.add('success');
  successMessage.textContent = 'Third promise was resolved';

  document.body.appendChild(successMessage);
});
