import { useEffect } from "react";

const useKakao = () => {
  const kakaoShare = (file) => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      //* 중복 initialization 방지
      if (!kakao.isInitialized()) {
        kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}`);
      }

      kakao.Share.uploadImage({
        file: [file],
      }).then(function (res) {
        //* 공유하기
        kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title: "너를 닮은 꽃, 너닮꽃",
            description: "당신만의 꽃다발 커스텀 서비스",
            imageUrl: res.infos.original.url,
            link: {
              webUrl: "http://localhost:3000",
            },
          },
          itemContent: {
            profileText: "너닮꽃",
            profileImageUrl:
              "https://k.kakaocdn.net/14/dn/btrQT5YaLXE/GxgonMU9ncpkIOKilk9F1K/o.jpg",
          },
          buttons: [
            {
              title: "커스텀 하러가기",
              link: {
                webUrl: "https://www.flowerlikeu.com",
              },
            },
          ],
        });
      });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { kakaoShare };
};

export default useKakao;
