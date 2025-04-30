'use strict';

const html = document.querySelector('html');

const firstPromise = new Promise((resolve, reject) => {
  html.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  html.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  html.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const clicks = {
    left: 0,
    right: 0,
  };

  html.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    clicks.right = true;

    if (clicks.left && clicks.right) {
      resolve('Third promise was resolved');
    }
  });

  html.addEventListener('click', (e) => {
    clicks.left = true;

    if (clicks.left && clicks.right) {
      resolve('Third promise was resolved');
    }
  });
});

const notifySuccess1 = document.createElement('div');

notifySuccess1.classList.add('success');
notifySuccess1.setAttribute('data-qa', 'notification');

const notifyError1 = document.createElement('div');

notifyError1.classList.add('error');
notifyError1.setAttribute('data-qa', 'notification');

const notifySuccess2 = document.createElement('div');

notifySuccess2.classList.add('success');
notifySuccess2.setAttribute('data-qa', 'notification');

const notifyError2 = document.createElement('div');

notifyError2.classList.add('error');
notifyError2.setAttribute('data-qa', 'notification');

const notifySuccess3 = document.createElement('div');

notifySuccess3.classList.add('success');
notifySuccess3.setAttribute('data-qa', 'notification');

const notifyError3 = document.createElement('div');

notifyError3.classList.add('error');
notifyError3.setAttribute('data-qa', 'notification');

firstPromise
  .then((message) => {
    notifySuccess1.innerHTML = message;
    document.body.appendChild(notifySuccess1);
  })
  .catch((error) => {
    notifyError1.innerHTML = error.message;
    document.body.appendChild(notifyError1);
  });

secondPromise
  .then((message) => {
    notifySuccess2.innerHTML = message;
    document.body.appendChild(notifySuccess2);
  })
  .catch((error) => {
    notifyError2.innerHTML = error.message;
    document.body.appendChild(notifyError2);
  });

thirdPromise
  .then((message) => {
    notifySuccess3.innerHTML = message;
    document.body.appendChild(notifySuccess3);
  })
  .catch((error) => {
    notifyError3.innerHTML = error.message;
    document.body.appendChild(notifyError3);
  });
