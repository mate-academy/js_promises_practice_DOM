'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise(resolve => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mouseup', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    showMessage('first', 'success');
  })
  .catch(() => {
    showMessage('first', 'error');
  });

secondPromise
  .then(() => {
    showMessage('second', 'success');
  });

thirdPromise
  .then(() => {
    showMessage('third', 'success');
  });

function showMessage(index, result) {
  const message = createMessageHTML(index, result);

  document.body.insertAdjacentHTML('beforeend', message);
}

function createMessageHTML(index, result) {
  const promiseResult = result === 'success' ? 'resolved' : 'rejected';

  return `
    <div
      class="message message--${index} message--${result}"
      data-qa="notification"
    >
      ${capWord(index)} promise was ${promiseResult}
    </div>
  `;
}

function capWord(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
