'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved', 'success');
  });

  setTimeout(reject, 3000, 'First promise was rejected', 'warning');
});

function createDiv(data, typeOfClass) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.classList.add(`${typeOfClass}`);

  div.innerHTML = data;

  body.append(div);
}

const firstSuccesHandler = (dataFromResolve, message) => {
  createDiv(dataFromResolve, message);
};
const firstRejectedHandler = (dataFromReject, message) => {
  createDiv(dataFromReject, message);
};

firstPromise.then(firstSuccesHandler).catch(firstRejectedHandler);

const secondsPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const secondSuccesHandler = (dataFromResolve) => {
  createDiv(dataFromResolve, 'success');
};

secondsPromise.then(secondSuccesHandler);

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

const thirdSuccesHandler = (dataFromResolve) => {
  createDiv(dataFromResolve, 'success');
};

thirdPromise.then(thirdSuccesHandler);
