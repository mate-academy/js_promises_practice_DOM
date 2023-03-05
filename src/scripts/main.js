'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

function createDiv(data, typeOfClass) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.classList.add(`${typeOfClass}`);

  div.innerHTML = data;

  body.append(div);
}

const firstSuccesHandler = (dataFromResolve) => {
  createDiv(dataFromResolve, 'succes');
};
const firstRejectedHandler = (dataFromReject) => {
  createDiv(dataFromReject, 'warning');
};

firstPromise.then(firstSuccesHandler).catch(firstRejectedHandler);

const secondsPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('auxclick', () => {
    resolve('Second promise was resolved');
  });
});

const secondSuccesHandler = (dataFromResolve) => {
  createDiv(dataFromResolve, 'success');
};

secondsPromise.then(secondSuccesHandler);

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('auxclick', () => {
      resolve('Third promise was resolved');
    });
  });
});

const thirdSuccesHandler = (dataFromResolve) => {
  createDiv(dataFromResolve, 'success');
};

thirdPromise.then(thirdSuccesHandler);
