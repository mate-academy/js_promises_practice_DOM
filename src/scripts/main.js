'use strict';

const firstSuccessMessage = document.createElement('div');

firstSuccessMessage.setAttribute('class', 'success');
firstSuccessMessage.setAttribute('data-qa', 'notification');

firstSuccessMessage.textContent = 'First promise was resolved';

const firstErrorMessage = document.createElement('div');

firstErrorMessage.setAttribute('class', 'error');
firstErrorMessage.setAttribute('data-qa', 'notification');
firstErrorMessage.textContent = 'First promise was rejected';

const firstPromise = new Promise((resolve, reject) => {
  document.querySelector('.logo').addEventListener('click', () => {
    resolve(firstSuccessMessage);
  });

  setTimeout(() => {
    reject(firstErrorMessage);
  }, 3000);
});

firstPromise
  .then((success) => {
    document.body.appendChild(success);
  })
  .catch((erorr) => {
    document.body.appendChild(erorr);
  });

const secondSuccessMessage = document.createElement('div');

secondSuccessMessage.setAttribute('class', 'success');
secondSuccessMessage.setAttribute('data-qa', 'notification');

secondSuccessMessage.textContent = 'Second promise was resolved';

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(secondSuccessMessage);
  });

  document.addEventListener('click', (e) => {
    resolve(secondSuccessMessage);
  });
});

secondPromise.then((success) => {
  document.body.appendChild(success);
});

const thirdSuccesMessage = document.createElement('div');

thirdSuccesMessage.setAttribute('class', 'success');
thirdSuccesMessage.setAttribute('data-qa', 'notification');

thirdSuccesMessage.textContent = 'Third promise was resolved';

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  document.addEventListener('click', () => {
    leftClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve(thirdSuccesMessage);
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve(thirdSuccesMessage);
    }
  });
});

thirdPromise.then((success) => {
  document.body.appendChild(success);
});
