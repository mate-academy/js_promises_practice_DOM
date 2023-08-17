'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  })

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000)
});

const promise2 = new Promise((resolve) => {
  const message = 'Second promise was resolved';

  document.addEventListener('click', () => {
    resolve(message);
  });
  document.addEventListener('contextmenu', () => {
    resolve(message)
  })
});

const click = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve();
    });
})

const contextmenu = new Promise((resolve, reject) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
})

const promise3 = Promise.all([click, contextmenu]);

function success(data) {
  const notificationDiv = document.createElement('div');

  notificationDiv.className = 'success';
  notificationDiv.textContent = `${data}`;
  notificationDiv.setAttribute('data-qa', 'notification');

  document.body.appendChild(notificationDiv);
}

function errorPromise(error) {
  const notificationDiv = document.createElement('div');

  notificationDiv.className = 'warning';
  notificationDiv.textContent = `${error}`;
  notificationDiv.setAttribute('data-qa', 'notification');

  document.body.appendChild(notificationDiv);
}

promise1
  .then((data) => {
    success(data);
  })
  .catch((error) => {
    errorPromise(error);
  });

promise2
  .then((data) => {
    success(data);
  });

promise3
  .then(() => {
    success('Third promise was resolved');
  })
  .catch((error) => {
    errorPromise(error);
  })


