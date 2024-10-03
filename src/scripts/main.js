let leftClickHappened = false;
let rightClickHappened = false;

const firstPromise = new Promise((resolve, reject) => {
  const clickListener = (evt) => {
    if (evt.button === 0) {
      // left click (button 0)
      resolve('First promise was resolved');
      document.removeEventListener('click', clickListener);
    }
  };

  document.addEventListener('click', clickListener);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', clickListener);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickListener = (evt) => {
    if (evt.button === 0 || evt.button === 2) {
      // left or right click
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickListener);
    }
  };

  document.addEventListener('click', clickListener);
});

const thirdPromise = new Promise((resolve) => {
  const clickListener = (evt) => {
    if (evt.button === 0) {
      // left click
      leftClickHappened = true;
    }

    if (evt.button === 2) {
      // right click
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickListener);
    }
  };

  document.addEventListener('click', clickListener);
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (error) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.setAttribute('data-qa', 'notification');
  div.textContent = error.message;
  document.body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler);

thirdPromise.then(successHandler);

document.addEventListener('contextmenu', (evt) => {
  evt.preventDefault();
});
