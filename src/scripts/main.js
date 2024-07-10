'use strict';

const createMessageElement = () => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');

  return message;
};

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
    firstMessage.classList.add('success');
    firstMessage.innerText = resolvedValue;

    document.body.append(firstMessage);
  })
  .catch((rejectedValue) => {
    firstMessage.classList.add('error');
    firstMessage.innerText = rejectedValue;

    document.body.append(firstMessage);
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
  secondMessage.classList.add('success');
  secondMessage.innerText = resolvedValue;
  document.body.append(secondMessage);
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
  thirdMessage.classList.add('success');
  thirdMessage.innerText = resolvedValue;
  document.body.append(thirdMessage);
});
