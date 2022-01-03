# DOM

[requestAnimationFrames](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)는 애니메이션 간의 업데이트 사이에 콜백함수를 호출할 수 있게 도와주는 메소드 이다(리페인트 이전에 실행할 콜백을 인자로 받게 됨.) 이 콜백을 이용하면 현재 렌더링 사이클과 다음 렌더링 사이클 사이의 시간을 추적할 수 있다.

```javascript
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
```

>

# 참고

- [프레임워크 없는 프론트엔드 개발](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754895)
