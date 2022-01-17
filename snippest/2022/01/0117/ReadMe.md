# React

React이벤트는 애초에 위임 되어서 실행됨

React 17버전 이전까지는 document레벨에서 이벤트를 다루고 자동으로 delegation(위임)된 이벤트를 매칭할 수 있도록 설계 되었다가
17버전부터 시작하여서는 root div에서 이벤트 위임이 이루어짐.
-> 만약 다양한 리액트버전이 하나의 앱으로 만들어지거나 다른 라이브러리가 document단의 이벤트를 막는 코드가 존재한다면 이벤트가 원하는방식으로 작동하지 않는 문제가 있어 이를 방지하고자 rootNode(보통은 `<div id="root"></div>`)에 거는 것으로 바뀌게 된 것.

그러니까 애초에 Vanila Js에서의 DOM API를 통해 직접 달아버리는 것이 아닌 document (or Root div)노드에서 이벤트가 모두 걸려있는 상태인 것.

Vanila JS와 유사하게 메모리 관리 측면 + 이벤트제거의 용이성을 위해 이리 하는 것으로 유추됨 -> 관련된 글이 없네 흠 ..

> 참고

- [reactjs-blog](https://reactjs.org/blog/2020/08/10/react-v17-rc.html)
- [dan_abramov-twitter](https://twitter.com/dan_abramov/status/1200118229697486849)
- [bigbinary.com](https://www.bigbinary.com/blog/react-17-delegates-events-to-root-instead-of-document)
- [dev.to](https://dev.to/maddevs/a-bit-about-event-delegation-in-react-4jeo)
