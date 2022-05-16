한번 정리할 필요가 있어서 정리

## ES2015 클래스 구문

2015 버전되어서야 클래스구문 서포트 해 줌. (JS는 OOP를 지향하는 용어가 아니기에 ..(프로토지향..)).

### 클래스란?

클래스란 사전에 정의된 속성 및 메소드들을 이용 해 객체를 생성하기위한 청사진과 같음.

JS는 프로토타입 기반의 언어이기 때문에 눈속임(Sugar Syntax)으로 클래스처럼 보이게 도와줌

```jsx
class Student {
  constructor(firstName, lastName, year) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.year = year;
  }
}

let firstStudent = new Student('Colt', 'Steele', 1);
let secondStudent = new Student('Blue', 'Steele');

console.log(firstStudent); //{firstName: 'Colt', lastName: 'Steele', year: 1};
console.log(secondStudent); //{firstName: 'Colt', lastName: 'Steele', year: undefined};
```

### Instance 메소드 추가하기

```jsx
class Student {
  constructor(firstName, lastName, year) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.year = year;
    this.tardies = 0;
    this.scores = [];
  }

  fullName() {
    return `your full name is${this.firstName} ${this.lastName}`;
  }
  markLate() {
    this.tardies += 1;
    if (this.tardies >= 3) {
      return 'You are expelled!';
    }
    return `${this.firstName} ${this.lastName} has been late ${this.tardies} times`;
  }

  addScore(score) {
    this.scores.push(score);
    return this.scroes;
  }
  calculateAverage() {
    let sum = this.scores.reduce(function (a, b) {
      return a + b;
    });
    return sum / this.scores.length;
  }
}

let firstStudent = new Student('Colt', 'Steele', 1);
firstStudent.addScore(87);
firstStudent.addScore(100);
firstStudent.calculateAverage(); //93.5
```

### Class 메소드 추가하기

static 키워드를 통해 클래스에 종속되는 반면 클래스의 개별인스턴스 메서드에는 반드시 종속적일 필요가 없는 메서드 혹은 기능을 만들 수 있음.

```jsx
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  showPosition() {
    return `{x: ${this.x}, y: ${this.y}}`;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5); //Point{x:5, y: 5};
p1.showPosition(); // '{x:5, y:5}'
const p2 = new Point(10, 10);
//static 키워드로 클래스 메서드를 정의하고, 개별 인스턴스 상에서는 더이상 이러한 클래스 메서드를 호출 하지 않고 클래스를 통해서 호출하는 것이 관습
Point.distance(p1, p2);
```

자료구조를 위해 클래스를 생성하면서 static 메서드를 사용할 일은 거의 없다고 보면 됨 .

### Recap

- 클래스는 청사진
- new 키워드를 통해 이니시에이팅 하여 인스턴스를 만들 수 있음
- consturctor()함수는 클래스가 인스턴스화 될 때 제일 첫번째로 작동
- 인스턴스 메서드는 객체와 유사한 방식으로 클래스에 추가될 수 있으며
- 클래스 메서드는 static키워드와 함께 추가 될 수 있음
- this키워드는 해당 인스턴스를 따르게 됨
