# Next.js_API Routes

API Routes는 Next.js로 API를 빌드하기 위한 솔루션을 제공한다.

폴더 내의 모든 파일 `pages/api`는 `/api/*`에 매핑된다. 따라서 API 라우트 기능을 사용하면 API 엔드포인트를 클라이언트 코드와 함께 작성할 수 있게 된다.

해당 라우트에 작성한 코드들은 클라이언트 번들 사이즈에 포함되지 않기 때문에 추후 별도로 배포를 할 수도 있고, 구글의 cloud function이나 aws의 lambda처럼 serverless 함수 형식처럼 관리할 수도 있다.

```react
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```

위 예시에서는 `pages/api/user.js` 경로가 `200` status code와 함게 `json`을 반환한다.

핸들러는 요청(req)과 응답(res)객체를 인자로 전달받는다.

API route에서 다른 HTTP 메서드를 사용하기 위해서, `req.method`를 사용할 수 있다.

```react
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
```



## Dynamic API Routes

API Routes는 Dynamic Routes를 지원한다.

```react
export default function handler(req, res) {
  const { pid } = req.query
  res.end(`Post: ${pid}`)
}
```

위의 코드는 `pages/api/post/[pid].js` 에 있는 코드이다.

`/api/post/abc` 요청에 대한 응답으로 `Post: abc` 가 반환된다.



### Index routes and Dynamic API routes

일반적인 RESTful 패턴은 다음과 같다.

- Option 1
  - `/api/posts.js`
  - `/api/posts/[postId].js`
- Option 2
  - `/api/posts/index.js`
  - `/api/posts/[postId].js`



### Catch all API routes

API Routes는 `...`을 추가함으로써 모든 경로로 확장할 수 있다.

`pages/api/post/[...slug].js` 는 `/api/post/a`, `/api/post/a/b`, `/api/post/a/b/c` 모두에 매치할 수 있다.

> **Note**: You can use names other than `slug`, such as: `[...param]`

일치하는 매개변수는 쿼리 매개변수로 페이지에 전송되고, 항상 배열이므로 경로 `/api/post/a` 에는 `query` 개체가 있다.



### Option catch all API routes

매개변수를 이중 괄호( `[[...slug]]`)에 포함하여 선택 사항으로 만들 수 있다.

예를 들어, `pages/api/post/[[...slug]].js` 는 `/api/post`, `/api/post/a`, `/api/post/a/b` 에 모두 매치할 수 있다.

Catch all과의 차이점은 optional을 사용하면 매개변수가 없는 경로도 일치한다는 점이다.

```react
{ } // GET `/api/post` (empty object)
{ "slug": ["a"] } // `GET /api/post/a` (single-element array)
{ "slug": ["a", "b"] } // `GET /api/post/a/b` (multi-element array)
```



> 주의사항 : 사전 정의된 API 경로는 동적 API 경로보다 우선하고, 동적 API 경로는 모든 API 경로보다 우선한다.
>
> - `pages/api/post/create.js` - Will match `/api/post/create`
> - `pages/api/post/[pid].js` - Will match `/api/post/1`, `/api/post/abc`, etc. But not `/api/post/create`
> - `pages/api/post/[...slug].js` - Will match `/api/post/1/2`, `/api/post/a/b/c`, etc. But not `/api/post/create`, `/api/post/abc`