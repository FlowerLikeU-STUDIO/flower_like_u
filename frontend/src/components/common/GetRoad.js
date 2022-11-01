import React from "react";
import styles from "./GetRoad.module.scss";
//https://postcode.map.daum.net/guide

const GetRoadAdr = ({ adr, setAdr }) => {
  function sample4_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        document.getElementById("sample4_postcode").value = data.zonecode;
        document.getElementById("sample4_roadAddress").value = roadAddr;
        // *상세주소 추가로직
        // document.getElementById("sample4_detailAddress").value = extraRoadAddr;
        // !저장 로직
        setAdr({ zipCode: data.zonecode, street: roadAddr, detail: "", sigunguCode: data.sigunguCode });

        var guideTextBox = document.getElementById("guide");
        if (data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
          guideTextBox.style.display = "block";
        } else if (data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
          guideTextBox.style.display = "block";
        } else {
          guideTextBox.innerHTML = "";
          guideTextBox.style.display = "none";
        }
      },
    }).open();
  }

  const getDetail = (e) => {
    // !상세주소
    console.log(e.target.value);
  };

  return (
    <div className={styles.road__flex}>
      <div className={styles.post__flex}>
        <input type="text" id="sample4_postcode" className={styles.post} placeholder="우편번호" disabled />
        <input type="button" onClick={sample4_execDaumPostcode} className={styles.post__btn} value="우편번호 찾기" />
      </div>
      <input type="text" id="sample4_roadAddress" placeholder="도로명주소" disabled />
      <span id="guide" style={{ color: "#999", display: "none" }}></span>
      <input type="text" id="sample4_detailAddress" placeholder="상세주소를 입력해주세요." onChange={getDetail} />
    </div>
  );
};

export default GetRoadAdr;
