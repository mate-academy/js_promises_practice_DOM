'use strict';

const body = document.body;

const promise1 = new Promise((resolve, reject) => {
  const rejectId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const handleClick = () => {
    clearTimeout(rejectId);
    resolve('First promise was resolved');
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);
});

const promise2 = new Promise((resolve, reject) => {
  const handleLeftClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const createThirdPromise = () => {
  let leftClick = false;
  let rightClick = false;

  return new Promise((resolve, reject) => {
    const clickedBoth = () => {
      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', handleLeftClick);
        document.removeEventListener('contextmenu', handleRightClick);
      }
    };
    const handleLeftClick = () => {
      leftClick = true;
      clickedBoth();
    };
    const handleRightClick = (e) => {
      e.preventDefault();
      rightClick = true;
      clickedBoth();
    };

    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleRightClick);
  });
};

const promise3 = createThirdPromise();

const promiseHandler = (response) => {
  const div = document.createElement('div');
  const error = response instanceof Error;

  div.className = error ? 'error' : 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = error ? response.message : response;
  body.appendChild(div);
};

promise1.then(promiseHandler).catch(promiseHandler);
promise2.then(promiseHandler);
promise3.then(promiseHandler);
