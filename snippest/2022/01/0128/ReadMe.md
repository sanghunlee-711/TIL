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
