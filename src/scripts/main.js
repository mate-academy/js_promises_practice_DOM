'use strict';

const body = document.querySelector('body');

document.oncontextmenu = (e) => {
  e.preventDefault();
};

const firstPromise = new Promise((resolve, reject) => {
  document.onclick = () => {
    resolve('First promise was resolved');
  };

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.onmousedown = (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };
});

const thirdPromise = new Promise((resolve) => {
  document.onclick = (e1) => {
    document.oncontextmenu = (e2) => {
      e2.preventDefault();
      resolve('Third promise was resolved');
    };
  };
});

firstPromise
  .then((successMessage) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = successMessage;
    body.append(div);
  })
  .catch((errorMessage) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = errorMessage.message;
    body.append(div);
  });

secondPromise.then((successMessage) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = successMessage;
  body.append(div);
});

thirdPromise.then((successMessage) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = successMessage;
  body.append(div);
});
