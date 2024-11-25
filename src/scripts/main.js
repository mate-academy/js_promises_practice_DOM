'use strict';

function createMessage(text, className = `success`) {
  const div = document.createElement('div');

  div.classList = className;
  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  document.body.append(div);
}

function addClickHandlers(mouseClick) {
  document.addEventListener('click', mouseClick);
  document.addEventListener('contextmenu', mouseClick);
}

function removeClickHandlers(mouseClick) {
  document.removeEventListener('click', mouseClick);
  document.removeEventListener('contextmenu', mouseClick);
}

const firstPromise = new Promise((resolve, reject) => {
  const leftClick = (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
      document.removeEventListener('click', leftClick);
    }
  };

  document.addEventListener('click', leftClick);

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
    document.removeEventListener('click', leftClick);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const mouseClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
    }

    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }

    removeClickHandlers(mouseClick);
  };

  addClickHandlers(mouseClick);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  const mouseClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      rightClick = true;
    } else if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      removeClickHandlers(mouseClick);
      resolve(`Third promise was resolved`);
    }
  };

  addClickHandlers(mouseClick);
});

firstPromise
  .then((text) => {
    createMessage(text);
  })
  .catch((text) => {
    createMessage(text, 'error');
  });

secondPromise.then((text) => {
  createMessage(text);
});

thirdPromise.then((text) => {
  createMessage(text);
});
