# Next.js - Basic Features/Pages

공식문서 중

`Getting Started`

`Basic Features/Pages`



## 시작하기

### 프로젝트 실행

```bash
npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app
```

설치 완료 후 `npm run dev` or `yarn dev` or `pnpm dev`



## Page

Page : React Component exported from a `.js`, `.jsx`, `.ts` or `.tsx` file in the `pages` directory.

### Dynamic Routes

`pages/posts/[id].js`

:arrow_forward: `posts/1` `posts/2` ... `posts/:id`



> **Next.js의 Page 특징**
>
> - pages 안의 페이지 파일은 코드 최상단에서 `import React from 'react';` 를 할 필요가 없다.
> - 쿼리 파라미터는 `/search?keyword=someting` 의 형태이다.
> - 페이지 관련 컴포넌트들은 `pages/` 디렉토리에 넣어야 한다.
> - `/pages` 내에 구성하는 파일명은 pathname파라미터(/post/:id)에서 id 부분을 의미한다. 따라서 파일명과 pathname 파라미터를 동일하게 설정해 주어야 한다.
> - 페이지 라우팅 : <Link href="/경로"> 태그 사용



## Pre-rendering

By default, Next.js **pre-render** every page.

클라이언트 측 JS에서 모든 작업을 수행하는 대신, 각 페이지에 대한 HTML을 미리 생성한다. 따라서 더 나은 성능과 SEO(검색 엔진 최적화)가 가능하다.

생성된 HTML은 각 페이지에 필요한 최소한의 JS코드와 연결된 다음, 브라우저에서 페이지를 `load` 하면 해당 JS 코드가 실행된다.

사전 렌더링에는 두 가지 유형이 있다.

- 정적 생성 (Static Generation)
  - The HTML is generated at **build time** and will be reused on each request.
- 서버 사이드 생성 (Server Side Rendring)
  - The HTML is generated on **each request**.

두 유형의 차이점은 `언제 HTML을 생성하는가` 에 달려 있다.

> 성능상의 이유로 서버 측 렌더링보다 정적 생성을 사용하는 것이 좋다. 정적 생성 페이지는 성능 향상을 위한 추가 구성 없이 CDN에서 캐시할 수 있기 때문이다.



### Static Generation

If a page uses **Static Generation**, the page HTML is generated at **build time**.

#### 정적 생성의 특징

- 프로젝트 빌드 시점에 HTML을 생성한다.
- HTML은 각 요청에서 재사용된다.
- 정적 생성된 페이지들은 CDN에 캐시된다.



#### 데이터가 없는 정적 생성

```react
function About() {
  return <div>About</div>
}

export default About
```

미리 렌더링할 외부 데이터를 가져올 필요가 없으므로, 페이지당 하나의 HTML 파일을 생성한다.



#### 데이터를 사용한 정적 생성

사전 렌더링을 위한 외부 데이터를 가져와야 한다면, 두 가지 방법을 이용할 수 있다.

1. Your page **content** depends on external data

   :arrow_right: Use `getStaticProps`

2. Your page **paths** depend on external data
   :arrow_right: Use `getStaticPaths`



**getStaticProps** : 페이지 콘텐츠가 외부 데이터에 의존할 때

- 빌드 시 데이터를 fetch하여 static 페이지를 생성
- `context.params`로 동적 라우팅의 경로 이름을 가져온다.
- `getStaticProps`가 필요할 때
  - 페이지에서 필요한 데이터가 빌드 시에 사용 가능할 때
  - 데이터를 headless CMS에서 가져올 때
  - 모든 사용자에게 같은 데이터를 보여줄 때
  - SEO를 위해서 속도가 빠른 페이지가 필요할 때
  - Node api(path, fs 등)를 사용해야 할 때



**getStaticPaths** : 페이지 경로가 외부 데이터에 의존할 때

- 동적 라우팅을 사용할 때, 어떤 페이지를 Static으로 빌드할지 정하는 api

- `pages/**/[id].js` 형태의 동적 라우팅 페이지 중, 빌드 시에 static하게 생성할 페이지를 정한다.

  

#### 정적 생성을 사용해야 하는 경우

"사용자의 요청에 **앞서** 이 페이지를 미리 렌더링할 수 있습니까?"

위 질문에 `YES` 가 나온다면, 정적 생성을 사용하는 것이 좋다.

반면에 정적 생성은 사용자의 요청에 앞서 페이지를 미리 렌더링할 수 없는 경우에는 사용하지 않는 것이 좋다. 이 경우에는, 다음 중 하나를 수행할 수 있다.

- **클라이언트 측 데이터 가져오기** 와 함께 정적 생성 사용 : 페이지의 일부 사전 렌더링을 건너뛴 다음 클라이언트 측 JavaScript를 사용하여 데이터를 채울 수 있다.
- **서버 측 렌더링** 사용 : 각 요청에 대해 페이지를 미리 렌더링한다. 페이지를 CDN으로 캐시할 수 없기 때문에 속도가 느려지지만 미리 렌더링된 페이지는 항상 최신 상태를 유지할 수 있다.



### Server Side Rendring

> SSR, Dynamic Rendering 이라고도 한다.

server sied rendering은 항상 최신 상태를 유지할 수 있다.

`getServerSideProps`는 빌드와 상관없이, 매 페이지 요청마다 데이터를 서버로부터 가져온다.

#### getServerSideProps

`getStaticProps`와 다르게 호출될 때마다 cdn에서 불러오는 것이 아닌 서버에서 정보를 불러온다. 모든 요청에 의해서 실행된다. 용량은 커지지만, 항상 최신 정보를 받아올 수 있다.



## Summary

- **Static Generation (Recommended):** The HTML is generated at **build time** and will be reused on each request. To make a page use Static Generation, either export the page component, or export `getStaticProps` (and `getStaticPaths` if necessary). It's great for pages that can be pre-rendered ahead of a user's request. You can also use it with Client-side Rendering to bring in additional data.
- **Server-side Rendering:** The HTML is generated on **each request**. To make a page use Server-side Rendering, export `getServerSideProps`. Because Server-side Rendering results in slower performance than Static Generation, use this only if absolutely necessary.
