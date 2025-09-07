const body = document.querySelector('body');
const firstPromise = new Promise((resolve, reject) => {
  let wasClicked = false;
  const timeout = setTimeout(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = 'First promise was rejected';
    document.removeEventListener('click', onClick);
    reject(body.append(div));
  }, 3000);
  const onClick = (e) => {
    if (e.target) {
      wasClicked = true;
      clearTimeout(timeout);

      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'First promise was resolved';
      resolve(body.append(div));
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  if (wasClicked === false) {
    timeout();
  }
});
const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();

      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'Second promise was resolved';
      resolve(body.append(div));
    }
  });
});
let leftClick = false;
let rightClick = false;
const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      document.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
      });
      rightClick = true;
    }

    if (leftClick && rightClick) {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'Third promise was resolved';
      resolve(body.append(div));
    } else {
      reject(new Error('You dont click left mouse or right mouse'));
    }
  });
});

firstPromise.then(
  (success) => success,
  (error) => error,
);

secondPromise.then(
  (success) => success,
  (error) => error,
);

thirdPromise.then(
  (success) => success,
  (error) => error,
);
