import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const fieldPicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerValue = {
  days: document.querySelector('.timer [data-days]'),
  hours: document.querySelector('.timer [data-hours]'),
  minutes: document.querySelector('.timer [data-minutes]'),
  seconds: document.querySelector('.timer [data-seconds]'),
};
const INTERVAL = 1000;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  position: 'auto center',
  // minDate: 'today',
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.info('Please choose a date in the future', {
        position: 'center-top',
        cssAnimationStyle: 'from-top',
        clickToClose: true,
        distance: '10px',
        opacity: 1,
        // ...
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

fieldPicker.flatpickr(options);

const startTimer = () => {
  let countdown;
  countdown = setInterval(() => {
    const currentDate = Date.now();
    const targetDate = new Date(fieldPicker.value).getTime();
    const diffDate = targetDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diffDate);
    timerValue.days.textContent = addLeadingZero(days);
    timerValue.hours.textContent = addLeadingZero(hours);
    timerValue.minutes.textContent = addLeadingZero(minutes);
    timerValue.seconds.textContent = addLeadingZero(seconds);
    startBtn.disabled = true;

    if (diffDate <= 0) {
      clearInterval(countdown);
      timerValue.days.textContent = '00';
      timerValue.hours.textContent = '00';
      timerValue.minutes.textContent = '00';
      timerValue.seconds.textContent = '00';
      startBtn.disabled = false;
    }
    return;
  }, INTERVAL);
};
startBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
