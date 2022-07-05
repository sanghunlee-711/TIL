아래와 같이 관리하면 굳이 styled-components에 color theme을 따로 생성하지 않고 편안하게 사용해도 됨

```css
:root {
  --main-bg-color: brown;
}

.one {
  color: white;
  background-color: var(--main-bg-color);
  margin: 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
}
```

- 참고

* [MDN-Using_CSS_custom_properties](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
