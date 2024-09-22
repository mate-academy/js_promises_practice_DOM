'use strict';

function message(count, decide = 'resolved') {
  const SuccessMessage = document.createElement('div');

  SuccessMessage.setAttribute('class', 'success');
  SuccessMessage.setAttribute('data-qa', 'notification');

  SuccessMessage.textContent = `${count} promise was ${decide}`;

  return SuccessMessage;
}

const firstPromise = new Promise((resolve, reject) => {
  document.querySelector('.logo').addEventListener('click', () => {
    resolve(message('First'));
  });

  setTimeout(() => {
    reject(message('First', 'rejected'));
  }, 3000);
});

firstPromise
  .then((success) => {
    document.body.appendChild(success);
  })
  .catch((erorr) => {
    document.body.appendChild(erorr);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(message('Second'));
  });

  document.addEventListener('click', () => {
    resolve(message('Second'));
  });
});

secondPromise.then((success) => {
  document.body.appendChild(success);
});

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  document.addEventListener('click', () => {
    leftClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve(message('Third'));
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve(message('Third'));
    }
  });
});

thirdPromise.then((success) => {
  document.body.appendChild(success);
});
