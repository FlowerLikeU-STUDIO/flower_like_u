### \_app.js란 무엇일까?

> `Next.js`에서 `app.js`는 초기에 기본 페이지들의 `component`로 사용된다.
> `_app.js` 는 `pages` 들의 공통부분이다.

<img width="326" alt="Home" src="https://user-images.githubusercontent.com/46440898/196668071-3dff6a37-6fd7-4278-b13f-24705efe99d9.png">

<img width="262" alt="profile" src="https://user-images.githubusercontent.com/46440898/196668094-d12a2bdd-e9da-4a9d-8f16-5a788502c63b.png">

<img width="285" alt="signup" src="https://user-images.githubusercontent.com/46440898/196668112-f4640779-bd66-4aef-98fd-2edcf1d5f67e.png">

다음과 같이 `Home` `profile` `signup` 에 해당하는 페이지가 있다. 이 때 만약 페이지들에 대해서 공통부분
`ex ) title`이나 전체 애플리케이션에 대해 하나의 레이아웃만 있는 경우 사용자 지정 앱을 만들고 레이아웃으로 애플리케이션을 래핑할 수 있다. `<Layout />`구성 요소는 페이지를 변경할 때 재사용 되기 때문에 구성 요소 상태가 유지된다.

<img width="424" alt="_app" src="https://user-images.githubusercontent.com/46440898/196668127-44cdb89f-cb4b-4095-9793-eb2fd8506c5c.png">

현재 작성한 `_app.js` 는 단일 공유 레이아웃을 적용하지는 않았다. 프로젝트에 따라 여러 레이아웃이 존재할 수 있기 때문에 이는 유동적으로 자신이 코드를 작성하면 된다.

다음 코드는 단일 공유 레이아웃일 때 적용해 볼 수 있는 코드이다.

```jsx
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```
