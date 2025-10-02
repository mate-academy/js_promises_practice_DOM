'use strict';

function showNotification(type, message) {
  const existing = document.querySelector('[data-qa="notification"]');

  const titleText = type === 'success' ? 'Success' : 'Error';

  if (existing) {
    existing.classList.remove('success', 'error');
    existing.classList.add(type);

    const title = existing.querySelector('.notification__title');
    const description = existing.querySelector('.notification__description');

    if (title) {
      title.textContent = titleText;
    } else {
      const newTitle = document.createElement('div');

      newTitle.className = 'notification__title';
      newTitle.textContent = titleText;
      existing.appendChild(newTitle);
    }

    if (description) {
      description.textContent = message;
    } else {
      const newDesc = document.createElement('div');

      newDesc.className = 'notification__description';
      newDesc.textContent = message;
      existing.appendChild(newDesc);
    }
  } else {
    const div = document.createElement('div');

    div.className = `notification ${type}`;
    div.setAttribute('data-qa', 'notification');

    const title = document.createElement('div');

    title.className = 'notification__title';
    title.textContent = titleText;

    const description = document.createElement('div');

    description.className = 'notification__description';
    description.textContent = message;

    div.appendChild(title);
    div.appendChild(description);
    document.body.appendChild(div);
  }
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const handleClick = (e) => {
    if (e.button === 0 && !leftClicked && !settled) {
      leftClicked = true;
      settled = true;
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    if (!settled && !leftClicked) {
      settled = true;
      document.removeEventListener('click', handleClick);
      reject('First promise was rejected');
    }
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  let resolved = false;

  const handleLeftClick = (e) => {
    if (e.button === 0 && !resolved) {
      resolved = true;
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
      resolve('Second promise was resolved');
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    if (!resolved) {
      resolved = true;
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const thirdPromise = new Promise((resolve) => {
  let resolved = false;

  const checkBoth = () => {
    if (leftClicked && rightClicked && !resolved) {
      resolved = true;
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
      resolve('Third promise was resolved');
    }
  };

  const handleLeft = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBoth();
    }
  };

  const handleRight = (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBoth();
  };

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

firstPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err?.message ?? err));

secondPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err?.message ?? err));

thirdPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err?.message ?? err));
