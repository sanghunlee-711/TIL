# 테스트

- `@testing-library/react-hooks` 사용 시
- 훅 내부의 메서드들이 순수함수일 때 테스트하기가 용이하다
  - 만약 상단에 선언되어있는 state로 곧바로 가져와서 사용하면(arguments로 받지 않고)
  - hooks테스트 시 내부에 접근하여 global이나 local State를 바꿔주어야하는 굉장히 불필요한 과정이 생김
    - 비즈니스로직만 테스트할 용도이기 때문
  - 그래서 순수함수로 바꾸고 테스트 중..
  - `redux-mock-store`라는 라이브러리를 통해 store테스트 시 실제 store의 사용과는 다르게 값을 dispatch할 수가 없음
    - 사실 메서드를 잘만짠다면 상태값인 state를 훅 테스트에서 건들 필요도 없음

## 답이 없던 메서드 버전

```javascript
const vacationInitialState = useRootState((state) => state.vacationSetting);
const _addInputLength =
  vacationInitialState.newVacationData.vacationName.trim().length;

const onConfirmModalVacationAdd = () => {
  if (_addInputLength < 1) {
    return handleAlert('휴가 추가', '휴가 이름을 입력해주세요');
  }
  if (
    vacationInitialState.newVacationData.rewardCountType !== 'F' &&
    vacationInitialState.newVacationData.rewardCount === ''
  ) {
    return handleAlert(
      '휴가 추가',
      vacationInitialState.newVacationData.rewardCountType === 'D'
        ? '휴가일수를 입력해주세요'
        : '휴가시간 입력해주세요'
    );
  }

  return dispatch(handleIsCheckAddVacationModalActive(true));
};
```

그냥 상단에 받은 state를 곧바로 메서드에 넣어버림 -> 테스트 빡셈 -> 별로인 코드 -> 사이드이펙트는 그러나 없는듯 ?..

## 딴애 순수함수로 변경한 버전

```javascript
const onConfirmModalVacationAdd = ({
  length,
  type,
  count,
}: {
  length: number,
  type: string,
  count: string,
}) => {
  if (length < 1) {
    return handleAlert('휴가 추가', '휴가 이름을 입력해주세요');
  }
  if (type !== 'F' && count === '') {
    return handleAlert(
      '휴가 추가',
      type === 'D' ? '휴가일수를 입력해주세요' : '휴가시간 입력해주세요'
    );
  }

  return dispatch(handleIsCheckAddVacationModalActive(true));
};
```

이렇게 변경 후 `onConfirmModalVacationAdd`만 순수하게 테스트 해볼 수가 있게됨 -> 인자의 조건에 따라 테스트 가능해짐

아주 간단한 변경이었지만 그 효과는 실로 탁월했다..

### 테스트코드

```javascript
  describe('onConfirmModalVacationAdd', () => {
    it('휴가 이름 미입력 후 추가 버튼 클릭 시 경고 다이얼로그 발생', () => {
      const { result, store } = setup();

      act(() => {
        result.current.actions.onConfirmModalVacationAdd({
          length: 0,
          type: 'F',
          count: '',
        });
      });

      expect(store.getActions()).toEqual([
        setAlert({ title: '휴가 추가', content: '휴가 이름을 입력해주세요' }),
      ]);
    });

    it('휴가 이름 1자 이상 입력 후 지급단위 미지정이 아닌 것(시간, 일)으로 설정한 뒤 휴가 일수(시간) 미 입력 시 다이얼로그 발생', () => {
      const { result, store } = setup();

      act(() => {
        result.current.actions.onConfirmModalVacationAdd({
          length: 10,
          type: 'D',
          count: '',
        });
      });

      expect(store.getActions()).toEqual([
        setAlert({ title: '휴가 추가', content: '휴가일수를 입력해주세요' }),
      ]);
    });
  }
```

위 코드 처럼 그냥 인자를 어떻게 넣어주냐에 따라 내가 원하는 액션이 원하는 인자값으로 dispatch가 되는지 확인을 할 수 있게 됨.

# React

## 렌더링

- 무작정 글로벌스테이트를 맘 편하게 쓰다가 react-devtools를 통해 하나의 컴포넌트가 변경되었을 때 다른 컴포넌트가 리렌더되는 괴이 현상을 경험
  - 확실히 로컬스테이트를 알맞게 쓰기 + 스토어의 적합한 나눔이 필요함
  - useCallback, useMemo, React.memo()를 적절하게 사용해서 렌더링 최적화가 필요할 듯

### useCallback, useMemo, React.memo

- 리액트는 shallowEqual을 통해서 VirtualDOM 변경 시 루트노드 찍고 내려오면서 트리로 된 DOM을 비교하다가 값이 다른 친구가 보이면 그 밑에 자식노드들 까지 한번에 날리고 Rerender 시킴
- 이 때 React.memo를 적절히 사용해서 shallowEqual을 적용시켜줄 수도 있음(비추)
- useCallback, useMemo를 통해서 특정 state값이 변하지 않는 한 리렌더시 재선언되는것을 방지하며 아주 미약한 cpu 낭비를 막을 수도 있음
- React.memo는 props를 받는 컴포넌트를 위해서 사용하면 활용도가 꽤 생길것 같음.
