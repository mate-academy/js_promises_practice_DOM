'use strict';

const body = document.querySelector('body');
const button = document.querySelector('.logo');

const promise1 = new Promise((resolve, reject) => {
  button.addEventListener('click', resolve);

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(
    () => {
      const message = document.createElement('div');

      message.classList.add('success');
      message.textContent = 'First promise was resolved';
      message.dataset.qa = 'notification';

      body.append(message);
    },
    () => {
      const errorMessage = document.createElement('div');

      errorMessage.classList.add('warning');
      errorMessage.textContent = 'First promise was rejected';
      errorMessage.dataset.qa = 'notification';

      body.append(errorMessage);
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
      const message = document.createElement('div');

      message.classList.add('success');
      message.textContent = 'Second promise was resolved';
      message.dataset.qa = 'notification';

      body.append(message);
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
      const message = document.createElement('div');

      message.classList.add('success');
      message.textContent = 'Third promise was resolved';
      message.dataset.qa = 'notification';

      body.append(message);
    }
  );
