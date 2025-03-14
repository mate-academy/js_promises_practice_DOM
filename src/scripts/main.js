'use strict';

// FIRST PROMISE

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve();
  });

  const timeout = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});


firstPromise
.then(() => {
    messageConstructor(`First promise was resolved`);
  })
  .catch((error) => {
    messageConstructor(error.message, true);
  });

  // SECOND PROMISE

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve();
      }
    });
  });

  secondPromise.then(() => {
    messageConstructor('Second promise was resolved');
  });

  // THIRD PROMISE

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve();
      }
    });
  });

    // messageConstructor

  function messageConstructor(text, isError = false) {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('success');

    if (isError) {
      message.classList.add('error');
    }

    message.textContent = text;
    document.body.append(message);
  }
thirdPromise.then(() => {
  messageConstructor('Third promise was resolved');
});
