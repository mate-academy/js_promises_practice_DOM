'use strict';

function getFirstPromise() {
  const executor = (resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject('First promise was rejected');
    }, 3000);
  };

  return new Promise(executor);
}

function getSecondPromise() {
  const executor = (resolve) => {
    document.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    });
  };

  return new Promise(executor);
}

function leftClick() {
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve();
    });
  });
}

function rightClick() {
  return new Promise((resolve) => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve();
    });
  });
}

function getThirdPromise() {
  const lClickPromise = leftClick();
  const rClickPromise = rightClick();

  return lClickPromise
    .then(() => rClickPromise)
    .then(() => 'Third promise was resolved');
}

const firstPromise = getFirstPromise();
const secondPromise = getSecondPromise();
const thirdPromise = getThirdPromise();

const div = document.createElement('div');

div.dataset.qa = 'notification';

function messageSusses(message) {
  div.className = 'success';
  div.textContent = message;
  document.body.append(div);
}

function messageWarning(err) {
  div.className = 'warning';
  div.textContent = err;
  document.body.append(div);
}

firstPromise
  .then(messageSusses)
  .catch(messageWarning);

secondPromise
  .then(messageSusses)
  .catch(messageWarning);

thirdPromise
  .then(messageSusses)
  .catch(messageWarning);
