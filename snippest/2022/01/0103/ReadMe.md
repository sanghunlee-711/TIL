# DOM API

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

# React

What: 리액트 라우터 네스팅 (V5)
Why: 회사 코드 리팩토링(라우터 네스팅 난장판)
How: Switch를 네스팅 하고 각각의 Route로 묶는방법을 통해 해결

## `CommonLayoutRoute.jsx`

공용 레이아웃 사용을 위한 컴포넌트

```javascript
<Route>
  <CommonLayout>
    <Switch>
      <Route exact path = "/foo" component={Foo}>
      <Route exact path = "/Bar" component={Bar}>
    </Switch>
  </CommonLayout>
</Route>
```

## `NoLayoutRoute.jsx`

```javascript
<Route>
    <Switch>
      <Route exact path = "/Char" component={Char}>
    </Switch>
</Route>
```

레이아웃이 없는 라우트를 위한 컴포넌트

## `Route.jsx`

레이아웃 전체를 합쳐주기 위한 Index Router

```javascript
<Router>
  <GAListener trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
    <Switch>
      <Route>
        <NoLayoutRoute />
        <CommonLayoutRoute />
      </Route>
      <Route path ="*" component ={()=> console.log("리다이렉트 컴포넌트가 들어갈거에요")}>
    </Switch>
  </GAListener>
</Router>
```

여기까지 해서 Redirect가 정상적으로 작동하면 참 좋겠지만 NoLayoutRoute나 CommonLayoutRoute에 접근하는 경우 Redirect도 같이 렌더링 되어버림.

크게 보면 Index Router에서는 두개의 Route 존재만 일단 보게 되는 듯

그래서 두가지 종류의 Route컴포넌트를 감싸준 Route 1개 Redirect용 경로를 가진 Route1개 모두가 렌더가 됨 ;-;..

해결은 exact path로 적용가능한 경로를 그냥 배열에 넣고 냅다 설정해주었다.

```javascript
const PATHS = [...EXACT_PUBLIC_PATH, ...EXACT_LAYOUT_PATH];

<Router>
  <GAListener trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
    <Switch>
      <Route exact path={PATHS}>
        <NoLayoutRoute />
        <CommonLayoutRoute />
      </Route>
      <Route path ="*" component ={()=> console.log("리다이렉트 컴포넌트가 들어갈거에요")}>
    </Switch>
  </GAListener>
</Router>
```

근데 여기서 또 문제는 CommonLayoutRoute에 별도로 exact path를 적용 해주지 않으면 레이아웃이 NoLayoutRoute가 렌더될 때
레이아웃만 별도로 렌더링이 되어버림.

그래서 컴포넌트로 나뉜 라우트들 모두에게 exact path를 배열로 걸어준 상태.

최선의 방법은 레이아웃마다 기본적으로 가질 경로를 다르게 가져가는게 베스트일 듯
ex) layout/home, layout/login, nolayout/alpha, nolayout/beta

주의해야할 점

1. `Switch`를 네스팅할때는 Route로 한번 더 감싸주어야한다는점 (V6부터는 Routes (??) 인데 회사는 아직 V5 임)
2. `Route`를 감싸주게 되면 그 순간부터 새로운 라우트로 취급하기에 또 경로에대한 무언가를 해주어야할 수도 있음 -> 이 부분 알아볼 필요가 있음

## 참고

- [스택오버플로우](https://stackoverflow.com/questions/63257239/react-router-with-multiple-switches-rendering-only-first-switch-components/63258448#63258448)
- [NEWBEDEV-React Router v5.0 Nested Routes](https://newbedev.com/react-router-v5-0-nested-routes)
