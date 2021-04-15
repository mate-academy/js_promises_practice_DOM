'use strict';

const createMessage = (type, content) => {
  const message = document.createElement('div');

  switch (type) {
    case 'success':
      message.classList.add('success');
      message.innerText = `${content} promise was resolved`;
      break;
    case 'warning':
      message.classList.add('warning');
      message.innerText = `${content} promise was rejected`;
      break;
  }

  message.setAttribute('data-qa', 'notification');

  document.body.append(message);
};

new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());

  setTimeout(() => {
    reject(new Error());
  }, 3000);
})
  .then(
    () => createMessage('success', 'First')
  )
  .catch(
    () => createMessage('warning', 'First')
  );

new Promise((resolve) => {
  document.addEventListener('click', () => resolve());
  document.addEventListener('contextmenu', () => resolve());
})
  .then(
    () => createMessage('success', 'Second')
  );

new Promise((resolve) => {
  document.addEventListener('click', () => resolve('contextmenu'));
  document.addEventListener('contextmenu', () => resolve('click'));
})
  .then((result) =>
    new Promise((resolve) => document.addEventListener(result, () => resolve()))
  )
  .then(
    () => createMessage('success', 'Third')
  );
