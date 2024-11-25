const documentElement = document.querySelector('body');

const createNotification = (message, isSuccess = true) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(isSuccess ? 'success' : 'error');
  notification.textContent = message;
  document.body.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  documentElement.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  documentElement.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  documentElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  documentElement.addEventListener('click', () => {
    if (rightClick) {
      resolve('Third promise was resolved');
    }
    leftClick = true;
  });

  documentElement.addEventListener('contextmenu', () => {
    if (leftClick) {
      resolve('Third promise was resolved');
    }

    rightClick = true;
  });
});

firstPromise
  .then(createNotification)
  .catch((error) => createNotification(error.message, false));

secondPromise.then(createNotification);

thirdPromise.then(createNotification);
