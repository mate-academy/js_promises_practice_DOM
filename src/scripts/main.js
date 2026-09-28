'use strict';

function createMessage(text, isError = false) {
  const className = isError ? 'error' : 'success';

  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="${className}">${text}</div>`,
  );
}

const promise1 = new Promise((resolve, reject) => {
  const clickHandler = () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  };

  document.addEventListener('click', clickHandler, { once: true });

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', clickHandler);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then((message) => createMessage(message))
  .catch((error) => createMessage(error.message, true));

const promise2 = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
    }

    document.removeEventListener('click', clickHandler);
    document.removeEventListener('contextmenu', clickHandler);

    resolve('Second promise was resolved');
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

promise2
  .then((message) => createMessage(message))
  .catch((error) => createMessage(error.message, true));

const promise3 = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function handleLeftClick() {
    isLeftClicked = true;

    if (isLeftClicked && isRightClicked) {
      document.removeEventListener('contextmenu', handleRightClick);
      resolve('Third promise was resolved');
    }
  }

  function handleRightClick(e) {
    e.preventDefault();
    isRightClicked = true;

    if (isLeftClicked && isRightClicked) {
      document.removeEventListener('click', handleLeftClick);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', handleLeftClick, { once: true });
  document.addEventListener('contextmenu', handleRightClick, { once: true });
});

promise3
  .then((message) => createMessage(message))
  .catch((error) => createMessage(error.message, true));
