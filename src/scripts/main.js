'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', resolve);
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  const handler = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve) => {
  const handler = () => {
    resolve('Third promise was resolved');
  };

  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked) {
      handler();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked) {
      handler();
    }
  });
});

const promises = [firstPromise, secondPromise, thirdPromise];

for (const promise of promises) {
  promise.then(
    (success) => {
      addMessage(success);
    },
    (reject) => {
      addMessage(reject, true);
    },
  );
}

function addMessage(text, isError = false) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';

  if (isError) {
    message.className = 'error';
    message.textContent = text.message;
  } else {
    message.className = 'success';
    message.textContent = text;
  }

  document.body.append(message);
}
