'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

const firstSuccesHandler = (dataFromResolve) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.classList.add('success');

  div.innerHTML = dataFromResolve;

  body.append(div);
};
const firstRejectedHandler = (dataFromReject) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.classList.add('warning');

  div.innerHTML = dataFromReject;

  body.append(div);
};

firstPromise.then(firstSuccesHandler, firstRejectedHandler);

const secondsPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('auxclick', () => {
    resolve('Second promise was resolved');
  });
});

const secondSuccesHandler = (dataFromResolve) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.classList.add('success');

  div.innerHTML = dataFromResolve;

  body.append(div);
};

const secondRejectedHandler = (dataFromReject) => {
  return dataFromReject;
};

secondsPromise.then(secondSuccesHandler, secondRejectedHandler);

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Third promise was resolved');
  });
});

const thirdSuccesHandler = (dataFromResolve) => {
  document.addEventListener('auxclick', () => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';

    div.classList.add('success');

    div.innerHTML = dataFromResolve;

    body.append(div);
  });
};

const thirdRejectedHandler = (dataFromReject) => {
  return dataFromReject;
};

thirdPromise.then(thirdSuccesHandler, thirdRejectedHandler);
