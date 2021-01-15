'use strict';

function createMessage(counter, messageClass, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('notification', `${messageClass}`);
  div.innerHTML = `<h2>${counter} promise was ${type}</h2>`;
  document.body.append(div);
};

function promiseFirst() {
  return new Promise((resolve, reject) => {
    const resolver = () => {
      createMessage('First', 'success', 'resolved');
      clearInterval(timer);
      document.removeEventListener('mousedown', resolver);
      resolve();
    };

    document.addEventListener('mousedown', resolver);

    const timer = setTimeout(() => {
      createMessage('First', 'warning', 'rejected');
      document.removeEventListener('mousedown', resolver);
      reject(Error);
    }, 3000);
  }
  );
};

function promiseSecond() {
  return new Promise((resolve) => {
    const resolver = (e) => {
      if (e.button === 0 || e.button === 2) {
        createMessage('Second', 'success', 'resolved');
        resolve();
        document.removeEventListener('mousedown', resolver);
      };
    };

    document.addEventListener('mousedown', resolver);
  });
};

function promiseThird() {
  return new Promise((resolve) => {
    let buttonLeft;
    let buttonRight;
    const resolver = (e) => {
      switch (e.button) {
        case 0: buttonLeft = true; break;
        case 2: buttonRight = true; break;
      }

      if (buttonLeft && buttonRight) {
        createMessage('Third', 'success', 'resolved');
        resolve();
        document.removeEventListener('mousedown', resolver);
      };
    };

    document.addEventListener('mousedown', resolver);
  });
};

promiseFirst();
promiseSecond();
promiseThird();
