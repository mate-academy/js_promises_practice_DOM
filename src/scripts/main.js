'use strict';

const notificationDiv = document.querySelector('[data-qa="notification"]');

const successHandler = (message) =>
{
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  notificationDiv.appendChild(notification);
};

const errorHandler = (message) =>
{
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('error');
  notification.textContent = message;
  notificationDiv.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) =>
{
  const handleClick = () =>
  {
    resolve('First promise was resolved');
  };

  const handleTimeout = () =>
  {
    reject(new Error('First promise was rejected'));
  };

  document.addEventListener('click', handleClick);
  setTimeout(handleTimeout, 3000);
});

const secondPromise = new Promise((resolve) =>
{
  const handleLeftClickOrRightClick = () =>
  {
    resolve('Second promise was resolved');
  }

  addEventListener('contextmenu', handleLeftClickOrRightClick);
  addEventListener('click', handleLeftClickOrRightClick)
})

const thirdPromise = new Promise((resolve) =>
{
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = (mouseEvent) =>
  {
    if (mouseEvent.type === 'click')
    {
      leftClicked = true;
    }

    if (mouseEvent.type === 'contextmenu')
    {
      rightClicked = true;
    }

    if (leftClicked && rightClicked)
    {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
