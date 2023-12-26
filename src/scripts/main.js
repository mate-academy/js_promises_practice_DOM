'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const leftClickListener = () => {
    leftClicked = true;
    checkClicks();
  };

  const rightClickListener = () => {
    rightClicked = true;
    checkClicks();
  };

  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');

      document.removeEventListener('click', leftClickListener);
      document.removeEventListener('contextmenu', rightClickListener);
    }
  };

  document.addEventListener('click', leftClickListener);
  document.addEventListener('contextmenu', rightClickListener);
});

firstPromise
  .then(res => {
    showMessage(res);
  })
  .catch(err => {
    showMessage(err.message, 'warning');
  });

secondPromise.then(res => {
  showMessage(res);
});

thirdPromise.then(res => {
  showMessage(res);
});

function showMessage(message, type = 'success') {
  document.body.insertAdjacentHTML('beforeend', `
  <div
    data-qa="notification"
    class="
      ${type === 'warning' ? 'warning' : 'success'}
    "
  >
    ${message}
  </div>
`);
}
