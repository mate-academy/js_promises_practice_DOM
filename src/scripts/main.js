'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  };

  const rightClick = (e) => {
    e.preventDefault();

    if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', rightClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(msg, type = 'success') {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');

  message.classList.add(type);

  message.textContent = type === 'error' ? msg.message : msg;

  document.body.append(message);
}

firstPromise
  .then((m) => {
    showNotification(m, 'success');
  })
  .catch((e) => {
    showNotification(e, 'error');
  });

secondPromise.then((m) => {
  showNotification(m, 'success');
});

thirdPromise.then((m) => {
  showNotification(m, 'success');
});
