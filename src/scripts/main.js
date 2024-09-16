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

function appendMessage(data) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (data instanceof Error) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  div.innerHTML = data;
  document.body.append(div);
}

firstPromise
  .then((message) => appendMessage(message))
  .catch((error) => appendMessage(error));
secondPromis.then((message) => appendMessage(message));
thirdPromis.then((message) => appendMessage(message));
