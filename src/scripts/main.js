const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const handleLeftClick = (clickEvent) => {
    if (clickEvent.button === 0 && !resolved) {
      resolved = true;
      resolve('First promise was resolved');

      document.removeEventListener('click', handleLeftClick);
      clearTimeout(timer);
    }
  };

  const timer = setTimeout(() => {
    if (!resolved) {
      resolved = true;
      reject(new Error('First promise was rejected'));

      document.removeEventListener('click', handleLeftClick);
    }
  }, 3000);

  document.addEventListener('click', handleLeftClick);
});

const secondPromise = new Promise((resolve) => {
  let resolved = false;

  const handleClick = (clickEvent) => {
    if (!resolved && (clickEvent.button === 0 || clickEvent.button === 2)) {
      resolved = true;
      resolve('Second promise was resolved');

      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  let resolved = false;

  const handleClick = (clickEvent) => {
    if (clickEvent.button === 0) {
      leftClicked = true;
    }

    if (clickEvent.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');

      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

secondPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

thirdPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });
