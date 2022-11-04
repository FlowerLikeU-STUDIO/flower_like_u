import { rest } from "msw";

export const userHandlers = [
  rest.get("/users", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("ACCESS_TOKEN");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        type: "seller",
        userId: "ssafyb209",
        name: "김싸피",
        email: "ssafyb209@gmail.com",
        storeName: "flowershop",
        license: "00-000-00000",
        address: "대전광역시 유성구 XXX",
        profile: "base64 image",
        feedsNum: 104,
        holidays: [
          { dayOfWeek: "Sun", value: true },
          { dayOfWeek: "Mon", value: false },
          { dayOfWeek: "Tue", value: false },
          { dayOfWeek: "Wed", value: true },
          { dayOfWeek: "Thu", value: false },
          { dayOfWeek: "Fri", value: false },
          { dayOfWeek: "Sat", value: false },
        ],
        introduce:
          "안녕하세요. 이번에 덕명동으로 입점한 너닮꽃집이에요~\n대전 삼성화재 연수원 근처에 있습니다.\n문의는 채팅을통해 부탁드려요",
        rating: "4.5",
        regDate: "2022-10-25",
      })
    );
  }),
];
