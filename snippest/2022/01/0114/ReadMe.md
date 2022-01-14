# JS

## Promise

JS에서 Promise.all을 이용한 뒤 catch를 통해 에러가 났을 때 나머지가 뻗어지지 않게 사용해보자
Pomise.all은 하나라도 입력 Promise중 하나라도 거부 당하면 Promise.all() 메서드 자체가 즉시 거부해 실행을 멈추게 된다

하지만 Promise.allSettled()를 사용하게 되면 프로미스는 이행/거부 여부에 관계 없이 모두 완료될 때 까지 기다린 뒤 함수의 결과값을 최종적으로 반환한다

### Promise.all의 일반적 실행

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

### Promise.all의 거절이 된 경우

```
const promise1 = Promise.reject(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Uncaught (in promise) 3
```

### Promise.allSetteld를 활용하여 거절 된 케이스를 넣어보는 경우

이 메서드를 활용하는 경우 Promise의 상태와 나오는 값들을 반환해준다
재미있는점은 Reject인 경우 reason을 반환해주는데 이때 reject 메서드 안에 넣어준 인자가 반환된다

```javascript
const promise1 = Promise.reject('거절할거에염');
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.allSettled([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
//  expected output: [
//   { status: 'rejected', reason: '거절할거에염' },
//   { status: 'fulfilled', value: 42 },
//   { status: 'fulfilled', value: 'foo' }
// ]
```

## JS의 다양한 연산자

### 비트연산자

#### & , >> , <<, ?? , ~ , | , ^

이진수 값을 보고싶으면 숫자할당된 `변수.toString(2)`를 하면 쉽게 볼 수 있음
아래는 연산자들 연산해본 결과 + 설명

```javascript
const a = 5; // 00... 101 //2진수로 나타내지고 32비트까지 연산한다고 함 2^32 -1 //  2^0 + 2^2 = 5
const b = 3; // 00... 011 // 2^0 + 2^1 = 3
// &: 대응 되는 비트중 둘다 1이면 1을 반환 아니면 0 을 반환
console.log(a & b); // 000... 01 -> 2^0 = 1 -> 1
// ^: 대응되는 비트가 서로 다르면 1을 반환
console.log(a ^ b); // 111 -> 2^2 + 2^1  = 6
//  n << m: 지정한 수만큼 n의 비트를 전부 왼쪽으로 m만큼 이동 시킴 -> 곱하기 2^m와 같음(이진수니까)
console.log(a << b); // 3칸이동시키면  결구 a * 2^b 가 됨 -> 5 * 2^3 = 40 // 40
// n >> m:  지정한 수만큼 n의 비트를 전부 오른쪽으로 m만큼 이동 시킴 -> 나누기 2^m와 같음(이진수니까)
console.log(a >> b); // 0이됨 이진수니까 소수는 없쥬
console.log(8 >> 2); //2
console.log(8 >> 1); //4
// | : 대응 되는 비트중 하나라도 1이면 1을 반환
console.log(a | b); // 000 ... 111 -> 4 + 2 + 1 => 7
// ~: 비트를 1이면 0, 0 이면 1로 만듦
console.log(~a); //  1의 보수와 같아지므로 -(5+1) => -6 이 됨
```

### 논리연산자

#### || , && , ??

```javascript
console.log(Boolean(0)); //false
console.log(0 && 'empty'); // 0 => 두개다 참일때 true 반환 -> 0은 false로 안치나보네 ;; -> 아 &&은 앞에것이 false면 그냥 앞에 것 보내줌
console.log(false && 'empty');
console.log(0 || 'empty'); // 'empty' -> . 인수 중 하나라도 true이면 true를 반환하고, 그렇지 않으면 false를 반환하죠. -> || 은 앞에것 false이면 뒤에것 반환 허허..
console.log(0 ?? 'empty'); // 0

// ?? : 왼쪽 연산자가 null이나 undefined 등 falsy 이면 오른쪽 피연산자 반환함
const foo = null ?? 'default string';
console.log(foo);
('default string');

const baz = 0 ?? 42;
console.log(baz); //0

console.log({} == {}); //참조형 데이터라 주소값 다르므로 false
console.log({} === {}); //참조형 데이터라 주소값 다르므로 false
console.log(null == undefined); // true란다 ㅋㅋㅋㅋ
console.log(null === undefined); //false임 Boolean으로 봤을때는 둘다 false라 ==일때는 트루 ===일때는 다른타입이므로 false띄워주는듯
console.log(typeof null); //'object'
console.log(typeof undefined); //'undefined'
console.log(typeof Object); //function -> 아마도 Object가 생성자함수(constructor function)이라 그럼
```

## Git

### Git Rebase vs Merge

- Rebase
  Rebase는 내 commit의 base를 변경하여, commit history를 일렬로 잘 정리해줌.

  - 말 그대로 리베이스라 Main Branch에 Sub Branch를 머지하려고 할때
  - Main Branch에서는 Sub Branch를 기준으로 커밋을 재정렬하게됨 (그래서 서브브랜치 커밋도 남게 됨)

  * 그런데 단점이 있음

    1. Rebase는 commit history를 정리하는 역할을 하긴 함
    2. 같은 브랜치에서 Rebase를 할 때마다 history가 달라질 수 있음
    3. 수정 사항이 추가로 생긴 후 다시 rebase하면 history가 무조건 달
       라짐

  * 그런데 회사 전략마다 다른듯
    - 사람들이 작성한 커밋 하나하나가 Base Branch(메인브랜치)에 들어가야한다는 전제면 rebase가 필수인듯.

- Merge
  Main Branch에서는 Head에 머지 커밋이 남게됨 서브브랜치에서 커밋한 기록은 Main Branch에서 남지 않음

# 참고

>

- [TCP School.com - 비트연산자](http://www.tcpschool.com/javascript/js_operator_bitwise)
- [MDN-Promise.all(), Promise.allSetttled()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Wiki-2의 보수](https://ko.wikipedia.org/wiki/2%EC%9D%98_%EB%B3%B4%EC%88%98)
- [MDN-Nullish coalescing operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- [우아한형제들 기술블로그-우린 Git-flow를 사용하고 있어요](https://techblog.woowahan.com/2553/)
