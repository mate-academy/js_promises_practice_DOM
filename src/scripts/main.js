'use strict';

const firstPromise = new Promise((resolve, reject) => {
  click('First promise was resolved', resolve);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  click('Second promise was resolved', resolve);

  document.oncontextmenu = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  };
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(showSuccessMessage)
  .catch((message) => {
    createMessage('warning', message);
  });

secondPromise.then(showSuccessMessage);

thirdPromise.then(showSuccessMessage);

function showSuccessMessage(message) {
  createMessage('success', message);
};

function click(text, resolver) {
  document.addEventListener('click', () => {
    resolver(text);
  });
}

function createMessage(type, description) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${type}">
      ${description}
    </div>
    `);
}
