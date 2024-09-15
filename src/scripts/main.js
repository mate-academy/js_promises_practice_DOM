'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clicked = true;
  });

  if (!clicked) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

const secondPromis = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromis = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

const successHandler = (dataFromResolve) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.innerHTML = dataFromResolve;
  document.body.append(div);
};

const errorHandler = (dataFromReject) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.innerHTML = dataFromReject;
  document.body.append(div);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromis.then(successHandler);
thirdPromis.then(successHandler);
