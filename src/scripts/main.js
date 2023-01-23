'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('first');
  });

  setTimeout(() => {
    reject(new Error('first'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('second');
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('second');
  });
});

const thirdPromise = new Promise(resolve => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    checkClicks();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    checkClicks();
  });

  function checkClicks() {
    if (leftClick && rightClick) {
      resolve('third');
    }
  }
});

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess);
thirdPromise.then(onSuccess);

function onSuccess(data) {
  showMessage(data, 'success');
}

function onError(data) {
  showMessage(data.message, 'error');
}

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
