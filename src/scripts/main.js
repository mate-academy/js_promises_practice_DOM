function showNotification(message, type) {
  const existNotif = document.querySelectorAll('[data-qa="notification"]');

  existNotif.forEach((el) => el.remove());

  const div = document.createElement('div');

  div.textContent = message;
  div.classList.add(type);
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
}

let firstResolved = false;
let firstRejected = false;

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0 && !firstResolved && !firstRejected) {
      document.removeEventListener('click', onClick);
      firstResolved = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!firstResolved && !firstRejected) {
      document.removeEventListener('click', onClick);
      firstRejected = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

const secondPromise = new Promise((resolve) => {
  const onRightClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      document.removeEventListener('contextmenu', onRightClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('contextmenu', onRightClick);
});

secondPromise.then((msg) => showNotification(msg, 'success'));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBothClicked = () => {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);
      resolve('Third promise was resolved');
    }
  };

  const onLeftClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBothClicked();
    }
  };

  const onRightClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      rightClicked = true;
      checkBothClicked();
    }
  };

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

thirdPromise.then((msg) => showNotification(msg, 'success'));
