'use strict';

const promise1 = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  const timeoutID = setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    } else {
      clearTimeout(timeoutID);
    }
  }, 3000);
});

function makeANotification(classType, text) {
  const body = document.querySelector('body');

  body.insertAdjacentHTML('beforeend', `
     <div data-qa="notification" class="${classType}" 
     style="color:white; background-color:pink; margin-left:50px"> 
          <h2>
            ${text}
          </h2>
        </div>
      `);
}

promise1
  .then(resolvedText => makeANotification('success', resolvedText))
  .catch(rejectedText => makeANotification('warning', rejectedText));

const promise2 = new Promise((resolve) => {
  let wasClick = false;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (wasClick) {
      return;
    }

    resolve('Second promise was resolved');
    wasClick = true;
  });

  document.addEventListener('click', () => {
    if (wasClick) {
      return;
    }
    resolve('Second promise was resolved');
    wasClick = true;
  });
});

promise2.then(resolvedText => makeANotification('success', resolvedText));

const promise3 = new Promise(resolve => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rigthClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then(resolvedText => makeANotification('success', resolvedText));
