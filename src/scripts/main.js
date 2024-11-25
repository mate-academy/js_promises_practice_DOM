'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const callback = (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  };

  document.addEventListener('click', callback);
  document.addEventListener('contextmenu', callback);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const callback = (e) => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    callback();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClicked = true;
    callback();
  });
});

function addMessage(text, isError) {
  const div = document.createElement('div');

  div.textContent = text;
  div.classList.add(isError ? 'error' : 'success');
  div.dataset.qa = 'notification';

  document.body.append(div);
}

[firstPromise, secondPromise, thirdPromise].forEach((promise) => {
  promise
    .then((message) => {
      addMessage(message);
    })
    .catch((message) => {
      addMessage(message, true);
    });
});
