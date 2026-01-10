'use strict';

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.append(notification);
}

function onSuccess(message) {
  showNotification('success', message);
}

function onError(error) {
  const message = error instanceof Error ? error.message : String(error);

  showNotification('error', message);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.removeEventListener('click', handleLeftClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleLeftClick(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return;
    }

    clearTimeout(timerId);
    document.removeEventListener('click', handleLeftClick);

    resolve('First promise was resolved');
  }

  document.addEventListener('click', handleLeftClick);
});

const secondPromise = new Promise((resolve, reject) => {
  void reject;

  function cleanup() {
    document.removeEventListener('click', handleAnyClick);
    document.removeEventListener('contextmenu', handleAnyClick);
  }

  function handleAnyClick(mouseEvent) {
    const isLeftClick = mouseEvent.type === 'click' && mouseEvent.button === 0;
    const isRightClick =
      mouseEvent.type === 'contextmenu' || mouseEvent.button === 2;

    if (!isLeftClick && !isRightClick) {
      return;
    }

    if (mouseEvent.type === 'contextmenu') {
      mouseEvent.preventDefault();
    }

    cleanup();
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', handleAnyClick);
  document.addEventListener('contextmenu', handleAnyClick);
});

const thirdPromise = new Promise((resolve, reject) => {
  void reject;

  let leftClicked = false;
  let rightClicked = false;

  function cleanup() {
    document.removeEventListener('click', handleClicks);
    document.removeEventListener('contextmenu', handleClicks);
  }

  function handleClicks(mouseEvent) {
    const isLeftClick = mouseEvent.type === 'click' && mouseEvent.button === 0;
    const isRightClick =
      mouseEvent.type === 'contextmenu' || mouseEvent.button === 2;

    if (mouseEvent.type === 'contextmenu') {
      mouseEvent.preventDefault();
    }

    if (isLeftClick) {
      leftClicked = true;
    }

    if (isRightClick) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      cleanup();
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', handleClicks);
  document.addEventListener('contextmenu', handleClicks);
});

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess).catch(onError);
thirdPromise.then(onSuccess).catch(onError);
