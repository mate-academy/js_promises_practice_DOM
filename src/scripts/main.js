const showNotification = (message, type) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  const onLeftClick = () => {
    isResolved = true;
    clearTimeout(timer);
    resolve('First promise was resolved');
    document.removeEventListener('click', onLeftClick);
  };

  const timer = setTimeout(() => {
    if (!isResolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', onLeftClick);
    }
  }, 3000);

  document.addEventListener('click', onLeftClick);
});

const secondPromise = new Promise((resolve) => {
  const resolvePromise = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', resolvePromise);
    document.removeEventListener('contextmenu', resolvePromise);
  };

  document.addEventListener('click', resolvePromise);
  document.addEventListener('contextmenu', resolvePromise);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkResolution = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    checkResolution();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkResolution();
  });
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));
