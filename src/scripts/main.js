const createNotification = (message, className) => {
  const div = document.createElement('div');

  div.className = className;
  div.textContent = message();
  div.dataset.qa = 'notification';
  document.body.appendChild(div);
};

const promise1 = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve(() => 'First promise was resolved');
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then((message) => createNotification(message, 'success'))
  .catch((error) => createNotification(() => error.message, 'error'));

const promise2 = new Promise((resolve) => {
  const handleClick = () => {
    resolve(() => 'Second promise was resolved');
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    resolve(() => 'Second promise was resolved');
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

promise2.then((message) => createNotification(message, 'success'));

const promise3 = new Promise((resolve) => {
  let clickedLeft = false;
  let clickedRight = false;

  const handleClick = () => {
    clickedLeft = true;
    checkClick();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    clickedRight = true;
    checkClick();
  };

  const checkClick = () => {
    if (clickedLeft && clickedRight) {
      resolve(() => 'Third promise was resolved');
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

promise3.then((message) => createNotification(message, 'success'));
