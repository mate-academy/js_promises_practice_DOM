'use strict';

const body = document.querySelector('body');

const handlePromise = (resultStatus, text) => (
  body.insertAdjacentHTML(
    'beforeend',
    `<div
      data-qa="notification"
      class=${resultStatus}
    >
      ${text}
    </div>>`
  )
);

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => (
    resolve('First promise was resolved')
  ));

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(result => (
    handlePromise('success', result)
  ))
  .catch(err => (
    handlePromise('warning', err)
  ));

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => (
    resolve('Second promise was resolved')
  ));

  document.addEventListener('contextmenu', () => (
    resolve('First promise was resolved')
  ));
});

secondPromise
  .then(result => (
    handlePromise('success', result)
  ));

const thirdPromise = new Promise(resolve => {
  document.addEventListener('click', () => (
    resolve('click')
  ));

  document.addEventListener('contextmenu', () => (
    resolve('contextmenu')
  ));
});

thirdPromise
  .then((result) => {
    let listener;

    if (result === 'click') {
      listener = 'contextmenu';
    } else {
      listener = 'click';
    }

    return new Promise(resolve => (
      document.addEventListener(listener, () => (
        resolve('Third promise was resolved')
      ))
    ));
  })
  .then(result => (
    handlePromise('success', result)
  ));
