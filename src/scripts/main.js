'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (clickEvent) => {
    if (clickEvent.button === 0) {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    }
  });

  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise

  .then((message) => {
    const element = document.createElement('div');

    element.setAttribute('data-qa', 'notification');
    element.classList.add('success');
    element.textContent = message;
    document.body.append(element);
  })

  .catch((error) => {
    const element = document.createElement('div');

    element.setAttribute('data-qa', 'notification');
    element.classList.add('error');
    element.textContent = error.message;
    document.body.append(element);
  });

const secondPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('contextmenu', (clickEvent) => {
    if (clickEvent.button === 2) {
      rightClicked = true;
    }

    if (leftClicked || rightClicked) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('click', (clickEvent) => {
    if (clickEvent.button === 0) {
      leftClicked = true;
    }

    if (leftClicked || rightClicked) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.classList.add('success');
  element.textContent = message;
  document.body.append(element);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('contextmenu', (clickEvent) => {
    if (clickEvent.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('click', (clickEvent) => {
    if (clickEvent.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.classList.add('success');
  element.textContent = message;
  document.body.append(element);
});
