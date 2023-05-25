'use strict';

const showNotification = ([numberPromise, type]) => {
  const message = document.createElement('div');

  message.classList.add(
    `${type === 'success' ? 'success' : 'warning'}`
  );
  message.setAttribute('data-qa', 'notification');

  message.innerHTML = `
    <p>
       ${numberPromise} promise was ${type === 'success' ? 'resolved' : 'rejected'}
    </p>
  `;

  document.body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(['First', 'success']);
  });

  setTimeout(() => {
    reject(['First', 'reject']);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(['Second', 'success']);
  });

  document.addEventListener('contextmenu', () => {
    resolve(['Second', 'success']);
  });
});

firstPromise
  .then(success => {
    showNotification(success);
  })
  .catch(error => {
    showNotification(error);
  });

secondPromise
  .then(success => {
    showNotification(success);
  })
  .catch(error => {
    showNotification(error);
  });

const thirdPromise = Promise.all([
  new Promise((resolve, reject) =>
    document.addEventListener('click', () => {
      resolve(['Third', 'success']);
    })
  ),
  new Promise((resolve, reject) =>
    document.addEventListener('contextmenu', () => {
      resolve(['Third', 'success']);
    })
  ),
]);

thirdPromise
  .then(success => showNotification(['Third', 'success']))
  .catch(error => showNotification(['Third', 'reject']));
