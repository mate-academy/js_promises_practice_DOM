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
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const firstDiv = createNotification();

    firstDiv.classList.add('success');
    firstDiv.textContent = 'First promise was resolved';
  })

  .catch(() => {
    const firstDiv = createNotification();

    firstDiv.classList.add('error');
    firstDiv.textContent = 'First promise was rejected';
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

secondPromise.then(() => {
  const secondDiv = createNotification();

  secondDiv.classList.add('success');
  secondDiv.textContent = 'Second promise was resolved';
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
    event.preventDefault();
    rightClicked = true;
    callback();
  });
});

thirdPromise.then(() => {
  const thirdDiv = createNotification();

  thirdDiv.classList.add('success');
  thirdDiv.textContent = 'Third promise was resolved';
});
