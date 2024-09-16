'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error());
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);

    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  const handleEvent = (e) => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleEvent);
  document.addEventListener('contextmenu', handleEvent);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleEvents = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;

    handleEvents();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    handleEvents();
  });
});

function appendMessage(text) {
  const divMessage = document.createElement('div');

  divMessage.dataset.qa = 'notification';

  divMessage.textContent = text;

  // if first promise has error
  if (!text) {
    divMessage.classList.add('error');
    divMessage.textContent = 'First promise was rejected';
  } else {
    divMessage.classList.add('success');
  }

  document.body.append(divMessage);
}

firstPromise
  .then((message) => {
    appendMessage(message);
  })
  .catch(() => {
    appendMessage('');
  });

secondPromise.then((message) => {
  appendMessage(message);
});

thirdPromise.then((message) => {
  appendMessage(message);
});
