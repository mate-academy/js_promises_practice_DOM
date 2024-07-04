'use strict';
'use strict';

const handleSuccess = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = `${message} promise was resolved`;
  document.body.appendChild(div);
};

const handleError = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = `${message} promise was rejected`;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();

      if (e.button === 2) {
        e.preventDefault();
      }
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleLeftClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      document.removeEventListener('mousedown', handleLeftClick);

      if (rightClicked) {
        resolve();
      }
    }
  };

  const handleRightClick = (e) => {
    if (e.button === 2) {
      rightClicked = true;
      e.preventDefault();
      document.removeEventListener('mousedown', handleRightClick);

      if (leftClicked) {
        resolve();
      }
    }
  };

  document.addEventListener('mousedown', handleLeftClick);
  document.addEventListener('mousedown', handleRightClick);
});

firstPromise
  .then(() => handleSuccess('First'))
  .catch(() => handleError('First'));

secondPromise
  .then(() => handleSuccess('Second'))
  .catch(() => handleError('Second'));

thirdPromise
  .then(() => handleSuccess('Third'))
  .catch(() => handleError('Third'));
