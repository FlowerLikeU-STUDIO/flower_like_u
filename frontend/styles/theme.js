import baseStyled from "styled-components";

const sizes = {
  tablet: "screen and (min-width: 768px)",
  pc: "screen and (min-width: 1350px)",
};

const colors = {
  // background-image
  gradient: "linear-gradient(350deg, #5e30ff, #5f6bff, #5299ff, #1ec5ff)",

  butgradient: "linear-gradient(350deg, #5299ff, #1ec5ff, #abdcff, #F6FBFF)",

  transparent: "transparent",

  // Main 컬러
  mainParagraph: "#2A2A2A",
  mainPrimary: "#96C62B",
  mainDanger: "#FF5955",
  mainButton: "#323232",
  mainModalBg: "rgba(50, 50, 50, 0.3)",
  mainWhite: "#FCFCFC",

  // 너닮꽃 Primary
  primary300: "#F7FFE5",
  primary400: "#ECFFC1",
  primary500: "#DDFF92",
  primary600: "#BEEB58",
  primary700: "#96C62B",
  primary800: "#6D921C",
  primary900: "#445B0F",
  primary600p: "#647838",
  primary500p: "#93A669",
  primary400p: "#C5DC90",
  primary300p: "#D4DAC6",

  // 너닮꽃 White
  white: "#FFFFFF",
  white100: "#FCFCFC",
  white150: "#F5F5F5",
  white200: "#EFEFEF",
  white250: "#E8E8E8",
  white300: "#DFDFDF",
  white350: "#C8C8C8",
  white400: "#B7B7B7",

  // 너닮꽃 Gray
  gray: "#949494",
  gray100: "#777777",
  gray150: "#616161",
  gray200: "#555555",
  gray250: "#3F3F3F",
  gray300: "#323232",
  gray350: "#2A2A2A",
  gray400: "#1F1F1F",

  // 너닮꽃 Black
  black100: "#1A1A1A",
  black200: "#111111",
  black: "#000000",

  // 너닮꽃 Red
  red300: "#FEE2E2",
  red400: "#FFA7A5",
  red500: "#FF908E",
  red600: "#FF5955",
  red700: "#D10500",
  red800: "#9A0D0A",
  red900: "#6C1E1D",
  red600p: "#C93F3C",
  red500p: "#DE605D",
  red400p: "#E79391",
  red300p: "#EACDCC",

  // 너닮꽃 Ivory
  lightBlue300: "#FFFBEB",
  lightBlue400: "#FDF5D6",
  lightBlue500: "#F3DD8A",
  lightBlue600: "#F6D55A",
  lightBlue700: "#F5CC35",
  lightBlue800: "#C99D00",
  lightBlue900: "#907100",
  lightBlue600p: "#71612A",
  lightBlue500p: "#978C62",
  lightBlue400p: "#CFC18D",
  lightBlue300p: "#DBD6C5",
};

const fontWeights = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  regular: 400,
  light: 300,
  extraLight: 200,
  button: 700,
};


//* 그림자
const shadows = {
  shadow700: `
    0px 100px 80px rgba(0, 0, 0, 0.07), 
    0px 41.78px 33.4px rgba(0, 0, 0, 0.0503), 
    0px 22.34px 17.87px rgba(0, 0, 0, 0.0417), 
    0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 
    0px 6.65px 5.32px rgba(0, 0, 0, 0.0283), 
    0px 2.77px 2.21px rgba(0, 0, 0, 0.0197);
  `,

  shadow600: `
    0px 20px 80px rgba(0, 0, 0, 0.07), 0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197);
  `,

  shadow500: `
    0px 0px 8px rgba(0, 0, 0, 0.1);
  `,

  shadow400: `
    0px 0px 4px rgba(0, 0, 0, 0.1);
  `,
};

const mixins = {
  //* flex
  flexBox: (direction = "row", align = "center", justify = "center") => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify}
  `,

  //* grid
  grid: (columns = "25%", rows = "25%") => `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${columns}, auto));
    grid-template-rows: repeat(auto-fill, minmax(${rows}, auto));
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
  `,

  //* font
  font: (size = "1rem", weight = "500") => `
    font-size: ${size};
    font-weight: ${weight};
  `,
};

const theme = {
  sizes,
  colors,
  fontWeights,
  shadows,
  mixins,
};

export const styled = baseStyled;
export default theme;