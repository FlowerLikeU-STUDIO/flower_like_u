// Styled Component로 전역 스타일(global style)을 정의하기 위한 createGlobalStyle 불러오기
import { createGlobalStyle } from "styled-components";

// 스타일 초기화를 위한 reset 불러오기
import reset from "styled-reset";

export const GlabalStyle = createGlobalStyle`
/* css 파일 작성하는 곳 */
// reset을 사용해서 스타일 초기화
${reset}

html,
body {
  min-height: 100%;
  font-family:"Pretendard Variable", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

ol,
ul, 
li {
    list-style: none;
}

button {
  font-family:"Pretendard Variable", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
`;
