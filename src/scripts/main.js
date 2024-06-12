'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', function() {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 3000);
}
);

const promise2 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', function() {
    resolve();
  });

  document.body.addEventListener('contextmenu', (e) => {
    resolve();
    e.preventDefault();
  });
}
);

const promise3 = new Promise((resolve, reject) => {
  let rightClicked = false;
  let leftClicked = false;

  document.body.addEventListener('click', () => {
    leftClicked = true;
    checkPressedButton();
  });

  document.body.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkPressedButton();
  });

  function checkPressedButton() {
    if (rightClicked && leftClicked) {
      resolve();
    };
  }
}
);

function showMessage(text, type) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.className = type;
  message.textContent = text;
  document.body.append(message);
}

promise1.then(() => {
  showMessage('First promise was resolved', 'success');
}, () => {
  showMessage('First promise was rejected', 'warning');
});

promise2.then(() => {
  showMessage('Second promise was resolved', 'success');
});

promise3.then(() => {
  showMessage('Third promise was resolved', 'success');
});
