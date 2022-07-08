# Scope safe pattern

- JS에서 생성자 함수를 사용하면 new키워드를 통해 인스턴스를 만들 수 있음
- 이때 new키워드를 붙이지 않고 함수를 호출해버리면 에러를 발생하고 싶을 때 두가지 해결 법이 있음

아래는 아직 IE나 구버전에서 안먹힐수도 있다고 함.

```js
const Test = function () {
  /*일반함수 호출에서는 new.target은 undefined를 띄게 됨*/
  if (!new.target) throw new Error('give me new keyword');
};
```

아래가 호환성이 더 좋다고 함

```js
const Test = function () {
  /*new를 안붙이면 this는 window를 가리키게됨
  (원래 기본적으로 그렇게 가르키는데 )
  new키워드를 통해 인스턴스화 시키는 경우 this는 해당 인스 턴스를 가리키게됨*/
  if (!(this instanceof Test)) throw new Error('give me new keyword');
};
```

## 참고

- [모던자바스크립트](https://poiemaweb.com/js-object)
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new.target)
