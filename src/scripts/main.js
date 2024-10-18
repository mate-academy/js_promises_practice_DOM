'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    div.textContent = message;

    document.body.append(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');
    div.textContent = error.message;

    document.body.append(div);
  });

let clickLeft = false;
let clickRigth = false;

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      clickLeft = true;
    } else if (e.button === 2) {
      clickRigth = true;
    }

    if (clickLeft || clickRigth) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.append(div);
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      clickLeft = true;
    } else if (e.button === 2) {
      clickRigth = true;
    }

    if (clickLeft && clickRigth) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      clickLeft = true;
    } else if (e.button === 2) {
      clickRigth = true;
    }

    if (clickLeft && clickRigth) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.append(div);
});
