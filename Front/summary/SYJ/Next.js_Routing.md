# Next.js_Routing

`pages` 디렉토리에 추가되면 자동으로 경로를 사용할 수 있다.



### Index routes

The router will automatically route files named `index` to the root of the directory.

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`



### Nested routes

중첩된 폴더 구조를 생성하면 파일이 자동으로 중첩 라우팅된다.

- `pages/blog/first-post.js`→`/blog/first-post`
- `pages/dashboard/settings/username.js`→`/dashboard/settings/username`



### Dynamic route segments

동적 segments를 일치시키기 위해 대괄호 구문을 사용할 수 있다.

- `pages/blog/[slug].js`→ `/blog/:slug`( `/blog/hello-world`)
- `pages/[username]/settings.js`→ `/:username/settings`( `/foo/settings`)
- `pages/post/[...all].js`→ `/post/*`( `/post/2020/id/title`)



## Linking between pages

Next.js 라우터를 통해 단일 페이지 애플리케이션과 유사하게 페이지 간 경로 전환을 수행할 수 있다.

```react
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

`href` 를 통해 페이지에 매핑할 수 있다.



### Linking to dynamic paths

```react
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```

`href` 다음에 `encodeURIComponent`를 사용하여 동적 경로를 연결해 줄 수 있다.

이 이외에도, URL 객체를 사용할 수 있다.

```react
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```


