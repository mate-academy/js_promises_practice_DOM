'use strict';

const showMessage = (message, className) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = message;
  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(res => showMessage(res, 'success'))
  .catch(res => showMessage(res, 'warning'));

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then(res => showMessage(res, 'success'))
  .catch(res => alert(res));

const thirdPromise = new Promise(resolve => {
  let leftClicked = false;
  let rightClicked = false;

  const checkClick = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    checkClick();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkClick();
  });
});

thirdPromise
  .then(res => showMessage(res, 'success'))
  .catch(res => alert(res));
