# Next.js_Rendering Fetching

Next.js를 통해서 다양한 방식으로 콘텐츠를 렌더링할 수 있다.

- SSR: 서버 측 렌더링
  - getServerSideProps
- SSG: 정적 사이트 생성
  - getStaticProps
- CSR: 클라이언트 측 렌더링
  - SWR



## getServerSideProps (SSR)

요청할때마다 데이터를 계속 불러와서 html을 계속 업데이트하는 방식.

따라서, 데이터를 새로 받아오면 그 데이터로 페이지가 렌더링된다.

```react
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

props를 사용자가 요청하면 `getServerSideProps`를 먼저 실행 후 프론트가 서버에 직접 요청하고, 데이터를 받아와서 page 컴포넌트에 data를 props로 전달하여 렌더링할 수 있다.

따라서, `getServerSideProps`는 계속 데이터가 바뀌어야 하는 페이지의 경우 사용한다.



## getStaticProps, getStaticPaths (SSG)

빌드타임 도중에 html이 생성된다.

빌드할 때 데이터를 가져와서 html을 생성 후, 사용자의 요청이 들어올때마다 빌드된 html을 재사용한다.

```react
//page

function Page({ data }) {
...
}

export async function getStaticProps() {

  const res = await axios.get(`https://localholst:3065/user`)
  const data = res.data

  return { props: { data } }
}
```

데이터가 계속해서 바뀌지 않는 페이지에서 사용하는 것이 바람직하다.
(지속적으로 업데이트 되지 않는 경우)

다이나믹 라우팅을 사용하여 정적 페이지를 만들 때 `getStaticProps`를 사용한다면, `getStaticPaths`와 함께 사용해 주어야 한다.

```react
//pages/users/[id].js

function Page({ data }) {
...
}

export async function getStaticPaths() {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const paths = posts.map(({ id }) => ({ params: { id: `${id}` } }));
// params: {id : '1'},{id : '2'}...

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {

  const res = await axios.get(`https://localholst:3065/user`)
  const data = res.data

  return { props: { data } }
}
```

`getStaticPaths`에서 `params`에 빌드하고자 하는 페이지를 넣는다.

ex) `user/[id].js`에 `id` 값이 1이라면 params에 `{id:'1'}` 로 넣어준다.

미리 빌드한 페이지가 아닌 새로운 페이지 요청이 들어오는 경우를 대비하여 `fallback` 이라는 옵션이 존재한다.

```react
//pages/users/[id].js

function Page({ data }) {
 const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
...
}

export async function getStaticPaths() {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const paths = posts.map(({ id }) => ({ params: { id: `${id}` } }));
// params: {id : '1'},{id : '2'}...

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps() {

  const res = await axios.get(`https://localholst:3065/user`)
  const data = res.data

  return { props: { data } }
}
```

**fallback**

빌드타임에 생성해놓지 않은 path로 요청이 들어온 경우 어떻게 할지 정하는 `boolean` 또는 `blocking` 값

- `false`인 경우 : `getStaticPaths`가 반환하지 않은 모든 path에 대해 404페이지를 반환한다.

- `true`인 경우 : `getStaticProps`의 동작이 바뀐다.

  1. `getStaticPaths`가 반환한 path들은 빌드 타임에 HTML로 렌더링된다

  2. 이외의 path들에 대한 요청이 들어온 경우, 404 페이지를 반환하지 않고, 페이지의 **"fallback" 버전**을 먼저 보여준다

  3. 백그라운드에서 Next js가 요청된 path에 대해서 `getStaticProps` 함수를 이용하여 HTML 파일과 JSON 파일을 만들어낸다

  4. 백그라운드 작업이 끝나면, 요청된 path에 해당하는 JSON 파일을 받아서 새롭게 페이지를 렌더링한다. 사용자 입장에서는 **[ fallback → 풀 페이지 ]와 같은 순서**로 화면이 변하게된다.

  5. 새롭게 생성된 페이지를 기존의 빌드시 프리렌더링 된 페이지 리스트에 추가한다. 같은 path로 온 이후 요청들에 대해서는 이때 생성한 페이지를 반환하게된다.

     "fallback" 상태일 때 보여줄 화면은 `next/router`의 `router.isFallback` 값 체크를 통해서 조건 분기하면 된다. 이때 페이지 컴포넌트는 `props`로 빈값을 받게된다.

- `'blocking'`일 경우 : `true` 일 경우와 비슷하게 작동하지만, 최초에 만들어놓지 않은 path에 대한 요청이 들어온 경우 fallback 상태를 보여주지 않고 SSR처럼 동작한다. 이후 `true` 옵션과 같이 기존의 정적 페이지 리스트에 새로 생성한 페이지를 추가한다.