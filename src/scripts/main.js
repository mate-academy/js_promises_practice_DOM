'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    const msgComplite = document.createElement('div');

    msgComplite.classList.add('success');
    msgComplite.innerText = 'First promise was resolved';
    msgComplite.dataset.qa = 'notification';

    resolve(msgComplite);
  });

  const msgError = document.createElement('div');

  msgError.classList.add('warning');
  msgError.innerText = 'First promise was rejected';
  msgError.dataset.qa = 'notification';
  setTimeout(() => reject(msgError), 3000);
}
);

const secondPrimise = new Promise((resolve) => {
  const msgComplite = document.createElement('div');

  msgComplite.classList.add('success');
  msgComplite.innerText = 'Second promise was resolved';
  msgComplite.dataset.qa = 'notification';

  document.addEventListener('click', () => {
    resolve(msgComplite);
  });

  document.addEventListener('contextmenu', () => {
    resolve(msgComplite);
  });
});

const thirdPromise = new Promise((resolve) => {
  const msgComplite = document.createElement('div');

  msgComplite.classList.add('success');
  msgComplite.innerText = 'Third promise was resolved';
  msgComplite.dataset.qa = 'notification';

  let counter = 0;

  document.addEventListener('click', () => {
    counter++;
  });

  document.addEventListener('contextmenu', () => {
    if (counter >= 1) {
      resolve(msgComplite);
    }
  });
});

firstPromise.then((msg) => body.prepend(msg))
  .catch((msg) => body.prepend(msg));

secondPrimise.then((msg) => body.prepend(msg));

thirdPromise.then((msg) => body.prepend(msg));
