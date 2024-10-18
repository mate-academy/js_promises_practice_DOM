function createNotification(message, type) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    e.preventDefault();
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((result) => {
    createNotification(result, 'success');
  })
  .catch((error) => {
    createNotification(error.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((result) => {
  createNotification(result, 'success');
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((result) => {
  createNotification(result, 'success');
});
