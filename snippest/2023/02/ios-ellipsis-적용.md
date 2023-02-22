## What

보통 Mac Os, Android, 등 기타브라우저에서는

```css
width: calc(100vw * 72 / 375) px;
text-overflow: ellipsis;
white-space: nowrap;
```

정도면 원하는데로 특정 크기 이상의 텍스트 컨텐츠가 들어가는 경우 ... 처리가 가능하다.

그런데 IOS의 경우 `overflow:hidden` 까지 넣어줘야 한다.

그래서 아래와 같이 추가 속성이 필요하다.

```css
width: calc(100vw * 72 / 375) px;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

이렇게하면 사내에서 지원을 하는 브라우저에서 모두 대응이 된다.(메인 스트림 브라우저는 모두 대응이 되는 듯..)

PS. 해당 엘리먼트의 display 속성이 inline이면 아니된다
