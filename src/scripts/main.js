const showNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.textContent = message;
  notification.classList.add(type);

  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

firstPromise.then(
  (message) => {
    showNotification(message, 'success');
  },
  (error) => {
    showNotification(error.message, 'error');
  },
);

secondPromise.then((message) => {
  showNotification(message, 'success');
});

thirdPromise.then((message) => {
  showNotification(message, 'success');
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
