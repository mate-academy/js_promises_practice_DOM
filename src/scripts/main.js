'use strict';

const removeNotification = (element, time) => {
  setTimeout(() => {
    element.parentNode.removeChild(element);
  }, time);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.textContent = message;
    div.setAttribute('data-qa', 'notification');

    document.body.appendChild(div);

    removeNotification(div, 3000);
  })
  .catch((error) => {
    setTimeout(() => {
      const div = document.createElement('div');

      div.classList.add('error');
      div.textContent = error;
      div.setAttribute('data-qa', 'notification');

      document.body.appendChild(div);

      removeNotification(div, 3000);
    }, 3000);
  });

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleClick(e);
  });
});

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = message;
  div.setAttribute('data-qa', 'notification');

  document.body.appendChild(div);

  removeNotification(div, 3000);
});

const thirdPromise = new Promise((resolve, reject) => {
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
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    handleClick(e);
  };

  document.addEventListener('click', handleClick);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleClick(e);
  });
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = message;
  div.setAttribute('data-qa', 'notification');

  document.body.appendChild(div);

  removeNotification(div, 3000);
});
