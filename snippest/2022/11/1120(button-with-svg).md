# 버튼안에 SVG또는 이미지가 있는 경우 이벤트 위임이 먹히지 않을 때

아래와 같이 dataset 속성의 id를 이용해 이벤트를 위임해주고 있는 경우 Svg를 클릭할때 해당 이벤트가 트리거 되지 않는 현상이 있었음.

```js
  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'modal-close-button') {
        this.onModalShow({ isVisibleModal: false });
      }
    });
  }
```

```html
<button class="modal-close" data-id="modal-close-button">
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
</button>
```

아래와 같이 포인터이벤트를 css로 svg에서 막아주니 원하는대로 이벤트가 잘 일어남.

```css
.modal-close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border: none;
  margin: 20px;
  background-color: white;
}

svg {
  display: block;
  width: 20px;
  height: 20px;
  pointer-events: none; // 핵심
}
```

## pointer-events: none

The element is never the target of pointer events.

however, pointer events may target its descendant elements if those descendants have pointer-events set to some other value.

In these circumstances, pointer events will trigger event listeners on this parent element as appropriate on their way to/from the descendant during the event capture/bubble phases.

요소는 포인터 이벤트의 대상이 아닙니다. 그러나 포인터 이벤트는 하위 항목에 다른 값으로 설정된 포인터 이벤트가 있는 경우 해당 하위 요소를 대상으로 할 수 있습니다.

이러한 상황에서 포인터 이벤트는 이벤트 캡처/버블 단계 동안 하위 요소로/에서 오는 도중에 적절하게 이 상위 요소에서 이벤트 리스너를 트리거합니다.

## 참고

- [MDN: pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
- [stackoverflow-Click event not fired on button with svg element in Safari](https://stackoverflow.com/questions/29814709/click-event-not-fired-on-button-with-svg-element-in-safari)
