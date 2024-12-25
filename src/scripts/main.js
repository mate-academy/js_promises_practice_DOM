'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    resolve('Second promise was resolved');
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('click', (event) => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let ifRightClick = false;
  let ifLeftClick = false;

  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    ifRightClick = true;

    if (ifRightClick && ifLeftClick) {
      resolve('Third promise was resolved');
    }
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('click', (event) => {
    ifLeftClick = true;

    if (ifRightClick && ifLeftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((succesMessage) => {
    const successDiv = document.createElement('div');

    successDiv.classList.add('success');
    successDiv.textContent = succesMessage;
    successDiv.setAttribute('data-qa', 'notification');

    document.body.append(successDiv);
  })
  .catch((error) => {
    const errorDiv = document.createElement('div');

    errorDiv.classList.add('error');
    errorDiv.textContent = error.message;
    errorDiv.setAttribute('data-qa', 'notification');

    document.body.append(errorDiv);
  });

promise2.then((succesMessage) => {
  const successDiv = document.createElement('div');

  successDiv.classList.add('success');
  successDiv.textContent = succesMessage;
  successDiv.setAttribute('data-qa', 'notification');

  document.body.append(successDiv);
});

promise3.then((succesMessage) => {
  const successDiv = document.createElement('div');

  successDiv.classList.add('success');
  successDiv.textContent = succesMessage;
  successDiv.setAttribute('data-qa', 'notification');

  document.body.append(successDiv);
});
