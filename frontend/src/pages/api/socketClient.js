import axios from "axios";
const BASE_URL = "https://www.flowerlikeu.com/socket/";
export const socketClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

socketClient.interceptors.request.use(function (config) {
  // reqeust를 보낼때 sessionStorage에 token 정보가 있다면 헤더에 토큰 정보를 저장하고 없다면 null로 처리
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  if (!accessToken) {
    config.headers["Authorization"] = null;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

socketClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      // refreshToken을 이용하여 accessToken을 재요청하는 로직을 작성하고 토큰을 갱신한다.
      const originalRequest = error.config;
      // 토큰 재요청
      const response = await socketClient
        .get("auth/refreshToken")
        .then((response) => response);
      // 기존의 세션 아이템 삭제
      sessionStorage.removeItem("ACCESS_TOKEN");
      // sessionStorage.removeItem("REFRESH_TOKEN");
      const accessToken = response.headers["accesstoken"];
      // const refreshToken = response.headers["refreshtoken"];
      sessionStorage.setItem("ACCESS_TOKEN", accessToken);
      // sessionStorage.setItem("REFRESH_TOKEN", refreshToken);
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      // originalRequest.headers["RefreshToken"] = refreshToken;

      return await socketClient.request(originalRequest);
    }
    return Promise.reject(error);
  }
);
