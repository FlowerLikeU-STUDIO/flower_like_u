import useCalendar from "@/hooks/useCalendar";
import { useState } from "react";
import styled from "styled-components";

const CalendarWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CalendarTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 100%;
`;

const CalendarButton = styled.button`
  font-size: 20px;
  color: #ffa7a5;
`;

const CalendarTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
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
  padding: 20px 0px;
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
    if (choiceDay === "" || e.currentTarget.className.includes("past")) {
      return;
    }
    const choiceDate =
      year + "-" + (month + 1) + "-" + choiceDay.padStart(2, 0);
    setReservationDate(choiceDate);
    console.log(choiceDate);
    setChoiceDay(choiceDay);
  };

  return dayOfTheWeek.length === 0 ? (
    <></>
  ) : (
    <>
      <CalendarWrapper>
        <CalendarTitle>
          <TitleContentWrapper className="title_btn">
            {month === new Date().getMonth() ? (
              <></>
            ) : (
              <CalendarButton type="button" onClick={onPrevMonth}>
                <i className="fa-regular fa-circle-caret-left"></i>
              </CalendarButton>
            )}
          </TitleContentWrapper>
          <TitleContentWrapper className="title_day">{`${year}.${
            month + 1
          }`}</TitleContentWrapper>
          <TitleContentWrapper className="title_btn">
            <CalendarButton type="button" onClick={onNextMonth}>
              <i className="fa-regular fa-circle-caret-right"></i>
            </CalendarButton>
          </TitleContentWrapper>
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
                      ].join("")}
                      key={`day_${idx}`}
                      color={dayColor[getDayColor(day)]}
                      onClick={onChoiceDay}
                    >
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
      </CalendarWrapper>
    </>
  );
};

export default Calendar;
