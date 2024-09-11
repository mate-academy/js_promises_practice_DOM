'use strict';

function createNotification() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  document.body.append(div);

  return div;
}

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (action) => {
    if (action.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    const firstDiv = createNotification();

    firstDiv.classList.add('success');
    firstDiv.textContent = message;
  })

  .catch((error) => {
    const firstDiv = createNotification();

    firstDiv.classList.add('error');
    firstDiv.textContent = error.message;
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  const secondDiv = createNotification();

  secondDiv.classList.add('success');
  secondDiv.textContent = message;
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;
      checkClicks();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClicked = true;
      checkClicks();
    },
    { once: true },
  );
});

thirdPromise.then((message) => {
  const thirdDiv = createNotification();

  thirdDiv.classList.add('success');
  thirdDiv.textContent = message;
});
