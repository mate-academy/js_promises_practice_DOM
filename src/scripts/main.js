'use strict';

const notify = (state = 'success', message = '123') => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.classList.add(state);

  document.body.append(div);
};

const onSuccess = (message) => {
  notify('success', message);
};

const onError = (error) => {
  notify('warning', error.message);
};

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
})
  .then(
    onSuccess,
    onError,
  )
  .then(() => new Promise(resolve => {
    document.addEventListener('mouseup', ({ button }) => {
      if (button === 0 || button === 2) {
        resolve('Second promise was resolved');
      }
    });
  }))
  .then(success => {
    onSuccess(success);

    return new Promise(resolve => {
      let leftClick = false;
      let rightClick = false;

      document.addEventListener('mouseup', ({ button }) => {
        switch (button) {
          case 0:
            leftClick = true;
            break;

          case 2:
            rightClick = true;
            break;

          default:
            break;
        }

        if (leftClick && rightClick) {
          resolve('Third promise was resolved');
        }
      });
    });
  })
  .then(onSuccess);
