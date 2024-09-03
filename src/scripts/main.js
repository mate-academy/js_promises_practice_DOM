function createMessage(message, className) {
  const messageDiv = document.createElement('div');

  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.className = className;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  document.addEventListener('click', () => {
    if (!resolved) {
      resolved = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  function handleClick() {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleClick);
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  function handleLeftClick() {
    leftClick = true;
    checkBothClicked();
  }

  function handleRightClick() {
    rightClick = true;
    checkBothClicked();
  }

  function checkBothClicked() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

firstPromise
  .then((message) => createMessage(message, 'success'))
  .catch((error) => createMessage(error.message, 'error'));

secondPromise.then((message) => createMessage(message, 'success'));

thirdPromise.then((message) => createMessage(message, 'success'));
