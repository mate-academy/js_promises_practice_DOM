'use strict';

const body = document.body;

body.oncontextmenu = () => false;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    const firstMessage = createMessage('First promise was resolved');

    resolve(firstMessage);
  });

  const errorMessage = createMessage('First promise was rejected', 'warning');

  setTimeout(() => reject(errorMessage), 3000);
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('mousedown', e => {
    if (e.which === 1 || e.which === 3) {
      const secondMessage = createMessage('Second promise was resolved');

      resolve(secondMessage);
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftMouseButton;
  let rightMouseButton;

  body.addEventListener('mousedown', e => {
    if (e.which === 1) {
      leftMouseButton = 1;
    }

    if (e.which === 3) {
      rightMouseButton = 3;
    }

    if (leftMouseButton && rightMouseButton) {
      const thirdMessage = createMessage('Third promise was resolved');

      resolve(thirdMessage);
    }
  });
});

firstPromise.then(addMessage).catch(addMessage);
secondPromise.then(addMessage);
thirdPromise.then(addMessage);

function createMessage(text, className) {
  const message = `
    <div class"${className}" data-qa="notification">
      ${text}
    </div>
  `;

  return message;
}

function addMessage(message) {
  return body.insertAdjacentHTML('beforeend', message);
};
