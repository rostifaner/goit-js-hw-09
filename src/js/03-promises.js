import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const delayField = Number(form.elements.delay.value);
  const stepField = Number(form.elements.step.value);
  const amountField = Number(form.elements.amount.value);

  for (let i = 1; i <= amountField; i++) {
    const position = i;
    const delay = delayField + stepField * (i - 1);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
