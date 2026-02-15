'use strict';

const div = document.createElement('div');

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3 * 1000);

  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
    clearTimeout(timeOut);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});
const thirdPromise = new Promise((resolve, reject) => {
  let leftBtn = false;
  let rightBtn = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;
    }

    if (e.button === 2) {
      rightBtn = true;
    }

    if (leftBtn === true && rightBtn === true) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.classList.remove('error');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch((error) => {
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.classList.remove('success');
    div.textContent = error.message;
    document.body.appendChild(div);
  });

secondPromise
  .then((message) => {
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.classList.remove('error');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch((error) => {
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.classList.remove('success');
    div.textContent = error.message;
    document.body.appendChild(div);
  });

thirdPromise
  .then((message) => {
    div.setAttribute('data-qa', 'notification');
    div.classList.remove('error');
    div.classList.add('success');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch((error) => {
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.classList.remove('success');
    div.textContent = error.message;
    document.body.appendChild(div);
  });
