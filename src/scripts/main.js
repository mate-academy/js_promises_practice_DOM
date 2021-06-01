'use strict';

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mouseup', (event) => {
    const buttonNumber = event.which;

    if (buttonNumber === 1 || buttonNumber === 3) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mouseup', (event) => {
    const buttonNumber = event.which;

    if (buttonNumber === 1 || buttonNumber === 3) {
      const secondButton = buttonNumber === 1 ? 3 : 1;

      // eslint-disable-next-line no-shadow
      resolve(new Promise((resolve) => {
        // eslint-disable-next-line no-shadow
        document.addEventListener('mouseup', (event) => {
          if (event.which === secondButton) {
            resolve('Third promise was resolved');
          }
        });
      }));
    }
  });
});

const printSuccess = (result) => {
  const element = document.createElement('p');

  element.setAttribute('data-qa', 'notification');
  element.classList.add('success');
  element.innerText = result;
  document.body.appendChild(element);
};

const printFail = (result) => {
  const element = document.createElement('p');

  element.setAttribute('data-qa', 'notification');
  element.classList.add('warning');
  element.innerText = result;
  document.body.appendChild(element);
};

promise1
  .then(printSuccess)
  .catch(printFail);

promise2.then(printSuccess);

promise3.then(printSuccess);
