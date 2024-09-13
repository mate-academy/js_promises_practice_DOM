'use strict';
'use strict';

function createMessage() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  document.body.append(div);

  return div;
}

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise(function (resolve, reject) {
  const rejectTimer = setTimeout(() => {
    reject(new Error('First promise was resolved'));
  }, 3000);

  document.addEventListener('click', () => {
    leftClick = true;
    clearTimeout(rejectTimer);
    resolve();
  });
});

firstPromise
  .then(() => {
    const firstDiv = createMessage();

    firstDiv.classList.add('success');
    firstDiv.textContent = 'First promise was resolved';
  })
  .catch(() => {
    const firstDiv = createMessage();

    firstDiv.classList.add('error');
    firstDiv.textContent = 'First promise was rejected';
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    resolve();
  });
});

secondPromise.then(() => {
  const secondDiv = createMessage();

  secondDiv.classList.add('success');
  secondDiv.textContent = 'Second promise was resolved';
});

const serdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    if (leftClick && rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

serdPromise.then(() => {
  const serdDiv = createMessage();

  serdDiv.classList.add('success');
  serdDiv.textContent = 'Third promise was resolved';
});
