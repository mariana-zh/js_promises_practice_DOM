'use strict';

let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
    checkForBoth();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    checkForBoth();
  });

  function checkForBoth() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }
});

const sucessMsg = (message) => {
  const div = document.createElement('div');

  div.className = 'success';
  div.textContent = message;
  div.dataset.qa = 'notification';
  document.body.append(div);
};

const errorMsg = (error) => {
  const div = document.createElement('div');

  div.className = 'error';
  div.textContent = error;
  div.dataset.qa = 'notification';
  document.body.append(div);
};

firstPromise.then(sucessMsg).catch(errorMsg);
secondPromise.then(sucessMsg).catch(errorMsg);
thirdPromise.then(sucessMsg).catch(errorMsg);
