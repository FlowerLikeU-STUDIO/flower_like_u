const regionKey = [
  "전체",
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

let gyeonggi = ["전체"];

for (let city of [
  "수원시",
  "용인시",
  "성남시",
  "부천시",
  "화성시",
  "안산시",
  "안양시",
  "평택시",
  "시흥시",
  "김포시",
  "광주시",
  "광명시",
  "군포시",
  "하남시",
  "오산시",
  "이천시",
  "안성시",
  "의왕시",
  "양평군",
  "여주시",
  "과천시",
  "고양시",
  "남양주시",
  "파주시",
  "의정부시",
  "양주시",
  "구리시",
  "포천시",
  "동두천시",
  "가평군",
  "연천군",
].sort()) {
  gyeonggi.push(city);
}

let gangwon = ["전체"];

for (let city of [
  "춘천시",
  "원주시",
  "강릉시",
  "동해시",
  "태백시",
  "속초시",
  "삼척시",
  "홍천군",
  "횡성군",
  "영월군",
  "평창군",
  "정선군",
  "철원군",
  "화천군",
  "양구군",
  "인제군",
  "고성군",
  "양양군",
].sort()) {
  gangwon.push(city);
}

let chungcheongNorth = [
  "전체",
  "괴산군",
  "단양군",
  "보은군",
  "영동군",
  "옥천군",
  "음성군",
  "제천시",
  "증평군",
  "진천군",
  "청주시",
  "충주시",
];

let chungcheongSouth = [
  "전체",
  "계룡시",
  "공주시",
  "금산군",
  "논산시",
  "당진시",
  "보령시",
  "부여군",
  "서산시",
  "서천군",
  "아산시",
  "예산군",
  "천안시",
  "청양군",
  "태안군",
  "홍성군",
];

let jeonraNorth = [
  "전체",
  "고창군",
  "군산시",
  "김제시",
  "남원시",
  "무주군",
  "부안군",
  "순창군",
  "완주군",
  "익산시",
  "임실군",
  "장수군",
  "전주시",
  "정읍시",
  "진안군",
];

let jeonraSouth = [
  "전체",
  "강진군",
  "고흥군",
  "곡성군",
  "광양시",
  "구례군",
  "나주시",
  "담양군",
  "목포시",
  "무안군",
  "보성군",
  "순천시",
  "신안군",
  "여수시",
  "영광군",
  "영암군",
  "완도군",
  "장성군",
  "장흥군",
  "진도군",
  "함평군",
  "해남군",
  "화순군",
];

let gyeongsangNorth = [
  "전체",
  "경산시",
  "경주시",
  "고령군",
  "구미시",
  "군위군",
  "김천시",
  "문경시",
  "봉화군",
  "상주시",
  "성주군",
  "안동시",
  "영덕군",
  "영양군",
  "영주시",
  "영천시",
  "예천군",
  "울릉군",
  "울진군",
  "의성군",
  "청도군",
  "청송군",
  "칠곡군",
  "포항시",
];

let gyeongsangSouth = [
  "전체",
  "거제시",
  "거창군",
  "고성군",
  "김해시",
  "남해군",
  "밀양시",
  "사천시",
  "산청군",
  "양산시",
  "의령군",
  "진주시",
  "창녕군",
  "창원시",
  "통영시",
  "하동군",
  "함안군",
  "함양군",
  "합천군",
];

const regionMap = {
  ["전체"]: ["전체"],
  ["서울특별시"]: [
    "전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
  ["부산광역시"]: [
    "전체",
    "강서구",
    "금정구",
    "기장군",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
  ],
  ["대구광역시"]: ["전체", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
  ["인천광역시"]: [
    "전체",
    "강화군",
    "계양구",
    "남동구",
    "동구",
    "미추홀구",
    "부평구",
    "서구",
    "연수구",
    "옹진군",
    "중구",
  ],
  ["광주광역시"]: ["전체", "광산구", "남구", "동구", "북구", "서구"],
  ["대전광역시"]: ["전체", "대덕구", "동구", "서구", "유성구", "중구"],
  ["울산광역시"]: ["전체", "남구", "동구", "북구", "울주군", "중구"],
  ["세종특별자치시"]: ["전체"],
  ["경기도"]: gyeonggi,
  ["강원도"]: gangwon,
  ["충청북도"]: chungcheongNorth,
  ["충청남도"]: chungcheongSouth,
  ["전라북도"]: jeonraNorth,
  ["전라남도"]: jeonraSouth,
  ["경상북도"]: gyeongsangNorth,
  ["경상남도"]: gyeongsangSouth,
  ["제주특별자치도"]: ["서귀포시", "제주시"],
};

export { regionKey, regionMap };
