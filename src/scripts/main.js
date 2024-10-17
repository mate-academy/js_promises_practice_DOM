'use strict';

const body = document.body;

async function handlePromise(promise) {
  try {
    const message = await promise;

    body.insertAdjacentHTML(
      'beforeend',
      `
      <div data-qa="notification" class="success">
        ${message}
      </div>
    `,
    );
  } catch (errorMessage) {
    body.insertAdjacentHTML(
      'beforeend',
      `
      <div data-qa="notification" class="error">
        ${errorMessage.message}
      </div>
    `,
    );
  }
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved');
    document.documentElement.removeEventListener('click', handleClick);
    clearTimeout(timerId);
  };

  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.documentElement.removeEventListener('click', handleClick);
  }, 3000);

  document.documentElement.addEventListener('click', handleClick);
});

handlePromise(firstPromise);

const secondPromise = new Promise((resolve) => {
  const handleEvent = () => {
    resolve('Second promise was resolved');

    document.documentElement.removeEventListener('click', handleEvent);
    document.documentElement.removeEventListener('contextmenu', handleEvent);
  };

  document.documentElement.addEventListener('click', handleEvent);
  document.documentElement.addEventListener('contextmenu', handleEvent);
});

handlePromise(secondPromise);

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;
  let resolved = false;

  document.documentElement.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
    }
  });

  document.documentElement.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
    }
  });
});

handlePromise(thirdPromise);
