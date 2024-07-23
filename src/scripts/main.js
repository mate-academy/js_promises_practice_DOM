'use strict';

const succsesErrorFunc = (message, isSuccess) => {
  const successDiv = document.createElement('div');

  successDiv.setAttribute('data-qa', 'notification');
  successDiv.classList.add(isSuccess ? 'success' : 'error');
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
};

document.addEventListener('DOMContentLoaded', () => {
  // firstPromise

  const firstPromise = new Promise((resolve, reject) => {
    function handleClick(e) {
      if (e.button === 0) {
        resolve('First promise was resolved');
        document.removeEventListener('click', handleClick);
      }
    }

    document.addEventListener('click', handleClick);

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
      document.removeEventListener('click', handleClick);
    }, 3000);
  });

  firstPromise
    .then((message) => {
      succsesErrorFunc(message, true);
    })
    .catch((error) => {
      succsesErrorFunc(error, false);
    });

  // secondPromise
  const secondPromise = new Promise((resolve, reject) => {
    function handleLeftClick(e) {
      resolve('Second promise was resolved');
      document.body.removeEventListener('click', handleLeftClick);
    }

    function handleRightClick(e) {
      resolve('Second promise was resolved');
      document.body.removeEventListener('click', handleRightClick);
    }

    document.body.addEventListener('click', handleLeftClick);
    document.body.addEventListener('contextmenu', handleRightClick);
  });

  secondPromise
    .then((message) => {
      succsesErrorFunc(message, true);
    })
    .catch((error) => {
      succsesErrorFunc(error, false);
    });

  // thirdPromise
  const thirdPromise = new Promise((resolve, reject) => {
    let leftClicked = false;
    let rightClicked = false;

    const handleLeftClick = () => {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    };

    const handleRightClick = (e) => {
      e.preventDefault();

      rightClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleRightClick);
  });

  thirdPromise
    .then((message) => succsesErrorFunc(message, true))
    .catch((error) => {
      succsesErrorFunc(error, false);
    });
  document.addEventListener('contextmenu', (ev) => ev.preventDefault());
});
