'use strict';

const SUCCESS = 'success';
const ERROR = 'error';

const createMessageElement = () => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');

  return message;
};

function updateMessage(element, value, text) {
  element.classList.add(value);
  element.innerText = text;
  document.body.append(element);
}

// First promise
const firstMessage = createMessageElement();
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;

    const resolvedValue = 'First promise was resolved';

    resolve(resolvedValue);
  });

  setTimeout(() => {
    if (!clicked) {
      const rejectedValue = 'First promise was rejected';

      reject(rejectedValue);
    }
  }, 3000);
});

firstPromise
  .then((resolvedValue) => {
    updateMessage(firstMessage, SUCCESS, resolvedValue);
  })
  .catch((rejectedValue) => {
    updateMessage(firstMessage, ERROR, rejectedValue);
  });

// Second promise
const secondMessage = createMessageElement();
const secondPromise = new Promise((resolve, reject) => {
  const resolvePromise = () => {
    const resolvedValue = 'Second promise was resolved';

    resolve(resolvedValue);
  };

  document.addEventListener('click', resolvePromise);
  document.addEventListener('contextmenu', resolvePromise);
});

secondPromise.then((resolvedValue) => {
  updateMessage(secondMessage, SUCCESS, resolvedValue);
});

// Third promise
const thirdMessage = createMessageElement();
const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      const resolvedValue = 'Third promise was resolved';

      resolve(resolvedValue);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      const resolvedValue = 'Third promise was resolved';

      resolve(resolvedValue);
    }
  });
});

thirdPromise.then((resolvedValue) => {
  updateMessage(thirdMessage, SUCCESS, resolvedValue);
});
