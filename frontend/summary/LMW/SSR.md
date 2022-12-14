### 서버 사이드 렌더링이란?

> 서버에서 페이지를 그려 클라이언트(브라우저)로 보낸 후 화면에 표시하는 기법을 의미한다.
> `React` `Vue` `Angular` 와 같은 싱글 페이지 애플리케이션은 서버 사이드 렌더링의 반대인
> 클라이언트 사이드 렌더링 방식이다.

### 렌더링이란?

> 간단히 이야기하면, **서버로부터 요청해서 받은 내용을 브라우저 화면에 표시해주는 것**이다.

### SSR의 기본 흐름도

> `SSR`은 클라이언트에서 모든 것을 처리하지 않고, 웹 사이트에 접속하면 서버에서 필요한 데이터를 모두 가져와서 `HTML` 파일을 만들게 되고, 만들어진 `HTML`과 `HTML` 파일을 동적으로 조금 제어할 수 있는 소스코드와 함께 클라이언트에게 보낸다.
> 클라이언트는 잘 만들어진 `HTML` 문서를 사용자에게 바로 보여주게 된다.

![ssr](https://user-images.githubusercontent.com/46440898/196236478-3ad01fcd-a4d4-402a-bbbd-f82123578b50.png)

### SSR로 프로젝트를 진행하기 위해 고려해야할 점

![ssr](https://user-images.githubusercontent.com/46440898/196236478-3ad01fcd-a4d4-402a-bbbd-f82123578b50.png)

> `SEO` 란 `Search Engine Optimization` 의 약자로 구글, 네이버와 같은 검색엔진들은 서버에 등록된 웹사이트들을 하나하나씩 돌아다니면서 웹사이트의 `HTML` 문서를 분석해 타이틀과 디스크립션을 보고 어떤 검색어로 찾아 줄 수 있는 웹사이트인지 판단한다.
> 그래서 우리가 검색할 때 웹사이트에서 빠르게 검색할 수 있게 도와준다.
> `Next JS` 는 `SSR` 방식이기 때문에 `SEO` 최적화에 효율적이다.

![ttv_tti](https://user-images.githubusercontent.com/46440898/196236609-0cae632f-a7a2-4a99-85d0-98f5b2b84af4.png)

> `SSR` 방식에서는 서버에서 만들어진 `HTML` 파일을 가져오게 되고 사용자는 바로 웹 사이트를 볼 수 있다. 하지만 웹 사이트를 동적으로 제어할 수 있는 자바스크립트 파일은 아직 받아오지 않았기 때문에 사용자가 클릭을 해도 아무런 것도 처리할 수가 없는 상태가 된다. 최종적으로 자바스크립트 파일을 받아와야지만 사용자가 원하는 것을 처리할 수 있는 인터랙션이 가능해진다.
>
> 그래서 `SSR`은 **사용자가 사이트를 볼 수 있는 시간(`TTV : Time TO View`)와 실제로 인터랙션이 가능한 시간(`TTI : Time To Interact`)의 공백시간이 꽤 길다**는 단점이 존재한다.
> `TTV`와 `TTI`의 공백시간을 줄이기 위해서 어떤 노력을 할 수 있을지와 어떻게 조금 더 매끄러운 `UI`와 `UX`를 제공할 수 있을지를 고민해보면 좋을 것이다.
