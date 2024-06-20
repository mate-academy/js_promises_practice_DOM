'use strict';

'use strict';

const body = document.querySelector('body');

let leftClickOccurred = false;
let rightClickOccurred = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClickOccurred = true;
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Timeout occurred'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClickOccurred = true;
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickOccurred = true;
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (rightClickOccurred && leftClickOccurred) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (rightClickOccurred && leftClickOccurred) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    body.appendChild(
      createMessageElement('First promise was resolved', 'success'),
    );
  })
  .catch(() => {
    body.appendChild(
      createMessageElement('First promise was rejected', 'error'),
    );
  });

secondPromise.then(() => {
  body.appendChild(
    createMessageElement('Second promise was resolved', 'success'),
  );
});

thirdPromise.then(() => {
  body.appendChild(
    createMessageElement('Third promise was resolved', 'success'),
  );
});

function createMessageElement(message, type) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('message');
  el.classList.add(type);
  el.textContent = message;

  return el;
}
