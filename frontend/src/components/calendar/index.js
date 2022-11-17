import useCalendar from "@/hooks/useCalendar";
import { useState } from "react";
import styled from "styled-components";
import HolidayBadge from "./HolidayBadge";

const CalendarWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CalendarTableWrapper = styled.div`
  padding-top: 20px;
  height: 400px;
`;

const CalendarTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 100%;
`;

const CalendarButton = styled.button`
  font-size: 14px;
  color: #ffa7a5;
`;

const CalendarTitle = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0px;
`;

const TitleContentWrapper = styled.div`
  text-align: center;
  margin: 0px 30px;
  &.title_btn {
    width: 20%;
  }
  &.title_day {
    width: 60%;
  }
`;

const CalendarThead = styled.thead`
  width: 100%;
`;
const CalendarTh = styled.th`
  color: ${(props) => props.color};
`;

const CalendarTr = styled.tr`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px 0px;
  border-bottom: 1px solid #edf2f7;
  &.day {
    font-size: 12px;
  }
`;

const CalendarTd = styled.td`
  color: ${(props) => props.color};
  text-align: center;
  cursor: pointer;
  &.past {
    cursor: auto;
    color: gray;
  }
  &.holiday {
    cursor: auto;
    color: gray;
  }
`;

const SpanStyle = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 8px;

  &.choice {
    background-color: #ffa7af;
    color: white;
    border-radius: 100%;
  }
`;

const BadgeWrapper = styled.div`
  position: absolute;
  & span {
    margin-left: 10px;
    font-size: 14px;
  }
  &.title {
    top: -20px;
    right: -36px;
    display: flex;
    width: 100px;
  }
`;

const dayColor = {
  0: "red",
  6: "blue",
  past: "gray",
};

const getDayColor = (date) => {
  if (date === "") {
    return;
  }
  const today = new Date();
  if (date < today) {
    return "past";
  } else {
    date.getDay();
  }
};

const prevButtonCheck = (year, month) => {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();
  if (curYear === year && curMonth === month) {
    return true;
  }
  if (curYear < year) {
    return false;
  }
};

const holiday = [false, false, false, true, true, false, false];
const Calendar = ({ choiceDay, setChoiceDay, setReservationDate }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [dayOfTheWeek, calendarBody] = useCalendar("ENG", year, month);

  const onPrevMonth = () => {
    if (month - 1 === 0) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setChoiceDay("");
  };
  const onNextMonth = () => {
    if (month + 1 > 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setChoiceDay("");
  };

  const onChoiceDay = (e) => {
    const choiceDay = e.currentTarget.textContent;
    if (
      choiceDay === "" ||
      e.currentTarget.className.includes("past") ||
      e.currentTarget.className.includes("holiday")
    ) {
      return;
    }
    const choiceDate =
      year + "-" + (month + 1) + "-" + choiceDay.padStart(2, 0);
    setReservationDate(choiceDate);
    setChoiceDay(choiceDay);
  };

  return dayOfTheWeek.length === 0 ? (
    <></>
  ) : (
    <>
      <CalendarWrapper>
        <CalendarTableWrapper>
          <CalendarTitle>
            <TitleContentWrapper className="title_btn">
              {prevButtonCheck(year, month) ? (
                <></>
              ) : (
                <CalendarButton type="button" onClick={onPrevMonth}>
                  <i className="fa-solid fa-angle-left"></i>
                </CalendarButton>
              )}
            </TitleContentWrapper>
            <TitleContentWrapper className="title_day">{`${year}.${
              month + 1 > 12 ? 1 : month + 1
            }`}</TitleContentWrapper>
            <TitleContentWrapper className="title_btn">
              <CalendarButton type="button" onClick={onNextMonth}>
                <i className="fa-solid fa-chevron-right"></i>
              </CalendarButton>
            </TitleContentWrapper>
            <BadgeWrapper className={"title"}>
              <HolidayBadge />
              <span>휴무일</span>
            </BadgeWrapper>
          </CalendarTitle>
          <div>
            <CalendarTable>
              <CalendarThead>
                <CalendarTr className="day">
                  {dayOfTheWeek.map((item, idx) => (
                    <CalendarTh
                      color={idx === 0 || idx === 6 ? dayColor[idx] : "gray"}
                      key={item + `dayOfWeek_${idx}`}
                    >
                      {item}
                    </CalendarTh>
                  ))}
                </CalendarTr>
              </CalendarThead>
              <tbody>
                {calendarBody.map((days, idx) => (
                  <CalendarTr key={idx + `weeks_${idx}`}>
                    {days.map((day, idx) => (
                      <CalendarTd
                        className={[
                          day !== "" && choiceDay === day.getDate()
                            ? "choiced"
                            : "",
                          day === "" || day < new Date() ? "past" : "",
                          day && holiday[day.getDay()] ? "holiday" : "",
                        ].join("")}
                        key={`day_${idx}`}
                        color={dayColor[getDayColor(day)]}
                        onClick={onChoiceDay}
                      >
                        {day && holiday[day.getDay()] ? (
                          <BadgeWrapper className="dayBadge">
                            <HolidayBadge />
                          </BadgeWrapper>
                        ) : (
                          <></>
                        )}
                        <SpanStyle
                          className={
                            day !== "" &&
                            parseInt(day.getDate()) === parseInt(choiceDay)
                              ? "choice"
                              : ""
                          }
                        >
                          {day === "" ? "" : day.getDate()}
                        </SpanStyle>
                      </CalendarTd>
                    ))}
                  </CalendarTr>
                ))}
              </tbody>
            </CalendarTable>
          </div>
        </CalendarTableWrapper>
      </CalendarWrapper>
    </>
  );
};

export default Calendar;
