'use strict';

function createMessage(className, text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(className);
  message.textContent = text;

  return message;
}

const root = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  root.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  root.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  root.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved!');
  });
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const leftClickListener = () => {
    leftClick = true;
    checkClicks();
  };

  const rightClickListener = () => {
    rightClick = true;
    checkClicks();
  };

  const checkClicks = () => {
    if (leftClick && rightClick) {
      root.removeEventListener('click', leftClickListener);
      root.removeEventListener('contextmenu', rightClickListener);
      resolve('Third promise was resolved!');
    }
  };

  root.addEventListener('click', leftClickListener);
  root.addEventListener('contextmenu', rightClickListener);
});

promise1
  .then(message => {
    root.appendChild(createMessage('success', message));
  })
  .catch(error => {
    root.appendChild(createMessage('warning', error));
  });

promise2
  .then(message => {
    root.appendChild(createMessage('success', message));
  })
  .catch(error => {
    root.appendChild(createMessage('warning', error));
  });

promise3
  .then(message => {
    root.appendChild(createMessage('success', message));
  })
  .catch(error => {
    root.appendChild(createMessage('warning', error));
  });
