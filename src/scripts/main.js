'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((error) => {
    showMessage(error.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  const message = 'Second promise was resolved';

  document.addEventListener('click', () => resolve(message));
  document.addEventListener('contextmenu', () => resolve(message));
});

secondPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((error) => {
    showMessage(error.message, 'error');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;
  const message = 'Third promise was resolved';

  const checkCompletion = () => {
    // Ця функція перевіряє, чи не час виконати проміс
    if (leftClicked && rightClicked) {
      resolve(message);
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    checkCompletion();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkCompletion();
  });
});

thirdPromise.then(showMessage);

function showMessage(text, type = 'success') {
  const messageDiv = document.createElement('div');
  const className = type === 'error' ? 'message error-message' : 'message';

  messageDiv.className = className;
  messageDiv.textContent = text;
  document.body.append(messageDiv);
}
