'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClicked = false;
  let rightClicked = false;

  const firstPromise = new Promise((resolve, reject) => {
    const handleClick = (e) => {
      if (e.button === 0) {
        resolve('First promise was resolved on a left click in the document');
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);

    setTimeout(() => {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
      document.removeEventListener('click', handleClick);
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleClick(e);
    });
  });

  const thirdPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved after both left and right clicks');
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleClick(e);
    });
  });

  function appendNotification(message, isError) {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = isError ? 'notification error' : 'notification success';
    div.textContent = message;
    document.body.appendChild(div);
  }

  firstPromise
    .then((message) => appendNotification(message, false))
    .catch((error) => appendNotification(error.message, true));

  secondPromise.then((message) => appendNotification(message, false));

  thirdPromise.then((message) => appendNotification(message, false));
});
