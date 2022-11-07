//* 포장지, 리본, 꽃 종류 컨텐츠
//* 색깔 종류
const white = "white",
  ivory = "ivory",
  pink = "pink",
  blue = "blue",
  brown = "brown",
  gray = "gray";

// * 꽃 색상
const flowerColor = {
  white: "white",
  ivory: "ivory",
  pink: "pink",
  blue: "blue",
  brown: "brown",
  gray: "gray",
  lightpink: "lightpink",
  purple: "purple",
  red: "red",
  yellow: "yellow",
};

//* 포장지
const wrapper = [
  {
    id: 1,
    title: "종이 포장지",
    contents: "어디에나 잘 어울리는 \n 크래프트 소재 종이 포장지",
    color: brown,
  },
  {
    id: 2,
    title: "흰색 포장지",
    contents: "차분하고 깔끔한 느낌의 \n 흰색 포장지",
    color: white,
  },
  {
    id: 3,
    title: "미색 포장지",
    contents: "부드러운 느낌을 주는\n 미색(아이보리색) 포장지",
    color: ivory,
  },
  {
    id: 4,
    title: "분홍색 포장지",
    contents: "따뜻하고 사랑스러운 느낌의 \n 분홍색 포장지",
    color: pink,
  },
  {
    id: 5,
    title: "파란색 포장지",
    contents: "누구에게나 선물하기 좋은 \n 파란색 포장지",
    color: blue,
  },
  {
    id: 6,
    title: "회색 포장지",
    contents: "꽃을 더 돋보이게 해주는 \n 회색 포장지",
    color: gray,
  },
];

//* 리본
const ribbon = [
  {
    brown: "끈 리본",
  },
  {
    white: "흰색 리본",
  },
  {
    ivory: "미색 리본",
  },
  {
    pink: "분홍색 리본",
  },
  {
    blue: "파란색 리본",
  },
  {
    gray: "회색 리본",
  },
];

//* 꽃
const flower = [
  {
    calla: "카라",
  },
  {
    carnation: "카네이션",
  },
  {
    hydrangea: "수국",
  },
  {
    peony: "작약",
  },
  {
    rose: "장미",
  },
  {
    gypsophila: "안개꽃",
  },
];

const FlowerInfo = {};

export default FlowerInfo;
