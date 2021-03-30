'use strict';

const body = document.querySelector('body');
const button = document.querySelector('.logo');

function addMessage(className, promiseNumber, promiseStatus, datasetContent) {
  const message = document.createElement('div');

  message.classList.add(className);
  message.textContent = `${promiseNumber} promise was ${promiseStatus}`;
  message.dataset.qa = datasetContent;

  body.append(message);
}

const promise1 = new Promise((resolve, reject) => {
  button.addEventListener('click', resolve);

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(
    () => {
      addMessage('success', 'First', 'resolved', 'notification');
    },
    () => {
      addMessage('success', 'First', 'rejected', 'notification');
    }
  );

const promise2 = new Promise(resolve => {
  button.addEventListener('click', () => {
    resolve();
  });

  button.addEventListener('contextmenu', () => {
    resolve();
  });
});

promise2
  .then(
    () => {
      addMessage('success', 'Second', 'resolved', 'notification');
    }
  );

function waitFor(actionToListen) {
  return new Promise(resolve => {
    button.addEventListener(actionToListen, () => {
      resolve();
    });
  });
}

const promise3First = waitFor('click');
const promise3Second = waitFor('contextmenu');

promise3First
  .then(() => promise3Second)
  .then(
    () => {
      addMessage('success', 'Third', 'resolved', 'notification');
    }
  );
