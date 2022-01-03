let pannel;
let start;
const frames = 0;

const create = () => {
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.left = '0px';
  div.style.top = '0px';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.backgroundColor = 'black';
  div.style.color = 'white';

  return div;
};

const tick = () => {
  frames += 1;

  const now = window.performance.now();
  if (now >= start + 1000) {
    pannel.innerText = frames;
    frames = 0;
    start = now;
  }
};

const init = (parent = document.body) => {
  pannel = create();
  window.requestAnimationFrame(() => {
    start = window.performance.now(); // 퍼포먼스 측정
    parent.appendChild(pannel);
    tick();
  });
};

export default {
  init,
};
