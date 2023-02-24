'use strict';

function createMessage(message, type, posTop, posRight) {
  const div = document.createElement('div');

  div.innerHTML = `
    <div data-qa="notification" class="message ${type}">
      ${message}
    </div>
  `;

  div.style.position = 'absolute';
  div.style.top = posTop + 'px';
  div.style.right = posRight + 'px';
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearInterval(timeoutId);

    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Third promise was resolved');
    });
  });
});

firstPromise
  .then(result => createMessage(result, 'success', 50, 50))
  .catch(error => createMessage(error, 'warning', 50, 350));

secondPromise
  .then(result => createMessage(result, 'success', 200, 50));

thirdPromise
  .then(result => createMessage(result, 'success', 350, 50));
