'use strict';

const logo = document.querySelector('.logo');

function createNotification(text, className, options = {}) {
  const notification = document.createElement('div');

  notification.className = className;
  notification.setAttribute('data-qa', 'notification');
  notification.innerText = text;

  document.body.append(notification);

  if (options.timeout) {
    setTimeout(() => {
      notification.remove();
    }, options.timeout);
  }
}

new Promise((resolve, reject) => {
  const timeoutId = setTimeout(reject, 3000);

  logo.addEventListener('mousedown', () => {
    clearTimeout(timeoutId);
    resolve();
  });
}).then(() => {
  createNotification(
    'First promise was resolved', 'success', { timeout: 4000 }
  );
}).catch(() => {
  createNotification(
    'First promise was rejected', 'warning', { timeout: 5000 }
  );
});

new Promise((resolve) => {
  document.addEventListener('mousedown', (mousedownEvent) => {
    if (mousedownEvent.button === 0 || mousedownEvent.button === 2) {
      resolve();
    }
  });
}).then(() => {
  createNotification(
    'Second promise was resolved', 'success success--second', { timeout: 4000 }
  );
});

new Promise((resolve) => {
  let leftPress = false;
  let rightPress = false;

  document.addEventListener('mousedown', (mousedownEvent) => {
    if (mousedownEvent.button === 0) {
      leftPress = true;
    }

    if (mousedownEvent.button === 2) {
      rightPress = true;
    }

    if (rightPress && leftPress) {
      resolve();
    }
  });
}).then(() => {
  createNotification(
    'Third promise was resolved', 'success', { timeout: 4000 }
  );
});
