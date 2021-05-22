const YOUTUBE_API_KEY = 'AIzaSyA1K3yKPvDkKrIgNpUPWlpntC9IwmIGs84';

// const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/channels?key={YOUR_API_KEY}&forUsername={USER_NAME}&part=id`;

const counters = document.querySelectorAll('.counter');
const input = document.querySelector('input');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData(input.value);
  input.value = '';
});

async function getData(key = 'V7sBxHz_nHE') {
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${key}&key=${YOUTUBE_API_KEY}`
  );

  const { likeCount, viewCount, dislikeCount } = data.items[0].statistics;

  let target = [];
  target.push(viewCount, likeCount, dislikeCount);
  counters.forEach((counter, index) => {
    counter.innerText = 0;
    increment(counter, target[index]);
  });
}

getData();

function increment(counter, target) {
  const curVal = +counter.innerText;
  const incrVal = Math.ceil(+target / 100);
  counter.innerText = curVal + incrVal;
  if (curVal < target) {
    setTimeout(() => {
      increment(counter, target);
    }, 10);
  } else {
    counter.innerText = target;
  }
}
