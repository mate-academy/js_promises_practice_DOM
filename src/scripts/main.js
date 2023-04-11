'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  const fisrtClick = body.addEventListener('click', () => {
    resolve();
  });

  if (!fisrtClick) {
    setTimeout(() => {
      reject(Error);
    }, 3000);
  }
});

function resolveMessage(number) {
  const div = document.createElement('div');

  div.className = 'success';
  div.textContent = `${number} promise was resolved`;
  div.dataset.qa = 'notification';
  body.append(div);
};

function rejectMessage(number) {
  const div = document.createElement('div');

  div.className = 'warning';
  div.textContent = `${number} promise was rejected`;
  div.dataset.qa = 'notification';
  body.append(div);
}

firstPromise
  .then((data) => {
    resolveMessage('First');
  })
  .catch((data) => {
    rejectMessage('First');
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

secondPromise
  .then((data) => {
    resolveMessage('Second');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', (evt) => {
    if (evt.button === 0) {
      leftClick = true;
    }

    if (evt.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      resolve();
    }
  });
});

thirdPromise
  .then((data) => {
    resolveMessage('Third');
  });
