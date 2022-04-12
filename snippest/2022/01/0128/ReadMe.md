# JS

## replaceWith

Element.replaceWith()메서드는 Element 및 그 자식 DOM노드들을 arguments로 들어온 녀석들로 대체하게 됨

```javascript
const div = document.createElement('div');
const p = document.createElement('p');
const ul = document.createElement('ul');
div.appendChild(p);
p.appendChild(ul);
console.log(div.outerHTML);
// '<div><p><ul></ul></p></div>'

const span = document.createElement('span');

p.replaceWith(span);

console.log(div.outerHTML);
// '<div><span></span></div>'
```

## 데이터 속성 사용하기

- 어떤 엘리먼트에나 `data-`로 시작하는 속성은 무엇이든 사용 가능하며
  화면에 안보이게 글이나 추가 정보를 엘리먼트에 담아놓을 수 있다

  - (cypress에서도 테스트케이스 작성 시 이를 활용하길 권장.)

- `getAttributes()` 를 통해 가져올 수 있으며 아래와 같이 곧바로 속성에 접근도 가능하다.

```javascript
var article = document.getElementById('electriccars');

article.dataset.columns; // "3"
article.dataset.indexNumber; // "12314"
article.dataset.parent; // "cars"
```

아래와 같이 css로 접근해서 활용도 가능하다.

```css
article[data-columns='3'] {
  width: 400px;
}
article[data-columns='4'] {
  width: 600px;
}
```

### 문제점

- 보여야 하고 접근 가능해야하는 내용은 데이터 속성에 저장하지 않는것을 권장한다고 함.
- 딱히 접근을 보조하는 기술도 없고 검색 크롤러가 데이터 속성의 값을 찾지 못할 것이기 때문이라고 한다.

## 참고

>

- [MDN- Element.replaceWith()](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith)
- [MDN - 데이터 속성 사용하기](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes)
