# JS

Ref:[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR)
XOR연산자는 ^로 실행하게 된다. 설명에 따르면 각 숫자를 비트로 나눠 쪼갠 뒤 각 비트끼리 같은 곳에 0, 다른곳에 1을 할당한 비트를 반환해준다.

```javascript
const a = 5; // 00000000000000000000000000000101
const b = 3; // 00000000000000000000000000000011

console.log(a ^ b); // 00000000000000000000000000000110
// expected output: 6
```

![비트연산자](./비트연산자.png)

XOR연산자란 OR 연산을 바이트단위로 하는 건데 아래와 같은 사용법이 있다.

숫자 타입의 경우 같은 아래와 같이 세가지로 묶이게 되는 경우가 발생하고 문자인 경우 비교 시 무조건 0 이 뜨게 된다.

가장 중요한 포인트는 같은 숫자를 연산하는 경우 0이 나타난다는 것이다 :)

```javascript
console.log(1 ^ 2); // 3
console.log(1 ^ 3); // 2
console.log(2 ^ 3); // 1
```

# Cypress

Test Best Practice를 따르기 위해 data-id에 **_-_**이 들어간 이름을 작성하니 찾지 못하는 현상이 발생함
아무래도 카멜케이스위주로 써야할듯..

# msw

[Dennis Kortsch-Develop and test React apps with React Query, MSW and React Testing Library
](https://www.denniskortsch.de/posts/msw-react-testing)를 참고하면 MSW에서 메모리에 자체 DB를 만들어 테스트를 용이하게 하도록 만들어준다고 한다.

이때까지 로직위주로만 테스트를 돌려서 CRUD도 모두 테스트에 넣을때 이 방법을 써야겠다.

그런데 저 라이브러리 사용법을 익히느니 일단 sessionStorage를 활용하는 방법으로 진행하고 뭔가 감당이 안되면 써야겠따 ㅎ...
