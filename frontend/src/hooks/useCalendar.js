const DAY_OF_THE_WEEK_KOR = ["일", "월", "화", "수", "목", "금", "토"];
const DAY_OF_THE_WEEK_ENG = ["SUN", "MON", "THU", "WED", "THU", "FRI", "SAT"];
const EMPTY_WEEK = Array.from({ length: 7 }, () => "");
const DAY_OF_THE_WEEK_MODE = {
  KOR: DAY_OF_THE_WEEK_KOR,
  ENG: DAY_OF_THE_WEEK_ENG,
};
const useCalendar = (mode, year, month) => {
  // const year = new Date().getFullYear();
  // const month = new Date().getMonth();

  const prevMonthLast = new Date(year, month, 0);
  // 저번달 마지막일의 요일
  const prevMonthLastDate = prevMonthLast.getDate();
  // 저번달 마지막일
  const prevMonthLastDay = prevMonthLast.getDay();

  const thisMonthLast = new Date(year, month + 1, 0);
  // 이번달 마지막일의 요일
  const thisMonthLastDate = thisMonthLast.getDate();
  // 이번달 마지막일
  const thisMonthLastDay = thisMonthLast.getDay();

  const prevDates = [];
  // const thisDates = [...Array(thisMonthLastDate + 1).keys()].slice(1);
  const thisDates = [];

  const nextDates = [];
  for (let i = 1; i < thisMonthLastDate + 1; i++) {
    thisDates.push(new Date(year, month, i));
  }
  if (prevMonthLastDay !== 6) {
    for (let i = 0; i < prevMonthLastDay + 1; i++) {
      // prevDates.unshift(prevMonthLastDate - i);
      prevDates.unshift("");
    }
  }
  for (let i = 1; i < 7 - thisMonthLastDay; i++) {
    // nextDates.push(i);
    nextDates.push("");
  }
  const allDates = prevDates.concat(thisDates, nextDates);
  const calendarBody = [];
  while (allDates.length) {
    calendarBody.push(allDates.splice(0, 7));
  }
  return [DAY_OF_THE_WEEK_MODE[mode], calendarBody];
};

export default useCalendar;
