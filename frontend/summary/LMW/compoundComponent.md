### Compound Pattern이란?

> 우리는 종종 서로에게 속한 컴포넌트를 작성하게 된다.
> 이 컴포넌트들은 공통의 상태를 통해 서로에게 의존되어 있고, 로직을 함께 공유한다.
> `select`, `dropdown` 컴포넌트 또는 메뉴 아이템들에서 이러한 형태를 볼 수 있다.
> `Compound component pattern`은 `task`를 수행하기 위해 다 같이 함께 작동하는 컴포넌트를 생성할 수 있도록 해준다.

<img width="568" alt="dididi" src="https://user-images.githubusercontent.com/46440898/197151071-b24f87c3-c488-4195-a58d-13288de25f75.png">

`signup.js` 에서는 회원가입에 대해 `input` 과 `button` 이 회원가입을 위한 상태를 공유한다고 판단했다.

버튼으로 부터 `onClick` 이 발생하면 `input` 의 데이터를 검증하고 회원가입을 시도하기 때문이다.

따라서 그러한 상태를 관리하는 `signup.js` 에서 `compound component pattern` 을 적용해보았다.

<img width="406" alt="user" src="https://user-images.githubusercontent.com/46440898/197151081-7415bd10-f75b-4d73-addb-f78c34676978.png">

<img width="614" alt="bu" src="https://user-images.githubusercontent.com/46440898/197151086-d57f32d9-9c7e-483c-9b56-49890c104b90.png">

각 페이지에서는 `signup.js` 에서 만든 `compound component` 를 사용한다.

이로써 회원가입 페이지에서 나누어지는 일반 사용자 회원가입과 사업자 회원가입에 대해서 컴포넌트를 재활용하여 사용할 수 있었다.

처음 적용해보는 패턴인지라 올바르게 사용한지에 대한건 아직 잘 모르는게 사실이다.

조금 더 문서를 찾아보고 올바르게 적용하는 법에 대해 고민이 필요하다.

다음은 사용하면서 느낀 장점이다.

### 장점

> `Compound Component`들은 내부적으로 상태를 다루며 몇몇 자식 컴포넌트들 사이에서만 공유한다.
> `Compound Component`를 사용하면 우리 자신의 별도 상태를 다루는 것에 대해서 걱정할 필요가 없다.
> `Compound Component`를 `import`할 때, 해당 컴포넌트에 필요한 자식 컴포넌트를 명시적으로 `import`할 필요도 없다.
